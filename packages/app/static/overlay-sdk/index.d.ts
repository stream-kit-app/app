export type OverlayHandler<T = unknown> = (payload: T) => void;
export type OverlayContextEnvelope = {
    overlayId: string;
    context: Record<string, unknown>;
};
export type OverlayBroadcastMessage = {
    overlayId: string;
    event: string;
    payload: unknown;
    timestamp: number;
};
export type CreateOverlayOptions = {
    handlers?: Record<string, OverlayHandler>;
    onConnect?: () => void;
    onDisconnect?: () => void;
};
export type OverlayRuntime = {
    context: Record<string, unknown>;
    overlayId: string;
    send: (event: string, payload: unknown) => void;
};
declare global {
    interface Window {
        __OVERLAY_CONTEXT__?: OverlayContextEnvelope;
    }
}
export declare function createOverlay(options?: CreateOverlayOptions): OverlayRuntime;
//# sourceMappingURL=index.d.ts.map