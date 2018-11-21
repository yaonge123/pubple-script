// version 1.0.60 : ZERO_REVISE 로 변경, tools_chkPlatform 추가
///// mediaplayer_hq.js

///// variables

// object
var mp_data = {}; // 데이터 객체 (html 에서 덮어쓰기 함)
var dicMediaPlayer = {}; // 미디어플레이어 객체 저장 Dictionary
var dicMediaData; // 미디어 데이터 객체 저장 Dictionary

// global var
var id_fullscreen; // 풀스크린 된 미디어플레이어 ID

// sysytem
var b_setup_mp = false; // 셋업 여부
var hq_scale_multiplier_x; // 스케일 멀티플라이어(1 / DEV.ui.scaleVal.x);
var hq_scale_multiplier_y;
var i_mediaplayer_auto_create = 0; // 미디어플레이어 id 자동생성 인덱스

// trace
var date_lastloop = new Date; // fps 추적용 변수
var total_fps = 0; // FPS 합계 (평균을 내기 위한 작업)
var repeat_fps = 0; // FPS 체크 반복 회수 상동





///// initialize

// load
$(window).on("load", function () {
        // html 문서를 검색하여 loadScript 가 존재할 경우 자동 호출을 실행하지 않는다.
        // 이 때는 html 에서 관련 처리를 마친 후 직접 setupMediaPlayer() 를 호출.
        if ($(document).find(".loadScript").length == 0) {
                if (dev_mode == true && dev_trace_event == true) { console.log("! call setupMediaPlayer"); }
                setTimeout(function () { setupMediaPlayer(); }, 250);
        }
});





///// function

