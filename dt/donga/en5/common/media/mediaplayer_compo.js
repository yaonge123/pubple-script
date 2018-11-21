// version 1.0.67.5 : 디버그 : 페이지 단위 스크롤(parseFloat)
// mediaplayer_compo_mpText mp_text
var mediaplayer_compo_mpText = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_neutralized_init = false; // 이벤트 무효화
        var b_neutralized_current;

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# mpText.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.mpText_onInit();

                        // 커서 포인터
                        if ($(_parent._ele()).hasClass("neutralize") == false) { $(_parent._ele()).css("cursor", "pointer"); }

                        // 버튼
                        if ($(_parent._ele()).hasClass("noSound") == false) {
                                $(_parent._ele()).click(function (event) {
                                        // 조건검사
                                        if (event.target.noSound == true) { return; }

                                        // 이벤트
                                        _this.onButtonClick();
                                        event.stopImmediatePropagation();
                                });

                                // 차일드 준비
                                tools_prepareChild(_parent._ele());
                        }

                        // 무효화 설정
                        if ($(_parent._ele()).hasClass("neutralize") == true) { _this.setNeutralize(true); }

                        // 초기화
                        _this.onReset();
                },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# mpText.onReset()"); }

                        //
                        b_neutralized_current = b_neutralized_init;
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# mpText.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || b_neutralized_current == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# mpText.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 리셋 올
                        resetAllMediaPlayer();

                        // 대기중
                        if (_parent._module().core.i_media_state() == 0) {
                                _parent._module().core.castPlay();
                                return;
                        }

                        // 로딩됨
                        if (_parent._module().core.i_media_state() == 1) {
                                _parent._module().core.castStop();
                                _parent._module().core.castPlay();
                        }
                },

                // 제어 반응
                onCastPlay: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# mpText.onCastPlay()"); }

                        //
                        if ($(_parent._ele()).hasClass("colorOn") == false) { $(_parent._ele()).addClass("colorOn") }
                },
                onCastStop: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# mpText.onCastStop()"); }

                        //
                        if ($(_parent._ele()).hasClass("colorOn") == true) { $(_parent._ele()).removeClass("colorOn") }
                },

                ///// function

                // 무효화 상태 설정
                setNeutralize: function (b) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# mpText.setNeutralize(" + b + ")"); }

                        //
                        b_neutralized_init = b_neutralized_current = b;
                },
        }
}

// mediaplayer_compo_btnPlay 재생버튼
var mediaplayer_compo_btnPlay = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_neutralize = false; // 무력화

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnPlay.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.btnPlay_onInit();

                        // 버튼
                        $(_parent._hierarchy().btnPlay).css("cursor", "pointer");
                        $(_parent._hierarchy().btnPlay).click(function (event) { _this.onButtonClick("btnPlay", 0, event.target); })
                },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnPlay.onReset()"); }

                        //
                        b_neutralize = false;
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnPlay.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || _parent._module().core.i_media_state() < 0 || b_neutralize == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnPlay.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 동작
                        if ($(btn).hasClass("btnPlay") == true) { _parent._module().core.castPlay(); }
                        else { _parent._module().core.castPause(); }
                },

                // UI 갱신
                onUpdateUI: function (str) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnPlay.onUpdateUI(" + str + ") try"); }

                        // 조건검사 : 미디어 로딩 미완
                        if (_parent._module().core.b_loaded_media() == false && str == null) {
                                _this.onUpdateUI("onPause");
                                return;
                        }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnPlay.onUpdateUI(" + str + ")"); }

                        // 준비
                        var btn = _parent._hierarchy().btnPlay;

                        // 파라미터 갱신
                        if (str != null) {
                                switch (str) {
                                        case "onPlay": // 재생 상태로 (일시정지 모양)
                                                if ($(btn).hasClass("btnPlay") == true) {
                                                        $(btn).removeClass("btnPlay");
                                                        $(btn).addClass("btnPause");
                                                }
                                                break;
                                        case "onPause": // 준비 상태로 (화살표 모양)
                                                if ($(btn).hasClass("btnPause") == true) {
                                                        $(btn).removeClass("btnPause");
                                                        $(btn).addClass("btnPlay");
                                                }
                                                break;
                                }
                        }

                        // 참조 갱신
                        if (str == null) {
                                if (_parent._media().paused == true) { _this.onUpdateUI("onPause"); }
                                else { _this.onUpdateUI("onPlay"); }
                        }
                },

                ///// function

                // 무력화
                setNeutralize: function (b) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnPlay.setNeutralize(" + b + ")"); }

                        //
                        b_neutralize = b;
                },
        }
}

// mediaplayer_compo_btnStop 정지버튼
var mediaplayer_compo_btnStop = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_neutralize = false; // 무력화

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnStop.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.btnStop_onInit();

                        // 버튼
                        $(_parent._hierarchy().btnStop).css("cursor", "pointer");
                        $(_parent._hierarchy().btnStop).click(function (event) { _this.onButtonClick("btnStop", 0, event.target); })

                        // UI 갱신
                        _this.onUpdateUI("off");
                },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnStop.onReset()"); }

                        //
                        b_neutralize = false;
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnStop.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || _parent._module().core.b_loaded_media() == false || b_neutralize == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnStop.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 동작
                        _parent._module().core.castStop();
                },

                // UI 갱신
                onUpdateUI: function (str) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnStop.onUpdateUI(" + str + ") try"); }

                        // 조건검사
                        if (b_neutralize == true) { return; }

                        // 조건검사 : 미디어 로딩 미완
                        if (_parent._module().core.b_loaded_media() == false && str == null) {
                                _this.onUpdateUI("off");
                                return;
                        }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnStop.onUpdateUI(" + str + ")"); }

                        // 준비
                        var btn = _parent._hierarchy().btnStop;

                        // 파라미터 갱신
                        if (str != null) {
                                switch (str) {
                                        case "on": tools_setOn(btn, true); break; // 기능 유효
                                        case "off": tools_setOn(btn, false); break; // 기능 무효        
                                }
                        }

                        // 참조 갱신
                        if (str == null) {
                                if (_parent._media().paused == true && tools_isCTZero(_parent._media().currentTime) == true) { _this.onUpdateUI("off"); }
                                else { _this.onUpdateUI("on"); }
                        }
                },

                // 무력화
                setNeutralize: function (b) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnStop.setNeutralize(" + b + ")"); }

                        //
                        b_neutralize = b;
                },
        }
}

// mediaplayer_compo_btnMove 이동버튼(FWD, BWD)
var mediaplayer_compo_btnMove = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnMove.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.btnMove_onInit();

                        // 버튼
                        $(_parent._hierarchy().btnMoveForward).css("cursor", "pointer");
                        $(_parent._hierarchy().btnMoveForward).click(function (event) { _this.onButtonClick("btnMove", MOVE_TIME_FWD, event.target); });
                        $(_parent._hierarchy().btnMoveBackward).css("cursor", "pointer");
                        $(_parent._hierarchy().btnMoveBackward).click(function (event) { _this.onButtonClick("btnBack", MOVE_TIME_BWD, event.target); });
                },

                ///// event

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnMove.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || _parent._module().core.b_loaded_media() == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnMove.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 동작
                        var target = _parent._media().currentTime + idx;
                        if (target < 0) { target = 0; }
                        if (target > _parent._media().duration) { target = _parent._media().duration - 0.1; }
                        _parent._module().core.castMove(target);
                },
        }
}

// mediaplayer_compo_barTime 시간막대
var mediaplayer_compo_barTime = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_neutralize = false; // 무력화
        var b_drag_bar = false; // 드래그 상태
        var b_drag_inplay; // 드래그 전에 재생 상태

        ///// function

        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# barTime.init()"); }

                        // 초기화
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.barTime_onInit();

                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // 이벤트
                        $(hie.barTime.toucharea).css("cursor", "pointer");
                        $(hie.barTime.toucharea).mousedown(function (event) { _this.onBarTimeMouseDown(event); });
                        $(document).mousemove(function (event) { _this.onDocumentMouseMove(event); });
                        $(document).mouseup(function (event) { _this.onDocumentMouseUp(); });
                        hie.barTime.toucharea.addEventListener("dragend", _this.onDocumentMouseUp); // 커서가 not-allowed? 아이콘으로 변할 때 대비

                        // 식별자
                        hie.barTime.toucharea.cat = "time";

                        // 마커 및 진행막대 이벤트 금지
                        $(hie.barTime.current).css("pointer-events", "none");
                        $(hie.barTime.marker).css("pointer-events", "none");
                },

                // 참조
                b_drag_bar: function () { return b_drag_bar; },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# barTime.onReset()"); }

                        //
                        b_neutralize = false;
                },

                // 마우스 이벤트
                onBarTimeMouseDown: function (event) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# barTime.onBarTimeMouseDown(" + event + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || _parent._module().core.b_loaded_media() == false || b_neutralize == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# barTime.onBarTimeMouseDown(" + event + ")"); }

                        // 갱신
                        this.onBarNudged(event);

                        // 플래그
                        b_drag_inplay = (_parent._media().paused) ? false : true;
                        b_drag_bar = true;

                        // 멈춤
                        _parent._module().core.castPause();
                },
                onDocumentMouseMove: function (event) {
                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || b_drag_bar == false) { return; }

                        //
                        this.onBarNudged(event);
                },
                onDocumentMouseUp: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# barTime.onDocumentMouseUp() try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || b_drag_bar == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# barTime.onDocumentMouseUp()"); }

                        // 플래그
                        b_drag_bar = false;

                        // 재시작
                        if (b_drag_inplay == true) { _parent._module().core.castPlay(); }
                },
                onBarNudged: function (event) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# barTime.onBarNudged(" + event + ") try"); }

                        // 준비
                        var target = event.target;
                        var xx = event.offsetX;

                        // 조건검사
                        if (target.cat != "time") { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# barTime.onBarNudged(" + event + ")"); }

                        // 계산
                        var duration = _parent._media().duration;
                        var ratio = xx / $(_parent._hierarchy().barTime.back).width();

                        // 값 제한
                        if (ratio > 1) { ratio = 1; }
                        if (ratio < 0) { ratio = 0; }

                        // 이동
                        _parent._module().core.castMove(duration * ratio);
                },

                // UI 갱신
                onUpdateUI: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var media = _parent._media();

                        // 조건검사
                        if (_parent._module().core.b_loaded_media() == false || b_neutralize == true) {
                                // 초기화
                                $(hie.barTime.current).css("width", "0%");
                                $(hie.barTime.marker).css("left", REVISE_TIMEBAR_MARKER + "px");

                                // 중단
                                return;
                        }

                        // 참조 갱신
                        $(hie.barTime.current).css("width", ((media.currentTime / media.duration) * 100) + "%");
                        $(hie.barTime.marker).css("left", $(hie.barTime.back).width() * (media.currentTime / media.duration) + REVISE_TIMEBAR_MARKER);
                },

                ///// function

                // 무력화
                setNeutralize: function (b) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# barTime.setNeutralize(" + b + ")"); }

                        //
                        b_neutralize = b;
                },
        }
}

// mediaplayer_compo_laeTime 시간레이블
var mediaplayer_compo_laeTime = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_neutralize = false; // 무력화

        ///// function

        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# laeTime.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.laeTime_onInit();

                        // 레이블 포인터
                        $(_parent._hierarchy().laeTime).css("cursor", "default");
                },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# laeTime.onReset()"); }

                        //
                        b_neutralize = false;
                },

                // UI 갱신
                onUpdateUI: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var media = _parent._media();

                        // 아직 준비 안됨
                        if (_parent._module().core.b_loaded_media() == false || b_neutralize == true) {
                                // 코어 상태별 메세지
                                switch (_parent._module().core.i_media_state()) {
                                        case -2: hie.laeTime.textContent = "Load Failure."; break;
                                        case -1: hie.laeTime.textContent = "Loading..."; break;
                                        case 0: hie.laeTime.textContent = "--:-- / --:--"; break;
                                }

                                // 중단
                                return;
                        }

                        // 참조 갱신
                        var current_min = tools_leadingZeros(Math.floor(media.currentTime / 60), 2);
                        var current_sec = tools_leadingZeros(Math.floor(media.currentTime % 60), 2);
                        var duration_min = tools_leadingZeros(Math.floor(media.duration / 60), 2);
                        var duration_sec = tools_leadingZeros(Math.floor(media.duration % 60), 2);
                        hie.laeTime.textContent = current_min + ":" + current_sec + " / " + duration_min + ":" + duration_sec;
                },

                ///// function

                // 무력화
                setNeutralize: function (b) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# laeTime.setNeutralize(" + b + ")"); }

                        //
                        b_neutralize = b;
                },
        }
}

// mediaplayer_compo_volume 볼륨
var mediaplayer_compo_volume = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_drag_bar = false; // 드래그 상태
        var b_vol_sound; // 사운드 on/off 상태
        var f_vol_set; // 설정된 볼륨
        var f_vol_current; // 실 볼륨

        ///// function

        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.init()"); }

                        // 초기화
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.volume_onInit();

                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // 버튼
                        $(hie.btnSound).css("cursor", "pointer");
                        $(hie.btnSound).click(function (event) { _this.onButtonClick("btnSound", 0, event.target); })

                        // 이벤트
                        $(hie.barVolume.toucharea).css("cursor", "pointer");
                        $(hie.barVolume.toucharea).mousedown(function (event) { _this.onBarTimeMouseDown(event); });
                        $(document).mousemove(function (event) { _this.onDocumentMouseMove(event); });
                        $(document).mouseup(function (event) { _this.onDocumentMouseUp(); });
                        hie.barVolume.toucharea.addEventListener("dragend", _this.onDocumentMouseUp); // 커서가 not-allowed? 아이콘으로 변할 때 대비

                        // 식별자
                        hie.barVolume.toucharea.cat = "vol";

                        // 마커 및 진행막대 이벤트 금지
                        $(hie.barVolume.current).css("pointer-events", "none");
                        $(hie.barVolume.marker).css("pointer-events", "none");
                },

                // 참조
                f_vol_current: function () { return f_vol_current; },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.onReset()"); }

                        // 상태
                        b_vol_sound = true;
                        f_vol_set = 1.0;
                        f_vol_current = f_vol_set;

                        // 모듈 갱신
                        _this.updateModule();
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 변수
                        if (b_vol_sound == true) { // 사운드 off
                                b_vol_sound = false;
                                f_vol_current = 0;
                        } else { // on
                                b_vol_sound = true;
                                f_vol_current = f_vol_set;
                        }

                        // 모듈 갱신
                        _this.updateModule();
                },

                // 마우스 이벤트
                onBarTimeMouseDown: function (event) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.onBarTimeMouseDown(" + event + ") try"); }

                        // 조건검사
                        if (b_vol_sound == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.onBarTimeMouseDown(" + event + ")"); }

                        // 갱신
                        this.onBarNudged(event);

                        // 플래그
                        b_drag_bar = true;
                },
                onDocumentMouseMove: function (event) { if (b_drag_bar == true) { this.onBarNudged(event); } },
                onDocumentMouseUp: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.onDocumentMouseUp() try"); }

                        // 조건검사
                        if (b_drag_bar == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.onDocumentMouseUp()"); }

                        // 플래그
                        b_drag_bar = false;
                },
                onBarNudged: function (event) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.onBarNudged(" + event + ") try"); }

                        // 준비
                        var target = event.target;
                        var xx = event.offsetX;

                        // 조건검사
                        if (target.cat != "vol") { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.onBarNudged(" + event + ")"); }

                        // 계산
                        f_vol_set = xx / $(_parent._hierarchy().barVolume.back).width();

                        // 값 제한
                        if (f_vol_set > 1) { f_vol_set = 1.0; }
                        if (f_vol_set < 0) { f_vol_set = 0.0; }

                        // 변수
                        f_vol_current = f_vol_set;

                        // 갱신
                        _this.updateModule();
                },

                ///// function

                // 전체화면에서 조정한 볼륨 동기화
                syncVolume: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.syncVolume()"); }

                        // 동기화
                        b_vol_sound = !_parent._media().muted;
                        f_vol_set = _parent._media().volume;
                        f_vol_current = (b_vol_sound == true) ? f_vol_set : 0;

                        // 갱신
                        _this.updateModule();
                },

                // 모듈 갱신
                updateModule: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.updateModule()"); }

                        // 준비
                        var hie = _parent._hierarchy();
                        var btn = hie.btnSound;

                        // 음소거 버튼
                        tools_setOn(btn, b_vol_sound);

                        // 볼륨
                        $(hie.barVolume.current).css("width", (f_vol_current * 100) + "%");
                        $(hie.barVolume.marker).css("left", $(hie.barVolumeBack).width() * (f_vol_current * 100) + REVISE_VOLUME_MARKER);

                        // 동작
                        _parent._module().core.setVolume(f_vol_current);
                },

                // 설정 수집, 적용
                getState: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.getState()"); }

                        // 준비
                        obj = {};

                        // 수집
                        obj.b_vol_sound = b_vol_sound;
                        obj.f_vol_set = f_vol_set;
                        obj.f_vol_current = f_vol_current;

                        // 초기화
                        _parent._module().core.setVolume(1);

                        // 반환
                        return obj;
                },
                setState: function (obj) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# volume.setState(" + obj + ")"); }

                        // 적용
                        b_vol_sound = obj.b_vol_sound;
                        f_vol_set = obj.f_vol_set;
                        f_vol_current = obj.f_vol_current;

                        // 갱신
                        _this.updateModule();
                },
        }
}

// mediaplayer_compo_repeat 구간반복
var mediaplayer_compo_repeat = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var f_repeat_start = -1; // 시작 시간
        var f_repeat_end = -1; // 끝 시간
        var b_repeat_on = false; // 반복 여부

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# repeat.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.repeat_onInit();

                        // 준비
                        var hie = _parent._hierarchy();

                        // 버튼
                        $(hie.btnRepeatStart).css("cursor", "pointer");
                        $(hie.btnRepeatEnd).css("cursor", "pointer");
                        $(hie.btnRepeatStart).click(function (event) { _this.onButtonClick("btnRepeatStart", 0, event.target); })
                        $(hie.btnRepeatEnd).click(function (event) { _this.onButtonClick("btnRepeatEnd", 0, event.target); })
                },

                // 참조
                b_repeat_on: function () { return b_repeat_on; },
                f_repeat_start: function () { return f_repeat_start; },
                f_repeat_end: function () { return f_repeat_end; },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# repeat.onReset()"); }

                        // 변수
                        b_repeat_on = false;
                        f_repeat_start = -1;
                        f_repeat_end = -1;

                        // 갱신
                        _this.updateModule();
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# repeat.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || _parent._module().core.b_loaded_media() == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# repeat.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 분기
                        switch (tag) {
                                case "btnRepeatStart":
                                        if (f_repeat_start == -1) { f_repeat_start = _parent._media().currentTime; }
                                        else { f_repeat_start = -1; }
                                        break;
                                case "btnRepeatEnd":
                                        if (f_repeat_end == -1) { f_repeat_end = _parent._media().currentTime; }
                                        else { f_repeat_end = -1; }
                                        break;
                        }

                        // 모듈 갱신
                        _this.updateModule();
                },

                ///// function

                // 모듈 갱신
                updateModule: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# repeat.updateModule()"); }

                        // 준비
                        var btnStart = _parent._hierarchy().btnRepeatStart;
                        var btnEnd = _parent._hierarchy().btnRepeatEnd;

                        // 갱신
                        if (f_repeat_start != -1) { tools_setOn(btnStart, true); }
                        else { tools_setOn(btnStart, false); }
                        if (f_repeat_end != -1) { tools_setOn(btnEnd, true); }
                        else { tools_setOn(btnEnd, false); }

                        // 변수
                        if (f_repeat_start != -1 && f_repeat_end != -1) {
                                if (f_repeat_start > f_repeat_end) {
                                        var temp = f_repeat_end;
                                        f_repeat_end = f_repeat_start;
                                        f_repeat_start = temp;
                                }
                                b_repeat_on = true;
                        } else {
                                b_repeat_on = false;
                        }

                        // 마커
                        if (_parent._module().barTime != null) {
                                // 준비
                                var hie = _parent._hierarchy();
                                var media = _parent._media();
                                var markerStart = hie.barTime.markerRepeatStart;
                                var markerEnd = hie.barTime.markerRepeatEnd;

                                // 갱신
                                if (f_repeat_start != -1) {
                                        $(markerStart).css("left", $(hie.barTime.back).width() * (f_repeat_start / media.duration) + REVISE_REPEAT_MARKER);
                                        $(markerStart).css("display", "inline-block");
                                } else {
                                        $(markerStart).css("display", "none");
                                }
                                if (f_repeat_end != -1) {
                                        $(markerEnd).css("left", $(hie.barTime.back).width() * (f_repeat_end / media.duration) + REVISE_REPEAT_MARKER);
                                        $(markerEnd).css("display", "inline-block");
                                } else {
                                        $(markerEnd).css("display", "none");
                                }

                                // 타임바도 갱신
                                _parent._module().barTime.onUpdateUI();
                        }
                },

                // 설정 수집, 적용
                getState: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# repeat.getState()"); }

                        // 준비
                        obj = {};

                        // 수집
                        obj.f_repeat_start = f_repeat_start;
                        obj.f_repeat_end = f_repeat_end;
                        obj.b_repeat_on = b_repeat_on;

                        // 반환
                        return obj;
                },
                setState: function (obj) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# repeat.setState(" + obj + ")"); }

                        // 적용
                        f_repeat_start = obj.f_repeat_start;
                        f_repeat_end = obj.f_repeat_end;
                        b_repeat_on = obj.b_repeat_on;

                        // 갱신
                        _this.updateModule();
                },
        }
}

