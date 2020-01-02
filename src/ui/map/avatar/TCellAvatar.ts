/**
 * t细胞avatar
 */
class TCellAvatar extends BaseAvatar
{
	public constructor($avo:IAvatarData) 
	{
		super($avo);
	}

	protected initPos():void
	{
		if(!this.isRandom)
		{
			let ipoint:IPoint = App.grid.getGridByType(GridType.type_2);

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
		let ipoint:IPoint = App.grid.getGridByType(GridType.type_2);

		if(ipoint)
		{
			let spoint:IPoint = {};

			spoint.x = Math.floor(this.x / App.grid.grid_w);

			spoint.y = Math.floor(this.y / App.grid.grid_h);

			this._paths = App.grid.findPath(spoint, ipoint, GridType.type_2);
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

	protected updateMode():void
	{
		let index:number = Math.floor(Math.random() * 4) + 1;

		this._body.texture = RES.getRes(`cell_${index}_png`);

		this._body.x = -Math.floor(this._body.texture.textureWidth / 2);

		this._body.y = -Math.floor(this._body.texture.textureHeight / 2);

		this.range = Math.floor(this._body.texture.textureWidth / 2);

		this.addChild(this._body);
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

			this._angle = currAngel + Math.floor(Math.random() * 360);

			this.resetSpeed();
		}

		return changed;
	}

	/** 大类型 */
	public get masType():number
	{
		return  MasType.type_2;
	}

	/** 类型 */
	public get type():number
	{
		return PropType.t_cell;
	}

	/** 与目标碰撞 */
	public hit(target:BaseAvatar):void
	{
		if(!target) return;

		let masType:number = target.masType;

		if(masType == MasType.type_2)
		{
			// let ran:number = Math.atan2(target.y - this.y, target.x - this.x);

			// let angle:number = ran * 180 / Math.PI;
			
			// this._avo.angel = angle + 45;
		}
		else if(masType == MasType.type_3)
		{
			target.die();

			this.die();

			BoomEffect.getBoom(this.x, this.y);
		}
	}
}