// setup
function setupMediaPlayer() {
        // 조건검사
        if (b_setup_mp == true) { return; }
        b_setup_mp = true;

        // 연결
        $(".mp_text").each(function (key, value) {
                var id;
                if ($(value).attr("id") != null) {
                        id = $(value).attr("id");
                } else {
                        id = "mp_" + i_mediaplayer_auto_create + "_" + value.textContent;
                        i_mediaplayer_auto_create++;
                }

                if (dicMediaPlayer[id] != null) { console.error("MediaPlayer 오류 : 이미 존재하는 id:" + id + "가 선언 되었습니다."); return; }
                dicMediaPlayer[id] = mediaplayer_template("mp_text", value); // 생성 및 보관
                dicMediaPlayer[id].init(id); // 초기화
        });
        $(".mp_audio").each(function (key, value) {
                var id;
                if ($(value).attr("id") != null) {
                        id = $(value).attr("id");
                } else {
                        id = "mp_" + i_mediaplayer_auto_create;
                        i_mediaplayer_auto_create++;
                }
                if (dicMediaPlayer[id] != null) { console.error("MediaPlayer 오류 : 이미 존재하는 id:" + id + "가 선언 되었습니다."); return; }
                dicMediaPlayer[id] = mediaplayer_template("mp_audio", value); // 생성 및 보관
                dicMediaPlayer[id].init(id); // 초기화
        });
        $(".mp_video").each(function (key, value) {
                var id;
                if ($(value).attr("id") != null) {
                        id = $(value).attr("id");
                } else {
                        id = "mp_" + i_mediaplayer_auto_create;
                        i_mediaplayer_auto_create++;
                }
                if (dicMediaPlayer[id] != null) { console.error("MediaPlayer 오류 : 이미 존재하는 id:" + id + "가 선언 되었습니다."); return; }
                dicMediaPlayer[id] = mediaplayer_template("mp_video", value); // 생성 및 보관
                dicMediaPlayer[id].init(id); // 초기화
        });

        // 스케일 멀티플라이어 : html 에서 사용되는 크기 관련 특수 라이브러리에서 받아오는 값 - 크기 관련 보정에 사용.
        hq_scale_multiplier_x = 1;
        hq_scale_multiplier_y = 1;
        if (typeof DEV !== "undefined" && typeof DEV.ui !== "undefined" && DEV.ui.scaleVal !== null) {
                hq_scale_multiplier_x = 1 / DEV.ui.scaleVal.x;
                hq_scale_multiplier_y = 1 / DEV.ui.scaleVal.y;
        }

        // 개발
        if (dev_mode == true) {
                // 키 입력
                setDevKeyInput();
                
                // 인풋 추적
                if (dev_trace_input == true) {
                        // 마우스 위치
                        document.addEventListener("mousemove", function (event) {
                                console.log(event.pageX + ", " + event.pageY);
                        });

                        // 클릭 오브젝트 위치
                        $(document).click(function (e) {
                                var abs = tools_getAbsPosition(e.target);
                                console.log("abs : " + abs.left + ", " + abs.top);
                        })
                }

                // 추적
                if (dev_mode == true && dev_data == true) {
                        console.log("===== Media Player =====");
                        console.log("MobileOs : " + tools_chkMobileOS());
                        console.log("Browser : " + tools_chkBrowser());
                        console.log("dicMediaPlayer : ");
                        console.log(dicMediaPlayer);
                        console.log("========================");
                }
        }

        // 개발
        if (dev_mode == true && dev_trace_event == true) {
                console.log("! setupMediaPlayer complete");
                console.log("\thq_scale_multiplier_x:" + hq_scale_multiplier_x + ", hq_scale_multiplier_y:" + hq_scale_multiplier_y);
        }
}
function setCompoByType_common_step0(_parent) {
        // 준비
        var option = _parent._option();

        // 기본 설정
        switch (_parent._type()) {
                case "mp_text":
                        _parent._category("audio"); // 오디오
                        option.reset_on_stop = true; // 정지 시 리셋
                        option.exist_mpText = true; // mp_text
                        break;
                case "mp_audio":
                        _parent._category("audio"); // 오디오
                        // 프리로드
                        option.preload = true;
                        if (tools_chkMobileOS() == "ios") { option.preload = SET_PRELOAD_AUDIO.ios; }
                        else if (tools_chkMobileOS() == "android") { option.preload = SET_PRELOAD_AUDIO.android; }
                        else {
                                if (tools_chkBrowser() == "edge") { option.preload = SET_PRELOAD_AUDIO.edge; }
                                else if (tools_chkBrowser() == "chrome") { option.preload = SET_PRELOAD_AUDIO.chrome; }
                                else if (tools_chkBrowser() == "safari") { option.preload = SET_PRELOAD_AUDIO.safari; }
                                else { option.preload = SET_PRELOAD_AUDIO.ie; }
                        }
                        break;
                case "mp_video":
                        _parent._category("video"); // 비디오
                        // 프리로드
                        option.preload = true;
                        if (tools_chkMobileOS() == "ios") { option.preload = SET_PRELOAD_VIDEO.ios; }
                        else if (tools_chkMobileOS() == "android") { option.preload = SET_PRELOAD_VIDEO.android; }
                        else {
                                if (tools_chkBrowser() == "edge") { option.preload = SET_PRELOAD_VIDEO.edge; }
                                else if (tools_chkBrowser() == "chrome") { option.preload = SET_PRELOAD_VIDEO.chrome; }
                                else if (tools_chkBrowser() == "safari") { option.preload = SET_PRELOAD_VIDEO.safari; }
                                else { option.preload = SET_PRELOAD_VIDEO.ie; }
                        }
                        break;
        }

        // 컴포 읽어들이기
        var compo = ($(_parent._ele()).attr("data-compo") == null) ? "" : $(_parent._ele()).attr("data-compo"); // 설정이 되어 있지 않으면 디폴트

        // 디폴트 설정
        if (compo == "") {
                switch (_parent._type()) {
                        case "mp_text": break;
                        case "mp_audio": compo = "audio"; break;
                        case "mp_video": compo = "video"; break;
                }
        }

        // 반환
        return compo;
}
function setCompoByType_common_step1(_parent, ar) {
        // 준비
        var option = _parent._option();
        var ar_compo_order = []; // 컴포넌트 순서 정리를 위한 배열

        // 플랫폼 별 설정
        if (tools_chkMobileOS() == "ios") { ar = $.grep(ar, function (val) { return val != "volume"; }); }
        if (tools_chkMobileOS() == "android") { ar = $.grep(ar, function (val) { return val != "playbackrate"; }); }

        // 컴포넌트 및 옵션 설정
        for (var ii = 0 ; ii < ar.length ; ii++) {
                var ar_detail = ar[ii].split(":");
                switch (ar_detail[0]) {
                        // 특수옵션
                        case "fullscreentarget": // 풀스크린을 위한 타겟 미디어플레이어
                                option.exist_fullscreen = true;
                                option.fullscreen_target = true;
                                ar_compo_order.push("fullscreen");
                                break;
                        case "no_ui": option.no_ui = true; break; // UI 없음
                        case "no_text_event": option.no_text_event = true; break; // 자막에 이벤트 걸지 않음
                        case "scroll": option.subtitle_scroll = true; break; // 자막에 라이브러리 스크롤 있음
                        case "exception": // 예외
                                if (ar_detail.length == 1) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 exception:xxx 형식이 필요합니다."); return; } // 조건검사
                                tools_inputParameter(option.exception, ar_detail); // 등록
                                break;
                                // 커스텀 구성물 추가
                        case "custom":
                                if (ar_detail.length == 1) {
                                        console.error("MediaPlayer 오류 : " + _parent._id() + " 의 custom:xxx 형식이 필요합니다.")
                                } else {
                                        var custom_name = ar_detail[1];
                                        if ($("#" + custom_name).length == 0) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 custom 엘리먼트 " + custom_name + "이 존재하지 않습니다."); }
                                        var ar_custom_ele = $("#" + custom_name)[0].children;
                                        _parent._custom()[custom_name] = ar_custom_ele;
                                        ar_compo_order.push(custom_name);
                                }
                                break;
                                // 이벤트 등록
                        case "event":
                                if (ar_detail.length == 1) { console.error("MediaPlayer 오류 : " + _parent._id() + " 의 event:xxx 형식이 필요합니다."); return; } // 조건검사
                                tools_inputParameter(option.event, ar_detail); // 등록
                                break;
                                // 컴포넌트
                        case "btnPlay": // 재생버튼
                                option.exist_btnPlay = true;
                                ar_compo_order.push("btnPlay");
                                break;
                        case "btnStop": // 정지버튼
                                option.exist_btnStop = true;
                                ar_compo_order.push("btnStop");
                                break;
                        case "btnMove": // FWD, BWD 버튼
                                option.exist_btnMove = true;
                                ar_compo_order.push("btnMove");
                                break;
                        case "barTime": // 시간막대
                                option.exist_barTime = true;
                                ar_compo_order.push("barTime");
                                break;
                        case "laeTime": // 시간레이블
                                option.exist_laeTime = true;
                                break;
                        case "volume": // 볼륨컨트롤(사운드on/off 버튼 + 볼륨조절막대)
                                option.exist_volume = true;
                                ar_compo_order.push("volume");
                                break;
                        case "repeat": // 구간반복
                                option.exist_repeat = true;
                                ar_compo_order.push("repeat");
                                break;
                        case "loop": // 루프버튼
                                option.exist_loop = true;
                                ar_compo_order.push("loop");
                                break;
                        case "playbackrate": // 재생속도컨트롤
                                option.exist_playbackrate = true;
                                ar_compo_order.push("playbackrate");
                                break;
                        case "fullscreen": // 전체화면버튼
                                option.exist_fullscreen = true;
                                if (ar_detail.length == 1) { option.fullscreen_style = ""; }
                                else { option.fullscreen_style = "_" + ar_detail[1]; }
                                ar_compo_order.push("fullscreen");
                                break;
                        case "cover": option.exist_cover = true; break; // 포스터
                        case "thumbnail": option.exist_thumbnail = true; break; // 썸네일
                        case "follow": // 따라말하기
                                option.exist_follow = true;
                                ar_compo_order.push("follow");
                                break;
                        case "subtitle": option.exist_subtitle = true; break; // 자막
                        case "btnSubtitle": // 자막 on/off 버튼(자막 자동 설정)
                                if (ar_detail.length == 1) { option.exist_btnSubtitle = 0; }
                                else if (ar_detail[1] == "on") { option.exist_btnSubtitle = 1; }
                                ar_compo_order.push("btnSubtitle");
                                break;
                        case "btnLanguage": // 한/영 버튼 (자막 자동 설정)
                                option.exist_btnLanguage = true;
                                ar_compo_order.push("btnLanguage");
                                break;
                        case "btnLanKor": // 한 버튼 (자막 자동 설정)
                                option.exist_btnLanKor = true;
                                ar_compo_order.push("btnLanKor");
                                break;
                        case "btnLanEng": // 영 버튼 (자막 자동 설정)
                                option.exist_btnLanEng = true;
                                ar_compo_order.push("btnLanEng");
                                break;
                        case "btnFontsize": // 폰트사이즈 버튼 (자막 자동 설정)
                                option.exist_btnFontsize = true;
                                ar_compo_order.push("btnFontsize");
                                break;
                        case "roleplay": // 롤플레이
                                option.exist_roleplay = true;
                                ar_compo_order.push("roleplay");
                                break;
                        case "onetouch": option.exist_onetouch = true; break; // 원터치
                        case "btnChange": // 미디어 교체 버튼
                                if (ar_detail.length == 1) {
                                        console.error("MediaPlayer 오류 : " + _parent._id() + " 의 btnChange:xxx 형식이 필요합니다.")
                                } else {
                                        option.exist_btnChange = ar_detail[1];
                                        ar_compo_order.push("btnChange");
                                }
                                break;
                        case "btnAnotherChange": // 미디어 교체 2
                                if (ar_detail.length == 1) {
                                        console.error("MediaPlayer 오류 : " + _parent._id() + " 의 btnAnotherChange:xxx 형식이 필요합니다.")
                                } else {
                                        option.exist_btnAnotherChange = ar_detail[1];
                                        ar_compo_order.push("btnAnotherChange");
                                }
                                break;
                        case "notes": option.exist_notes = true; break; // 악보
                        case "btnListen": // 전체듣기/소절듣기 버튼
                                option.exist_btnListen = true;
                                ar_compo_order.push("btnListen");
                                break;
                        case "btnWayloop": // 웨이포인트 전용 루프 버튼
                                option.exist_btnWayloop = true;
                                ar_compo_order.push("btnWayloop");
                                break;
                        case "btnFocus": // 포커스 가시여부 조절 버튼
                                option.exist_notes = true;
                                option.exist_btnFocus = true;
                                ar_compo_order.push("btnFocus");
                                break;
                        case "btnLyrics": // 가사 가시여부 조절 버튼
                                option.exist_notes = true;
                                option.exist_btnLyrics = true;
                                ar_compo_order.push("btnLyrics");
                                break;
                        case "btnTune": // 튠 조절 버튼
                                option.exist_btnTune = true;
                                ar_compo_order.push("btnTune");
                                break;
                        case "btnUpdown": // 상,하향음 버튼
                                option.exist_btnUpdown = true;
                                ar_compo_order.push("btnUpdown");
                                break;
                        case "btnScale": // 계이름 표시 별도 버튼 (모양만 바꾼 btnLyrics)
                                option.exist_btnLyrics = true;
                                option.btnScale = true;
                                break;
                                // 특수 템플릿
                        case "btnonly":
                                option.no_ui = true; // UI 없음
                                option.exist_onetouch = true; // 원터치
                                break;
                }
        }

        // 반환
        return ar_compo_order;
}