// mediaplayer_compo_loop 루프
var mediaplayer_compo_loop = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_loop_on; // 반복 상태

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# loop.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.loop_onInit();

                        // 준비
                        var hie = _parent._hierarchy();

                        // 버튼
                        $(hie.btnLoop).css("cursor", "pointer");
                        $(hie.btnLoop).click(function (event) { _this.onButtonClick("btnLoop", 0, event.target); })
                },

                // 참조
                b_loop_on: function () { return b_loop_on; },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# loop.onReset()"); }

                        // 상태
                        b_loop_on = false;

                        // 모듈 갱신
                        _this.updateModule();
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# loop.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 변수
                        b_loop_on = !b_loop_on;

                        // 모듈 갱신
                        _this.updateModule();
                },

                ///// function

                // 모듈 갱신
                updateModule: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# loop.updateModule()"); }

                        // 준비
                        var btn = _parent._hierarchy().btnLoop;

                        // 갱신
                        tools_setOn(btn, b_loop_on);

                        // 조건검사
                        _parent._module().core.setLoop(b_loop_on);
                },

                // 설정 수집, 적용
                getState: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# loop.getState()"); }

                        // 준비
                        obj = {};

                        // 수집
                        obj.b_loop_on = b_loop_on;

                        // 초기화
                        _parent._module().core.setLoop(false);

                        // 반환
                        return obj;
                },
                setState: function (obj) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# loop.setState(" + obj + ")"); }

                        // 적용
                        b_loop_on = obj.b_loop_on;

                        // 갱신
                        _this.updateModule();
                },
        }
}

// mediaplayer_compo_playbackrate 재생속도
var mediaplayer_compo_playbackrate = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var f_rate_set; // 현재 재생속도

        ///// function

        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# playbackrate.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.playbackrate_onInit();

                        // 준비
                        var hie = _parent._hierarchy();

                        // 버튼
                        $(hie.btnSlow).css("cursor", "pointer");
                        $(hie.btnFast).css("cursor", "pointer");
                        $(hie.btnSlow).click(function (event) { _this.onButtonClick("btnSlow", 0, event.target); event.stopImmediatePropagation(); })
                        $(hie.btnFast).click(function (event) { _this.onButtonClick("btnFast", 0, event.target); event.stopImmediatePropagation(); })

                        // 타입별 분기
                        if (OPTION_PLAYBACKRATE_TYPE == 0) {
                                $(hie.laePlaybackrate).css("cursor", "default");
                        } else if (OPTION_PLAYBACKRATE_TYPE == 1) {
                                // 버튼 추가
                                $(hie.btnNormal).css("cursor", "pointer");
                                $(hie.btnNormal).click(function (event) { _this.onButtonClick("btnNormal", 0, event.target); event.stopImmediatePropagation(); });
                        } else if (OPTION_PLAYBACKRATE_TYPE == 2) {
                                // 버튼 추가
                                $(hie.btnNormal).css("cursor", "pointer");
                                $(hie.btnNormal).click(function (event) { _this.onButtonClick("btnNormal", 0, event.target); event.stopImmediatePropagation(); });
                                $(hie.btnPlaybackrate).click(function (event) { _this.onButtonClick("btnPlaybackrate", 0, event.target); });
                        }
                },

                // 참조
                f_rate_set: function () { return f_rate_set; },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# playbackrate.onReset()"); }

                        // 상태f_playbackrate
                        f_rate_set = 1.0;

                        // 모듈 갱신
                        _this.updateModule();
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# playbackrate.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 분기
                        switch (OPTION_PLAYBACKRATE_TYPE) {
                                case 0:
                                        switch (tag) {
                                                case "btnSlow": f_rate_set -= 0.1; break;
                                                case "btnFast": f_rate_set += 0.1; break;
                                        }
                                        break;
                                case 1:
                                        switch (tag) {
                                                case "btnSlow": f_rate_set = OPTION_PLAYBACKRATE_VALUE_SLOW; break;
                                                case "btnNormal": f_rate_set = 1.0; break;
                                                case "btnFast": f_rate_set = OPTION_PLAYBACKRATE_VALUE_FAST; break;
                                        }
                                        break;
                                case 2:
                                        switch (tag) {
                                                case "btnPlaybackrate": // 드랍다운 메뉴 호출
                                                        setTimeout(function () { // 빈곳 클릭 대응 때문에 타임아웃
                                                                if ($(hie.menuPlaybackrate).css("display") == "none") { $(hie.menuPlaybackrate).css("display", "inline-block"); }
                                                                else { $(hie.menuPlaybackrate).css("display", "none"); }
                                                        }, 1);
                                                        break;
                                                case "btnSlow":
                                                        f_rate_set = OPTION_PLAYBACKRATE_VALUE_SLOW;
                                                        $(hie.menuPlaybackrate).css("display", "none");
                                                        break;
                                                case "btnNormal":
                                                        f_rate_set = 1.0;
                                                        $(hie.menuPlaybackrate).css("display", "none");
                                                        break;
                                                case "btnFast":
                                                        f_rate_set = OPTION_PLAYBACKRATE_VALUE_FAST;
                                                        $(hie.menuPlaybackrate).css("display", "none");
                                                        break;
                                        }
                                        break;
                        }

                        // 소수 보정
                        f_rate_set = (Math.round(f_rate_set * 10)) / 10;

                        // 값 제한
                        if (f_rate_set < 0.5) { f_rate_set = 0.5; }
                        if (f_rate_set > 2.0) { f_rate_set = 2.0; }

                        // 모듈 갱신
                        _this.updateModule();
                },

                ///// function

                // 모듈 갱신
                updateModule: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# playbackrate.updateModule()"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 레이블
                        switch (OPTION_PLAYBACKRATE_TYPE) {
                                case 0:
                                        // 준비
                                        var str = "x" + f_rate_set;

                                        // 문자열 보정
                                        str = str.substr(0, 4);
                                        if (f_rate_set == 1) { str = "x1.0"; }
                                        else if (f_rate_set == 2) { str = "x2.0"; }

                                        // 레이블
                                        hie.laePlaybackrate.textContent = str;
                                        break;
                                case 1:
                                        // 모두 해제
                                        tools_setOn(hie.btnSlow, false);
                                        tools_setOn(hie.btnNormal, false);
                                        tools_setOn(hie.btnFast, false);

                                        // 설정
                                        switch (f_rate_set) {
                                                case OPTION_PLAYBACKRATE_VALUE_SLOW: tools_setOn(hie.btnSlow, true); break;
                                                case 1.0: tools_setOn(hie.btnNormal, true); break;
                                                case OPTION_PLAYBACKRATE_VALUE_FAST: tools_setOn(hie.btnFast, true); break;
                                        }
                                        break;
                                case 2:
                                        // 모두 해제
                                        tools_setClass(hie.btnPlaybackrate, "btnPlaybackrateFast", false);
                                        tools_setClass(hie.btnPlaybackrate, "btnPlaybackrateNormal", false);
                                        tools_setClass(hie.btnPlaybackrate, "btnPlaybackrateSlow", false);

                                        // 설정
                                        switch (f_rate_set) {
                                                case OPTION_PLAYBACKRATE_VALUE_SLOW: tools_setClass(hie.btnPlaybackrate, "btnPlaybackrateSlow", true); break;
                                                case 1.0: tools_setClass(hie.btnPlaybackrate, "btnPlaybackrateNormal", true); break;
                                                case OPTION_PLAYBACKRATE_VALUE_FAST: tools_setClass(hie.btnPlaybackrate, "btnPlaybackrateFast", true); break;
                                        }
                                        break;
                        }

                        // 조건검사
                        _parent._module().core.setPlaybackRate(f_rate_set);
                },

                // 설정 수집, 적용
                getState: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# playbackrate.getState()"); }

                        // 준비
                        obj = {};

                        // 수집
                        obj.f_rate_set = f_rate_set;

                        // 초기화
                        _parent._module().core.setPlaybackRate(1);

                        // 반환
                        return obj;
                },
                setState: function (obj) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# playbackrate.setState(" + obj + ")"); }

                        // 적용
                        f_rate_set = obj.f_rate_set;

                        // 갱신
                        _this.updateModule();
                },
        }
}

// mediaplayer_compo_fullscreen 전체화면
var mediaplayer_compo_fullscreen = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_control_init = false; // IE 이상동작 대응(control = true 를 한 번 해 줘야 함)
        var b_fullscreen_on = false; // 현재 전체화면 상태

        ///// function

        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.fullscreen_onInit();

                        // 준비
                        var hie = _parent._hierarchy();

                        // 버튼
                        $(hie.btnFullscreen).css("cursor", "pointer");
                        $(hie.btnFullscreen).click(function (event) { _this.onButtonClick("btnFullscreen", 0, event.target); })

                        // 갱신
                        _this.updateModule();
                },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.onReset()"); }

                        // 변수
                        b_fullscreen_on = false;

                        // 갱신
                        if (_parent._option().fullscreen_target == false) { _this.castToNormalScreen(); }

                        // IE 이상동작 대응
                        if (b_control_init == false && _parent._media() != null) {
                                b_control_init = true;
                                _parent._media().controls = true;
                                setTimeout(function () { _parent._media().controls = false; }, 50);
                        }

                        // 버튼 가시여부
                        setTimeout(function () { _this.updateBtnVisible(); }, 1);
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        //
                        if (VIDEO_CUSTOM_FULLSCREEN == true) {
                                if (_parent._option().fullscreen_target == true) { _this.castToNormalScreen(); }
                                else { _this.castToFullscreen(); }
                        } else { // 프레임 변경 또는 네이티브 일 때는 일괄 처리
                                _this.castToFullscreen();
                        }
                },

                ///// event

                // 전체화면 변동 : 프레임 변경을 통한 전체화면 동작 시 강제로 발생 시킬 것.
                onFullscreenchange: function () {
                        // 조건검사
                        if (_parent._id() != id_fullscreen) { return; }

                        // 개발
                        if (dev_mode == true && dev_trace_event == true) { console.log("@ " + _parent._id() + ": fullscreen.onFullscreenchange()" + _parent._file()); }

                        // 전달
                        if (document.fullscreen == true) { _this.onFullscreen(); }
                        else { _this.onNormalscreen(); }
                },
                onWebkitfullscreenchange: function () {
                        // 조건검사
                        if (_parent._id() != id_fullscreen) { return; }

                        // 개발
                        if (dev_mode == true && dev_trace_event == true) { console.log("@ " + _parent._id() + ": fullscreen.onWebkitfullscreenchange()" + _parent._file()); }

                        // 전달
                        if (document.webkitIsFullScreen == true) { _this.onFullscreen(); }
                        else { _this.onNormalscreen(); }
                },
                onMozfullscreenchange: function () {
                        // 조건검사
                        if (_parent._id() != id_fullscreen) { return; }

                        // 개발
                        if (dev_mode == true && dev_trace_event == true) { console.log("@ " + _parent._id() + ": fullscreen.onMozfullscreenchange()" + _parent._file()); }

                        // 전달
                        if (document.mozIsFullScreen == true) { _this.onFullscreen(); }
                        else { _this.onNormalscreen(); }
                },
                onMSFullscreenChange: function () {
                        // 조건검사
                        if (_parent._id() != id_fullscreen) { return; }

                        // 개발
                        if (dev_mode == true && dev_trace_event == true) { console.log("@ " + _parent._id() + ": fullscreen.onMSFullscreenChange()" + _parent._file()); }

                        // 전달
                        if (document.msFullscreenElement != null) { _this.onFullscreen(); }
                        else { _this.onNormalscreen(); }
                },
                onFullscreen: function () {
                        // 개발
                        if (dev_mode == true && dev_trace_event == true) { console.log("@ " + _parent._id() + ": fullscreen.onFullscreen()" + _parent._file()); }

                        // 변수
                        b_fullscreen_on = true;

                        // 네이티브 컨트롤
                        _parent._media().controls = true;
                        if (_parent._media().paused == true) {
                                _parent._media().play();
                                _parent._media().pause();
                        }

                        // UI 갱신
                        _this.updateModule();
                },
                onNormalscreen: function () {
                        // 개발
                        if (dev_mode == true && dev_trace_event == true) { console.log("@ " + _parent._id() + ": fullscreen.onNormalscreen()" + _parent._file()); }

                        // 변수
                        b_fullscreen_on = false;

                        // 네이티브 컨트롤
                        _parent._media().controls = false;

                        // UI 갱신
                        _this.updateModule();

                        // 전체화면에서 조정한 내용 동기화
                        if (_parent._module().volume != null) { _parent._module().volume.syncVolume(); }
                        if (_parent._module().cover != null) {
                                if (_parent._media().paused == false) { _parent._module().cover.updateModule(false); }
                        }
                },

                // onEnded
                onEnded: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.onEnded()"); }

                        //
                        if (b_fullscreen_on == true) { _this.castToNormalScreen(); }
                },

                ///// function

                // 전체화면
                castToFullscreen: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.castToFullscreen() try"); }

                        // 조건검사
                        if (_parent._module().core.b_loaded_media() == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.castToFullscreen()"); }

                        // 커스텀 풀스크린
                        if (VIDEO_CUSTOM_FULLSCREEN == true) {
                                // moveMedia 를 위한 기본 정보
                                var obj = _parent.getMediaAndSleep();

                                // data 와 subtitle 도 옮기기 위한 추가 정보
                                obj.to_fullscreen = true; // 판단 플래그
                                obj.core = 0; // 리로드
                                obj.data_tag = _parent._tag().data;
                                castCustomFullscreen(_parent._option().fullscreen_style, obj);
                                return;
                        }

                        // 이하 네이티브 풀스크린

                        // 준비
                        var media = _parent._media();

                        // ID 기억 (document 이벤트에서 구분해 내기 위함)
                        id_fullscreen = _parent._id();

                        // 분기
                        if (tools_chkMobileOS() == "ios") {
                                if (media.webkitEnterFullScreen) {
                                        media.webkitEnterFullScreen();
                                        return;
                                }
                        } else {
                                if (media.requestFullscreen) { media.requestFullscreen(); }
                                else if (media.mozRequestFullScreen) { media.mozRequestFullScreen(); }
                                else if (media.webkitRequestFullscreen) { media.webkitRequestFullscreen(); }
                                else if (media.msRequestFullscreen) { media.msRequestFullscreen(); }
                        }
                },
                castToNormalScreen: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.castToNormalScreen() try"); }

                        // 조건검사
                        if (_parent._module().core.b_loaded_media() == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.castToNormalScreen()"); }

                        // 커스텀 풀스크린
                        if (VIDEO_CUSTOM_FULLSCREEN == true && _parent._option().fullscreen_target == true) {
                                var obj = _parent.getMediaAndSleep();
                                castCustomNormalscreen(_parent._received(), obj);
                                return;
                        }

                        // 이하 네이티브 풀스크린

                        // 준비
                        var media = _parent._media();

                        // 분기
                        if (tools_chkMobileOS() == true) {
                                if (media.webkitExitFullscreen) {
                                        media.webkitExitFullscreen();
                                        return;
                                }
                        } else {
                                if (document.exitFullscreen) { document.exitFullscreen(); }
                                else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
                                else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
                                else if (document.msExitFullscreen) { document.msExitFullscreen(); }
                        }
                },

                // 모듈 갱신
                updateModule: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.updateModule()"); }

                        // 준비
                        var hie = _parent._hierarchy();
                        var btn = hie.btnFullscreen;

                        // 갱신
                        if (VIDEO_CUSTOM_FULLSCREEN == true) { tools_setOn(btn, _parent._option().fullscreen_target); }
                        else { tools_setOn(btn, b_fullscreen_on); }

                        // 전달
                        if (_parent._module().btnPlay != null) { _parent._module().btnPlay.onUpdateUI(); }
                },

                // 풀스크린 버튼 숨기기
                updateBtnVisible: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# fullscreen.updateBtnVisible()"); }

                        // 판단
                        var is_visible = true;
                        if (_parent._module().follow != null && _parent._module().follow.b_current_follow() == true) { is_visible = false; }
                        if (_parent._module().roleplay != null && _parent._module().roleplay.i_roleplay_show() == 1) { is_visible = false; }
                        if (_parent._module().btnChange != null && _parent._module().btnChange.i_current_media() == 1) { is_visible = false; }
                        if (_parent._module().btnAnotherChange != null && _parent._module().btnAnotherChange.i_current_media() == 1) { is_visible = false; }

                        // 
                        if (is_visible == true) { $(_parent._hierarchy().btnFullscreen).css("visibility", "visible"); }
                        else { $(_parent._hierarchy().btnFullscreen).css("visibility", "hidden"); }
                }
        }
}

