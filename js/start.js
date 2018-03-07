/**
 * 太空流星效果 
 */
var c = document.getElementById("canvas");
var cx = c.getContext("2d");
var height = c.height = window.innerHeight;
var width = c.width = window.innerWidth;
var rMin = 3;
var particalMax = random(10, 50);
var particles = [];

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000);
		};
})();

function initStarts() {
	if(!cx){ // 不支持canvas
		return;
	}
	window.requestAnimFrame(initStarts);
	loop();
}

function loop() {
	clearCanvas();
	createParticles();
	updateParticles();
	renderParticles();
}

function clearCanvas() {
	cx.globalCompositeOperation = 'source-over';
	cx.clearRect(0, 0, width, height);
	cx.globalCompositeOperation = 'lighter';
}

function createParticles() {
	if (particles.length > 10) {
		return;
	}
	var count = 1;
	while (count--) {
		particles.push(new Particle());
	};
}

function updateParticles() {
	var i = particles.length;
	while (i--) {
		var p = particles[i];
		p.update(i);
	};

}

function renderParticles() {
	var i = particles.length;
	while (i--) {
		var p = particles[i];
		p.render();
	};
}

function Particle() {
	this.r = random(1, 2); //半径
	this.x = random(width / 3, width); //x坐标
	this.y = 0;
	this.vx = random(-5, 0.5); //random(-10, 10); //x方向速度
	this.vy = random(0.5, 2);
	this.g = 0; //1;//重力加速度
	this.life = 1; //生命周期
	this.lifeMax = random(150, 300);
	this.render = function() {
		if(!cx) return;
		var ball = 
		cx.createRadialGradient(this.x, this.y - 0.6 * this.r, 0, this.x, this.y - 0.6 * this.r, this.r); //径向过度效果
		ball.addColorStop(0, 'rgba(255,255,255,0.8)');
		ball.addColorStop(0.7, 'rgba(0,204,255,.9)');
		ball.addColorStop(1, 'rgba(255,255,255,0.8)');
		cx.fillStyle = ball 
		cx.beginPath();
		cx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		cx.closePath();
		cx.fill();
	};
	this.update = function(i) {
		this.vx = this.vx;
		this.vy = this.vy + this.g;
		this.x += this.vx;
		this.y += this.vy;
		this.life++;;
		this.r *= 0.995;
		if (this.y > height) {
			particles.splice(i, 1);
		}
		if ((this.life >= this.lifeMax)) { //生命周期检测
			particles.splice(i, 1);
		}
	}
};