/**
 * ui基类
 */
class BaseUI extends eui.Component implements IDispose
{
	/**
	 * 皮肤加载完成
	 */
	protected _skinComplete:boolean;

	/**
	 * 初始化完成
	 */
	protected _isFinish:boolean;

	/**
	 * 是否已销毁
	 */
	protected _destory:boolean;

	public constructor()
	{
		super();

		this.addEventListener(egret.Event.COMPLETE, this.__skinComleteHandler, this);
	}

	protected __skinComleteHandler(e:egret.Event):void
	{
		this._skinComplete = true;

		this.init();
	}

	protected init():void
	{
		if(this._destory)
		{
			this.dispose();
			
			return;
		}

		this._isFinish = true;

		this.initView();

		this.initEvent();

		this.initData();
	}

	protected initView():void
	{

	}

	protected initEvent():void
	{

	}

	protected removeEvent():void
	{
		
	}

	protected initData():void
	{

	}

	public get isFinish():boolean
	{
		return this._isFinish;
	}

	public dispose():void
	{
		this._destory = true;

		this.removeEventListener(egret.Event.COMPLETE, this.__skinComleteHandler, this);

		this.parent && this.parent.removeChild(this);

		this.dispatchEventWith(MEvent.DISPOSE);
	}
}