// mediaplayer_compo_cover 커버(포스터&큰재생버튼)
var mediaplayer_compo_cover = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_neutralize = false; // 무력화

        // system
        var b_cover_hide_on_play = VIDEO_COVER_HIDE_ON_PLAY; // 재생 중 커버버튼 숨김 여부
        var b_cover_hide_on_out = VIDEO_COVER_HIDE_ON_OUT; // 밖으로 나가면 커버버튼 숨김 여부
        var b_control_hide_on_stop = VIDEO_CONTROL_HIDE_ON_STOP; // 멈춤 중 컨트롤 숨김 여부
        var b_control_hide_on_out = VIDEO_CONTROL_HIDE_ON_OUT; // 밖으로 나가면 컨트롤 숨김 여부
        var b_activated = false; // 활성화 상태
        var b_show_current; // 현재 가시여부
        var b_out_once; // 한번 나갔는지 체크
        var id_timeout_update_module; // 모듈 갱신 중복 실행을 막기 위한 타임아웃
        var id_timeout_hide_btncover; // 커버버튼숨김 타임아웃
        var id_timeout_hide_control; // 인아웃숨김 타임아웃

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.cover_onInit();

                        // 예외처리
                        if (_parent._option().exception.coverhideonplay != null) { b_cover_hide_on_play = (_parent._option().exception.coverhideonplay == "true") ? true : false; }
                        if (_parent._option().exception.coverhideonout != null) { b_cover_hide_on_out = (_parent._option().exception.b_cover_hide_ocoverhideonoutn_out == "true") ? true : false; }
                        if (_parent._option().exception.controlhideonstop != null) { b_control_hide_on_stop = (_parent._option().exception.controlhideonstop == "true") ? true : false; }
                        if (_parent._option().exception.controlhideonout != null) { b_control_hide_on_out = (_parent._option().exception.controlhideonout == "true") ? true : false; }

                        // 버튼
                        if (VIDEO_EXIST_BTN_COVER == true) {
                                $(_parent._hierarchy().btnCover).css("cursor", "pointer");
                                $(_parent._hierarchy().btnCover).click(function (event) { _this.onButtonClick("btnCover", 0, event.target); })

                                // 마우스 무브 이벤트 연결 (모바일에서는 금지)
                                if (b_cover_hide_on_out == true) {
                                        if (tools_chkMobileOS() == "N/A") {
                                                document.addEventListener("mousemove", function (event) {
                                                        // 조건검사
                                                        if (b_activated == false) { return; }

                                                        // 준비
                                                        var hie = _parent._hierarchy();

                                                        // 인아웃 판단
                                                        var inout = tools_chkInout(event, hie.mediaContainer, VIDEO_INOUT_MARGIN_COVER);

                                                        // 가시여부
                                                        if (inout == true) {
                                                                if (b_out_once == true) {
                                                                        b_out_once = false;
                                                                        clearTimeout(id_timeout_hide_btncover);
                                                                        _this.updateBtnCover();
                                                                        $(hie.btnCover).css("display", "inline-block");
                                                                }
                                                        } else {
                                                                b_out_once = true;
                                                                clearTimeout(id_timeout_hide_btncover);
                                                                id_timeout_hide_btncover = setTimeout(function () {
                                                                        if (b_show_current == false) { $(hie.btnCover).css("display", "none"); }
                                                                }, 50);
                                                        }
                                                });
                                        }
                                }
                        }

                        // 컨트롤 인아웃숨김기능
                        if (b_control_hide_on_out == true) {
                                // 마우스 무브 이벤트 연결 (모바일에서는 금지)
                                if (tools_chkMobileOS() == "N/A") {
                                        document.addEventListener("mousemove", function (event) {
                                                // 조건검사
                                                if (b_activated == false) { return; }
                                                if (_parent._module().core.b_disable_input() == true || _parent._module().core.i_media_state() != 1) { return; }
                                                if (b_control_hide_on_stop == true && _parent._media().paused == true && tools_isCTZero(_parent._media().currentTime) == true) { return; }

                                                // 준비
                                                var hie = _parent._hierarchy();

                                                // 인아웃 판단
                                                var inout = tools_chkInout(event, hie.mediaContainer, VIDEO_INOUT_MARGIN_COVER);

                                                // 가시여부
                                                if (inout == true) {
                                                        clearTimeout(id_timeout_hide_control);
                                                        _this.setControlVisible(true);
                                                } else {
                                                        clearTimeout(id_timeout_hide_control);
                                                        id_timeout_hide_control = setTimeout(function () { _this.setControlVisible(false); }, 50);
                                                }
                                        });
                                }

                                // 일단 숨김
                                _this.setControlVisible(false);
                        }

                        // 갱신
                        _this.setPoster();
                        _this.updateModule(true);
                },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.onReset()"); }

                        // 변수
                        b_neutralize = false;
                        b_out_once = false;

                        // 가시
                        _this.updateModule(true);
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || b_neutralize == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 변수
                        b_out_once = false;

                        // 갱신
                        _this.updateModule(false);

                        // 재생
                        if (_parent._module().core.i_media_state() != 1 || _parent._media().paused == true) { _parent._module().core.castPlay(); }
                        else { _parent._module().core.castPause(); }

                        // 커버버튼 갱신
                        _this.updateBtnCover();
                },

                // 음원 교체
                onCastChangeMedia: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.onCastChangeMedia()"); }

                        //
                        _this.setPoster();
                        _this.updateModule(true);
                },

                // 인터랙션
                onInteraction: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.onInteraction()"); }

                        // 갱신
                        _this.updateBtnCover();

                        // 커버버튼 처리
                        var media = _parent._media();
                        var onfollow = (_parent._module().follow != null && _parent._module().follow.b_show_bar() == true);
                        var is_stop;
                        if (typeof (SHOW_COVER_BTN_ON_PAUSE) != "undefined" && SHOW_COVER_BTN_ON_PAUSE == true && onfollow == false) { is_stop = _parent._media().paused; }
                        else { is_stop = (_parent._media().paused == true && tools_isCTZero(_parent._media().currentTime) == true); }
                        _this.updateModule(is_stop);
                },

                ///// function

                // 설정
                setPoster: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.setPoster() try"); }

                        // 조건검사
                        if (_parent._file() == null || _parent._file() == "") { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.setPoster()"); }

                        // 포스터
                        var file_tail = _parent._option().exist_btnChange.split("@")[0];
                        var target_file = tools_getSourceFileName(_parent._file(), file_tail);

                        var file_another_tail = _parent._option().exist_btnAnotherChange.split("@")[0];
                        target_file = tools_getSourceFileName(target_file, file_another_tail);

                        $(_parent._hierarchy().poster).css("background-image", "url(" + PATH_IMAGE_POSTER + target_file + ".png)");

                        // 비디오 사이즈
                        tools_setVideoSize(_parent._ele(), _parent._hierarchy().poster);
                        if (VIDEO_EXIST_BTN_COVER == true) { tools_setVideoSize(_parent._ele(), _parent._hierarchy().btnCover); }

                        // 변수
                        b_activated = true;
                },

                // 갱신
                updateModule: function (show) {
                        if (id_timeout_update_module != null) { clearTimeout(id_timeout_update_module); }
                        id_timeout_update_module = setTimeout(function () { _this.updateModule_exe(show); }, 10);
                },
                updateModule_exe: function (show) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.updateModule_exe(" + show + ") try"); }

                        // 조건검사
                        if (b_neutralize == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.updateModule(" + show + ")"); }

                        // 준비
                        var hie = _parent._hierarchy();
                        var media = _parent._media();

                        // 변수
                        b_show_current = show;
                        id_timeout_update_module = null;

                        // 제어
                        if (show == true) {
                                // 커버버튼 가시여부
                                if (VIDEO_EXIST_BTN_COVER == true) {
                                        $(hie.btnCover).css("display", "inline-block");
                                        tools_setVideoSize(_parent._ele(), _parent._hierarchy().btnCover);
                                        if ($(hie.btnCover).hasClass("pause") == true) {
                                                $(hie.btnCover).removeClass("pause");
                                                $(hie.btnCover).addClass("play");
                                        }
                                }

                                // 컨트롤 가시여부
                                if (b_control_hide_on_stop == true) { _this.setControlVisible(false); }

                                // 포스터
                                if (_parent._module().core.b_loaded_media() == true && tools_isCTZero(media.currentTime) == true) { $(hie.poster).css("display", "inline-block"); }
                        } else {
                                // 커버버튼 가시여부
                                if (VIDEO_EXIST_BTN_COVER == true && b_cover_hide_on_play == true && _parent._media().paused == false) { $(hie.btnCover).css("display", "none"); }

                                // 컨트롤 가시여부
                                if (b_control_hide_on_stop == true) { _this.setControlVisible(true); }

                                // 포스터 가시여부 : castMove 와 동시에 동작할 경우 잠시 첫 화면이 보일 수 있어서 넣은 보정
                                setTimeout(function () { $(hie.poster).css("display", "none"); }, 50);
                        }
                },

                // 커버버튼 갱신
                updateBtnCover: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.updateBtnCover() try"); }

                        // 조건검사
                        if (_parent._file() == null || _parent._file() == "") { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.updateBtnCover()"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 분기
                        setTimeout(function () {
                                if (_parent._media() == null || _parent._media().paused == false) {
                                        if ($(hie.btnCover).hasClass("play") == true) { $(hie.btnCover).removeClass("play"); }
                                        $(hie.btnCover).addClass("pause");
                                } else {
                                        if ($(hie.btnCover).hasClass("pause") == true) { $(hie.btnCover).removeClass("pause"); }
                                        $(hie.btnCover).addClass("play");
                                }
                        }, 50);
                },

                // 컨트롤 가시 여부 설정(한줄 자막과도 연계됨)
                setControlVisible: function (b) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.setControlVisible(" + b + " )"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 분기
                        if (b) {
                                $(hie.controlsBG).css("display", "inline-block");
                                $(hie.mediaControls).css("display", "inline-block");
                        } else {
                                $(hie.controlsBG).css("display", "none");
                                $(hie.mediaControls).css("display", "none");
                        }

                        // 전달
                        if (_parent._module().subtitle != null) { _parent._module().subtitle.onControlVisible(b); }
                },

                // 설정 수집, 적용
                getState: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.getState()"); }

                        // 준비
                        obj = {};

                        // 수집
                        obj.b_show_current = b_show_current;

                        // 변수
                        b_activated = false;

                        // 반환
                        return obj;
                },
                setState: function (obj) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.setState(" + obj + ")"); }

                        // 적용
                        b_show_current = obj.b_show_current;

                        // 재설정
                        _this.setPoster();

                        // 갱신
                        _this.updateModule(b_show_current);
                },

                // 무력화
                setNeutralize: function (b) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# cover.setNeutralize(" + b + ")"); }

                        //
                        b_neutralize = b;
                },
        }
}

