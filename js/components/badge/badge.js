define([
    "text!./badge.html",
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
    let Badge = function (args = {}) {
        console.debug("Badge()");

        this.color = ko.isObservable(args.color) ? args.color : ko.observable(Logo.BADGE_COLOR);
        this.backgroundColor = ko.isObservable(args.backgroundColor) ? args.backgroundColor : ko.observable(Logo.BADGE_BACKGROUND_COLOR);
        this.text = ko.isObservable(args.text) ? args.text : ko.observable(Logo.BADGE_TEXT);
        this.font = ko.isObservable(args.font) ? args.font : ko.observable(Logo.BADGE_FONT);
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Badge.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        root.querySelectorAll(".mdc-text-field").forEach((n) => new mdc.textField.MDCTextField(n));
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    Badge.prototype.dispose = function () {
        console.debug("~Badge()");
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
    Badge.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new Badge(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: Badge.createViewModel 
        },
        template: view
    };
});