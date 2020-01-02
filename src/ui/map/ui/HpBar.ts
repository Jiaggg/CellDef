/**
 * 血条
 */
class HpBar extends BaseUI
{
	/** t细胞剩余数量 */
	private tcellTxt:eui.BitmapLabel;
	/** 细菌剩余数量 */
	private germTxt:eui.BitmapLabel;
	/** t细胞剩余数量进度 */
	private tcellGroup:eui.Group;
	/** 细菌剩余数量进度 */
	private germGroup:eui.Group;
	/** t细胞安全位置 */
	private tcellRect:eui.Rect;
	/** 细菌安全位置 */
	private germRect:eui.Rect;
	/** 危险警告 */
	private warningImg_1:eui.Image;
	/** 危险警告 */
	private warningImg_2:eui.Image;
	/** 地图配置数据 */
	private _mapDesc:IMapDesc;
	/** 细菌最高总数 */
	private _total:number;
	/** 最小安全值 */
	private _min:number;
	/** 最大安全值 */
	private _max:number;
	/** 关卡评级 */
	private _qua:number[][];
	/** 开始时间 */
	private _startTime:number;
	/** 报警图片 */
	private _errorImg:eui.Image;

	public constructor($mapDesc:IMapDesc) 
	{
		super();

		this.left = 0;

		this.top = 0;

		this._mapDesc = $mapDesc || {};
	}

	protected initView():void
	{
		this.touchEnabled = this.touchChildren = false;

		this._total = this._mapDesc.germTotal || 0;

		this._min = this._mapDesc.germMinSafe || 0;

		this._max = this._mapDesc.germMaxSafe || 0;

		this._qua = this._mapDesc.qua || [];

		let minX:number = Math.floor(this._min / this._total * 419);

		let maxX:number = Math.floor(this._max / this._total * 419);

		this.tcellRect.x = this.germRect.x = minX;

		this.tcellRect.width = this.germRect.width = maxX - minX;

		this.warningImg_1.visible = this.warningImg_2.visible = false;

		this._errorImg = new eui.Image();

		this._errorImg.source = `${ResConst.json_hp}.hp_error`;

		this._errorImg.touchEnabled = false;

		this._errorImg.scale9Grid = new egret.Rectangle(74, 78, 129, 95);

		this._errorImg.width = 1920;

		this._errorImg.height = 1080;

		this._errorImg.visible = false;

		App.layer.addChild(this._errorImg, LayerType.top);
	}

	protected initEvent():void
	{
		App.game.addEventListener(MEvent.GERM_UPDATE, this.__germUpdateHandler, this);
		App.game.addEventListener(MEvent.GAME_OVER, this.__gameOverHandler, this);
	}

	protected removeEvent():void
	{
		App.game.removeEventListener(MEvent.GERM_UPDATE, this.__germUpdateHandler, this);
		App.game.removeEventListener(MEvent.GAME_OVER, this.__gameOverHandler, this);
		App.stage.stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
	}

	protected initData():void
	{

	}

	/** 细菌更新 */
	private __germUpdateHandler(e:egret.Event):void
	{
		this.updateGermProg();

		this.updateCellProg();

		this.updateState();

		this.playError();
	}

	/** 更新t细胞数量 */
	private updateCellProg():void
	{
		let cellCount:number = App.game.tcellCount;

		this.tcellTxt.text = (cellCount).toString();

		let rect:egret.Rectangle = this.tcellGroup.scrollRect || new egret.Rectangle(0, 0, 0, 30);

		rect.width = Math.min(419, Math.floor(cellCount / this._total * 419));

		this.tcellGroup.scrollRect = rect;

		if(cellCount < this._min || cellCount > this._max)
		{
			this.warningImg_1.visible = true;
		}
		else
		{
			this.warningImg_1.visible = false;
		}
	}

	/** 更新细菌数量 */
	private updateGermProg():void
	{
		let sgermCount:number = App.game.sgermCount;

		let germCount:number = App.game.germCount;

		let allGerm:number = sgermCount + germCount;

		this.germTxt.text = (allGerm).toString();

		let rect:egret.Rectangle = this.germGroup.scrollRect || new egret.Rectangle(0, 0, 0, 30);

		rect.width = Math.min(419, Math.floor(allGerm / this._total * 419));

		this.germGroup.scrollRect = rect;

		if(allGerm < this._min || allGerm > this._max)
		{
			this.warningImg_2.visible = true;
		}
		else
		{
			this.warningImg_2.visible = false;
		}
	}

	/** 更新状态 */
	private updateState():void
	{
		let germCount:number = parseInt(this.germTxt.text);

		let cellCount:number = parseInt(this.tcellTxt.text);

		if(germCount > this._total || cellCount > this._total)
		{
			App.game.gameOver();
			return;
		}
	}

	/** 游戏结束 */
	private __gameOverHandler(e:egret.Event):void
	{
		let sgermCount:number = App.game.sgermCount;

		let germCount:number = App.game.germCount;

		let cellCount:number = App.game.tcellCount;

		let resStatus:ResultStatus;//结果状态

		let diff:number = 0;//差值

		let star:number = 0;//评级

		if(sgermCount > 0)//有害菌未消灭，失败
		{
			resStatus = ResultStatus.fail_3;
		}
		else if(germCount > this._total)//细菌超过最高值，失败
		{
			resStatus = ResultStatus.fail_1;
		}
		else if(cellCount > this._total)//t细胞超过最高值，失败
		{
			resStatus = ResultStatus.fail_2;
		}
		else if(germCount < this._min || germCount > this._max ||
				cellCount < this._min || cellCount > this._max)	//细菌或t细胞不在安全值内，失败
		{
			diff = germCount - cellCount;

			resStatus = diff > 0 ? ResultStatus.fail_1 : ResultStatus.fail_2;
		}
		else//细菌和t细胞都在安全值内，成功
		{
			resStatus = ResultStatus.success;

			diff = Math.abs(germCount - cellCount);

			let length:number = this._qua.length;

			let temp:number[];

			for(let i = 0; i < length; i ++)
			{
				temp = this._qua[i];

				if(diff >= temp[0] && diff <= temp[1])
				{
					star = i + 1;
					break;
				}
			}

			App.player.updateLevelStar(App.scene.level, star);
		}

		SwitchHelp.openResultFrame(resStatus, star);

		SwitchHelp.checkUnlockProp(star, this._mapDesc.unlock);

		this._errorImg.visible = false;
		
		App.stage.stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
	}

	/** 播放报警 */
	private playError():void
	{
		let play:boolean = this.warningImg_1.visible || this.warningImg_2.visible;

		if(play)
		{
			if(!this._startTime)
			{
				this._startTime = egret.getTimer();

				App.stage.stage.addEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
			}
		}
		else
		{
			this._startTime = 0;

			this._errorImg.visible = false;
			
			App.stage.stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
		}
	}

	private __enterFrameHandler(e:egret.Event):void
	{
		if(!this._startTime) return;

		let nowTime:number = egret.getTimer();

		let frame:number = Math.floor((nowTime - this._startTime) / 200);

		this._errorImg.visible = frame % 2 == 0;
	}

	public show():void
	{
		App.layer.addChild(this, LayerType.ui);
	}

	public dispose():void
	{
		this.removeEvent();

		RES.destroyRes(ResConst.json_hp);

		super.dispose();
	}
}