// mediaplayer_compo_subtitle 자막
var mediaplayer_compo_subtitle = function (p_parent) {
        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_is_video = false; // 자막넣는 형식을 판단 - false:오디오(준비된 엘리먼트 on/off 형식), true:비디오(엘리먼트에 내용 넣는 형식)
        var i_subtitle_show = 0; // 자막 가시 여부(0:안보임, 1:보임)
        var i_language_current = 0; // 언어 상태(0:둘다안보임, 1:영어, 2:한글, 3:영어+한글)
        var i_fontsize_current = 0; // 폰트사이즈 (곱하기 값)
        var time_text_end = -1; // 텍스트 클릭 후 일시정지 예약 시간
        var b_text_end = false; // 따라말하기용 플래그(예약 일시정지 후 TIMEOUT_FORCE_TIMEUPDATE * 1.5 시간
        var revise_time_text_end = 0; // 일시정지 예약 시간 보정 (플랫폼 특수 예외 대응)
        var idx_current_highlight = -1; // 현재 하이라이트 된 객체(하이라이트 해제를 위해 기억)
        var b_ready_page_scroll = false; // 페이지 스크롤 관련 준비 여부
        var i_subtitle_init_y; // 한줄 자막 inout 으로 위치 변경될때 기준 위치
        var f_block_ct_error = -1; // time_text_end 와 동일한 값 들어감
        var id_block_ct_error_timeout; // 타임아웃

        // obj
        var obj_subtitle_container; // 자막 엘리먼트 컨테이너 (가시여부 조정 용)
        var dic_subtitle_target; // 자막 엘리먼트 (subtitle_'미디어플레이어id' 로 검색. null 이면 관련 기능 동작 안함)
        var ar_subtitle_sync; // 자막 시간 정보 (mp_data.data_'미디어플레이어id' 로 검색. null 이면 관련 기능 동작 안함)
        var ar_subtitle_dialogue; // 자막 대본 정보 (비디오 전용)

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.init()"); }

                        // 연결
                        _this = this;

                        // 준비
                        var hie = _parent._hierarchy();

                        // 접근자
                        _parent._tag().data = ($(_parent._ele()).attr("data-data") != null) ? $(_parent._ele()).attr("data-data") : "data_" + _parent._file();
                        _parent._tag().subtitle = ($(_parent._ele()).attr("data-subtitle") != null) ? $(_parent._ele()).attr("data-subtitle") : "subtitle_" + _parent._id();

                        // 커스터마이저
                        _parent._module().customizer.subtitle_onInit();

                        // 데이터 준비
                        tools_setMediaData();

                        // 설정
                        _this.setSubtitle();

                        // 변수
                        i_subtitle_show = 0;
                        i_language_current = 1;
                        if ((hie.btnLanKor == null && hie.btnLanEng == null && hie.btnSubtitle == null) || _parent._option().exist_btnSubtitle == 1 || b_is_video == false) { i_subtitle_show = 1; }
                        if (_parent._option().exception.initLanguage != null) {
                                i_language_current = parseInt(_parent._option().exception.initLanguage);
                                if (i_language_current == 0) { i_subtitle_show = 0; }
                                else { i_subtitle_show = 1; }
                        } else {
                                if ((hie.btnLanKor != null || hie.btnLanEng != null) && b_is_video == true) { i_language_current = 0; }
                        }
                        revise_time_text_end = (tools_chkBrowser() == "ie10" || tools_chkBrowser() == "ie11") ? REVISE_TEXT_END_ON_IE : 0;

                        // 부속품
                        if (hie.btnSubtitle != null) { $(hie.btnSubtitle).click(function (event) { _this.onButtonClick("btnSubtitle", 0, event.target); }) }
                        if (hie.btnLanguage != null) { $(hie.btnLanguage).click(function (event) { _this.onButtonClick("btnLanguage", 0, event.target); }) }
                        if (hie.btnLanKor != null) { $(hie.btnLanKor).click(function (event) { _this.onButtonClick("btnLanKor", 0, event.target); }) }
                        if (hie.btnLanEng != null) { $(hie.btnLanEng).click(function (event) { _this.onButtonClick("btnLanEng", 0, event.target); }) }
                        if (hie.btnFontsizeUp != null) {
                                $(hie.btnFontsizeUp).click(function (event) { _this.onButtonClick("btnFontsize", 1, event.target); });
                                $(hie.btnFontsizeDown).click(function (event) { _this.onButtonClick("btnFontsize", -1, event.target); });
                        }

                        // UI 갱신
                        _this.updateUI();
                },

                // 참조
                time_text_end: function () { return time_text_end; },
                b_text_end: function () { return b_text_end; },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.onReset()"); }

                        // 예약 해제
                        time_text_end = -1;
                        b_text_end = false;
                        i_fontsize_current = 0;

                        // 하이라이트 해제
                        _this.releaseHighlight();

                        // 준비
                        var hie = _parent._hierarchy();

                        // 변수
                        i_subtitle_show = 0;
                        i_language_current = 1;
                        if ((hie.btnLanKor == null && hie.btnLanEng == null && hie.btnSubtitle == null) || _parent._option().exist_btnSubtitle == 1 || b_is_video == false) { i_subtitle_show = 1; }
                        if (_parent._option().exception.initLanguage != null) {
                                i_language_current = parseInt(_parent._option().exception.initLanguage);
                                if (i_language_current == 0) { i_subtitle_show = 0; }
                                else { i_subtitle_show = 1; }
                        } else {
                                if ((hie.btnLanKor != null || hie.btnLanEng != null) && b_is_video == true) { i_language_current = 0; }
                        }

                        // 갱신
                        _this.updateUI();
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 준비
                        var hie = _parent._hierarchy();
                        var kr = $(hie.btnLanKor != null) ? true : false;
                        var en = $(hie.btnLanEng != null) ? true : false;

                        // 분기
                        switch (tag) {
                                case "btnSubtitle":
                                        if (i_subtitle_show == 1) { i_subtitle_show = 0; }
                                        else if (i_subtitle_show == 0) { i_subtitle_show = 1; }
                                        break;
                                case "btnLanguage":
                                        // 동작
                                        if (i_language_current == 3) { i_language_current = 1; }
                                        else { i_language_current = 3; }
                                        break;
                                case "btnLanKor":
                                        switch (i_language_current) {
                                                case 0: i_language_current = 2; break;
                                                case 1: i_language_current = 3; break;
                                                case 2: i_language_current = 0; break;
                                                case 3: i_language_current = 1; break;
                                        }
                                        if (i_language_current == 0) { i_subtitle_show = 0; }
                                        else { i_subtitle_show = 1; }
                                        break;
                                case "btnLanEng":
                                        switch (i_language_current) {
                                                case 0: i_language_current = 1; break;
                                                case 1: i_language_current = 0; break;
                                                case 2: i_language_current = 3; break;
                                                case 3: i_language_current = 2; break;
                                        }
                                        if (i_language_current == 0) { i_subtitle_show = 0; }
                                        else { i_subtitle_show = 1; }
                                        break;
                                case "btnFontsize":
                                        // 조건검사
                                        if (i_subtitle_show == 0) { return; }

                                        // 변수
                                        i_fontsize_current += idx;

                                        // 값 제한
                                        if (i_fontsize_current < SUBTITLE_FONTSIZE_MIN) { i_fontsize_current = SUBTITLE_FONTSIZE_MIN; }
                                        if (i_fontsize_current > SUBTITLE_FONTSIZE_MAX) { i_fontsize_current = SUBTITLE_FONTSIZE_MAX; }
                                        break;
                        }

                        // 버튼 누른거 있으면 스크롤 재정의
                        b_ready_page_scroll = false;

                        // 갱신
                        _this.updateUI();

                        // 스크롤 갱신을 위해
                        var temp_current = idx_current_highlight;
                        idx_current_highlight = -1;
                        _this.setHighlight(temp_current);
                },

                // 음원 교체
                onCastChangeMedia: function (p_data, p_subtitle) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.onCastChangeMedia(" + p_data + ", " + p_subtitle + ")"); }

                        // 이벤트 해제
                        $.each(dic_subtitle_target, function (key, val) {
                                var ko = $(val).find(".tKor")[0];
                                if (ko != null) {
                                        $(ko).css("cursor", "default");
                                        $(ko).unbind("click");
                                }

                                // 영어 문장
                                var en = $(val).find(".tEng")[0];
                                if (en != null) {
                                        $(en).css("cursor", "default");
                                        $(en).unbind("click");
                                }
                        });

                        // 접근자
                        _parent._tag().data = (p_data != null) ? p_data : "data_" + _parent._file();
                        _parent._tag().subtitle = (p_subtitle != null) ? p_subtitle : "subtitle_" + _parent._id();

                        // 초기화
                        dic_subtitle_target = null;
                        ar_subtitle_sync = null;
                        ar_subtitle_dialogue = null;
                        b_ready_page_scroll = false;

                        // 설정
                        _this.setSubtitle();

                        // 갱신
                        _this.updateUI();
                },

                // 재생 갱신 이벤트
                onTimeUpdate: function () {
                        // 조건검사
                        if (ar_subtitle_sync == null) { return; }

                        // 준비
                        var time = _parent._media().currentTime;

                        // 이상동작 방어
                        if (f_block_ct_error != -1 && time < f_block_ct_error) { return; }

                        // 스크롤 처리 : 초기화 상태이고 스크롤 있으면 스크롤 원복
                        if (obj_subtitle_container != null) {
                                if (tools_isCTZero(time) == true && _parent._media().paused == true && _parent._option().subtitle_scroll == true) {
                                        if (SUBTITLE_CUSTOME_SCROLL == true) { $(obj_subtitle_container).find("scrollContent").mCustomScrollbar("scrollTo", 0); }
                                        else { $($(obj_subtitle_container).find(".scroll_detail")[0]).scrollTop(0); }
                                }
                        }

                        // 검색
                        var idx = tools_getPositionInArray(ar_subtitle_sync, time);

                        // 하이라이트
                        if (idx == -1 || tools_isCTZero(time) == true) { _this.releaseHighlight(); }
                        else { _this.setHighlight(idx); }

                        // 예약 일시정지
                        if (time_text_end != -1 && time > time_text_end + revise_time_text_end) {
                                if (_parent._module().barTime != null) {
                                        _parent._module().core.castMove(time_text_end + revise_time_text_end + 0.01);
                                        _parent._module().core.castPause();
                                } else {
                                        _parent._module().core.castStop();
                                }
                                time_text_end = -1;
                                b_text_end = true;
                                setTimeout(function () { b_text_end = false; }, TIMEOUT_FORCE_TIMEUPDATE * 1.5);
                        }
                },

                // 사용자 인터랙션 (예약 제거를 위함)
                onInteraction: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.onInteraction()"); }

                        //
                        time_text_end = -1;
                },

                // 컨트롤 가시여부에 반응
                onControlVisible: function (b) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.onControlVisible(" + b + ") try"); }

                        // 조건검사
                        if (b_is_video == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.onControlVisible(" + b + ")"); }

                        // 초기화
                        if (i_subtitle_init_y == null) { i_subtitle_init_y = parseInt($(obj_subtitle_container).css("top")); }

                        // 위치 조정
                        if (b == true) { // 컨트롤 있음 : 기준위치
                                $(obj_subtitle_container).css("top", i_subtitle_init_y);
                        } else {
                                var hh = $(_parent._hierarchy().mediaControls).css("height");
                                var to = i_subtitle_init_y + parseInt(hh);
                                $(obj_subtitle_container).css("top", to);
                        }
                },

                ///// function

                // 설정
                setSubtitle: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.setSubtitle()"); }

                        // 카테고리 판단
                        b_is_video = (_parent._category() == "video");

                        // 예외처리
                        if (_parent._option().exception.elementsubtitle == true) { b_is_video = false; }

                        // 대상 정리
                        obj_subtitle_container = $("#" + _parent._tag().subtitle)[0];
                        dic_subtitle_target = $(obj_subtitle_container).find(".caption");
                        if (dev_trace_null == true && obj_subtitle_container == null) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 subtitle 엘리먼트가 준비되어 있지 않습니다."); }

                        // 대상 이벤트 연결
                        if (b_is_video == false) {
                                $.each(dic_subtitle_target, function (key, val) {
                                        // 한글 문장 - "pointer-events", "none" 을 쓰지 않는 이유 : IE10 에서 동작 안 함
                                        var ko = $(val).find(".tKor")[0];
                                        if (ko != null) {
                                                /* 한글은 클릭 반응 안함
                                                ko.idx = key;
                                                $(ko).css("cursor", "pointer");
                                                $(ko).click(function (event) { _this.onSubtitleClick(event.target); })
                                                */
                                                ko.fontsize_ko = parseInt($(ko).css("font-size"));
                                        }
                                        // 영어 문장
                                        var en = $(val).find(".tEng")[0];
                                        if (en != null) {
                                                if (b_is_video == false && $(en).hasClass("noSound") == false) {
                                                        if (_parent._option().no_text_event == false) { // 특수예외처리
                                                                en.idx = key;
                                                                $(en).css("cursor", "pointer");

                                                                $(en).click(function (event) {
                                                                        _this.onSubtitleClick(event.target);
                                                                        event.stopImmediatePropagation();
                                                                })

                                                                // 차일드 준비
                                                                tools_prepareChild(en, key);
                                                        }
                                                }
                                                en.fontsize_en = parseInt($(en).css("font-size"));
                                        }
                                });
                        }

                        // 기본 폰트 사이즈 기억
                        $.each(dic_subtitle_target, function (key, val) {
                                // 한글 문장
                                var ko = $(val).find(".tKor")[0];
                                if (ko != null) { ko.fontsize_ko = parseInt($(ko).css("font-size")); }

                                // 영어 문장
                                var en = $(val).find(".tEng")[0];
                                if (en != null) { en.fontsize_en = parseInt($(en).css("font-size")); }
                        });

                        // 데이터 변수에 대입
                        var tag_data = _parent._tag().data;
                        var tag_subtitle = _parent._tag().subtitle;
                        ar_subtitle_sync = (dicMediaData == null || dicMediaData[tag_data] == null || dicMediaData[tag_data].subtitle == null) ? null : dicMediaData[tag_data].subtitle;
                        if (dev_trace_null == true && ar_subtitle_sync == null) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 자막 data 의 subtitle 이 준비되어 있지 않습니다."); }
                        if (b_is_video == true) {
                                ar_subtitle_dialogue = (dicMediaData == null || dicMediaData[tag_data] == null || dicMediaData[tag_data].dialogue == null) ? null : dicMediaData[tag_data].dialogue;
                                if (dev_trace_null == true && ar_subtitle_dialogue == null) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 자막 data 의 dialogue 가 준비되어 있지 않습니다."); }
                        }

                        // 개발
                        if (dev_mode == true && dev_data == true) {
                                console.log("===== M.P. Subtitle =====");
                                console.log("tag : " + tag_data + " / " + tag_subtitle + "\n\texist target : " + (obj_subtitle_container != null) + "\n\texist data : " + (ar_subtitle_sync != null));
                                console.log("=========================");
                        }
                },

                // 텍스트 클릭
                onSubtitleClick: function (text) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.onSubtitleClick(" + text + ") try"); }

                        // 조건검사
                        if (text.noSound == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.onSubtitleClick(" + text + ")"); }

                        // 준비
                        var idx = text.idx;

                        // 이상동작 방어
                        f_block_ct_error = ar_subtitle_sync[idx][1];
                        if (id_block_ct_error_timeout != null) {
                                clearTimeout(id_block_ct_error_timeout);
                                id_block_ct_error_timeout = null;
                        }
                        id_block_ct_error_timeout = setTimeout(function () {
                                f_block_ct_error = -1;
                                id_block_ct_error_timeout = null;
                        }, 50);

                        // 따라하기 이전 텍스트 방어
                        if (_parent._module().follow != null) { _parent._module().follow.onSubtitleClick(); }

                        // 재생&이동
                        var time = ar_subtitle_sync[idx][0];
                        _parent._module().core.castPlay();
                        _parent._module().core.castMove(time);

                        // 일시정지 예약
                        time_text_end = ar_subtitle_sync[idx][1];
                },

                // 하이라이트
                releaseHighlight: function () {
                        // 조건검사
                        if (idx_current_highlight == -1) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.releaseHighlight()"); }

                        // 효과 해제
                        if (b_is_video == false) { // 오디오
                                var target = dic_subtitle_target[idx_current_highlight];
                                if ($(target).hasClass("captionOn") == true) { $(target).removeClass("captionOn") }
                        } else { // 비디오
                                $(dic_subtitle_target[0]).find(".tEng")[0].innerHTML = "";
                                $(dic_subtitle_target[0]).find(".tKor")[0].innerHTML = "";
                        }

                        // 연결 해제
                        idx_current_highlight = -1;
                },
                setHighlight: function (idx) {
                        // 조건검사
                        if (idx_current_highlight == idx) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.setHighlight(" + idx + ")"); }

                        // 기존 해제
                        _this.releaseHighlight();

                        // 연결
                        idx_current_highlight = idx;

                        // 동작
                        if (b_is_video == false) { // 오디오
                                // 대상
                                var target = dic_subtitle_target[idx];

                                // 스크롤 있을 경우 스크롤
                                if (_parent._option().subtitle_scroll == true && time_text_end == -1) {
                                        // 준비
                                        if (b_ready_page_scroll == false) { _this.setPageScroll(); }

                                        // 찾아가기
                                        if (SUBTITLE_CUSTOME_SCROLL == true) {
                                                $(".popWrap.show").find("scrollContent").mCustomScrollbar("scrollTo", (target.page_top) * hq_scale_multiplier_y);
                                        } else if (typeof (SUBTITLE_PAGE_SCROLL) != "undefined" && SUBTITLE_PAGE_SCROLL == true) {
                                                var container = $(obj_subtitle_container).find(".scroll_detail")[0];
                                                $(container).scrollTop(target.zero);
                                        } else {
                                                var container = $(obj_subtitle_container).find(".scroll_detail")[0];
                                                $(container).scrollTop(target.targettop);
                                        }
                                }

                                // 효과 설정
                                if ($(target).hasClass("captionOn") == false) { $(target).addClass("captionOn") }
                        } else { // 비디오
                                // 적용
                                $(dic_subtitle_target[0]).find(".tEng")[0].innerHTML = ar_subtitle_dialogue[idx][0];
                                $(dic_subtitle_target[0]).find(".tKor")[0].innerHTML = ar_subtitle_dialogue[idx][1];

                                // 세로 축 중앙 정렬
                                if (typeof (SUBTITLE_VIDEO_ALIGN_PADDING_TOP) != "undefined") { _this.alignCenter(); }
                        }
                },

                // 페이지 스크롤 준비
                setPageScroll: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.setPageScroll()"); }

                        // 커스텀 스크롤
                        if (SUBTITLE_CUSTOME_SCROLL == true) {
                                // 관련값
                                var scr_content = $(obj_subtitle_container).find(".scrollContent")[0];
                                if (scr_content == null) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 스크롤 내에 scrollContent 가 존재하지 않습니다."); }
                                var con_height = parseInt($(scr_content).css("height")) * DEV.ui.scaleVal.y;
                                var page_height = con_height * SUBTITLE_PAGE_SCROLL_REF;
                                var zero_top = $(dic_subtitle_target[0]).offset().top;

                                // 판단
                                var target_top = 0; // 유효 판단을 위해 기록
                                var target_page = -1; // 페이지 (변동이 있으면 기록)
                                var page_top = 0; // 페이지 맨 위를 판단할 탑
                                for (var ii = 0 ; ii < dic_subtitle_target.length ; ii++) {
                                        // 관련값
                                        var target = dic_subtitle_target[ii];
                                        var offset_top = $(target).offset().top;
                                        target_top = offset_top - zero_top;
                                        var page = parseInt(target_top / page_height);
                                        if (target_page != page) {
                                                target_page = page;
                                                page_top = target_top;
                                        }
                                        dic_subtitle_target[ii].page_top = page_top;
                                }

                                // 유효 판단
                                if (target_top != 0) { b_ready_page_scroll = true; }
                        } else {
                                // 관련값
                                var con_height = parseFloat($($(obj_subtitle_container).find(".scrollContent")[0]).css("height")) * DEV.ui.scaleVal.y;
                                var container = $(obj_subtitle_container).find(".scroll_detail")[0];
                                var zoomvalue = (parent.ZOOMVALUE == undefined) ? 1 : parent.ZOOMVALUE;
                                
                                // 초기화
                                $(container).scrollTop(0);

                                // 판단
                                var revise_zero = $(dic_subtitle_target[0]).offset().top * 1 / zoomvalue;
                                var current_zero = 0; // 현재 기준 위치
                                var current_page = 0;
                                for (var ii = 0 ; ii < dic_subtitle_target.length ; ii++) {
                                        var target = dic_subtitle_target[ii];
                                        var target_top = ($(target).offset().top * 1 / zoomvalue) - revise_zero;
                                        var target_height = parseFloat($(target).css("height"));
                                        if (target_top + target_height > current_zero + con_height) {
                                                current_page++;
                                                current_zero = target_top;
                                        }
                                        target.page = current_page;
                                        target.zero = current_zero;
                                        target.targettop = target_top;
                                }

                                // 유효 판단
                                //b_ready_page_scroll = true; // 괜찮으려나...
                        }
                },

                // 대사 강제 지정(follow 연동)
                setDialogue: function (idx) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.setDialogue(" + idx + ")"); }

                        // 비디오
                        if (b_is_video == true) {
                                // 적용
                                if (idx != null) {
                                        $(dic_subtitle_target[0]).find(".tEng")[0].innerHTML = ar_subtitle_dialogue[idx][0];
                                        $(dic_subtitle_target[0]).find(".tKor")[0].innerHTML = ar_subtitle_dialogue[idx][1];
                                        if (typeof (SUBTITLE_VIDEO_ALIGN_PADDING_TOP) != "undefined") { _this.alignCenter(); }
                                } else { // 해제
                                        $(dic_subtitle_target[0]).find(".tEng")[0].innerHTML = "";
                                        $(dic_subtitle_target[0]).find(".tKor")[0].innerHTML = "";
                                        idx_current_highlight = -1;
                                }
                        } else { // 오디오
                                // 적용
                                if (idx != null) { _this.setHighlight(idx); }
                                else { _this.releaseHighlight(); }
                        }
                },

                // UI 갱신
                updateUI: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.updateUI()"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 자막 가시 여부
                        switch (i_subtitle_show) {
                                case 0:
                                        // 컨테이너
                                        if (_parent._option().exception.disableCtrlSubtitleContainer != true) { tools_setShow(obj_subtitle_container, false); }

                                        // 자막 버튼
                                        if (hie.btnSubtitle != null) { tools_setOn(hie.btnSubtitle, false); }

                                        // 언어 버튼
                                        if (hie.btnLanguage != null) {
                                                $(hie.btnLanguage).css("display", "none");
                                                tools_setShow(hie.btnLanguage, false);
                                        }
                                        break;
                                case 1:
                                        // 컨테이너
                                        if (_parent._option().exception.disableCtrlSubtitleContainer != true) { tools_setShow(obj_subtitle_container, true); }

                                        // 자막 버튼
                                        if (hie.btnSubtitle != null && i_subtitle_show == 1) { tools_setOn(hie.btnSubtitle, true); }

                                        // 언어 버튼
                                        if (hie.btnLanguage != null) {
                                                switch (i_language_current) {
                                                        case 1:
                                                                $(hie.btnLanguage).css("display", "inline-block");
                                                                tools_setShow(hie.btnLanguage, true);
                                                                tools_setOn(hie.btnLanguage, false);
                                                                break;
                                                        case 3:
                                                                $(hie.btnLanguage).css("display", "inline-block");
                                                                tools_setShow(hie.btnLanguage, true);
                                                                tools_setOn(hie.btnLanguage, true);
                                                                break;
                                                        default:
                                                                $(hie.btnLanguage).css("display", "none");
                                                                tools_setShow(hie.btnLanguage, false);
                                                                break;
                                                }
                                        }
                        }

                        // 분기
                        if ((hie.btnLanguage == null && hie.btnLanEng == null && hie.btnLanKor == null) == false) {
                                switch (i_language_current) {
                                        case 0: // 둘다안보임
                                                // 한영 버튼
                                                if (hie.btnLanKor != null) { tools_setOn(hie.btnLanKor, false); }
                                                if (hie.btnLanEng != null) { tools_setOn(hie.btnLanEng, false); }

                                                // 자막
                                                $($(obj_subtitle_container).find(".tKor")).each(function (idx) { tools_setShow(this, false); });
                                                $($(obj_subtitle_container).find(".tEng")).each(function (idx) { tools_setShow(this, false); });
                                                break;
                                        case 1: // 영어
                                                // 한영 버튼
                                                if (hie.btnLanKor != null) { tools_setOn(hie.btnLanKor, false); }
                                                if (hie.btnLanEng != null) { tools_setOn(hie.btnLanEng, true); }

                                                // 자막
                                                $($(obj_subtitle_container).find(".tKor")).each(function (idx) { tools_setShow(this, false); });
                                                $($(obj_subtitle_container).find(".tEng")).each(function (idx) { tools_setShow(this, true); });
                                                break;
                                        case 2:
                                                // 한영 버튼
                                                if (hie.btnLanKor != null) { tools_setOn(hie.btnLanKor, true); }
                                                if (hie.btnLanEng != null) { tools_setOn(hie.btnLanEng, false); }

                                                // 자막
                                                $($(obj_subtitle_container).find(".tKor")).each(function (idx) { tools_setShow(this, true); });
                                                $($(obj_subtitle_container).find(".tEng")).each(function (idx) { tools_setShow(this, false); });
                                                break;
                                        case 3:
                                                // 한영 버튼
                                                if (hie.btnLanKor != null) { tools_setOn(hie.btnLanKor, true); }
                                                if (hie.btnLanEng != null) { tools_setOn(hie.btnLanEng, true); }

                                                // 자막
                                                $($(obj_subtitle_container).find(".tKor")).each(function (idx) { tools_setShow(this, true); });
                                                $($(obj_subtitle_container).find(".tEng")).each(function (idx) { tools_setShow(this, true); });
                                                break;
                                }
                        }

                        // 폰트사이즈
                        if (hie.btnFontsizeUp != null) {
                                $($(obj_subtitle_container).find(".tEng")).each(function (index) {
                                        var size = this.fontsize_en;
                                        size += SUBTITLE_FONTSIZE_MODIFY * i_fontsize_current;
                                        $(this).css("font-size", size + "px");
                                });
                                $($(obj_subtitle_container).find(".tKor")).each(function (index) {
                                        var size = this.fontsize_ko;
                                        size += SUBTITLE_FONTSIZE_MODIFY * i_fontsize_current;
                                        $(this).css("font-size", size + "px");
                                });
                        }

                        // 세로 축 중앙 정렬
                        if (b_is_video == true && typeof (SUBTITLE_VIDEO_ALIGN_PADDING_TOP) != 'undefined' && i_subtitle_show == 1) { _this.alignCenter(); }

                        // 페이지 스크롤 재정의 필요
                        if (typeof (SUBTITLE_PAGE_SCROLL) != "undefined" && SUBTITLE_PAGE_SCROLL == true && b_ready_page_scroll == true) {
                                b_ready_page_scroll = false;
                                idx_current_highlight = -1;
                                _this.onTimeUpdate();
                        }
                },

                // 세로 축 중앙 정렬
                alignCenter: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.alignCenter()"); }

                        // 조건검사
                        if (idx_current_highlight == -1) { return; }

                        // 패딩 관련 기준
                        var padding_reference = (i_language_current == 1 || i_language_current == 2) ? SUBTITLE_VIDEO_ALIGN_PADDING_TOP.center : SUBTITLE_VIDEO_ALIGN_PADDING_TOP.origin;

                        // 자막 보정값
                        var padding_revise = (ar_subtitle_dialogue[idx_current_highlight].length > 2) ? ar_subtitle_dialogue[idx_current_highlight][2] : 0;

                        // 적용
                        $($(obj_subtitle_container).find(".caption")[0]).css("padding-top", parseInt(padding_reference) + parseInt(padding_revise));
                },

                // 설정 수집, 적용
                getState: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.getState()"); }

                        // 준비
                        obj = {};

                        // 수집
                        obj.b_is_video = b_is_video;
                        obj.i_subtitle_show = i_subtitle_show;
                        obj.i_language_current = i_language_current;
                        obj.i_fontsize_current = i_fontsize_current;
                        obj.ar_subtitle_sync = [];
                        obj.ar_subtitle_dialogue = [];
                        $.extend(true, obj.ar_subtitle_sync, ar_subtitle_sync);
                        $.extend(true, obj.ar_subtitle_dialogue, ar_subtitle_dialogue);

                        // 반환
                        return obj;
                },
                setState: function (obj) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# subtitle.setState(" + obj + ")"); }

                        // 풀스크린 전용(데이터 옮기기)
                        if (_parent._option().fullscreen_target == true) {
                                ar_subtitle_sync = [];
                                ar_subtitle_dialogue = [];
                                $.extend(true, ar_subtitle_sync, obj.ar_subtitle_sync);
                                $.extend(true, ar_subtitle_dialogue, obj.ar_subtitle_dialogue);
                        }

                        // 적용
                        idx_current_highlight = -1;
                        if (b_is_video == obj.b_is_video) {
                                i_subtitle_show = obj.i_subtitle_show;
                                i_language_current = obj.i_language_current;
                                i_fontsize_current = obj.i_fontsize_current;
                        }

                        // 갱신
                        _this.updateUI();
                },
        }
}