// reset
function resetAllMediaPlayer(from_parent) {
        $.map(dicMediaPlayer, function (obj, id) { obj.reset(true); });
        var container = tools_getContainer();
        if (from_parent == false && (container == null || container.resetMediaPlayerExcept == null) == false) { container.resetMediaPlayerExcept(window); }
}
function resetAnotherMediaPlayer(target_id) {
        $.map(dicMediaPlayer, function (obj, id) { if (id != target_id) { obj.reset(true); } });
        var container = tools_getContainer();
        if ((container == null || container.resetMediaPlayerExcept == null) == false) { container.resetMediaPlayerExcept(window); }
}

// control
function playMediaPlayer(target_id, start, end) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 동작
        if (start == null && end == null) { dicMediaPlayer[target_id].play(); } // 기본 재생
        else { dicMediaPlayer[target_id].playPartial(start, end); } // 부분 재생
}
function pauseMediaPlayer(target_id) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 동작
        dicMediaPlayer[target_id].pause();
}
function stopMediaPlayer(target_id) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 동작
        dicMediaPlayer[target_id].stop();
}
function setTimeMediaPlayer(target_id, time) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 동작
        dicMediaPlayer[target_id].move(time);
}
function changeMedia(target_id, media, data, subtitle, option) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 동작
        dicMediaPlayer[target_id].changeMedia(media, data, subtitle, option);
}
function moveMedia(source_id, target_id) {
        // 오류 체크
        if (dicMediaPlayer[source_id] == null) { console.error("MediaPlayer 오류 : " + source_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 동작
        var obj = dicMediaPlayer[source_id].getMediaAndSleep();
        if (obj != null) { dicMediaPlayer[target_id].setMedia(obj); }
}
function setNeutralize(target_id, what, b) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 동작
        dicMediaPlayer[target_id].setNeutralize(what, b);
}
function customOrder(target_id, what, param) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 동작
        dicMediaPlayer[target_id].customOrder(what, param);
}
function setClassToCompo(target_id, what, cl, addorremove) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 동작
        dicMediaPlayer[target_id].setClassToCompo(what, cl, addorremove);
}
function setCssToCompo(target_id, what, param1, param2) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 동작
        dicMediaPlayer[target_id].setCssToCompo(what, param1, param2);
}
function getMediaPlayer(target_id) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 반환
        return dicMediaPlayer[target_id];
}

