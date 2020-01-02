/** 水特效 */
class WaterEffect extends egret.DisplayObjectContainer implements IDispose
{
	/** 图片 */
	private _img:egret.Bitmap;
	/** 开始时间 */
	private _startTime:number;
	/** 当前帧数 */
	private _currFrame:number;
	/** 已播放次数 */
	private _count:number;

	public constructor()
	{
		super();

		this.initView();

		this.initEvent();
	}

	protected initView():void
	{
		this._img = new egret.Bitmap();

		this.addChild(this._img);

		this._count = 0;

		this._startTime = egret.getTimer();

		App.layer.addChild(this, LayerType.top);
	}

	protected initEvent():void
	{
		App.stage.stage.addEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
	}

	protected removeEvent():void
	{
		App.stage.stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
	}

	private __enterFrameHandler(e:egret.Event):void
	{
		let nowTime:number = egret.getTimer();

		let frame:number = (Math.floor((nowTime - this._startTime) / 100) % 6) + 1;

		if(this._currFrame == frame) return;

		if(this._count > 0)
		{
			this.dispose();
			return;
		}

		this._currFrame = frame;

		this._img.texture = RES.getRes(`water_${frame}_png`);

		if(this._currFrame == 6)
		{
			this._count ++;
		}
	}

	public dispose():void
	{
		this.removeEvent();

		this.dispatchEventWith(egret.Event.COMPLETE);

		this.parent && this.parent.removeChild(this);
	}
}