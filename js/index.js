require({
    urlArgs: "v=" + (new Date()).getTime(),
    packages: [{
        name: "msu",
        location: "."
    }],
    paths: {
        "knockout": "./lib/knockout-latest",
        "text": "./lib/text",
        "css": "./lib/css.min",
        "less": "./lib/less.min",
        "material-components-web": "./lib/material-components-web.min"
    },
    map: {
        "*": {
        }
    },
    config: {
        "msu/pages/index": {
            version: "1.0.0"
        },
        "msu/components/templateselector/templateselector": {
            items: [{
                text: "Apple touch icon",
                value: 1
            }, {
                text: "Windows tile",
                value: 2
            }, {
                text: "Windows tile wide",
                value: 3
            }],
            settings: [{
                showGuides: true,
                guidesSize: 200,
                guidesX: 0,
                guidesY: 0,
                iconSize: 240,
                iconX: 0,
                iconY: 0,
                iconShadowSize: 160,
                iconShadowIntensity: 15,
                isBackgroundTransparent: false,
                backgroundWidth: 380,
                backgroundHeight: 380,
                backgroundLightIntensity: 0,
                backgroundShadowSize: 0,
                backgroundBorderRadius: 0,
                isBadgeTransparent: false,
                badgeFont: "700 30px Arial",
                badgeSize: 80
            }, {
                showGuides: true,
                guidesSize: 148,
                guidesX: 0,
                guidesY: -24,
                iconSize: 168,
                iconX: 0,
                iconY: -22,
                iconShadowSize: 0,
                iconShadowIntensity: 15,
                isBackgroundTransparent: false,
                backgroundWidth: 300,
                backgroundHeight: 300,
                backgroundLightIntensity: 0,
                backgroundShadowSize: 0,
                backgroundBorderRadius: 0,
                isBadgeTransparent: true,
                badgeFont: "300 16px Arial",
                badgeSize: 60
            }]
        }
    }
}, ["msu/pages/index"]);
