/**
 * 游戏配置管理
 */
class ConfigManager 
{
	private static _instance:ConfigManager;

	/** 游戏配置数据 */
	private config_data:IConfigData;

	public constructor() 
	{
		ConfigManager._instance = this;
	}

	public static get instance():ConfigManager
	{
		return this._instance || new ConfigManager();
	}

	/**
	 * 启动游戏配置管理
	 * @param config_data config_data.json配置数据
	 */
	public setup($config_data:any):void
	{
		if(!$config_data)
		{
			console.error("找不到游戏配置信息!!!");

			$config_data = {};
		}

		this.config_data = $config_data;
	}

	/**
	 * 根据关卡数获取关卡开启所需星星
	 * @param level 关卡数
	 */
	public getOpenStarByLevel(level:number):number
	{
		if(!this.config_data.level)
		{
			return 0;
		}

		return this.config_data.level[level - 1] || 0;
	}

	/**
	 * 获取商店出售的所有物品
	 */
	public getAllShopGoods():IShopData[]
	{
		let all:IShopData[] = this.config_data.shop;
		
		return all || [];
	}

	/** 
	 * 根据道具类型获取金币价格
	 */
	public getPriceByType(type:PropType):number
	{
		let price:Dictionary<number> = this.config_data.price;

		if(!price)
		{
			price = this.config_data.price = {};
		}

		return price[type] || 0;
	}
}