var strCheck = function( _dom , _answer ) {

    this.dom = _dom.querySelector('textarea');
    this.answer = _dom.querySelector('._Answer').innerText;

    this.btnCheck = _dom.querySelector('.btnCheck');
    this.btnReplay = _dom.querySelector('.btnReplay');

    try {
        this.init();
        this.bindEvt();
    } catch (e) {
        console.error('strCheck :::: ' , e);
    }
};

strCheck.prototype.init = function(){

    if(!this.dom && !this.answer) return false;

    return {
        answerCheck : this.answerCheck,
        answerReset : this.answerReset
    };
};


strCheck.prototype.bindEvt = function(){

    var self = this;

    this.dom.addEventListener('keyup' , function(){
        if(this.value.replace(/\s/gi, "") == self.answer) {
            goldenBell.saveUserCheck(true);
            if(goldenBell.slideStatus != 'end'){
                goldenBell.gold_Animate('right');
            }
        }
    });

    this.btnCheck.addEventListener('click' , function () {
        self.viewAnswer();
    });

    this.btnReplay.addEventListener('click' , function () {
        self.dom.value = '';
    });
};

strCheck.prototype.viewAnswer = function(){

    var temp = this.dom.value;
    this.dom.value = this.answer;
};

// true일시 하나의 문제 유형. 토글 기능 O
// false일시 여러개의 문제 유형으로 판단. 토글 기능 X
strCheck.prototype.answerCheck = function(boolean) {


    if(boolean){
        if(this.dom.classList.contains('__on')) {
            this.dom.classList.remove('__on');
            this.answerReset();
        } else {
            this.dom.classList.add('__on');
            if(boolean) {
                this.singleCheck();
            }
        }
    } else {
        this.dom.classList.add('__on');
        return this.multiCheck();
    }
};

strCheck.prototype.singleCheck = function(){

    if(this.answer == this.dom.value.trim()){
        this.dom.classList.remove('false');
        this.dom.classList.add('true');
        Q_base.audio_check_true.play();
    } else {
        if(this.dom.value.trim().length > 0){
            this.dom.classList.remove('true');
            this.dom.classList.add('false');
            Q_base.audio_check_false.play();
        } else {
            Q_base.audio_check_true.play();
        }
    }

    this.dom.value = this.answer;
};


strCheck.prototype.multiCheck = function(){

    var returnVal = false;

    if(this.answer == this.dom.value.trim()){
        if(!this.dom.classList.contains('false')){
            this.dom.classList.remove('false');
            this.dom.classList.add('true');
        } else {
            this.dom.classList.remove('true');
            this.dom.classList.add('false');
        }
        returnVal = true;
    } else {
        this.dom.classList.remove('true');
        this.dom.classList.add('false');

        if(this.dom.value.trim().length > 0){
            returnVal = false;
        } else {
            returnVal = true;
        }
    }

    this.dom.value = this.answer;
    return returnVal;
};

strCheck.prototype.answerReset = function(){
    this.dom.classList.remove('true');
    this.dom.classList.add('false');
    this.dom.classList.remove('__on');
    this.dom.value = '';
};