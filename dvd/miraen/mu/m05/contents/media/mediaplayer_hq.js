// version 1.0.13 : btnUpdown 정비.
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
var hq_scale_multiplier; // 스케일 멀티플라이어(1 / PUBPLE.ui.scaleValue);
var i_mediaplayer_auto_create = 0; // 미디어플레이어 id 자동생성 인덱스

// trace
var date_lastloop = new Date; // fps 추적용 변수
var total_fps = 0; // FPS 합계 (평균을 내기 위한 작업)
var repeat_fps = 0; // FPS 체크 반복 회수 상동





///// initialize

// load
$(document).ready(function () {
        // html 문서를 검색하여 loadScript 가 존재할 경우 자동 호출을 실행하지 않는다.
        // 이 때는 html 에서 관련 처리를 마친 후 직접 setupMediaPlayer() 를 호출.
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
                console.log("\tid : (선택) 아이디. 참조가 필요한 미디어 플레이어에 선언해주세요.");
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
                console.log("\tbtnonly : 단순버튼기능(play/stop)");
                console.log("\tcover : 포스터(+설정에 따라 큰재생버튼)");
                console.log("\tfullscreen : 전체화면(동영상 설정 도움말 참조)");
                console.log("\tthumbnail : 동영상 썸네일");
                console.log("\tsubtitle : 자막(자막 설정 도움말 참조)");
                console.log("\tbtnSubtitle : 자막on/off 버튼(자막은 자동 생성 됨, display:none 으로 초기화)");
                console.log("\tbtnLanguage : 한/영 버튼(자막은 자동 생성 됨, 한글은 숨김으로 초기화)");
                console.log("\tbtnFontsize : 자막폰트사이즈 버튼(자막은 자동 생성 됨)");
                console.log("\troleplay : 롤플레이(롤플레이 설정 도움말 참조)");
                console.log("\tnotes : 악보(악보 설정 도움말 참조)");
                console.log("\tbtnListen : 전체듣기/소절듣기 버튼");
                console.log("\tbtnWayloop : 웨이포인트 전용 루프 버튼");
                console.log("\tbtnFocus : 음표 포커스 여부 토글 버튼(악보는 자동 생성 됨)");
                console.log("\tbtnLyrics : 가사 가시여부 토글 버튼(악보는 자동 생성 됨)");
                console.log("\tbtnTune : 음정 상하 버튼");
                console.log("\tbtnUpdown : 상,하향음 버튼");
                console.log("===========================");
                console.log("===== 동영상 설정 도움말 =====");
                console.log("===========================");
                console.log(". 커버(cover 컴포넌트가 선언되었을 때)");
                console.log("\t* poster 및 큰 재생버튼을 위한 기능입니다.");
                console.log("\t\t* 세부 동작 방식은 mediaplayer.js 에서 설정할 수 있습니다.");
                console.log("\t\t* poster 는 지정된 경로(mediaplayer.js 참조)에서 '동영상이름.png' 로 검색하여 연결합니다.");
                console.log(". 전체화면(fullscreen 컴포넌트가 선언되었을 때)");
                console.log("\t* 커스텀 전체화면은 ../common/ 폴더에 video_full.html 와 연결됩니다.");
                console.log("\t\t* fullscreen:xxxx 형식으로 선언할 경우 video_full_xxxx.html 와 연결됩니다.");
                console.log(". 썸네일(thumbnail 컴포넌트가 선언되었을 때)");
                console.log("\t* 컨테이너 : id='thumbnail_미디어플레이어아이디' 엘리먼트를 검색하여 연결합니다. ");
                console.log("\t\t* thumbnail='' 속성으로 참조값을 직접 지정할수도 있습니다.");
                console.log("\t\t* 컨테이너 안에 반응영역(toucharea) 및 가시영역(visiblearea) 가 필요합니다.");
                console.log("\t\t\t* 가시영역 아래에 class='thumb' 형식으로 썸네일 이미지가 들어갑니다.");
                console.log("\t\t\t* 반응영역에는 자동으로 여유값이 들어갑니다(mediaplayer.js - VIDEO_INOUT_MARGIN_THUMBNAIL)");
                console.log("\t* 이미지 : 지정된 경로(mediaplayer.js 참조)에서 '동영상이름_x.png' 로 검색하여 연결합니다.");
                console.log("\t* 데이터 : script 의 mp_data 에서 'data_미디어플레이어' 로 검색하여 연결합니다.");
                console.log("\t\t* data='' 속성으로 참조값을 직접 지정할수도 있습니다.");
                console.log("\t\t// 예시");
                console.log("\t\t<script>");
                console.log("\t\t\tmp_data = {");
                console.log("\t\t\t\tdata_미디어플레이어아이디: {");
                console.log("\t\t\t\t\tthumbnail: [시간, 시간, 시간...]");
                console.log("===========================");
                console.log("===== 자막 설정 도움말 =====");
                console.log("===========================");
                console.log(". 개요");
                console.log("\t* btnSubtitle 등의 자막 관련 기능을 필수로 하는 컴포가 선언되면 자막 컴포넌트는 자동으로 생성됩니다.");
                console.log("\t* 컨테이너 : id='subtitle_미디어플레이어아이디' 엘리먼트를 검색하여 연결합니다. ");
                console.log("\t\t* subtitle='' 속성으로 참조값을 직접 지정할수도 있습니다.");
                console.log("\t* 데이터(선택) : script 의 mp_data 에서 'data_미디어플레이어' 로 검색하여 연결합니다.");
                console.log("\t\t* data='' 속성으로 참조값을 직접 지정할수도 있습니다.");
                console.log("\t\t// 예시");
                console.log("\t\t <script>");
                console.log("\t\t\tmp_data = {");
                console.log("\t\t\t\tdata_미디어플레이어아이디: {");
                console.log("\t\t\t\t\tsubtitle: [");
                console.log("\t\t\t\t\t\t[1.8803, 3.8619],");
                console.log("\t\t\t\t\t\t...");
                console.log("==============================");
                console.log("===== 롤플레이 설정 도움말 =====");
                console.log("==============================");
                console.log(". 개요");
                console.log("\t* 자막과 싱크데이터를 연결하는 방법은 자막 설정 도움말 참조해주세요.");
                console.log("\t* 롤 번호를 넣는 방법은 두가지가 있습니다.");
                console.log("\t\t1. (자막이 존재하지 않을 경우)싱크데이터 배열에 롤 번호 추가");
                console.log("\t\t// 예시");
                console.log("\t\t\tsubtitle: [");
                console.log("\t\t\t\t[1.8803, 3.8619, 롤번호],");
                console.log("\t\t\t\t...");
                console.log("\t\t2. (자막이 존재할 경우)자막에 아이콘을 넣습니다(아래 예시 참조).");
                console.log("\t\t// 예시");
                console.log("\t\t\t<div class='caption'>");
                console.log("\t\t\t\t<p class='icoRoleplay role1'></p>");
                console.log("\t\t\t\t<p class='tEng'>I'm in 7th grade.</p'>");
                console.log("\t\t\t\t...");
                console.log("\t\t\t* icoRoleplay 를 검색하여 미디어플레이어에 연결하며, role 뒤에 숫자로 번호를 판단합니다.");
                console.log("===========================");
                console.log("===== 음악 설정 도움말 =====");
                console.log("===========================");
                console.log("\t* 데이터 : script 의 mp_data 에서 '미디어참조값' 로 검색하여 연결합니다.");
                console.log("\t\t* !!! 다른 자동 참조와는 다르게 미디어플레이어ID 기준이 아니라 미디어참조값(media 속성)임을 주의하세요.");
                console.log("\t\t* data='' 속성으로 참조값을 직접 지정할수도 있습니다.");
                console.log(". 악보가 연결될 때(notes 컴포넌트가 선언되었을 때)");
                console.log("\t* 컨테이너 : id='notes_미디어플레이어아이디' 엘리먼트를 검색하여 연결합니다. ");
                console.log("\t\t* notes='' 속성으로 참조값을 직접 지정할수도 있습니다.");
                console.log("\t\t* 컨테이너 안에 class='note_svg' 형식으로 악보 SVG가 들어갑니다.");
                console.log(". 음정 조정 버튼");
                console.log("\t* ");
                console.log("===========================");
                console.log("===== 기능 함수 도움말 =====");
                console.log("===========================");
                console.log(". resetAllMediaPlayer()");
                console.log("\t* 존재하는 모든 미디어플레이어를 리셋합니다.");
                console.log(". resetAnotherMediaPlayer(제외할ID)");
                console.log("\t* 지정된 ID 를 가진 미디어플레이어를 제외한 존재하는 모든 미디어플레이어를 리셋합니다.");
                console.log(". playMediaPlayer(대상ID, 시작(선택), 끝(선택))");
                console.log("\t* 시작, 끝 파라미터가 없을 경우 일반적인 재생을 합니다.");
                console.log("\t* 시작, 끝 파라미터를 있을 경우 시작으로 지정된 부분으로 찾아가, 끝으로 지정된 부분까지 재생합니다.");
                console.log(". pauseMediaPlayer(대상ID)");
                console.log("\t* 대상 미디어플레이어 일시정지.");
                console.log(". stopMediaPlayer(대상ID)");
                console.log("\t* 대상 미디어플레이어 정지.");
                console.log(". changeMedia(대상ID, media참조값, data참조값(선택), subtitle참조값(선택))");
                console.log("\t* 미디어플레이어의 미디어를 변경할 때 사용합니다.");
                console.log("\t* 데이터, 자막 등의 참조값을 변경해야 할 경우 함수의 인자를 추가해주세요.");
                console.log("\t* 구성 컴포넌트 변화는 없는 것으로 가정합니다(양쪽 미디어플레이어의 구성 컴포넌트가 동일해야 합니다).");
                console.log(". moveMedia(넘겨줄ID, 넘겨받을ID)");
                console.log("\t* 음악 관련 컴포넌트에는 동작하지 않습니다.");
                console.log("\t* 상태가 연동되어야 하는 두 미디어플레이어에 사용합니다.");
                console.log("\t* 다른 미디어플레이어가 열릴 때 호출 합니다.");
                console.log("\t* 이전 미디어플레이어는 초기화 상태가 됩니다. 초기화된 상태를 숨겨야 한다면 해당 작업이 필요합니다.");
        }

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
                        if (tools_chkMobileOS() == "N/A") { option.preload = true; } // 프리로드
                        else { option.preload = false; }
                        break;
                case "mp_video":
                        _parent._category("video"); // 비디오
                        if (tools_chkMobileOS() == "N/A") { option.preload = true; } // 프리로드
                        else { option.preload = false; }
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
                                var ar_exception_lv0 = ar_detail[1].split("@");
                                for (var aa = 0 ; aa < ar_exception_lv0.length ; aa++) {
                                        var ar_exception_lv1 = ar_exception_lv0[aa].split("^");
                                        if (ar_exception_lv1.length == 1) { option.exception[ar_exception_lv1[0]] = true; }
                                        else { option.exception[ar_exception_lv1[0]] = ar_exception_lv1[1]; }
                                }
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
                        case "btnSubtitle": // 자막 on/off 버튼 (자막 자동 설정)
                                option.exist_btnSubtitle = true;
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
                var ww = ($(ele).attr("data-w") == null) ? VIDEO_DEFAULT_WIDTH : $(ele).attr("data-w");
                var hh = ($(ele).attr("data-h") == null) ? VIDEO_DEFAULT_HEIGHT : $(ele).attr("data-h");

                // 설정
                $(target).width(ww);
                $(target).height(hh);

                $(ele).find('.videoWrap').css({
                        'width' : ww,
                        'height' : hh
                });

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
        if (target == null) { target = tools_addElement("<div id='divDev'>divDev" + idx + "</div>", $(document).find("#wrap")[0], "before"); }

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