// inner
function setMedia(target_id, obj) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 설정
        dicMediaPlayer[target_id].setMedia(obj, true);
}
function castCustomFullscreen(ref, obj) {
        // 컨테이너로 전달
        var container = tools_getContainer();
        if (container == null || container.callFullscreen == null) { console.error("MediaPlayer 오류 : " + obj.client + " 의 컨테이너가 존재하지 않거나 callFullscreen 함수가 준비되어 있지 않습니다."); }
        else { container.callFullscreen(ref, obj); }
}
function castCustomNormalscreen(received, obj) {
        // 컨테이너로 전달
        var container = tools_getContainer();
        if (container == null || container.callNormalscreen == null) { console.error("MediaPlayer 오류 : " + obj.client + " 의 컨테이너가 존재하지 않거나 callNormalscreen 함수가 준비되어 있지 않습니다."); }
        else { container.callNormalscreen(received, obj); }
}





///// event

// svg 클릭 이벤트
function onSvgClick() { $.map(dicMediaPlayer, function (obj, id) { obj.onSvgClick(); }); }

// 팝업
function onPopupToMediaPlayer() { $.map(dicMediaPlayer, function (obj, id) { obj.onPopupToMediaPlayer(); }); }





///// tools

// 브라우저 판단
function tools_chkBrowser() {
        'use strict';
        var agent = navigator.userAgent.toLowerCase();
        var name = navigator.appName;
        var browser;
        if (name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
                browser = 'ie';
                if (name === 'Microsoft Internet Explorer') {
                        agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
                        browser += parseInt(agent[1]);
                } else {
                        if (agent.indexOf('trident') > -1) { browser += 11; }
                        else if (agent.indexOf('edge/') > -1) { browser = 'edge'; }
                }
        } else if (agent.indexOf('safari') > -1) {
                if (agent.indexOf('opr') > -1) { browser = 'opera'; }
                else if (agent.indexOf('chrome') > -1) { browser = 'chrome'; }
                else { browser = 'safari'; }
        } else if (agent.indexOf('firefox') > -1) {
                browser = 'firefox';
        }
        return browser; // IE: ie7~ie11, Edge: edge, Chrome: chrome, Firefox: firefox, Safari: safari, Opera: opera
}

