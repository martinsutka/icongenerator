define([
    "text!./renderer.html",
    "css!./renderer.css",
    "knockout",
    "material-components-web",
    "less",
    "msu/models/Logo"
], (view, css, ko, mdc, less, Logo) => {
    //#region [ Fields ]
    
    const global = (function() { return this; })();
    
    //#endregion


    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let Renderer = function (args = {}) {
        console.debug("Renderer()");

        this.canvas = ko.observable(null);

        this.iconSize = ko.isObservable(args.iconSize) ? args.iconSize : ko.observable(Logo.ICON_SIZE);
        this.iconColor = ko.isObservable(args.iconColor) ? args.iconColor : ko.observable(Logo.ICON_COLOR);
        this.iconShadowColor = ko.isObservable(args.iconShadowColor) ? args.iconShadowColor : ko.observable(Logo.ICON_SHADOW_COLOR);
        this.iconShadowSize = ko.isObservable(args.iconShadowSize) ? args.iconShadowSize : ko.observable(Logo.ICON_SHADOW_SIZE);
        this.iconShadowIntensity = ko.isObservable(args.iconShadowIntensity) ? args.iconShadowIntensity : ko.observable(Logo.ICON_SHADOW_INTENSITY);
        this.iconSvg = ko.isObservable(args.iconSvg) ? args.iconSvg : ko.observable(Logo.ICON_SVG);
        
        this.isBackgroundTransparent = ko.isObservable(args.isBackgroundTransparent) ? args.isBackgroundTransparent : ko.observable(Logo.IS_BACKGROUND_TRANSPARENT);
        this.backgroundWidth = ko.isObservable(args.backgroundWidth) ? args.backgroundWidth : ko.observable(Logo.BACKGROUND_WIDTH);
        this.backgroundHeight = ko.isObservable(args.backgroundHeight) ? args.backgroundHeight : ko.observable(Logo.BACKGROUND_HEIGHT);
        this.backgroundColor = ko.isObservable(args.backgroundColor) ? args.backgroundColor : ko.observable(Logo.BACKGROUND_COLOR);
        this.backgroundLightColor = ko.isObservable(args.backgroundLightColor) ? args.backgroundLightColor : ko.observable(Logo.BACKGROUND_LIGHT_COLOR);
        this.backgroundLightIntensity = ko.isObservable(args.backgroundLightIntensity) ? args.backgroundLightIntensity : ko.observable(Logo.BACKGROUND_LIGHT_INTENSITY);
        this.backgroundShadowColor = ko.isObservable(args.backgroundShadowColor) ? args.backgroundShadowColor : ko.observable(Logo.BACKGROUND_SHADOW_COLOR);
        this.backgroundShadowSize = ko.isObservable(args.backgroundShadowSize) ? args.backgroundShadowSize : ko.observable(Logo.BACKGROUND_SHADOW_SIZE);
        this.backgroundBorderRadius = ko.isObservable(args.backgroundBorderRadius) ? args.backgroundBorderRadius : ko.observable(Logo.BACKGROUND_BORDER_RADIUS);

        this.badgeColor = ko.isObservable(args.badgeColor) ? args.badgeColor : ko.observable(Logo.BADGE_COLOR);
        this.badgeBackgroundColor = ko.isObservable(args.badgeBackgroundColor) ? args.badgeBackgroundColor : ko.observable(Logo.BADGE_BACKGROUND_COLOR);
        this.badgeText = ko.isObservable(args.badgeText) ? args.badgeText : ko.observable(Logo.BADGE_TEXT);
        this.badgeFont = ko.isObservable(args.badgeFont) ? args.badgeFont : ko.observable(Logo.BADGE_FONT);
        this.badgeSize = ko.isObservable(args.badgeSize) ? args.badgeSize : ko.observable(Logo.BADGE_SIZE);

        this._onRenderSubscribe = ko.computed(this._onRender, this).extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" }});
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

        const iconSize = parseInt(this.iconSize());
        const iconColor = this.iconColor();
        const iconShadowColor = this.iconShadowColor();
        const iconShadowSize = parseInt(this.iconShadowSize());
        const iconShadowIntensity = parseInt(this.iconShadowIntensity());
        const iconSvg = this.iconSvg();

        const isBackgroundTransparent = this.isBackgroundTransparent();
        const backgroundWidth = parseInt(this.backgroundWidth());
        const backgroundHeight = parseInt(this.backgroundHeight());
        const backgroundColor = this.backgroundColor();
        const backgroundLightColor = this.backgroundLightColor();
        const backgroundLightIntensity = parseInt(this.backgroundLightIntensity());
        const backgroundShadowColor = this.backgroundShadowColor();
        const backgroundShadowSize = parseInt(this.backgroundShadowSize());
        const backgroundBorderRadius = parseInt(this.backgroundBorderRadius());
        
        const badgeColor = this.badgeColor();
        const badgeBackgroundColor = this.badgeBackgroundColor();
        const badgeText = this.badgeText();
        const badgeFont = this.badgeFont();
        const badgeSize = parseInt(this.badgeSize());

        if (!canvas) {
            return;
        }

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
            gradient.addColorStop(0, mix(less.color(backgroundLightColor.substr(1)), less.color(backgroundColor.substr(1)), { value: 50 }).toCSS());
            gradient.addColorStop(backgroundLightIntensity / 100, backgroundColor);
            ctx.fillStyle = gradient;
        }
        else {
            ctx.fillStyle = backgroundColor;
        }

        // Set shadow        
        if (backgroundShadowSize > 0) {
            ctx.shadowColor = backgroundShadowColor;
            ctx.shadowBlur = backgroundShadowSize;
        }

        // Draw background
        Renderer.roundRect(ctx, 0 + backgroundShadowSize, 0 + backgroundShadowSize, backgroundWidth - (2 * backgroundShadowSize), backgroundHeight - (2 * backgroundShadowSize), backgroundBorderRadius > 0 ? backgroundBorderRadius : {}, !isBackgroundTransparent, false);
        ctx.clip();

        // Clear shadow
        ctx.shadowBlur = 0;

        // Badge must be rendered in the end
        let badgePromise = Promise.resolve();

        // Render svg
        let iconSvgNode = new DOMParser().parseFromString(iconSvg, "text/html").querySelector("svg");
        if (iconSvgNode) {
            // Set size
            iconSvgNode.setAttribute("width", `${iconSize}px`);
            iconSvgNode.setAttribute("height", `${iconSize}px`);

            // Remove default fill color
            iconSvgNode.querySelectorAll("[fill='currentColor']").forEach((el) => el.removeAttribute("fill"));

            // Remove none fill color
            iconSvgNode.querySelectorAll("g[fill='none']").forEach((el) => el.removeAttribute("fill"));

            // Prepare images for rendering
            const images = [];

            // Draw shadow
            if (iconShadowSize > 0) {
                // Calculate shadow filter
                const colorTo = isBackgroundTransparent ? less.color("ffffff", 0) : less.color(backgroundColor.substr(1));
                const colorFrom = mix(less.color(iconShadowColor.substr(1)), colorTo, { value: iconShadowIntensity });

                let length = iconShadowSize;
                let total = length;
                let amount = null;
                let mixed = null;
                let result = [];

                while (length > 1) {
                    amount = 100 - ((length / total) * 100);
                    mixed = mix(colorFrom, colorTo, { value: amount });
                    result.unshift(mixed.toCSS());
                    length--;
                }
                result.unshift(colorFrom.toCSS());
                
                for(var i = result.length - 1; i >= 0; i--) {
                    images.unshift(new Promise((function (width, height, size, i, svg, result, global, resolve) {
                        svg.style.fill = result[i];
                        let svgUrl = global.URL.createObjectURL(new Blob([ svg.outerHTML ], { type: "image/svg+xml;charset=utf-8" }))

                        let img = new Image();
                        img.onload = (function (width, height, size, i, url) {
                            global.URL.revokeObjectURL(url);
                            resolve({
                                img: this,
                                x: ((width - size) / 2) + i + 1,
                                y: ((height - size) / 2)  + i + 1
                            });
                        }).bind(img, width, height, size, i, svgUrl);
                        
                        img.src = svgUrl;
                    }).bind(this, backgroundWidth, backgroundHeight, iconSize, i, iconSvgNode, result, global)));
                }
            }

            // Draw svg itself
            images.unshift(new Promise((resolve) => {
                iconSvgNode.style.fill = iconColor;
                let iconSvgUrl = global.URL.createObjectURL(new Blob([ iconSvgNode.outerHTML ], { type: "image/svg+xml;charset=utf-8" }))

                let img = new Image();
                img.onload = (function (width, height, size, url) {
                    global.URL.revokeObjectURL(url);
                    resolve({
                        img: this,
                        x: (width - size) / 2,
                        y: (height - size) / 2
                    });
                }).bind(img, backgroundWidth, backgroundHeight, iconSize, iconSvgUrl);
                img.src = iconSvgUrl;
            }));

            // Wait until all images are rendered
            badgePromise = Promise.all(images)
                .then((images) => images.reverse().forEach((i) => ctx.drawImage(i.img, i.x, i.y)))
                .catch(console.error);
        }

        // Render badge
        if (badgeText) {
            badgePromise.then(() => {
                ctx.fillStyle = badgeBackgroundColor;
                Renderer.roundRect(ctx, 0, backgroundHeight - backgroundShadowSize - badgeSize, backgroundWidth, badgeSize, {}, true, false);

                ctx.lineWidth = 0.01;
                ctx.font = badgeFont;
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillStyle = badgeColor;
                ctx.textPath(badgeText, [0, backgroundHeight - backgroundShadowSize - (badgeSize / 2), backgroundWidth - backgroundShadowSize, backgroundHeight - backgroundShadowSize - (badgeSize / 2)]);
            });
        }
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