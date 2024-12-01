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
        }
    }
}, ["msu/pages/index"]);
