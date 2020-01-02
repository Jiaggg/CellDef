//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer 
{
    protected createChildren(): void 
    {
        super.createChildren();

        if(egret.Capabilities.isMobile)
        {
            GameConst.GAME_FRAME = 30;
        }
        else
        {
            GameConst.GAME_FRAME = 60;
        }

        this.stage.frameRate = GameConst.GAME_FRAME;

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();

        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        App = {};

        this.initMgr();

        this.runGame().catch(e => 
        {
            console.log(e);
        })
    }

    private async runGame() 
    {
        await this.loadResource()

        this.createGameScene();
    }

    private async loadResource() 
    {
        try 
        {
            await RES.loadConfig("default.res.json", GameConst.res_path);

            await this.loadTheme();

            const loadingView = App.loading;

            loadingView.show();

            await RES.loadGroup(ResConst.group_preload, 0, loadingView);

            loadingView.init();

            await RES.loadGroup(ResConst.group_login, 0, loadingView);
        }
        catch (e) 
        {
            console.error(e);
        }
    }

    private loadTheme() 
    {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }

    /** 初始化管理类 */
    protected initMgr():void
    {
        App.layer = LayerManager.instance;

        App.stage = StageManager.instance;

        App.player = PlayerManager.instance;

        App.config = ConfigManager.instance;

        App.msg = MessageManager.instance;

        App.scene = SceneManager.instance;

        App.game = GameManager.instance;

        App.grid = GridManager.instance;

        App.layer.setup(this.stage);

        App.stage.setup(this.stage);

        App.player.setup();

        App.loading = LoadingUI.instance;
    }

    /**
     * 创建场景界面
     */
    protected createGameScene(): void 
    {
        App.loading.hide();
        
        App.config.setup(RES.getRes("config_data_json"));

        App.msg.setup();

        App.scene.setup();

        SwitchHelp.openLoginFrame();

        this.parent && this.parent.removeChild(this);
    }
}
