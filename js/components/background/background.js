define([
    "text!./background.html",
    "knockout",
    "material-components-web",
    "msu/models/Logo"
], (view, ko, mdc, Logo) => {
    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let Background = function (args = {}) {
        console.debug("Background()");

        this.isTransparent = ko.isObservable(args.isTransparent) ? args.isTransparent : ko.observable(Logo.IS_BACKGROUND_TRANSPARENT);
        this.width = ko.isObservable(args.width) ? args.width : ko.observable(Logo.BACKGROUND_WIDTH);
        this.height = ko.isObservable(args.height) ? args.height : ko.observable(Logo.BACKGROUND_HEIGHT);
        this.color = ko.isObservable(args.color) ? args.color : ko.observable(Logo.BACKGROUND_COLOR);
        this.lightColor = ko.isObservable(args.lightColor) ? args.lightColor : ko.observable(Logo.BACKGROUND_LIGHT_COLOR);
        this.lightIntensity = ko.isObservable(args.lightIntensity) ? args.lightIntensity : ko.observable(Logo.BACKGROUND_LIGHT_INTENSITY);
        this.shadowColor = ko.isObservable(args.shadowColor) ? args.shadowColor : ko.observable(Logo.BACKGROUND_SHADOW_COLOR);
        this.shadowSize = ko.isObservable(args.shadowSize) ? args.shadowSize : ko.observable(Logo.BACKGROUND_SHADOW_SIZE);
        this.borderRadius = ko.isObservable(args.borderRadius) ? args.borderRadius : ko.observable(Logo.BACKGROUND_BORDER_RADIUS);
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Background.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        root.querySelectorAll(".mdc-text-field").forEach((n) => new mdc.textField.MDCTextField(n));
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    Background.prototype.dispose = function () {
        console.debug("~Background()");
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
    Background.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new Background(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: Background.createViewModel 
        },
        template: view
    };
});