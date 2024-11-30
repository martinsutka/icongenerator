define([
    "text!./tabs.html",
    "css!./tabs.css",
    "module",
    "knockout",
    "material-components-web"
], (view, css, module, ko, mdc) => {
    //#region [ Fields ]

    const cnf = module.config();
    
    //#endregion
    

    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let Tabs = function (args = {}) {
        console.debug("Tabs()");

        this.items = cnf.items;
        this.tabBar = null;
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Tabs.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        
        this.tabBar = new mdc.tabBar.MDCTabBar(root);
        this.tabBar.activateTab(0);

        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    Tabs.prototype.dispose = function () {
        console.debug("~Tabs()");
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
    Tabs.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new Tabs(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: Tabs.createViewModel 
        },
        template: view
    };
});