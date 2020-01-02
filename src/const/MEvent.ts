/**
 * 自定义事件类型
 */
class MEvent
{
	/** 销毁 */
	public static DISPOSE:string = "dispose";

	/** 心跳事件，每秒派发一次 */
	public static HEARTBEAT:string = "heartbeat";

	/** 增加金币 */
	public static ADD_GOLD:string = "add_gold";

	/** 重新开始 */
	public static RESTART:string = "re_start";

	/** 游戏结束 */
	public static GAME_OVER:string = "game_over";

	/** 细菌更新 */
	public static GERM_UPDATE:string = "germ_update";

	/** 游戏enterframe事件 */
	public static GAME_ENTER_FRAME:string = "game_enter_frame";

	public constructor() 
	{

	}
}