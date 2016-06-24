var pl;
(function (pl) {
    /**
     * Reference: http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
     * https://gist.github.com/james2doyle/5694700
     */
    var ScrollTo = (function () {
        function ScrollTo() {
            /**
             * @type {any}
             */
            this._requestAnimFrame = null;
        }
        /**
         * Scroll to an element indicated by hash.
         * @param {string} hash
         */
        ScrollTo.byHash = function (hash) {
            var id = hash.replace("#", "");
            var target = document.getElementById(id);
            if (target) {
                var offsetTop = target.offsetTop;
                ScrollTo.instance.scrollTo(offsetTop);
            }
        };
        /**
         * Scroll to an offset
         * @param {number} offset
         */
        ScrollTo.prototype.scrollTo = function (offset) {
            var duration = 1000;
            var diff = offset - document.body.scrollTop;
            var frame = diff / duration * 10;
            var requestFrame = this.requestAnimFame;
            var animation = function () {
                document.body.scrollTop += frame;
                if (frame > 0) {
                    if (document.body.scrollTop < offset)
                        requestFrame(animation);
                    else
                        console.timeEnd("Animation Frame");
                }
                else {
                    if (document.body.scrollTop > offset)
                        requestFrame(animation);
                    else
                        console.timeEnd("Animation Frame");
                }
            };
            console.time("Animation Frame");
            requestFrame(animation);
        };
        Object.defineProperty(ScrollTo, "instance", {
            /**
             * Get an instance of ScrollTo.
             * @returns {ScrollTo}
             */
            get: function () {
                if (!this._instance) {
                    this._instance = new ScrollTo();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollTo.prototype, "requestAnimFame", {
            /**
             * Get requestAnimationFrame.
             * @returns {any}
             */
            get: function () {
                if (!this._requestAnimFrame) {
                    this._requestAnimFrame = window.requestAnimationFrame
                        || window.webkitRequestAnimationFrame
                        || window.mozRequestAnimationFrame
                        || window.msRequestAnimationFrame
                        || function (callback) { window.setTimeout(callback, 10); };
                }
                return this._requestAnimFrame;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @type {ScrollTo}
         */
        ScrollTo._instance = null;
        return ScrollTo;
    }());
    pl.ScrollTo = ScrollTo;
})(pl || (pl = {}));
