/**
 * 游戏manager引用
 */
declare let App:
{
	/** loading界面 */
	loading?:LoadingUI;
	/** 玩家管理 */
	player?:PlayerManager;
	/** 层级管理 */
	layer?:LayerManager;
	/** 舞台管理 */
	stage?:StageManager;
	/** 配置管理 */
	config?:ConfigManager;
	/** 消息提示管理 */
	msg?:MessageManager;
	/** 场景管理 */
	scene?:SceneManager;
	/** 关卡控制 */
	game?:GameManager;
	/** 网格管理 */
	grid?:GridManager;
}