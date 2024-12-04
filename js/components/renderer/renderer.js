define([
    "text!./renderer.html",
    "css!./renderer.css",
    "knockout",
    "material-components-web",
    "less"
], (view, css, ko, mdc, less) => {
    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let Renderer = function (args = {}) {
        console.debug("Renderer()");

        this.canvas = ko.observable(null);

        this.isBackgroundTransparent = ko.isObservable(args.isBackgroundTransparent) ? args.isBackgroundTransparent : ko.observable(false);
        this.backgroundWidth = ko.isObservable(args.backgroundWidth) ? args.backgroundWidth : ko.observable(380);
        this.backgroundHeight = ko.isObservable(args.backgroundHeight) ? args.backgroundHeight : ko.observable(380);
        this.backgroundColor = ko.isObservable(args.backgroundColor) ? args.backgroundColor : ko.observable("#212121");
        this.backgroundLightIntensity = ko.isObservable(args.backgroundLightIntensity) ? args.backgroundLightIntensity : ko.observable(0);
        this.backgroundShadowColor = ko.isObservable(args.backgroundShadowColor) ? args.backgroundShadowColor : ko.observable("#000000");
        this.backgroundShadowSize = ko.isObservable(args.backgroundShadowSize) ? args.backgroundShadowSize : ko.observable(0);
        this.backgroundBorderRadius = ko.isObservable(args.backgroundBorderRadius) ? args.backgroundBorderRadius : ko.observable(0);

        this._onRenderSubscribe = ko.computed(this._onRender, this);
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Renderer.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        node.replaceWith(root);

        this.canvas(root);
    };


    /**
     * Dispose.
     */
    Renderer.prototype.dispose = function () {
        console.debug("~Renderer()");

        this._onRenderSubscribe.dispose();
    };

    //#endregion


    //#region [ Methods : Private ]

    /**
     * Renders the icon.
     */
    Renderer.prototype._onRender = function () {
        const canvas = this.canvas();
        const isBackgroundTransparent = this.isBackgroundTransparent();
        const backgroundWidth = parseInt(this.backgroundWidth());
        const backgroundHeight = parseInt(this.backgroundHeight());
        const backgroundColor = this.backgroundColor();
        const backgroundLightIntensity = parseInt(this.backgroundLightIntensity());
        const backgroundShadowColor = this.backgroundShadowColor();
        const backgroundShadowSize = parseInt(this.backgroundShadowSize());
        const backgroundBorderRadius = parseInt(this.backgroundBorderRadius());
        
        if (!canvas) {
            return;
        }
        console.warn("_onRender");

        // Get less functions
        const mix = less.functions.functionRegistry.get("mix");

        // Set canvas size
        canvas.width = backgroundWidth;
        canvas.height = backgroundHeight;

        // Clear the canvas
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, backgroundWidth, backgroundHeight);

        // Setup fill style
        if (backgroundLightIntensity > 0) {
            let gradient = ctx.createLinearGradient(0, 0, backgroundWidth, backgroundHeight);
            gradient.addColorStop(0, mix(less.color("fff"), less.color(backgroundColor.substr(1)), { value: 40 }).toCSS());
            gradient.addColorStop(backgroundLightIntensity / 100, backgroundColor);
            ctx.fillStyle = gradient;
        }
        else {
            ctx.fillStyle = backgroundColor;
        }

        // Set up shadow        
        if (backgroundShadowSize > 0) {
            ctx.shadowColor = backgroundShadowColor;
            ctx.shadowBlur = backgroundShadowSize;
        }

        // Border radius
        if (backgroundBorderRadius > 0) {
            Renderer.roundRect(ctx, 0 + backgroundShadowSize, 0 + backgroundShadowSize, backgroundWidth - (2 * backgroundShadowSize), backgroundHeight - (2 * backgroundShadowSize), backgroundBorderRadius, !isBackgroundTransparent, false);
            ctx.clip();
        }
        else {
            Renderer.roundRect(ctx, 0 + backgroundShadowSize, 0 + backgroundShadowSize, backgroundWidth - (2 * backgroundShadowSize), backgroundHeight - (2 * backgroundShadowSize), {}, !isBackgroundTransparent, false);
            ctx.clip();
        }

        // Clear shadow
        ctx.shadowBlur = 0;
    };

    //#endregion


    //#region [ Methods : Static ]

    /**
     * Factory method.
     *
     * @param {object} params Parameters.
     * @param {object} componentInfo Component into.
     * @returns {object} Instance of the model.
     */
    Renderer.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new Renderer(params);
    };


    /**
     * Draws a rounded rectangle using the current state of the canvas.
     * If you omit the last three params, it will draw a rectangle
     * outline with a 5 pixel border radius
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} x The top left x coordinate
     * @param {Number} y The top left y coordinate
     * @param {Number} width The width of the rectangle
     * @param {Number} height The height of the rectangle
     * @param {Number} [radius = 5] The corner radius; It can also be an object 
     *                 to specify different radii for corners
     * @param {Number} [radius.tl = 0] Top left
     * @param {Number} [radius.tr = 0] Top right
     * @param {Number} [radius.br = 0] Bottom right
     * @param {Number} [radius.bl = 0] Bottom left
     * @param {Boolean} [fill = false] Whether to fill the rectangle.
     * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
     */
    Renderer.roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === "undefined") {
            stroke = true;
        }

        if (typeof radius === "undefined") {
            radius = 5;
        }

        if (typeof radius === "number") {
            radius = {
                tl: radius,
                tr: radius,
                br: radius,
                bl: radius
            };
        } 
        else {
            let defaultRadius = {
                tl: 0,
                tr: 0,
                br: 0,
                bl: 0
            };

            for (let side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }

        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();

        if (fill) {
            ctx.fill();
        }
        
        if (stroke) {
            ctx.stroke();
        }
    };

    //#endregion


    return {
        viewModel: { 
            createViewModel: Renderer.createViewModel 
        },
        template: view
    };
});