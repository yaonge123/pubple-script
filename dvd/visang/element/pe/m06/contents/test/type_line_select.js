//그룹1 , 그룹2
var line_select = function( dom_1 , dom_2 , answer , _width , _height , _wrapper){


    console.log(this._wrapperLayer);

    //wrapper
    this._wrapperLayer = _wrapper;
    //정답보기 버튼
    this.btnAnswer = this._wrapperLayer.querySelector('.btnCheck');
    //다시풀기 버튼
    this.btnReset = this._wrapperLayer.querySelector('.btnReplay');

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

    this._wrap_dom = null;
    this._wrap_width = _width;
    this._wrap_height = _height;
    this._answerSVG = null;
    this._selectSVG = null;
    this._answerLineStyle = 'stroke:rgb(255,0,0); stroke-width:12';
    this._selectLineStyle = 'stroke:rgb(51,51,153); stroke-width:12';

    this.group1_Enable = false;
    this.group2_Enable = false;

    this.selectDrawEnabel =  false;
    this.selectDraw_from =  0;
    this.selectDraw_to =  0;

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
    // this._wrap_width  = this._wrap_dom.offsetWidth;
    // this._wrap_height = this._wrap_dom.offsetHeight;

    this.make_SVG_wrapper();
    this.bindEvt();
};

line_select.prototype.bindEvt = function(){

    var self = this;

    for(var i = 0; this.suggest_layer_dots.length > i; i++){

        this.suggest_layer_dots[i].setAttribute('data-f_index' , i);

        this.suggest_layer_dots[i].addEventListener('click' , function(e){
            self.suggest_dot_evt(e , this , self);
            if(self._selectSVG.querySelectorAll('line').length == self.suggest_layer_dots.length){
                goldenBell.saveUserCheck(true);
                goldenBell.gold_Animate(self.allAnswerCheck());
            }
        });
    }

    for(var _i = 0; this.select_layer_dots.length > _i; _i++){

        this.select_layer_dots[_i].setAttribute('data-t_index' , _i);

        this.select_layer_dots[_i].addEventListener('click' , function(e){
            self.select_dot_evt(e , this , self);
            if(self._selectSVG.querySelectorAll('line').length == self.suggest_layer_dots.length){
                goldenBell.saveUserCheck(true);
                goldenBell.gold_Animate(self.allAnswerCheck());
            }
        });
    }

    console.log(this.btnAnswer);
    console.log(this.btnReset);

    this.btnAnswer.addEventListener('click' , function () {
        self.answerCheck();
    });
    this.btnReset.addEventListener('click' , function () {
        self.answerReset();
    });
};

line_select.prototype.allAnswerCheck = function(){

    var answerLine = this._answerSVG.querySelectorAll('line');
    var selectLine = this._selectSVG.querySelectorAll('line');
    var test = [];

    if(selectLine.length == 0){
        return 'next';
    }
    if(this.answerArray.length != selectLine.length){
        return 'next';
    }

    for(var i = 0; this.answerArray.length > i; i++){
        for(var _i = 0; selectLine.length > _i; _i++){
            if(selectLine[_i].getAttribute('data-from') == i && selectLine[_i].getAttribute('data-to') == this.answerArray[i]){
                test.push(true);
            }
        }
    }

    if(test.length == this.answerArray.length){
        var returnData = false;
        for(var k = 0; test.length > k; k++){
            returnData = test[k];
        }
        if(returnData) return 'right';
    }else{
        return 'next';
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
            top : Number(dom[i].style.top.replace('px' , '')),
            left : Number(dom[i].style.left.replace('px' , '')),
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
    newLine.setAttribute('x1', from.left + 12);
    newLine.setAttribute('y1', from.top + 12);
    newLine.setAttribute('x2', to.left + 12);
    newLine.setAttribute('y2', to.top + 12);
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
            Q_base.audio_check_true.play();
            viewAnswer();
            return false;
        }

        if(this.answerArray.length != selectLine.length){
            Q_base.audio_check_false.play();
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
            Q_base.audio_check_false.play();
            viewAnswer();
            return false;
        }
        for(var __i = 0; test.length > __i; __i++){
            if(!test){
                Q_base.audio_check_false.play();
                viewAnswer();
                return false;
            }
        }
        viewAnswer();
        Q_base.audio_check_true.play();
    } else {

        var tempLine = [];
        for(var i = 0; selectLine.length > i; i++){
            if(selectLine[i].getAttribute('data-from') == index){
                tempLine.push(selectLine[i]);
            }
        }


        if(tempLine.length == 0){
            viewAnswer(index);
            Q_base.audio_check_true.play();
            return false;
        }

        if(tempLine.length != 1){
            viewAnswer(index);
            Q_base.audio_check_false.play();
            return false;
        }


        if(tempLine[0].getAttribute('data-to') == this.answerArray[index]){
            viewAnswer(index);
            Q_base.audio_check_true.play();
        } else {
            viewAnswer(index);
            Q_base.audio_check_false.play();
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