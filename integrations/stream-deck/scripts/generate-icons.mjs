import { mkdirSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pluginRoot = path.join(root, 'app.stream-kit.streamdeck.sdPlugin');

/** Brand / UI palette */
const C = {
	clear: [0, 0, 0, 0],
	dark: [18, 20, 28, 255],
	panel: [28, 32, 44, 255],
	panelSoft: [40, 46, 62, 255],
	yellow: [255, 250, 0, 255],
	yellowDim: [212, 208, 40, 255],
	white: [245, 247, 252, 255],
	muted: [148, 163, 184, 255],
	green: [52, 211, 153, 255],
	greenDark: [16, 80, 58, 255],
	amber: [251, 191, 36, 255],
	blue: [96, 165, 250, 255]
};

function crc32(buf) {
	let crc = 0xffffffff;
	for (let i = 0; i < buf.length; i++) {
		crc ^= buf[i];
		for (let j = 0; j < 8; j++) {
			crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
		}
	}
	return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
	const typeBuf = Buffer.from(type, 'ascii');
	const len = Buffer.alloc(4);
	len.writeUInt32BE(data.length, 0);
	const crcBuf = Buffer.alloc(4);
	crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
	return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createCanvas(size) {
	const pixels = new Uint8ClampedArray(size * size * 4);
	return { size, pixels };
}

function setPixel(canvas, x, y, rgba) {
	const xi = Math.round(x);
	const yi = Math.round(y);
	if (xi < 0 || yi < 0 || xi >= canvas.size || yi >= canvas.size) return;
	const i = (yi * canvas.size + xi) * 4;
	const [r, g, b, a] = rgba;
	if (a >= 255) {
		canvas.pixels[i] = r;
		canvas.pixels[i + 1] = g;
		canvas.pixels[i + 2] = b;
		canvas.pixels[i + 3] = 255;
		return;
	}
	const sa = a / 255;
	const da = canvas.pixels[i + 3] / 255;
	const outA = sa + da * (1 - sa);
	if (outA <= 0) return;
	canvas.pixels[i] = Math.round((r * sa + canvas.pixels[i] * da * (1 - sa)) / outA);
	canvas.pixels[i + 1] = Math.round((g * sa + canvas.pixels[i + 1] * da * (1 - sa)) / outA);
	canvas.pixels[i + 2] = Math.round((b * sa + canvas.pixels[i + 2] * da * (1 - sa)) / outA);
	canvas.pixels[i + 3] = Math.round(outA * 255);
}

function fillRect(canvas, x, y, w, h, rgba) {
	const x0 = Math.floor(x);
	const y0 = Math.floor(y);
	const x1 = Math.ceil(x + w);
	const y1 = Math.ceil(y + h);
	for (let py = y0; py < y1; py++) {
		for (let px = x0; px < x1; px++) {
			setPixel(canvas, px, py, rgba);
		}
	}
}

function fillCircle(canvas, cx, cy, radius, rgba) {
	const r2 = radius * radius;
	const x0 = Math.floor(cx - radius);
	const y0 = Math.floor(cy - radius);
	const x1 = Math.ceil(cx + radius);
	const y1 = Math.ceil(cy + radius);
	for (let y = y0; y <= y1; y++) {
		for (let x = x0; x <= x1; x++) {
			const dx = x + 0.5 - cx;
			const dy = y + 0.5 - cy;
			if (dx * dx + dy * dy <= r2) {
				setPixel(canvas, x, y, rgba);
			}
		}
	}
}

function fillRoundedRect(canvas, x, y, w, h, radius, rgba) {
	const r = Math.min(radius, w / 2, h / 2);
	for (let py = Math.floor(y); py < Math.ceil(y + h); py++) {
		for (let px = Math.floor(x); px < Math.ceil(x + w); px++) {
			const lx = px + 0.5;
			const ly = py + 0.5;
			const inside =
				lx >= x + r &&
				lx <= x + w - r &&
				ly >= y &&
				ly <= y + h
					? true
					: lx >= x &&
						  lx <= x + w &&
						  ly >= y + r &&
						  ly <= y + h - r
						? true
						: dist2(lx, ly, x + r, y + r) <= r * r ||
							dist2(lx, ly, x + w - r, y + r) <= r * r ||
							dist2(lx, ly, x + r, y + h - r) <= r * r ||
							dist2(lx, ly, x + w - r, y + h - r) <= r * r;
			if (inside) setPixel(canvas, px, py, rgba);
		}
	}
}

function dist2(x1, y1, x2, y2) {
	const dx = x1 - x2;
	const dy = y1 - y2;
	return dx * dx + dy * dy;
}

function fillTriangle(canvas, x1, y1, x2, y2, x3, y3, rgba) {
	const minX = Math.floor(Math.min(x1, x2, x3));
	const maxX = Math.ceil(Math.max(x1, x2, x3));
	const minY = Math.floor(Math.min(y1, y2, y3));
	const maxY = Math.ceil(Math.max(y1, y2, y3));

	function sign(px, py, ax, ay, bx, by) {
		return (px - bx) * (ay - by) - (ax - bx) * (py - by);
	}

	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			const px = x + 0.5;
			const py = y + 0.5;
			const b1 = sign(px, py, x1, y1, x2, y2) < 0;
			const b2 = sign(px, py, x2, y2, x3, y3) < 0;
			const b3 = sign(px, py, x3, y3, x1, y1) < 0;
			if (b1 === b2 && b2 === b3) {
				setPixel(canvas, x, y, rgba);
			}
		}
	}
}

