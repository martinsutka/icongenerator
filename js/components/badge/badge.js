define([
    "text!./badge.html",
    "knockout",
    "material-components-web"
], (view, ko, mdc) => {
    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let Badge = function (args = {}) {
        console.debug("Badge()");

        this.color = ko.isObservable(args.color) ? args.color : ko.observable("#ffffff");
        this.backgroundColor = ko.isObservable(args.backgroundColor) ? args.backgroundColor : ko.observable("#2196f3");
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
        root.querySelectorAll(".mdc-text-field").forEach((n) => mdc.textField.MDCTextField.attachTo(n));
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