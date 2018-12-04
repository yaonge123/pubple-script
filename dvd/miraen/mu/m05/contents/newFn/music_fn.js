$(document).ready(function () {

    $('[data-target_q]').on('click' , function () {
        _strCheck($(this).attr('data-target_q') , $(this).hasClass('replay'));
    });

});



//인풋 스트링 쳌
function _strCheck(domID , status){

    var root = $('#' + domID);
    var inputs = root.find('input');
    
    if(!status){
        inputs.each(function (i , o) {
            o.value = '';
            o.readonly =  false;
        });
    } else {
        inputs.each(function (i , o) {
            o.value = o.getAttribute('data-answerTxt');
            o.readonly =  true;
        });
    }
}









/**
 * Created by JongMin on 2018-05-14.
 */

var Q_base = Q_base || {};

Q_base = {
    audio_check_true : null,
    audio_check_false : null
};

//인잇
Q_base.init = function() {
    //문제 틀릴시 사운드
    // this.audio_check_false = window.parent.VIEWER.basic.set_falseAudio;
    //문제 정답시 사운드
    // this.audio_check_true = window.parent.VIEWER.basic.set_trueAudio;


    // this.audio_check_true.play = function(){
    //     return;
    // };

    // this.audio_check_false.play = function(){
    //     return;
    // };
};

//인잇
//array를 가지고 와서 트루 펄스 체크 및 사운드 재생
Q_base.multiCheck = function(array){

    // var break_point = false;
    //
    // for(var i = 0; array.length > i; i++){
    //     if(!array[i]){
    //         this.audio_check_false.play();
    //         break_point = true;
    //     }
    // }
    //
    // if(!break_point){
    //     this.audio_check_true.play();
    // }
};

Q_base.init();

