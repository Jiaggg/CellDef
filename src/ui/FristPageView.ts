/**
 * 首页
 */
class FristPageView extends eui.Group
{
	private min_num:number = 22;

	private max_num:number = 554;

	private curr_index:number;

	private list:egret.Texture[];

	private img:egret.Bitmap;

	private startTime:number;

	public constructor() 
	{
		super();
	}

	public start():void
	{
		this.width = 1920;

		this.height = 1080;

		this.list = [];

		this.curr_index = this.min_num;

		this.img = new egret.Bitmap();

		this.addChild(this.img);

		this.loadNext();
	}

	private loadNext():void
	{
		let key:string = `${this.curr_index}_png`;

		RES.getResAsync(key, this.__loadComplateHandler, this);
	}

	private __loadComplateHandler(data:any, key:string):void
	{
		this.list.push(data);

		this.curr_index += 4;

		if(this.curr_index > this.max_num)
		{
			this.play();
		}
		else
		{
			this.loadNext();
		}
	}

	private play():void
	{
		App.loading.hide();
		
		App.layer.addChild(this, LayerType.ui);

		this.dispatchEventWith(egret.Event.COMPLETE);

		this.curr_index = 0;

		this.startTime = egret.getTimer();

		this.addEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
	}

	private __enterFrameHandler():void
	{
		let nowTime:number = egret.getTimer();

		this.curr_index = Math.floor((nowTime - this.startTime) / 100)

		if(this.curr_index >= this.list.length)
		{
			this.curr_index = 0;

			this.removeEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);

			this.dispose();

			return;
		}

		this.img.texture = this.list[this.curr_index];
	}

	public dispose():void
	{
		if(this.list)
		{
			let ttr:egret.Texture;

			while(this.list.length > 0)
			{
				ttr = this.list.pop();

				ttr.dispose();
			}
		}
		
		this.list = null;

		this.dispatchEventWith(MEvent.DISPOSE);

		this.parent && this.parent.removeChild(this);
	}
}