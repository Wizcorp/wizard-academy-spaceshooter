
const BASIC_DT = 1.0 / 60.0;

export class TimesteppedScene extends Phaser.State {
	lastUpdateTime: number;

	create(): void {
		this.lastUpdateTime = 0; // means that it's not set yet
	}

	update(): void {
		let time = this.game.time.totalElapsedSeconds();

		if (!this.lastUpdateTime) {
			this.lastUpdateTime = time;
		}

		while (time - this.lastUpdateTime >= BASIC_DT) {
			this.fixedUpdate();
			this.lastUpdateTime += BASIC_DT;
		}
	}

	fixedUpdate() {
		console.log(`Please override fixedUpdate`);
	}

	protected get fixedDt(): number {
		return BASIC_DT;
	}
}
