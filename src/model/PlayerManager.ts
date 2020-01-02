/**
 * 玩家信息
 */
class PlayerManager 
{
	private static _instance:PlayerManager;

	/** 数据字段 */
	private _dataKey:string;
	/** 玩家信息 */
	private _playerInfo:IPlayerInfo;

	public constructor() 
	{
		PlayerManager._instance = this;
	}

	public static get instance():PlayerManager
	{
		return this._instance || new PlayerManager();
	}

	public setup():void
	{
		this._dataKey = "virus";

		let cacheData:any = egret.localStorage.getItem(this._dataKey);

		if(!!cacheData)
		{
			try
			{
				this._playerInfo = JSON.parse(cacheData);
			}
			catch(e)
			{
				console.log("缓存数据错误!")
			}
		}

		if(!this._playerInfo)
		{
			this.initPlayerData();
		}

		console.log("玩家数据：", this._playerInfo);
	}

	/** 初始化玩家数据 */
	private initPlayerData():void
	{
		this._playerInfo = {};
		
		this._playerInfo.levelData = [];

		this._playerInfo.prop = [101, 301];

		this.savePlayerData();
	}

	/**
	 * 根据关卡获取关卡数据
	 * @param $level 关卡数
	 */
	public getDataByLevel($level:number):ILevelData
	{
		let leveData:ILevelData[] = this._playerInfo.levelData;

		if(!leveData)
		{
			leveData = this._playerInfo.levelData = [];
		}

		let data:ILevelData = leveData[$level];

		if(!data)
		{
			data = leveData[$level] = {level:$level, star: 0};
		}

		return data; 
	}

	/**
	 * 玩家是否已拥有该物品
	 */
	public haveGoods(type:PropType):boolean
	{
		let haveProp:number[] = this._playerInfo.prop;

		return haveProp.indexOf(type) >= 0;
	}

	/**
	 * 玩家当前拥有星星数
	 */
	public get totalStar():number
	{
		let totalStar:number = 0;

		let leveData:ILevelData[] = this._playerInfo.levelData;

		let length:number = leveData ? leveData.length : 0;

		for(let i = 0; i < length; i ++)
		{
			if(!leveData[i]) continue;
			
			totalStar += (leveData[i].star || 0);
		}

		return totalStar;
	}

	/**
	 * 保存用户数据
	 */
	private savePlayerData():void
	{
		if(!this._playerInfo) return;

		let saveData:string = "";

		try
		{
			saveData = JSON.stringify(this._playerInfo);

			egret.localStorage.setItem(this._dataKey, saveData);

			console.log("保存数据成功!", saveData);
		}
		catch(e)
		{
			console.log("保存数据错误！");
		}
	}

	/** 清除玩家数据 */
	public clearPlayerData():void
	{
		this.initPlayerData();
	}

	/** 更新关卡星级数 */
	public updateLevelStar(level:number, star:number):void
	{
		let levelData:ILevelData = this.getDataByLevel(level);

		if(levelData.star < star)
		{
			levelData.star = star;
		}

		this.savePlayerData();
	}

	/** 获得一个道具 */
	public addPorp(propId:PropType):void
	{
		if(!propId) return;

		let haveProp:number[] = this._playerInfo.prop;

		if(haveProp.indexOf(propId) == -1)
		{
			haveProp.push(propId);

			this.savePlayerData();

			SwitchHelp.openNewPropFrame(propId);
		}
	}
}