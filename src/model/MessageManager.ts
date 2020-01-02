/**
 * 消息提示管理
 */
class MessageManager 
{
	private static _instance:MessageManager;
	/** 是否已启动 */
	private _isSetup:boolean;
	/** 内容组 */
	private contGroup:eui.Group;
	/** 提示信息 */
	private msgTxt:eui.Label;

	public constructor()
	{
		MessageManager._instance = this;
	}

	public static get instance():MessageManager
	{
		return this._instance || new MessageManager();
	}

	public setup():void
	{
		if(this._isSetup) return;

		this._isSetup = true;

		this.initView();
	}

	private initView():void
	{
		this.contGroup = new eui.Group();
		this.contGroup.horizontalCenter = 0;
		this.contGroup.verticalCenter = 0;
		this.contGroup.width = 400;
		this.contGroup.height = 100;

		let backImg:eui.Image = new eui.Image();
		backImg.percentWidth = 100;
		backImg.percentHeight = 100;
		backImg.source = "core_json.msg_back";
		backImg.scale9Grid = new egret.Rectangle(50, 20, 350, 80);
		this.contGroup.addChild(backImg);

		let shape:eui.Rect = new eui.Rect(50, 50, 0xFFFFFF);
		shape.alpha = 0.8;
		shape.left = shape.top = shape.bottom = 10;
		shape.right = 20;
		this.contGroup.addChild(shape);

		this.msgTxt = new eui.Label();
		this.msgTxt.textAlign = "center";
		this.msgTxt.fontFamily = "SimSun";
		this.msgTxt.textColor = 0xFF0000;
		this.msgTxt.size = 30;
		this.msgTxt.height = 30;
		this.msgTxt.horizontalCenter = 0;
		this.msgTxt.verticalCenter = 0;
		this.msgTxt.stroke = 1;
		this.msgTxt.strokeColor = 0x686868;
		this.contGroup.addChild(this.msgTxt);
	}

	/**
	 * 显示提示信息
	 */
	public show(msg:string):void
	{
		if(!msg) return;

		egret.Tween.removeTweens(this.contGroup);

		this.contGroup.verticalCenter = 0;

		this.msgTxt.text = msg;

		App.layer.addChild(this.contGroup, LayerType.top);

		let _this = this;

		egret.Tween.get(this.contGroup).to({verticalCenter:-100}, 600).wait(300).call(function(){
			_this.contGroup.parent && _this.contGroup.parent.removeChild(_this.contGroup);
		}, this);
	}
}