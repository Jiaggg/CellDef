/**
 * 游戏关卡场景
 */
class LevelScene extends eui.UILayer
{
	/** 细菌地图 */
	private _germImg:egret.Bitmap;
	/** t细胞地图 */
	private _tcellImg:egret.Bitmap;
	/** 关卡地图数据 */
	private _mapData:IMapData;
	/** 炮台 */
	private _fortMc:FortAvatar;
	/** 选中目标 */
	private _target:BaseAvatar;
	/** 触摸点当前位置 */
	private _currPos:egret.Point;
	/** 炮台已触摸 */
	private _fortDown:boolean;
	/** 是否需要购买 */
	private _needBuy:boolean;
	/** 初始点 */
	private _initPoint:IPoint;

	public constructor() 
	{
		super();

		this.width = 1920;
		this.height = 1080;
		this.verticalCenter = 0;
		this.horizontalCenter = 0;
		this.touchEnabled = false;
		this._initPoint = {};
	}

	/** 游戏启动 */
	public setup($mapData:IMapData):void
	{
		this.show();

		this._mapData = $mapData;

		App.game.setup(this._mapData);

		this.initMap($mapData);

		this.initView();

		this.initEvent();

		this.showTeach();
	}

	/** 初始化地图 */
	private initMap($mapData:IMapData):void
	{
		this._germImg = new egret.Bitmap();
		this._germImg.texture = $mapData.germ;
		this.addChild(this._germImg);

		this._tcellImg = new egret.Bitmap();
		this._tcellImg.texture = $mapData.tcell;
		this.addChild(this._tcellImg);

		App.grid.setup($mapData.grid);
	}

	/** 初始化游戏ui视图 */
	private initView():void
	{
		!this._currPos && (this._currPos = new egret.Point());

		let desc:IMapDesc = this._mapData.desc;

		new HpBar(desc).show();
		
		new ToolBar().show();

		new PriceBar().show();

		new TimeBar().show();

		this._fortMc = new FortAvatar();

		this._fortMc.show(desc.fortpos);
	}

	private initEvent():void
	{
		App.stage.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__touchBeginHandler, this);
	}

	private removeEvent():void
	{
		App.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__touchBeginHandler, this);

		this.removeTouchEvent();
	}

	private addTouchEvent():void
	{
		App.stage.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.__touchMoveHandler, this);
		App.stage.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.__touchCancelHandler, this);
		App.stage.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.__touchCancelHandler, this);
	}

	private removeTouchEvent():void
	{
		App.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.__touchMoveHandler, this);
		App.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.__touchCancelHandler, this);
		App.stage.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.__touchCancelHandler, this);
	}

	/** 触摸开始 */
	private __touchBeginHandler(e:egret.TouchEvent):void
	{
		let target:any = e.target;

		if(!target) return;

		if(egret.is(target, "BaseAvatar"))
		{
			this._needBuy = false;

			this._target = target;

			this._target.stop();

			this._initPoint.x = this._target.x;

			this._initPoint.y = this._target.y

			this.addTouchEvent();
		}
		else if(egret.is(target, "eui.ToggleButton"))
		{
			let type:number = parseInt((<eui.ToggleButton>target).label);

			if(!App.player.haveGoods(type))
			{
				App.msg.show("未解锁该道具!");
				return;
			}

			this._needBuy = true;

			this._target = App.game.create(type);

			this.globalToLocal(e.stageX, e.stageY, this._currPos);

			this._target.x = this._currPos.x;

			this._target.y = this._currPos.y;

			this.addTouchEvent();
		}
	}

	/** 触摸移动 */
	private __touchMoveHandler(e:egret.TouchEvent):void
	{
		let mtar:any = e.target;

		if(!this._fortDown && this._target && egret.is(mtar, "FortAvatar"))
		{
			this._fortDown = true;

			this._fortMc.addChildAt(this._target, 0);

			this._target.x = 50;

			this._target.y = 0;

			this._target.rotation = 0;
		}
		else if(this._fortDown)
		{
			this.globalToLocal(e.stageX, e.stageY, this._currPos);

			this._fortMc.touchPos(this._currPos.x, this._currPos.y);
		}

		if(this._target && !this._fortDown)
		{
			this.globalToLocal(e.stageX, e.stageY, this._currPos);
			
			this._target.x = this._currPos.x;

			this._target.y = this._currPos.y;
		}
	}

	/** 触摸取消 */
	private __touchCancelHandler(e:egret.TouchEvent):void
	{
		if(this._target)
		{
			//需要购买
			if(this._needBuy)
			{
				this._needBuy = false;

				if(!this._fortDown)
				{
					this._target.dispose();

					this._target = null;
				}
				else
				{
					let price:number = App.config.getPriceByType(this._target.type);

					if(price > App.game.currGold)
					{
						//金币不足
						this._target.dispose();

						this._target = null;
					}
					else
					{
						App.game.buyProp(price);

						if(this._target.type == PropType.water)
						{
							App.game.addWater();

							this._target.dispose();
							
							this._target = null;
						}
						else
						{
							this._target.isRandom = true;

							this._fortMc.localToGlobal(this._target.x, this._target.y, this._currPos);

							this._target.x = this._currPos.x;

							this._target.y = this._currPos.y;

							this._target.setAngle(this._fortMc.rotation);

							this._target.setSpeed(this._fortMc.currRate);

							this._target.show();

							this._target.start();

							App.game.addAvatar(this._target);

							App.game.dispatchEventWith(MEvent.GERM_UPDATE);
						}
					}
				}
			}
			else 
			{
				if(this._target)
				{
					if(this._fortDown)
					{
						this._target.isRandom = true;

						this._fortMc.localToGlobal(this._target.x, this._target.y, this._currPos);

						this._target.x = this._currPos.x;

						this._target.y = this._currPos.y;

						this._target.setAngle(this._fortMc.rotation);

						this._target.setSpeed(this._fortMc.currRate);
					}
					else
					{
						this._target.x = this._initPoint.x;

						this._target.y = this._initPoint.y;
					}

					this._target.show();

					this._target.start();
				}
			}
		}

		this._fortMc.setRate(1);

		this._target = null;

		this._fortDown = false;

		this.removeTouchEvent();
	}

	private show():void
	{
		App.layer.addChild(this, LayerType.scene);
	}

	/** 显示教学 */
	private showTeach():void
	{
		let starNum:number = App.player.getDataByLevel(this._mapData.level).star;

		let teach:number = this._mapData.desc.teach;

		if(DEBUG)
		{
			teach = 0;
		}
		
		if(teach && !starNum)
		{
			let teachFrame:TeachFrame = new TeachFrame();

			teachFrame.addEventListener(MEvent.DISPOSE, this.__teachFrameCloseHandler, this);

			teachFrame.show();
		}
		else
		{
			this.__teachFrameCloseHandler(null);
		}
	}

	/** 教学界面关闭 */
	private __teachFrameCloseHandler(e:egret.Event):void
	{
		if(e)
		{
			let target:BaseUI = e.target;

			target && target.removeEventListener(MEvent.DISPOSE, this.__teachFrameCloseHandler, this);
		}
		
		setTimeout(this.startGame.bind(this), 50);
	}

	/** 开始游戏 */
	private startGame():void
	{
		App.game.start();
	}

	/** 退出场景 */
	public exit():void
	{
		this.removeEvent();
	}
}