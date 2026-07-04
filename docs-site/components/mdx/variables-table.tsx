'use client';

import { Check, Copy, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export type VariableEntry = {
	name: string;
	type?: string;
	description?: string;
	example?: string;
};

type VariablesTableProps = {
	variables: VariableEntry[];
};

function variableToken(name: string) {
	return `{${name}}`;
}

function CopyButton({ value, className }: { value: string; className?: string }) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1500);
		} catch {
			// ignore clipboard errors
		}
	}

	return (
		<button
			type="button"
			onClick={copy}
			aria-label={`Copy ${value}`}
			className={
				className ??
				'inline-flex shrink-0 items-center justify-center rounded p-1 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground'
			}
		>
			{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
		</button>
	);
}

function QuickCopyChip({ name }: { name: string }) {
	const token = variableToken(name);

	return (
		<span className="inline-flex items-center gap-0.5 rounded-md border border-fd-border bg-fd-background px-2 py-1">
			<code className="font-mono text-xs text-sky-400">{token}</code>
			<CopyButton
				value={token}
				className="inline-flex shrink-0 items-center justify-center rounded p-0.5 text-fd-muted-foreground transition-colors hover:text-fd-foreground"
			/>
		</span>
	);
}

export function VariablesTable({ variables }: VariablesTableProps) {
	const [query, setQuery] = useState('');

	const filtered = useMemo(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return variables;
		return variables.filter((variable) => {
			const haystack = [
				variable.name,
				variable.type,
				variable.description,
				variable.example,
				variableToken(variable.name)
			]
				.filter(Boolean)
				.join(' ')
				.toLowerCase();
			return haystack.includes(needle);
		});
	}, [query, variables]);

	return (
		<div className="not-prose -mt-2 mb-8 flex flex-col gap-3 rounded-xl border border-fd-primary/25 bg-fd-card/60 p-4">
			<div className="flex flex-wrap gap-2">
				{variables.map((variable) => (
					<QuickCopyChip key={variable.name} name={variable.name} />
				))}
			</div>

			<label className="relative block">
				<Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fd-muted-foreground" />
				<input
					type="search"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="Filter variables…"
					className="w-full rounded-lg border border-fd-border bg-fd-muted/40 py-2 pr-3 pl-9 text-sm text-fd-foreground outline-none transition-colors placeholder:text-fd-muted-foreground focus:border-fd-ring focus:ring-2 focus:ring-fd-ring/30"
				/>
			</label>

			<div className="overflow-x-auto rounded-lg border border-fd-border">
				<table className="w-full min-w-[640px] border-collapse text-sm">
					<thead>
						<tr className="border-b border-fd-border bg-fd-muted/30 text-left text-fd-muted-foreground">
							<th className="px-3 py-2 font-medium">Name</th>
							<th className="px-3 py-2 font-medium">Type</th>
							<th className="px-3 py-2 font-medium">Description</th>
						</tr>
					</thead>
					<tbody>
						{filtered.length === 0 ? (
							<tr>
								<td colSpan={3} className="px-3 py-5 text-center text-fd-muted-foreground">
									No variables match your filter.
								</td>
							</tr>
						) : (
							filtered.map((variable) => {
								const token = variableToken(variable.name);
								return (
									<tr
										key={variable.name}
										className="border-b border-fd-border/70 last:border-b-0"
									>
										<td className="px-3 py-2 align-top">
											<div className="inline-flex max-w-full items-center gap-1 rounded-md border border-fd-border bg-fd-muted/50 px-2 py-0.5">
												<code className="font-mono text-[13px] text-sky-400">{token}</code>
												<CopyButton value={token} />
											</div>
										</td>
										<td className="px-3 py-2 align-top">
											{variable.type ? (
												<span className="inline-flex rounded border border-fd-border bg-fd-background px-2 py-0.5 font-mono text-xs text-fd-foreground">
													{variable.type}
												</span>
											) : (
												<span className="text-fd-muted-foreground">—</span>
											)}
										</td>
										<td className="px-3 py-2 align-top text-fd-foreground">
											{variable.description ? (
												<p className="text-[13px] leading-snug">{variable.description}</p>
											) : null}
											{variable.example ? (
												<p className={variable.description ? 'mt-1' : undefined}>
													<span className="text-xs text-fd-muted-foreground">Example: </span>
													<code className="rounded border border-fd-border bg-fd-muted/50 px-1.5 py-0.5 font-mono text-xs">
														{variable.example}
													</code>
												</p>
											) : null}
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
