/**
 * avatar创建工厂
 */
class AvatarFactory 
{
	/** 当前关卡 */
	private _level:number;
	/** 关卡/工厂关联 */
	private _dicts:Dictionary<any>;
	/** 当前工厂 */
	private _currFactory:ILevelFactory;

	public constructor() 
	{
		this._dicts = {};

		this._dicts[1] = LevelFactory_1;
		this._dicts[2] = LevelFactory_2;
		this._dicts[3] = LevelFactory_3;
		this._dicts[4] = LevelFactory_4;
		this._dicts[5] = LevelFactory_5;
		this._dicts[6] = LevelFactory_6;
		this._dicts[7] = LevelFactory_7;
	}

	/** 工厂初始化 */
	public init(level:number):void
	{
		this._level = level;

		let clazz:any = this._dicts[level];

		if(!clazz)
		{
			console.log("未找到细菌工厂!!!");
			return;
		}

		this._currFactory = new clazz();
	}

	/** 获取每4秒新增的细菌 */
	public getGrem(time:number):IAvatarData
	{
		if(!this._currFactory)
		{
			return null;
		}

		return this._currFactory.getGrem(time);
	}

	/** 获取每2-3秒新增的细胞 */
	public getCell(time:number):IAvatarData
	{
		if(!this._currFactory)
		{
			return null;
		}

		return this._currFactory.getCell(time);
	}

	/** 根据当前时间获取新增的细菌 */
	public getGramByTime(time:number):IAvatarData[]
	{
		if(!this._currFactory)
		{
			return null;
		}

		return this._currFactory.getGramByTime(time);
	}

	/** 根据当前时间获取新增的细胞 */
	public getCellByTime(time:number):IAvatarData[]
	{
		if(!this._currFactory)
		{
			return null;
		}

		return this._currFactory.getCellByTime(time);
	}

	public exit():void
	{
		this._currFactory = null;
	}
}