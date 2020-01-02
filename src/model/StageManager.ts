/**
 * 游戏舞台管理
 */
class StageManager 
{
	private static _instance:StageManager;

	/** 舞台全局对象 */
	private _stage:egret.Stage;

	public constructor() 
	{
		StageManager._instance = this;
	}

	public static get instance():StageManager
	{
		return this._instance || new StageManager();
	}

	public setup($stage:egret.Stage):void
	{
		this._stage = $stage;
	}

	/** 舞台全局对象 */
	public get stage():egret.Stage
	{
		return this._stage;
	}
}