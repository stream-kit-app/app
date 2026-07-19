import type {
	MessageReceivedContext,
	RoleChangedContext,
	VoiceStateChangedContext
} from '../contexts';

export function createTestMessageReceivedContext(): MessageReceivedContext {
	return {
		guildId: '123456789012345678',
		guild: 'Test Server',
		channelId: '234567890123456789',
		channel: 'general',
		user: 'TestUser',
		userId: '345678901234567890',
		username: 'testuser',
		message: 'Hello from Stream Kit',
		messageId: '456789012345678901'
	};
}

export function createTestRoleChangedContext(): RoleChangedContext {
	return {
		guildId: '123456789012345678',
		guild: 'Test Server',
		user: 'TestUser',
		userId: '345678901234567890',
		username: 'testuser',
		roleId: '567890123456789012',
		role: 'VIP'
	};
}

export function createTestVoiceJoinContext(): VoiceStateChangedContext {
	return {
		guildId: '123456789012345678',
		guild: 'Test Server',
		user: 'TestUser',
		userId: '345678901234567890',
		username: 'testuser',
		channelId: '678901234567890123',
		channel: 'Stream Voice',
		previousChannelId: '',
		previousChannel: ''
	};
}

export function createTestVoiceLeaveContext(): VoiceStateChangedContext {
	return {
		guildId: '123456789012345678',
		guild: 'Test Server',
		user: 'TestUser',
		userId: '345678901234567890',
		username: 'testuser',
		channelId: '',
		channel: '',
		previousChannelId: '678901234567890123',
		previousChannel: 'Stream Voice'
	};
}

export function createTestVoiceMoveContext(): VoiceStateChangedContext {
	return {
		guildId: '123456789012345678',
		guild: 'Test Server',
		user: 'TestUser',
		userId: '345678901234567890',
		username: 'testuser',
		channelId: '789012345678901234',
		channel: 'Stage',
		previousChannelId: '678901234567890123',
		previousChannel: 'Stream Voice'
	};
}
