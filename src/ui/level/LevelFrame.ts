/**
 * 关卡主界面
 */
class LevelFrame extends BaseUI
{
	/** 关卡背景 */
	private backImg:eui.Image;
	/** 锁 */
	private lockImg:eui.Image;
	/** 关卡标题 */
	private titleImg:eui.Image;
	/** 上一关 */
	private leftBtn:eui.Button;
	/** 下一关 */
	private rightBtn:eui.Button;
	/** 商店 */
	private shopBtn:eui.Button;
	/** 当前关卡 */
	private currLevel:number;
	/** 当前背景图key */
	private currKey:string;
	/** 星级容器 */
	private starGroup:eui.Group;
	/** 星星1 */
	private star_1:eui.Image;
	/** 星星2 */
	private star_2:eui.Image;
	/** 星星3 */
	private star_3:eui.Image;
	/** 是否已锁 */
	private is_lock:boolean;
	/** 当前关卡数据 */
	private levelData:ILevelData;
	/** 背景url地址 */
	private urlList:string[];

	public constructor()
	{
		super();
	}

	protected initView():void
	{
		this.verticalCenter = 0;
		this.horizontalCenter = 0;

		this.urlList = [];
	}

	protected initEvent():void
	{
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__preLevelHandler, this);
		this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__nextLevelHandler, this);
		this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__openShopHandler, this);
		this.backImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__clickHandler, this);
	}

	protected removeEvent():void
	{
		this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__preLevelHandler, this);
		this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__nextLevelHandler, this);
		this.shopBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__openShopHandler, this);
		this.backImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__clickHandler, this);
	}

	protected initData():void
	{
		this.currLevel = this.currLevel || 1;

		this.updateView();
	}

	/**
	 * 上一关
	 */
	private __preLevelHandler(e:egret.TouchEvent):void
	{
		this.currLevel --;

		this.updateView();
	}

	/**
	 * 下一关
	 */
	private __nextLevelHandler(e:egret.TouchEvent):void
	{
		this.currLevel ++;

		this.updateView();
	}

	/**
	 * 点击开始游戏
	 */
	private __clickHandler(e:egret.TouchEvent):void
	{
		if(this.is_lock)
		{
			App.msg.show("关卡未解锁!!!");
			return;
		}

		App.scene.enter(this.currLevel);
	}

	/** 打开商店 */
	private __openShopHandler(e:egret.TouchEvent):void
	{
		SwitchHelp.openShopFrame();

		GameConst.dispose(this);
	}

	/**
	 * 更新按钮状态
	 */
	private updateBtnState():void
	{
		this.leftBtn.visible = this.currLevel > 1;

		this.rightBtn.visible = this.currLevel < GameConst.MAX_LEVEL;
	}

	/**
	 * 更新界面
	 */
	protected updateView():void
	{
		if(!this._isFinish || !this.currLevel) return;

		this.levelData = App.player.getDataByLevel(this.currLevel);

		this.updateBtnState();

		this.titleImg.source = "level_json.level_t_" + this.currLevel;

		let needStar:number = App.config.getOpenStarByLevel(this.currLevel);

		let haveStar:number = App.player.totalStar;

		this.is_lock = needStar > haveStar;
		
		this.updateStar();

		this.currKey = GameConst.getLevelBackPath(this.currLevel, this.is_lock);

		if(this.urlList.indexOf(this.currKey) == -1)
		{
			this.urlList.push(this.currKey);
		}

		RES.getResByUrl(this.currKey, this.__backCompleteHandler, this);
	}

	/**
	 * 背景图加载完成
	 */
	private __backCompleteHandler(data:any, key:string):void
	{
		if(!data || this.currKey != key) return;

		this.backImg.texture = data;
	}

	/** 更新星级显示 */
	private updateStar():void
	{
		let star_num:number = this.levelData.star;

		this.starGroup.visible = !this.is_lock;

		let img:eui.Image;

		for(let i = 1; i <= 3; i ++)
		{
			img = this["star_" + i];

			if(i <= star_num)
			{
				img.source = "level_json.level_star_got";
			}
			else
			{
				img.source = "level_json.level_star_ungot";
			}
		}
	}

	public show(level:number):void
	{
		this.currLevel = level;

		this.updateView();

		App.layer.addChild(this, LayerType.ui);
	}

	public dispose():void
	{
		this.removeEvent();
		
		GameConst.dispose(this.backImg);
		this.backImg = null;

		GameConst.dispose(this.lockImg);
		this.lockImg = null;

		GameConst.dispose(this.titleImg);
		this.titleImg = null;

		GameConst.dispose(this.rightBtn);
		this.rightBtn = null;

		GameConst.dispose(this.leftBtn);
		this.leftBtn = null;

		GameConst.dispose(this.star_1);
		this.star_1 = null;

		GameConst.dispose(this.star_2);
		this.star_2 = null;

		GameConst.dispose(this.star_3);
		this.star_3 = null;

		GameConst.dispose(this.starGroup);
		this.starGroup = null;

		this.levelData = null;

		if(this.urlList)
		{
			while(this.urlList.length > 0)
			{
				RES.destroyRes(this.urlList.pop());
			}
		}
		this.urlList = null;

		RES.destroyRes(ResConst.json_level);

		super.dispose();
	}
}