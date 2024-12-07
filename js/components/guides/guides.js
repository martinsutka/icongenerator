define([
    "text!./guides.html",
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
    let Guides = function (args = {}) {
        console.debug("Guides()");

        this.areVisible = ko.isObservable(args.areVisible) ? args.areVisible : ko.observable(Logo.SHOW_GUIDES);
        this.size = ko.isObservable(args.size) ? args.size : ko.observable(Logo.GUIDES_SIZE);
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Guides.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        root.querySelectorAll(".mdc-text-field").forEach((n) => new mdc.textField.MDCTextField(n));
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    Guides.prototype.dispose = function () {
        console.debug("~Guides()");
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
    Guides.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new Guides(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: Guides.createViewModel 
        },
        template: view
    };
});