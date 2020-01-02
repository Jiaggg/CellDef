window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","LevelFrame":"resource/eui_skins/LevelFrame.exml","ShopFrame":"resource/eui_skins/ShopFrame.exml","ShopItem":"resource/eui_skins/ShopItem.exml","LoginFrame":"resource/eui_skins/LoginFrame.exml","TeachFrame":"resource/eui_skins/TeachFrame.exml","ToolBar":"resource/eui_skins/ToolBar.exml","PriceBar":"resource/eui_skins/PriceBar.exml","TimeBar":"resource/eui_skins/TimeBar.exml","PauseFrame":"resource/eui_skins/PauseFrame.exml","HpBar":"resource/eui_skins/HpBar.exml","ResultBar":"resource/eui_skins/ResultBar.exml","NewPorpFrame":"resource/eui_skins/NewPorpFrame.exml"};generateEUI.paths['resource/eui_skins/HpBar.exml'] = window.HpBarSkin = (function (_super) {
	__extends(HpBarSkin, _super);
	function HpBarSkin() {
		_super.call(this);
		this.skinParts = ["tcellTxt","germTxt","tcellRect","tcellGroup","warningImg_1","germRect","germGroup","warningImg_2"];
		
		this.height = 90;
		this.width = 700;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.tcellTxt_i(),this.germTxt_i(),this.tcellGroup_i(),this._Image5_i(),this.warningImg_1_i(),this.germGroup_i(),this._Image7_i(),this.warningImg_2_i()];
	}
	var _proto = HpBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "hpbar_json.hp_back_2";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "hpbar_json.hp_back_1";
		t.touchEnabled = false;
		t.x = 510;
		t.y = -2;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "hpbar_json.hp_title";
		t.touchEnabled = false;
		t.y = 14.99;
		return t;
	};
	_proto.tcellTxt_i = function () {
		var t = new eui.BitmapLabel();
		this.tcellTxt = t;
		t.font = "num_small_fnt";
		t.height = 34;
		t.letterSpacing = 3;
		t.text = "0";
		t.touchEnabled = false;
		t.width = 90;
		t.x = 540;
		t.y = 7;
		return t;
	};
	_proto.germTxt_i = function () {
		var t = new eui.BitmapLabel();
		this.germTxt = t;
		t.font = "num_small_fnt";
		t.height = 34;
		t.letterSpacing = 3;
		t.text = "0";
		t.touchEnabled = false;
		t.width = 90;
		t.x = 540;
		t.y = 47;
		return t;
	};
	_proto.tcellGroup_i = function () {
		var t = new eui.Group();
		this.tcellGroup = t;
		t.height = 30;
		t.scrollEnabled = true;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 419;
		t.x = 108;
		t.y = 12;
		t.elementsContent = [this._Image4_i(),this.tcellRect_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 30;
		t.source = "hpbar_json.hp_type_1";
		t.width = 419;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.tcellRect_i = function () {
		var t = new eui.Rect();
		this.tcellRect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0x09f717;
		t.height = 20;
		t.width = 316;
		t.x = 70;
		t.y = 5;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 30;
		t.source = "hpbar_json.hp_frame";
		t.touchEnabled = false;
		t.width = 419;
		t.x = 108;
		t.y = 12;
		return t;
	};
	_proto.warningImg_1_i = function () {
		var t = new eui.Image();
		this.warningImg_1 = t;
		t.source = "hpbar_json.hp_warning";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 109;
		t.y = 14;
		return t;
	};
	_proto.germGroup_i = function () {
		var t = new eui.Group();
		this.germGroup = t;
		t.height = 30;
		t.scrollEnabled = true;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 419;
		t.x = 108;
		t.y = 51;
		t.elementsContent = [this._Image6_i(),this.germRect_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 30;
		t.source = "hpbar_json.hp_type_2";
		t.width = 419;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.germRect_i = function () {
		var t = new eui.Rect();
		this.germRect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0x09F717;
		t.height = 20;
		t.width = 316;
		t.x = 70;
		t.y = 5;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "hpbar_json.hp_frame";
		t.touchEnabled = false;
		t.x = 108;
		t.y = 51;
		return t;
	};
	_proto.warningImg_2_i = function () {
		var t = new eui.Image();
		this.warningImg_2 = t;
		t.source = "hpbar_json.hp_warning";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 109;
		t.y = 51;
		return t;
	};
	return HpBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.visible = false;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/LevelFrame.exml'] = window.LevelFrameSkin = (function (_super) {
	__extends(LevelFrameSkin, _super);
	var LevelFrameSkin$Skin1 = 	(function (_super) {
		__extends(LevelFrameSkin$Skin1, _super);
		function LevelFrameSkin$Skin1() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","level_json.level_left_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LevelFrameSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "level_json.level_left_u";
			return t;
		};
		return LevelFrameSkin$Skin1;
	})(eui.Skin);

	var LevelFrameSkin$Skin2 = 	(function (_super) {
		__extends(LevelFrameSkin$Skin2, _super);
		function LevelFrameSkin$Skin2() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","level_json.level_shop_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LevelFrameSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "level_json.level_shop_u";
			return t;
		};
		return LevelFrameSkin$Skin2;
	})(eui.Skin);

	var LevelFrameSkin$Skin3 = 	(function (_super) {
		__extends(LevelFrameSkin$Skin3, _super);
		function LevelFrameSkin$Skin3() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","level_json.level_left_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LevelFrameSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "level_json.level_left_u";
			return t;
		};
		return LevelFrameSkin$Skin3;
	})(eui.Skin);

	function LevelFrameSkin() {
		_super.call(this);
		this.skinParts = ["backImg","lockImg","titleImg","rightBtn","shopBtn","leftBtn","star_1","star_2","star_3","starGroup"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.backImg_i(),this.lockImg_i(),this.titleImg_i(),this.rightBtn_i(),this.shopBtn_i(),this.leftBtn_i(),this.starGroup_i()];
	}
	var _proto = LevelFrameSkin.prototype;

	_proto.backImg_i = function () {
		var t = new eui.Image();
		this.backImg = t;
		t.height = 758;
		t.width = 1364;
		t.x = 278;
		t.y = 257;
		return t;
	};
	_proto.lockImg_i = function () {
		var t = new eui.Image();
		this.lockImg = t;
		t.height = 664;
		t.touchEnabled = false;
		t.width = 1261;
		t.x = 330;
		t.y = 304;
		return t;
	};
	_proto.titleImg_i = function () {
		var t = new eui.Image();
		this.titleImg = t;
		t.height = 159;
		t.touchEnabled = false;
		t.width = 308;
		t.x = 806;
		t.y = 61;
		return t;
	};
	_proto.rightBtn_i = function () {
		var t = new eui.Button();
		this.rightBtn = t;
		t.label = "";
		t.x = 1730;
		t.y = 543;
		t.skinName = LevelFrameSkin$Skin1;
		return t;
	};
	_proto.shopBtn_i = function () {
		var t = new eui.Button();
		this.shopBtn = t;
		t.label = "";
		t.x = 1644;
		t.y = 98;
		t.skinName = LevelFrameSkin$Skin2;
		return t;
	};
	_proto.leftBtn_i = function () {
		var t = new eui.Button();
		this.leftBtn = t;
		t.label = "";
		t.scaleX = -1;
		t.x = 190;
		t.y = 543;
		t.skinName = LevelFrameSkin$Skin3;
		return t;
	};
	_proto.starGroup_i = function () {
		var t = new eui.Group();
		this.starGroup = t;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.x = 1072;
		t.y = 779;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.star_1_i(),this.star_2_i(),this.star_3_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.star_1_i = function () {
		var t = new eui.Image();
		this.star_1 = t;
		t.source = "level_json.level_star_got";
		return t;
	};
	_proto.star_2_i = function () {
		var t = new eui.Image();
		this.star_2 = t;
		t.source = "level_json.level_star_got";
		return t;
	};
	_proto.star_3_i = function () {
		var t = new eui.Image();
		this.star_3 = t;
		t.source = "level_json.level_star_got";
		return t;
	};
	return LevelFrameSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/LoginFrame.exml'] = window.LoginFrameSkin = (function (_super) {
	__extends(LoginFrameSkin, _super);
	var LoginFrameSkin$Skin4 = 	(function (_super) {
		__extends(LoginFrameSkin$Skin4, _super);
		function LoginFrameSkin$Skin4() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login_json.login_start_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = LoginFrameSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "login_json.login_start_u";
			return t;
		};
		return LoginFrameSkin$Skin4;
	})(eui.Skin);

	var LoginFrameSkin$Skin5 = 	(function (_super) {
		__extends(LoginFrameSkin$Skin5, _super);
		function LoginFrameSkin$Skin5() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
						new eui.SetProperty("_Image1","source","sound_close")
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","sound_close")
					])
				,
				new eui.State ("upAndSelected",
					[
					])
				,
				new eui.State ("downAndSelected",
					[
					])
			];
		}
		var _proto = LoginFrameSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "sound_open";
			return t;
		};
		return LoginFrameSkin$Skin5;
	})(eui.Skin);

	function LoginFrameSkin() {
		_super.call(this);
		this.skinParts = ["backImg","startBtn","soundBtn","logoImg"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.backImg_i(),this.startBtn_i(),this.soundBtn_i(),this.logoImg_i()];
	}
	var _proto = LoginFrameSkin.prototype;

	_proto.backImg_i = function () {
		var t = new eui.Image();
		this.backImg = t;
		t.source = "login_back_png";
		return t;
	};
	_proto.startBtn_i = function () {
		var t = new eui.Button();
		this.startBtn = t;
		t.label = "";
		t.x = 1536;
		t.y = 848;
		t.skinName = LoginFrameSkin$Skin4;
		return t;
	};
	_proto.soundBtn_i = function () {
		var t = new eui.CheckBox();
		this.soundBtn = t;
		t.label = "";
		t.x = 1687;
		t.y = 138;
		t.skinName = LoginFrameSkin$Skin5;
		return t;
	};
	_proto.logoImg_i = function () {
		var t = new eui.Image();
		this.logoImg = t;
		t.source = "login_json.login_logo";
		t.x = 420;
		t.y = 169;
		return t;
	};
	return LoginFrameSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/NewPorpFrame.exml'] = window.NewPorpFrameSkin = (function (_super) {
	__extends(NewPorpFrameSkin, _super);
	function NewPorpFrameSkin() {
		_super.call(this);
		this.skinParts = ["backImg_1","backImg_2","tipImg"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this.backImg_1_i(),this.backImg_2_i(),this.tipImg_i(),this._Label1_i()];
	}
	var _proto = NewPorpFrameSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.6;
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.strokeAlpha = 0.6;
		t.strokeColor = 0xffffff;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.backImg_1_i = function () {
		var t = new eui.Image();
		this.backImg_1 = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1920;
		return t;
	};
	_proto.backImg_2_i = function () {
		var t = new eui.Image();
		this.backImg_2 = t;
		t.height = 1080;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1920;
		return t;
	};
	_proto.tipImg_i = function () {
		var t = new eui.Image();
		this.tipImg = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "SimHei";
		t.height = 35;
		t.size = 35;
		t.strokeColor = 0x7f7f7f;
		t.text = "点击任意处关闭";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.width = 300;
		t.x = 810;
		t.y = 1023.85;
		return t;
	};
	return NewPorpFrameSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PauseFrame.exml'] = window.PauseFrameSkin = (function (_super) {
	__extends(PauseFrameSkin, _super);
	var PauseFrameSkin$Skin6 = 	(function (_super) {
		__extends(PauseFrameSkin$Skin6, _super);
		function PauseFrameSkin$Skin6() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","pause_json.play_replay_un")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PauseFrameSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "pause_json.play_replay";
			return t;
		};
		return PauseFrameSkin$Skin6;
	})(eui.Skin);

	var PauseFrameSkin$Skin7 = 	(function (_super) {
		__extends(PauseFrameSkin$Skin7, _super);
		function PauseFrameSkin$Skin7() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","pause_json.play_star_un")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PauseFrameSkin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "pause_json.play_star";
			return t;
		};
		return PauseFrameSkin$Skin7;
	})(eui.Skin);

	var PauseFrameSkin$Skin8 = 	(function (_super) {
		__extends(PauseFrameSkin$Skin8, _super);
		function PauseFrameSkin$Skin8() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","pause_json.play_menu_un")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PauseFrameSkin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "pause_json.play_menu";
			return t;
		};
		return PauseFrameSkin$Skin8;
	})(eui.Skin);

	function PauseFrameSkin() {
		_super.call(this);
		this.skinParts = ["replayBtn","startBtn","menuBtn"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this.replayBtn_i(),this.startBtn_i(),this.menuBtn_i()];
	}
	var _proto = PauseFrameSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.6;
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.strokeAlpha = 0.6;
		t.strokeColor = 0xffffff;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "pause_json.play_back";
		t.touchEnabled = false;
		t.x = 548;
		t.y = 352;
		return t;
	};
	_proto.replayBtn_i = function () {
		var t = new eui.Button();
		this.replayBtn = t;
		t.label = "";
		t.x = 685;
		t.y = 479;
		t.skinName = PauseFrameSkin$Skin6;
		return t;
	};
	_proto.startBtn_i = function () {
		var t = new eui.Button();
		this.startBtn = t;
		t.label = "";
		t.x = 915;
		t.y = 485;
		t.skinName = PauseFrameSkin$Skin7;
		return t;
	};
	_proto.menuBtn_i = function () {
		var t = new eui.Button();
		this.menuBtn = t;
		t.label = "";
		t.x = 1110;
		t.y = 485;
		t.skinName = PauseFrameSkin$Skin8;
		return t;
	};
	return PauseFrameSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PriceBar.exml'] = window.PriceBarSkin = (function (_super) {
	__extends(PriceBarSkin, _super);
	function PriceBarSkin() {
		_super.call(this);
		this.skinParts = ["priceTxt"];
		
		this.height = 90;
		this.width = 400;
		this.elementsContent = [this._Image1_i(),this.priceTxt_i()];
	}
	var _proto = PriceBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 120;
		t.scale9Grid = new egret.Rectangle(88,36,91,33);
		t.source = "toolbar_json.tool_back_2";
		t.touchEnabled = false;
		t.width = 455;
		t.x = -23;
		t.y = -17;
		return t;
	};
	_proto.priceTxt_i = function () {
		var t = new eui.BitmapLabel();
		this.priceTxt = t;
		t.anchorOffsetX = 0;
		t.font = "small_big_fnt";
		t.height = 90;
		t.letterSpacing = 10;
		t.text = "0x0";
		t.touchEnabled = false;
		t.width = 400;
		return t;
	};
	return PriceBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ResultBar.exml'] = window.ResultBarSkin = (function (_super) {
	__extends(ResultBarSkin, _super);
	var ResultBarSkin$Skin9 = 	(function (_super) {
		__extends(ResultBarSkin$Skin9, _super);
		function ResultBarSkin$Skin9() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","result_json.res_back_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ResultBarSkin$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "result_json.res_back_u";
			return t;
		};
		return ResultBarSkin$Skin9;
	})(eui.Skin);

	var ResultBarSkin$Skin10 = 	(function (_super) {
		__extends(ResultBarSkin$Skin10, _super);
		function ResultBarSkin$Skin10() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","result_json.res_menu_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ResultBarSkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "result_json.res_menu_u";
			return t;
		};
		return ResultBarSkin$Skin10;
	})(eui.Skin);

	var ResultBarSkin$Skin11 = 	(function (_super) {
		__extends(ResultBarSkin$Skin11, _super);
		function ResultBarSkin$Skin11() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","result_json.res_next_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ResultBarSkin$Skin11.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "result_json.res_next_u";
			return t;
		};
		return ResultBarSkin$Skin11;
	})(eui.Skin);

	function ResultBarSkin() {
		_super.call(this);
		this.skinParts = ["result_img","star_1","star_2","star_3","starGroup","result_desc_img","backBtn","menuBtn","nextBtn","btnGroup","result_tip_img"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this.result_img_i(),this.starGroup_i(),this.result_desc_img_i(),this.btnGroup_i(),this.result_tip_img_i()];
	}
	var _proto = ResultBarSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.6;
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.strokeAlpha = 0.6;
		t.strokeColor = 0xffffff;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "res_board_png";
		t.touchEnabled = false;
		t.x = 368;
		t.y = 73;
		return t;
	};
	_proto.result_img_i = function () {
		var t = new eui.Image();
		this.result_img = t;
		t.source = "result_json.res_fail_title";
		t.touchEnabled = false;
		t.x = 734;
		t.y = 266.39;
		return t;
	};
	_proto.starGroup_i = function () {
		var t = new eui.Group();
		this.starGroup = t;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.x = 666;
		t.y = 439.61;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.star_1_i(),this.star_2_i(),this.star_3_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 50;
		return t;
	};
	_proto.star_1_i = function () {
		var t = new eui.Image();
		this.star_1 = t;
		t.source = "result_json.res_star_d";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.star_2_i = function () {
		var t = new eui.Image();
		this.star_2 = t;
		t.source = "result_json.res_star_u";
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.star_3_i = function () {
		var t = new eui.Image();
		this.star_3 = t;
		t.source = "result_json.res_star_u";
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto.result_desc_img_i = function () {
		var t = new eui.Image();
		this.result_desc_img = t;
		t.horizontalCenter = 0;
		t.source = "fail_4_png";
		t.touchEnabled = false;
		t.verticalCenter = 160;
		return t;
	};
	_proto.btnGroup_i = function () {
		var t = new eui.Group();
		this.btnGroup = t;
		t.touchEnabled = false;
		t.x = 712;
		t.y = 800;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.backBtn_i(),this.menuBtn_i(),this.nextBtn_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 120;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.backBtn_i = function () {
		var t = new eui.Button();
		this.backBtn = t;
		t.label = "";
		t.x = 0;
		t.y = 0;
		t.skinName = ResultBarSkin$Skin9;
		return t;
	};
	_proto.menuBtn_i = function () {
		var t = new eui.Button();
		this.menuBtn = t;
		t.label = "";
		t.x = 239.82;
		t.y = 0;
		t.skinName = ResultBarSkin$Skin10;
		return t;
	};
	_proto.nextBtn_i = function () {
		var t = new eui.Button();
		this.nextBtn = t;
		t.label = "";
		t.x = 441;
		t.y = 0;
		t.skinName = ResultBarSkin$Skin11;
		return t;
	};
	_proto.result_tip_img_i = function () {
		var t = new eui.Image();
		this.result_tip_img = t;
		t.rotation = -30;
		t.source = "res_fail_tips_png";
		t.touchEnabled = false;
		t.x = 402;
		t.y = 284;
		return t;
	};
	return ResultBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.visible = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		t.visible = false;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ShopFrame.exml'] = window.ShopFrameSkin = (function (_super) {
	__extends(ShopFrameSkin, _super);
	var ShopFrameSkin$Skin12 = 	(function (_super) {
		__extends(ShopFrameSkin$Skin12, _super);
		function ShopFrameSkin$Skin12() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","shop_json.shop_back_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShopFrameSkin$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "shop_json.shop_back_u";
			return t;
		};
		return ShopFrameSkin$Skin12;
	})(eui.Skin);

	function ShopFrameSkin() {
		_super.call(this);
		this.skinParts = ["backBtn","itemGroup","scroller"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this.backBtn_i(),this.scroller_i()];
	}
	var _proto = ShopFrameSkin.prototype;

	_proto.backBtn_i = function () {
		var t = new eui.Button();
		this.backBtn = t;
		t.label = "";
		t.x = 190.67;
		t.y = 907.87;
		t.skinName = ShopFrameSkin$Skin12;
		return t;
	};
	_proto.scroller_i = function () {
		var t = new eui.Scroller();
		this.scroller = t;
		t.height = 710;
		t.width = 1920;
		t.x = 0;
		t.y = 151.67;
		t.viewport = this.itemGroup_i();
		return t;
	};
	_proto.itemGroup_i = function () {
		var t = new eui.DataGroup();
		this.itemGroup = t;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		return t;
	};
	return ShopFrameSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ShopItem.exml'] = window.ShopItemSkin = (function (_super) {
	__extends(ShopItemSkin, _super);
	var ShopItemSkin$Skin13 = 	(function (_super) {
		__extends(ShopItemSkin$Skin13, _super);
		function ShopItemSkin$Skin13() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","shop_json.shop_lock_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShopItemSkin$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "shop_json.shop_lock_u";
			return t;
		};
		return ShopItemSkin$Skin13;
	})(eui.Skin);

	function ShopItemSkin() {
		_super.call(this);
		this.skinParts = ["goodsImg","lockBtn","countTxt","lockGroup"];
		
		this.height = 710;
		this.width = 780;
		this.elementsContent = [this.goodsImg_i(),this.lockGroup_i()];
	}
	var _proto = ShopItemSkin.prototype;

	_proto.goodsImg_i = function () {
		var t = new eui.Image();
		this.goodsImg = t;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.lockGroup_i = function () {
		var t = new eui.Group();
		this.lockGroup = t;
		t.percentHeight = 100;
		t.touchEnabled = false;
		t.percentWidth = 100;
		t.elementsContent = [this._Rect1_i(),this.lockBtn_i(),this._Image1_i(),this.countTxt_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.6;
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.strokeAlpha = 0.6;
		t.strokeColor = 0xffffff;
		t.touchChildren = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.lockBtn_i = function () {
		var t = new eui.Button();
		this.lockBtn = t;
		t.label = "";
		t.x = 333;
		t.y = 110;
		t.skinName = ShopItemSkin$Skin13;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "shop_json.shop_star";
		t.x = 309;
		t.y = 398;
		return t;
	};
	_proto.countTxt_i = function () {
		var t = new eui.BitmapLabel();
		this.countTxt = t;
		t.font = "small_big_fnt";
		t.height = 88;
		t.text = "";
		t.width = 200;
		t.x = 482;
		t.y = 482;
		return t;
	};
	return ShopItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TeachFrame.exml'] = window.TeachFrameSkin = (function (_super) {
	__extends(TeachFrameSkin, _super);
	var TeachFrameSkin$Skin14 = 	(function (_super) {
		__extends(TeachFrameSkin$Skin14, _super);
		function TeachFrameSkin$Skin14() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","shop_json.shop_back_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TeachFrameSkin$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "shop_json.shop_back_u";
			return t;
		};
		return TeachFrameSkin$Skin14;
	})(eui.Skin);

	var TeachFrameSkin$Skin15 = 	(function (_super) {
		__extends(TeachFrameSkin$Skin15, _super);
		function TeachFrameSkin$Skin15() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","shop_json.shop_back_d")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TeachFrameSkin$Skin15.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "shop_json.shop_back_u";
			return t;
		};
		return TeachFrameSkin$Skin15;
	})(eui.Skin);

	function TeachFrameSkin() {
		_super.call(this);
		this.skinParts = ["backImg","preBtn","nextBtn"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this.backImg_i(),this.preBtn_i(),this.nextBtn_i()];
	}
	var _proto = TeachFrameSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.7;
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.strokeAlpha = 0.7;
		t.strokeColor = 0xffffff;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.backImg_i = function () {
		var t = new eui.Image();
		this.backImg = t;
		t.height = 887;
		t.touchEnabled = false;
		t.width = 1213;
		t.x = 354;
		t.y = 97;
		return t;
	};
	_proto.preBtn_i = function () {
		var t = new eui.Button();
		this.preBtn = t;
		t.label = "";
		t.x = 430;
		t.y = 840;
		t.skinName = TeachFrameSkin$Skin14;
		return t;
	};
	_proto.nextBtn_i = function () {
		var t = new eui.Button();
		this.nextBtn = t;
		t.label = "";
		t.scaleX = -1;
		t.x = 1480;
		t.y = 840;
		t.skinName = TeachFrameSkin$Skin15;
		return t;
	};
	return TeachFrameSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TimeBar.exml'] = window.TimeBarSkin = (function (_super) {
	__extends(TimeBarSkin, _super);
	var TimeBarSkin$Skin16 = 	(function (_super) {
		__extends(TimeBarSkin$Skin16, _super);
		function TimeBarSkin$Skin16() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","toolbar_json.play_pause_un")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TimeBarSkin$Skin16.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "toolbar_json.play_pause";
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return TimeBarSkin$Skin16;
	})(eui.Skin);

	function TimeBarSkin() {
		_super.call(this);
		this.skinParts = ["timeTxt","pauseBtn"];
		
		this.height = 89;
		this.width = 400;
		this.elementsContent = [this._Image1_i(),this.timeTxt_i(),this.pauseBtn_i()];
	}
	var _proto = TimeBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 110;
		t.scale9Grid = new egret.Rectangle(116,31,79,23);
		t.source = "toolbar_json.tool_back_1";
		t.touchEnabled = false;
		t.width = 345;
		t.x = -42;
		t.y = -14;
		return t;
	};
	_proto.timeTxt_i = function () {
		var t = new eui.BitmapLabel();
		this.timeTxt = t;
		t.anchorOffsetX = 0;
		t.font = "small_big_fnt";
		t.height = 90;
		t.letterSpacing = 10;
		t.text = "00p00";
		t.touchEnabled = false;
		t.width = 300;
		return t;
	};
	_proto.pauseBtn_i = function () {
		var t = new eui.Button();
		this.pauseBtn = t;
		t.label = "";
		t.x = 291;
		t.skinName = TimeBarSkin$Skin16;
		return t;
	};
	return TimeBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToolBar.exml'] = window.ToolBarSkin = (function (_super) {
	__extends(ToolBarSkin, _super);
	var ToolBarSkin$Skin17 = 	(function (_super) {
		__extends(ToolBarSkin$Skin17, _super);
		function ToolBarSkin$Skin17() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image1","source","toolbar_json.101")
					])
				,
				new eui.State ("downAndSelected",
					[
					])
			];
		}
		var _proto = ToolBarSkin$Skin17.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "toolbar_json.101_un";
			return t;
		};
		return ToolBarSkin$Skin17;
	})(eui.Skin);

	var ToolBarSkin$Skin18 = 	(function (_super) {
		__extends(ToolBarSkin$Skin18, _super);
		function ToolBarSkin$Skin18() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image1","source","toolbar_json.301")
					])
				,
				new eui.State ("downAndSelected",
					[
					])
			];
		}
		var _proto = ToolBarSkin$Skin18.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "toolbar_json.301_un";
			return t;
		};
		return ToolBarSkin$Skin18;
	})(eui.Skin);

	var ToolBarSkin$Skin19 = 	(function (_super) {
		__extends(ToolBarSkin$Skin19, _super);
		function ToolBarSkin$Skin19() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image1","source","toolbar_json.201")
					])
				,
				new eui.State ("downAndSelected",
					[
					])
			];
		}
		var _proto = ToolBarSkin$Skin19.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "toolbar_json.201_un";
			return t;
		};
		return ToolBarSkin$Skin19;
	})(eui.Skin);

	var ToolBarSkin$Skin20 = 	(function (_super) {
		__extends(ToolBarSkin$Skin20, _super);
		function ToolBarSkin$Skin20() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image1","source","toolbar_json.303")
					])
				,
				new eui.State ("downAndSelected",
					[
					])
			];
		}
		var _proto = ToolBarSkin$Skin20.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "toolbar_json.303_un";
			return t;
		};
		return ToolBarSkin$Skin20;
	})(eui.Skin);

	var ToolBarSkin$Skin21 = 	(function (_super) {
		__extends(ToolBarSkin$Skin21, _super);
		function ToolBarSkin$Skin21() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image1","source","toolbar_json.302")
					])
				,
				new eui.State ("downAndSelected",
					[
					])
			];
		}
		var _proto = ToolBarSkin$Skin21.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "toolbar_json.302_un";
			return t;
		};
		return ToolBarSkin$Skin21;
	})(eui.Skin);

	var ToolBarSkin$Skin22 = 	(function (_super) {
		__extends(ToolBarSkin$Skin22, _super);
		function ToolBarSkin$Skin22() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image1","source","toolbar_json.401")
					])
				,
				new eui.State ("downAndSelected",
					[
					])
			];
		}
		var _proto = ToolBarSkin$Skin22.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "toolbar_json.401_un";
			return t;
		};
		return ToolBarSkin$Skin22;
	})(eui.Skin);

	var ToolBarSkin$Skin23 = 	(function (_super) {
		__extends(ToolBarSkin$Skin23, _super);
		function ToolBarSkin$Skin23() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image1","source","toolbar_json.304")
					])
				,
				new eui.State ("downAndSelected",
					[
					])
			];
		}
		var _proto = ToolBarSkin$Skin23.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "toolbar_json.304_un";
			return t;
		};
		return ToolBarSkin$Skin23;
	})(eui.Skin);

	var ToolBarSkin$Skin24 = 	(function (_super) {
		__extends(ToolBarSkin$Skin24, _super);
		function ToolBarSkin$Skin24() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image1","source","toolbar_json.402")
					])
				,
				new eui.State ("downAndSelected",
					[
					])
			];
		}
		var _proto = ToolBarSkin$Skin24.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "toolbar_json.402_un";
			return t;
		};
		return ToolBarSkin$Skin24;
	})(eui.Skin);

	var ToolBarSkin$Skin25 = 	(function (_super) {
		__extends(ToolBarSkin$Skin25, _super);
		function ToolBarSkin$Skin25() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image1","source","toolbar_json.403")
					])
				,
				new eui.State ("downAndSelected",
					[
					])
			];
		}
		var _proto = ToolBarSkin$Skin25.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.source = "toolbar_json.403_un";
			return t;
		};
		return ToolBarSkin$Skin25;
	})(eui.Skin);

	function ToolBarSkin() {
		_super.call(this);
		this.skinParts = ["btn_101","btn_301","btn_201","btn_303","btn_302","btn_401","btn_304","btn_402","btn_403"];
		
		this.height = 87;
		this.width = 1026;
		this.elementsContent = [this._Image1_i(),this.btn_101_i(),this.btn_301_i(),this.btn_201_i(),this.btn_303_i(),this.btn_302_i(),this.btn_401_i(),this.btn_304_i(),this.btn_402_i(),this.btn_403_i()];
	}
	var _proto = ToolBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "toolbar_json.tool_bar";
		t.touchEnabled = false;
		return t;
	};
	_proto.btn_101_i = function () {
		var t = new eui.ToggleButton();
		this.btn_101 = t;
		t.label = "101";
		t.x = 29;
		t.y = 11;
		t.skinName = ToolBarSkin$Skin17;
		return t;
	};
	_proto.btn_301_i = function () {
		var t = new eui.ToggleButton();
		this.btn_301 = t;
		t.label = "301";
		t.x = 119;
		t.y = 18;
		t.skinName = ToolBarSkin$Skin18;
		return t;
	};
	_proto.btn_201_i = function () {
		var t = new eui.ToggleButton();
		this.btn_201 = t;
		t.label = "201";
		t.x = 213;
		t.y = 18;
		t.skinName = ToolBarSkin$Skin19;
		return t;
	};
	_proto.btn_303_i = function () {
		var t = new eui.ToggleButton();
		this.btn_303 = t;
		t.label = "303";
		t.x = 298;
		t.y = 12;
		t.skinName = ToolBarSkin$Skin20;
		return t;
	};
	_proto.btn_302_i = function () {
		var t = new eui.ToggleButton();
		this.btn_302 = t;
		t.label = "302";
		t.x = 415;
		t.y = 12;
		t.skinName = ToolBarSkin$Skin21;
		return t;
	};
	_proto.btn_401_i = function () {
		var t = new eui.ToggleButton();
		this.btn_401 = t;
		t.label = "401";
		t.x = 523;
		t.y = 11;
		t.skinName = ToolBarSkin$Skin22;
		return t;
	};
	_proto.btn_304_i = function () {
		var t = new eui.ToggleButton();
		this.btn_304 = t;
		t.label = "304";
		t.x = 622;
		t.y = 15;
		t.skinName = ToolBarSkin$Skin23;
		return t;
	};
	_proto.btn_402_i = function () {
		var t = new eui.ToggleButton();
		this.btn_402 = t;
		t.label = "402";
		t.x = 712;
		t.y = 17;
		t.skinName = ToolBarSkin$Skin24;
		return t;
	};
	_proto.btn_403_i = function () {
		var t = new eui.ToggleButton();
		this.btn_403 = t;
		t.label = "403";
		t.x = 805;
		t.y = 14;
		t.skinName = ToolBarSkin$Skin25;
		return t;
	};
	return ToolBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.visible = false;
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);