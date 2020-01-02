/** 水 */
class WaterAvatar extends BaseAvatar
{
	public constructor($avo:IAvatarData)
	{
		super($avo);
	}

	protected updateMode():void
	{
		this._body.texture = RES.getRes(`water_png`);

		this._body.x = -Math.floor(this._body.texture.textureWidth / 2);

		this._body.y = -Math.floor(this._body.texture.textureHeight / 2);

		this.addChild(this._body);
	}
}