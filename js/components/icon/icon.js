﻿define([
    "text!./icon.html",
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
    let Icon = function (args = {}) {
        console.debug("Icon()");

        this.size = ko.isObservable(args.size) ? args.size : ko.observable(Logo.ICON_SIZE);
        this.x = ko.isObservable(args.x) ? args.x : ko.observable(Logo.ICON_X);
        this.y = ko.isObservable(args.y) ? args.y : ko.observable(Logo.ICON_Y);
        this.color = ko.isObservable(args.color) ? args.color : ko.observable(Logo.ICON_COLOR);
        this.shadowColor = ko.isObservable(args.shadowColor) ? args.shadowColor : ko.observable(Logo.ICON_SHADOW_COLOR);
        this.shadowSize = ko.isObservable(args.shadowSize) ? args.shadowSize : ko.observable(Logo.ICON_SHADOW_SIZE);
        this.shadowIntensity = ko.isObservable(args.shadowIntensity) ? args.shadowIntensity : ko.observable(Logo.ICON_SHADOW_INTENSITY);
        this.svg = ko.isObservable(args.svg) ? args.svg : ko.observable(Logo.ICON_SVG);
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Direct method to receive a descendantsComplete notification.
     * Knockout will call it with the component’s node once all descendants are bound.
     * 
     * @param {element} node Html element. 
     */
    Icon.prototype.koDescendantsComplete = function (node) {
        const root = node.firstElementChild;
        root.querySelectorAll(".mdc-text-field").forEach((n) => new mdc.textField.MDCTextField(n));
        node.replaceWith(root);
    };


    /**
     * Dispose.
     */
    Icon.prototype.dispose = function () {
        console.debug("~Icon()");
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
    Icon.createViewModel = function (params, componentInfo) {
        params = params || {};
        params.element = componentInfo.element.querySelector ? componentInfo.element : componentInfo.element.parentElement || componentInfo.element.parentNode;

        return new Icon(params);
    };

    //#endregion

    return {
        viewModel: { 
            createViewModel: Icon.createViewModel 
        },
        template: view
    };
});