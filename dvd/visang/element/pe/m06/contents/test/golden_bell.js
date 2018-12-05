var goldenBell = {};

goldenBell.init = function(){

    //시작 화면 스타트
    this.gold_Animate('start');

    this.goldenBell_startBtn = $(".gold_start_btn");
    this.btnNext = $(".btnNext");
    this.btnPrev = $(".btnPrev");
    this.goldenBell_startPage = $(".gold_page.type_start");
    this.slideLayers = document.getElementsByClassName("_slides");
    this.timerNumLayer = $(".timer_num");
    //현재 화면 정보
    this.viewSlideNum = 1;


    this.answerCheckBtn = $('.tbtn.btnCheck');

    this.totalTime = 0;

    this.timeMaxSetting = 30;
    this.timeCnt = 0;
    this.timeTurn = 1000;

    //타임 인터벌 변수
    this.setTimer = null;
    this.slideStatus = 'start';

    //정답 슬라이드 갯수로 생성
    this.answerCheckArray = this.makeCheckArray(this.slideLayers.length);

    this.bindEvents();
    this.setScale();
};

//이벤트 등록
goldenBell.bindEvents = function(){

    var self = this;

    //시작 버튼
    this.goldenBell_startBtn.on("click",function(){
        self.goldenBell_startPage.stop().animate({"opacity" : "0"}, 700, "swing", function(){
            $(this).css({"display" : "none"});
            self.showDivs(1 , false);
        });
    });

    //정답체크 버튼
    this.answerCheckBtn.on('click' , function () {
        if(self.timeCnt === 1){
            //1초 종료
            //만약 정답을 맟추었을 경우 넥스트 레이어 1초 뷰 후 , 다음 문제로 넘어감
            goldenBell.timerEnd();
        }
    });

    this.btnNext.on('click' , function () {
        self.gold_Animate('hide');
        self.slidePlusDivs(+1);
    });

    this.btnPrev.on('click' , function () {
        self.gold_Animate('hide');
        self.slidePlusDivs(-1);
    });

    //시간초과시 이전 문제 다음 문제
    document.querySelector('.gold_btn.gold_prev_btn').addEventListener('click' , function () {
        self.gold_Animate('hide');
        self.slidePlusDivs(-1);
    });
    document.querySelector('.gold_btn.gold_next_btn').addEventListener('click' , function () {
        self.gold_Animate('hide');
        self.slidePlusDivs(+1);
    });


    //다시하기 화면
    document.querySelector('.gold_page.type_replay .gold_btn.gold_prev_btn').addEventListener('click' , function () {
        self.gold_Animate('hide');
        self.showDivs(self.slideLayers.length , false);
    });
    document.querySelector('.gold_page.type_replay .gold_btn.gold_replay_btn').addEventListener('click' , function () {
        self.slideReset();
    });

    //윈도우 리사이즈 이벤트 대응
    window.addEventListener("resize", self.setScale);
};
//슬라이드
goldenBell.slidePlusDivs = function (n) {
    this.showDivs(this.viewSlideNum += n);
};
goldenBell.showDivs = function (n , firstCheck) {

    console.log('????');

    goldenBell.timerEnd();

    if(firstCheck) {
        this.viewSlideNum = 1;
    }else{
        this.viewSlideNum = n;
        this.timerStart();
    }

    var i;
    var x = this.slideLayers;

    this.btnPrev.show();
    this.btnNext.show();

    if(n == 1){this.btnPrev.hide();}
    if(n == x.length){this.btnNext.hide();}

    if (n < 1) {this.viewSlideNum = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    x[this.viewSlideNum-1].style.display = "block";
};
//에니메이션  - 전 개발소스 활용
goldenBell.gold_Animate = function(motionPage){

    var self = this;

    console.log('motionPage ::::: ' , motionPage);


    goldenBell.timerEnd();

    var gold_animatePage = $('.gold_page');
    var gold_animateStart = $('.gold_page.type_start');
    var gold_animateNext = $('.gold_page.type_next');
    var gold_animateReplay = $('.gold_page.type_replay');
    var gold_animateRight = $('.gold_page.type_right');
    var gold_animateAllRight = $('.gold_page.type_all_right');

    gold_animatePage.hide();

    if(motionPage == "start"){

        gold_animateStart.show();

        var targetAnimate1 = $(".gold_img.p1_character_01");
        var targetAnimate2 = $(".gold_img.p1_character_02");
        var targetAnimate3 = $(".gold_img.p1_character_03");
        var targetAnimate4 = $(".gold_img.p1_start_board");
        var targetAnimate5 = $(".gold_start_btn.goldbtn_Start");
        var targetAnimate_back1 = $(".gold_img.p1_start_deco_01");
        var targetAnimate_back2 = $(".gold_img.p1_start_deco_02");

        targetAnimate1.css({"margin-top" : "50px" , "opacity" : "0"});
        targetAnimate2.css({"margin-top" : "-50px" , "opacity" : "0"});
        targetAnimate3.css({"margin-top" : "50px" , "opacity" : "0"});
        targetAnimate4.css({"margin-top" : "50px" , "opacity" : "0"});
        targetAnimate5.css({"margin-top" : "30px" , "opacity" : "0"});
        targetAnimate_back1.css({"margin-top" : "200px"});
        targetAnimate_back2.css({"margin-top" : "-200px"});

        $(targetAnimate_back1).stop().animate({"margin-top" : "0px"}, 1000, "swing");
        $(targetAnimate_back2).stop().animate({"margin-top" : "0px"}, 700, "swing");

        $(targetAnimate4).stop().delay(300).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing", function(){
            $(targetAnimate1).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");
        });
        $(targetAnimate2).stop().delay(600).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");
        $(targetAnimate3).stop().delay(600).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing", function(){
            $(targetAnimate5).animate({"margin-top" : "0px", "opacity" : "1"}, 400, "swing");
        });

    }else if(motionPage == "next"){

        gold_animateNext.show();

        var targetAnimate1 = $(".gold_img.p2_character_01");
        var targetAnimate2 = $(".gold_img.p2_character_02");
        var targetAnimate3 = $(".gold_img.p2_character_03");
        var targetAnimate4 = $(".p2_bubble");
        var targetAnimate5 = $(".gold_next_btn");
        var targetAnimate6 = $(".gold_prev_btn");

        targetAnimate1.css({"margin-left" : "-200px" , "opacity" : "0"});
        targetAnimate2.css({"margin-left" : "200px" , "opacity" : "0"});
        targetAnimate3.css({"margin-top" : "100px" , "opacity" : "0"});
        targetAnimate4.css({"margin-top" : "200px" , "margin-left" : "-50px" , "width" : "200px" , "height" : "111px" , "opacity" : "0"});
        targetAnimate5.css({"margin-top" : "-20px" , "opacity" : "0"});
        targetAnimate6.css({"margin-top" : "-20px" , "opacity" : "0"});

        $(targetAnimate1).stop().delay(200).animate({"margin-left" : "0px", "opacity" : "1"}, 1400, "swing");
        $(targetAnimate2).stop().delay(200).animate({"margin-left" : "0px", "opacity" : "1"}, 1400, "swing");
        $(targetAnimate3).stop().delay(600).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");
        $(targetAnimate4).stop().delay(1000).animate({"margin-top" : "0px" , "margin-left" : "0px" , "width" : "456px" , "height" : "254px" , "opacity" : "1"}, 500, "swing");
        $(targetAnimate5).stop().delay(1200).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");
        $(targetAnimate6).stop().delay(1200).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");

    }else if(motionPage == "replay"){

        //마지막 체크 틀릴시
        gold_animateReplay.show();

        var targetAnimate1 = $(".gold_img.p3_character_01");
        var targetAnimate2 = $(".gold_img.p3_character_02");
        var targetAnimate3 = $(".gold_img.p3_character_03");
        var targetAnimate4 = $(".p3_bubble");
        var targetAnimate5 = $(".gold_replay_btn");
        var targetAnimate6 = $(".gold_prev_btn");

        targetAnimate1.css({"margin-left" : "-50px" , "opacity" : "0"});
        targetAnimate2.css({"margin-left" : "-50px" , "opacity" : "0"});
        targetAnimate3.css({"margin-top" : "-100px" , "opacity" : "0"});
        targetAnimate4.css({"margin-top" : "200px" , "margin-left" : "150px" , "width" : "200px" , "height" : "111px" , "opacity" : "0"});
        targetAnimate5.css({"margin-top" : "-20px" , "opacity" : "0"});
        targetAnimate6.css({"margin-top" : "-20px" , "opacity" : "0"});

        $(targetAnimate1).stop().delay(200).animate({"margin-left" : "0px", "opacity" : "1"}, 700, "swing");
        $(targetAnimate2).stop().delay(200).animate({"margin-left" : "0px", "opacity" : "1"}, 700, "swing");
        $(targetAnimate3).stop().delay(600).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");
        $(targetAnimate4).stop().delay(1000).animate({"margin-top" : "0px" , "margin-left" : "0px" , "width" : "597px" , "height" : "292px" , "opacity" : "1"}, 500, "swing");
        $(targetAnimate5).stop().delay(1200).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");
        $(targetAnimate6).stop().delay(1200).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");

    }else if(motionPage == "right"){

        gold_animateRight.show();

        var targetAnimate1 = $(".gold_img.p4_character_01");
        var targetAnimate2 = $(".gold_img.p4_character_02");
        var targetAnimate3 = $(".gold_img.p4_character_03");
        var targetAnimate4 = $(".p4_bubble");

        targetAnimate1.css({"margin-left" : "-200px" , "opacity" : "0"});
        targetAnimate2.css({"margin-left" : "200px" , "opacity" : "0"});
        targetAnimate3.css({"margin-top" : "100px" , "opacity" : "0"});
        targetAnimate4.css({"margin-top" : "200px" , "margin-left" : "-50px" , "width" : "200px" , "height" : "111px" , "opacity" : "0"});

        $(targetAnimate1).stop().delay(200).animate({"margin-left" : "0px", "opacity" : "1"}, 1400, "swing");
        $(targetAnimate2).stop().delay(200).animate({"margin-left" : "0px", "opacity" : "1"}, 1400, "swing");
        $(targetAnimate3).stop().delay(600).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");
        $(targetAnimate4).stop().delay(1000).animate({"margin-top" : "0px" , "margin-left" : "0px" , "width" : "458px" , "height" : "256px" , "opacity" : "1"}, 500, "swing");



        setTimeout(function(){
            self.gold_Animate('hide');
            self.slidePlusDivs(+1);

        },2500);

    }else if(motionPage == "allright"){

        //마지막 체크 전부 맞았을떼

        this.timerEnd();
        this.printTime();

        gold_animateAllRight.show();

        var targetAnimate1 = $(".gold_img.p5_character_01");
        var targetAnimate2 = $(".gold_img.p5_character_02");
        var targetAnimate3 = $(".gold_img.p5_character_03");
        var targetAnimate4 = $(".p5_bubble");
        var targetAnimate5 = $(".gold_finish_btn");
        var targetAnimate6 = $(".time_box");

        targetAnimate1.css({"margin-left" : "-200px" , "opacity" : "0"});
        targetAnimate2.css({"margin-left" : "200px" , "opacity" : "0"});
        targetAnimate3.css({"margin-top" : "100px" , "opacity" : "0"});
        targetAnimate4.css({"margin-top" : "200px" , "margin-left" : "-50px" , "width" : "200px" , "height" : "111px" , "opacity" : "0"});
        targetAnimate5.css({"margin-top" : "-20px" , "opacity" : "0"});
        targetAnimate6.css({"margin-top" : "20px" , "opacity" : "0"});

        $(targetAnimate1).stop().delay(200).animate({"margin-left" : "0px", "opacity" : "1"}, 1400, "swing");
        $(targetAnimate2).stop().delay(200).animate({"margin-left" : "0px", "opacity" : "1"}, 1400, "swing");
        $(targetAnimate3).stop().delay(600).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");
        $(targetAnimate4).stop().delay(1000).animate({"margin-top" : "0px" , "margin-left" : "0px" , "width" : "606px" , "height" : "300px" , "opacity" : "1"}, 500, "swing");
        $(targetAnimate5).stop().delay(1200).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");
        $(targetAnimate6).stop().delay(600).animate({"margin-top" : "0px", "opacity" : "1"}, 700, "swing");
    } else if(motionPage == "hide"){
        gold_animatePage.hide();
    }
};
//타이머 셋
goldenBell.printTime = function() {
    var timeLayer = $('.time');

    var m =  Math.floor(this.totalTime / 60);
    var s = this.totalTime % 60;

    if (m === 0){
        timeLayer.text(s+"초");
    } else {
        timeLayer.text(m+"분"+s+"초");
    }
};
//스케일 셋팅
goldenBell.setScale = function () {
    var containerEl = document.getElementById("wrap");
    var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var hRatio = windowW / containerEl.clientWidth;
    var vRatio = windowH / containerEl.clientHeight;

    function setTransform(containerEl, hRatio, vRatio) {

        containerEl.setAttribute("style", "transform: scale(" + hRatio + "," + vRatio + ");"
            + "-ms-transform: scale(" + hRatio + "," + vRatio + ");"
            + "-webkit-transform: scale(" + hRatio + "," + vRatio + ");"
            + "transform-origin: 0% 0%; -ms-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%;");
    }
    setTransform(containerEl, hRatio, vRatio);
};
//정답저장
goldenBell.saveUserCheck = function(boolean){
    console.log('saveUserCheck boolean ::: ' , boolean , '::::' , this.answerCheckArray);


    this.answerCheckArray[this.viewSlideNum - 1] = boolean.toString();

    if(this.viewSlideNum == this.slideLayers.length){
        this.slideStatus = 'end';
        this.gold_Animate('hide');
        this.checkUserArray();
    } else {
        this.slideStatus = 'start';
    }
};
//정답체크
goldenBell.checkUserArray = function(){

    var tempStr = '';

    for ( var i = 0; this.answerCheckArray.length > i; i++ ){
        tempStr = this.answerCheckArray[i];
    }

    if( tempStr == 'true' ){
        goldenBell.gold_Animate('hide');
        goldenBell.gold_Animate('allright');
    } else {
        goldenBell.gold_Animate('hide');
        goldenBell.gold_Animate('replay');
    }
};
//정답 array 생성
goldenBell.makeCheckArray = function(slideLen){

    var tempStr = '';

    for(var i = 0; i < slideLen; i++){
        console.log(i);
        tempStr += 'false';
        if(i < slideLen-1) tempStr += ',';
    }

    return tempStr.split(',');
};
//타이머 스타트
goldenBell.timerStart = function(){
    this.timeCnt = this.timeMaxSetting;
    this.setTimer = setInterval(this.countDown , 1000);
};
//타이머 엔드
goldenBell.timerEnd = function(){
    if(this.setTimer) {
        this.timerNumLayer.text(this.timeMaxSetting);
        clearInterval(this.setTimer);
        this.timeCnt = this.timeMaxSetting;
    }
};
//시간 체크
goldenBell.countDown = function () {
    goldenBell.timeCnt--;
    goldenBell.totalTime++;

    //종료 로직
    if(goldenBell.timeCnt === 0) {
        clearInterval(goldenBell.setTimer);
        goldenBell.timeCnt = goldenBell.timeMaxSetting;
        goldenBell.saveUserCheck(false);

        if(goldenBell.slideStatus != 'end'){
            goldenBell.gold_Animate('next');
        }

        if(goldenBell.viewSlideNum == 1){
            document.querySelector('.gold_btn.gold_prev_btn').style.display = 'none';
        } else {
            document.querySelector('.gold_btn.gold_prev_btn').style.display = 'block';
        }

        if(goldenBell.viewSlideNum == goldenBell.slideLayers.length){
            document.querySelector('.gold_btn.gold_next_btn').style.display = 'none';
        } else {
            document.querySelector('.gold_btn.gold_next_btn').style.display = 'block';
        }
    }
    goldenBell.timerNumLayer.text(goldenBell.timeCnt);
};

//슬라이드 리셋
goldenBell.slideReset = function(){

    location.reload();

    // this.gold_Animate('hide');
    // this.showDivs(1 , false);
    // this.slideStatus = 'start';
    // this.answerCheckArray = this.makeCheckArray(this.slideLayers.length);
};