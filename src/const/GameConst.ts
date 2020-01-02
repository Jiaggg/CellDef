/**
 * 游戏用到的常量
 */
namespace GameConst
{
	/** 游戏帧率 */
	export let GAME_FRAME:number = 60;

	/** 资源根目录目录 */
	export let res_path:string = "resource/";

	/**
	 * 最大关卡数
	 */
	export let MAX_LEVEL:number = 7;

	/**
	 * 根据关卡获取关卡背景图路径
	 */
	export function getLevelBackPath(level:number, lock:boolean):string
	{
		level = level || 1;

		let is_lock:string = lock ? "_lock" : "";

		return GameConst.res_path + "level/level_" + level + is_lock + ".png";
	}

	/**
	 * 根据商店物品类型获取物品背景图片
	 */
	export function getGoodsBackPath(type:PropType):string
	{
		return GameConst.res_path + "shop/shop_" + type + ".png";
	}

	/**
	 * 获取当前页教学背景图片
	 */
	export function getTeachPath(page:number):string
	{
		return GameConst.res_path + "teach/teach_" + page + ".png";
	}

	/**
	 * 获取当前关卡插画描述文件地址
	 */
	export function getPlateDescPath(level:number):string
	{
		return GameConst.res_path + "map/" + level + "/desc.json"
	}
	/**
	 * 获取插画图片地址
	 */
	export function getPlateImgPath(level:number, index:number):string
	{
		return GameConst.res_path + "map/" + level + "/plate/" + index + ".png"
	}

	/**
	 * 获取关卡地图
	 */
	export function getGermMapPath(level:number):string
	{
		return GameConst.res_path + "map/" + level + "/germ_map.png";
	}

	/**
	 * 获取关卡地图
	 */
	export function getTCellMapPath(level:number):string
	{
		return GameConst.res_path + "map/" + level + "/t_cell_map.png";
	}

	/**
	 * 获取网格配置
	 */
	export function getMapGridPath(level:number):string
	{
		return GameConst.res_path + "map/" + level + "/grid.json";
	}

	/**
	 * 获取avatar模型路径
	 */
	export function getAvatarModel(model:string):string
	{
		return GameConst.res_path + "avatar/" + model;
	}

	/**
	 * 销毁对象
	 */
	export function dispose(obj:egret.DisplayObject|IDispose):void
	{
		if(!obj) return;

		if(egret.is(obj, "IDispose"))
		{
			(<IDispose>obj).dispose();
		}
		
		if((<egret.DisplayObject>obj).parent)
		{
			(<egret.DisplayObject>obj).parent.removeChild(<egret.DisplayObject>obj);
		}
	}

	/** 根据道具类型获取速度 */
	export function getGermSpeedByType(type:PropType):number
	{
		switch(type)
		{
			case PropType.germ_1:
				return 1;
			case PropType.germ_2:
				return 0.5;
			case PropType.germ_3:
				return 1.5;
			case PropType.germ_4:
				return 1;
			case PropType.anti_1:
				return 1;
			case PropType.anti_2:
				return 1;
			case PropType.anti_3:
				return 1;
			case PropType.s_germ_1:
			case PropType.s_germ_2:
			case PropType.s_germ_3:
				return 1;
		}

		return 1;
	}
}