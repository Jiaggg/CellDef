/**
 * 教学界面
 */
class TeachFrame extends BaseUI
{
	/** 背景图 */
	private backImg:eui.Image;
	/** 上一张 */
	private preBtn:eui.Button;
	/** 下一张 */
	private nextBtn:eui.Button;
	/** 当前页 */
	private currPage:number;
	/** 当前页url */
	private currUrl:string;
	/** 请求url列表 */
	private urlList:string[];

	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		this.urlList = [];
	}

	protected initEvent():void
	{
		this.preBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__preBtnHandler, this);
		this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__nextBtnHandler, this);
	}

	protected removeEvent():void
	{
		this.preBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__preBtnHandler, this);
		this.nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__nextBtnHandler, this);		
	}

	protected initData():void
	{
		this.currPage = 1;

		this.updateView();
	}

	private updateView():void
	{
		this.currUrl = GameConst.getTeachPath(this.currPage);

		if(this.urlList.indexOf(this.currUrl) == -1)
		{
			this.urlList.push(this.currUrl);
		}

		RES.getResByUrl(this.currUrl, this.__backCompleteHandler, this);
	}

	/**
	 * 背景图加载完成
	 */
	private __backCompleteHandler(data:any, key:string):void
	{
		if(!data || this.currUrl != key) return;

		this.backImg.texture = data;
	}

	/** 上一张 */
	private __preBtnHandler(e:egret.TouchEvent):void
	{
		if(this.currPage <= 1) return;

		this.currPage --;

		this.updateView();
	}

	/** 下一张 */
	private __nextBtnHandler(e:egret.TouchEvent):void
	{
		if(this.currPage >= 9) 
		{
			GameConst.dispose(this);
			return;
		}

		this.currPage ++;

		this.updateView();
	}

	public show():void
	{
		App.layer.addChild(this, LayerType.ui);
	}

	public dispose():void
	{
		this.removeEvent();

		GameConst.dispose(this.preBtn);
		this.preBtn = null;

		GameConst.dispose(this.nextBtn);
		this.nextBtn = null;

		GameConst.dispose(this.backImg);
		this.backImg = null;
		
		if(this.urlList)
		{
			while(this.urlList.length > 0)
			{
				RES.destroyRes(this.urlList.pop());
			}
		}
		this.urlList = null;

		RES.destroyRes(ResConst.json_shop);

		super.dispose();
	}
}