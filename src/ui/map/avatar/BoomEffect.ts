/**
 * 爆炸特效
 */
class BoomEffect extends egret.DisplayObjectContainer implements IDispose
{
	private mc:egret.MovieClip;

	public constructor()
	{
		super();
	}

	public show():void
	{
		let json:any = RES.getRes("boom_json");

		let png:any = RES.getRes("boom_png");

		let mcData:egret.MovieClipData = new egret.MovieClipDataFactory(json, png).generateMovieClipData("boom");

		if(mcData)
		{
			this.mc = new egret.MovieClip(mcData);

			this.mc.addEventListener(egret.Event.COMPLETE, this.__playCompleteHandler, this);

			this.mc.play(1);

			this.addChild(this.mc);
		}
	}

	/** 播放完成 */
	private __playCompleteHandler(e:egret.Event):void
	{
		GameConst.dispose(this);
	}

	public dispose():void
	{
		if(this.mc)
		{
			this.mc.stop();

			this.mc = null;
		}

		this.parent && this.parent.removeChild(this);
	}

	/** 显示一个爆炸效果 */
	public static getBoom(x:number, y:number):void
	{
		let mc:BoomEffect = new BoomEffect();

		mc.x = x;

		mc.y = y;

		mc.show();

		App.layer.addChild(mc, LayerType.scene);
	}
}