/**
 * 打开界面统一入口
 */
namespace SwitchHelp 
{
	/**
	 * 打开关卡界面
	 */
	export function openLevelFrame(level?:number):void
	{
		new LevelFrame().show(level);
	}

	/**
	 * 打开登录界面
	 */
	export function openLoginFrame():void
	{
		new LoginFrame().show();
	}

	/**
	 * 打开商店界面
	 */
	export function openShopFrame():void
	{
		new ShopFrame().show();
	}

	/**
	 * 打开游戏暂停
	 */
	export function openPauseFrame():void
	{
		new PauseFrame().show();
	}

	/** 
	 * 打开游戏结果
	 */
	export function openResultFrame(res:ResultStatus, star:number):void
	{
		new ResultBar().show(res, star);
	}

	/**
	 * 获得新道具
	 */
	export function openNewPropFrame(pid:PropType):void
	{
		setTimeout(function() {
			new NewPorpFrame().show(pid);
		}, 50);
	}

	/**
	 * 检查可解锁道具
	 */
	export function checkUnlockProp(star:number, pid:number):void
	{
		if(star > 0)
		{
			//通关该关卡，解锁道具
			pid = pid || 0;

			if(!pid)
			{
				//检查商店可解锁道具
				let all:IShopData[] = App.config.getAllShopGoods();

				let totalStar:number = App.player.totalStar;

				let len:number = all ? all.length : 0;

				let item:IShopData;

				for(let i = 0; i < len; i ++)
				{
					item = all[i];

					if(!App.player.haveGoods(item.type) && totalStar >= item.needStar)
					{
						pid = item.type;
						
						break;
					}
				}
			}

			App.player.addPorp(pid);
		}
	}
}