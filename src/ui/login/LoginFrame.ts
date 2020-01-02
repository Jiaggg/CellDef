/**
 * 登录界面
 */
class LoginFrame extends BaseUI
{
	/** 背景图 */
	private backImg:eui.Image;
	/** 开始按钮 */
	private startBtn:eui.Button;
	/** 声音开关 */
	private soundBtn:eui.CheckBox;
	/** logo图片 */
	private logoImg:eui.Image;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		this.logoImg.y = -256;
		this.soundBtn.y = -70;
		this.startBtn.y = 1920;
	}

	protected initEvent():void
	{
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__startBtnHandler, this);
	}

	protected removeEvent():void
	{
		this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__startBtnHandler, this);
	}

	protected initData():void
	{
		egret.Tween.get(this).wait(200).call(this.__startPlay, this);
	}

	/** 开始播放动画 */
	private __startPlay():void
	{
		egret.Tween.get(this.logoImg).to({y:169}, 500, egret.Ease.sineInOut);

		egret.Tween.get(this.soundBtn).to({y:138}, 500, egret.Ease.sineInOut);

		egret.Tween.get(this.startBtn).wait(400).to({y:848}, 500, egret.Ease.sineInOut);
	}

	/** 开始游戏 */
	private __startBtnHandler(e:egret.TouchEvent):void
	{
		if(RELEASE)
		{
			App.loading.show();

			let page:FristPageView = new FristPageView();

			page.verticalCenter = 0;

			page.horizontalCenter = 0;

			page.addEventListener(egret.Event.COMPLETE, this.dispose, this);

			page.addEventListener(MEvent.DISPOSE, this.__pageCloseHandler, this);

			page.start();
		}
		else if(DEBUG)
		{
			this.dispose();
			
			this.__pageCloseHandler(null);
		}

	}

	/**
     * 首页结束
     */
    private __pageCloseHandler(e:egret.Event):void
    {
        SwitchHelp.openLevelFrame();
    }

	public show():void
	{
		App.layer.addChild(this, LayerType.ui);
	}

	public dispose():void
	{
		this.removeEvent();

		GameConst.dispose(this.backImg);
		this.backImg = null;

		GameConst.dispose(this.soundBtn);
		this.soundBtn = null;

		GameConst.dispose(this.startBtn);
		this.startBtn = null;

		RES.destroyRes(ResConst.group_login);

		super.dispose();
	}
}