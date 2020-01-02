/**
 * 游戏关卡控制管理
 */
class GameManager extends egret.EventDispatcher
{
	private static _instance:GameManager;

	/** 游戏已启动 */
	private _setuped:boolean;
	/** 游戏状态 */
	private _stauts:GameStauts;
	/** 当前关卡 */
	private _level:number;
	/** 关卡地图数据 */
	private _mapData:IMapData;
	/** 关卡地图配置数据 */
	private _mapDesc:IMapDesc;
	/** 当前游戏帧 */
	private _gameFrame:number;
	/** 关卡总时间(秒) */
	private _totalTime:number;
	/** 当前时间(秒) */
	private _currTime:number;
	/** 当前金币数 */
	private _currGold:number;
	/** 最大金币数 */
	private _maxGold:number;
	/** 当前存在的t细胞 */
	private _tcells:BaseAvatar[] = [];
	/** 当前存在的细菌 */
	private _germs:BaseAvatar[] = [];
	/** 当前存在的有害菌 */
	private _sgerms:BaseAvatar[] = [];
	/** 当前存在的抗生素 */
	private _antis:BaseAvatar[] = [];
	/** avatar创建工厂 */
	private _factory:AvatarFactory;

	public constructor() 
	{
		super();

		GameManager._instance = this;

		egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
			this.pause();
        }
	}

	public static get instance():GameManager
	{
		return this._instance || new GameManager();
	}

	/**
	 * 进入关卡，启动关卡管理
	 */
	public setup(mapData:IMapData):void
	{
		this._mapData = mapData;

		this._level = mapData.level;

		this._mapDesc = this._mapData.desc;

		if(!this._mapDesc)
		{
			console.log("找不到关卡地图描述数据!关卡:", this._level);
			return;
		}

		if(!this._factory)
		{
			this._factory = new AvatarFactory();
		}

		this._setuped = true;

		this.init();
	}

	private init():void
	{
		this.destoryAvatar();

		this._gameFrame = 0;

		this._totalTime = this._mapDesc.time || 60;

		this._maxGold = this._mapDesc.maxGold || 30;

		this._currGold = 0;

		this._currTime = 0;

		this._factory.init(this._level);
	}

	/** 开始游戏 */
	public start():void
	{
		this.initGerm();

		this.resume();
	}

	/** 初始化细菌/t细胞 */
	private initGerm():void
	{
		this.addAvatars();
	}

	private initEvent():void
	{
		App.stage.stage.addEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
	}

	private removeEvent():void
	{
		App.stage.stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
	}

	/** enterframe事件 */
	private __enterFrameHandler(e:egret.Event):void
	{
		this._gameFrame ++;

		this.updateAvatar();

		this.checkAllHit();

		this.updateTime();

		this.dispatchEventWith(MEvent.GAME_ENTER_FRAME);
	}

	/** 检查所有碰撞 */
	private checkAllHit():void
	{
		this.checkTCellHit();
	}

	/** 检查T细胞碰撞 */
	private checkTCellHit():void
	{
		//检查T细胞与T细胞碰撞
		// MapUtils.checkHits(this._tcells, this._tcells);
		//检查T细胞与细菌碰撞
		MapUtils.checkHits(this._tcells, this._germs);
	}

	/** 更新时间 */
	private updateTime():void
	{
		if(this._gameFrame % GameConst.GAME_FRAME == 0)
		{
			this._currTime ++;

			this.updateGold();

			this.dispatchEventWith(MEvent.HEARTBEAT);

			if(this.lastTime <= 0)
			{
				this.gameOver();
			}
			else
			{
				this.addAvatars();
			}
		}
	}

	private updateAvatar():void
	{
		let length:number = this._tcells.length;

		let i:number;

		let avatar:BaseAvatar;

		let changed:boolean = false;

		for(i = length - 1; i >= 0; i --)
		{
			avatar = this._tcells[i];

			if(avatar.isDie)
			{
				changed = true;

				this._tcells.splice(i, 1);

				continue;
			}
			avatar.update(this._gameFrame);
		}

		length = this._germs.length;

		for(i = length - 1; i >= 0; i --)
		{
			avatar = this._germs[i];

			if(avatar.isDie)
			{
				changed = true;

				this._germs.splice(i, 1);

				continue;
			}
			avatar.update(this._gameFrame);
		}

		length = this._antis.length;

		for(i = length - 1; i >= 0; i --)
		{
			avatar = this._antis[i];

			if(avatar.isDie)
			{
				changed = true;

				this._antis.splice(i, 1);

				continue;
			}
			avatar.update(this._gameFrame);
		}

		length = this._sgerms.length;

		for(i = length - 1; i >= 0; i --)
		{
			avatar = this._sgerms[i];

			if(avatar.isDie)
			{
				changed = true;
				
				this._sgerms.splice(i, 1);

				continue;
			}
			avatar.update(this._gameFrame);
		}

		changed && this.dispatchEventWith(MEvent.GERM_UPDATE);
	}

	/** 更新金币 */
	private updateGold():void
	{
		let currGold:number = this.currGold;

		let add:number = this._mapDesc.addGold;

		let addCount:number = add;

		if(currGold + add > this._maxGold)
		{
			addCount = this._maxGold - currGold;
		}

		if(addCount > 0)
		{
			this._currGold += addCount;

			this.dispatchEventWith(MEvent.ADD_GOLD);
		}
	}

	/**
	 * 添加新细菌/细胞
	 */
	private addAvatars():void
	{
		let changed:boolean = false;

		let grams:IAvatarData[] = this._factory.getGramByTime(this._currTime);

		if(grams && grams.length > 0)
		{
			changed = true;

			this.createAvatar(grams);
		}

		let cells:IAvatarData[] = this._factory.getCellByTime(this._currTime);

		if(cells && cells.length > 0)
		{
			changed = true;

			this.createAvatar(cells);
		}

		let gram:IAvatarData = this._factory.getGrem(this._currTime);

		if(gram)
		{
			changed = true;

			this.createAvatar([gram]);
		}

		let cell:IAvatarData = this._factory.getCell(this._currTime);

		if(cell)
		{
			changed = true;

			this.createAvatar([cell]);
		}

		changed && this.dispatchEventWith(MEvent.GERM_UPDATE);
	}

	/** 创建avatar */
	protected createAvatar(avos:IAvatarData[]):void
	{
		if(!avos || avos.length == 0) return;

		let length:number = avos.length;

		let avo:IAvatarData;

		let avatar:BaseAvatar;

		for(let i = 0; i < length; i ++)
		{
			avo = avos[i];

			this.createAvatarByType(avo);
		}
	}

	/** 根据类型创建avatar */
	protected createAvatarByType(avo:IAvatarData, add:boolean=true):BaseAvatar
	{
		let avatar:BaseAvatar;

		if(avo)
		{
			switch(avo.type)
			{
				case PropType.water:
					avatar = new WaterAvatar(avo);
					break;
				case PropType.t_cell:
					avatar = new TCellAvatar(avo);
					break;
				case PropType.germ_1:
					avatar = new Germ_1_Avatar(avo);
					break;
				case PropType.germ_2:
					avatar = new Germ_2_Avatar(avo);
					break;
				case PropType.germ_3:
					avatar = new Germ_3_Avatar(avo);
					break;
				case PropType.germ_4:
					avatar = new Germ_4_Avatar(avo);
					break;
				case PropType.anti_1:
					avatar = new AntiAvatar_1(avo);
					break;
				case PropType.anti_2:
					avatar = new AntiAvatar_2(avo);
					break;
				case PropType.anti_3:
					avatar = new AntiAvatar_3(avo);
					break;
			}

			if(avatar && add)
			{
				this.addAvatar(avatar);
			}
		}

		return avatar;
	}

	/** 添加一个avatar */
	public addAvatar(avatar:BaseAvatar):void
	{
		if(!avatar) return;

		let type:number = avatar.type;

		let mstype:number = Math.floor(type / 100);

		let list:BaseAvatar[];

		if(mstype == MasType.type_2)
		{
			list = this._tcells;
		}
		else if(mstype == MasType.type_5)
		{
			list = this._sgerms;
		}
		else if(mstype == MasType.type_4)
		{
			list = this._antis;
		}
		else
		{
			list = this._germs;
		}

		if(list.indexOf(avatar) >= 0)
		{
			return;
		}

		list.push(avatar);
	}

	/** 使用道具水 */
	public addWater():void
	{
		let effect:WaterEffect = new WaterEffect();

		effect.addEventListener(egret.Event.COMPLETE, this.__waterComplete, this);
	}

	private __waterComplete(e:egret.Event):void
	{
		let target:any = e.currentTarget;

		target && target.removeEventListener(egret.Event.COMPLETE, this.__waterComplete, this);

		let min:number = this._mapDesc.germMinSafe || 0;

		let tcellCount:number = this.tcellCount;

		let germCount:number = this.germCount;

		let lastTcell:number = 0;

		let lastGerm:number = 0;

		if(tcellCount >= 15 && germCount >= 15)
		{
			lastTcell = min - Math.floor(Math.random() * 3 + 1);

			lastGerm = min - Math.floor(Math.random() * 3 + 1);
		}

		while(this._tcells.length > lastTcell)
		{
			GameConst.dispose(this._tcells.pop())
		}

		while(this._germs.length > lastGerm)
		{
			GameConst.dispose(this._germs.pop());
		}

		this.dispatchEventWith(MEvent.GERM_UPDATE);
	}

	/** 当前游戏帧 */
	public get gameFrame():number
	{
		return this._gameFrame;
	}

	/** 最大金币数 */
	public get maxGold():number
	{
		return this._maxGold;
	}

	/** 当前金币数 */
	public get currGold():number
	{
		return this._currGold;
	}

	/** 当前剩余时间 */
	public get lastTime():number
	{
		return this._totalTime - this._currTime;
	}

	/** 当前剩余细胞数量 */
	public get tcellCount():number
	{
		return this._tcells.length;
	}

	/** 当前剩余细菌数量 */
	public get germCount():number
	{
		return this._germs.length;
	}

	/** 当前剩余有害菌数量 */
	public get sgermCount():number
	{
		return this._sgerms.length;
	}

	/** 游戏暂停 */
	public pause():void
	{
		if(this._stauts != GameStauts.start) return;

		this._stauts = GameStauts.pause;

		this.removeEvent();

		SwitchHelp.openPauseFrame();
	}

	/** 游戏继续 */
	public resume():void
	{
		if(!this._setuped || this._stauts == GameStauts.start) return;

		this._stauts = GameStauts.start;

		this.initEvent();
	}

	/** 游戏重新开始 */
	public restart():void
	{
		if(!this._setuped) return;

		this.init();

		this.start();

		this.dispatchEventWith(MEvent.RESTART);
	}

	/** 游戏结束 */
	public gameOver():void
	{
		if(!this._setuped) return;

		this._stauts = GameStauts.over;

		this.removeEvent();

		this.dispatchEventWith(MEvent.GAME_OVER);
	}

	/** 销毁avatar */
	private destoryAvatar():void
	{
		let allAvatar:BaseAvatar[] = this._tcells.concat(this._germs).concat(this._sgerms).concat(this._antis);

		let length:number = allAvatar.length;

		for(let i = 0; i < length; i ++)
		{
			GameConst.dispose(allAvatar[i]);
		}

		this._tcells.length = 0;
		
		this._germs.length = 0;

		this._sgerms.length = 0;

		this._antis.length = 0;
	}

	/** 根据类型创建avatar */
	public create(type:number):BaseAvatar
	{
		let avatar:BaseAvatar;

		let avo:IAvatarData = {};

		avo.type = type;

		avo.speed = GameConst.getGermSpeedByType(type);

		avo.grade = 3;

		avatar = this.createAvatarByType(avo, false);

		return avatar;
	}

	/** 购买一个道具 */
	public buyProp(price:number):void
	{
		this._currGold -= price;

		this.dispatchEventWith(MEvent.ADD_GOLD);
	}

	/** 退出关卡地图 */
	public exit():void
	{
		this.removeEvent();

		this._setuped = false;

		this._mapData = null;

		this._mapDesc = null;

		this._level = 0;

		this._gameFrame = 0;

		this._stauts = GameStauts.no_start;

		this.destoryAvatar();

		this._factory.exit();
	}
}