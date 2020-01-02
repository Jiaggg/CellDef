/**
 * 地图工具类
 */
class MapUtils
{
	public constructor() 
	{

	}

	/**
	 * 检查两个数组之前的元素碰撞
	 */
	public static checkHits(a1:BaseAvatar[], a2:BaseAvatar[]):void
	{
		let len_1:number = a1 ? a1.length : 0;

		let len_2:number = a2 ? a2.length : 0;

		if(!len_1 || !len_2) return;

		let i:number, j:number;

		let self:boolean = a1 == a2;

		let ba1:BaseAvatar;

		let ba2:BaseAvatar;

		for(i = 0; i < len_1; i ++)
		{
			ba1 = a1[i];

			j = self ? i + 1 : 0;

			for(; j < len_2; j ++)
			{
				ba2 = a2[j];

				if(ba1 != ba2 && MapUtils.isHit(ba1, ba2))
				{
					ba1.hit(ba2);
				}
			}
		}
	}

	/** 检查两个元素是否碰撞 */
	public static isHit(b1:BaseAvatar, b2:BaseAvatar):boolean
	{
		if(!b1 || !b2) return false;

		if(b1.isDie || b2.isDie) return false;

		if(b1.isStop || b2.isStop) return false;
		
		let pos1:egret.Point = b1.pos;

		let pos2:egret.Point = b2.pos;

		let dis:number = egret.Point.distance(pos1, pos2);

		if(dis < (b1.range + b2.range))
		{
			return true;
		}

		return false;
	}
}