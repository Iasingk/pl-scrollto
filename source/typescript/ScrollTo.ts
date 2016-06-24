module pl {

	/**
	 * Reference: http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
	 * https://gist.github.com/james2doyle/5694700
	 */
	export class ScrollTo {

		/**
		 * Scroll to an element indicated by hash.
		 * @param {string} hash
		 */
		public static byHash (hash: string) {
			var id: string = hash.replace("#", "");
			var target: HTMLElement = document.getElementById(id);

			if (target) {
				var offsetTop = target.offsetTop;

				ScrollTo.instance.scrollTo(offsetTop);
			}
		}

		/**
		 * Scroll to an offset
		 * @param {number} offset
		 */
		private scrollTo (offset: number) {
			var duration: number = 1000;
			var diff: number = offset - document.body.scrollTop;
			var frame: number = diff / duration * 10;
			var requestFrame = this.requestAnimFame;

			var animation = () => {
				document.body.scrollTop += frame;

				if(frame > 0) {
					if (document.body.scrollTop < offset)
						requestFrame(animation);
					else
						console.timeEnd("Animation Frame");
				} else {
					if (document.body.scrollTop > offset)
						requestFrame(animation);
					else
						console.timeEnd("Animation Frame");
				}
			};

			console.time("Animation Frame");
			requestFrame(animation);

		}

		/**
		 * @type {ScrollTo}
		 */
		private static _instance: ScrollTo = null;

		/**
		 * Get an instance of ScrollTo.
		 * @returns {ScrollTo}
		 */
		public static get instance (): ScrollTo {
			if (!this._instance) {
				this._instance = new ScrollTo();
			}

			return this._instance;
		}

		/**
		 * @type {any}
		 */
		private _requestAnimFrame: any = null;

		/**
		 * Get requestAnimationFrame.
		 * @returns {any}
		 */
		public get requestAnimFame (): any {
			if (!this._requestAnimFrame) {
				this._requestAnimFrame = window.requestAnimationFrame
					|| window.webkitRequestAnimationFrame
					|| window.mozRequestAnimationFrame
					|| window.msRequestAnimationFrame
					|| function(callback) { window.setTimeout(callback, 10); };
			}

			return this._requestAnimFrame;
		}

	}

}