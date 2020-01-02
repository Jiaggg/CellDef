/**
 * 进入关卡插画
 */
class PlateFrame extends eui.Group implements IDispose
{
	/** 插画图片列表 */
	private _imgArr:egret.Texture[];
	/** 当前显示图片 */
	private _img:eui.Image;
	/** 当前位置 */
	private _index:number;
	/** 计数 */
	private _step:number;
	/** 总数 */
	private _total:number;

	public constructor() 
	{
		super();

		this.initView();
	}

	private initView():void
	{
		this.width = 1920;
		this.height = 1080;
		this.verticalCenter = 0;
		this.horizontalCenter = 0;
		this.touchEnabled = false;
		this.touchChildren = false;

		this._img = new eui.Image();
		this._img.verticalCenter = 0;
		this._img.horizontalCenter = 0;
		this.addChild(this._img);
	}

	private removeEvent():void
	{
		App.stage.stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
	}

	public show($imgs:egret.Texture[]):void
	{
		this._imgArr = $imgs;

		this._total = this._imgArr ? this._imgArr.length : 0;

		if(this._total > 0)
		{
			App.layer.addChild(this, LayerType.ui);

			this._index = 0;

			this._step = -1;

			App.stage.stage.addEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
		}
		else
		{
			GameConst.dispose(this);
		}
	}

	private __enterFrameHandler(e:egret.Event):void
	{
		this._step ++;

		if(this._step % 4 != 0) return;

		if(this._index >= this._total)
		{
			GameConst.dispose(this);
			return;
		}

		this._img.texture = this._imgArr[this._index];

		this._index ++;
	}

	public dispose():void
	{
		this.removeEvent();

		GameConst.dispose(this._img);
		this._img = null;

		this._imgArr && (this._imgArr.length = 0);
		
		this._imgArr = null;

		this.parent && this.parent.removeChild(this);

		this.dispatchEventWith(egret.Event.CLOSE);
	}
}