// 모바일 OS 판단
function tools_chkMobileOS() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/windows phone/i.test(userAgent)) { return "winphone"; }
        if (/android/i.test(userAgent)) { return "android"; }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) { return "ios"; }
        return "N/A";
}

// 플랫폼 판단
function tools_chkPlatform() {
        // 준비
        var rtn = "unknown";
        var mobile = tools_chkMobileOS();
        var browser = tools_chkBrowser();

        // 판단
        if (mobile == "ios") { rtn = "ios"; }
        else if (mobile == "android") { rtn = "android"; }
        else {
                if (browser == "edge") { rtn = "edge"; }
                else if (browser == "chrome") { rtn = "chrome"; }
                else if (browser == "safari") { rtn = "safari"; }
                else if (browser.substring(0, 2) == "ie") { rtn = "ie"; }
        }

        // 반환
        return rtn;
}

// 미디어 데이터 설정
function tools_setMediaData() {
        // 조건검사
        if (dicMediaData != null || mp_data == null) { return; }

        // 딕셔너리 준비
        dicMediaData = {};

        // 정보 가공
        $.each(mp_data, function (key, val) {
                // 배분
                dicMediaData[key] = val;

                // 가공
                if (val.subtitle != null) {
                        // 롤플레이 몇명인지 판단
                        var roleplay = 0;

                        // 정리
                        for (var ii = 0 ; ii < val.subtitle.length ; ii++) {
                                // 조건검사
                                if (roleplay != 0 && val.subtitle[ii][2] == undefined) {
                                        console.log("데이터 설정 오류 - 롤플레이 : " + key);
                                        return;
                                }

                                // 구분
                                if (val.subtitle[ii][2] != undefined && val.subtitle[ii][2] > roleplay) { roleplay = val.subtitle[ii][2]; }
                        }

                        // 입력
                        dicMediaData[key].roleplay = roleplay;
                }
        });

        // 개발
        if (dev_mode == true && dev_data == true) {
                console.log("===== Media Data =====");
                console.log("dicMediaData : ");
                console.log(dicMediaData);
                console.log("======================");
        }
}

