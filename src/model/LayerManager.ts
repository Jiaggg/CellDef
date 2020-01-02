/**
 * 层级管理
 */
class LayerManager 
{
	private static _instance:LayerManager;

	/** 舞台宽度 */
	public static STAGE_WIDTH:number = 1920;
	/** 舞台高度 */
	public static STAGE_HEIGHT:number = 1080;

	/** 游戏舞台 */
	private _stage:egret.Stage;
	/** 场景层 */
	private _senceLayer:eui.UILayer;
	/** ui层 */
	private _uiLayer:eui.UILayer;
	/** 顶层 */
	private _topLayer:eui.UILayer;

	public constructor()
	{
		LayerManager._instance = this;
	}

	public static get instance():LayerManager
	{
		return this._instance || new LayerManager();
	}

	public setup($stage:egret.Stage):void
	{
		if(!$stage) return;

		this._stage = $stage;

		let sw:number = LayerManager.STAGE_WIDTH;
		let sh:number = LayerManager.STAGE_HEIGHT;

		this._senceLayer = new eui.UILayer();
		this._senceLayer.touchEnabled = false;
		this._senceLayer.scrollEnabled = true;
		this._senceLayer.width = sw;
		this._senceLayer.height = sh;
		this._senceLayer.verticalCenter = 0;
		this._senceLayer.horizontalCenter = 0;

		this._uiLayer = new eui.UILayer();
		this._uiLayer.touchEnabled = false;
		this._uiLayer.scrollEnabled = true;
		this._uiLayer.width = sw;
		this._uiLayer.height = sh;
		this._uiLayer.verticalCenter = 0;
		this._uiLayer.horizontalCenter = 0;

		this._topLayer = new eui.UILayer();
		this._topLayer.touchEnabled = false;
		this._topLayer.scrollEnabled = true;
		this._topLayer.width = sw;
		this._topLayer.height = sh;
		this._topLayer.verticalCenter = 0;
		this._topLayer.horizontalCenter = 0;

		this._stage.addChild(this._senceLayer);
		this._stage.addChild(this._uiLayer);
		this._stage.addChild(this._topLayer);
	}

	/** 添加显示对象到层 */
	public addChild(childer:egret.DisplayObject, type:LayerType):void
	{
		if(!childer) return;

		let layer:eui.UILayer = this.getLayerByType(type);

		layer && layer.addChild(childer);
	}

	/**
	 * 根据类型获取层
	 */
	private getLayerByType(type:LayerType):eui.UILayer
	{
		switch(type)
		{
			case LayerType.scene:
				return this._senceLayer;
			case LayerType.top:
				return this._topLayer;
			case LayerType.ui:
				return this._uiLayer;
		}

		return null;
	}

	/** 清除所有元素 */
	public clearAll():void
	{
		this.clearLayer(LayerType.scene);

		this.clearLayer(LayerType.ui);
		
		this.clearLayer(LayerType.top);
	}

	/** 清除目标层上的元素 */
	public clearLayer(type:LayerType):void
	{
		let layer:eui.UILayer = this.getLayerByType(type);

		if(layer)
		{
			while(layer.numChildren > 0)
			{
				GameConst.dispose(layer.getChildAt(0));
			}
		}
	}
}

/** 层级类型 */
const enum LayerType
{
	/** 场景层 */
	scene = 1,
	/** ui层 */
	ui = 2,
	/** 顶层 */
	top = 3
}