function strokeCircle(canvas, cx, cy, radius, thickness, rgba) {
	const outer = radius + thickness / 2;
	const inner = Math.max(0, radius - thickness / 2);
	const outer2 = outer * outer;
	const inner2 = inner * inner;
	const x0 = Math.floor(cx - outer);
	const y0 = Math.floor(cy - outer);
	const x1 = Math.ceil(cx + outer);
	const y1 = Math.ceil(cy + outer);
	for (let y = y0; y <= y1; y++) {
		for (let x = x0; x <= x1; x++) {
			const dx = x + 0.5 - cx;
			const dy = y + 0.5 - cy;
			const d2 = dx * dx + dy * dy;
			if (d2 <= outer2 && d2 >= inner2) {
				setPixel(canvas, x, y, rgba);
			}
		}
	}
}

function canvasToPng(canvas) {
	const { size, pixels } = canvas;
	const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(size, 0);
	ihdr.writeUInt32BE(size, 4);
	ihdr[8] = 8; // bit depth
	ihdr[9] = 6; // RGBA
	ihdr[10] = 0;
	ihdr[11] = 0;
	ihdr[12] = 0;

	const stride = 1 + size * 4;
	const raw = Buffer.alloc(stride * size);
	for (let y = 0; y < size; y++) {
		raw[y * stride] = 0;
		const row = Buffer.from(pixels.buffer, y * size * 4, size * 4);
		row.copy(raw, y * stride + 1);
	}

	return Buffer.concat([
		signature,
		chunk('IHDR', ihdr),
		chunk('IDAT', deflateSync(raw)),
		chunk('IEND', Buffer.alloc(0))
	]);
}

function withPad(size, draw) {
	const canvas = createCanvas(size);
	draw(canvas, size);
	return canvas;
}

/** Dark rounded tile used on keys */
function paintKeyBg(canvas, size) {
	const inset = Math.max(1, Math.round(size * 0.04));
	const radius = Math.max(4, Math.round(size * 0.18));
	fillRoundedRect(canvas, inset, inset, size - inset * 2, size - inset * 2, radius, C.dark);
}

/** Category / marketplace: yellow bolt on dark tile */
function drawBrand(canvas, size) {
	paintKeyBg(canvas, size);
	const cx = size / 2;
	const cy = size / 2;
	const s = size * 0.28;
	// stylized lightning / stream mark
	fillTriangle(
		canvas,
		cx + s * 0.15,
		cy - s * 1.15,
		cx - s * 0.55,
		cy + s * 0.15,
		cx + s * 0.05,
		cy + s * 0.15,
		C.yellow
	);
	fillTriangle(
		canvas,
		cx - s * 0.15,
		cy + s * 1.15,
		cx + s * 0.55,
		cy - s * 0.15,
		cx - s * 0.05,
		cy - s * 0.15,
		C.yellow
	);
}

/** Small list icon: just the glyph on transparent */
function drawBrandGlyph(canvas, size) {
	const cx = size / 2;
	const cy = size / 2;
	const s = size * 0.38;
	fillTriangle(
		canvas,
		cx + s * 0.12,
		cy - s * 1.1,
		cx - s * 0.55,
		cy + s * 0.1,
		cx + s * 0.05,
		cy + s * 0.1,
		C.yellow
	);
	fillTriangle(
		canvas,
		cx - s * 0.12,
		cy + s * 1.1,
		cx + s * 0.55,
		cy - s * 0.1,
		cx - s * 0.05,
		cy - s * 0.1,
		C.yellow
	);
}

