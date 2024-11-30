define([
    "knockout"
], (ko) => {
    //#region [ Fields ]

    const global = (function () { return this; })();

    //#endregion


    //#region [ Methods ]
    
    /**
     * Parses the property to integer and returns it as knockout observable.
     * 
     * @param {object} ojb Object which contains configuration options.
     * @param {string} key Property name.
     * @param {any} def Default value.
     * 
     * @returns Knockout observable.
     */
    const parseInt = function(ojb, key, def = 0) {
        return (global.parseInt(ojb[key]) === ojb[key]) && (ojb[key] > 0) ? ko.observable(ojb[key]) : ko.observable(def);
    };


    /**
     * Parses the property to boolean and returns it as knockout observable.
     * 
     * @param {object} ojb Object which contains configuration options.
     * @param {string} key Property name.
     * @param {any} def Default value.
     * 
     * @returns Knockout observable.
     */
    const parseBool = function(ojb, key, def = false) {
        return (typeof(ojb[key]) === "boolean") ? ko.observable(ojb[key]) : 
               (ojb[key] === "true") ? ko.observable(true) :
               (ojb[key] === "false") ? ko.observable(false) :
               ko.observable(def);
    };
    
    //#endregion

    return {
        parseInt,
        parseBool
    };
});