// mediaplayer_compo_roleplay 롤플레이
var mediaplayer_compo_roleplay = function (p_parent) {
        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_roleplay_marker_event = false; // 마커 이벤트 붙였는지 여부
        var i_roleplay_amount = -1; // 롤플레이 롤 수
        var i_roleplay_show = -1; // 외부 버튼 컨테이너 가시 여부 -1:미사용 0:안보임 1:보임
        var id_timeout_set_marker = null; // 마커 갱신 재시도 timeout id

        // obj
        var ar_subtitle_sync; // 자막 시간 정보 (mp_data.data_'미디어플레이어id' 로 검색. null 이면 관련 기능 동작 안함)
        var ar_roleplay_ico; // 자막에 붙은 아이콘 배열
        var ar_roleplay_current; // 현재 롤플레이 상태 배열 (boolean 값으로 롤플레이 수 만큼 길이)
        var container_roleplay; // 외부 버튼 컨테이너

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.init()"); }

                        // 연결
                        _this = this;

                        // 준비
                        var hie = _parent._hierarchy();

                        // 접근자
                        _parent._tag().data = ($(_parent._ele()).attr("data-data") != null) ? $(_parent._ele()).attr("data-data") : "data_" + _parent._file();
                        _parent._tag().subtitle = ($(_parent._ele()).attr("data-subtitle") != null) ? $(_parent._ele()).attr("data-subtitle") : "subtitle_" + _parent._id();
                        _parent._tag().roleplay = ($(_parent._ele()).attr("data-roleplay") != null) ? $(_parent._ele()).attr("data-roleplay") : "roleplay_" + _parent._id();

                        // 커스터마이저
                        _parent._module().customizer.roleplay_onInit();

                        // 데이터 준비
                        tools_setMediaData();

                        // 버튼 연결
                        if (hie.btnRoleplayShow != null) {
                                // 변수
                                i_roleplay_show = 0;

                                // 이벤트 연결
                                $(hie.btnRoleplayShow).click(function (event) { _this.onButtonClick("btnRoleplayShow", 0, event.target); })
                        }

                        // 막대
                        if (hie.barRoleplay != null) { $(hie.barRoleplay).css("display", "none"); }

                        // 설정
                        _this.setRoleplay();

                        // 갱신
                        _this.onUpdateUI();
                },

                // 참조
                i_roleplay_show: function () { return i_roleplay_show; },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.onReset() try"); }

                        // 조건검사
                        if (ar_roleplay_current == null) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.onReset()"); }

                        // 예약 해제
                        for (var ii = 0 ; ii < ar_roleplay_current.length ; ii++) { ar_roleplay_current[ii] = true; }

                        // 외부 버튼
                        if (i_roleplay_show != -1) { i_roleplay_show = 0; }

                        // 막대
                        if (_parent._hierarchy().barRoleplay != null) { $(_parent._hierarchy().barRoleplay).css("display", "none"); }

                        // 갱신
                        _this.onUpdateUI();
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || _parent._module().core.b_loaded_media() == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 분기
                        switch (tag) {
                                case "btnRoleplayShow": // 외부 버튼 컨테이너 가시여부 조정 버튼
                                        if (i_roleplay_show == 0) {
                                                // 변수
                                                i_roleplay_show = 1;

                                                // 전달
                                                if (_parent._module().follow != null) { _parent._module().follow.onReset(); }
                                        }
                                        else if (i_roleplay_show == 1) {
                                                // 변수
                                                i_roleplay_show = 0;

                                                // 닫을 때 초기화
                                                for (var ii = 0 ; ii < ar_roleplay_current.length ; ii++) { ar_roleplay_current[ii] = true; }
                                        }

                                        // 풀스크린 버튼 숨기기
                                        if (_parent._module().fullscreen != null && typeof (HIDE_FULLSCREEN_BTN_ON_FOLLOW_OR_ROLEPLAY) != "undefined") {
                                                if (HIDE_FULLSCREEN_BTN_ON_FOLLOW_OR_ROLEPLAY == true) { _parent._module().fullscreen.updateBtnVisible(); }
                                        }

                                        // 정지
                                        _parent._module().core.castStop();
                                        break;
                                case "btnRoleplay": // 개별 버튼
                                        ar_roleplay_current[btn.role - 1] = !ar_roleplay_current[btn.role - 1];
                                        if (typeof (STOP_ON_ROLEPLAY_BTN) != "undefined" && STOP_ON_ROLEPLAY_BTN == true) { _parent._module().core.castStop(); }
                                        break;
                        }

                        // 갱신
                        _this.onUpdateUI();
                },

                // 음원 교체
                onCastChangeMedia: function (p_data, p_subtitle) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.onCastChangeMedia(" + p_data + ", " + p_subtitle + ")"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 마커 정리
                        if (_parent._module().barTime != null && hie.markerRoleplayArray != null) {
                                for (var ii = 0 ; ii < hie.markerRoleplayArray.length ; ii++) {
                                        $(hie.markerRoleplayArray[ii]).unbind("click");
                                        $(hie.markerRoleplayArray[ii]).remove();
                                }
                        }

                        // 버튼 정리
                        for (var ii = 0 ; ii < ROLEPLAY_MAX_AMOUNT ; ii++) {
                                $(hie.btnRoleplayArray[ii]).unbind("click");
                        }

                        // 접근자
                        _parent._tag().data = (p_data != null) ? p_data : "data_" + _parent._file();
                        _parent._tag().subtitle = (p_subtitle != null) ? p_subtitle : "subtitle_" + _parent._id();

                        // 초기화
                        b_roleplay_marker_event = false;
                        ar_subtitle_sync = null;
                        ar_roleplay_ico = null;

                        // 설정
                        _this.setRoleplay();

                        // 갱신
                        _this.onUpdateUI();
                },

                // UI 갱신
                onUpdateUI: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.onUpdateUI() try"); }

                        // 조건검사 : 미디어 로딩 미완
                        if (ar_roleplay_current == null) { return; }
                        if (_parent._module().core.b_loaded_media() == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.onUpdateUI()"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 버튼 갱신
                        for (var ii = 0 ; ii < ar_roleplay_current.length ; ii++) {
                                var btn = hie.btnRoleplayArray[ii];
                                if (ROLEPLAY_EXTERNAL_BTN == false) { tools_setOn(btn, ar_roleplay_current[ii]); } // 일반버튼
                                else { tools_setOn(btn, !ar_roleplay_current[ii]); } // 외부버튼 (on 상태가 반대)
                        }

                        // 외부 버튼
                        switch (i_roleplay_show) {
                                case 0:
                                        tools_setShow(container_roleplay, false);
                                        tools_setOn(hie.btnRoleplayShow, false);
                                        break;
                                case 1:
                                        tools_setShow(container_roleplay, true);
                                        tools_setOn(hie.btnRoleplayShow, true);
                                        break;
                        }

                        // 자막 아이콘 갱신
                        if (ar_roleplay_ico != null) {
                                for (var ii = 0 ; ii < ar_subtitle_sync.length ; ii++) {
                                        // 준비
                                        var role = ar_subtitle_sync[ii][2];
                                        var ico = ar_roleplay_ico[ii];

                                        // 갱신
                                        tools_setOn(ico, ar_roleplay_current[role - 1]);
                                }
                        }

                        // 마커 갱신
                        if (_parent._module().barTime != null && hie.markerRoleplayArray != null) {
                                // 반복
                                for (var ii = 0 ; ii < ar_subtitle_sync.length ; ii++) {
                                        // 특정
                                        var marker = hie.markerRoleplayArray[ii];

                                        // 준비
                                        var role = ar_subtitle_sync[ii][2];

                                        // 위치
                                        $(marker).css("left", $(hie.barTime.back).width() * (marker.start / _parent._media().duration) + REVISE_ROLEPLAY_MARKER);

                                        // 가시여부
                                        if (ar_roleplay_current[role - 1] == true) { $(marker).css("display", "inline-block"); }
                                        else { $(marker).css("display", "none"); }

                                        // 이벤트
                                        if (b_roleplay_marker_event == false) { $(marker).click(function (event) { _parent._module().core.castMove(this.start); }); }
                                }

                                // 변수
                                b_roleplay_marker_event = true;
                        }
                },

                // onTimeUpdate
                onTimeUpdate: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var media = _parent._media();
                        var current = _parent._media().currentTime;

                        // 판단
                        var rolemute = _this.getRoleMute(current); // -1:역할중아님, 0~100:단일역할, 100~200:다중역할
                        var is_mute = (rolemute == -1) ? false : true;

                        // 음소거
                        if (is_mute == false && media.muted == true) { media.muted = false; }
                        else if (is_mute == true && media.paused == false && media.muted == false) { media.muted = true; }

                        // 따라하기 바
                        if (hie.barRoleplay != null) {
                                if (rolemute == -1) { $(hie.barRoleplay).css("display", "none"); }
                                else if (rolemute != -1 && media.paused == false) {
                                        var percentage = (rolemute > 100) ? rolemute - 100 : rolemute;
                                        $(hie.barRoleplay).css("display", "inline-block");
                                        $(hie.barRoleplay.current).css("width", percentage + "%");
                                }
                        }
                },

                // onPopupMediaPlayer
                onPopupToMediaPlayer: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.onPopupToMediaPlayer()"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 마커 갱신
                        if (_parent._module().barTime != null && hie.markerRoleplayArray != null) {
                                // 바 길이가 제대로 인식되었는지 체크하고 안되었다면 재시도
                                if ($(hie.barTime.back).width() == 0) {
                                        if (id_timeout_set_marker != null) { clearTimeout(id_timeout_set_marker); }
                                        id_timeout_set_marker = setTimeout(function () { _this.onPopupToMediaPlayer(); }, 100);
                                } else { // 갱신
                                        _this.onUpdateUI();
                                }
                        }
                },

                ///// function

                // 설정
                setRoleplay: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.setRoleplay()"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 데이터 정리
                        var tag_data = _parent._tag().data;
                        var dic = dicMediaData[tag_data];

                        // 조건검사
                        if (dic == null || dic.subtitle == null) {
                                if (dev_trace_null == true) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 롤플레이 data 가 준비되어 있지 않습니다."); }
                                return;
                        }

                        // 연결
                        ar_subtitle_sync = dic.subtitle;

                        // 카테고리 판단
                        var b_is_video = (_parent._category() == "video");

                        // 예외처리
                        if (_parent._option().exception.elementsubtitle == true) { b_is_video = false; }

                        // 자막으로 판단
                        if (b_is_video == false && _parent._module().subtitle != null) {
                                // 준비
                                var subtitle_container = $("#" + _parent._tag().subtitle)[0];
                                var subtitle_caption = $(subtitle_container).find(".caption");

                                // 정리
                                var ico_exist = false;
                                var role_amount = dic.roleplay; // 롤플레이 수
                                for (var ii = 0 ; ii < subtitle_caption.length ; ii++) {
                                        // 준비
                                        var cap = subtitle_caption[ii];

                                        // 검색
                                        if ($(cap).find(".icoRoleplay")[0] != null) {
                                                // 자막 있음
                                                ico_exist = true;

                                                // 자막에 붙은 아이콘으로 각 대사의 role 판단 (데이터에 값이 들어가 있다면 그것이 우선됨)
                                                if (dic.roleplay == 0) {
                                                        for (var jj = 0 ; jj < ROLEPLAY_MAX_AMOUNT ; jj++) {
                                                                var role = -1;
                                                                var target = $(cap).find(".icoRoleplay")[0];
                                                                if (target != null && $(target).attr("data-role") != null) {
                                                                        role = $(target).attr("data-role");
                                                                        if (role_amount < role) { role_amount = role; }
                                                                        dic.subtitle[ii][2] = role;
                                                                }
                                                        }
                                                }
                                        }
                                }

                                // 변수 정리
                                dic.roleplay = role_amount;

                                // 자막 있으면 수집
                                ar_roleplay_ico = $(subtitle_container).find(".icoRoleplay");
                        }

                        // 외부 버튼으로 판단
                        if (ROLEPLAY_EXTERNAL_BTN == true) {
                                // 준비
                                container_roleplay = $("#" + _parent._tag().roleplay)[0];
                                if (container_roleplay == null) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 roleplay 엘리먼트가 준비되어 있지 않습니다."); return; }
                                var roleplay_btn = $(container_roleplay).find(".btnRoleplayExternal");

                                // 롤플레이 수
                                role_amount = roleplay_btn.length;

                                // 변수 정리
                                dic.roleplay = role_amount;
                        }

                        // 조건검사
                        if (dic.roleplay == null || dic.roleplay == 0) {
                                if (dev_trace_null == true) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 롤플레이 data 가 준비되어 있지 않습니다."); }
                                return;
                        }

                        // 롤 수
                        i_roleplay_amount = dic.roleplay;

                        // 상세 설정
                        _this.setRoleplay_detail();
                },
                setRoleplay_detail: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.setRoleplay_detail()"); }

                        // 준비
                        var hie = _parent._hierarchy();
                        ar_roleplay_current = new Array();

                        // 정리
                        if (ROLEPLAY_EXTERNAL_BTN == true) { // 외부 버튼
                                // 버튼 연결
                                hie.btnRoleplayArray = $(container_roleplay).find(".btnRoleplayExternal");

                                // 현재 상태 배열
                                for (var ii = 0 ; ii < ROLEPLAY_MAX_AMOUNT ; ii++) {
                                        // 현재 상태 배열
                                        ar_roleplay_current[ii] = true;

                                        // 버튼
                                        if (ii < i_roleplay_amount) {
                                                if (hie.btnRoleplayArray[ii] != null) {
                                                        hie.btnRoleplayArray[ii].role = ii + 1;
                                                        $(hie.btnRoleplayArray[ii]).css("display", "inline-block");
                                                        $(hie.btnRoleplayArray[ii]).css("cursor", "pointer");
                                                        $(hie.btnRoleplayArray[ii]).click(function (event) { _this.onButtonClick("btnRoleplay", 0, event.target); })
                                                }
                                        }
                                }
                        } else {
                                for (var ii = 0 ; ii < ROLEPLAY_MAX_AMOUNT ; ii++) {
                                        // 현재 상태 배열
                                        ar_roleplay_current[ii] = true;

                                        // 버튼
                                        if (ii < i_roleplay_amount) {
                                                hie.btnRoleplayArray[ii].role = ii + 1;
                                                $(hie.btnRoleplayArray[ii]).css("display", "inline-block");
                                                $(hie.btnRoleplayArray[ii]).css("cursor", "pointer");
                                                $(hie.btnRoleplayArray[ii]).click(function (event) { _this.onButtonClick("btnRoleplay", 0, event.target); })
                                        } else {
                                                $(hie.btnRoleplayArray[ii]).css("display", "none");
                                        }
                                }
                        }

                        // 타임바에 마커 생성
                        if (ROLEPLAY_EXIST_MARKER == true && _parent._module().barTime != null) {
                                // 배열 초기화
                                if (hie.markerRoleplayArray == null) { hie.markerRoleplayArray = new Array(); }

                                // 마커 생성
                                for (var ii = 0 ; ii < ar_subtitle_sync.length ; ii++) {
                                        hie.markerRoleplayArray[ii] = tools_addElement("<div class='roleplay" + ar_subtitle_sync[ii][2] + "'></div>", hie.barTime);
                                        $(hie.markerRoleplayArray[ii]).css("cursor", "pointer");
                                        $(hie.markerRoleplayArray[ii]).css("display", "none");
                                        hie.markerRoleplayArray[ii].idx = ii;
                                        hie.markerRoleplayArray[ii].start = ar_subtitle_sync[ii][0];
                                }
                        }
                },

                // 롤에 의한 뮤트 상태 판단, -1:묵음아님, 0~100:묵음(진행된 퍼센티지), 100~200:묵음아님(진행된 퍼센티지)
                getRoleMute: function (time) {
                        // 인덱스
                        var idx = tools_getPositionInArray(ar_subtitle_sync, time);

                        // 현재 대사 없음
                        if (idx == -1) { return -1; }

                        // 역할 중첩 판단
                        var ar_role = ("" + ar_subtitle_sync[idx][2]).split("_");

                        // 역할 하나
                        if (ar_role.length == 1) {
                                var role = parseInt(ar_subtitle_sync[idx][2]);
                                var current = ar_roleplay_current[role - 1];
                                if (current == true) { return -1; } // 묵음 아님

                                // 묵음이면 진행 바 관련 정보
                                var prog = time - ar_subtitle_sync[idx][0];
                                var per = (prog / (ar_subtitle_sync[idx][1] - ar_subtitle_sync[idx][0])) * 100;

                                // 반환
                                if (role == 0) { return -1; }
                                else { return per; }
                        } else { // 역할 여러개 : 하나라도 비활성화이면 묵음
                                var current = true;
                                for (var ii = 0 ; ii < ar_role.length ; ii++) { if (ar_roleplay_current[parseInt(ar_role[ii] - 1)] == false) { current = false; } }
                                if (current == true) { return -1; } // 퍼센티지 없음

                                // 묵음이면 진행 바 관련 정보
                                var prog = time - ar_subtitle_sync[idx][0];
                                var per = (prog / (ar_subtitle_sync[idx][1] - ar_subtitle_sync[idx][0])) * 100;

                                // 반환
                                return per + 100;
                        }
                },

                // 설정 수집, 적용
                getState: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.getState()"); }

                        // 준비
                        obj = {};

                        // 수집
                        obj.i_roleplay_amount = i_roleplay_amount;
                        obj.ar_subtitle_sync = [];
                        obj.ar_roleplay_current = [];
                        $.extend(true, obj.ar_subtitle_sync, ar_subtitle_sync);
                        $.extend(true, obj.ar_roleplay_current, ar_roleplay_current);

                        // 뮤트 해제
                        _parent._media().mute = false;

                        // 갱신
                        _this.onUpdateUI();

                        // 반환
                        return obj;
                },
                setState: function (obj) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.setState(" + obj + ")"); }

                        // 풀스크린 전용(데이터 옮기기)
                        if (_parent._option().fullscreen_target == true) {
                                // 준비
                                var hie = _parent._hierarchy();

                                // 마커 정리
                                if (_parent._module().barTime != null && hie.markerRoleplayArray != null) {
                                        for (var ii = 0 ; ii < hie.markerRoleplayArray.length ; ii++) {
                                                $(hie.markerRoleplayArray[ii]).unbind("click");
                                                $(hie.markerRoleplayArray[ii]).remove();
                                        }
                                }
                                b_roleplay_marker_event = false;

                                // 버튼 정리
                                for (var ii = 0 ; ii < ROLEPLAY_MAX_AMOUNT ; ii++) { $(hie.btnRoleplayArray[ii]).unbind("click"); }

                                // 정보 이동
                                i_roleplay_amount = obj.i_roleplay_amount;
                                ar_subtitle_sync = [];
                                $.extend(true, ar_subtitle_sync, obj.ar_subtitle_sync);

                                // 재설정
                                _this.setRoleplay_detail();
                        }

                        // 현재 상태 적용
                        ar_roleplay_current = [];
                        $.extend(true, ar_roleplay_current, obj.ar_roleplay_current);

                        // 갱신
                        _this.onUpdateUI();
                },
        }
}