//선긋기 기능
//클릭 기반
var line_select = function( dom_1 , dom_2 , answer , displayWrapId){
    //제시
    this.suggest_layer = dom_1;
    this.suggest_layer_dots = null;
    //제시를 선택
    this.select_layer = dom_2;
    this.select_layer_dots = null;
    //정답
    this.answerArray = answer;
    //dot 포지션 정보값
    this.suggest_layer_positon = null;
    this.select_layer_positon = null;
    this.dotClass = 'ans_line_dot';

    this.wrapClassStr = 'ans_line';

    this.displayWrapDom = document.getElementById(displayWrapId);

    this._wrap_dom = null;
    this._wrap_width = 0;
    this._wrap_height = 0;
    this._answerSVG = null;
    this._selectSVG = null;
    this._answerLineStyle = 'stroke:rgb(255,0,0); stroke-width:5';
    this._selectLineStyle = 'stroke:rgb(51,51,153); stroke-width:5';


    this.group1_Enable = false;
    this.group2_Enable = false;



    this.selectDrawEnabel =  false;
    this.selectDraw_from =  0;
    this.selectDraw_to =  0;



    this.displayWrapDom.style.visibility = 'hidden';
    this.displayWrapDom.style.display = 'block';

    //select 그리기 준비 선택
    //on 그리기 완료
    var self = this;
    setTimeout(function(){
        self.init();
    },500);
};
line_select.prototype.init = function() {
    this.suggest_layer_dots = this.suggest_layer.querySelectorAll('.'+this.dotClass);
    this.suggest_layer_positon = this.makePosition(this.suggest_layer_dots);
    this.select_layer_dots = this.select_layer.querySelectorAll('.'+this.dotClass);
    this.select_layer_positon = this.makePosition(this.select_layer_dots);

    this._wrap_dom = this.suggest_layer.parentNode;
    this._wrap_width  = this._wrap_dom.offsetWidth;
    this._wrap_height = this._wrap_dom.offsetHeight;

    this.make_SVG_wrapper();
    this.bindEvt();





    this.displayWrapDom.style.visibility = 'visible';
    this.displayWrapDom.style.display = 'none';



};
line_select.prototype.bindEvt = function(){

    var self = this;

    for(var i = 0; this.suggest_layer_dots.length > i; i++){

        this.suggest_layer_dots[i].setAttribute('data-f_index' , i);

        this.suggest_layer_dots[i].addEventListener('click' , function(e){
            self.suggest_dot_evt(e , this , self);
        });
    }

    for(var _i = 0; this.select_layer_dots.length > _i; _i++){

        this.select_layer_dots[_i].setAttribute('data-t_index' , _i);

        this.select_layer_dots[_i].addEventListener('click' , function(e){
            self.select_dot_evt(e , this , self);
        });

    }
};
line_select.prototype.suggest_dot_evt = function(e , _dom , self){

    //선을 긋는다.
    if(self.selectDrawEnabel && self.group2_Enable) {

        self.selectDraw_from = Number(_dom.getAttribute('data-f_index'));

        var drawedLines = self._selectSVG.querySelectorAll('line');
        for(var _i = 0; drawedLines.length > _i; _i++){
            if(drawedLines[_i].getAttribute('data-from') == self.selectDraw_from){
                var _parentNode = drawedLines[_i].parentNode;
                _parentNode.removeChild(drawedLines[_i]);
            }
        }

        self.make_line(
            self.suggest_layer_positon[self.selectDraw_from] ,
            self.select_layer_positon[self.selectDraw_to] ,
            self._selectSVG ,
            self._selectLineStyle ,
            'block' ,
            self.selectDraw_from ,
            self.selectDraw_to
        );

        for( var _i = 0; self.select_layer_dots.length > _i; _i++ ){
            self.select_layer_dots[_i].classList.remove('select');
        }
        for( var _i = 0; self.suggest_layer_dots.length > _i; _i++ ){
            self.suggest_layer_dots[_i].classList.remove('select');
        }

        self.selectDrawEnabel = false;
        self.selectDraw_from = 0;
        self.selectDraw_to = 0;
        self.group1_Enable = false;
        self.group2_Enable = false;
    }else{
        if(_dom.classList.contains('select')){
            _dom.classList.remove('select');
            self.selectDrawEnabel = false;
            self.selectDraw_from = 0;
            self.selectDraw_to = 0;
            self.group1_Enable = false;
            self.group2_Enable = false;
        } else {
            for( var _i = 0; self.suggest_layer_dots.length > _i; _i++ ){
                self.suggest_layer_dots[_i].classList.remove('select');
            }
            _dom.classList.add('select');
            self.selectDrawEnabel = true;
            self.selectDraw_from = Number(_dom.getAttribute('data-f_index'));

            self.group1_Enable = true;
            self.group2_Enable = false;
        }
    }
};
line_select.prototype.select_dot_evt = function(e , _dom , self){

    if(self.selectDrawEnabel && self.group1_Enable) {

        self.selectDraw_to = Number(_dom.getAttribute('data-t_index'));

        var drawedLines = self._selectSVG.querySelectorAll('line');
        for(var _i = 0; drawedLines.length > _i; _i++){
            if(drawedLines[_i].getAttribute('data-from') == self.selectDraw_from){
                var _parentNode = drawedLines[_i].parentNode;
                _parentNode.removeChild(drawedLines[_i]);
            }
        }
        self.make_line(
            self.suggest_layer_positon[self.selectDraw_from] ,
            self.select_layer_positon[self.selectDraw_to] ,
            self._selectSVG ,
            self._selectLineStyle ,
            'block' ,
            self.selectDraw_from ,
            self.selectDraw_to
        );
        for( var _i = 0; self.select_layer_dots.length > _i; _i++ ){
            self.select_layer_dots[_i].classList.remove('select');
        }
        for( var _i = 0; self.suggest_layer_dots.length > _i; _i++ ){
            self.suggest_layer_dots[_i].classList.remove('select');
        }
        self.selectDrawEnabel = false;
        self.selectDraw_from = 0;
        self.selectDraw_to = 0;
        self.group1_Enable = false;
        self.group2_Enable = false;
    } else {
        if(_dom.classList.contains('select')){
            _dom.classList.remove('select');
            self.selectDrawEnabel = false;
            self.selectDraw_from = 0;
            self.selectDraw_to = 0;
            self.group1_Enable = false;
            self.group2_Enable = false;
        } else {
            for( var _i = 0; self.select_layer_dots.length > _i; _i++ ){
                self.select_layer_dots[_i].classList.remove('select');
            }
            _dom.classList.add('select');
            self.selectDrawEnabel = true;
            self.selectDraw_to = Number(_dom.getAttribute('data-t_index'));

            self.group1_Enable = false;
            self.group2_Enable = true;
        }
    }

};
line_select.prototype.makePosition = function(dom){

    var returnArray = [];

    for(var i = 0; dom.length > i; i++){
        dom[i].setAttribute('data-index' , i);
        returnArray.push({
            top : dom[i].offsetTop ,
            left : dom[i].offsetLeft,
            dom : dom[i]
        });
    }
    return returnArray;
};
//make svg warpper
line_select.prototype.make_SVG_wrapper = function(dom){

    var wrapperSVG = document.createElementNS('http://www.w3.org/2000/svg','svg');

    wrapperSVG.setAttribute('width', this._wrap_width);
    wrapperSVG.setAttribute('height', this._wrap_height);
    wrapperSVG.setAttribute('viewBox', '0 0 ' + this._wrap_width + ' ' + this._wrap_height);

    this._answerSVG = document.createElementNS('http://www.w3.org/2000/svg','g');
    this._selectSVG = document.createElementNS('http://www.w3.org/2000/svg','g');




    this._answerSVG.setAttribute('class' , '_answer');
    this._selectSVG.setAttribute('class' , '_select');

    this._selectSVG.style.position = 'absolute';
    this._selectSVG.style.top  = 0+'px';
    this._selectSVG.style.left = 0+'px';

    wrapperSVG.appendChild(this._answerSVG);
    wrapperSVG.appendChild(this._selectSVG);

    this._wrap_dom.appendChild(wrapperSVG);


    this.make_answer_line();
};
line_select.prototype.make_answer_line = function(){

    for( var index = 0; this.answerArray.length > index; index++ ) {
        var from = {
            top : this.suggest_layer_positon[index].top,
            left : this.suggest_layer_positon[index].left
        };

        var to = {
            top : this.select_layer_positon[this.answerArray[index]].top,
            left : this.select_layer_positon[this.answerArray[index]].left
        };
        this.make_line(from , to , this._answerSVG , this._answerLineStyle , 'none');
    }
};
line_select.prototype.make_line = function(from , to , appendDom , style , _display , indexFrom  , indexTo){

    var newLine;
    newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('x1', from.left + 8);
    newLine.setAttribute('y1', from.top + 8);
    newLine.setAttribute('x2', to.left + 8);
    newLine.setAttribute('y2', to.top + 8);
    newLine.setAttribute('style' , style);

    if(indexFrom != null){
        newLine.setAttribute('data-from' , indexFrom);
        newLine.setAttribute('data-to' , indexTo);
    }

    newLine.style.display = _display;

    appendDom.appendChild(newLine);
};
line_select.prototype.userDrawLine = function(from , to){

};
line_select.prototype.answerCheck = function(index){

    var answerLine = this._answerSVG.querySelectorAll('line');
    var selectLine = this._selectSVG.querySelectorAll('line');

    if(index == null){
        var test = [];

        if(selectLine.length == 0){
            // ////Q_base.audio_check_true.play();
            viewAnswer();
            return false;
        }

        if(this.answerArray.length != selectLine.length){
            // //Q_base.audio_check_false.play();
            viewAnswer();
            return false;
        }
        for(var i = 0; this.answerArray.length > i; i++){
            for(var _i = 0; selectLine.length > _i; _i++){
                if(selectLine[_i].getAttribute('data-from') == i && selectLine[_i].getAttribute('data-to') == this.answerArray[i]){
                    test.push(true);
                }
            }
        }
        if(test.length != this.answerArray.length){
            viewAnswer();
            return false;
        }
        for(var __i = 0; test.length > __i; __i++){
            if(!test){
                viewAnswer();
                return false;
            }
        }
        viewAnswer();
        // ////Q_base.audio_check_true.play();
    } else {

        var tempLine = [];
        for(var i = 0; selectLine.length > i; i++){
            if(selectLine[i].getAttribute('data-from') == index){
                tempLine.push(selectLine[i]);
            }
        }


        if(tempLine.length == 0){
            viewAnswer(index);
            return false;
        }

        if(tempLine.length != 1){
            viewAnswer(index);
            return false;
        }


        if(tempLine[0].getAttribute('data-to') == this.answerArray[index]){
            viewAnswer(index);
        } else {
            viewAnswer(index);
            return false;
        }
    }


    function viewAnswer(index){

        if(index == null){
            for( var _j = 0; selectLine.length > _j; _j++ ){
                var _parentNode = selectLine[_j].parentNode;
                _parentNode.removeChild(selectLine[_j]);
            }
            for(var j = 0; answerLine.length > j; j++){
                answerLine[j].style.display = 'block';
            }
        } else {
            for( var _j = 0; selectLine.length > _j; _j++ ){
                if(selectLine[_j].getAttribute('data-from') == index){
                    var _parentNode = selectLine[_j].parentNode;
                    _parentNode.removeChild(selectLine[_j]);
                }
            }
            answerLine[index].style.display = 'block';
        }
    }

};
line_select.prototype.answerReset = function(index){

    var selectLine = this._selectSVG.querySelectorAll('line');
    var answerLine = this._answerSVG.querySelectorAll('line');

    if(index == null) {
        for( var _i = 0; selectLine.length > _i; _i++ ){
            var _parentNode = selectLine[_i].parentNode;
            _parentNode.removeChild(selectLine[_i]);
        }
        for( var _i = 0; answerLine.length > _i; _i++ ){
            answerLine[_i].style.display = 'none';
        }
    } else {
        for( var _i = 0; selectLine.length > _i; _i++ ){
            if(selectLine[_i].getAttribute('data-from') == index){
                var _parentNode = selectLine[_i].parentNode;
                _parentNode.removeChild(selectLine[_i]);
            }
        }
        answerLine[index].style.display = 'none';
    }
};


