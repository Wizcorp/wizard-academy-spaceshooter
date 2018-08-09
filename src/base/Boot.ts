
export default class Boot extends Phaser.State {
	private divForUi: HTMLDivElement;
	private canvasElement: HTMLCanvasElement;
	private contentDiv: HTMLDivElement;

	init() {
		//  Unless you specifically need to support multitouch I would recommend setting this to 1
		this.input.maxPointers = 1;

		//  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
		this.stage.disableVisibilityChange = true;

		// Enable physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.scale.setResizeCallback(this.onResize, this);
		this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.scale.pageAlignHorizontally = false;
		this.scale.forceLandscape = !this.game.device.desktop;
	}

	preload() {}

	create() {
		this.contentDiv = document.querySelector('#content') as HTMLDivElement;
		this.canvasElement = document.querySelector('#content canvas') as HTMLCanvasElement;
		this.divForUi = document.createElement('div');
		this.divForUi.id = 'divForUi';
		this.contentDiv.appendChild(this.divForUi);

		//  By this point the preloader assets have loaded to the cache, we've set the game settings
		//  So now let's start the real preloader going
		this.game.state.start('TitleScene');
	}

	shutdown() {}

	onResize() {
		// Update size to an integer factor (min. 1)
		const width = this.contentDiv.offsetWidth;
		const height = window.innerHeight - this.contentDiv.offsetTop;
		const scaleFactor = Math.max(1, Math.floor(Math.min(width / this.game.width, height / this.game.height)));

		this.scale.setUserScale(scaleFactor, scaleFactor);

		// Update UI div
		this.divForUi.style.width = `${this.game.width}px`;
		this.divForUi.style.height = `${this.game.height}px`;
		this.divForUi.style.transform = `translate(-50%, -50%) scale(${scaleFactor}) translate(50%, 50%)`;
		// this.divForUi.style.width = `${this.canvasElement.offsetWidth}px`;
		// this.divForUi.style.height = `${this.canvasElement.offsetHeight}px`;
	}
}
