//CrossProtocolPreload
var XPP = {
    gather: function() {
        var queue = [],
            links, scripts, imgs;
        links = document.getElementsByTagName("link");
        for (var i = 0, test = links.length; i < test; i++) {
            if (links[i].href.indexOf(".css") > -1) {
                queue.push(links[i].href.replace("http://", "https://"));
            }
        }
        scripts = document.getElementsByTagName("script");
        for (var i = 0, test = scripts.length; i < test; i++) {
            if (scripts[i].src.indexOf(".js") > -1) {
                queue.push(scripts[i].src.replace("http://", "https://"));
            }
        }
        var sheets = document.styleSheets,
            styles, re = /url[\s]*\(["'\s]*(.*[jpg|png|gif])["'\s]*\)[\s]*[\d\w]/i,
            match;

        for (var i = 0; i < sheets.length; i++) {
            styles = sheets[i].cssRules;
            for (var j = 0; j < styles.length; j++) {
                if (styles[j].style.cssText.indexOf("background") > -1) {
                    match = re.exec(styles[j].style.cssText);
                    if (match != null) {
                        queue.push(match[1].replace("//", "https://"));
                    }
                }
            }
        }
        console.log(queue)
        //  XPP.load(queue)
    },
    load: function(queue) {
        //http://www.phpied.com/preload-cssjavascript-without-execution/
        var i = 0,
            max = 0,
            o = null,
            isIE = navigator.appName.indexOf('Microsoft') === 0;

        for (i = 0, max = queue.length; i < max; i += 1) {

            if (isIE) {
                new Image().src = queue[i];
                continue;
            }
            o = document.createElement('object');
            o.data = queue[i];

            // IE stuff, otherwise 0x0 is OK
            //o.width = 1;
            //o.height = 1;
            //o.style.visibility = "hidden";
            //o.type = "text/plain"; // IE
            o.width = 0;
            o.height = 0;

            // only FF appends to the head
            // all others require body
            document.body.appendChild(o);
        }

    }
}
