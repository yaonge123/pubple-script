var selectCheck = function( _dom, _answer ){

    this.dom = _dom;
    this.select_listBtns = _dom.querySelectorAll('[data-value]');
    this.answer = _answer;


    this.viewAnswerBtn = _dom.querySelector('.btnCheck');
    this.viewRestBtn = _dom.querySelector('.btnReplay');

    try {
        this.init();
    } catch (e) {
        console.error('selectCheck :::: ' , e);
    }
};

selectCheck.prototype.init = function(){
    var self = this;
    for(var i = 0; this.select_listBtns.length > i; i++){
        this.select_listBtns[i].addEventListener('click' , function(){
            this.classList.add('_on');
            self.answerCheck();
        });
    }

    this.viewAnswerBtn.addEventListener('click' , function () {
        self.viewAnswer();
    });

    this.viewRestBtn.addEventListener('click' , function () {
        self.classReset();
    });

};


selectCheck.prototype.viewAnswer = function(){
    var self= this;
    this.classReset();
    for(var i = 0; self.answer.length > i; i++){
        self.dom.querySelector('[data-value="'+self.answer[i]+'"]').classList.add('answer');
    }
};

selectCheck.prototype.classReset = function(){
    for(var i = 0; this.select_listBtns.length > i; i++){
        this.select_listBtns[i].classList.remove('_on');
        this.select_listBtns[i].classList.remove('on');
        this.select_listBtns[i].classList.remove('answer');
        this.select_listBtns[i].classList.remove('wrong');
    }
};

selectCheck.prototype.answerCheck = function(boolean){

    //맞음
    var checkFlag = false;
    var _valueCheckFlag = false;

    for(var index = 0; this.select_listBtns.length > index; index++) {
        if(this.select_listBtns[index].classList.contains('_on')){
            _valueCheckFlag = true;
            if(this.select_listBtns[index].getAttribute('data-value') == this.answer){
                checkFlag = true;
            }
        }
    }

    for(var i = 0; this.select_listBtns.length > i; i++){
        if(this.select_listBtns[i].getAttribute('data-value') == this.answer){
            if(this.select_listBtns[i].classList.contains('_on')) {
                this.select_listBtns[i].classList.add('answer');
            }
        } else {
            if(this.select_listBtns[i].classList.contains('_on')) {
                this.select_listBtns[i].classList.add('wrong');
            }
        }
    }

    if(checkFlag){
        goldenBell.saveUserCheck(true);
        if(goldenBell.slideStatus != 'end'){
            goldenBell.gold_Animate('right');
        }
    }

    if(boolean){
        if(_valueCheckFlag){
            if(checkFlag){
                Q_base.audio_check_true.play();
            } else {
                Q_base.audio_check_false.play();
            }
        } else {
            Q_base.audio_check_true.play();
        }
    } else {
        if(_valueCheckFlag){
            return checkFlag;
        } else {
            return true;
        }
    }
};

selectCheck.prototype.answerReset = function(){
    this.classReset();
};