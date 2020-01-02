/**
 * 网格地图管理
 */
class GridManager
{
	private static _instance:GridManager;
	/** 网格数据 */
	private _gridData:Dictionary<number>;
	/** 网格分组 */
	private _gridGroup:Dictionary<IPoint[]>;
	/** 最大宽度 */
	public MAX_W:number = 1920;
	/** 最大高度 */
	public MAX_H:number = 1080;
	/** 网格宽度 */
	public grid_w:number = 40;
	/** 网格高度 */
	public grid_h:number = 40;
	/** 总行数 */
	public total_row:number;
	/** 总列数 */
	public total_col:number;
	/** 网格列表 [3][5]表示为3行5列 */
	private gridList:GridNode[][];
	/** 待检查列表 */
	private openList:GridNode[];
	/** 已检查列表 */
	private closeList:GridNode[];
	/** 起始点 */
	private startNode:GridNode;
	/** 目标点 */
	private targetNode:GridNode;

	public constructor()
	{
		if(GridManager._instance)
		{
			throw new Error("class is instance!!!");
		}

		GridManager._instance = this;

		this.init();
	}

	public static get instance():GridManager
	{
		return this._instance || new GridManager();
	}

	private init():void
	{
		this.total_col = Math.floor(this.MAX_W / this.grid_w);

		this.total_row = Math.floor(this.MAX_H / this.grid_h);

		this.gridList = [];

		this.openList = [];

		this.closeList = [];
	}

	public setup($gridData:Dictionary<number>):void
	{
		this._gridData = $gridData;

		this._gridGroup = {};

		let rowList:GridNode[];

		let index:number;

		let node:GridNode;

		for(let i = 0; i < this.total_row; i ++)
		{
			rowList = this.gridList[i] || [];

			for(let j = 0; j < this.total_col; j ++)
			{
				index = (i * this.total_col) + j;

				node = rowList[j] || new GridNode;

				node.row = i;

				node.col = j;

				node.type = this._gridData ? this._gridData[index] || 0 : 255;

				rowList[j] = node;

				this.addGridByType(node.type, i, j);
			}

			this.gridList[i] = rowList;
		}
	}

	/** 根据类型添加格子数据 */
	private addGridByType(type:number, row:number, col:number):void
	{
		let len:number = 4;

		let gt:GridType;

		for(let i = 0; i < len; i ++)
		{
			gt = 1 << i;

			if((type & gt) > 0)
			{
				!this._gridGroup[gt] && (this._gridGroup[gt] = []);

				this._gridGroup[gt].push({x:col, y:row});
			}
		}

		//debug
		// let color:number = 0x000000;

		// if(type & GridType.type_1)
		// {
		// 	color = 0x0000FF;
		// }
		// else if(type & GridType.type_2)
		// {
		// 	color = 0xff0000;
		// }

		// let shape:egret.Shape = this.draws({x:col, y:row}, 1, color, 0);

		// shape.touchEnabled = true;

		// shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__touchHandler, this);

		// App.layer.addChild(shape, LayerType.scene);
	}

	private _sp:IPoint = {};
	private _tp:IPoint = {};
	private _f:boolean;
	private _ps:egret.Shape[] = [];

	private __touchHandler(e:egret.TouchEvent):void
	{
		if(!this._f)
		{
			for(let j = 0; j < this._ps.length; j ++)
			{
				this._ps[j].parent.removeChild(this._ps[j]);
			}
			this._ps.length = 0;
		}

		let shape:egret.Shape = e.target;

		if(!this._f)
		{
			this._sp.x = Math.floor(shape.x / 40);

			this._sp.y = Math.floor(shape.y / 40);

			this._f = true;

			this._ps.push(this.draws(this._sp, 2, 0x00ff00, 20));
		}
		else
		{
			this._f = false;

			this._tp.x = Math.floor(shape.x / 40);

			this._tp.y = Math.floor(shape.y / 40);

			let points:IPoint[] = this.findPath(this._sp, this._tp, GridType.type_1);

			if(points)
			{
				for(let i = 0; i < points.length; i ++)
				{
					this._ps.push(this.draws(points[i], 2, 0x00ff00, 20));
				}
			}
		}
	}

	private draws(point:IPoint, type:number, color:number, ofs:number):egret.Shape
	{
		let shape = new egret.Shape();

		shape.graphics.beginFill(color, 0.4);

		if(type == 1)
		{
			shape.graphics.drawRect(0, 0, 40, 40);
		}
		else
		{
			shape.graphics.drawCircle(0, 0, 5);
		}
		shape.graphics.endFill();

		shape.x = point.x * 40 + ofs;
		shape.y = point.y * 40 + ofs;

		App.layer.addChild(shape, LayerType.scene);

		return shape;
	}

