/**
 * 商店界面
 */
class ShopFrame extends BaseUI
{
	/** 返回 */
	private backBtn:eui.Button;
	/** 滚动面板 */
	private scroller:eui.Scroller;
	/** itemData */
	private itemGroup:eui.DataGroup;
	/** 数据源 */
	private itemData:eui.ArrayCollection;

	public constructor()
	{
		super();
	}

	protected initView():void
	{
		this.verticalCenter = 0;
		this.horizontalCenter = 0;

		this.itemData = new eui.ArrayCollection();
		this.itemGroup.dataProvider = this.itemData;
		this.itemGroup.itemRenderer = ShopItem;
	}

	protected initEvent():void
	{
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__backBtnHandler, this);
	}

	protected removeEvent():void
	{
		this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__backBtnHandler, this);
	}

	protected initData():void
	{
		let list:IShopData[] = App.config.getAllShopGoods();

		let length:number = list.length;

		for(let i = 0; i < length; i ++)
		{
			this.itemData.source.push(list[i]);
		}
		this.itemData.refresh();
	}

	/**
	 * 返回
	 */
	private __backBtnHandler(e:egret.TouchEvent):void
	{
		SwitchHelp.openLevelFrame();

		GameConst.dispose(this);
	}

	public show():void
	{
		App.layer.addChild(this, LayerType.ui);
	}

	public dispose():void
	{
		this.removeEvent();

		GameConst.dispose(this.backBtn);
		this.backBtn = null;

		if(this.scroller)
		{
			this.scroller.stopAnimation();
			this.scroller.viewport = null;
			GameConst.dispose(this.scroller);
		}
		this.scroller = null;

		if(this.itemGroup)
		{
			this.itemGroup.dataProvider = null;
			GameConst.dispose(this.itemGroup);
		}
		this.itemGroup = null;

		RES.destroyRes(ResConst.json_shop);

		if(this.itemData)
		{
			let length:number = this.itemData.length;

			let info:IShopData;

			for(let i = 0; i < length; i ++)
			{
				info = this.itemData.getItemAt(i);

				if(info)
				{
					RES.destroyRes(GameConst.getGoodsBackPath(info.type));
				}
			}
		}
		this.itemData = null;

		super.dispose();
	}
}