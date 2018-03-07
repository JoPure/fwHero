! function() {
	/**********************************************************
	 * 文件预加载
	 * @param {Array} files  加载文件
	 * @param {Function} onLoadingFunc 加载中执行方法
	 */

	var PreLoad = function(files, config) {
		var loadConfig = config || {};
		this.source = files;
		this.count = 0;
		this.total = files.length;
		this.onload = loadConfig.onload;
		this.prefix = loadConfig.prefix || "";
		this.init()
	};
	PreLoad.prototype.init = function() {
		var _this = this;
		_this.source.forEach(function(file) {
			var suffix = file.substr(file.lastIndexOf(".") + 1).toLowerCase(),
				filePath = _this.prefix + file;
			switch (suffix) {
				case "js":
					_this.script.call(_this, filePath);
					break;
				case "css":
					_this.stylesheet.call(_this, filePath);
					break;
				case "svg":
				case "jpg":
				case "gif":
				case "png":
				case "jpeg":
					_this.image.call(_this, filePath)
			}
		})
	};
	PreLoad.prototype.getProgress = function() {
		return Math.round(this.count / this.total * 100);
	};
	PreLoad.prototype.image = function(filePath) {
		var _image = document.createElement("img");
		this.load(_image, filePath);
		_image.src = filePath;
	};
	PreLoad.prototype.stylesheet = function(filePath) {
		var _stylesheet = document.createElement("link");
		this.load(_stylesheet, filePath);
		_stylesheet.rel = "stylesheet";
		_stylesheet.type = "text/css";
		_stylesheet.href = filePath;
		document.head.appendChild(_stylesheet);
	};
	PreLoad.prototype.script = function(filePath) {
		var _script = document.createElement("script");
		this.load(_script, filePath);
		_script.type = "text/javascript";
		_script.src = filePath;
		document.head.appendChild(_script);
	};
	PreLoad.prototype.load = function(Obj, filePath) {
		var _this = this;
		Obj.onload = Obj.onerror = Obj.onabort = function(Obj) {
			_this.onload && _this.onload({
				count: ++_this.count,
				total: _this.total,
				item: filePath,
				type: Obj.type
			})
		}
	};

	// MP4等不必要元素不进行预加载 TODO 增加支持音频文件预加载
	var basePath = "http://res-cdn.rhweb.changic.net.cn/xuannian/";
	var tasks = [
		basePath + "xuannian/js/jquery.parallax_4114ce5.js",
		basePath + "xuannian/css/img/world-bg_aa097c8.png",
		basePath + "xuannian/css/img/home-bg_70c2a27.jpg",
		basePath + "xuannian/css/img/stone-left-bottom_9c744c5.png",
		basePath + "xuannian/css/img/stone-left-top_c29a1c5.png",
		basePath + "xuannian/css/img/stone-light-left_03f1718.png",
		basePath + "xuannian/css/img/stone-light-right_50bbef8.png",
		basePath + "xuannian/css/img/stone-right-bottom_a999829.png",
		basePath + "xuannian/css/img/sprites_4d4e4a0.png",
		basePath + "xuannian/css/img/circle_5e94ce3.png",
		basePath + "xuannian/css/img/circle-border-1_e2b74f8.png",
		basePath + "xuannian/css/img/circle-border-2_99fd93b.png",
//		"xuannian/js/start.js",
		basePath + "xuannian/js/start_96063e4.js",
//		"xuannian/js/drag.js",
		basePath + "xuannian/js/drag_057e91b.js",
		//		"//cdn.bootcss.com/prefixfree/1.0.7/prefixfree.min.js"
	];
	var tasks2 = [
		basePath + "xuannian/img/main-tower_1c20749.png",
		basePath + "xuannian/img/next-bg_05013e2.jpg",
		basePath + "xuannian/css/img/tower-1_dee9191.png",
		basePath + "xuannian/css/img/tower-2_bd92777.png",
		basePath + "xuannian/css/img/tower-3_f4ac2f6.png",
		basePath + "xuannian/css/img/sprites_4d4e4a0.png",
		basePath + "xuannian/css/img/water_9089dbd.png",
		basePath + "xuannian/css/img/fire_34fd04e.png",
		basePath + "xuannian/css/img/battle_b010d92.png",
		basePath + "xuannian/css/img/world-bg_aa097c8.png",
		basePath + "xuannian/img/cloud-1_5a4552c.png",
		basePath + "xuannian/img/cloud-2_d515a64.png",
		basePath + "xuannian/img/cloud-battle_a926ceb.png",
		basePath + "xuannian/img/cloud-right_b6654a8.png",
		basePath + "xuannian/img/cloud-water_f3ed0ca.png",
		basePath + "xuannian/img/detail-btn_5cd42d2.png",
		basePath + "xuannian/img/info_bbc2fae.png",
		basePath + "xuannian/img/qrcode_04c79a5.png",
		basePath + "xuannian/img/next-bg_05013e2.jpg",
		basePath + "xuannian/img/share_icon_ab88341.jpg",
		basePath + "xuannian/img/share-btn_fa30625.png"
	];
	var $progress = document.getElementById('progress');

	function loading(load) {
		var count = load.count;
		var total = load.total;
		$progress && ($progress.innerHTML = Math.round(100 * count / total) + '%')
		if (count === total) return complete()
	};

	function next(el, fn) {
		el.className += ' scaleOut'
		setTimeout(function() {
			el.parentNode.removeChild(el)
			fn && fn()
		}, 800)
	};

	function complete() {
		var $loader = document.getElementById('loader');
		var url = '';
		next($loader, function() {
			document.getElementById('footer').style.display = 'block';
			document.getElementById('footer').className += " " + 'animated fadeIn';
			document.getElementById('container').style.display = 'block';
			document.getElementById('container').className += " " + 'animated fadeIn';

		});
		setTimeout(function() {
			// 火狐粒子效果比较卡，暂时取消该效果
//			if (navigator.userAgent.indexOf('Firefox') < 0) {
//				initStarts();
//			}
			Drag.initDrag("word-w", "drag-area");
			Drag.initDrag("word-o", "drag-area");
			Drag.initDrag("word-l", "drag-area");
			Drag.initDrag("word-r", "drag-area");
			Drag.initDrag("word-d", "drag-area");

			var tipsObj = document.getElementById('tips');
			document.onmousemove = function(e) {
					x = (document.layers) ? e.pageX : document.body.scrollLeft + e.clientX //根据浏览器的不同，记录鼠标的水平位置
					y = (document.layers) ? e.pageY : document.body.scrollTop + e.clientY //记录鼠标的垂直位置
					tipsObj.style.top = y - 10 + 'px';
					tipsObj.style.left = x + 10 + 'px';
				}
				//	延迟加载第二屏幕图片资源
			new PreLoad(tasks2, {});
		}, 1000)

	};
	"document" in window && !("classList" in document.createElement("_")) && tasks.unshift("class_list.js");
	//	加载第一屏页面的图片资源
	new PreLoad(tasks, {
		onload: loading
	});

}();

var aniEndName = (function() {
	var eleStyle = document.createElement('div').style;
	var verdors = ['a', 'webkitA', 'MozA', 'OA', 'msA'];
	var endEvents = ['animationend', 'webkitAnimationEnd', 'animationend', 'oAnimationEnd', 'MSAnimationEnd'];
	var animation;
	for (var i = 0, len = verdors.length; i < len; i++) {
		animation = verdors[i] + 'nimation';
		if (animation in eleStyle) {
			return endEvents[i];
		}
	}
	return 'none';
}());