var multiSelectCheck = function( _dom, _answer ){

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

multiSelectCheck.prototype.init = function(){

    var self = this;

    for(var i = 0; this.select_listBtns.length > i; i++){
        this.select_listBtns[i].addEventListener('click' , function(){
            this.classList.add('select');
            self.answerCheck(this);
        });
    }

    this.viewAnswerBtn.addEventListener('click' , function () {
        self.viewAnswer();
    });

    this.viewRestBtn.addEventListener('click' , function () {
        self.classReset();
    });
};

multiSelectCheck.prototype.viewAnswer = function(){
    var self= this;
    this.classReset();

    for(var i = 0; self.answer.length > i; i++){
        self.dom.querySelector('[data-value="'+self.answer[i]+'"]').classList.add('answer');
    }

};


multiSelectCheck.prototype.classReset = function(){
    for(var i = 0; this.select_listBtns.length > i; i++){
        this.select_listBtns[i].classList.remove('on');
        this.select_listBtns[i].classList.remove('select');
        this.select_listBtns[i].classList.remove('wrong');
        this.select_listBtns[i].classList.remove('answer');
    }
};

multiSelectCheck.prototype.answerCheck = function(dom){

    var ddd = dom.getAttribute('data-value');

    for(var index = 0; this.answer.length > index; index++){

        if(this.answer[index] == ddd){
            dom.classList.add('answer');
        } else {
            dom.classList.add('wrong');
        }
    }

    var _ddd = this.dom.querySelectorAll('.answer[data-value]').length;

    if(_ddd == this.answer.length){
        goldenBell.saveUserCheck(true);

        if(goldenBell.slideStatus != 'end'){
            goldenBell.gold_Animate('right');
        }
    }
};

multiSelectCheck.prototype.answerReset = function(){
    this.classReset();
};
