import { invoke, isTauri } from '@tauri-apps/api/core';

export async function isTcpPortReachable(
	host: string,
	port: number,
	timeoutMs = 1_000
): Promise<boolean> {
	if (!isTauri()) {
		return true;
	}

	try {
		return await invoke<boolean>('is_tcp_port_reachable', {
			host,
			port,
			timeoutMs
		});
	} catch {
		return false;
	}
}
