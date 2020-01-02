/**
 * 解锁新道具
 */
class NewPorpFrame extends BaseUI
{
	/** 背景1 */
	private backImg_1:eui.Image;
	/** 背景2 */
	private backImg_2:eui.Image;
	/** 解锁道具tip */
	private tipImg:eui.Image;
	/** 道具id */
	private propId:number;

	private step:number;

	public constructor()
	{
		super();
	}

	protected initView():void
	{
		this.backImg_1.source = "np_b_1_png";

		this.backImg_2.source = "np_b_2_png";
	}

	protected initEvent():void
	{
		App.stage.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__stageClickHandler, this);
	}

	protected removeEvent():void
	{
		App.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__stageClickHandler, this);
		App.stage.stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
	}

	protected initData():void
	{
		this.updateView();
	}

	private updateView():void
	{
		if(!this._isFinish || !this.propId) return;

		this.tipImg.source = `np_${this.propId}_png`;

		this.step = 0;

		App.stage.stage.addEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
	}

	/** enterframe */
	private __enterFrameHandler(e:egret.Event):void
	{
		this.step ++;

		if(this.step % 5 != 0) return;

		if((this.step / 5) % 2 == 0)
		{
			this.addChildAt(this.backImg_1, 1);
			this.backImg_2.parent && this.backImg_2.parent.removeChild(this.backImg_2);
		}
		else
		{
			this.addChildAt(this.backImg_2, 1);
			this.backImg_1.parent && this.backImg_1.parent.removeChild(this.backImg_1);
		}
	}

	/** 点击任务处关闭 */
	private __stageClickHandler(e:egret.TouchEvent):void
	{
		GameConst.dispose(this);
	}

	public show(pid:PropType):void
	{
		this.propId = pid;

		this.updateView();

		App.layer.addChild(this, LayerType.top);
	}

	public dispose():void
	{
		this.removeEvent();

		if(this.backImg_1)
		{
			GameConst.dispose(this.backImg_1);
			RES.destroyRes(<string>this.backImg_1.source);
		}
		this.backImg_1 = null;

		if(this.backImg_2)
		{
			GameConst.dispose(this.backImg_2);
			RES.destroyRes(<string>this.backImg_2.source);
		}
		this.backImg_2 = null;

		if(this.tipImg)
		{
			GameConst.dispose(this.tipImg);
			RES.destroyRes(<string>this.tipImg.source);
		}
		this.tipImg = null;

		super.dispose();
	}
}