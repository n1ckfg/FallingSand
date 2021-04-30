let pixelsPerParticle = 4;
let grid = [];
let particleSet = new Set();
let gridWidth = 120;
let gridHeight = 120;
let frHistory = [];
let frHistoryIndex = 0;
let fr;
let radio;
let pauseButton;
let frSlider;
let paused = false;
let brushSizeSlider;
let brushSizeDisplay;
let brushReplaceCheckbox;
let canvas;
let canvasContext;

function setup() {

	createCanvas(pixelsPerParticle * gridWidth,
		pixelsPerParticle * gridHeight);
	// pixelDensity(1);
	canvas = document.getElementById('defaultCanvas0');
	canvasContext = canvas.getContext('2d');
	radio = createRadio();
	radio.option('Sand');
	radio.option('Wall');
	radio.option('Water');
	radio.option('Delete');
	radio.selected('Sand');

	brushSizeDisplay = createDiv('');
	brushSizeSlider = createSlider(1, min(16, min(gridWidth, gridHeight)), 1, 1);
	brushReplaceCheckbox = createCheckbox('Replace?', true)

	pauseButton = createButton('Pause');
	pauseButton.mouseClicked(pauseSim);

	frSlider = createSlider(1, 60, 60, 1);

	fr = createP('');
	frHistory = new Array(60);

	for (let x = 0; x < gridWidth; x++) {
		grid[x] = [];
		for (let y = 0; y < gridHeight; y++) {
			grid[x][y] = false;
			if (y === 0 || y === gridHeight - 1 || x === 0 || x === gridWidth - 1) {
				new WallParticle(x, y);
			}
		}
	}

	// new WaterParticle(5, 5);
	noStroke();
	// strokeWeight(1);
	// stroke(0, 10);
}

function draw() {
	frameRate(frSlider.value())
	background(0);

	brushSizeDisplay.html(brushSizeSlider.value());

	handleMouseClick();

	for (let p of particleSet) {
		if (!paused) {
			p.update();
		}
		p.show();
	}

	fr.html(floor(averageFrameRate()));
	// noLoop();
}


averageFrameRate = function () {
	frHistory[frHistoryIndex] = frameRate();
	frHistoryIndex += 1;
	if (frHistoryIndex >= frHistory.length) {
		frHistoryIndex = 0;
	}

	sum = 0;
	for (let i = 0; i < frHistory.length; i++) {
		sum += frHistory[i];
	}
	return sum / frHistory.length;
}


pauseSim = function () {
	paused = !paused;
}


handleMouseClick = function () {
	if (mouseIsPressed) {
		let x = floor(mouseX / pixelsPerParticle);
		let y = floor(mouseY / pixelsPerParticle);

		if (x <= gridWidth - 2 && x >= 1 && y <= gridHeight - 2 && y >= 1) {

			let brushSize = brushSizeSlider.value();
			let imin = floor(-0.5 * (brushSize - 1));

			for (i = imin; i < imin + brushSize; i++) {
				let ix = x + i;
				for (j = imin; j < imin + brushSize; j++) {
					let iy = y + j;
					if (ix <= gridWidth - 2 && ix >= 1 && iy <= gridHeight - 2 && iy >= 1) {
						let p = grid[ix][iy];
						let action = radio.value();
						if (p) {
							if (brushReplaceCheckbox.checked() || action === 'Delete') {
								particleSet.delete(p);
								performSelectedAction(action, ix, iy);
							}
						}
						else {
							performSelectedAction(action, ix, iy);
						}

					}
				}
			}
		}
	}

	performSelectedAction = function (action, x, y) {
		let p;
		switch (action) {
			case 'Sand':
				p = new SandParticle(x, y);
				break;
			case 'Wall':
				p = new WallParticle(x, y);
				break;
			case 'Water':
				p = new WaterParticle(x, y);
				break;
			case 'Delete':
				grid[x][y] = false;
				break;
		}
	}
}
