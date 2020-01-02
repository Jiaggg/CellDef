/**
 * 道具工具条
 */
class ToolBar extends BaseUI
{
	/** 所有道具按钮 */
	private allBtns:any;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		this.top = 0;
		this.right = 0;

		this.touchChildren = true;
		
		this.touchEnabled = false;

		this.allBtns = {};
		this.allBtns[PropType.water] = this["btn_101"];
		this.allBtns[PropType.germ_1] = this["btn_301"];
		this.allBtns[PropType.t_cell] = this["btn_201"];
		this.allBtns[PropType.anti_1] = this["btn_401"];
		this.allBtns[PropType.anti_3] = this["btn_403"];
		this.allBtns[PropType.anti_2] = this["btn_402"];
		this.allBtns[PropType.germ_2] = this["btn_302"];
		this.allBtns[PropType.germ_3] = this["btn_303"];
		this.allBtns[PropType.germ_4] = this["btn_304"];
	}

	protected initEvent():void
	{
		
	}

	protected removeEvent():void
	{

	}

	protected initData():void
	{
		this.updateView();
	}

	protected updateView():void
	{
		let mapDesc:IMapDesc = App.scene.mapDesc;

		if(!mapDesc) return;

		let libs:number[] = mapDesc.proplib || [];

		let btn:eui.ToggleButton;

		for(let type in this.allBtns)
		{
			btn = this.allBtns[type];

			if(btn && libs.indexOf(parseInt(type)) >= 0)
			{
				btn.$autoSelected = false;
				
				btn.visible = true;
			}
			else
			{
				btn.visible = false;
			}

			btn.selected = App.player.haveGoods(parseInt(type));
		}
	}

	public show():void
	{
		App.layer.addChild(this, LayerType.ui);
	}

	public dispose():void
	{
		this.removeEvent();

		RES.destroyRes(ResConst.json_toolbar);

		super.dispose();
	}
}