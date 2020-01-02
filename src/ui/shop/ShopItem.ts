/**
 * 商城item
 */
class ShopItem extends BaseRenderer
{
	/** 物品背景图 */
	private goodsImg:eui.Image;
	/** 未解锁组 */
	private lockGroup:eui.Group;
	/** 锁按钮 */
	private lockBtn:eui.Button;
	/** 需要星星数量 */
	private countTxt:eui.BitmapLabel;
	/** 物品信息 */
	private info:IShopData;
	/** 背景图url */
	private currUrl:string;

	public constructor()
	{
		super();
	}

	protected initView():void
	{

	}

	protected initEvent():void
	{
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeStageHandler, this);
		this.lockBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__lockBtnHandler, this);
	}

	protected removeEvent():void
	{
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeStageHandler, this);
		this.lockBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__lockBtnHandler, this);
	}

	protected initData():void
	{
		this.dataChanged();
	}

	protected dataChanged():void
	{
		if(!this.isFinish || !this.data) return;

		this.info = this.data;

		if(this.info)
		{
			this.currUrl = GameConst.getGoodsBackPath(this.info.type);

			RES.getResByUrl(this.currUrl, this.__backCompleteHandler, this);

			this.updateState();
		}
	}

	/** 更新状态 */
	private updateState():void
	{
		let haved:boolean = App.player.haveGoods(this.info.type);

		this.lockGroup.visible = !haved;

		if(!haved)
		{
			this.countTxt.text = (this.info.needStar || 0) + "";
		}
	}

	/**
	 * 背景图加载完成
	 */
	private __backCompleteHandler(data:any, key:string):void
	{
		if(!data || this.currUrl != key) return;

		this.goodsImg.texture = data;
	}

	/** 解锁物品 */
	private __lockBtnHandler(e:egret.TouchEvent):void
	{
		let need:number = this.info.needStar;

		let have:number = App.player.totalStar;

		if(need > have)
		{
			App.msg.show(need + "星可解锁");
			return;
		}
	}

	/** 从舞台移除 */
	private __removeStageHandler(e:egret.Event):void
	{
		GameConst.dispose(this);
	}

	public dispose():void
	{
		this.removeEvent();

		super.dispose();
	}
}