function drawPlay(canvas, size, { onKey = false } = {}) {
	if (onKey) paintKeyBg(canvas, size);
	const cx = size / 2 + size * 0.04;
	const cy = size / 2;
	const s = size * (onKey ? 0.22 : 0.32);
	if (!onKey) {
		fillCircle(canvas, size / 2, size / 2, size * 0.46, C.panel);
	}
	fillCircle(canvas, size / 2, size / 2, size * (onKey ? 0.28 : 0.4), C.greenDark);
	fillTriangle(
		canvas,
		cx - s * 0.55,
		cy - s,
		cx - s * 0.55,
		cy + s,
		cx + s * 0.95,
		cy,
		C.green
	);
}

function drawToggle(canvas, size, { on = false, onKey = false } = {}) {
	if (onKey) paintKeyBg(canvas, size);
	const trackW = size * (onKey ? 0.55 : 0.72);
	const trackH = size * (onKey ? 0.28 : 0.36);
	const x = (size - trackW) / 2;
	const y = (size - trackH) / 2;
	const r = trackH / 2;
	fillRoundedRect(canvas, x, y, trackW, trackH, r, on ? [34, 90, 68, 255] : C.panelSoft);
	const knobR = trackH * 0.38;
	const knobX = on ? x + trackW - r : x + r;
	fillCircle(canvas, knobX, size / 2, knobR + 1, on ? C.green : C.muted);
	fillCircle(canvas, knobX, size / 2, knobR * 0.72, on ? C.white : [226, 232, 240, 255]);
}

function drawDial(canvas, size, { onKey = false } = {}) {
	if (onKey) paintKeyBg(canvas, size);
	const cx = size / 2;
	const cy = size / 2;
	const outer = size * (onKey ? 0.32 : 0.42);
	fillCircle(canvas, cx, cy, outer, C.panelSoft);
	strokeCircle(canvas, cx, cy, outer * 0.82, Math.max(2, size * 0.08), C.blue);
	fillCircle(canvas, cx, cy, outer * 0.35, C.dark);
	// indicator notch
	const angle = -Math.PI * 0.65;
	const nx = cx + Math.cos(angle) * outer * 0.55;
	const ny = cy + Math.sin(angle) * outer * 0.55;
	fillCircle(canvas, nx, ny, Math.max(1.5, size * 0.06), C.yellow);
	// top tick
	fillRect(
		canvas,
		cx - size * 0.03,
		cy - outer * 0.95,
		size * 0.06,
		size * 0.12,
		C.yellowDim
	);
}

const outputs = [
	{
		path: 'imgs/plugin/marketplace.png',
		size: 256,
		draw: (c, s) => drawBrand(c, s)
	},
	{
		path: 'imgs/plugin/category-icon.png',
		size: 28,
		draw: (c, s) => drawBrandGlyph(c, s)
	},
	{
		path: 'imgs/actions/run/icon.png',
		size: 20,
		draw: (c, s) => drawPlay(c, s)
	},
	{
		path: 'imgs/actions/run/key.png',
		size: 144,
		draw: (c, s) => drawPlay(c, s, { onKey: true })
	},
	{
		path: 'imgs/actions/toggle/icon.png',
		size: 20,
		draw: (c, s) => drawToggle(c, s, { on: true })
	},
	{
		path: 'imgs/actions/toggle/key.png',
		size: 144,
		draw: (c, s) => drawToggle(c, s, { on: false, onKey: true })
	},
	{
		path: 'imgs/actions/toggle/key-on.png',
		size: 144,
		draw: (c, s) => drawToggle(c, s, { on: true, onKey: true })
	},
	{
		path: 'imgs/actions/dial/icon.png',
		size: 20,
		draw: (c, s) => drawDial(c, s)
	},
	{
		path: 'imgs/actions/dial/key.png',
		size: 144,
		draw: (c, s) => drawDial(c, s, { onKey: true })
	}
];

for (const item of outputs) {
	const canvas = withPad(item.size, item.draw);
	const full = path.join(pluginRoot, item.path);
	mkdirSync(path.dirname(full), { recursive: true });
	writeFileSync(full, canvasToPng(canvas));
}

console.log(`Generated ${outputs.length} Stream Deck icons`);
