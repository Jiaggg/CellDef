/**
 * 抗生素 β-卡西林
 */
class AntiAvatar_2 extends BaseAvatar
{
	public constructor($avo:IAvatarData) 
	{
		super($avo);
	}

	protected initFactory():void
	{
		let json:any = RES.getRes("401_json");

		let png:any = RES.getRes("401_png");

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

		let key:string = "402";

		let mvData:egret.MovieClipData = this.dataFactory.generateMovieClipData(key);

		if(mvData)
		{
			this.mc.movieClipData = mvData;

			this.mc.play(-1);

			this.addChild(this.mc);
		}
	}

	public update(frame:number):void
	{
		if(!this._avo || this._isDie || this._stop) return;

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
		return  MasType.type_4;
	}

	/** 类型 */
	public get type():number
	{
		return PropType.anti_1;
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