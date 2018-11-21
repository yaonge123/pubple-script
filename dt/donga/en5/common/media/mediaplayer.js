// version 1.0.60 : ZERO_REVISE 로 변경, tools_chkPlatform 추가
// 미디어 플레이어
// mediaplayer.js : 설정값, 커스터마이저
// mediaplayer_hq.js : 전역 변수/함수, 외부에서 접근 함수
//      mediaplayer_template.js : 미디어 플레이어 class
//              mediaplayer_core.js : 핵심 기능 class
//              mediaplayer_compo.js : 보조 기능 모듈 class



///// option

// 디버그
var dev_mode = false; // 개발모드 여부
var dev_data = false; // 개발 관련 데이터 출력 여부
var dev_trace_input = false; // 입력 추적 여부 (키코드, 마우스 좌표)
var dev_trace_event = false; // 주요 이벤트 추적 여부
var dev_trace_null = false; // data null 체크 (의도적으로 비어있는 경우가 있음)
var dev_trace_detail = "none"; // 세부 추적할 미디어플레이어 ID

// 뷰어 관련
var CONTACTABLE_WITH_PARENT = true; // 상위 뷰어 접근 가능 여부

// 파일 경로
var PATH_MEDIA_AUDIO = "./media/audio/"; // 오디오 미디어 파일 경로
var PATH_MEDIA_VIDEO = "./media/video/"; // 비디오 미디어 파일 경로
var PATH_IMAGE_POSTER = PATH_MEDIA_VIDEO + "thum/"; // 포스터 파일 경로

// 미디어 설정
var SET_PRELOAD_AUDIO = { edge: true, ie: true, chrome: true, safari: true, android: true, ios: true }
var SET_PRELOAD_VIDEO = { edge: true, ie: true, chrome: true, safari: true, android: true, ios: true }
var TIMEOUT_FORCE_TIMEUPDATE = 50; // 강제 시간 갱신 타임아웃 : 빠를수록 타임바가 부드럽지만 연산 부하 걸림

// 이동 관련
var MOVE_TIME_FWD = 10; // FWD 이동량
var MOVE_TIME_BWD = -10; // BWD 이동량

// 재생속도 관련
var OPTION_PLAYBACKRATE_TYPE = 1; // 재생속도 타입 0:버튼|레이블|버튼 1:버튼|버튼|버튼 2:드랍다운버튼
var OPTION_PLAYBACKRATE_VALUE_SLOW = (dev_mode == true) ? 0.5 : 0.9; // 타입1 일 때 느린버튼(최하 0.5)
var OPTION_PLAYBACKRATE_VALUE_FAST = (dev_mode == true) ? 2 : 1.1; // 타입1 일 때 빠른버튼(최대 2.0)

// UI 관련 보정값
var REVISE_VOLUME_MARKER = 0; // 볼륨막대 마커 보정값 : (width / 2 * -1) + 픽셀 단위 보정
var REVISE_TIMEBAR_MARKER = 0; // 시간막대 마커 보정값 : 상동
var REVISE_REPEAT_MARKER = -5; // 구간반복 마커 보정값 : 상동
var REVISE_ROLEPLAY_MARKER = -15; // 롤플레이 마커 보정값 : 상동

// 자막 관련
var SUBTITLE_CUSTOME_SCROLL = false; // 커스텀 스크롤
var SUBTITLE_FONTSIZE_MODIFY = 10; // 폰트사이즈 변화량 (*1 / *-1)
var SUBTITLE_FONTSIZE_MIN = -2; // 최소 단계 (기본값 + (SUBTITLE_FONTSIZE_MIN * SUBTITLE_FONTSIZE_MODIFY))
var SUBTITLE_FONTSIZE_MAX = 2; // 최대 단계
var SUBTITLE_COVER_HIDE_TIME = 1000; // 커버 버튼 숨김 시간
var SUBTITLE_PAGE_SCROLL_REF = 0.6; // 페이지 넘김 값 ( * height)
var FOLLOW_DURATION_CORRECTION = 1.5; // 따라말하기 보정값 (subtitle 데이터에 근거 자동 생성시 (끝-시작)*보정값)

