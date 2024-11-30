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

        this.shareCallback = args.shareCallback;
        this.downloadCallback = args.downloadCallback;
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Shares the logo as link.
     */
    Toolbar.prototype.share = function () {
        let share = this.shareCallback;

        if (typeof (share) !== "function") {
            console.warn(`Toolbar : share() : Missing 'shareCallback'.`);
            return;
        }

        share();
    };


    /**
     * Downloads the logo as an png image.
     */
    Toolbar.prototype.download = function () {
        let download = this.downloadCallback;

        if (typeof (download) !== "function") {
            console.warn(`Toolbar : download() : Missing 'downloadCallback'.`);
            return;
        }

        download();
    };


    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Toolbar.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
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