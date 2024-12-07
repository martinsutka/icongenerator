define([
    "text!./guidinglines.html",
    "css!./guidinglines.css",
    "knockout",
    "msu/models/Logo"
], (view, css, ko, Logo) => {
    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let GuidingLines = function (args = {}) {
        console.debug("GuidingLines()");

        this.isVisible = ko.isObservable(args.isVisible) ? args.isVisible : ko.observable(Logo.SHOW_GUIDING_LINES);
        this.size = ko.isObservable(args.size) ? args.size : ko.observable(Logo.GUIDES_SIZE);
        this.iconSize = ko.isObservable(args.iconSize) ? args.iconSize : ko.observable(Logo.ICON_SIZE);
        this.backgroundWidth = ko.isObservable(args.backgroundWidth) ? args.backgroundWidth : ko.observable(Logo.BACKGROUND_WIDTH);
        this.backgroundHeight = ko.isObservable(args.backgroundHeight) ? args.backgroundHeight : ko.observable(Logo.BACKGROUND_HEIGHT);
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    GuidingLines.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    GuidingLines.prototype.dispose = function () {
        console.debug("~GuidingLines()");
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
    GuidingLines.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new GuidingLines(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: GuidingLines.createViewModel 
        },
        template: view
    };
});