// 자리수 채우기(숫자, 자리수 tools_leadingZeros(12, 3) = "012")
function tools_leadingZeros(num, digits) {
        var rtn = "";
        num = num.toString();
        if (num.length < digits) { for (var i = 0; i < digits - num.length; i++) rtn += '0'; }
        return rtn + num;
}

// 엘리먼트 추가 (타입이 아닌 문자열(<div></div>)을 넘겨야 함을 주의)
function tools_addElement(p_str, p_target, p_where) {
        var rtn = $(p_str)[0];
        var where = (p_where == null) ? "under" : p_where;
        switch (where) {
                case "under": $(p_target).append(rtn); break;
                case "after": $(p_target).after(rtn); break;
                case "before": $(p_target).before(rtn); break;
        }
        return rtn;
}

// 버튼 추가 (상동)
function tools_addButton(p_str, p_target, p_client, p_tag, p_idx, p_where) {
        var rtn = tools_addElement(p_str, p_target, (p_where == null) ? null : p_where);
        $(rtn).click(function (event) { p_client.onButtonClick(p_tag, p_idx, event.target); })
        return rtn;
}

// 비디오 사이즈 설정
function tools_setVideoSize(ele, target, full) {
        if (full == null || full == false) { // 보통화면
                // 준비
                var ww = ($(ele).attr("data-w") == null) ? VIDEO_DEFAULT_WIDTH : $(ele).attr("data-w");
                var hh = ($(ele).attr("data-h") == null) ? VIDEO_DEFAULT_HEIGHT : $(ele).attr("data-h");

                // 설정
                $(target).width(ww);
                $(target).height(hh);
        } else { // 전체화면
                $(target).width("100%");
                $(target).height("100%");
        }
}

// 배열 검색
function tools_getPositionInArray(target, time) {
        // 검색
        for (var ii = 0 ; ii < target.length ; ii++) {
                if (target[ii][0] <= time && time <= target[ii][1]) { return ii; }
        }

        // 반환
        return -1;
}
function tools_getIndexInArray(target, str) {
        // 검색
        for (var ii = 0 ; ii < target.length ; ii++) {
                if (target[ii] == str) { return ii; }
        }

        // 반환
        return -1;
}
function tools_getNextInArray(target, time) {
        // 검색
        for (var ii = 0 ; ii < target.length ; ii++) {
                if (time <= target[ii][0]) { return ii; }
        }

        // 반환
        return -1;
}

// 절대 좌표 얻기
function tools_getAbsPosition(target) {
        // 준비
        var obj = $(target);
        //var t_parent = obj.parent();
        var rtn = new Object();
        rtn.top = 0;
        rtn.left = 0;

        // target object의 offset 값 적용
        rtn.top = obj.offset().top;
        rtn.left = obj.offset().left;

        // 반환
        return rtn;
}