// mediaplayer_compo_notes 악보 * moveMedia 관련 추가 코드는 없는걸로 가정
var mediaplayer_compo_notes = function (p_parent) {
        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_svg_loaded = false; // svg 로드 완료 여부
        var i_current_page; // 현재 페이지
        var b_activate_lyrics = false; // 가사 기능 동작 여부
        var i_current_lyrics; // 현재 가사
        var i_current_listen = -1; // 전체듣기/소절듣기 상태 -1:기능없음, 0:전체듣기, 1:소절듣기
        var i_current_waypoint = -1; // 현재 웨이포인트 (초기화 상태가 -1)
        var time_waypoint_end = -1; // 웨이포인트에 의한 일시정지 예약 시간
        var b_way_loop = false; // 전용 루프
        var b_focus_note = true; // 음표 포커스 여부
        var b_focus_lyrics = true; // 가사 포커스 여부
        var b_lyrics_visible = true; // 가사 가시 여부
        var i_current_tune = 0; // -1:하강, 0:보통, 1:상승

        // obj
        var ar_svg_ctrl; // SVG Controller 배열
        var ar_focuser; // 포커서 배열
        var ar_lyrics; // 가사 배열
        var ar_waypoint; // 웨이포인트 배열
        var ar_btn_waypoint; // 웨이포인트 드랍다운 버튼 배열
        var obj_remember_focus = {}; // 포커스 기억(포커스 해제일 때 기억해 두었다, 다시 켜면 적용)

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.init()"); }

                        // 연결
                        _this = this;

                        // 접근자
                        _parent._tag().data = ($(_parent._ele()).attr("data-data") != null) ? $(_parent._ele()).attr("data-data") : "data_" + _parent._file();
                        _parent._tag().notes = ($(_parent._ele()).attr("data-notes") != null) ? $(_parent._ele()).attr("data-notes") : "notes_" + _parent._id();

                        // 커스터마이저
                        _parent._module().customizer.notes_onInit();

                        // 데이터 준비
                        tools_setMediaData();

                        // 설정
                        _this.setNotes();

                        // 부속품
                        var hie = _parent._hierarchy();
                        if (hie.btnWayloop != null) { $(hie.btnWayloop).click(function (event) { _this.onButtonClick("btnWayloop", 0, event.target); }); } // 전용 루프
                        if (hie.btnFocus != null) { $(hie.btnFocus).click(function (event) { _this.onButtonClick("btnFocus", 0, event.target); }); } // 포커스 가시 여부
                        if (hie.btnLyricsFocus != null) { $(hie.btnLyricsFocus).click(function (event) { _this.onButtonClick("btnLyricsFocus", 0, event.target); }); }
                        if (hie.btnLyrics != null) { $(hie.btnLyrics).click(function (event) { _this.onButtonClick("btnLyrics", 0, event.target); }); } // 가사 가시 여부
                        if (hie.btnTune != null) { // 튠 조절 버튼
                                $(hie.btnTune).click(function (event) { _this.onButtonClick("btnTune", 0, event.target); });
                                $(hie.btnTuneUp).click(function (event) { _this.onButtonClick("btnTune", 3, event.target); event.stopImmediatePropagation(); });
                                $(hie.btnTuneNormal).click(function (event) { _this.onButtonClick("btnTune", 2, event.target); event.stopImmediatePropagation(); });
                                $(hie.btnTuneDown).click(function (event) { _this.onButtonClick("btnTune", 1, event.target); event.stopImmediatePropagation(); });
                        }

                        // UI 갱신
                        _this.updateUI();
                },

                // 참조
                _parent: function () { return _parent; },
                i_current_tune: function (ii) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.i_current_tune(" + ii + ")"); }

                        //
                        i_current_tune = ii;
                },

                ///// event

                // 리셋
                onHardReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.onHardReset()"); }

                        // 음정 체크
                        if (i_current_tune != 0) {
                                // 음원 변경
                                changeMedia(_parent._id(), tools_getSourceFileName(_parent._file()), "data_" + tools_getSourceFileName(_parent._file()), null, "tuneNormal");
                                _this.updateUI();
                        } else {
                                // 일반 리셋
                                _this.onReset();
                        }
                },
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.onReset() try"); }

                        // 조건검사
                        if (ar_focuser == null) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.onReset()"); }

                        // 페이지
                        _this.setPage(1);

                        // 전달
                        for (var ii = 0 ; ii < ar_focuser.length ; ii++) { ar_focuser[ii].onReset(); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 부속품
                        if (i_current_listen != -1) {
                                i_current_listen = 0;
                                i_current_waypoint = -1;
                                time_waypoint_end = -1;
                        }

                        // 변수
                        b_way_loop = false;
                        b_focus_note = true;
                        b_focus_lyrics = true;
                        _this.setLyricsVisible(true);

                        // 데이터 준비
                        var dic = dicMediaData[_parent._tag().data];
                        var data = dic.notes;

                        // 가사 초기화
                        if (data.verse != null && data.verse != 0) {
                                if (data.initial != null) { _this.setLyrics(data.initial); }
                                else { _this.setLyrics(1); }
                        }

                        // UI 갱신
                        _this.updateUI();
                },

                // 버튼
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 분기
                        switch (tag) {
                                case "btnListen": // 전체듣기/소절듣기
                                        switch (idx) {
                                                case -1: // 메뉴버튼
                                                        setTimeout(function () { // 빈곳 클릭 대응 때문에 타임아웃
                                                                if ($(hie.menuListen).css("display") == "none") { $(hie.menuListen).css("display", "inline-block"); }
                                                                else { $(hie.menuListen).css("display", "none"); }
                                                        }, 1);
                                                        break;
                                                case 0: // 전체듣기
                                                        i_current_listen = 0;
                                                        _this.updateUI();
                                                        break;
                                                case 1: // 소절듣기
                                                        i_current_listen = 1;
                                                        _this.updateUI();
                                                        break;
                                        }
                                        break;
                                case "btnWaypoint": // 웨이포인트
                                        switch (idx) {
                                                case -2: _this.castWaypoint(btn.key); break; // 웨이포인트 드랍다운 버튼
                                                case -1: // prev
                                                        var goto = i_current_waypoint - 1;
                                                        if (goto < 1) { return; }
                                                        _this.castWaypoint(goto);
                                                        break;
                                                case 0: // 레이블 버튼
                                                        setTimeout(function () { // 빈곳 클릭 대응 때문에 타임아웃
                                                                if ($(hie.menuWaypoint).css("display") == "none") { $(hie.menuWaypoint).css("display", "inline-block"); }
                                                                else { $(hie.menuWaypoint).css("display", "none"); }
                                                        }, 1);
                                                        break;
                                                case 1: // next
                                                        var goto = i_current_waypoint + 1;
                                                        if (goto < 1) { goto = 1; }
                                                        if (goto > ar_waypoint.length - 1) { return; }
                                                        _this.castWaypoint(goto);
                                                        break;
                                        }
                                        break;
                                case "btnWayloop": // 전용 루프
                                        b_way_loop = !b_way_loop;
                                        _this.updateUI();
                                        break;
                                case "btnFocus": // 포커스 가시 여부
                                        b_focus_note = !b_focus_note;
                                        if (b_focus_note == true) { _this.revertFocus(0); } // 기억했던 포커스 적용
                                        else { _this.clearFocus(0); } // 포커스 클리어
                                        _this.updateUI();
                                        break;
                                case "btnLyricsFocus": // 가사 포커스 가시 여부
                                        b_focus_lyrics = !b_focus_lyrics;
                                        if (b_focus_lyrics == true) { _this.revertFocus(1); } // 기억했던 포커스 적용
                                        else { _this.clearFocus(1); } // 포커스 클리어
                                        _this.updateUI();
                                        break;
                                case "btnLyrics": // 가사 가시 여부
                                        b_lyrics_visible = !b_lyrics_visible;
                                        _this.setLyricsVisible(b_lyrics_visible);
                                        _this.updateUI();
                                        break;
                                case "btnTune": // 튠 조절 여부
                                        switch (idx) {
                                                case 0: // 드랍다운 메뉴 호출 버튼
                                                        setTimeout(function () { // 빈곳 클릭 대응 때문에 타임아웃
                                                                if ($(hie.menuTune).css("display") == "none") { $(hie.menuTune).css("display", "inline-block"); }
                                                                else { $(hie.menuTune).css("display", "none"); }
                                                        }, 1);
                                                        break;
                                                case 1: // 튠 하강
                                                        if (i_current_tune != -1) { changeMedia(_parent._id(), tools_getSourceFileName(_parent._file()) + "_l", "data_" + tools_getSourceFileName(_parent._file()), null, "tuneDown"); }
                                                        _this.updateUI();
                                                        break;
                                                case 2: // 튠 노멀
                                                        if (i_current_tune != 0) { changeMedia(_parent._id(), tools_getSourceFileName(_parent._file()), "data_" + tools_getSourceFileName(_parent._file()), null, "tuneNormal"); }
                                                        _this.updateUI();
                                                        break;
                                                case 3: // 튠 상승
                                                        if (i_current_tune != 1) { changeMedia(_parent._id(), tools_getSourceFileName(_parent._file()) + "_h", "data_" + tools_getSourceFileName(_parent._file()), null, "tuneUp"); }
                                                        _this.updateUI();
                                                        break;
                                        }
                                        break;
                        }
                },
                castWaypoint: function (key) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.castWaypoint(" + key + ")"); }

                        // 변수 초기화
                        i_current_waypoint = -1;
                        time_waypoint_end = -1;

                        // 이동
                        _parent._module().core.castMove(ar_waypoint[key][0] + 0.01);

                        // 재생
                        _parent._module().core.castPlay();
                },

                // onSvgClick
                onSvgClick: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.onSvgClick()"); }

                        //
                        if (i_current_listen != -1) { _this.hideDropDownMenu(); }
                },

                // 재생 갱신
                onTimeUpdate: function () {
                        // 조건검사 : 미디어 로딩 미완
                        if (_parent._module().core.b_loaded_media() == false) { return; }

                        // 준비
                        var time = _parent._media().currentTime;

                        // 가사 갱신
                        if (b_activate_lyrics == true) {
                                var idx = tools_getPositionInArray(ar_lyrics, time);
                                if (idx != -1) { this.setLyrics(ar_lyrics[idx][2]); }
                        }

                        // 포커서에 전달
                        for (var ii = 0 ; ii < ar_focuser.length ; ii++) { ar_focuser[ii].onTimeUpdate(time); }

                        // 페이지 초기화
                        if (tools_isCTZero(time) == true) { _this.setPage(1); }

                        // 웨이포인트 체크
                        if (i_current_listen != -1) {
                                // 웨이포인트에 의한 일시정지 체크
                                if (_parent._media().paused == false && i_current_listen == 1 && time_waypoint_end != -1 && time + 0.1 > time_waypoint_end) {
                                        if (b_way_loop == true) { // 전용 루프
                                                // 소절 시작 부분으로 돌아감
                                                _parent._module().core.castMove(ar_waypoint[i_current_waypoint][0] + 0.05);
                                        } else { // 루프 아님
                                                // 일시정지
                                                _parent._module().core.castPause();

                                                // 포커스 해제
                                                _this.clearFocus();

                                                // UI 갱신을 깔끔하기 위해 약간 뒤로
                                                _parent._module().core.castMove(time_waypoint_end - 0.1);

                                                // 예약 해제
                                                time_waypoint_end = -1;

                                                // UI 갱신
                                                _this.updateUI();
                                        }
                                } else {
                                        // 현재 인덱스
                                        var idx = tools_getPositionInArray(ar_waypoint, time);

                                        // 변동 있음
                                        if (idx != -1 && idx != i_current_waypoint) {
                                                // 웨이포인트에 의한 일시정지 예약
                                                if (idx != 0) { time_waypoint_end = ar_waypoint[idx][1]; }

                                                // 변수
                                                i_current_waypoint = idx;

                                                // UI 갱신
                                                _this.updateUI();
                                        }
                                }
                        }
                },

                // 음원 교체
                onCastChangeMedia: function (p_data) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.onCastChangeMedia(" + p_data + ")"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 접근자
                        _parent._tag().data = (p_data != null) ? p_data : "data_" + _parent._file();

                        // 초기화 - onReset 의 일부
                        if (ar_focuser != null) {
                                // 페이지
                                _this.setPage(1);

                                // 전달
                                for (var ii = 0 ; ii < ar_focuser.length ; ii++) { ar_focuser[ii].onReset(); }

                                // 듣기 관련
                                if (i_current_listen != -1) {
                                        i_current_listen = 0;
                                        i_current_waypoint = -1;
                                        time_waypoint_end = -1;
                                }

                                // 변수
                                b_way_loop = false;
                                b_focus_note = true;
                                b_focus_lyrics = true;
                                _this.setLyricsVisible(true);
                        }

                        // 기존 제거
                        ar_lyrics = null;
                        ar_focuser = null;
                        ar_waypoint = null;
                        if (ar_btn_waypoint != null) {
                                for (var ii = 0 ; ii < ar_btn_waypoint.length ; ii++) {
                                        $(ar_btn_waypoint[ii]).unbind("click");
                                        $(ar_btn_waypoint[ii]).remove();
                                }
                                ar_btn_waypoint = null;
                        }

                        // 특수 옵션 초기화
                        _this.showCompo("tune", true);

                        // 설정 - setNotes 의 일부

                        // 데이터 준비
                        var dic = dicMediaData[_parent._tag().data];
                        if (dic == null || dic == undefined) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 notes 의 악보 데이터(접근자:" + _parent._tag().data + ")가 준비되어 있지 않습니다."); }
                        var data = dic.notes;

                        // 가사 준비
                        if (data.verse != null && data.verse != 0) {
                                // 준비
                                _this.createLyricsArray(data.verse, data.lyrics);

                                // 초기화
                                if (data.initial != null) { _this.setLyrics(data.initial); }
                                else { _this.setLyrics(1); }
                        }

                        // 포커서 배열
                        _this.createFocuserArray(data.line);

                        // 웨이포인트 배열 만들기
                        if (data.waypoint != null && hie.btnListen != null) { _this.setWaypoint(data.waypoint, true); }

                        // UI 갱신
                        _this.updateUI();
                },

                ///// function

                // 설정
                setNotes: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.setNotes()"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 데이터 준비
                        var dic = dicMediaData[_parent._tag().data];
                        if (dic == null || dic == undefined) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 notes 의 악보 데이터(접근자:" + _parent._tag().data + ")가 준비되어 있지 않습니다."); }
                        var data = dic.notes;

                        // 컨테이너 준비
                        var container = $("#" + _parent._tag().notes)[0];
                        if (container == null || container == undefined) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 notes 의 악보 컨테이너(id:" + "notes_" + tag_notes + ")엘리먼트가 준비되어 있지 않습니다."); }
                        var svg_amount = ($(container).find(".note_svg")).length;

                        // SVG Controller 배열
                        _this.createSVGCtrlArray(container, svg_amount, data.verse);

                        // 가사 준비
                        if (data.verse != null && data.verse != 0) {
                                // 준비
                                _this.createLyricsArray(data.verse, data.lyrics);

                                // 초기화
                                if (data.initial != null) { _this.setLyrics(data.initial); }
                                else { _this.setLyrics(1); }
                        }

                        // 포커서 배열
                        _this.createFocuserArray(data.line);

                        // 흉내쟁이 준비
                        if (data.imitator != null) {
                                for (var ii = 0 ; ii < data.imitator.length ; ii++) {
                                        // 준비
                                        var ar_im_lv0 = data.imitator[ii].split(":");
                                        var ar_source = ar_im_lv0[0]; // 흉내낼 대상 ex:'a'
                                        var ar_imitator = ar_im_lv0[1].split("_");; // 흉내를 낼 라인들 ex:[d,e,f,g]

                                        // 설정
                                        for (var jj = 0 ; jj < ar_svg_ctrl.length ; jj++) { ar_svg_ctrl[jj].setImitator(ar_source, ar_imitator); }
                                }
                        }

                        // 웨이포인트 배열 만들기
                        if (data.waypoint != null && hie.btnListen != null) { _this.setWaypoint(data.waypoint); }
                },

                // SVG Controller 배열 만들기
                createSVGCtrlArray: function (container, amount, verse) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.createSVGCtrlArray(" + container + ", " + amount + ", " + verse + ")"); }

                        // 준비
                        ar_svg_ctrl = new Array();
                        var svgs = $(container).find(".note_svg");

                        // 반복
                        for (var ii = 0 ; ii < amount ; ii++) {
                                var svg_id = _parent._id() + "_svg" + ii;
                                $(svgs[ii]).attr("id", svg_id);
                                ar_svg_ctrl[ii] = new svgControllerInit(svg_id, verse, function (str) { _this.onSVGLoadedComplete(str); });
                                ar_svg_ctrl[ii].svgid = svg_id;
                                ar_svg_ctrl[ii].load_complete = false;
                                ar_svg_ctrl[ii].ele = svgs[ii];
                        }
                },
                onSVGLoadedComplete: function (str) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.onSVGLoadedComplete(" + str + ")"); }

                        // 전부 완료 검사
                        for (var ii = 0 ; ii < ar_svg_ctrl.length ; ii++) {
                                if (ar_svg_ctrl[ii].svgid == str) { ar_svg_ctrl[ii].load_complete = true; }
                        }
                        var load_complete = true;
                        for (var ii = 0 ; ii < ar_svg_ctrl.length ; ii++) {
                                if (ar_svg_ctrl[ii].load_complete == false) { load_complete = false; }
                        }

                        // 로드 완료
                        if (load_complete == true) { _this.onAllSVGLoadedComplete(); }
                },
                onAllSVGLoadedComplete: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.onAllSVGLoadedComplete() try"); }

                        // 조건검사
                        if (b_svg_loaded == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.onAllSVGLoadedComplete()"); }

                        // 변수
                        b_svg_loaded = true;
                },

                // 포커서 배열 만들기
                createFocuserArray: function (ar) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.createFocuserArray(" + ar + ")"); }

                        // 데이터 준비
                        var dic = dicMediaData[_parent._tag().data];
                        var data = dic.notes;

                        // 배열화
                        ar_focuser = new Array();
                        for (var ii = 0 ; ii < ar.length ; ii++) {
                                // 준비
                                var ar_temp = ar[ii].split("_");
                                var head = ar_temp[0];
                                var cat = ar_temp[1];
                                var option = "";
                                if (ar_temp.length > 1) { option = ar_temp[2]; }
                                ar_focuser[ii] = new mediaplayer_compo_notes_focuser(_this);
                                ar_focuser[ii].init(head, cat, data.sync[head], option);
                        }
                },

                // 가사 배열 만들기
                createLyricsArray: function (amount, ar_source) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.createLyricsArray(" + amount + ", " + ar_source + ")"); }

                        // 준비
                        b_activate_lyrics = true;
                        i_current_lyrics = 0;

                        // 정리
                        ar_lyrics = new Array();
                        for (var ii = 0 ; ii < ar_source.length ; ii++) {
                                var ar = ar_source[ii].split("_");
                                var p_verse = parseInt(ar[0]);
                                var p_start = parseFloat(ar[1]);
                                var p_end = parseFloat(ar[2]);
                                p_start = parseInt(p_start * 100) / 100;
                                p_end = parseInt(p_end * 100) / 100;
                                if (isNaN(p_verse) == false && p_start != p_end) { ar_lyrics.push([p_start, p_end, p_verse]); }
                        }
                },

                // 웨이포인트 배열 만들기
                setWaypoint: function (ar_source, on_change_media) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.setWaypoint(" + ar_source + ", " + on_change_media + ")"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 설정
                        i_current_listen = 0;

                        // 첫 생성 때만
                        if (on_change_media == null) {
                                // 이벤트 연결
                                $(hie.btnListen).click(function (event) { _this.onButtonClick("btnListen", -1, event.target); })
                                $(hie.btnListenAll).click(function (event) { _this.onButtonClick("btnListen", 0, event.target); event.stopImmediatePropagation(); })
                                $(hie.btnListenPart).click(function (event) { _this.onButtonClick("btnListen", 1, event.target); event.stopImmediatePropagation(); })
                                $(hie.btnWaypointPrev).click(function (event) { _this.onButtonClick("btnWaypoint", -1, event.target); })
                                $(hie.btnWaypointNext).click(function (event) { _this.onButtonClick("btnWaypoint", 1, event.target); })
                                $(hie.btnWaypointLabel).click(function (event) { _this.onButtonClick("btnWaypoint", 0, event.target); })

                                // 빈곳 클릭 대응
                                $(document).click(function () { _this.hideDropDownMenu(); });
                        }

                        // 배열 만들기
                        ar_waypoint = new Array();
                        for (var ii = 0 ; ii < ar_source.length ; ii++) {
                                var ar = ar_source[ii].split("_");
                                var p_idx = parseInt(ar[0]);
                                var p_start = parseFloat(ar[1]);
                                var p_end = parseFloat(ar[2]);
                                p_start = parseInt(p_start * 100) / 100;
                                p_end = parseInt(p_end * 100) / 100;
                                ar_waypoint[ii] = [p_start, p_end, p_idx];
                        }

                        // 웨이포이튼 드랍다운 버튼
                        ar_btn_waypoint = new Array();
                        for (var ii = 1 ; ii < ar_waypoint.length ; ii++) {
                                ar_btn_waypoint[ii] = tools_addElement("<div class='btnProto btnWaypoint'></div>", hie.menuWaypoint);
                                ar_btn_waypoint[ii].textContent = ii + " / " + (ar_waypoint.length - 1);
                                ar_btn_waypoint[ii].key = ii;
                                $(ar_btn_waypoint[ii]).click(function (event) { _this.onButtonClick("btnWaypoint", -2, event.target); event.stopImmediatePropagation(); });
                        }
                },

                // UI 갱신
                updateUI: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.updateUI()"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 전체듣기/소절듣기
                        if (i_current_listen != -1) {
                                // 메뉴 숨김
                                _this.hideDropDownMenu();

                                // 버튼 상태
                                if (i_current_listen == 0) { // 전체듣기/소절듣기
                                        tools_setClass(hie.btnListen, "btnListenPart", false);
                                        tools_setClass(hie.btnListen, "btnListenAll", true);
                                } else if (i_current_listen == 1) {
                                        tools_setClass(hie.btnListen, "btnListenAll", false);
                                        tools_setClass(hie.btnListen, "btnListenPart", true);
                                }

                                // 전용 루프
                                if (hie.btnWayloop != null) { tools_setOn(hie.btnWayloop, b_way_loop); }

                                // 레이블
                                var current = (i_current_waypoint == -1) ? 0 : i_current_waypoint;
                                hie.btnWaypointLabel.label.textContent = current + " / " + (ar_waypoint.length - 1);
                        }

                        // 포커스 가시여부 조절 버튼
                        if (hie.btnFocus != null) { tools_setOn(hie.btnFocus, b_focus_note); }
                        if (hie.btnLyricsFocus != null) { tools_setOn(hie.btnLyricsFocus, b_focus_lyrics); }

                        // 가사 가시여부 조절 버튼
                        if (hie.btnLyrics != null) { tools_setOn(hie.btnLyrics, b_lyrics_visible); }

                        // 튠 조절 버튼
                        if (hie.btnTune != null) {
                                tools_setClass(hie.btnTune, "btnTuneUp", false);
                                tools_setClass(hie.btnTune, "btnTuneNormal", false);
                                tools_setClass(hie.btnTune, "btnTuneDown", false);
                                switch (i_current_tune) {
                                        case -1: tools_setClass(hie.btnTune, "btnTuneDown", true); break;
                                        case 0: tools_setClass(hie.btnTune, "btnTuneNormal", true); break;
                                        case 1: tools_setClass(hie.btnTune, "btnTuneUp", true); break;
                                }
                        }
                },

                // 가사 가시여부 조절
                setLyricsVisible: function (b) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.setLyricsVisible(" + b + ") try"); }

                        // 조건검사
                        if (b_svg_loaded == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.setLyricsVisible(" + b + ")"); }

                        // 변수
                        b_lyrics_visible = b;

                        // 동작
                        for (var ii = 0 ; ii < ar_svg_ctrl.length ; ii++) { ar_svg_ctrl[ii].setVisibleLyrics(b_lyrics_visible); }
                },

                // 드랍다운 메뉴 숨기기
                hideDropDownMenu: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.hideDropDownMenu()"); }

                        //
                        var hie = _parent._hierarchy();
                        if (hie.menuListen != null) { $(hie.menuListen).css("display", "none"); } // 전체듣기/소절듣기
                        if (hie.menuWaypoint != null) { $(hie.menuWaypoint).css("display", "none"); } // 웨이포인트
                        if (hie.menuTune != null) { $(hie.menuTune).css("display", "none"); } // 튠
                        if (hie.menuPlaybackrate != null) { $(hie.menuPlaybackrate).css("display", "none"); } // 재생속도 (playbackrate 컴포넌트 소속. 코드 이렇게 짜면 안되는데...)
                },

                ///// method

                // 포커스 제어
                setFocus: function (head, page, idx) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.setFocus(" + head + ", " + page + ", " + idx + ")"); }

                        // 페이지
                        _this.setPage(page);

                        // 판단
                        var type; // -1:none, 0:note, 1:lyrics, 2:both
                        if (b_focus_note == true && b_focus_lyrics == true) { type = 2; }
                        else if (b_focus_note == true) { type = 0; }
                        else if (b_focus_lyrics == true) { type = 1; }
                        else { type = -1; }

                        // 음표
                        if (type != -1) { ar_svg_ctrl[page - 1].noteOn(head, idx, type); }

                        // 기억
                        if (obj_remember_focus[head] == null) { obj_remember_focus[head] = {}; }
                        obj_remember_focus[head].ready = true;
                        obj_remember_focus[head].head = head;
                        obj_remember_focus[head].page = page;
                        obj_remember_focus[head].idx = idx;
                },
                releaseFocus: function (head, page, idx) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.releaseFocus(" + head + ", " + page + ", " + idx + ")"); }

                        // 판단
                        var type; // -1:none, 0:note, 1:lyrics, 2:both
                        if (b_focus_note == true && b_focus_lyrics == true) { type = 2; }
                        else if (b_focus_note == true) { type = 0; }
                        else if (b_focus_lyrics == true) { type = 1; }
                        else { type = -1; }

                        // 음표
                        if (type != -1) { ar_svg_ctrl[page - 1].noteOff(head, idx, type); }

                        // 기억
                        obj_remember_focus[head].ready = false;
                },
                revertFocus: function (type) { // 0:note, 1:lyrics
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.revertFocus()"); }

                        //
                        $.each(obj_remember_focus, function () { if (this.ready == true) { ar_svg_ctrl[this.page - 1].noteOn(this.head, this.idx, type); } });
                },
                clearFocus: function (type) { // 0:note, 1:lyrics
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.clearFocus()"); }

                        // clear & release
                        if (type == null) {
                                // clear
                                $.each(obj_remember_focus, function () {
                                        if (this.ready == true) {
                                                ar_svg_ctrl[this.page - 1].noteOff(this.head, this.idx, 2);
                                                this.ready = false;
                                        }
                                });

                                // 중단
                                return;
                        }

                        //
                        $.each(obj_remember_focus, function () { if (this.ready == true) { ar_svg_ctrl[this.page - 1].noteOff(this.head, this.idx, type); } });
                },

                // 페이지 제어
                setPage: function (page) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.setPage(" + page + ")"); }

                        if (i_current_page != page) {
                                for (var ii = 0 ; ii < ar_svg_ctrl.length ; ii++) {
                                        if (ii == (page - 1)) { $(ar_svg_ctrl[ii].ele).css("visibility", "visible"); }
                                        else { $(ar_svg_ctrl[ii].ele).css("visibility", "hidden"); }
                                }
                                i_current_page = page;
                        }
                },

                // 가사 제어
                setLyrics: function (verse) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.setLyrics(" + verse + ") try"); }

                        // 조건검사
                        if (i_current_lyrics == verse) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.setLyrics(" + verse + ")"); }

                        // 변수 갱신
                        i_current_lyrics = verse;

                        // svg 가사
                        if (ar_svg_ctrl != null) { for (var ii = 0 ; ii < ar_svg_ctrl.length ; ii++) { ar_svg_ctrl[ii].showLyrics(verse); } }
                },

                // 컴포 가시여부 조정
                showCompo: function (co, b) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.showCompo(" + co + ", " + b + ")"); }

                        // 준비
                        var hie = _parent._hierarchy();
                        var target;

                        // 구분
                        switch (co) {
                                case "tune": target = hie.btnTune; break;
                        }

                        // 동작
                        if (b == true) { $(target).css("display", "inline-block"); }
                        else { $(target).css("display", "none"); }
                },
        }
}

