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
        this.logo = args.logo;

        this._selectedOnChangeSubscribe = null;
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

        this._selectedOnChangeSubscribe = this.selected.subscribe(this._selectedOnChange, this);
    };


    /**
     * Dispose.
     */
    TemplateSelector.prototype.dispose = function () {
        console.debug("~TemplateSelector()");

        this._selectedOnChangeSubscribe.dispose();
    };

    //#endregion


    //#region [ Methods : Private ]

    /**
     * Event handler for the selected item change event.
     * 
     * @param {number} value Currently selected item.
     */
    TemplateSelector.prototype._selectedOnChange = function(value) {
        if (!this.logo || !value) {
            return;
        }

        const setting = cnf.settings[value - 1];

        if (!setting) {
            return;
        }

        this.logo.fromJson(setting);
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