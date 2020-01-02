/**
 * 网格节点
 */
class GridNode
{
	/** 节点类型 */
	public type:GridType;
	/** 行数 */
	public row:number;
	/** 列数 */
	public col:number;
	/** 父节点 */
	private _parent:GridNode;
	/** 目标节点 */
	private _target:GridNode;
	/** 当前格子到目标格子的估值 */
	private _gval:number;
	/** 起始格子到当前格子的代价 */
	private _hval:number;

	public constructor()
	{
		this._gval = 0;

		this._hval = 0;
	}

	/** 节点位置 */
	public get index():number
	{
		return (this.row * App.grid.total_col) + this.col;
	}

	/** 设置父节点 */
	public set parent(t:GridNode)
	{
		if(!t) return;

		this._parent = t;

		this.updateHval();
	}

	/** 父节点 */
	public get parent():GridNode
	{
		return this._parent;
	}

	/** 设置目标节点 */
	public set target(t:GridNode)
	{
		if(!t) return;

		this._target = t;

		this.updateGval();
	}

	/** 起始格子到当前格子的代价 */
	public get hval():number
	{
		return this._hval;
	}

	/** 当前格子到目标格子的估值 */
	public get gval():number
	{
		return this._gval;
	}

	/** 总代价值 */
	public get fval():number
	{
		return this._hval + this._gval;
	}

	/** 更新起始格子到当前格子的代价 */
	private updateHval():void
	{
		this._hval = this._parent.hval + App.grid.computeCost(this._parent, this);
	}

	/** 更新当前格子到目标格子的估值 */
	public updateGval():void
	{
		this._gval = Math.abs(this.col - this._target.col) + Math.abs(this.row - this._target.row);
	}

	/** 格子重置 */
	public reset():void
	{
		this._parent = null;
		this._target = null;
		this._hval = 0;
		this._gval = 0;
	}
}