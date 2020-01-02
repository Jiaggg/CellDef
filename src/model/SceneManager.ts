/**
 * 游戏场景管理
 */
class SceneManager
{
	private static _instance:SceneManager;
	/** 游戏当前关卡场景 */
	private _scene:LevelScene;
	/** 当前进入关卡 */
	private _level:number;
	/** 插画desc.json url */
	private _plateUrl:string;
	/** 插画数量 */
	private _plateCount:number;
	/** 当前下标 */
	private _currIndex:number;
	/** 插画图片地址 */
	private _plateUrls:string[];
	/** 地图图片地址 */
	private _mapUrls:string[];
	/** 插画图片 */
	private _plateImgs:egret.Texture[];
	/** 细菌地图url */
	private _germMapUrl:string;
	/** t细胞url */
	private _tCellMapUrl:string;
	/** 地图网格url */
	private _mapgrideUrl:string;
	/** 关卡地图数据 */
	private _mapData:IMapData;
	/** 加载完成标记 */
	private _complete:number;

	public constructor()
	{
		SceneManager._instance = this;
	}

	public static get instance():SceneManager
	{
		return this._instance || new SceneManager();
	}

	public setup():void
	{
		 this._plateUrls = [];

		 this._mapUrls = [];

		 this._plateImgs = [];

		 this._mapData = {};
	}

	/**
	 * 进入关卡
	 * @param $level 关卡
	 */
	public enter($level:number):void
	{
		if(this._level == $level) return;

		this._level = $level;

		App.loading.show();

		this._plateUrls.length = 0;

		this._mapUrls.length = 0;

		this._plateImgs.length = 0;

		this._mapData.level = this._level;

		this._mapData.germ = this._mapData.tcell = null;

		this._plateUrl = GameConst.getPlateDescPath(this._level);

		RES.getResByUrl(this._plateUrl, this.__plateDescHandler, this);
	}

	/**
	 * 关卡desc.json文件加载完成
	 */
	private __plateDescHandler(data:IMapDesc, url:string):void
	{
		if(this._plateUrl != url) return;

		this._mapData.desc = data;

		if(!data) 
		{
			console.log("加载关卡数据错误!", url);

			this.exitScene();

			return;
		}

		if(data.plateTotal > 0)
		{
			this._plateCount = data.plateTotal;

			this._complete = 0;

			this._currIndex = 1;

			this.loadPlate();
		}
		else
		{
			this.playPlate(1);
		}

		this.loadGermMap();

		this.loadTCellMap();

		this.loadMapGrid();

		let _this = this;

		RES.loadGroup("map").then(function(s){_this.playPlate(8)}, function(e){});
	}

	/** 加载插画 */
	private loadPlate():void
	{
		this._plateUrl = GameConst.getPlateImgPath(this._level, this._currIndex);

		this._plateUrls.push(this._plateUrl);

		RES.getResByUrl(this._plateUrl, this.__plateImgHandler, this);
	}

	/** 插画图片加载完成 */
	private __plateImgHandler(data:any, url:string):void
	{
		if(this._plateUrl != url) return;

		if(data)
		{
			this._plateImgs.push(data);
		}

		this._currIndex ++;

		if(this._currIndex > this._plateCount)
		{
			this.playPlate(1);

			return;
		}

		this.loadPlate();
	}

	/** 加载关卡地图细菌活动区域地图 */
	private loadGermMap():void
	{
		this._germMapUrl = GameConst.getGermMapPath(this._level);

		this._mapUrls.push(this._germMapUrl);

		RES.getResByUrl(this._germMapUrl, this.__germMapHandler, this);
	}

	private __germMapHandler(data:any, $url:string):void
	{
		if(this._germMapUrl != $url) return;

		this._mapData.germ = data;

		this.playPlate(2);
	}

	/** 加载关卡地图T细胞活动区域地图 */
	private loadTCellMap():void
	{
		this._tCellMapUrl = GameConst.getTCellMapPath(this._level);

		this._mapUrls.push(this._tCellMapUrl);

		RES.getResByUrl(this._tCellMapUrl, this.__tCellMapHandler, this);
	}

	private __tCellMapHandler(data:any, $url:string):void
	{
		if(this._tCellMapUrl != $url) return;

		this._mapData.tcell = data;

		this.playPlate(4);
	}

	/** 加载网格地图 */
	private loadMapGrid():void
	{
		this._mapgrideUrl = GameConst.getMapGridPath(this._level);

		this._mapUrls.push(this._mapgrideUrl);

		RES.getResByUrl(this._mapgrideUrl, this.__gridMapHandler, this);
	}

	/**
	 * 网格地图加载完成
	 */
	private __gridMapHandler(data:any, $url:string):void
	{
		if(this._mapgrideUrl != $url) return;

		this._mapData.grid = data;

		this.playPlate(16);
	}

	/** 播放插画 */
	private playPlate(flag:number):void
	{
		this._complete = this._complete | flag;

		if(this._complete < 31) return;

		App.loading.hide();

		App.layer.clearAll();

		if(this._plateImgs.length > 0)
		{
			let plateFrame:PlateFrame = new PlateFrame();
			
			plateFrame.addEventListener(egret.Event.CLOSE, this.__plateFrameCloseHandler, this);

			plateFrame.show(this._plateImgs);
		}
		else
		{
			this.__plateFrameCloseHandler(null);
		}
	}

	/** 插画界面关闭 */
	private __plateFrameCloseHandler(e:egret.Event):void
	{
		while(this._plateUrls.length > 0)
		{
			RES.destroyRes(this._plateUrls.pop());
		}

		this._scene = new LevelScene();

		this._scene.setup(this._mapData);
	}

	/** 退出关卡 */
	public exitScene():void
	{
		App.layer.clearAll();

		App.game.exit();

		while(this._mapUrls.length > 0)
		{
			RES.destroyRes(this._mapUrls.pop());
		}

		this._mapUrls.length = 0;

		this._scene.exit();
		
		this._scene = null;

		RES.destroyRes("map");
		
		SwitchHelp.openLevelFrame(this._level);

		this._level = 0;
	}

	/** 当前进入关卡 */
	public get level():number
	{
		return this._level || 0;
	}

	/** 当前关卡地图数据 */
	public get mapDesc():IMapDesc
	{
		if(this._mapData)
		{
			return this._mapData.desc;
		}

		return null;
	}
}