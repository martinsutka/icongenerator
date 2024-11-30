define([
    "text!./todo.html",
    "css!./todo.css",
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
    let Todo = function (args = {}) {
        console.debug("Todo()");
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Todo.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        //this.drawer = mdc.drawer.MDCDrawer.attachTo(root.querySelector(".mdc-drawer"));
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    Todo.prototype.dispose = function () {
        console.debug("~Todo()");
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
    Todo.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new Todo(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: Todo.createViewModel 
        },
        template: view
    };
});