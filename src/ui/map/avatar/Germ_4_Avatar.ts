/**
 * 散子菌
 */
class Germ_4_Avatar extends BaseAvatar
{
	/** 模型样式 */
	private index:number;
	/** 是否已触碰 */
	private isHit:boolean;

	public constructor(avo:IAvatarData) 
	{
		super(avo);
	}

	protected initFactory():void
	{
		let json:any = RES.getRes("304_json");

		let png:any = RES.getRes("304_png");

		this.dataFactory = new egret.MovieClipDataFactory(json, png);

		this.mc = new egret.MovieClip();

		this.mc.stop();
	}

	protected updateMode():void
	{
		if(!this.dataFactory)
		{
			return;
		}

		let key:string = "304_1";

		if(this._avo.supper)
		{
			key += "_" + (this._avo.sgrade || 1);
		}

		let mvData:egret.MovieClipData = this.dataFactory.generateMovieClipData(key);

		if(mvData)
		{
			this.mc.movieClipData = mvData;

			this.mc.play(-1);

			this.addChild(this.mc);
		}
	}

	protected initPos():void
	{
		if(!this.isRandom)
		{
			let ipoint:IPoint = App.grid.getGridByType(GridType.type_1);

			if(ipoint)
			{
				this.x = ipoint.x * App.grid.grid_w + 20;

				this.y = ipoint.y * App.grid.grid_h + 20;
			}
		}
		else
		{
			this.x = this._avo.x || 0;

			this.y = this._avo.y || 0;

			this._angle = this._avo.angel || Math.floor(Math.random() * 360);
		}
	}

	/** 更新路径点 */
	protected updatePaths():void
	{
		let ipoint:IPoint = App.grid.getGridByType(GridType.type_1);

		if(ipoint)
		{
			let spoint:IPoint = {};

			spoint.x = Math.floor(this.x / App.grid.grid_w);

			spoint.y = Math.floor(this.y / App.grid.grid_h);

			this._paths = App.grid.findPath(spoint, ipoint, GridType.type_1);
		}
	}

	/** 更新下个位置点 */
	protected updateNextPoint():void
	{
		!this._nextPoint && (this._nextPoint = {});

		if(!this._paths || this._paths.length == 0)
		{
			this.updatePaths();
		}

		let ipoint:IPoint = this._paths.shift();

		if(ipoint)
		{
			this._nextPoint.x = ipoint.x * App.grid.grid_w + 20;

			this._nextPoint.y = ipoint.y * App.grid.grid_h + 20;

			let radian:number = Math.atan2(this._nextPoint.y - this.y, this._nextPoint.x - this.x);

			this._angle = radian * 180 / Math.PI;
		}
	}

	public update(frame:number):void
	{
		if(!this._avo || this._isDie || this._stop) return;

		if(this.isRandom)
		{
			this.updateRandomPos();
		}
		else
		{
			this.walkNexPoint();
		}
	}

	private walkNexPoint():void
	{
		if(!this._nextPoint)
		{
			this.updateNextPoint();
		}

		let speed:number = this._speed;

		this.rotation = this._angle;

		let tx:number;

		let ty:number;

		if(Math.sqrt(Math.pow(this.x - this._nextPoint.x, 2) + Math.pow(this.y - this._nextPoint.y, 2)) < speed)
		{
			tx = this._nextPoint.x;

			ty = this._nextPoint.y;

			this.updateNextPoint();
		}
		else
		{
			let radian:number = this._angle * Math.PI / 180;

			tx = this.x + Math.cos(radian) * speed;

			ty = this.y + Math.sin(radian) * speed;
		}

		this.x = tx;

		this.y = ty;
	}

	private updateRandomPos():void
	{
		let speed:number = this._speed;

		let angel:number = this._angle;

		this.rotation = angel;

		let radian:number = angel * Math.PI / 180;

		let tx:number = Math.cos(radian) * speed;

		let ty:number = Math.sin(radian) * speed;

		if(this.checkRange(tx, ty))
		{
			return;
		}

		this.x += tx;

		this.y += ty;
	}

	/** 检查活动范围 */
	protected checkRange(tx:number, ty:number):boolean
	{
		let changed:boolean = false;

		let cx:number = this.x + tx;

		let cy:number = this.y + ty;

		if(cx <= 0 || cx >= LayerManager.STAGE_WIDTH)
		{
			changed = true;
		}

		if(cy <= 0 || cy >= LayerManager.STAGE_HEIGHT)
		{
			changed = true;
		}

		if(changed)
		{
			let currAngel:number = this.rotation;

			this.setAngle(currAngel + Math.floor(Math.random() * 360));

			this.resetSpeed();
		}

		return changed;
	}

	/** 大类型 */
	public get masType():number
	{
		return  MasType.type_3;
	}

	/** 类型 */
	public get type():number
	{
		return PropType.germ_4;
	}

	public dispose():void
	{
		super.dispose();
	}
}