const OBS_HOTKEY_LABELS: Record<string, string> = {
	'OBSBasic.StartStreaming': 'Start Streaming',
	'OBSBasic.StopStreaming': 'Stop Streaming',
	'OBSBasic.ForceStopStreaming': 'Force Stop Streaming',
	'OBSBasic.StartRecording': 'Start Recording',
	'OBSBasic.StopRecording': 'Stop Recording',
	'OBSBasic.PauseRecording': 'Pause Recording',
	'OBSBasic.UnpauseRecording': 'Unpause Recording',
	'OBSBasic.SplitFile': 'Split Recording File',
	'OBSBasic.AddChapterMarker': 'Add Chapter Marker',
	'OBSBasic.StartReplayBuffer': 'Start Replay Buffer',
	'OBSBasic.StopReplayBuffer': 'Stop Replay Buffer',
	'ReplayBuffer.Save': 'Save Replay Buffer',
	'restart_replay_buffer.trigger': 'Restart Replay Buffer (script)',
	'OBSBasic.StartVirtualCam': 'Start Virtual Camera',
	'OBSBasic.StopVirtualCam': 'Stop Virtual Camera',
	'OBSBasic.EnablePreview': 'Enable Preview',
	'OBSBasic.DisablePreview': 'Disable Preview',
	'OBSBasic.EnablePreviewProgram': 'Enable Preview Program',
	'OBSBasic.DisablePreviewProgram': 'Disable Preview Program',
	'OBSBasic.ShowContextBar': 'Show Context Bar',
	'OBSBasic.HideContextBar': 'Hide Context Bar',
	'OBSBasic.Transition': 'Transition',
	'OBSBasic.ResetStats': 'Reset Stats',
	'OBSBasic.Screenshot': 'Screenshot',
	'OBSBasic.SelectedSourceScreenshot': 'Screenshot Selected Source'
};

function humanizeHotkeyName(internalName: string): string {
	return internalName
		.replace(/^OBSBasic\./, '')
		.replace(/\./g, ' › ')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/_/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

/** Map OBS internal hotkey ids to labels shown in the UI. */
export function formatObsHotkeyLabel(internalName: string): string {
	const known = OBS_HOTKEY_LABELS[internalName];

	if (known) {
		return known;
	}

	const humanized = humanizeHotkeyName(internalName);

	if (humanized && humanized.toLowerCase() !== internalName.toLowerCase()) {
		return humanized;
	}

	return internalName;
}
