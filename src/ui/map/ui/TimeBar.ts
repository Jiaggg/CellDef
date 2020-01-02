/**
 * 剩余时间
 */
class TimeBar extends BaseUI
{
	/** 剩余时间 */
	private timeTxt:eui.BitmapLabel;
	/** 暂停 */
	private pauseBtn:eui.Button;
	/** 当前时间 */
	private currTime:number;

	public constructor()
	{
		super();
	}

	protected initView():void
	{
		this.right = 20;

		this.bottom = 10;

		this.touchEnabled = false;

		this.currTime = 0;

		this.timeTxt.text = "00 p 00";
	}

	protected initEvent():void
	{
		this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__pauseBtnHandler, this);

		App.game.addEventListener(MEvent.HEARTBEAT, this.__heartbeatHandler, this)
		App.game.addEventListener(MEvent.RESTART, this.__heartbeatHandler, this)
	}

	protected removeEvent():void
	{
		this.pauseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__pauseBtnHandler, this);

		App.game.removeEventListener(MEvent.HEARTBEAT, this.__heartbeatHandler, this)
		App.game.removeEventListener(MEvent.RESTART, this.__heartbeatHandler, this)
	}

	protected initData():void
	{
		this.__heartbeatHandler();
	}

	/** 心跳事件 */
	private __heartbeatHandler():void
	{
		this.currTime = App.game.lastTime;

		this.updateTime();
	}

	/** 更新时间显示 */
	private updateTime():void
	{
		let sec:string = this.formatValue(Math.floor(this.currTime / 60));

		let mil:string = this.formatValue(this.currTime % 60);

		this.timeTxt.text = `${sec}p${mil}`;
	}

	/** 格式化时间，小于10前面补0 */
	private formatValue(val:number):string
	{
		if(val < 10)
		{
			return "0" + val;
		}

		return val + "";
	}

	/** 暂停 */
	private __pauseBtnHandler(e:egret.TouchEvent):void
	{
		App.game.pause();
	}

	public show():void
	{
		App.layer.addChild(this, LayerType.ui);
	}

	public dispose():void
	{
		this.removeEvent();

		RES.destroyRes(ResConst.json_pause);

		super.dispose();
	}
}