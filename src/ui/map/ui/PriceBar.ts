/**
 * 当前金币数显示
 */
class PriceBar extends BaseUI
{
	/** 当前金币/最大金币 */
	private priceTxt:eui.BitmapLabel;
	/** 当前金币数 */
	private currPrice:number;
	/** 最大金币数 */
	private maxPrice:number;

	public constructor()
	{
		super();
	}

	protected initView():void
	{
		this.left = 20;

		this.bottom = 10;

		this.touchEnabled = this.touchChildren = false;
	}

	protected initEvent():void
	{
		App.game.addEventListener(MEvent.ADD_GOLD, this.__goldUpdateHandler, this);
		App.game.addEventListener(MEvent.RESTART, this.__goldUpdateHandler, this);
	}

	protected removeEvent():void
	{
		App.game.removeEventListener(MEvent.ADD_GOLD, this.__goldUpdateHandler, this);
		App.game.removeEventListener(MEvent.RESTART, this.__goldUpdateHandler, this);
	}

	protected initData():void
	{
		this.__goldUpdateHandler();
	}

	/** 金币更新 */
	private __goldUpdateHandler():void
	{
		this.currPrice = App.game.currGold;

		this.maxPrice = App.game.maxGold;

		this.priceTxt.text = `$ ${this.currPrice}x${this.maxPrice}`;
	}

	public show():void
	{
		App.layer.addChild(this, LayerType.ui);
	}

	public dispose():void
	{
		this.removeEvent();

		GameConst.dispose(this.priceTxt);
		this.priceTxt = null;

		super.dispose();
	}
}