// 인아웃 체크
function tools_chkInout(event, target, margin) {
        // 준비
        var zoomvalue = (parent.ZOOMVALUE == undefined) ? 1 : parent.ZOOMVALUE;
        var mx = parseInt(event.pageX * hq_scale_multiplier_x * (1 / zoomvalue));
        var my = parseInt(event.pageY * hq_scale_multiplier_y * (1 / zoomvalue));
        var tx0 = parseInt(($(target).offset().left * hq_scale_multiplier_x) * (1 / zoomvalue) + margin);
        var ty0 = parseInt(($(target).offset().top * hq_scale_multiplier_y) * (1 / zoomvalue) + margin);
        var tx1 = parseInt(tx0 + $(target).width() - (margin * 2));
        var ty1 = parseInt(ty0 + $(target).height() - (margin * 2));

        // 체크
        if (tx0 <= mx && mx <= tx1 && ty0 <= my && my <= ty1) { return true; }
        else { return false; }
}

// 텍스트 이벤트 차일드 처리
function tools_prepareChild(ele, key) {
        $($(ele).children()).each(function () {
                this.idx = key;
                if ($(this).hasClass("noSound") == true) { this.noSound = true; }
                tools_prepareChild(this, key);
        });
}

// 악보 관련 소스 파일 이름 얻기
function tools_getSourceFileName(name, designated) {
        var len = name.length;
        if (designated == null) {
                var tail = name.substr(len - 2, 2);
                if (tail == "_h" || tail == "_l" || tail == "_u" || tail == "_d") { return name.substr(0, len - 2); }
                else { return name; }
        } else {
                var cut = designated.length;
                var tail = name.substr(len - cut, cut);
                if (tail == designated) { return name.substr(0, len - cut); }
                else { return name; }
        }
}

// 컨테이너 얻기
function tools_getContainer() {
        // 옵션 - 뷰어 대응 안함
        if (CONTACTABLE_WITH_PARENT == false) { return null; }

        // 반환
        return window.parent;
}

// 개발 메세지 html에 출력
function tools_consoleLog(idx, str, clear) {
        // 이미 존재 여부
        var target = $(document).find("#divDev" + idx)[0];

        // 없으면 생성
        if (target == null) { target = tools_addElement("<div id='divDev" + idx + "'></div>", $(document).find("#wrap")[0], "before"); }

        // 출력
        if (clear == true) { target.textContent = str; }
        else { target.textContent += str; }
}

// 클래스 넣고, 빼기
function tools_setClass(target, cl, add) {
        if (add == true) { if ($(target).hasClass(cl) == false) { $(target).addClass(cl); } }
        else { if ($(target).hasClass(cl) == true) { $(target).removeClass(cl); } }
}
function tools_setShow(target, add) { tools_setClass(target, "show", add); }
function tools_setOn(target, add) { tools_setClass(target, "on", add); }

// 컴포넌트 파라미터 정리
function tools_inputParameter(target, ar) {
        for (var ii = 1 ; ii < ar.length ; ii++) {
                var ar_detail = ar[ii].split("@");
                if (ar_detail.length == 1) { target[ar_detail[0]] = true; } // 세부 파라미터가 없을 때는 bool : true
                else { target[ar_detail[0]] = ar_detail[1]; } // 세부 파라미터 등록
        }
}

// 템플릿 입력
function tools_setTemplate(str, what, to) { return str.replace(new RegExp("\\b" + what + "\\b"), to); }

// 0 체크
function tools_isCTZero(time) {
        if (typeof (ZERO_REVISE) != "undefined") {
                // 준비
                var platform = tools_chkPlatform();
                var baseline = -1;

                // 분기
                switch (platform) {
                        case "ios": if (ZERO_REVISE.ios != null) { baseline = ZERO_REVISE.ios; } break;
                        case "android": if (ZERO_REVISE.android != null) { baseline = ZERO_REVISE.android; } break;
                        case "edge": if (ZERO_REVISE.edge != null) { baseline = ZERO_REVISE.edge; } break;
                        case "chrome": if (ZERO_REVISE.chrome != null) { baseline = ZERO_REVISE.chrome; } break;
                        case "safari": if (ZERO_REVISE.safari != null) { baseline = ZERO_REVISE.safari; } break;
                        case "ie": if (ZERO_REVISE.ie != null) { baseline = ZERO_REVISE.ie; } break;
                }

                // 반환
                if (baseline == -1) { return time == 0; }
                else { return time < baseline; }
        } else {
                return time == 0;
        }
}