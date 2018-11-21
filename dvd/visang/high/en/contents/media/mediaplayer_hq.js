///// variables

// object
var mp_data = {}; // 데이터 객체 (html 에서 덮어쓰기 함)
var dicMediaPlayer = {}; // 미디어플레이어 객체 저장 Dictionary
var dicMediaData; // 미디어 데이터 객체 저장 Dictionary

// global var
var id_fullscreen; // 풀스크린 된 미디어플레이어 ID

// sysytem
var b_setup_mp = false; // 셋업 여부
var hq_scale_multiplier; // 스케일 멀티플라이어(1 / PUBPLE.ui.scaleValue);

// trace
var date_lastloop = new Date; // fps 추적용 변수
var total_fps = 0; // FPS 합계 (평균을 내기 위한 작업)
var repeat_fps = 0; // FPS 체크 반복 회수 상동





///// initialize

// load
$(document).ready(function () {
        if ($(document).find(".loadScript").length == 0) {
                if (dev_mode == true && dev_trace_event == true) { console.log("! call setupMediaPlayer"); }
                setupMediaPlayer();
        }
});





///// function

// setup
function setupMediaPlayer() {
        // 조건검사
        if (b_setup_mp == true) { return; }
        b_setup_mp = true;

        // 컴포넌트 설정 도움말
        if (dev_mode == true && dev_help == true) {
                console.log("! 미디어 플레이어 관련로그를 보지 않으려면 mediaplayer.js 의 dev_mode 값을 false 로 설정해주세요.");
                console.log("================================");
                console.log("===== 미디어 플레이어 도움말 =====");
                console.log("================================");
                console.log(". 개요");
                console.log("\t* 다음 3 가지 형식으로 선언 합니다.");
                console.log("\t\tmp_text : 텍스트 클릭 시 음성 출력되며 하이라이트 되는 최소 기능.");
                console.log("\t\tmp_audio : 오디오 출력");
                console.log("\t\tmp_video : 비디오 출력");
                console.log(". 속성");
                console.log("\tid : (mp3_text 제외 필수) 아이디. mp_text 를 제외한 미디어 플레이어는 반드시 선언해주세요.");
                console.log("\tmedia : (필수) 출력할 미디어 파일 이름. 경로는 mediaplayer.js 에서 선언하며 확장자는 자동으로 붙습니다.");
                console.log("\tcompo : (선택) 미디어 플레이어에 붙을 컴포넌트 설정. 아래 '컴포넌트 설정 도움말' 참조하여 주세요.");
                console.log(". mp_text");
                console.log("\t텍스트를 누르면 음원을 재생합니다.");
                console.log("\t누를 때 마다 처음부터 다시 재생합니다. (stop & play)");
                console.log("\t재생 중에는 colorOn 클래스 add 되도록 해 두었습니다.");
                console.log("\tid 를 설정하지 않을 경우 \"텍스트내용\" 으로 자동 지정됩니다(textContent).");
                console.log(". mp_video");
                console.log("\tw, h 를 설정하지 않을 경우 mediaplayer.js 의 VIDEO_DEFAULT_WIDTH, VIDEO_DEFAULT_HEIGHT 로 자동 설정 됩니다.");
                console.log("==============================");
                console.log("===== 컴포넌트 설정 도움말 =====");
                console.log("==============================");
                console.log(". 개요");
                console.log("\t* compo=\"\" 형식으로 class 사용과 유사하게 쌍따옴표 안에 필요한 컴포넌트를 선언합니다.");
                console.log("\t* 예) compo=\"audio btnSubtitle\" : 오디오 템플릿 + on/off 버튼이 있는 자막");
                console.log("\t* compo 항목이 없거나 비어있으면 audio/video 템플릿을 적용합니다.");
                console.log(". 컴포넌트");
                console.log("\tbtnPlay : 재생버튼");
                console.log("\tbtnStop : 정지버튼");
                console.log("\tbtnMove : 이동버튼(BWD/FWD)");
                console.log("\tbarTime : 시간막대");
                console.log("\tlaeTime : 시간레이블");
                console.log("\tvolume : 볼륨컨트롤(on/off 버튼 + 볼륨막대)");
                console.log("\trepeat : 구간반복");
                console.log("\tloop : 루프");
                console.log("\tplaybackrate : 재생속도조절");
                console.log("\tfullscreen : 전체화면");
                console.log("\tcover : 포스터(+설정에 따라 큰재생버튼)");
                console.log("\tsubtitle : 자막");
                console.log("\tbtnSubtitle : 자막on/off 버튼(자막은 자동 생성 됨, display:none 으로 초기화)");
                console.log("\tbtnLanguage : 한/영 버튼(자막은 자동 생성 됨, 한글은 숨김으로 초기화)");
                console.log("\tbtnFontsize : 자막폰트사이즈 버튼(자막은 자동 생성 됨)");
                console.log("\troleplay : 롤플레이");
                console.log("\tnotes : 악보");
                console.log("\tthumbnail : 동영상 썸네일");
                console.log(". 템플릿");
                console.log("\taudio : 오디오 템플릿(btnPlay, btnStop, barTime, laeTime, volume, playbackrate)");
                console.log("\tvideo : 비디오 템플릿(btnPlay, btnStop, barTime, laeTime, volume, fullscreen, cover)");
                console.log("===========================");
                console.log("===== 자막 설정 도움말 =====");
                console.log("===========================");
                console.log(". 개요");
                console.log("\t* subtitle, btnSubtitle, btnLanguage 중 하나라도 설정되면 자막 기능이 활성화 됩니다.");
                console.log("\t* (필수) 자막이 담긴 엘리먼트를 다음 속성을 넣어 연결해주세요.");
                console.log("\t\tsubtitle=\"자막이 담긴 엘리먼트의 ID\"");
                console.log("\t\t* subtitle 속성이 없을 경우 자동으로 다음 ID를 찾아 연결합니다.");
                console.log("\t\t\t\"subtitle_미디어플레이어아이디\"");
                console.log("\t* (선택) 싱크 데이터는 html 의 script 에서 다음 형식으로 데이터를 준비해 주세요.");
                console.log("\t\t <script>");
                console.log("\t\t\tmp_data = {");
                console.log("\t\t\t\tdata_미디어플레이어아이디: {");
                console.log("\t\t\t\t\tsubtitle: [");
                console.log("\t\t\t\t\t\t[1.8803, 3.8619],");
                console.log("\t\t\t\t\t\t...");
                console.log("\t\t\t* mp_data 앞에 var 를 붙이지 않는 것을 주의하여 주세요.");
                console.log("\t\t* 준비된 데이터를 다음 속성을 넣어 연결해주세요.");
                console.log("\t\t\tdata=\"준비한 데이터 이름\"");
                console.log("\t\t\t* data 속성이 없을 경우 자동으로 다음 이름으로 찾아 연결합니다.");
                console.log("\t\t\t\t\"data_미디어플레이어아이디\"");
                console.log("==============================");
                console.log("===== 롤플레이 설정 도움말 =====");
                console.log("==============================");
                console.log(". 개요");
                console.log("\t* 싱크데이터와 자막을 연결하는 방법은 자막 설정 도움말 참조해주세요.");
                console.log("\t* 롤 번호를 넣는 방법은 두가지가 있습니다.");
                console.log("\t\t1. (자막이 존재하지 않을 경우)싱크데이터 배열에 롤 번호 추가");
                console.log("\t\t\tsubtitle: [");
                console.log("\t\t\t\t[1.8803, 3.8619, 롤번호],");
                console.log("\t\t\t\t...");
                console.log("\t\t2. (자막이 존재할 경우)자막에 아이콘을 넣습니다(아래 예시 참조).");
                console.log("\t\t\t<div class='caption'>");
                console.log("\t\t\t\t<p class='icoRoleplay role1'></p>");
                console.log("\t\t\t\t<p class='tEng'>I'm in 7th grade.</p'>");
                console.log("\t\t\t\t...");
                console.log("\t\t\t* icoRoleplay 를 검색하여 미디어플레이어에 연결하며, role 뒤에 숫자로 번호를 판단합니다.");
                console.log("===========================");
                console.log("===== 썸네일 설정 도움말 =====");
                console.log("===========================");
                console.log(". 개요");
                console.log("\t* (필수) 데이터와 썸네일 컨테이너는 다음 형식으로 자동 설정 됩니다.");
                console.log("\t\t컨테이너 : \"thumbnail_미디어플레이어아이디\"");
                console.log("\t\t\t* 컨테이너 안에 썸네일 수 만큼 canvas 를 넣어주세요(아래 예시 참조).");
                console.log("\t\t\t\t<div id ='thumbnail_practice_mp'>");
                console.log("\t\t\t\t\t<canvas style='width:250px; height:140px;'></canvas>");
                console.log("\t\t\t\t\t...");
                console.log("\t\t데이터 : <script>");
                console.log("\t\t\tmp_data = {");
                console.log("\t\t\t\tdata_미디어플레이어아이디: {");
                console.log("\t\t\t\t\tthumbnail: [시간, 시간, 시간...]");
                console.log("===========================");
                console.log("===== 참조 설정 도움말 =====");
                console.log("===========================");
                console.log(". 개요");
                console.log("\t* 자막이나 악보등의 참조 설정에 대한 도움말 입니다.");
                console.log("\t\t* 참조값을 따로 속성으로 지정할 수 있습니다.");
                console.log("\t\t* 속성으로 지정하지 않을 경우 \"data_미디어플레이어아이디\" 이런 예시와 같은 형식으로 자동 설정 됩니다.");
                console.log("\t\t* 현존하는 참조값은 다음이 있습니다.");
                console.log("\t\t\tdata : 데이터(스크립트 - mp_data 하위에 위치)");
                console.log("\t\t\tsubtitle : 자막 컨테이너 엘리먼트");
                console.log("\t\t\tnotes : 악보 엘리먼트");
                console.log("===========================");
                console.log("===== 기능 함수 도움말 =====");
                console.log("===========================");
                console.log(". playMediaPlayer : 부분 재생");
                console.log("\t* 파라미터가 추가 되었습니다. playMediaPlayer(대상ID, 시작, 끝);");
                console.log("\t* 파라미터가 없을 경우 기존의 일반적인 동작을 합니다.");
                console.log("\t* 시작, 끝 파라미터를 넣으면 시작으로 지정된 부분으로 찾아가, 끝으로 지정된 부분까지 재생합니다.");
                console.log(". changeMedia : 미디어 변경");
                console.log("\t* 미디어플레이어의 미디어를 변경할 때 사용합니다.");
                console.log("\t* 데이터, 자막 등의 참조값을 변경해야 할 경우 함수의 인자를 추가해주세요.");
                console.log("\t* 구성 컴포넌트 변화는 없는 것으로 가정합니다.");
                console.log("\t* 악보(notes)는 이 기능을 지원하지 않습니다(컴포넌트에 필요한 다른 자원이 동일하게 준비되어야 함).");
                console.log("\t\tchangeMedia('대상미디어플레이어아이디:필수', '미디어:필수', '데이터참조값:선택', '자막참조값:선택')");
                console.log(". moveMedia : 미디어 이동");
                console.log("\t* 상태가 연동되어야 하는 두 미디어플레이어에 사용합니다.");
                console.log("\t* 다른 미디어플레이어가 열릴 때 호출 합니다.");
                console.log("\t* 이전 미디어플레이어는 초기화 상태가 됩니다. 초기화된 상태를 숨겨야 한다면 해당 작업이 필요합니다.");
                console.log("\t* 악보(notes)는 이 기능을 지원하지 않습니다.");
                console.log("\t\tmoveMedia('이전미디어플레이어아이디', '옮겨갈미디어플레이어아이디')");
                console.log("\t\t* 예) 팝업을 여는 버튼에 moveMedia('외부미플', '팝업내미플')");
                console.log("\t\t\t/ 팝업을 닫는 버튼에 moveMedia('팝업내미플', '외부미플')");
        }

        // 연결
        $(".mp_text").each(function (key, value) {
                var id = ($(value).attr("id") != null) ? $(value).attr("id") : "\"" + value.textContent + "\"";
                dicMediaPlayer[id] = mediaplayer_template("mp_text", value); // 생성 및 보관
                dicMediaPlayer[id].init(id); // 초기화
        });
        $(".mp_audio").each(function (key, value) {
                var id = $(value).attr("id");
                dicMediaPlayer[id] = mediaplayer_template("mp_audio", value); // 생성 및 보관
                dicMediaPlayer[id].init(id); // 초기화
        });
        $(".mp_video").each(function (key, value) {
                var id = $(value).attr("id");
                dicMediaPlayer[id] = mediaplayer_template("mp_video", value); // 생성 및 보관
                dicMediaPlayer[id].init(id); // 초기화
        });

        // 변수
        hq_scale_multiplier = 1;
        if (typeof PUBPLE !== "undefined" && typeof PUBPLE.ui !== "undefined" && PUBPLE.ui.scaleValue !== null) {
                hq_scale_multiplier = 1 / PUBPLE.ui.scaleValue;
        }

        // 개발
        if (dev_mode == true) {
                // 키 입력
                $(document).keyup(function (e) {
                        // 키코드 추적
                        if (dev_trace_input == true) { console.log("keyup : " + e.keyCode); }

                        // 테스트 키
                        switch (e.keyCode) {
                                case 192: dev_trace_input = !dev_trace_input; break; // 추적 여부
                                        //
                                case 49: // 1
                                        //changeMedia("word_mean", "m01/014_02_a_01", "S_01", "S_01");
                                        //playMediaPlayer("word_mean");
                                        console.log("resetAllMediaPlayer");
                                        resetAllMediaPlayer();
                                        break;
                                case 50: // 2
                                        console.log("resetAnotherMediaPlayer('example_mp')");
                                        resetAnotherMediaPlayer("example_mp");
                                        break;
                                case 51: // 3
                                        console.log("playMediaPlayer('practice_mp')");
                                        playMediaPlayer("practice_mp");
                                        break;
                                case 52: // 4
                                        console.log("pauseMediaPlayer('practice_mp')");
                                        pauseMediaPlayer("practice_mp");
                                        break;
                                case 53: // 5
                                        console.log("stopMediaPlayer('practice_mp')");
                                        stopMediaPlayer("practice_mp");
                                        break;
                                case 54: // 6
                                        console.log("playMediaPlayer('practice_mp', 9.3, 11.1)");
                                        playMediaPlayer("practice_mp", 9.3, 11.1);
                                        break;
                                case 81: // q
                                        console.log("tools_chkBrowser() : " + tools_chkBrowser());
                                        break;
                                case 87: // w
                                        console.log("tools_chkMobileOS() : " + tools_chkMobileOS());
                                        break;
                                case 69: // e
                                        console.log("trace MediaPlayer");
                                        $.map(dicMediaPlayer, function (obj, id) { obj.trace(); });
                                        break;
                                case 65: // a
                                        console.log("tools_leadingZeros(65, 4) : " + tools_leadingZeros(65, 4)); break;
                                        break;
                                case 90: // z
                                        console.log("changeMedia('example_mp', '0_audio_1', '0_data_1', '0_subtitle_1')");
                                        changeMedia("example_mp", "0_audio_1", "0_data_1", "0_subtitle_1");
                                        break;
                                case 88: // x
                                        console.log("changeMedia('example_mp', '0_audio_0', '0_data_0', '0_subtitle_0')");
                                        changeMedia("example_mp", "0_audio_0", "0_data_0", "0_subtitle_0");
                                        break;
                                case 67: // c
                                        console.log("moveMedia('practice_mp', 'example_mp')");
                                        moveMedia("practice_mp", "example_mp");
                                        break;
                                case 86: // v
                                        console.log("moveMedia('example_mp', 'practice_mp')");
                                        moveMedia("example_mp", "practice_mp");
                                        break;
                        }
                });

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
                console.log("\thq_scale_multiplier : " + hq_scale_multiplier);
        }
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
function setMedia(target_id, obj) {
        // 오류 체크
        if (dicMediaPlayer[target_id] == null) { console.error("MediaPlayer 오류 : " + target_id + " 로 지정된 미디어플레이어가 존재하지 않습니다."); return; }

        // 설정
        dicMediaPlayer[target_id].setMedia(obj, true);
}
function castCustomFullscreen(style, obj) {
        // 컨테이너로 전달
        var container = tools_getContainer();
        if (container == null || container.callFullscreen == null) { console.error("MediaPlayer 오류 : " + obj.client + " 의 컨테이너가 존재하지 않거나 callFullscreen 함수가 준비되어 있지 않습니다."); }
        else { container.callFullscreen(style, obj); }
}
function castCustomNormalscreen(received, obj) {
        // 컨테이너로 전달
        var container = tools_getContainer();
        if (container == null || container.callNormalscreen == null) { console.error("MediaPlayer 오류 : " + obj.client + " 의 컨테이너가 존재하지 않거나 callNormalscreen 함수가 준비되어 있지 않습니다."); }
        else { container.callNormalscreen(received, obj); }
}






///// event

function onSvgClick() { $.map(dicMediaPlayer, function (obj, id) { obj.onSvgClick(); }); }





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
                var ww = ($(ele).attr("w") == null) ? VIDEO_DEFAULT_WIDTH : $(ele).attr("w");
                var hh = ($(ele).attr("h") == null) ? VIDEO_DEFAULT_HEIGHT : $(ele).attr("h");

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

        /*
        // position 이 absolute 이 아니면 추적, 합산
        if (obj.css('position') != 'absolute') {
                while (1) {
                        // 부모가 있는 경우
                        if (t_parent.length > 0) {
                                // 조건검사
                                if (t_parent[0].nodeName === "#document") { break; }

                                // parent의 offset 값 추가
                                rtn.top += t_parent.offset().top;
                                rtn.left += t_parent.offset().left;

                                // 부모의 position이 absolute라면 절대값 확인 완료
                                if (t_parent.css('position') === 'absolute') {
                                        break;
                                } else { // 아닌 경우에는 부모의 부모를 다시 찾음
                                        t_parent = t_parent.parent();
                                }
                        } else { // 부모가 없다면 break;
                                break;
                        }
                }
        }
        */

        // 반환
        return rtn;
}

// 인아웃 체크
function tools_chkInout(event, target, margin) {
        // 준비
        var mx = event.pageX * hq_scale_multiplier;
        var my = event.pageY * hq_scale_multiplier;
        var tx0 = $(target).offset().left * hq_scale_multiplier + margin;
        var ty0 = $(target).offset().top * hq_scale_multiplier + margin;
        var tx1 = tx0 + $(target).width() - (margin * 2);
        var ty1 = ty0 + $(target).height() - (margin * 2);

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
function tools_getSourceFileName(name) {
        var len = name.length;
        var tail = name.substr(len - 2, 2);
        if (tail == "_h" || tail == "_l") { return tail = name.substr(0, len - 2); }
        else { return name; }
}

// 컨테이너 얻기
function tools_getContainer() { return window.parent; }

// 개발 메세지 html에 출력
function tools_consoleLog(idx, str, clear) {
        // 이미 존재 여부
        var target = $(document).find("#divDev" + idx)[0];

        // 없으면 생성
        if (target == null) { target = tools_addElement("<div id='divDev'>divDev" + idx + "</div>", $(document).find("#wrap")[0], "before"); }

        // 출력
        if (clear == true) { target.textContent = str; }
        else { target.textContent += str; }
}