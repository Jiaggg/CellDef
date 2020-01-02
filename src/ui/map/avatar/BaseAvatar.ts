/**
 * avatar基类
 */
class BaseAvatar extends egret.DisplayObjectContainer implements IEnterFrame,IDispose
{
	/** avatar数据 */
	protected _avo:IAvatarData;
	/** avatar形象 */
	protected _body:egret.Bitmap;
	/** 当前等级 */
	protected _grade:number;
	/** 范围大小，用来碰撞检测 */
	protected _range:number;
	/** 速度 */
	protected _speed:number;
	/** 角度 */
	protected _angle:number;
	/** 当前位置点 */
	protected _pos:egret.Point;
	/** 已死亡 */
	protected _isDie:boolean;
	/** 停止移动 */
	protected _stop:boolean;
	/** 动画 */
	protected mc:egret.MovieClip;
	/** MovieClipData工厂 */
	protected dataFactory:egret.MovieClipDataFactory;
	/** 下一位置点 */
	protected _nextPoint:IPoint;
	/** 路径点 */
	protected _paths:IPoint[];
	/** 是否随机位置 */
	public isRandom:boolean;

	private shape:egret.Shape;

	public constructor($avo:IAvatarData) 
	{
		super();

		this._avo = $avo;

		this.range = 20;

		this.init();

		this.start();
		
		this.touchChildren = false;

		this.touchEnabled = true;
	}

	protected init():void
	{
		if(!this._avo) return;

		this._pos = new egret.Point();

		this._body = new egret.Bitmap();

		this._speed = this._avo.speed || 1;

		this._grade = this._avo.grade || 1;

		this.initPos();

		this.initFactory();

		this.updateMode();

		this.show();	
	}

	protected initPos():void
	{
		this.x = this._avo.x || 0;

		this.y = this._avo.y || 0;
	}

	protected updateNextPoint():void
	{

	}

	public show():void
	{
		App.layer.addChild(this, LayerType.scene);
	}

	/** 更新模型 */
	protected initFactory():void
	{

	}

	/** 更新模型 */
	protected updateMode():void
	{

	}

	/** 更新 */
	public update(frame:number):void
	{

	}

	/** 与目标碰撞 */
	public hit(target:BaseAvatar):void
	{

	}

	/** 移动 */
	public start():void
	{
		this._stop = false;
	}

	/** 停止 */
	public stop():void
	{
		this._stop = true;
	}

	/** 是否已停止移动 */
	public get isStop():boolean
	{
		return this._stop;
	}

	/** 范围大小，用来碰撞检测 */
	public get range():number
	{
		return this._range;
	}

	public set range(value:number)
	{
		this._range = value;

		if(DEBUG)
		{
			if(!this.shape)
			{
				this.shape = new egret.Shape();
				this.addChild(this.shape);
			}

			this.shape.graphics.clear();
			this.shape.graphics.lineStyle(1, 0xFF0000);
			this.shape.graphics.drawCircle(0, 0, this._range);
			this.shape.graphics.endFill();
		}
	}

	/** 设置速度 */
	public setSpeed(value:number)
	{
		this._speed = (this._avo.speed || 1) + (value * 5);
	}

	/** 角度 */
	public setAngle(value:number)
	{
		this._angle = value;
	}

	/** 重置速度 */
	protected resetSpeed():void
	{
		this._speed = this._avo.speed || 1;
	}

	/** 当前位置点 */
	public get pos():egret.Point
	{
		this._pos.x = this.x || 0;

		this._pos.y = this.y || 0;

		return this._pos;
	}

	/** 大类型 */
	public get masType():number
	{
		return 0;
	}

	/** 类型 */
	public get type():number
	{
		return this._avo ? this._avo.type : 0;
	}

	/** 是否已死亡 */
	public get isDie():boolean
	{
		return this._isDie;
	}

	/** 死亡 */
	public die():void
	{
		this._isDie = true;

		GameConst.dispose(this);
	}

	public dispose():void
	{
		this._avo = null;
		
		GameConst.dispose(this._body);
		this._body = null;

		if(this.mc)
		{
			this.mc.stop();

			this.mc.parent && this.mc.parent.removeChild(this.mc);

			this.mc = null;
		}

		this.dataFactory = null;

		this.parent && this.parent.removeChild(this);
	}
}