	/** 根据格子类型返回可行走格子 */
	public getGridByType(type:GridType):IPoint
	{
		let list:IPoint[] = this._gridGroup[type];

		if(list)
		{
			let len:number = list.length;

			return list[Math.floor(Math.random() * len)];
		}

		return null;
	}

	/**
	 * 寻找路径
	 * @param sp startPoint起始点
	 * @param tp targetPoint目标点
	 */
	public findPath(sp:IPoint, tp:IPoint, type:GridType):IPoint[]
	{
		if(!sp || !tp) return null;

		this.resetGrid();

		this.startNode = this.gridList[sp.y][sp.x];

		this.targetNode = this.gridList[tp.y][tp.x];

		this.startNode.target = this.targetNode;

		this.openList.push(this.startNode);

		this.checkOpenList(type);

		if(!this.targetNode.parent)
		{
			console.log("未找到路径!!!");
		}
		
		return this.getTargetPath();
	}

	private resetGrid():void
	{
		this.closeList.length = 0;

		this.openList.length = 0;

		let rowList:GridNode[];

		let node:GridNode;

		for(let i = 0; i < this.total_row; i ++)
		{
			rowList = this.gridList[i] || [];

			for(let j = 0; j < this.total_col; j ++)
			{
				node = rowList[j];

				node && node.reset();
			}
		}
	}

	/** 获得目标路径 */
	private getTargetPath():IPoint[]
	{
		let paths:IPoint[] = [];

		let currNode:GridNode = this.targetNode;

		while(currNode.parent)
		{
			paths.unshift({x:currNode.col, y:currNode.row});

			currNode = currNode.parent;
		}

		return paths;
	}

	/** 检查openList */
	private checkOpenList(type:GridType):void
	{
		if(this.openList.length == 0 || this.openList.indexOf(this.targetNode) >= 0)
		{
			//未找到或已找到路径
			return;
		}

		let currNode:GridNode = this.openList.shift();

		//左上角
		let nextNode:GridNode = this.getNode(currNode.row - 1, currNode.col - 1);
		this.checkGridNode(currNode, nextNode, type);

		//上
		nextNode = this.getNode(currNode.row - 1, currNode.col);
		this.checkGridNode(currNode, nextNode, type);

		//右上角
		nextNode = this.getNode(currNode.row - 1, currNode.col + 1);
		this.checkGridNode(currNode, nextNode, type);

		//右
		nextNode = this.getNode(currNode.row, currNode.col + 1);
		this.checkGridNode(currNode, nextNode, type);

		//右下角
		nextNode = this.getNode(currNode.row + 1, currNode.col + 1);
		this.checkGridNode(currNode, nextNode, type);

		//下
		nextNode = this.getNode(currNode.row + 1, currNode.col);
		this.checkGridNode(currNode, nextNode, type);

		//左下角
		nextNode = this.getNode(currNode.row + 1, currNode.col - 1);
		this.checkGridNode(currNode, nextNode, type);

		//左
		nextNode = this.getNode(currNode.row, currNode.col - 1);
		this.checkGridNode(currNode, nextNode, type);

		this.closeList.push(currNode);

		this.openList.sort(this.compareFunction);

		this.checkOpenList(type);
	}

	/** 检查当前格子到下个格子的代价 */
	private checkGridNode(currNode:GridNode, nextNode:GridNode, type:GridType):void
	{
		if(!nextNode || this.closeList.indexOf(nextNode) >= 0) return;

		//不在待检查列表内
		if(!nextNode.parent)
		{
			if(nextNode.type & type)
			{
				nextNode.parent = currNode;

				this.openList.push(nextNode);
			}
			else
			{
				this.closeList.push(nextNode);
			}
			return;
		}

		//已经在待检查列表中
		let sfal:number = nextNode.fval;

		let cfal:number = nextNode.parent.fval + this.computeCost(currNode, nextNode);

		//当前代价小于原先代价，则更换格子的父节点
		if(cfal < sfal)
		{
			nextNode.parent = currNode;
		}
	}

	/**
	 * 格子按总代价值从小到大排序
	 */
	private compareFunction(g1:GridNode, g2:GridNode):number
	{
		return g1.fval <= g2.fval ? -1 : 1;
	}

	/** 根据行和列获取格子对象 */
	private getNode(row:number, col:number):GridNode
	{
		if(row < 0 || row >= this.total_row) return null;

		if(col < 0 || col >= this.total_col) return null;

		return this.gridList[row][col];
	}

	/**
	 * 计算两个从source格子到target格子的代价
	 * 相邻格子之间代价为10，斜角格子为14
	 */
	public computeCost(source:GridNode, targer:GridNode):number
	{
		if(!source || !targer) return 0;

		if(source.col != targer.col && source.row != targer.row)
		{
			return 14;
		}

		return 10;
	}
}