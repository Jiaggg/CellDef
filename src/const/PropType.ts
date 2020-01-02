/**
 * 道具大类型
 */
const enum MasType
{
	/** 水 */
	type_1 = 1,
	/** t细胞 */
	type_2 = 2,
	/** 细菌 */
	type_3 = 3,
	/** 抗生素 */
	type_4 = 4,
	/** 有害菌 */
	type_5 = 5
}
/**
 * 道具类型
 */
const enum PropType 
{
	/** 水 */
	water = 101,
	/** 免疫T细胞 */
	t_cell = 201,
	/** 突击菌 */
	germ_1 = 301,
	/** 黏黏菌 */
	germ_2 = 302,
	/** 链形菌 */
	germ_3 = 303,
	/** 散子菌 */
	germ_4 = 304,
	/** α-旋素 */
	anti_1 = 401,
	/** β-卡西林 */
	anti_2 = 402,
	/** γ-氨霉素 */
	anti_3 = 403,
	/** 有害菌-1级 */
	s_germ_1 = 501,
	/** 有害菌-2级 */
	s_germ_2 = 502,
	/** 有害菌-3级 */
	s_germ_3 = 503
}

/**
 * 游戏状态
 */
const enum GameStauts
{
	/** 游戏未开始 */
	no_start = 1,
	/** 游戏暂停中 */
	pause = 2,
	/** 游戏已开始 */
	start = 3,
	/** 游戏已结束 */
	over = 4
}

/**
 * 结果状态
 */
const enum ResultStatus
{
	/** 成功 */
	success = 1,
	/** 失败，细菌过多 */
	fail_1 = 2,
	/** 失败，细菌过少 */
	fail_2 = 3,
	/** 失败，有害菌过于强大 */
	fail_3 = 4
}