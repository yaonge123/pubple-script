var koongjjakController = function () {
    // variables
    var targetEl;           // target element
    var prefix = 'images/'; // background image url prefix
    // functions
    // logics
    if ($('.musicNoteSyncImg').length) {    // exist musicNoteSyncImg class
        targetEl = $('.musicNoteSyncImg');  // set targetEl
    } else {    // not exist musicNoteSyncImg class
        if (trace_controller == true) console.log('Err> koongjjakController: cannot find musicNoteSyncImg class');    // error bbumbbum
    }
    // return function
    return {
        /**
         * @description background change, on image
         * @param {number} index koongjjak image on this page, find by id('imgSync' + index)
         * @return {void}
         */
        imageOn : function (index) {
            var fData = 'imgSync' + index;      // target id
            var t = targetEl.find('#'+fData);   // find target
            if (t.length) {                     // exist target
                //console.log(t.css('background-image'));
                var bgData = t.css('background-image');   // background data get
                console.log('imageOn> bgData: ');
                console.log(bgData);
                // get background 
                var imgUrl = prefix + bgData.substring(bgData.lastIndexOf('/', bgData.indexOf('.png'))+1, bgData.indexOf('.png')+4).replace('off', 'on');
                t.css({"background":"url("+imgUrl+")"});
            } else {                            // not exist target
                if (trace_controller == true) console.log('Err> imageOn: cannot find this, id: '+fData);
            }
        },
        /**
         * @description background change, off image
         * @param {number} index koongjjak image on this page, find by id('imgSync' + index)
         * @return {void}
         */
        imageOff : function (index) {
            var fData = 'imgSync' + index;
            var t = targetEl.find('#'+fData);
            if (t.length) {
                var bgData = t.css('background-image');
                console.log('imageOff> bgData: ');
                console.log(bgData);
                var imgUrl = prefix + bgData.substring(bgData.lastIndexOf('/', bgData.indexOf('.png'))+1, bgData.indexOf('.png')+4).replace('on', 'off');
                t.css({"background":"url("+imgUrl+")"});
            } else {
                if (trace_controller == true) console.log('Err> imageOn: cannot find this, id: '+fData);
            }
        }
    }
}