// mediaplayer_compo_notes_focuser 악보 포커서
var mediaplayer_compo_notes_focuser = function (p_parent) {
        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var idx_prev_focus = -1; // 이전 포커스
        var s_svg_head; // 헤더
        var s_focus_category; // 포커스 카테고리

        // obj
        var ar_focuser_sync; // 가공된 싱크 데이터 배열 (start, end, idx)
        var co_custom_controller; // 커스텀 컨트롤러
        var obj_counter_container; // playCounter(예비박) 컨테이너

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function (head, cat, ar_sync, option) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.focuser.init()"); }

                        // 연결
                        _this = this;

                        // 변수
                        s_svg_head = head;
                        s_focus_category = cat;
                        var mp = _parent._parent();
                        obj_counter_container = ($(mp._ele()).attr("data-playCounter") != null) ? $(document).find("#" + $(mp._ele()).attr("data-playCounter"))[0] : $(document).find(".playCounter")[0];

                        // 커스텀 컨트롤러
                        switch (s_focus_category) {
                                case "kj": co_custom_controller = new koongjjakController(); break;
                                case "html": co_custom_controller = new htmlControllerInit(option); break;
                                case "path": co_custom_controller = new movingPathController(); break;
                        }

                        // 정리
                        ar_focuser_sync = new Array();
                        for (var ii = 0 ; ii < ar_sync.length ; ii++) {
                                var ar = ar_sync[ii].split("_");
                                var p_page = parseInt(ar[0]);
                                var p_idx = parseInt(ar[1]);
                                var p_start = parseFloat(ar[2]);
                                var p_end = (p_start * 1000 + (parseFloat(ar[3]) * 1000)) / 1000;
                                // 특수 보정
                                if (s_focus_category == "count" && p_idx == "1") { p_end -= 0.1; }
                                p_start = parseInt(p_start * 100) / 100;
                                p_end = parseInt(p_end * 100) / 100;
                                ar_focuser_sync[ii] = [p_start, p_end, p_page, p_idx];
                        }
                },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.focuser.onReset()"); }

                        //
                        _this.releaseFocus();
                },

                // 재생 갱신
                onTimeUpdate: function (time) {
                        // 판단
                        var idx = tools_getPositionInArray(ar_focuser_sync, time);

                        // 시작지점 보정
                        if (tools_isCTZero(time) == true) { idx = -1; }

                        // 없음
                        if (idx == -1) { _this.releaseFocus(); }
                        else { _this.setFocus(idx); }
                },

                ///// function

                // 노트 포커스 제어
                setFocus: function (idx) {
                        // 조건검사
                        if (idx_prev_focus == idx) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.focuser.setFocus(" + idx + ")"); }

                        // 이전 포커스 해제
                        _this.releaseFocus();

                        // 포커스 인덱스 기억
                        idx_prev_focus = idx;

                        // 분기
                        var page = ar_focuser_sync[idx][2];
                        var index = ar_focuser_sync[idx][3];
                        switch (s_focus_category) {
                                case "svg":
                                        _parent.setFocus(s_svg_head, page, index);
                                        break;
                                case "kj":
                                        co_custom_controller.imageOn(index);
                                        break;
                                case "count":
                                        $(obj_counter_container).css("display", "inline-block");
                                        if ($(obj_counter_container).hasClass("no1") == true) { $(obj_counter_container).removeClass("no1"); }
                                        if ($(obj_counter_container).hasClass("no2") == true) { $(obj_counter_container).removeClass("no2"); }
                                        if ($(obj_counter_container).hasClass("no3") == true) { $(obj_counter_container).removeClass("no3"); }
                                        if ($(obj_counter_container).hasClass("no4") == true) { $(obj_counter_container).removeClass("no4"); }
                                        if ($(obj_counter_container).hasClass("no5") == true) { $(obj_counter_container).removeClass("no5"); }
                                        if ($(obj_counter_container).hasClass("no6") == true) { $(obj_counter_container).removeClass("no6"); }
                                        $(obj_counter_container).addClass("no" + index);
                                        break;
                                case "html":
                                        co_custom_controller.noteOn(s_svg_head, index);
                                        break;
                                case "path":
                                        co_custom_controller.moveTo(index);
                                        break;
                        }
                },
                releaseFocus: function () {
                        // 조건검사
                        if (idx_prev_focus == -1) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.focuser.releaseFocus()"); }

                        // 분기
                        var page = ar_focuser_sync[idx_prev_focus][2];
                        var index = ar_focuser_sync[idx_prev_focus][3];
                        switch (s_focus_category) {
                                case "svg":
                                        _parent.releaseFocus(s_svg_head, page, index);
                                        break;
                                case "kj":
                                        co_custom_controller.imageOff(index);
                                        break;
                                case "count":
                                        $(obj_counter_container).css("display", "none");
                                        break;
                                case "html":
                                        co_custom_controller.noteOff(s_svg_head, index);
                                        break;
                        }

                        // 변수
                        idx_prev_focus = -1;
                },

                // 노트 색 지정
                setColorToNote: function (note, color) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# notes.focuser.setColorToNote(" + notes + ", " + color + ")"); }

                        //
                        note.each(function (index) {
                                if (this.tagName === "path") {
                                        if ($(this).css("stroke") !== "none") { this.style.stroke = color }
                                        else { this.style.fill = color }
                                }
                                else if (this.tagName === 'polygon') { this.style.fill = color; }
                                else if (this.tagName === 'line') { this.style.stroke = color; }
                                else if (this.tagName === 'rect') { this.style.fill = color; }
                        });
                }
        }
}

// mediaplayer_compo_onetouch 원터치
var mediaplayer_compo_onetouch = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# onetouch.init()"); }

                        // 연결
                        _this = this;

                        // 버튼
                        $(_parent._ele()).css("cursor", "pointer");
                        $(_parent._ele()).click(function (event) { _this.onButtonClick("btnPlay", 0, event.target); })
                },

                ///// event

                // UI 갱신
                onUpdateUI: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# onetouch.onUpdateUI()"); }

                        // 조건검사 : 로딩 미완
                        if (_parent._module().core.b_loaded_media() == false) {
                                tools_setOn(_parent._ele(), false);
                                return;
                        }

                        // 동작
                        tools_setOn(_parent._ele(), !_parent._media().paused);
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# onetouch.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true || _parent._module().core.i_media_state() < 0) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# onetouch.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 자막 개별 플레이 중에는 되감고 다시 시작
                        if (_parent._module().subtitle != null && _parent._module().subtitle.time_text_end() != -1) {
                                _parent._module().core.castStop();
                                _parent._module().core.castPlay();
                                return;
                        }

                        // 그외는 상태에 따라 시작/정지
                        if (_parent._module().core.i_media_state() != 1 || _parent._media().paused == true) { _parent._module().core.castPlay(); }
                        else { _parent._module().core.castStop(); }
                },
        }
}

// mediaplayer_compo_thumbnail 썸네일
var mediaplayer_compo_thumbnail = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // system
        var b_activated = false; // 활성화 상태
        var b_thumbnail_capture = false; // 캡쳐 여부(IE 안된다고 해서 준비된 이미지 로드로)
        var ele_thumbnail_container; // 컨테이너 엘리먼트(가시여부 조정 용도)
        var ar_thumbnail_container; // 컨테이너 배열
        var ar_thumbnail_capture_time; // 캡쳐 시간 배열
        var i_thumbnail_capture_idx; // 캡쳐 인덱스
        var id_timeout_hide_thumbnail; // 인아웃숨김 타임아웃

        // object
        var obj_toucharea; // 반응 영역
        var obj_visiblearea; // 가시여부 조절 영역

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# thumbnail.init()"); }

                        // 연결
                        _this = this;

                        // 준비
                        var hie = _parent._hierarchy();

                        // 접근자
                        _parent._tag().data = ($(_parent._ele()).attr("data-data") != null) ? $(_parent._ele()).attr("data-data") : "data_" + _parent._file();
                        _parent._tag().thumbnail = ($(_parent._ele()).attr("data-thumbnail") != null) ? $(_parent._ele()).attr("data-thumbnail") : "thumbnail_" + _parent._id();

                        // 커스터마이저
                        _parent._module().customizer.thumbnail_onInit();

                        // 데이터 준비
                        tools_setMediaData();

                        // 데이터 정리
                        var tag_data = _parent._tag().data;
                        var dic = dicMediaData[tag_data];
                        ar_thumbnail_capture_time = dic.thumbnail;
                        i_thumbnail_capture_idx = 0;

                        // 오브젝트 연결
                        ele_thumbnail_container = $(document).find("#" + _parent._tag().thumbnail);
                        if (b_thumbnail_capture == true) { ar_thumbnail_container = $(ele_thumbnail_container).find("canvas"); }
                        else { ar_thumbnail_container = $(ele_thumbnail_container).find(".thumb"); }
                        obj_toucharea = $(ele_thumbnail_container).find(".toucharea")[0];
                        obj_visiblearea = $(ele_thumbnail_container).find(".visiblearea")[0];

                        // 인아웃숨김기능
                        document.addEventListener("mousemove", function (event) {
                                // 조건검사
                                if (b_activated == false) { return; }

                                // 준비
                                var hie = _parent._hierarchy();

                                // 인아웃 판단
                                var inout = tools_chkInout(event, ele_thumbnail_container.find(".toucharea")[0], VIDEO_INOUT_MARGIN_THUMBNAIL);

                                // 가시여부
                                if (inout == true) {
                                        clearTimeout(id_timeout_hide_thumbnail);
                                        $(obj_visiblearea).css("display", "inline-block");
                                } else {
                                        clearTimeout(id_timeout_hide_thumbnail);
                                        id_timeout_hide_thumbnail = setTimeout(function () { $(obj_visiblearea).css("display", "none"); }, 50);
                                }
                        });

                        // 일단 숨김
                        $(ele_thumbnail_container).css("display", "none");
                        $(obj_visiblearea).css("display", "inline-block");

                        // 썸네일 로드
                        _this.loadThumbnail();
                },

                ///// event

                // 로드 완료
                onLoadedData: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# thumbnail.onLoadedData()"); }

                        // 조건검사
                        if (b_thumbnail_capture == false) { return; }
                },

                // 썸네일 캡쳐
                captureThumbnail: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# thumbnail.captureThumbnail()"); }

                        // 리스너 붙이기
                        _parent._media().addEventListener("timeupdate", _this.onTimeUpdate);

                        // 시간 관련 갱신 무력화
                        if (_parent._module().btnPlay != null) { _parent._module().btnPlay.setNeutralize(true); }
                        if (_parent._module().btnStop != null) { _parent._module().btnStop.setNeutralize(true); }
                        if (_parent._module().barTime != null) { _parent._module().barTime.setNeutralize(true); }
                        if (_parent._module().laeTime != null) { _parent._module().laeTime.setNeutralize(true); }
                        if (_parent._module().cover != null) { _parent._module().cover.setNeutralize(true); }

                        // 이동
                        _parent._module().core.castMove(ar_thumbnail_capture_time[i_thumbnail_capture_idx]);
                },

                // 시간 갱신
                onTimeUpdate: function () {
                        // 준비
                        var video = _parent._media();
                        var target = ar_thumbnail_container[i_thumbnail_capture_idx];

                        // 캡쳐
                        target.width = video.videoWidth;
                        target.height = video.videoHeight;
                        target.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                        target.time_to_move = ar_thumbnail_capture_time[i_thumbnail_capture_idx];

                        // * 내보내기
                        var dataURI = target.toDataURL('image/jpeg');
                        //console.log(dataURI);

                        // 이벤트 붙이기
                        $(target).click(function (event) { _parent._module().core.castMove(event.target.time_to_move); });

                        // 다음 동작
                        if (i_thumbnail_capture_idx + 1 >= ar_thumbnail_capture_time.length) { // 캡쳐 종료
                                // 원복 및 리스너 해제
                                _parent._module().core.castMove(0);
                                _parent._media().removeEventListener("timeupdate", _this.onTimeUpdate);

                                // 무력화 해제
                                if (_parent._module().btnPlay != null) { _parent._module().btnPlay.setNeutralize(false); }
                                if (_parent._module().btnStop != null) { _parent._module().btnStop.setNeutralize(false); }
                                if (_parent._module().barTime != null) { _parent._module().barTime.setNeutralize(false); }
                                if (_parent._module().laeTime != null) { _parent._module().laeTime.setNeutralize(false); }
                                if (_parent._module().cover != null) { _parent._module().cover.setNeutralize(false); }

                                // 컨테이너 보임
                                $(ele_thumbnail_container).css("display", "inline-block");
                                $(obj_visiblearea).css("display", "none");
                        } else { // 다음 캡쳐
                                i_thumbnail_capture_idx++;
                                _this.captureThumbnail();
                        }
                },

                // 썸네일 로드
                loadThumbnail: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# thumbnail.loadThumbnail() try"); }

                        // 조건검사
                        if (_parent._file() == null || _parent._file() == "") { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# thumbnail.loadThumbnail()"); }

                        // 준비
                        var video = _parent._media();

                        // 로드
                        for (var ii = 0 ; ii < ar_thumbnail_container.length ; ii++) {
                                var target = ar_thumbnail_container[ii];
                                target.time_to_move = ar_thumbnail_capture_time[ii];
                                $(target).css("background-image", "url(" + PATH_IMAGE_POSTER + _parent._file() + "_" + ii + ".jpg)");
                                $(target).unbind("click");
                                $(target).click(function (event) { _parent._module().core.castMove(event.target.time_to_move); });
                        }

                        // 컨테이너 보임
                        $(ele_thumbnail_container).css("display", "inline-block");
                        $(obj_visiblearea).css("display", "none");

                        // 변수
                        b_activated = true;
                },

                // 설정 수집, 적용
                getState: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.getState()"); }

                        // 준비
                        obj = {};

                        // 수집
                        obj.ar_thumbnail_capture_time = [];
                        obj.b_activated = b_activated;
                        $.extend(true, obj.ar_thumbnail_capture_time, ar_thumbnail_capture_time);

                        // 변수
                        b_activated = false;

                        // 반환
                        return obj;
                },
                setState: function (obj) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# roleplay.setState(" + obj + ")"); }

                        // 풀스크린 전용(데이터 옮기기)
                        if (_parent._option().fullscreen_target == true) {
                                // 정보 이동
                                ar_thumbnail_capture_time = [];
                                $.extend(true, ar_thumbnail_capture_time, obj.ar_thumbnail_capture_time);

                                // 재설정
                                _this.loadThumbnail();
                        } else {
                                // 변수
                                b_activated = obj.b_activated;
                        }
                },
        }
}

