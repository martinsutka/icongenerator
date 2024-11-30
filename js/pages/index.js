define([
    "knockout", 
    "module",
    "msu/models/Logo"
], (ko, module, Logo) => {
    //#region [ Fields ]

    const global = (function () { return this; })();
    const doc = global.document;

    //#endregion


    //#region [ Component registration ]

    ko.components.register("msu-toolbar", { require: "msu/components/toolbar/toolbar" });

    //#endregion


    //#region [ Methods ]

    /**
     * Fires function when DOM is ready.
     *
     * @param {function} fn Function.
     */
    const ready = (fn) => {
        if (doc.attachEvent ? (doc.readyState === "complete") : (doc.readyState !== "loading")) {
            fn();
            return;
        }

        doc.addEventListener("DOMContentLoaded", fn);
    };

    //#endregion


    //#region [ Start ]

    ready(() => {
        const options = global.structuredClone(module.config());
        const logo = global.logo = new Logo(options);

        ko.applyBindings(logo, doc.body, (context) => {
            //context.router = router;
        });
    });

    //#endregion
});