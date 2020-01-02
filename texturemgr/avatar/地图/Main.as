package  
{
	
	import flash.display.MovieClip;
	import flash.display.StageScaleMode;
	import fl.controls.Button;
	import flash.events.MouseEvent;
	import flash.net.FileReference;
	import flash.events.Event;
	import flash.display.Loader;
	import flash.events.ProgressEvent;
	import fl.controls.ComboBox;
	import fl.data.SimpleCollectionItem;
	import fl.data.DataProvider;
	import flash.display.Shape;
	
	
	public class Main extends MovieClip 
	{
		/** 最大宽度 */
		private var MAX_W:Number = 1920;
		/** 最大高度 */
		private var MAX_H:Number = 1080;
		/** 网格宽度 */
		private var grid_w:Number = 40;
		/** 网格高度 */
		private var grid_h:Number = 40;
		/** 总行数 */
		private var total_row:Number;
		/** 总列数 */
		private var total_col:Number;
		/** 文件选择器 */
		private var fileRef:FileReference;
		/** 背景图片loaders */
		private var loaders:Loader;
		/** 绘制网格mc */
		public var grid_mc:MovieClip;
		/** 地图窗口 */
		public var mapLayer:MovieClip;
		/** 选择背景按钮 */
		public var bgBtn:Button;
		/** 保存地图数据按钮 */
		public var saveBtn:Button;
		/** 加载地图数据按钮 */
		public var loadBtn:Button;
		/** 类型下拉条 */
		public var typeBox:ComboBox;
		/** 清除标记 */
		public var clearBtn:Button;
		/** 网格标记数据 */
		private var gridData:Object;
		/** 网格颜色绘制 */
		private var gridShape:Object;
		/** 当前类型 */
		private var currType:Number;
		/** 是否清除 */
		private var is_clear:Boolean;
		/** 加载类型：1：地图背景；2：地图格子数据 */
		private var load_type:Number;
		
		public function Main() 
		{
			if(this.stage)
			{
				this.__addToStageHandler(null);
			}
			else
			{
				this.addEventListener(Event.ADDED_TO_STAGE, this.__addToStageHandler);
			}
		}
		
		/** 添加到舞台 */
		private function __addToStageHandler(e:Event):void
		{
			this.initView();
			
			this.initEvent();
			
			this.initGrid();
			
			this.initData();
		}
		
		private function initView():void
		{
			this.stage.scaleMode = StageScaleMode.SHOW_ALL;
			
			this.fileRef = new FileReference();
			
			this.loaders = new Loader();
			
			this.gridData = {};
			
			this.gridShape = {};
		}
		
		private function initEvent():void
		{
			this.bgBtn.addEventListener(MouseEvent.CLICK, this.__bgBtnClickHandler);
			
			this.grid_mc.addEventListener(MouseEvent.MOUSE_DOWN, this.__mouseDownHandler);
			
			this.typeBox.addEventListener(Event.CHANGE, this.__typeChangeHandler);
			
			this.clearBtn.addEventListener(Event.CHANGE, this.__clearBtnClickHandler);
			
			this.saveBtn.addEventListener(MouseEvent.CLICK, this.__saveDataHandler);
			
			this.loadBtn.addEventListener(MouseEvent.CLICK, this.__loadDataHandler);
		}
				
		/** 初始化网格 */
		private function initGrid():void
		{
			this.total_col = Math.floor(this.MAX_W / this.grid_w);
			
			this.total_row = Math.floor(this.MAX_H / this.grid_h);
			
			trace("总格子数：", this.total_col * this.total_row);
			
			var grid_mc:MovieClip = this.grid_mc;
			
			grid_mc.graphics.lineStyle(1, 0xFF0000);
			
			var vx:Number;
			
			var i:Number;
			
			//列数
			for(i = 0; i <= this.total_col; i ++)
			{
				vx = i * this.grid_w;
				
				grid_mc.graphics.moveTo(vx, 0);
				
				grid_mc.graphics.lineTo(vx, this.MAX_H);
			}
			
			//行数
			for(i = 0; i <= this.total_row; i ++)
			{
				vx = i * this.grid_h;
				
				grid_mc.graphics.moveTo(0, vx);
				
				grid_mc.graphics.lineTo(this.MAX_W, vx);
			}
		}
		
		/** 初始化数据 */
		private function initData():void
		{
			this.currType = 0;
			
			this.is_clear = false;
		}
		
		/** 类型选择 */
		private function __typeChangeHandler(e:Event):void
		{
			var item:SimpleCollectionItem = this.typeBox.selectedItem as SimpleCollectionItem;
			
			if(item)
			{
				this.currType = parseInt(item.data);
				
				for(var index in this.gridData)
				{
					if(this.gridData[index] & this.currType)
					{
						this.drawGrid(parseInt(index));
					}
					else
					{
						this.clearGrid(parseInt(index));
					}
				}
			}
		}
		
		/** 清除标记 */
		private function __clearBtnClickHandler(e:Event):void
		{
			this.is_clear = this.clearBtn.selected;
		}
		
		/** 鼠标按下 */
		private function __mouseDownHandler(e:MouseEvent):void
		{
			if(this.currType == 0) return;
			
			this.__gridClickHandler(e);
			
			this.stage.addEventListener(MouseEvent.MOUSE_UP, this.__mouseUpHandler);
			
			this.grid_mc.addEventListener(MouseEvent.MOUSE_MOVE, this.__gridClickHandler);
		}
		
		/** 鼠标抬起 */
		private function __mouseUpHandler(e:MouseEvent):void
		{
			this.stage.removeEventListener(MouseEvent.MOUSE_UP, this.__mouseUpHandler);
			
			this.grid_mc.removeEventListener(MouseEvent.MOUSE_MOVE, this.__gridClickHandler);
		}
		
		/** 网格点击 */
		private function __gridClickHandler(e:MouseEvent):void
		{
			var vx:Number = Math.floor(e.localX);
			
			var vy:Number = Math.floor(e.localY);
			
			var col:Number = Math.floor(vx / this.grid_w);
			
			var row:Number = Math.floor(vy / this.grid_h);
			
			var index:Number = row * this.total_col + col;
			
			var type:Number = this.gridData[index] || 0;
			
			if(this.is_clear)
			{
				type = type & ~(this.currType)
				
				this.clearGrid(index);
			}
			else if(type != (type | this.currType))
			{
				type = type | this.currType;
				
				this.drawGrid(index);
			}
			
			this.gridData[index] = type;
		}
		
		/** 绘制格子颜色 */
		private function drawGrid(index:Number):void
		{
			var shape:Shape = this.gridShape[index];
			
			if(!shape)
			{
				var vx:Number = Math.floor(index % this.total_col) * this.grid_w;
			
				var vy:Number = Math.floor(index / this.total_col) * this.grid_h;
				
				shape = new Shape();
				
				shape.x = vx;
				
				shape.y = vy;
				
				this.grid_mc.addChild(shape);
				
				this.gridShape[index] = shape;
			}
			
			shape.graphics.clear();
			
			shape.graphics.beginFill(0x0000FF, 0.3);
			
			shape.graphics.drawRect(0, 0, this.grid_w, this.grid_h);
			
			shape.graphics.endFill();
		}
		
		/** 清除格子颜色 */
		private function clearGrid(index:Number):void
		{
			var shape:Shape = this.gridShape[index];
			
			if(!shape)
			{
				return;
			}
			
			shape.graphics.clear();
		}
		
		/** 选择地图 */
		private function __bgBtnClickHandler(e:MouseEvent):void
		{
			if(this.fileRef)
			{
				this.load_type = 1;
				
				this.fileRef.addEventListener(Event.SELECT, this.__fileSelectedHandler);
				
				this.fileRef.browse();
			}
		}
		
		/** 文件选择 */
		private function __fileSelectedHandler(e:Event):void
		{
			if(this.fileRef)
			{
				this.fileRef.removeEventListener(Event.SELECT, this.__fileSelectedHandler);
				
				this.fileRef.addEventListener(Event.COMPLETE, this.__fileCompleteHandler);
				
				this.fileRef.load();
			}
		}
		
		/** 地图加载成功 */
		private function __fileCompleteHandler(e:Event):void
		{
			if(this.fileRef && this.fileRef.data)
			{
				if(this.load_type == 1)
				{
					this.fileRef.removeEventListener(Event.COMPLETE, this.__fileCompleteHandler);
				
					this.loaders.loadBytes(this.fileRef.data);
				
					if(this.mapLayer.numChildren > 0)
					{
						this.mapLayer.removeChildAt(0);
					}
				
					this.mapLayer.addChild(this.loaders);
				}
				else if(this.load_type == 2)
				{
					try
					{
						var length:Number = this.fileRef.data.length;
						
						var jsonData:Object = JSON.parse(this.fileRef.data.readUTFBytes(length));
						
						this.gridData = jsonData;
					}
					catch(e:Error)
					{
						trace("加载文件格式错误!", e);
					}
				}
			}
		}
		
		/** 保存地图数据 */
		private function __saveDataHandler(e:MouseEvent):void
		{
			if(!this.gridData) return;
			
			var dataJson:String = JSON.stringify(this.gridData, null, 4);
			
			this.fileRef.addEventListener(Event.COMPLETE, this.__saveCompleteHandler);
			this.fileRef.addEventListener(Event.CANCEL, this.__saveCancelHandler);
			
			this.fileRef.save(dataJson, "1.json");
		}
		
		/** 文件保存完毕 */
		private function __saveCompleteHandler(e:Event):void
		{
			this.fileRef.removeEventListener(Event.COMPLETE, this.__saveCompleteHandler);
			this.fileRef.removeEventListener(Event.CANCEL, this.__saveCancelHandler);
			
			for(var index in this.gridData)
			{
				this.clearGrid(parseInt(index));
			}
				
			this.gridData = {};
			
			this.typeBox.selectedIndex = 0;
		}
		
		/** 取消文件保存 */
		private function __saveCancelHandler(e:Event):void
		{
			this.fileRef.removeEventListener(Event.COMPLETE, this.__saveCompleteHandler);
			this.fileRef.removeEventListener(Event.CANCEL, this.__saveCancelHandler);
		}
		
		/** 加载地图数据 */
		private function __loadDataHandler(e:MouseEvent):void
		{
			if(this.fileRef)
			{
				this.load_type = 2;
				
				this.fileRef.addEventListener(Event.SELECT, this.__fileSelectedHandler);
				
				this.fileRef.browse();
			}
		}
	}
}
