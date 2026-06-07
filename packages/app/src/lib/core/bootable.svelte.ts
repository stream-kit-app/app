export abstract class Bootable {
	public abstract boot(): Promise<this>;
}
