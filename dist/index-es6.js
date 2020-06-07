'use strict';

class SkySpiderwebDev {
	
	constructor(config) {
		
		this.defaultModes = {
			showDots: "show-dots",
			circleDots: "circle-dots",
			dotsRandColor: "dots-rand-color",
			linesRandColor: "dots-rand-color",
			debug: "debug"
		};
		
		this.Config = config || {};
		
		this.Selector = config.selector || undefined;
		
		this.Node = undefined;
		
		this.Dots = [];
		
		this.Modes = {};

		if (!this.init()) return;
		
		this.build();
		this.events();
	}
	
	init() {
		
		if (typeof this.Selector === "object")
			this.Node = this.Selector;
		else if (typeof this.Selector === "string")
			this.Node = document.querySelector(this.selector);
		
		if (this.Node)
			this.Dots = [...this.Node.querySelectorAll('.dot')];
		
		return this.Node && this.Dots.length
	}
	
	reInit() {
		if (!this.init()) return;
		this.build();
	}
	
	build() {
		
	}
	
	clear() {
		this.Dots.forEach((dot) => dot.remove());
	}
	
	events() {
		window.addEventListener('resize', (e) => this.resizeWindowEvent(e));
	}
	
	resizeWindowEvent(event) {
		this.reInit();
	}
	
	randColor() {
		let letters = '0123456789ABCDEF',
            color = '#';

        for (var i = 0; i < 6; i++)
            color += letters[Math.floor(Math.random() * 16)];

        return color;
	}
	
}