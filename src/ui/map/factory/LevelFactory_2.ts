/**
 * 关卡2工厂
 */
class LevelFactory_2 implements ILevelFactory
{
	/** 关键时间点细菌创建信息 */
	protected germs:Dictionary<Function>;
	/** 关键时间点细胞创建信息 */
	protected cells:Dictionary<Function>;
	/** 下一次创建细菌时间点 */
	protected nextGerm:number;
	/** 下一次创建细胞时间点 */
	protected nextCell:number;
	/** 细菌池 */
	protected germPool:number[];
	/** 链形菌总数 */
	protected count:number = 10;

	public constructor() 
	{
		this.init();
	}

	protected init():void
	{
		this.germPool = [301, 302, 303, 304];

		this.germs = {};

		this.cells = {};

		this.nextGerm = 4;

		this.nextCell = 2 + Math.floor(Math.random() * 2);

		this.germs[0] = this.__zeroTimeGerm;
		this.germs[20] = this.__twentyTimeGerm;

		this.cells[0] = this.__zeroTimeCell;
		this.cells[10] = this.__tenTimeCell;
		this.cells[20] = this.__twentyTimeCell;
		this.cells[35] = this.__thirtyFiveTimeCell;
		this.cells[45] = this.__fortyFiveTimeCell;
	}

	/** 0秒时创建的细菌 */
	protected __zeroTimeGerm():IAvatarData[]
	{
		let germ:any[] = [];

		let type:number;

		//2个单细胞细菌
		for(let i = 0; i < 2; i ++)
		{
			type = this.germPool[Math.floor(Math.random() * this.germPool.length)];

			germ.push(this.getOneGerm(type));
		}

		//4个链形菌
		for(let i = 0; i < 4; i ++)
		{
			type = PropType.germ_3;

			germ.push(this.getOneGerm(type, 3));
		}

		return germ;
	}

	/** 20秒时创建的细菌 */
	protected __twentyTimeGerm():IAvatarData[]
	{
		let germ:any[] = [];

		let type:number;

		for(let i = 0; i < 4; i ++)
		{
			type = this.germPool[Math.floor(Math.random() * this.germPool.length)];

			germ.push(this.getOneGerm(type));
		}

		return germ;
	}

	/** 0秒时创建的细胞 */
	protected __zeroTimeCell():IAvatarData[]
	{
		let cell:any[] = [];

		for(let i = 0; i < 8; i ++)
		{
			cell.push(this.getOneTCell());
		}

		return cell;
	}

	/** 10秒时创建的细胞 */
	protected __tenTimeCell():IAvatarData[]
	{
		let cell:any[] = [];

		for(let i = 0; i < 8; i ++)
		{
			cell.push(this.getOneTCell());
		}

		return cell;
	}

	/** 20秒时创建的细胞 */
	protected __twentyTimeCell():IAvatarData[]
	{
		let cell:any[] = [];

		for(let i = 0; i < 10; i ++)
		{
			cell.push(this.getOneTCell());
		}

		return cell;
	}

	/** 35秒时创建的细胞 */
	protected __thirtyFiveTimeCell():IAvatarData[]
	{
		let cell:any[] = [];

		for(let i = 0; i < 7; i ++)
		{
			cell.push(this.getOneTCell());
		}

		return cell;
	}

	/** 45秒时创建的细胞 */
	protected __fortyFiveTimeCell():IAvatarData[]
	{
		let germ:any[] = [];

		for(let i = 0; i < 10; i ++)
		{
			germ.push(this.getOneTCell());
		}

		return germ;
	}

	/** 创建一个T细胞 */
	protected getOneTCell():IAvatarData
	{
		let data:IAvatarData = {};

		data.type = PropType.t_cell;

		data.grade = 1;

		data.speed = GameConst.getGermSpeedByType(data.type);

		data.angel = Math.floor(Math.random() * 360);

		data.x = Math.floor(Math.random() * LayerManager.STAGE_WIDTH);

		data.y = Math.floor(Math.random() * LayerManager.STAGE_HEIGHT);

		return data;
	}

	/** 创建一个细菌 */
	protected getOneGerm(type:number, grade?:number):IAvatarData
	{
		let data:IAvatarData = {};

		data.type = type;

		data.speed = GameConst.getGermSpeedByType(data.type);

		data.grade = grade || 1;

		data.angel = Math.floor(Math.random() * 360);

		data.x = Math.floor(Math.random() * LayerManager.STAGE_WIDTH);

		data.y = Math.floor(Math.random() * LayerManager.STAGE_HEIGHT);

		return data;
	}

	/** 获取每4秒新增的细菌 */
	public getGrem(time:number):IAvatarData
	{
		if(time == this.nextGerm)
		{
			this.nextGerm += 4;

			let type:number;

			let grade:number;

			if(this.count > 0)
			{
				type = PropType.germ_3;

				grade = 2 + Math.floor(Math.random() * 2);

				this.count --;
			}
			else
			{
				type = this.germPool[Math.floor(Math.random() * this.germPool.length)];

				grade = 1;
			}

			return this.getOneGerm(type, grade);
		}

		return null;
	}

	/** 获取每2-3秒新增的细胞 */
	public getCell(time:number):IAvatarData
	{
		if(time == this.nextCell)
		{
			this.nextCell += 2 + Math.floor(Math.random() * 2);

			return this.getOneTCell();
		}

		return null;
	}

	/** 根据当前时间获取新增的细菌 */
	public getGramByTime(time:number):IAvatarData[]
	{
		let fun:Function = this.germs[time];

		if(!fun) return null;

		return fun.call(this);
	}

	/** 根据当前时间获取新增的细胞 */
	public getCellByTime(time:number):IAvatarData[]
	{
		let fun:Function = this.cells[time];

		if(!fun) return null;

		return fun.call(this);
	}
}