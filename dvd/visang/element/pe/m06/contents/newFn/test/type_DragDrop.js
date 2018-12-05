var dragAndDrop = function( dragDropLayer , dragObj , dropZone , replace){

    this.dragDropLayer = dragDropLayer;
    this.dragObj = dragObj;
    this.dropZone = dropZone;
    this.replace = replace;

    this.dragObj_len = this.dragObj.length;
    this.dragObj_cnt = this.dragObj_len;

    var self = this;

    $.fn.dropAnswerCheck = function() {
        self.answerCheck(this);
        return this;
    };

    $.fn.dropResetCheck = function() {
        self.reset(this);
        return this;
    };

    try{
        this.init();
    } catch(e) {
        console.error(e);
    }
};

dragAndDrop.prototype.init = function(){

    var self = this;
    var click = {
        x: 0,
        y: 0
    };

    this.dragObj.draggable({
        start: function(event) {
            click.x = event.clientX;
            click.y = event.clientY;
        },

        drag: function(event, ui) {

            var containerEl = document.getElementById("wrap");
            var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var hRatio = windowW / containerEl.clientWidth;
            var vRatio = windowH / containerEl.clientHeight;

            var original = ui.originalPosition;

            // jQuery will simply use the same object we alter here
            ui.position = {
                left: (event.clientX - click.x + original.left) / hRatio,
                top:  (event.clientY - click.y + original.top ) / vRatio
            };
        },
        revert: 'invalid'
    });

    this.dropZone.droppable({
        drop : function(e , ui){
            var _removeDom = $('[data-dropData='+ui.draggable.attr('data-drag')+']');
            _removeDom.attr('data-dropData' , '');

            var p = this.getAttribute('data-a_position').split(',');

            if(!this.getAttribute('data-dropData')){

                this.setAttribute('data-dropData' , ui.draggable.attr('data-drag'));

                $(ui.draggable[0]).animate({
                    'top' : p[0],
                    'left' : p[1]
                });

                self.dragObj_cnt = self.dragObj_len - $('[data-dropData]').length;


                if(self.dragObj_cnt == 0){
                    var checkDrag = self.checkDrag();

                    console.log('드래그엔 드랍');

                    if(checkDrag){
                        goldenBell.saveUserCheck(true);
                        if(goldenBell.slideStatus != 'end'){
                            goldenBell.gold_Animate('right');
                        }
                    } else {
                        $('._dragDom').dropResetCheck();
                    }
                    self.dragObj_cnt = self.dragObj_len;
                }

            } else {


                var revertDom = $('[data-drag='+this.getAttribute('data-dropData')+']');
                revertDom.animate({
                    top : revertDom.attr('data-o_top'),
                    left : revertDom.attr('data-o_left')
                });
                this.setAttribute('data-dropData' , ui.draggable.attr('data-drag'));
                $(ui.draggable[0]).animate({
                    'top' : p[0],
                    'left' : p[1]
                });

                self.dragObj_cnt = self.dragObj_len - $('[data-dropData]').length;

                console.log(self.dragObj_cnt);

            }


        }
    });

    this.dragObj.parent().droppable({
        drop : function(e , ui){

            console.log('요요요요요')

            var _removeDom = $('[data-dropData='+ui.draggable.attr('data-drag')+']');
            _removeDom.attr('data-dropData' , '');

            $(ui.draggable[0]).animate({
                'top' : $(ui.draggable[0]).attr('data-o_top'),
                'left' : $(ui.draggable[0]).attr('data-o_left')
            });

            if(self.dragObj_cnt < self.dragObj_len){
                self.dragObj_cnt++;
            }

            console.log(self.dragObj_cnt);
            console.log(self.dragObj_len);
        }
    });

    this.dragObj.each(function( i, o ){
        o.setAttribute('data-o_top' , o.style.top);
        o.setAttribute('data-o_left' , o.style.left);
    });

    this.dragDropLayer.find('.btnCheck').on('click' , function(){
        $('._dropDom').dropAnswerCheck();
    });

    this.dragDropLayer.find('.btnReplay').on('click' , function(){
        $('._dragDom').dropResetCheck();
    });
};
dragAndDrop.prototype.answerCheck = function(dom){

    var check = true;
    var _valueCheck = false;

    for(var i = 0; dom.length > i; i++){

        if(dom[i].getAttribute('data-dropdata')){
            _valueCheck = true;
        }
        if(dom[i].getAttribute('data-drop') != dom[i].getAttribute('data-dropdata')){
            check = false;
            var p = dom[i].getAttribute('data-a_position').split(',');
            $(document.querySelector('[data-drag='+dom[i].getAttribute('data-drop')+']')).animate({
                'top' : p[0],
                'left' : p[1]
            });
        }
    }

    this.dragObj_cnt = this.dragObj_len;
};
dragAndDrop.prototype.checkDrag = function(){

    var check = true;
    var _valueCheck = false;
    var  dom = this.dropZone;

    for(var i = 0; dom.length > i; i++){

        if(dom[i].getAttribute('data-dropdata')){
            _valueCheck = true;
        }
        if(dom[i].getAttribute('data-drop') != dom[i].getAttribute('data-dropdata')){
            check = false;
            var p = dom[i].getAttribute('data-a_position').split(',');
            $(document.querySelector('[data-drag='+dom[i].getAttribute('data-drop')+']')).animate({
                'top' : p[0],
                'left' : p[1]
            });
        }
    }

    return check;
};
dragAndDrop.prototype.reset = function(dom){

    dom.each(function(i,o){
        $(o).animate({
            top : $(o).attr('data-o_top'),
            left : $(o).attr('data-o_left')
        });
    });

    this.dropZone.each(function(i,o){
        $(o).attr('data-dropData' , '');
    });
};