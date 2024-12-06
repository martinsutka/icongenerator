define([
    "text!./icon.html",
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
    let Icon = function (args = {}) {
        console.debug("Icon()");

        this.showGuidingLines = ko.isObservable(args.showGuidingLines) ? args.showGuidingLines : ko.observable(Logo.SHOW_GUIDING_LINES);
        this.color = ko.isObservable(args.color) ? args.color : ko.observable("#ffffff");
        this.size = ko.isObservable(args.size) ? args.size : ko.observable(280);
        this.shadowColor = ko.isObservable(args.shadowColor) ? args.shadowColor : ko.observable("#000000");
        this.shadowSize = ko.isObservable(args.shadowSize) ? args.shadowSize : ko.observable(160);
        this.shadowIntensity = ko.isObservable(args.shadowIntensity) ? args.shadowIntensity : ko.observable(15);
        this.svg = ko.isObservable(args.svg) ? args.svg : ko.observable("");
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Icon.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        root.querySelectorAll(".mdc-text-field").forEach((n) => new mdc.textField.MDCTextField(n));
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    Icon.prototype.dispose = function () {
        console.debug("~Icon()");
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
    Icon.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new Icon(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: Icon.createViewModel 
        },
        template: view
    };
});