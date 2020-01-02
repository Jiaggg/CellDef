/** 统一销毁入口 */
interface IDispose 
{
	dispose():void;
}

/** 位置点 */
interface IPoint
{
	/** x位置 */
	x?:number;
	/** y位置 */
	y?:number;
	/** 角度 */
	r?:number[];
}

/**
 * 玩家信息，可转成json保存到本地的数据
 */
interface IPlayerInfo 
{
	/** 关卡数 */
	levelData?:ILevelData[];
	/** 解锁道具 */
	prop?:number[];
}

/**
 * 关卡数据
 */
interface ILevelData
{
	/** 关卡数 */
	level?:number;
	/** 解锁星级 */
	star?:number;
}

/**
 * 游戏配置数据
 */
interface IConfigData
{
	/** 关卡开启所需星星数 */
	level?:number[];
	/** 商店出售物品数据 */
	shop?:IShopData[];
	/** 道具金币价格 */
	price?:Dictionary<number>;
}

/**
 * 商店出售物品数据
 */
interface IShopData
{
	/** 商品类型 */
	type?:PropType;
	/** 需要星星数 */
	needStar?:number;
}

/**
 * 关卡描述数据
 */
interface IMapDesc
{
	/** 关卡时间 */
	time?:number;
	/** 显示教学 */
	teach?:number;
	/** 最大金币量 */
	maxGold?:number;
	/** 每秒金币增加量 */
	addGold?:number;
	/** 细菌最高值 */
	germTotal?:number;
	/** 细菌安全最小值 */
	germMinSafe?:number;
	/** 细菌安全最大值 */
	germMaxSafe?:number;
	/** 插画数量 */
	plateTotal?:number;
	/** 关卡结果评级 */
	qua?:number[][];
	/** 解锁道具 */
	unlock?:number;
	/** 装备库 */
	proplib?:number[];
	/** 炮台位置 */
	fortpos?:IPoint;
}

/**
 * 关卡地图图片数据
 */
interface IMapData
{
	/** 关卡 */
	level?:number;
	/** 细菌活动区域 */
	germ?:egret.Texture;
	/** t细胞活动区域 */
	tcell?:egret.Texture;
	/** 关卡描述数据 */
	desc?:IMapDesc;
	/** 地图网格 */
	grid?:any;
}

/** 关卡细胞/细菌创建工厂 */
interface ILevelFactory
{
	/** 根据当前时间获取新增的细菌 */
	getGramByTime(time:number):any[];

	/** 根据当前时间获取新增的细胞 */
	getCellByTime(time:number):any[];

	/** 获取每4秒新增的细菌 */
	getGrem(time:number):any;

	/** 获取每2-3秒新增的细胞 */
	getCell(time:number):any;
}

/**
 * 实现enterframe接口
 */
interface IEnterFrame
{
	update(frame:number):void;
}

/**
 * avatar数据
 */
interface IAvatarData
{
	/** 具体类型 */
	type?:PropType;
	/** x位置 */
	x?:number;
	/** y位置 */
	y?:number;
	/** 等级(1-3) */
	grade?:number;
	/** 速度 */
	speed?:number;
	/** 方向 */
	angel?:number;
	/** 是否是有害菌 */
	supper?:boolean;
	/** 有害菌等级 */
	sgrade?:number;
}

type Dictionary<T> = {[id:string]:T};