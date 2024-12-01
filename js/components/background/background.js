define([
    "text!./background.html",
    "knockout",
    "material-components-web"
], (view, ko, mdc) => {
    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let Background = function (args = {}) {
        console.debug("Background()");

        this.isTransparent = ko.isObservable(args.isTransparent) ? args.isTransparent : ko.observable(false);
        this.color = ko.isObservable(args.color) ? args.color : ko.observable("#212121");
        this.lightIntensity = ko.isObservable(args.lightIntensity) ? args.lightIntensity : ko.observable(0);
        this.shadowColor = ko.isObservable(args.shadowColor) ? args.shadowColor : ko.observable("#000000");
        this.shadowSize = ko.isObservable(args.shadowSize) ? args.shadowSize : ko.observable(0);
        this.borderRadius = ko.isObservable(args.borderRadius) ? args.borderRadius : ko.observable(0);
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
        root.querySelectorAll(".mdc-text-field").forEach((n) => mdc.textField.MDCTextField.attachTo(n));
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