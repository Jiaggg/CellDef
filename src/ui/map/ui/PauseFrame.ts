/**
 * 游戏暂停界面
 */
class PauseFrame extends BaseUI
{
	/** 重新开始 */
	private replayBtn:eui.Button;
	/** 开始 */
	private startBtn:eui.Button;
	/** 菜单 */
	private menuBtn:eui.Button;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

	}

	protected initEvent():void
	{
		this.replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__replayBtnHandler, this);
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__startBtnHandler, this);
		this.menuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__menuBtnHandler, this);
	}

	protected removeEvent():void
	{
		this.replayBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__replayBtnHandler, this);
		this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__startBtnHandler, this);
		this.menuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__menuBtnHandler, this);
	}

	protected initData():void
	{

	}

	/** 重新开始 */
	private __replayBtnHandler(e:egret.TouchEvent):void
	{
		GameConst.dispose(this);

		App.game.restart();
	}

	/** 开始/继续 */
	private __startBtnHandler(e:egret.TouchEvent):void
	{
		GameConst.dispose(this);

		App.game.resume();
	}

	/** 菜单 */
	private __menuBtnHandler(e:egret.TouchEvent):void
	{
		GameConst.dispose(this);

		App.scene.exitScene();
	}

	public show():void
	{
		App.layer.addChild(this, LayerType.ui);
	}

	public dispose():void
	{
		this.removeEvent();

		RES.destroyRes(ResConst.json_pause);

		GameConst.dispose(this.replayBtn);
		this.replayBtn = null;

		GameConst.dispose(this.startBtn);
		this.startBtn = null;

		GameConst.dispose(this.menuBtn);
		this.menuBtn = null;

		super.dispose();
	}
}