define([
    "text!./templateselector.html",
    "knockout",
    "module",
    "material-components-web"
], (view, ko, module, mdc) => {
    //#region [ Fields ]
    
    const cnf = module.config();
    
    //#endregion
    
    
    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let TemplateSelector = function (args = {}) {
        console.debug("TemplateSelector()");

        this.items = cnf.items || [];
        this.selected = ko.observable();
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    TemplateSelector.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        const component = new mdc.textField.MDCTextField(root);
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    TemplateSelector.prototype.dispose = function () {
        console.debug("~TemplateSelector()");
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
    TemplateSelector.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new TemplateSelector(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: TemplateSelector.createViewModel 
        },
        template: view
    };
});