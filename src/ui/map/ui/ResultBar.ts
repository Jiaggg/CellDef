/**
 * 结果面板
 */
class ResultBar extends BaseUI
{
	/** 结果标题 */
	private result_img:eui.Image;
	/** 星星 */
	private starGroup:eui.Group;
	/** 按钮组 */
	private btnGroup:eui.Group;
	/** 结果问题描述 */
	private result_desc_img:eui.Image;
	/** 健康状态 */
	private result_tip_img:eui.Image;
	/** 星星1 */
	private star_1:eui.Image;
	/** 星星2 */
	private star_2:eui.Image;
	/** 星星3 */
	private star_3:eui.Image;
	/** 返回 */
	private backBtn:eui.Button;
	/** 菜单 */
	private menuBtn:eui.Button;
	/** 下一关 */
	private nextBtn:eui.Button;
	/** 结果状态 */
	private resStatus:ResultStatus;
	/** 星级 */
	private star:number;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

	}

	protected initEvent():void
	{
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__backBtnHandler, this);
		this.menuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__menuBtnHandler, this);
		this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__nextBtnHandler, this);
	}

	protected removeEvent():void
	{
		this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__backBtnHandler, this);
		this.menuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__menuBtnHandler, this);
		this.nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__nextBtnHandler, this);
	}

	protected initData():void
	{
		this.updateView();
	}

	private updateView():void
	{
		if(!this._isFinish || !this.resStatus) return;

		if(this.resStatus == ResultStatus.success)
		{
			this.result_tip_img.source = "res_succ_tips_png";

			this.result_img.source = "result_json.res_succ_title";

			this.starGroup.visible = true;

			this.result_desc_img.source = "succ_1_png";

			this.result_desc_img.verticalCenter = 160;

			let star:number = this.star;

			let img:eui.Image;

			for(let i = 1; i <= star; i ++)
			{
				img = this["star_" + i];

				img && (img.source = "result_json.res_star_d");
			}
		}
		else
		{
			this.result_tip_img.source = "res_fail_tips_png";

			this.result_img.source = "result_json.res_fail_title";

			this.starGroup.visible = false;

			if(this.resStatus == ResultStatus.fail_3)
			{
				this.result_desc_img.source = "succ_1_png";
			}
			else
			{
				let level:number = App.scene.level;

				this.result_desc_img.source = `fail_${this.resStatus}_${level}_png`;
			}

			this.result_desc_img.verticalCenter = 20;
		}
	}

	/** 返回 */
	private __backBtnHandler(e:egret.TouchEvent):void
	{
		App.game.restart();

		GameConst.dispose(this);
	}

	/** 菜单 */
	private __menuBtnHandler(e:egret.TouchEvent):void
	{
		App.scene.exitScene();
	}

	/** 下一关 */
	private __nextBtnHandler(e:egret.TouchEvent):void
	{
		App.scene.exitScene();
	}

	public show(res:ResultStatus, star:number):void
	{
		this.resStatus = res;

		this.star = star;

		this.updateView();

		App.layer.addChild(this, LayerType.ui);
	}

	public dispose():void
	{
		this.removeEvent();

		GameConst.dispose(this.result_img);
		this.result_img = null;

		GameConst.dispose(this.result_desc_img);
		this.result_desc_img = null;

		GameConst.dispose(this.result_tip_img);
		this.result_tip_img = null;

		GameConst.dispose(this.star_1);
		this.star_1 = null;

		GameConst.dispose(this.star_2);
		this.star_2 = null;

		GameConst.dispose(this.star_3);
		this.star_3 = null;

		GameConst.dispose(this.starGroup);
		this.starGroup = null;

		GameConst.dispose(this.backBtn);
		this.backBtn = null;

		GameConst.dispose(this.menuBtn);
		this.menuBtn = null;

		GameConst.dispose(this.nextBtn);
		this.nextBtn = null;

		GameConst.dispose(this.btnGroup);
		this.btnGroup = null;

		super.dispose();
	}
}