// mediaplayer_compo_btnUpdown 상/하향음 버튼(단순 changeMedia 기능 버튼)
var mediaplayer_compo_btnUpdown = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var i_current_updown; // up down 상태 (changeMedia 를 통해 변경 됨) -1:down, 0:all, 1:up

        // object
        var dic_updown_data; // updown 관련 데이터(mediaplayer.js 의 _onInit 에서 정리)

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnUpdown.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        dic_updown_data = _parent._module().customizer.btnUpdown_onInit();

                        // 초기상태
                        i_current_updown = dic_updown_data.init_i_current_updown;

                        // 버튼
                        var hie = _parent._hierarchy();
                        if (hie.btnUpdownAll != null) {
                                $(hie.btnUpdownAll).css("cursor", "pointer");
                                $(hie.btnUpdownAll).click(function (event) { _this.onButtonClick("btnUpdown", 0, event.target); })
                        }
                        if (hie.btnUpdownUp != null) {
                                $(hie.btnUpdownUp).css("cursor", "pointer");
                                $(hie.btnUpdownUp).click(function (event) { _this.onButtonClick("btnUpdown", 1, event.target); })
                        }
                        if (hie.btnUpdownDown != null) {
                                $(hie.btnUpdownDown).css("cursor", "pointer");
                                $(hie.btnUpdownDown).click(function (event) { _this.onButtonClick("btnUpdown", -1, event.target); })
                        }
                },

                // 참조
                i_current_updown: function (ii) { i_current_updown = ii; },

                ///// event

                // 리셋
                onHardReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnUpdown.onHardReset()"); }

                        // 체크
                        if (i_current_updown != dic_updown_data.init_i_current_updown) {
                                _this.onButtonClick("btnUpdown", dic_updown_data.init_i_current_updown, $(_parent._hierarchy().btnUpdown));
                                _this.updateUI();
                        } else {
                                _this.onReset();
                        }
                },
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnUpdown.onReset()"); }

                        // 변수
                        i_current_updown = dic_updown_data.init_i_current_updown;

                        // 갱신
                        _this.updateUI();
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnUpdown.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 준비
                        var id = _parent._id();
                        var name = tools_getSourceFileName(_parent._file());
                        var current = dic_updown_data[name];

                        // 조건검사
                        if (idx == i_current_updown) { return; }

                        // 대상 검색
                        var target;
                        $.each(dic_updown_data, function () { if (this.index == current.index && this.updown == idx) { target = this; } });

                        // 실행
                        var option;
                        switch (idx) {
                                case -1: option = "updownDown"; break;
                                case 0: option = "updownAll"; break;
                                case 1: option = "updownUp"; break;
                        }
                        changeMedia(id, target.media, null, null, option);

                        // UI 갱신
                        _this.updateUI();
                },

                // UI 갱신
                updateUI: function (str) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnUpdown.updateUI() try"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 갱신
                        if (hie.btnUpdownUp != null) { tools_setOn(hie.btnUpdownUp, false); }
                        if (hie.btnUpdownAll != null) { tools_setOn(hie.btnUpdownAll, false); }
                        if (hie.btnUpdownDown != null) { tools_setOn(hie.btnUpdownDown, false); }

                        // 분기
                        switch (i_current_updown) {
                                case 1: if (hie.btnUpdownUp != null) { tools_setOn(hie.btnUpdownUp, true); } break;
                                case 0: if (hie.btnUpdownAll != null) { tools_setOn(hie.btnUpdownAll, true); } break;
                                case -1: if (hie.btnUpdownDown != null) { tools_setOn(hie.btnUpdownDown, true); } break;
                        }
                },
        }
}

// mediaplayer_compo_btnChange 미디어 교체 버튼
var mediaplayer_compo_btnChange = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var i_current_media = 0; // 0:원본, 1:교체

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnChange.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.btnChange_onInit();

                        // 버튼
                        $(_parent._hierarchy().btnChange).css("cursor", "pointer");
                        $(_parent._hierarchy().btnChange).click(function (event) { _this.onButtonClick("btnChange", 0, event.target); })
                },

                // 참조
                i_current_media: function (ii) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnChange.i_current_media(" + ii + ")"); }

                        // 반환
                        if (ii == null) { return i_current_media; }

                        // 설정
                        i_current_media = ii;
                },

                ///// event

                // 리셋
                onHardReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnChange.onHardReset()"); }

                        // 음정 체크
                        if (i_current_media != 0) {
                                // 음원 변경
                                var file_tail = _parent._option().exist_btnChange.split("@")[0];
                                var target_file = tools_getSourceFileName(_parent._file(), file_tail);
                                changeMedia(_parent._id(), target_file, "data_" + target_file, null, "btnChange0");
                                _this.updateUI();
                        } else {
                                // 일반 리셋
                                _this.onReset();
                        }
                },
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnChange.onReset()"); }

                        //
                        b_neutralize = false;
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnChange.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnChange.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 동작
                        var other_ar = _parent._option().exist_btnAnotherChange.split("@");
                        var file_tail = other_ar[0];
                        var data_tail = (other_ar.length > 1) ? other_ar[1] : "";
                        var target_file = tools_getSourceFileName(_parent._file(), file_tail);
                        var target_data = tools_getSourceFileName(_parent._tag().data, data_tail);

                        var ar = _parent._option().exist_btnChange.split("@");
                        file_tail = ar[0];
                        data_tail = (ar.length > 1) ? ar[1] : "";
                        target_file = tools_getSourceFileName(target_file, file_tail);
                        target_data = tools_getSourceFileName(target_data, data_tail);

                        if (i_current_media == 0) { // 현재 원본
                                changeMedia(_parent._id(), target_file + file_tail, target_data + data_tail, _parent._tag().subtitle, "btnChange1");
                                _this.updateUI();
                        } else { // 현재 교체본
                                changeMedia(_parent._id(), target_file, target_data, _parent._tag().subtitle, "btnChange0");
                                _this.updateUI();
                        }

                        // 전달
                        if (_parent._module().follow != null) { _parent._module().follow.onReset(); }
                        if (_parent._module().btnAnotherChange != null) {
                                _parent._module().btnAnotherChange.i_current_media(0);
                                _parent._module().btnAnotherChange.updateUI();
                        }

                        // 풀스크린 버튼 숨기기
                        if (_parent._module().fullscreen != null && typeof (HIDE_FULLSCREEN_BTN_ON_FOLLOW_OR_ROLEPLAY) != "undefined") {
                                if (HIDE_FULLSCREEN_BTN_ON_FOLLOW_OR_ROLEPLAY == true) { _parent._module().fullscreen.updateBtnVisible(); }
                        }
                },

                // UI 갱신
                updateUI: function (str) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnChange.onUpdateUI() try"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 버튼
                        if (hie.btnChange != null) { tools_setOn(hie.btnChange, (i_current_media != 0)); }
                },
        }
}
var mediaplayer_compo_btnAnotherChange = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var i_current_media = 0; // 0:원본, 1:교체

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnAnotherChange.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.btnAnotherChange_onInit();

                        // 버튼
                        $(_parent._hierarchy().btnAnotherChange).css("cursor", "pointer");
                        $(_parent._hierarchy().btnAnotherChange).click(function (event) { _this.onButtonClick("btnAnotherChange", 0, event.target); })
                },

                // 참조
                i_current_media: function (ii) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnAnotherChange.i_current_media(" + ii + ")"); }

                        // 반환
                        if (ii == null) { return i_current_media; }

                        // 설정
                        i_current_media = ii;
                },

                ///// event

                // 리셋
                onHardReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnAnotherChange.onHardReset()"); }

                        // 음정 체크
                        if (i_current_media != 0) {
                                // 음원 변경
                                var file_tail = _parent._option().exist_btnAnotherChange.split("@")[0];
                                var target_file = tools_getSourceFileName(_parent._file(), file_tail);
                                changeMedia(_parent._id(), target_file, "data_" + target_file, null, "btnAnotherChange0");
                                _this.updateUI();
                        } else {
                                // 일반 리셋
                                _this.onReset();
                        }
                },
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnAnotherChange.onReset()"); }

                        //
                        b_neutralize = false;
                },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnAnotherChange.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnAnotherChange.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 동작
                        var other_ar = _parent._option().exist_btnChange.split("@");
                        var file_tail = other_ar[0];
                        var data_tail = (other_ar.length > 1) ? other_ar[1] : "";
                        var target_file = tools_getSourceFileName(_parent._file(), file_tail);
                        var target_data = tools_getSourceFileName(_parent._tag().data, data_tail);

                        var ar = _parent._option().exist_btnAnotherChange.split("@");
                        file_tail = ar[0];
                        data_tail = (ar.length > 1) ? ar[1] : "";
                        target_file = tools_getSourceFileName(target_file, file_tail);
                        target_data = tools_getSourceFileName(target_data, data_tail);

                        if (i_current_media == 0) { // 현재 원본
                                changeMedia(_parent._id(), target_file + file_tail, target_data + data_tail, _parent._tag().subtitle, "btnAnotherChange1");
                                _this.updateUI();
                        } else { // 현재 교체본
                                changeMedia(_parent._id(), target_file, target_data, _parent._tag().subtitle, "btnAnotherChange0");
                                _this.updateUI();
                        }

                        // 전달
                        if (_parent._module().follow != null) { _parent._module().follow.onReset(); }
                        if (_parent._module().btnChange != null) {
                                _parent._module().btnChange.i_current_media(0);
                                _parent._module().btnChange.updateUI();
                        }

                        // 풀스크린 버튼 숨기기
                        if (_parent._module().fullscreen != null && typeof (HIDE_FULLSCREEN_BTN_ON_FOLLOW_OR_ROLEPLAY) != "undefined") {
                                if (HIDE_FULLSCREEN_BTN_ON_FOLLOW_OR_ROLEPLAY == true) { _parent._module().fullscreen.updateBtnVisible(); }
                        }
                },

                // UI 갱신
                updateUI: function (str) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# btnAnotherChange.onUpdateUI() try"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 버튼
                        if (hie.btnAnotherChange != null) { tools_setOn(hie.btnAnotherChange, (i_current_media != 0)); }
                },
        }
}

// mediaplayer_compo_follow 따라말하기
var mediaplayer_compo_follow = function (p_parent) {

        ///// variables

        // dev
        var b_trace_detail = true;

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        // state
        var b_current_follow = false; // 현재 상태
        var i_current_follow = -1; // 현재 follow 인덱스
        var b_show_bar = false; // 막대 보여짐 상태
        var date_bar_progress_start; // 막대 시작 시간
        var b_onended_revise = false; // onEnded 보정 여부(duration 이 유효 해야 처리 가능)
        var b_wait_onsubtitle = false; // 문장 클릭 재생 방어

        // obj
        var id_interval_follow; // 따라하기 막대 진행 인터벌 id
        var id_timeout_onsubtitle
        var ar_follow_time; // 따라말하기 시간 정보
        // start, end, duration

        ///// function
        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# follow.init()"); }

                        // 연결
                        _this = this;

                        // 접근자
                        _parent._tag().data = ($(_parent._ele()).attr("data-data") != null) ? $(_parent._ele()).attr("data-data") : "data_" + _parent._file();

                        // 커스터마이저
                        _parent._module().customizer.follow_onInit();

                        // 준비
                        var hie = _parent._hierarchy();

                        // 버튼
                        $(hie.btnFollow).css("cursor", "pointer");
                        $(hie.btnFollow).click(function (event) { _this.onButtonClick("btnFollow", 0, event.target); })

                        // 바
                        $(hie.barFollow).css("display", "none");

                        // 데이터 준비
                        tools_setMediaData();

                        // 설정
                        _this.setFollow();
                },

                // 참조
                b_current_follow: function () { return b_current_follow; },
                b_show_bar: function () { return b_show_bar; },

                ///// event

                // 리셋
                onReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# follow.onReset()"); }

                        // 열려있었으면 닫기
                        _this.hideBarFollow(true);

                        // 변수
                        b_current_follow = false;
                        i_current_follow = -1;
                        if (id_interval_follow != null) {
                                clearInterval(id_interval_follow);
                                id_interval_follow = null;
                        }
                        if (id_timeout_onsubtitle != null) {
                                clearTimeout(b_wait_onsubtitle);
                                id_interval_follow = null;
                        }
                        b_wait_onsubtitle = false;

                        // 갱신
                        _this.updateUI();
                },

                // onEnded
                onEnded: function () {
                        // 조건검사
                        if (b_current_follow == false) { return; }
                        if (ar_follow_time[ar_follow_time.length - 1].end == null) { return; }

                        // onEnded 따라말하기
                        setTimeout(function () {
                                i_current_follow = ar_follow_time.length - 1;
                                _this.showBarFollow(i_current_follow);
                                _parent._hierarchy().barFollow.pause_on_end = true;
                        }, 1);
                },

                // 멈춤상태에서 castStop 예외처리
                onCastStopInStop: function () { _this.hideBarFollow(); },

                // 버튼 이벤트
                onButtonClick: function (tag, idx, btn) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# follow.onButtonClick(" + tag + ", " + idx + ", " + btn + ") try"); }

                        // 조건검사
                        if (_parent._module().core.b_disable_input() == true) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# follow.onButtonClick(" + tag + ", " + idx + ", " + btn + ")"); }

                        // 변수
                        b_current_follow = !b_current_follow;

                        // 활성화
                        if (b_current_follow == true) {
                                // 전달
                                if (_parent._module().roleplay != null) { _parent._module().roleplay.onReset(); }
                                if (_parent._module().btnChange != null) { _parent._module().btnChange.onHardReset(); }
                        }

                        // 풀스크린 버튼 숨기기
                        if (_parent._module().fullscreen != null && typeof (HIDE_FULLSCREEN_BTN_ON_FOLLOW_OR_ROLEPLAY) != "undefined") {
                                if (HIDE_FULLSCREEN_BTN_ON_FOLLOW_OR_ROLEPLAY == true) { _parent._module().fullscreen.updateBtnVisible(); }
                        }

                        // 정지
                        _parent._module().core.castStop();

                        // 갱신
                        _this.updateUI();
                },

                // onInteraction
                onInteraction: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# follow.onInteraction()"); }

                        //
                        _this.hideBarFollow(true);
                },

                // onTimeUpdate
                onTimeUpdate: function () {
                        // 조건검사
                        if (b_current_follow == false) { return; }

                        // 준비
                        var time = _parent._media().currentTime;
                        var idx = tools_getPositionInArray(ar_follow_time, time);

                        // onEnded 보정
                        if (b_onended_revise == false) {
                                // 변수
                                b_onended_revise = true;

                                // 마지막 시작 위치가 duration 을 넘어가면 예외처리 설정
                                if (ar_follow_time[ar_follow_time.length - 1][0] > _parent._media().duration) {
                                        ar_follow_time[ar_follow_time.length - 1].end = true;
                                }
                        }

                        // 범위 벗어남
                        if (idx == -1 && i_current_follow != -1 && (ar_follow_time[i_current_follow][0] - 0.15 < time && time < ar_follow_time[i_current_follow][0] + 0.15) == false) { i_current_follow = -1; }

                        // 조건검사
                        if (idx == -1 || idx == i_current_follow) { return; }
                        if (b_wait_onsubtitle == true) { return; }

                        // 변수
                        i_current_follow = idx;

                        // 멈춤
                        _parent._module().core.castPause();

                        // 막대 보이게 함
                        _this.showBarFollow(idx);
                },

                // 문장 클릭 재생
                onSubtitleClick: function () {
                        b_wait_onsubtitle = true;
                        id_timeout_onsubtitle = setTimeout(function () { b_wait_onsubtitle = false; }, 260);
                },

                ///// function

                // 설정
                setFollow: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# follow.setFollow()"); }

                        // 준비
                        var hie = _parent._hierarchy();
                        var revise_time_text_end = (tools_chkBrowser() == "ie10" || tools_chkBrowser() == "ie11") ? REVISE_TEXT_END_ON_IE : 0;

                        // 데이터 정리
                        var tag_data = _parent._tag().data;
                        var dic = dicMediaData[tag_data];

                        // 조건검사
                        if (dic == null) {
                                if (dev_trace_null == true) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 자막 data 가 준비되어 있지 않습니다."); }
                                return;
                        }

                        // 데이터 입력 또는 생성
                        if (dic.follow == null) { // follow 데이터 없음
                                if (dic.subtitle != null) { // subtitle 데이터는 있음 : 가공
                                        ar_follow_time = [];
                                        for (var ii = 0 ; ii < dic.subtitle.length ; ii++) {
                                                var time_start = dic.subtitle[ii][0] + revise_time_text_end;
                                                var time_end = dic.subtitle[ii][1] + revise_time_text_end;
                                                ar_follow_time[ii] = [time_end, time_end + 0.25, (time_end - time_start) * FOLLOW_DURATION_CORRECTION];
                                        }
                                } else {
                                        if (dev_trace_null == true) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 자막 data 의 follow 및 subtitle 이 준비되어 있지 않습니다. 둘 중 하나는 필요합니다."); }
                                        return;
                                }
                        } else {
                                console.error("MediaPlayer 오류 : " + _parent._id() + " 의 follow 데이터 수동 생성 기능은 제거되었습니다.");
                        }
                },

                // 막대 제어
                showBarFollow: function (idx) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# follow.showBarFollow(" + idx + ")"); }

                        // 준비
                        var start = ar_follow_time[idx][0];
                        var duration = ar_follow_time[idx][2];

                        // 사라진 후 멈춤 판단
                        _parent._hierarchy().barFollow.pause_on_end = false;
                        if (_parent._module().subtitle != null) {
                                if (_parent._module().subtitle.b_text_end() == true) { _parent._hierarchy().barFollow.pause_on_end = true; }
                        }

                        // 가시여부
                        $(_parent._hierarchy().barFollow).css("display", "inline-block");

                        // 변수
                        b_show_bar = true;
                        date_bar_progress_start = new Date();

                        // 막대 초기화
                        $(_parent._hierarchy().barFollow.current).css("width", "0%");

                        // 커버버튼 갱신
                        if (_parent._module().cover != null) { _parent._module().cover.onInteraction(); }

                        // 인터벌
                        id_interval_follow = setInterval(function () {
                                var now = new Date();
                                var time_prog = now - date_bar_progress_start;
                                var percentage = (time_prog / (duration * 1000)) * 100;
                                $(_parent._hierarchy().barFollow.current).css("width", percentage + "%");
                                if (percentage >= 100) { _this.hideBarFollow(); }
                        }, TIMEOUT_FORCE_TIMEUPDATE);

                        // 시간 보정
                        //_parent._media().currentTime = start;

                        // 자막 강제 보정
                        _parent._module().subtitle.setDialogue(idx);
                        if (_parent._module().subtitle != null) { setTimeout(function () { _parent._module().subtitle.setDialogue(idx); }, 10); }
                        if (_parent._module().subtitle != null) { setTimeout(function () { _parent._module().subtitle.setDialogue(idx); }, 50); }
                        if (_parent._module().subtitle != null) { setTimeout(function () { _parent._module().subtitle.setDialogue(idx); }, 100); }
                },
                hideBarFollow: function (onreset) {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# follow.hideBarFollow(" + onreset + ") try"); }

                        // 조건검사
                        if (b_show_bar == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# follow.hideBarFollow(" + onreset + ")"); }

                        // 가시여부
                        $(_parent._hierarchy().barFollow).css("display", "none");

                        // 변수
                        b_show_bar = false;

                        // 인터벌
                        if (id_interval_follow != null) {
                                clearInterval(id_interval_follow);
                                id_interval_follow = null;
                        }

                        // 자막 강제 보정
                        if (_parent._module().subtitle != null) { _parent._module().subtitle.setDialogue(); }

                        // 재생
                        if (_parent._hierarchy().barFollow.pause_on_end == false && (onreset == null || onreset == false)) { _parent._module().core.castPlay(1); }
                },

                // UI 갱신
                updateUI: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id() && b_trace_detail == true) { console.log("# follow.onUpdateUI() try"); }

                        // 준비
                        var hie = _parent._hierarchy();

                        // 버튼
                        if (hie.btnFollow != null) { tools_setOn(hie.btnFollow, b_current_follow); }
                },
        }
}