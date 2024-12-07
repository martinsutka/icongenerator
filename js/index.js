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
                guidesSize: 200,
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
                badgeFont: "700 30px Arial",
                badgeSize: 80
            }]
        }
    }
}, ["msu/pages/index"]);
