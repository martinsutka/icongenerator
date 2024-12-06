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
        this.tab = utils.parseInt(args, "tab", 0);

        this.showGuidingLines = utils.parseBool(args, "showGuidingLines", Logo.SHOW_GUIDING_LINES);

        this.iconSize = utils.parseInt(args, "iconSize", Logo.ICON_SIZE);
        this.iconColor = (args.iconColor || "").length === 7 ? ko.observable(args.iconColor) : ko.observable(Logo.ICON_COLOR);
        this.iconShadowColor = (args.iconShadowColor || "").length === 7 ? ko.observable(args.iconShadowColor) : ko.observable(Logo.ICON_SHADOW_COLOR);
        this.iconShadowSize = utils.parseInt(args, "iconShadowSize", Logo.ICON_SHADOW_SIZE);
        this.iconShadowIntensity = utils.parseInt(args, "iconShadowIntensity", Logo.ICON_SHADOW_INTENSITY);
        this.iconSvg = (args.iconSvg || "").length > 0 ? ko.observable(args.iconSvg) : ko.observable(Logo.ICON_SVG);

        this.isBackgroundTransparent = utils.parseBool(args, "isBackgroundTransparent", false);
        this.backgroundWidth = utils.parseInt(args, "backgroundWidth", 380);
        this.backgroundHeight = utils.parseInt(args, "backgroundHeight", 380);
        this.backgroundColor = (args.backgroundColor || "").length === 7 ? ko.observable(args.backgroundColor) : ko.observable("#212121");
        this.backgroundLightColor = (args.backgroundLightColor || "").length === 7 ? ko.observable(args.backgroundLightColor) : ko.observable("#ffffff");
        this.backgroundLightIntensity = utils.parseInt(args, "backgroundLightIntensity", 0);
        this.backgroundShadowColor = (args.backgroundShadowColor || "").length === 7 ? ko.observable(args.backgroundShadowColor) : ko.observable("#000000");
        this.backgroundShadowSize = utils.parseInt(args, "backgroundShadowSize", 0);
        this.backgroundBorderRadius = utils.parseInt(args, "backgroundBorderRadius", 0);

        this.badgeColor = (args.badgeColor || "").length === 7 ? ko.observable(args.badgeColor) : ko.observable("#ffffff");
        this.badgeBackgroundColor = (args.badgeBackgroundColor || "").length === 7 ? ko.observable(args.badgeBackgroundColor) : ko.observable("#2196f3");
        this.badgeText = (args.badgeText || "").length ? ko.observable(args.badgeText) : ko.observable("");
        this.badgeFont = (args.badgeFont || "").length ? ko.observable(args.badgeFont) : ko.observable("700 20px Arial");
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

    Logo.SHOW_GUIDING_LINES = true;
    Logo.ICON_SIZE = 280;
    Logo.ICON_COLOR = "#ffffff";
    Logo.ICON_SHADOW_COLOR = "#000000";
    Logo.ICON_SHADOW_SIZE = 160;
    Logo.ICON_SHADOW_INTENSITY = 15;
    Logo.ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2M7 9.5C7 8.7 7.7 8 8.5 8s1.5.7 1.5 1.5S9.3 11 8.5 11S7 10.3 7 9.5m5 7.73c-1.75 0-3.29-.73-4.19-1.81L9.23 14c.45.72 1.52 1.23 2.77 1.23s2.32-.51 2.77-1.23l1.42 1.42c-.9 1.08-2.44 1.81-4.19 1.81M15.5 11c-.8 0-1.5-.7-1.5-1.5S14.7 8 15.5 8s1.5.7 1.5 1.5s-.7 1.5-1.5 1.5"/></svg>';

    //#endregion

    return Logo;
});