// 롤플레이 관련
var ROLEPLAY_MAX_AMOUNT = 6; // 롤플레이 최대 수
var ROLEPLAY_EXIST_MARKER = true; // 타임바에 올라가는 마커 유무
var ROLEPLAY_EXIST_BAR = true; // 묵음처리 동안 프로그레스 바 존재 여부
var ROLEPLAY_EXTERNAL_BTN = true; // 외부 버튼 모드

// 비디오 관련
var VIDEO_CUSTOM_FULLSCREEN = false; // 풀스크린 형식 (true:컨테이너로관련함수호출, false:네이티브)
var VIDEO_EXIST_BTN_COVER = true; // 커버버튼 존재
var VIDEO_COVER_HIDE_ON_PLAY = true; // 재생 중 커버버튼 숨김 여부
var VIDEO_COVER_HIDE_ON_OUT = false; // 밖으로 나가면 커버버튼 숨김 여부
var VIDEO_CONTROL_HIDE_ON_STOP = false; // 멈춤 중 컨트롤 숨김 여부
var VIDEO_CONTROL_HIDE_ON_OUT = false; // 밖으로 나가면 컨트롤 숨김 여부
var VIDEO_DEFAULT_WIDTH = 704; // 설정이 없을 때 비디오 width
var VIDEO_DEFAULT_HEIGHT = 382; // 설정이 없을 때 비디오 height
var VIDEO_INOUT_MARGIN_COVER = 100; // 커버 인아웃 체크 여유 공간(상하좌우 전부 적용)
var VIDEO_INOUT_MARGIN_THUMBNAIL = 20; // 썸네일 상동

// 이벤트 관련
var AUDIO_STOP_ON_END = true; // 재생 끝난 후 초기화 여부
var VIDEO_STOP_ON_END = true;

// 특수 보정
var REVISE_TEXT_END_ON_IE = 0.1; // ie10, ie11 에서 예약 종료(자막 등) 보정 값

// 기능 추가
var SUBTITLE_VIDEO_ALIGN_PADDING_TOP = { origin: 5, center: 19 }; // 비디오 자막 중앙 정렬 : caption 의 padding-top 을 origing(2줄), center(1줄)로 변경
var HIDE_FULLSCREEN_BTN_ON_FOLLOW_OR_ROLEPLAY = true; // 따라말하기 또는 롤플레이일 때 풀스크린 버튼 숨기기
var SHOW_COVER_BTN_ON_PAUSE = true; // 일시정지 상태일 때 커버 버튼 보이게 하기
var SUBTITLE_PAGE_SCROLL = true; // 페이지 단위 스크롤
var STOP_ON_ROLEPLAY_BTN = true; // 롤플레이 버튼 클릭시 정지
var RELEASE_FULLSCREEN_ON_ENDED = true; // onEnded 일 때 전체화면 해제
//var ZERO_REVISE = { edge: 0.12, ie: 0.12, chrome: , safari: , android: , ios:  }; // 0 인식 보정. 적용 안할 플랫폼은 항목 제거



