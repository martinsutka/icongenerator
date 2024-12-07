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
        this.guidesSize = utils.parseInt(args, "guidesSize", Logo.GUIDES_SIZE = 200);

        this.iconSize = utils.parseInt(args, "iconSize", Logo.ICON_SIZE);
        this.iconX = utils.parseInt(args, "iconX", Logo.ICON_X);
        this.iconY = utils.parseInt(args, "iconY", Logo.ICON_Y);
        this.iconColor = (args.iconColor || "").length === 7 ? ko.observable(args.iconColor) : ko.observable(Logo.ICON_COLOR);
        this.iconShadowColor = (args.iconShadowColor || "").length === 7 ? ko.observable(args.iconShadowColor) : ko.observable(Logo.ICON_SHADOW_COLOR);
        this.iconShadowSize = utils.parseInt(args, "iconShadowSize", Logo.ICON_SHADOW_SIZE);
        this.iconShadowIntensity = utils.parseInt(args, "iconShadowIntensity", Logo.ICON_SHADOW_INTENSITY);
        this.iconSvg = (args.iconSvg || "").length > 0 ? ko.observable(args.iconSvg) : ko.observable(Logo.ICON_SVG);

        this.isBackgroundTransparent = utils.parseBool(args, "isBackgroundTransparent", Logo.IS_BACKGROUND_TRANSPARENT);
        this.backgroundWidth = utils.parseInt(args, "backgroundWidth", Logo.BACKGROUND_WIDTH);
        this.backgroundHeight = utils.parseInt(args, "backgroundHeight", Logo.BACKGROUND_HEIGHT);
        this.backgroundColor = (args.backgroundColor || "").length === 7 ? ko.observable(args.backgroundColor) : ko.observable(Logo.BACKGROUND_COLOR);
        this.backgroundLightColor = (args.backgroundLightColor || "").length === 7 ? ko.observable(args.backgroundLightColor) : ko.observable(Logo.BACKGROUND_LIGHT_COLOR);
        this.backgroundLightIntensity = utils.parseInt(args, "backgroundLightIntensity", Logo.BACKGROUND_LIGHT_INTENSITY);
        this.backgroundShadowColor = (args.backgroundShadowColor || "").length === 7 ? ko.observable(args.backgroundShadowColor) : ko.observable(Logo.BACKGROUND_SHADOW_COLOR);
        this.backgroundShadowSize = utils.parseInt(args, "backgroundShadowSize", Logo.BACKGROUND_SHADOW_SIZE);
        this.backgroundBorderRadius = utils.parseInt(args, "backgroundBorderRadius", Logo.BACKGROUND_BORDER_RADIUS);
        
        this.badgeColor = (args.badgeColor || "").length === 7 ? ko.observable(args.badgeColor) : ko.observable(Logo.BADGE_COLOR);
        this.badgeBackgroundColor = (args.badgeBackgroundColor || "").length === 7 ? ko.observable(args.badgeBackgroundColor) : ko.observable(Logo.BADGE_BACKGROUND_COLOR);
        this.badgeText = (args.badgeText || "").length ? ko.observable(args.badgeText) : ko.observable(Logo.BADGE_TEXT);
        this.badgeFont = (args.badgeFont || "").length ? ko.observable(args.badgeFont) : ko.observable(Logo.BADGE_FONT);
        this.badgeSize = utils.parseInt(args, "badgeSize", Logo.BADGE_SIZE);

        this.renderer = {
            downloadAction: ko.observable()
        };
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
        const action = this.renderer.downloadAction();
        if (typeof (action) !== "function") {
            console.error("Logo : download() : Renderer download action is not defined.");
            return;
        }
        action();
    };


    /**
     * Converts input JSON object and applies all its properties to the current logo instance.
     * 
     * @param {object} obj Logo representation.
     */
    Logo.prototype.fromJson = function(obj = {}) {
        Object.keys(obj).forEach((property) => {
            if (!ko.isObservable(this[property])) {
                return;
            }

            console.debug(`Setting ${property} to value '${obj[property]}'.`);
            this[property](obj[property]);
        });
    };


    /**
     * Converts current logo representation to json.
     */
    Logo.prototype.toJson = function() {
        return {
            showGuidingLines: this.showGuidingLines(),
            guidesSize: this.guidesSize(),
            iconSize: this.iconSize(),
            iconX: this.iconX(),
            iconY: this.iconY(),
            iconColor: this.iconColor(),
            iconShadowColor: this.iconShadowColor(),
            iconShadowSize: this.iconShadowSize(),
            iconShadowIntensity: this.iconShadowIntensity(),
            iconSvg: this.iconSvg(),
            isBackgroundTransparent: this.isBackgroundTransparent(),
            backgroundWidth: this.backgroundWidth(),
            backgroundHeight: this.backgroundHeight(),
            backgroundColor: this.backgroundColor(),
            backgroundLightColor: this.backgroundLightColor(),
            backgroundLightIntensity: this.backgroundLightIntensity(),
            backgroundShadowColor: this.backgroundShadowColor(),
            backgroundShadowSize: this.backgroundShadowSize(),
            backgroundBorderRadius: this.backgroundBorderRadius(),            
            badgeColor: this.badgeColor(),
            badgeBackgroundColor: this.badgeBackgroundColor(),
            badgeText: this.badgeText(),
            badgeFont: this.badgeFont(),
            badgeSize: this.badgeSize()
        };
    };

    //#endregion


    //#region [ Methods : Static ]

    Logo.SHOW_GUIDING_LINES = false;
    Logo.GUIDES_SIZE = 200;
    Logo.ICON_SIZE = 240;
    Logo.ICON_X = 0;
    Logo.ICON_Y = 0;
    Logo.ICON_COLOR = "#ffffff";
    Logo.ICON_SHADOW_COLOR = "#000000";
    Logo.ICON_SHADOW_SIZE = 160;
    Logo.ICON_SHADOW_INTENSITY = 15;
    Logo.ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2M7 9.5C7 8.7 7.7 8 8.5 8s1.5.7 1.5 1.5S9.3 11 8.5 11S7 10.3 7 9.5m5 7.73c-1.75 0-3.29-.73-4.19-1.81L9.23 14c.45.72 1.52 1.23 2.77 1.23s2.32-.51 2.77-1.23l1.42 1.42c-.9 1.08-2.44 1.81-4.19 1.81M15.5 11c-.8 0-1.5-.7-1.5-1.5S14.7 8 15.5 8s1.5.7 1.5 1.5s-.7 1.5-1.5 1.5"/></svg>';
    Logo.IS_BACKGROUND_TRANSPARENT = false;
    Logo.BACKGROUND_WIDTH = 380;
    Logo.BACKGROUND_HEIGHT = 380;
    Logo.BACKGROUND_COLOR = "#465981";
    Logo.BACKGROUND_LIGHT_COLOR = "#ffffff";
    Logo.BACKGROUND_LIGHT_INTENSITY = 0;
    Logo.BACKGROUND_SHADOW_COLOR = "#000000";
    Logo.BACKGROUND_SHADOW_SIZE = 0;
    Logo.BACKGROUND_BORDER_RADIUS = 0;
    Logo.BADGE_COLOR = "#ffffff";
    Logo.BADGE_BACKGROUND_COLOR = "#fe655c";
    Logo.BADGE_TEXT = "";
    Logo.BADGE_FONT = "700 30px Arial";
    Logo.BADGE_SIZE = 80;

    //#endregion

    return Logo;
});