//드래그엔드랍
var dragAndDrop = function( dragObj , dropZone , replace){

    this.dragObj = dragObj;
    this.dropZone = dropZone;
    this.replace = replace;


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


    var test = false;

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
        stop : function( event , ui ){

            if(!test){
                $(event.target).animate({
                    top : $(this).attr('data-o_top'),
                    left : $(this).attr('data-o_left')
                });
            }

            test =  false;
        }
    });

    this.dropZone.droppable({
        drop : function(e , ui){

            test =  true;

            var _removeDom = $('[data-dropData='+ui.draggable.attr('data-drag')+']');
            _removeDom.attr('data-dropData' , '');

            var p = this.getAttribute('data-a_position').split(',');

            if(!this.getAttribute('data-dropData')){

                if(this.getAttribute('data-drop') == ui.draggable.attr('data-drag')){
                    this.setAttribute('data-dropData' , ui.draggable.attr('data-drag'));
                    $(ui.draggable[0]).animate({
                        'top' : p[0],
                        'left' : p[1]
                    });
                }else{

                    this.setAttribute('data-dropData' , '');
                    $(ui.draggable[0]).animate({
                        'top' : ui.draggable.attr('data-o_top'),
                        'left' : ui.draggable.attr('data-o_left')
                    });
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
            }
        }
    });

    this.dragObj.parent().droppable({
        drop : function(e , ui){
            var _removeDom = $('[data-dropData='+ui.draggable.attr('data-drag')+']');
            _removeDom.attr('data-dropData' , '');

            $(ui.draggable[0]).animate({
                'top' : $(ui.draggable[0]).attr('data-o_top'),
                'left' : $(ui.draggable[0]).attr('data-o_left')
            });
        }
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


    if(_valueCheck){
        if(check) {
            ////Q_base.audio_check_true.play();
        } else {
            //Q_base.audio_check_false.play();
        }
        return check;
    } else {
        ////Q_base.audio_check_true.play();
        return true;
    }

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