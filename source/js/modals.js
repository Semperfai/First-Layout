const modules = () => {
	function headerScroll() {
		const header = document.querySelector('.header');
		(window.scrollY > header.style.height) ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
	}


	function burgerMenu() {
		document.addEventListener('click', (event) => {
			if (!event.target.classList.contains('icon-menu')) return;
			document.documentElement.classList.toggle('menu-open')
			document.documentElement.classList.toggle('lock')
			document.querySelector('.header').classList.remove('scroll-header')
		})
	}


	function activeSection(activeClass) {
		let sections = []
		let windowHeight = document.documentElement.clientHeight;
		let triggers = document.querySelectorAll('[data-active-section]');
		triggers.forEach(trigger => {
			sections.push(document.querySelector(`.${trigger.dataset.activeSection}`))
		})

		for (let i = 0; i < sections.length; i++) {
			let currentCoord = coord(sections[i]);
			let currentTrigger = checkMatches(sections[i], triggers)
			if (currentCoord.top < (windowHeight * 0.6)) {
				currentTrigger.classList.add(activeClass)
			} else {
				currentTrigger.classList.remove(activeClass)
			}
			if (currentCoord.bottom < windowHeight * 0.4) {
				currentTrigger.classList.remove(activeClass)
			}
		}

		function checkMatches(section, triggers) {
			let match;
			for (let trigger of triggers) {
				if ((section.classList.contains(trigger.dataset.activeSection))) {
					match = trigger
				} else continue
			}
			return match
		}
	}

	function coord(elem) {
		return elem.getBoundingClientRect()
	}


	function animationButton() {
		(function () {
			let lastTime = 0;
			let vendors = ['ms', 'moz', 'webkit', 'o'];
			for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
					|| window[vendors[x] + 'CancelRequestAnimationFrame'];
			}

			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function (callback, element) {
					let currTime = new Date().getTime();
					let timeToCall = Math.max(0, 16 - (currTime - lastTime));
					let id = window.setTimeout(function () { callback(currTime + timeToCall); },
						timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};

			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function (id) {
					clearTimeout(id);
				};
		}());
		(function () {
			// Get the buttons.
			let startBtn = document.getElementById('button');
			/*let resetBtn = document.getElementById('resetBtn');*/
			// A letiable to store the requestID.
			let requestID;
			// Canvas
			let canvas = document.getElementById('canvas');
			// 2d Drawing Context.
			let ctx = canvas.getContext('2d');

			// letiables to for the drawing position and object.
			let posX = 0;
			let W = 246;
			let H = 60;
			let circles = [];

			//Get canvas size
			canvas.width = 246;
			canvas.height = 60;

			// Animate.
			function animate() {
				requestID = requestAnimationFrame(animate);
				//Fill canvas with black color
				//ctx.globalCompositeOperation = "source-over";
				ctx.fillStyle = "rgba(0,0,0,0.15)";
				ctx.fillRect(0, 0, W, H);

				//Fill the canvas with circles
				for (let j = 0; j < circles.length; j++) {
					let c = circles[j];

					//Create the circles
					ctx.beginPath();
					ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false);
					ctx.fillStyle = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", 0.5)";
					ctx.fill();

					c.x += c.vx;
					c.y += c.vy;
					c.radius -= .02;

					if (c.radius < 0)
						circles[j] = new create();
				}

			}
			//Random Circles creator
			function create() {

				//Place the circles at the center

				this.x = W / 2;
				this.y = H / 2;


				//Random radius between 2 and 6
				this.radius = 2 + Math.random() * 3;

				//Random velocities
				this.vx = -5 + Math.random() * 10;
				this.vy = -5 + Math.random() * 10;

				//Random colors
				this.r = Math.round(Math.random()) * 255;
				this.g = Math.round(Math.random()) * 255;
				this.b = Math.round(Math.random()) * 255;
			}

			for (let i = 0; i < 500; i++) {
				circles.push(new create());
			}

			// Start the animation.
			requestAnimationFrame(animate);
		}());

	}


	function popup(classPopup, triggerClose, delay, repeat) {
		let elemPopup = document.querySelector(classPopup);

		function activePopup() {
			let timerId = setTimeout(function tick() {
				elemPopup.classList.add('popup-active')
				elemPopup.classList.remove('popup-close')
				delay += repeat;
				timerId = setTimeout(tick, delay)
			}, delay)
			setTimeout(() => clearTimeout(timerId), 60000)
		}

		function closePopup() {
			document.querySelector(triggerClose).addEventListener('click', (event) => {
				if (!event.target) return null
				elemPopup.classList.remove('popup-active')
			})
		}

		activePopup()
		closePopup()
	}



	popup('.popup-subscribe', '.popup__close', 1500, 40000)
	animationButton()
	headerScroll()
	burgerMenu()
	activeSection('action-section')
	window.addEventListener('scroll', headerScroll)
	window.addEventListener('scroll', (e) => {
		activeSection('action-section')
	})
}

export default modules;
