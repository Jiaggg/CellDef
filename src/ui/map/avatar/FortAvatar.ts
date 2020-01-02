/**
 * 炮台
 */
class FortAvatar extends egret.DisplayObjectContainer implements IDispose
{
	/** 主体 */
	private body:egret.MovieClip;
	/** 最大强度 */
	private maxRate:number;
	/** 当前强度 */
	private _currRate:number;
	/** 最小旋转角度 */
	private minRange:number;
	/** 最大旋转角度 */
	private maxRange:number;
	/** 当前位置 */
	private currPos:egret.Point;
	/** 目标位置 */
	private targerPos:egret.Point;

	public constructor()
	{
		super();

		this.init();

		this.initBody();
	}

	protected init():void
	{
		this.touchChildren = false;

		this.touchEnabled = true;
		
		this._currRate = 1;

		 this.maxRate = 5;

		 this.currPos = new egret.Point();

		 this.targerPos = new egret.Point();
	}

	protected initBody():void
	{
		let json:any = RES.getRes("fort_json");

		let png:any = RES.getRes("fort_png");

		let mvData:egret.MovieClipData = new egret.MovieClipDataFactory(json, png).generateMovieClipData("fort");

		this.body = new egret.MovieClip(mvData);

		this.body.gotoAndStop(this._currRate);

		this.addChild(this.body);
	}

	/**
	 * 当前触摸位置
	 */
	public touchPos(tx:number, ty:number):void
	{
		let rad:number = Math.atan2(ty - this.y, tx - this.x);

		let angle:number = rad * 180 / Math.PI;

		angle = (360 + angle) % 360;

		//检查是否可旋转目标角度
		// if(angle >= this.minRange && angle <= this.maxRange)
		// {
			this.rotation = angle;

			this.checkRate(tx, ty);
		// }
	}

	/** 计算强度 */
	private checkRate(tx:number, ty:number):void
	{
		this.currPos.x = this.x;

		this.currPos.y = this.y;

		this.targerPos.x = tx;

		this.targerPos.y = ty;

		let dis:number = egret.Point.distance(this.currPos, this.targerPos);

		if(dis >= 100)
		{
			this.setRate(1);
		}
		else if(dis >= 80)
		{
			this.setRate(2);
		}
		else if(dis >= 60)
		{
			this.setRate(3);
		}
		else if(dis >= 40)
		{
			this.setRate(4);
		}
		else if(dis >= 20)
		{
			this.setRate(5);
		}
	}

	/** 显示 */
	public show(pos:IPoint):void
	{
		if(pos)
		{
			this.x = pos.x;

			this.y = pos.y;

			let rot:number[] = pos.r;

			if(rot && rot.length > 1)
			{
				this.minRange = rot[0] || 0;

				this.maxRange = rot[1] || 0;

				this.rotation = this.minRange + Math.floor(Math.random() * (this.maxRange - this.minRange));
			}
		}

		App.layer.addChild(this, LayerType.ui);
	}

	/** 当前强度 */
	public get currRate():number
	{
		return this._currRate;
	}

	/** 设置强度 */
	public setRate(rate:number):void
	{
		if(!rate || rate < 1)
		{
			rate = 1;
		}
		
		if(rate > this.maxRate)
		{
			rate = this.maxRate;
		}

		this._currRate = rate;

		this.body && this.body.gotoAndStop(this._currRate);
	}

	public dispose():void
	{
		this.parent && this.parent.removeChild(this);
	}
}