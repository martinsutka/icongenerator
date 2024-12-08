define([
    "knockout", 
    "module",
    "material-components-web",
    "lzutf8",
    "msu/models/Logo",
    "msu/bindings/datavalue",
    "msu/bindings/autoselect",
    "msu/polyfills/canvas.textPath"
], (ko, module, mdc, lz, Logo) => {
    //#region [ Fields ]

    const global = (function () { return this; })();
    const doc = global.document;

    //#endregion


    //#region [ Component registration ]

    ko.components.register("msu-toolbar", { require: "msu/components/toolbar/toolbar" });
    ko.components.register("msu-tabs", { require: "msu/components/tabs/tabs" });
    ko.components.register("msu-icon", { require: "msu/components/icon/icon" });
    ko.components.register("msu-guides", { require: "msu/components/guides/guides" });
    ko.components.register("msu-background", { require: "msu/components/background/background" });
    ko.components.register("msu-badge", { require: "msu/components/badge/badge" });
    ko.components.register("msu-renderer", { require: "msu/components/renderer/renderer" });
    ko.components.register("msu-templateselector", { require: "msu/components/templateselector/templateselector" });
    ko.components.register("msu-tools", { require: "msu/components/tools/tools" });
    ko.components.register("msu-guidinglines", { require: "msu/components/guidinglines/guidinglines" });

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
        let logo = global.logo = new Logo(options);

        // Parse url if needed
        const hash = global.location.hash.substr(1);
        if (hash) {
            try {
                const query = new URLSearchParams(lz.decompress(hash, { inputEncoding: "Base64", outputEncoding: "String" }));
                const title = query.get("title");
                const json = JSON.parse(query.get("json"));
                logo = global.logo = new Logo(json);
            }
            catch(err) {
                console.error("IconGenerator : ready() : ", err);
            }
        }

        ko.applyBindings(logo, doc.body, (context) => {
            //context.router = router;
        });
    });

    //#endregion
});