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

/**
 * loading界面
 */
class LoadingUI extends eui.Group implements RES.PromiseTaskReporter 
{
    private static _instance:LoadingUI;

    /** 背景 */
    private backShape:egret.Shape;
    /** 提示文本 */
    private msgTxt:eui.Label;
    /** 等待图片 */
    private waitImg:eui.Image;
    /** 当前下标 */
    private currIndex:number;
    private step:number;

    public constructor() 
    {
        super();

        LoadingUI._instance = this;

        this.createView();
    }

    public static get instance():LoadingUI
    {
        return this._instance || new LoadingUI();
    }

    private createView(): void 
    {
        this.width = 1920;
        this.height = 1080;

        this.horizontalCenter = 0;
        this.verticalCenter = 0;

        this.backShape = new egret.Shape();
        this.backShape.graphics.beginFill(0xffffff, 0.6);
        this.backShape.graphics.drawRect(0, 0, this.width, this.height);
        this.backShape.graphics.endFill();
        this.addChild(this.backShape);

        this.msgTxt = new eui.Label();
        this.msgTxt.textColor = 0xFF0000;
        this.msgTxt.stroke = 1;
        this.msgTxt.strokeColor = 0xFFFFFF;
        this.msgTxt.size = 30;
        this.msgTxt.width = 480;
        this.msgTxt.height = 100;
        this.msgTxt.textAlign = "center";
        this.msgTxt.horizontalCenter = 0;
        this.msgTxt.verticalCenter = 100;
        this.addChild(this.msgTxt);
    }

    public onProgress(current: number, total: number): void 
    {
        this.msgTxt.text = `正在加载中...${current}/${total}`;
    }

    public show():void
    {
        this.msgTxt.text = "正在加载中...";

        this.currIndex = 1;

        this.step = 0;

        LayerManager.instance.addChild(this, LayerType.ui);

        App.stage.stage.addEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);
    }

    public hide():void
    {
        App.stage.stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterFrameHandler, this);

        this.parent && this.parent.removeChild(this);
    }

    private __enterFrameHandler():void
    {
        if(!this.waitImg) return;

        this.step ++;

        if(this.step % 3 != 0) return;
        
        this.waitImg.rotation -= 20;
    }

    public init():void
    {
        this.waitImg = new eui.Image();

        this.waitImg.anchorOffsetX = 36;

        this.waitImg.anchorOffsetY = 36;

        this.waitImg.texture = RES.getRes(`core_json.loading_1`);

        this.waitImg.horizontalCenter = 0;

        this.waitImg.verticalCenter = 0;

        this.addChild(this.waitImg);
    }
}
