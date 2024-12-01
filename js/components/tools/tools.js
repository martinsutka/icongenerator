define([
    "text!./tools.html",
    "knockout",
    "material-components-web"
], (view, ko, mdc) => {
    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let Tools = function (args = {}) {
        console.debug("Tools()");
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Tools.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    Tools.prototype.dispose = function () {
        console.debug("~Tools()");
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
    Tools.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new Tools(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: Tools.createViewModel 
        },
        template: view
    };
});