define([
    "text!./tabs.html",
    "knockout",
    "material-components-web"
], (view, ko, mdc) => {
    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let Tabs = function (args = {}) {
        console.debug("Tabs()");

        this.items = [ "Icon", "Background", "Badge" ];
        this.tab = ko.isObservable(args.tab) ? args.tab : ko.observable(0);
        this.tabBar = null;
        this._tabOnChangeSubscribe = null;
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
        node.replaceWith(root);
        
        this._tabOnChangeSubscribe = this.tab.subscribe(this._tabOnChange, this);
        this._tabOnChange(this.tab());
    };


    /**
     * Dispose.
     */
    Tabs.prototype.dispose = function () {
        console.debug("~Tabs()");

        this._tabOnChangeSubscribe.dispose();
    };

    //#endregion


    //#region [ Methods : Private ]

    /**
     * Event handler for the current tab change event.
     * 
     * @param {number} value Index of the current tab.
     */
    Tabs.prototype._tabOnChange = function(value) {
        this.tabBar.activateTab(value);
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