var Q_base = Q_base || {};

Q_base = {
    // audio_check_true : null,
    // audio_check_false : null
};

//인잇
Q_base.init = function() {

    // this.audio_check_false = null;
    // this.audio_check_true = null;

    //문제 틀릴시 사운드
    //문제 정답시 사운드
    // this.audio_check_false = window.parent.VIEWER.basic.set_falseAudio;
    // this.audio_check_true = window.parent.VIEWER.basic.set_trueAudio;
};

Q_base.audio_check_false = {};
Q_base.audio_check_true = {};

Q_base.audio_check_false.play = function(){
    console.log('null')
};
Q_base.audio_check_true.play = function(){
    console.log('null')
};

//인잇
//array를 가지고 와서 트루 펄스 체크 및 사운드 재생
Q_base.multiCheck = function(array){

    var break_point = false;

    for(var i = 0; array.length > i; i++){
        if(!array[i]){
            this.audio_check_false.play();
            break_point = true;
        }
    }

    if(!break_point){
        this.audio_check_true.play();
    }
};

Q_base.init();