///// mediaplayer_customizer
var mediaplayer_customizer = function (p_parent) {

        ///// variables

        // module
        var _this; // 클래스
        var _parent = p_parent; // 상위 클래스

        ///// function
        return {

                ///// module

                // 초기화
                init: function () { _this = this; },

                // 컴포 설정
                setCompoByType: function () {
                        // 공통:0단계
                        var str = setCompoByType_common_step0(_parent);

                        // 템플릿 정리
                        str = tools_setTemplate(str, "minimum", "btnPlay btnStop barTime laeTime"); // minimum
                        str = tools_setTemplate(str, "audio", "btnPlay btnStop barTime"); // audio
                        str = tools_setTemplate(str, "video", "btnPlay btnStop barTime laeTime cover"); // video
                        str = tools_setTemplate(str, "notShow", "subtitle exception:disableCtrlSubtitleContainer"); // 템플릿 예제
                        str = tools_setTemplate(str, "roleVideo", "btnLanEng btnLanKor follow roleplay");

                        // 공통:1단계(컴포넌트 정렬 순서 배열 반환)
                        return setCompoByType_common_step1(_parent, str.split(" "));
                },

                // 시작 전
                onBeforeStart: function () { },

                // UI 구성물 순서 설정
                getCompoUI: function (str) {
                        // 준비
                        var hie = _parent._hierarchy();

                        // 분기
                        switch (str) {
                                case "btnPlay": if (hie.btnPlay != null) return [hie.btnPlay];
                                case "btnStop": if (hie.btnStop != null) return [hie.btnStop];
                                case "btnMove": if (hie.btnMoveBackward != null) return [hie.btnMoveBackward, hie.btnMoveForward];
                                case "barTime": if (hie.barTime != null) return [hie.barTime];
                                case "volume": if (hie.btnSound != null) return [hie.btnSound, hie.barVolume];
                                case "repeat": if (hie.btnRepeatStart != null) return [hie.btnRepeatStart, hie.btnRepeatEnd];
                                case "loop": if (hie.btnLoop != null) return [hie.btnLoop];
                                case "playbackrate": if (hie.playbackratePannel != null) return [hie.playbackratePannel];
                                case "fullscreen": if (hie.btnFullscreen != null) return [hie.btnFullscreen];
                                case "follow": if (hie.btnFollow != null) return [hie.btnFollow];
                                case "btnSubtitle": if (hie.btnSubtitle != null) return [hie.btnSubtitle];
                                case "btnLanguage": if (hie.btnLanguage != null) return [hie.btnLanguage];
                                case "btnLanKor": if (hie.btnLanKor != null) return [hie.btnLanKor];
                                case "btnLanEng": if (hie.btnLanEng != null) return [hie.btnLanEng];
                                case "btnFontsize": if (hie.btnFontsizeDown != null) return [hie.btnFontsizeDown, hie.btnFontsizeUp];
                                case "roleplay": if (hie.roleplayPannel != null) return [hie.roleplayPannel];
                                case "btnChange": if (hie.btnChange != null) return [hie.btnChange];
                                case "btnAnotherChange": if (hie.btnAnotherChange != null) return [hie.btnAnotherChange];
                                case "btnListen": if (hie.btnListenPannel != null) return [hie.btnListen, hie.btnWaypointPannel];
                                case "btnWayloop": if (hie.btnWayloop != null) return [hie.btnWayloop];
                                case "btnFocus": if (hie.btnFocus != null) return [hie.btnFocus];
                                case "btnLyrics": if (hie.btnLyrics != null) return [hie.btnLyrics];
                                case "btnTune": if (hie.btnTune != null) return [hie.btnTune];
                                case "btnUpdown": if (hie.btnUpdownUp != null) return [hie.btnUpdownUp, hie.btnUpdownDown];
                                default: if (_parent._custom()[str] != null) return _parent._custom()[str];
                        }

                        // 실패
                        return null;
                },

                // 특수 주문
                customOrder: function (what, param) { },



                ///// onInit

                // mp_text
                mpText_onInit: function () { },

                // 코어
                core_onInit: function () {
                        // 조건검사
                        if (_parent._option().no_ui == true) { return; }

                        // 준비
                        var ele = _parent._ele();
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // 조건검사
                        if (_parent._type() == "mp_text") {
                                hie.mediaContainer = ele;
                                return;
                        }

                        // 토대
                        hie.mediaWrap = tools_addElement("<div class='" + cat + "Wrap'></div>", ele); // 틀

                        // 모바일 특수
                        switch (tools_chkMobileOS()) {
                                case "android":
                                        $(hie.mediaWrap).addClass("thema_android");
                                        break;
                                case "ios":
                                        $(hie.mediaWrap).addClass("thema_ios");
                                        break;
                        }

                        // 추가
                        hie.mediaContainer = tools_addElement("<div class='" + cat + "Container'></div>", hie.mediaWrap); // 미디어 컨테이너
                        if (cat == "video") { tools_setVideoSize(ele, hie.mediaContainer); }
                },

                // 컴포넌트
                btnPlay_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnPlay = tools_addElement("<div class='btnProto btnPlay'></div>", hie.mediaControls);
                },
                btnStop_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnStop = tools_addElement("<div class='btnProto btnStop'></div>", hie.mediaControls);
                },
                btnMove_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnMoveBackward = tools_addElement("<div class='btnProto btnMoveBackward'></div>", hie.mediaControls);
                        hie.btnMoveForward = tools_addElement("<div class='btnProto btnMoveForward'></div>", hie.mediaControls);
                },
                volume_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnSound = tools_addElement("<div class='btnProto btnSound'></div>", hie.mediaControls);
                        hie.barVolume = tools_addElement("<div class='barProto mvSound'></div>", hie.mediaControls);
                        hie.barVolume.back = tools_addElement("<div class='back'></div>", hie.barVolume);
                        hie.barVolume.current = tools_addElement("<div class='current'></div>", hie.barVolume.back);
                        hie.barVolume.marker = tools_addElement("<div class='marker'></div>", hie.barVolume.back);
                        hie.barVolume.toucharea = tools_addElement("<div class='toucharea'></div>", hie.barVolume.back);
                },
                barTime_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.barTime = tools_addElement("<div class='barProto mvTime'></div>", hie.mediaControls);
                        hie.barTime.back = tools_addElement("<div class='back'></div>", hie.barTime);
                        hie.barTime.current = tools_addElement("<div class='current'></div>", hie.barTime.back);
                        hie.barTime.marker = tools_addElement("<div class='marker'></div>", hie.barTime.back);
                        hie.barTime.toucharea = tools_addElement("<div class='toucharea'></div>", hie.barTime.back);
                },
                laeTime_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (hie.barTime == null) { tools_addElement("<div class='barProto mvTime'></div>", hie.mediaControls); }
                        hie.laeTime = tools_addElement("<div class='label'></div>", hie.barTime);
                },
                playbackrate_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (hie.playbackratePannel == null) { hie.playbackratePannel = tools_addElement("<div class='playbackratePannel'></div>", hie.mediaControls); }
                        switch (OPTION_PLAYBACKRATE_TYPE) {
                                case 0:
                                        hie.btnSlow = tools_addElement("<div class='btnSlow'></div>", hie.playbackratePannel);
                                        hie.laePlaybackrate = tools_addElement("<div class='label'></div>", hie.playbackratePannel);
                                        hie.btnFast = tools_addElement("<div class='btnFast'></div>", hie.playbackratePannel);
                                        break;
                                case 1:
                                        hie.btnSlow = tools_addElement("<div class='btnSlow'>x" + OPTION_PLAYBACKRATE_VALUE_SLOW + "</div>", hie.playbackratePannel);
                                        hie.btnNormal = tools_addElement("<div class='btnNormal'>x1.0</div>", hie.playbackratePannel);
                                        hie.btnFast = tools_addElement("<div class='btnFast'>x" + OPTION_PLAYBACKRATE_VALUE_FAST + "</div>", hie.playbackratePannel);
                                        break;
                                case 2:
                                        hie.btnPlaybackrate = tools_addElement("<div class='btnProto btnPlaybackrateNormal'></div>", hie.playbackratePannel);
                                        hie.menuPlaybackrate = tools_addElement("<div class='menuDropDown'></div>", hie.playbackratePannel);
                                        hie.btnSlow = tools_addElement("<div class='btnProto btnPlaybackrateSlow'></div>", hie.menuPlaybackrate);
                                        hie.btnNormal = tools_addElement("<div class='btnProto btnPlaybackrateNormal'></div>", hie.menuPlaybackrate);
                                        hie.btnFast = tools_addElement("<div class='btnProto btnPlaybackrateFast'></div>", hie.menuPlaybackrate);
                                        break;
                        }
                },
                repeat_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnRepeatStart = tools_addElement("<div class='btnProto btnRepeatStart'></div>", hie.mediaControls);
                        hie.btnRepeatEnd = tools_addElement("<div class='btnProto btnRepeatEnd'></div>", hie.mediaControls);
                        if (_parent._option().exist_barTime == true) {
                                hie.barTime.markerRepeatStart = tools_addElement("<div class='repeat'></div>", hie.barTime);
                                hie.barTime.markerRepeatEnd = tools_addElement("<div class='repeat'></div>", hie.barTime);
                        }
                },
                loop_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnLoop = tools_addElement("<div class='btnProto btnLoop'></div>", hie.mediaControls);
                },
                fullscreen_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnFullscreen = tools_addElement("<div class='btnProto btnFullscreen'></div>", hie.mediaControls);
                },
                cover_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.coverContainer == null) { hie.coverContainer = tools_addElement("<div class='coverContainer'></div>", hie.mediaContainer, "before"); }
                        if (VIDEO_EXIST_BTN_COVER == true) { hie.btnCover = tools_addElement("<div class='btnCover'></div>", hie.coverContainer); }
                        hie.poster = tools_addElement("<div class='poster'></div>", hie.coverContainer);
                },
                follow_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnFollow = tools_addElement("<div class='btnProto btnFollow'></div>", hie.mediaControls); // 최종경 수정
                        hie.barFollow = tools_addElement("<div class='innerFollow'></div>", hie.mediaContainer); // 최종경 수정
                        hie.barFollow.back = tools_addElement("<div class='barFollow'></div>", hie.barFollow); // 최종경 수정
                        hie.barFollow.current = tools_addElement("<div class='current'></div>", hie.barFollow.back); // 최종경 수정 - current 가 barFollow 밖으로 생성되게 되어 back 부분 추가하였습니다.
                },
                subtitle_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();
                        var option = _parent._option();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (option.exist_btnLanguage == true) { hie.btnLanguage = tools_addElement("<div class='btnProto btnLanguage'></div>", hie.mediaControls); }
                        if (option.exist_btnLanKor == true) { hie.btnLanKor = tools_addElement("<div class='btnProto btnLanKor'></div>", hie.mediaControls); }
                        if (option.exist_btnLanEng == true) { hie.btnLanEng = tools_addElement("<div class='btnProto btnLanEng'></div>", hie.mediaControls); }
                        if (option.exist_btnSubtitle == true) { hie.btnSubtitle = tools_addElement("<div class='btnProto btnSubtitle'></div>", hie.mediaControls); }
                        if (option.exist_btnFontsize == true) {
                                hie.btnFontsizeDown = tools_addElement("<div class='btnProto btnFontsizeDown'></div>", hie.mediaControls);
                                hie.btnFontsizeUp = tools_addElement("<div class='btnProto btnFontsizeUp'></div>", hie.mediaControls);
                        }
                },
                roleplay_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (hie.roleplayPannel == null) { hie.roleplayPannel = tools_addElement("<div class='roleplayPannel'></div>", hie.mediaControls); }
                        if (ROLEPLAY_EXTERNAL_BTN == true) {
                                hie.btnRoleplayShow = hie.btnRoleplayShow = tools_addElement("<div class='btnProto btnRoleplayShow'></div>", hie.roleplayPannel);
                        } else {
                                hie.btnRoleplayArray = new Array();
                                for (var ii = 1 ; ii < ROLEPLAY_MAX_AMOUNT + 1 ; ii++) { hie.btnRoleplayArray[ii - 1] = tools_addElement("<div class='btnProto btnRoleplay" + ii + "'></div>", hie.roleplayPannel); }
                        }
                        if (ROLEPLAY_EXIST_BAR == true && cat == "video") {
                                hie.barRoleplay = tools_addElement("<div class='innerFollow'></div>", hie.mediaContainer); // 최종경 수정
                                hie.barRoleplay.back = tools_addElement("<div class='barFollow'></div>", hie.barRoleplay); // 최종경 수정
                                hie.barRoleplay.current = tools_addElement("<div class='current'></div>", hie.barRoleplay.back); // 최종경 수정 - current 가 barFollow 밖으로 생성되게 되어 back 부분 추가하였습니다.
                        }
                },
                btnChange_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnChange = tools_addElement("<div class='btnProto btnChange'></div>", hie.mediaControls);
                },
                btnAnotherChange_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnAnotherChange = tools_addElement("<div class='btnProto btnFollow'></div>", hie.mediaControls);
                },
                notes_onInit: function () { },
                thumbnail_onInit: function () { },
                btnUpdown_onInit: function () { },
        }
}

// 테스트 키 입력
function setDevKeyInput() {
        $(document).keyup(function (e) {
                // 키코드 추적
                if (dev_trace_input == true) { console.log("keyup : " + e.keyCode); }

                // 테스트 키
                switch (e.keyCode) {
                        case 192: dev_trace_input = !dev_trace_input; break; // 추적 여부
                        case 49: console.log("헤이"); break;
                }
        });
}