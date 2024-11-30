define([
    "knockout",
    "msu/utils"
], (ko, utils) => {
    //#region [ Constructor ]

    /**
	 * Constructor.
	 *
	 * @param {object} args Arguments.
	 */
    let Logo = function (args = {}) {
        console.debug("Logo()");

        this.version = args.version || "";
        this.iconSize = utils.parseInt(args, "iconSize", 280);
        this.iconColor = (args.iconColor || "").length === 7 ? ko.observable(args.iconColor) : ko.observable("#ffffff");
    };

    //#endregion


    //#region [ Methods : Public ]

    /**
     * Shares the logo as link.
     */
    Logo.prototype.share = function () {
        console.warn("share %o", this);
    };


    /**
     * Downloads the logo as an png image.
     */
    Logo.prototype.download = function () {
        console.warn("download %o", this);
    };

    //#endregion


    //#region [ Methods : Static ]
    //#endregion

    return Logo;
});