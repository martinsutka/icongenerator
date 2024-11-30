define([
    "text!./toolbar.html",
    "css!./toolbar.css",
    "module",
    "knockout",
    "material-components-web"
], (view, css, module, ko, mdc) => {
    //#region [ Fields ]
    
    const cnf = module.config();
    const global = (function() { return this; })();
    const doc = global.document;
    
    //#endregion


    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let Toolbar = function (args = {}) {
        console.debug("Toolbar()");
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Toolbar.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        //this.drawer = mdc.drawer.MDCDrawer.attachTo(root.querySelector(".mdc-drawer"));
        root.querySelectorAll(".mdc-button").forEach((n) => new mdc.ripple.MDCRipple(n));
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    Toolbar.prototype.dispose = function () {
        console.debug("~Toolbar()");
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
    Toolbar.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new Toolbar(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: Toolbar.createViewModel 
        },
        template: view
    };
});