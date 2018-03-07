/**************************************************
 * drag.js
 * 元素拖动，及判断是否拖动到指定区域
 *
 * 如：initDrag(ele1, ele2, r)
 * ele1 :拖动元素ID 不可为空
 * ele2 :拖动到指定区域的元素ID 可为空
 * r	:指定区域的半径
 **************************************************/

var Drag = {
	dragObject: null,
	mouseOffset: null,
	dragAreaObject: null,
	dragAreaCenterPoint: {
		x: 0,
		y: 0,
		r: 218
	},
	moved: [],
	initDrag: function(dragElementId, centerElementId, radius) {
		if (dragElementId && centerElementId) {
			var _this = this;
			if (radius) this.dragAreaCenterPoint.r = radius;
			this.item = document.getElementById(dragElementId);
			this.item.onmousedown = function(evnt) {
				document.getElementById('tips').style.display = 'none';
				document.onmousemove = Drag.mouseMove;
				document.onmouseup = function(event) {
					Drag.mouseUp(_this, event);
				}
				Drag.dragObject = this;
				Drag.mouseOffset = Drag.getMouseOffset(this, evnt);
				return false;
			}
			if (centerElementId) {
				this.dragAreaObject = document.getElementById(centerElementId);
			}
		}
	},

	mousePoint: function(x, y) {
		this.x = x;
		this.y = y;
	},
	mousePosition: function(evnt) {
		evnt = evnt || window.event;
		var x = parseInt(evnt.clientX);
		var y = parseInt(evnt.clientY);
		return new Drag.mousePoint(x, y);
	},
	getMouseOffset: function(target, evnt) {
		var mousePos = Drag.mousePosition(evnt);
		var x = mousePos.x - target.offsetLeft;
		var y = mousePos.y - target.offsetTop;
		return new Drag.mousePoint(x, y);
	},
	mouseUp: function(_this, evnt) {
		if (_this.dragAreaObject)
			_this.checkArea(_this, evnt);
		Drag.dragObject = null;
		document.onmousemove = null;
		document.onmouseup = null;
	},
	mouseMove: function(evnt) {
		if (!Drag.dragObject) return;
		var mousePos = Drag.mousePosition(evnt);
		Drag.dragObject.style.position = "absolute";
		Drag.dragObject.style.marginLeft = '0px';
		Drag.dragObject.style.marginTop = '0px';
		Drag.dragObject.style.top = mousePos.y - Drag.mouseOffset.y + "px";
		Drag.dragObject.style.left = mousePos.x - Drag.mouseOffset.x + "px";
		return false;
	},
	checkArea: function(_this, evnt) {
		Drag.dragAreaCenterPoint.x = Drag.dragAreaObject.getBoundingClientRect().left;
		Drag.dragAreaCenterPoint.y = Drag.dragAreaObject.getBoundingClientRect().top;
		var mousePos = Drag.mousePosition(evnt);
		var xdiff = Math.abs(mousePos.x - this.dragAreaCenterPoint.x - this.dragAreaCenterPoint.r);
		var ydiff = Math.abs(mousePos.y - this.dragAreaCenterPoint.y - this.dragAreaCenterPoint.r - document.querySelector('body').offsetTop);
		var distance = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
		if (distance <= this.dragAreaCenterPoint.r) {
			this.dragObject.style.display = 'none';
			var id = this.dragObject.getAttribute('data-eid');
			if (id) {
				Drag.moved.push(id);
				var changeObj = document.getElementById('fixed-word-' + id);
				if (changeObj) {
					changeObj.className = changeObj.className.split(" ")[0] + ' ' + id + '-3' + ' fadeIn animated';
				}
				if (Drag.moved.length === 5) {

					/**
					 * 拖动完成之后执行过度 + 页面跳转
					 */

					var lightBox1 = document.getElementById('light-box-1');
					var lightBox2 = document.getElementById('light-box-2');
					var centerCircleObj = document.getElementById('center-circle');

					// 兼容不支持动画 和 animationEnd事件
					if (aniEndName === 'none' || !supportCss3('animation')) {
						setTimeout(function() {
							centerCircleObj.className = centerCircleObj.className.replace('fuwen-1', 'fuwen-2 rotateIn animated');
							setTimeout(function() {
								lightBox1.style.display = 'block';
								lightBox1.className += ' light-box-ani';
								setTimeout(function() {
									lightBox2.style.display = 'block';
									lightBox2.className += ' light-box-ani';
									setTimeout(function() {
										lightBox2.className = lightBox2.className.replace('light-box-ani', 'light-box-scale');
										setTimeout(function() {
											changePage();
										}, 1000)
									}, 1000)
								}, 1000)
							}, 1000)
						}, 1000);
						return;
					}

					var lightBoxAniCount = 0; // lightBox2执行2次动画，1次显示 2次放大
					var isChange = false;
					lightBox1.addEventListener(aniEndName, function() {
						lightBox2.style.display = 'block';
						lightBox2.className += ' light-box-ani2';
					});
					lightBox2.addEventListener(aniEndName, function() {
						lightBoxAniCount++;
						if (lightBoxAniCount == 1) {
							lightBox2.className = lightBox2.className.replace('light-box-ani2', 'light-box-scale');
						} else {
							if(!isChange){
								isChange = true;
								 changePage();
							}
						}
//						setTimeout(function(){
//							if(!isChange){
//								isChange = true;
//								 changePage();
//							}
//						},1100)
					});
					centerCircleObj.addEventListener(aniEndName, function() {
						lightBox1.style.display = 'block';
						lightBox1.className += ' light-box-ani';
					});

					centerCircleObj.className = centerCircleObj.className.replace('fuwen-1', 'fuwen-2 rotateIn animated');
				}
			}
		}
	}
}