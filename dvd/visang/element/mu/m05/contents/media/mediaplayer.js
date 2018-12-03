// 미디어 플레이어
// mediaplayer.js : 설정값, 커스터마이저
// mediaplayer_hq.js : 전역 변수/함수, 외부에서 접근 함수
//      mediaplayer_template.js : 미디어 플레이어 class
//              mediaplayer_core.js : 핵심 기능 class
//              mediaplayer_compo.js : 보조 기능 모듈 class



///// option

// 디버그
var dev_mode = false; // 개발모드 여부
var dev_help = false; // 도움말 여부
var dev_data = false; // 개발 관련 데이터 출력 여부
var dev_trace_input = false; // 입력 추적 여부 (키코드, 마우스 좌표)
var dev_trace_event = false; // 주요 이벤트 추적 여부
var dev_trace_fps = false; // FPS 추적 여부
var dev_trace_null = false; // data null 체크 (의도적으로 비어있는 경우가 있음)
var dev_trace_detail = "none"; // 세부 추적할 미디어플레이어 ID

// 파일 경로
var PATH_MEDIA_AUDIO = (dev_mode == true) ? "../common/media/audio/" : "../common/media/audio/"; // 오디오 미디어 파일 경로
//var PATH_MEDIA_AUDIO = "http://svn.pubple.com:8080/MediaPlayer/PlatformTest/common/media/audio/"; // 오디오 미디어 파일 경로
var PATH_MEDIA_VIDEO = (dev_mode == true) ? "../common/media/video/" : "../common/media/video/"; // 비디오 미디어 파일 경로
var PATH_IMAGE_POSTER = PATH_MEDIA_VIDEO + "thum/"; // 포스터 파일 경로

// 강제 갱신
var TIMEOUT_FORCE_TIMEUPDATE = 50; // 강제 시간 갱신 타임아웃 : 빠를수록 타임바가 부드럽지만 연산 부하 걸림

// 이동 관련
var MOVE_TIME_FWD = 10; // FWD 이동량
var MOVE_TIME_BWD = -10; // BWD 이동량

// 재생속도 관련
var OPTION_PLAYBACKRATE_TYPE = 2; // 재생속도 타입 0:버튼|레이블|버튼 1:버튼|버튼|버튼 2:드랍다운버튼
var OPTION_PLAYBACKRATE_VALUE_SLOW = (dev_mode == true) ? 0.5 : 0.9; // 타입1 일 때 느린버튼(최하 0.5)
var OPTION_PLAYBACKRATE_VALUE_FAST = (dev_mode == true) ? 2 : 1.1; // 타입1 일 때 빠른버튼(최대 2.0)

// UI 관련 보정값
var REVISE_VOLUME_MARKER = 0; // 볼륨막대 마커 보정값 : (width / 2 * -1) + 픽셀 단위 보정
var REVISE_TIMEBAR_MARKER = -12; // 시간막대 마커 보정값 : 상동
var REVISE_REPEAT_MARKER = -5; // 구간반복 마커 보정값 : 상동
var REVISE_ROLEPLAY_MARKER = -15; // 롤플레이 마커 보정값 : 상동

// 자막 관련
var SUBTITLE_CUSTOME_SCROLL = (dev_mode == true) ? true : true; // 커스텀 스크롤
var SUBTITLE_FONTSIZE_MODIFY = 10; // 폰트사이즈 변화량 (*1 / *-1)
var SUBTITLE_FONTSIZE_MIN = -2; // 최소 단계 (기본값 + (SUBTITLE_FONTSIZE_MIN * SUBTITLE_FONTSIZE_MODIFY))
var SUBTITLE_FONTSIZE_MAX = 2; // 최대 단계
var SUBTITLE_COVER_HIDE_TIME = 1000; // 커버 버튼 숨김 시간
var SUBTITLE_PAGE_SCROLL_REF = 0.6; // 페이지 넘김 값 ( * height)

// 롤플레이 관련
var ROLEPLAY_MAX_AMOUNT = 5; // 롤플레이 최대 수

// 비디오 관련
var VIDEO_CUSTOM_FULLSCREEN = (dev_mode == true) ? true : true; // 풀스크린 형식 (true:컨테이너로관련함수호출, false:네이티브)
var VIDEO_EXIST_BTN_COVER = true; // 커버버튼 존재
var VIDEO_CONTROL_WITH_COVER = true; // false:플레이아닐땐컨트롤숨김(커버버튼 반드시 필요), true:컨트롤항상보임
var VIDEO_CONTROL_HIDE = 0; // 0:인아웃숨김기능없음, 1:인아웃숨김기능있음 * 이 기능을 사용하려면 videoWrap absolute 필수 등의 조건이 필요.
var VIDEO_DEFAULT_WIDTH = 600; // 설정이 없을 때 비디오 width
var VIDEO_DEFAULT_HEIGHT = 400; // 설정이 없을 때 비디오 height
var VIDEO_INOUT_MARGIN_COVER = 100; // 커버 인아웃 체크 여유 공간(상하좌우 전부 적용)
var VIDEO_INOUT_MARGIN_THUMBNAIL = 20; // 썸네일 상동

// 컴포넌트 UI 순서
var COMPO_UI_ORDER = ["btnLanguage", "btnFontsize", "btnSubtitle", "fullscreen"];



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
                        var compo = ($(_parent._ele()).attr("compo") == null) ? "" : $(_parent._ele()).attr("compo"); // 설정이 되어 있지 않으면 디폴트

                        // 디폴트 설정
                        if (compo == "") {
                                switch (_parent._type()) {
                                        case "mp_text": break;
                                        case "mp_audio": compo = "audio"; break;
                                        case "mp_video": compo = "video"; break;
                                }
                        }
                        // 준비
                        var ar = compo.split(" ");

                        // 설정
                        for (var ii = 0 ; ii < ar.length ; ii++) {
                                var ar_detail = ar[ii].split(":");
                                switch (ar_detail[0]) {
                                        // 템플릿
                                        case "minimum":
                                                option.exist_btnPlay = true; // 재생버튼
                                                option.exist_btnStop = true; // 정지버튼
                                                option.exist_barTime = true; // 시간막대
                                                option.exist_laeTime = true; // 시간레이블
                                                break;
                                        case "audio":
                                                option.exist_btnPlay = true; // 재생버튼
                                                option.exist_btnStop = true; // 정지버튼
                                                option.exist_barTime = true; // 시간막대
                                                option.exist_laeTime = true; // 시간레이블
                                                option.exist_volume = true; // 볼륨
                                                option.exist_playbackrate = true; // 재생속도
                                                break;
                                        case "video":
                                                option.exist_btnPlay = true; // 재생버튼
                                                option.exist_btnStop = true; // 정지버튼
                                                option.exist_barTime = true; // 시간막대
                                                option.exist_laeTime = true; // 시간레이블
                                                option.exist_cover = true; // 커버(포스터&큰재생버튼)
                                                break;
                                        case "full_video":
                                                option.exist_btnPlay = true; // 재생버튼
                                                option.exist_btnStop = true; // 정지버튼
                                                option.exist_barTime = true; // 시간막대
                                                option.exist_laeTime = true; // 시간레이블
                                                option.exist_volume = true; // 볼륨
                                                option.exist_fullscreen = true; // 전체화면
                                                option.exist_cover = true; // 커버(포스터&큰재생버튼)
                                                break;
                                        case "music_full": // 이전 버전 typeA
                                                option.exist_btnListen = true; // 전체듣기/소절듣기 버튼 (악보 자동 설정)
                                                option.exist_btnPlay = true; // 재생버튼
                                                option.exist_btnStop = true; // 정지버튼
                                                option.exist_btnWayloop = true; // 웨이포인트 전용 루프 버튼
                                                option.exist_btnFocus = true; // 포커스 가시여부 조절 버튼
                                                option.exist_btnLyrics = true; // 가사 가시여부 조절 버튼
                                                option.exist_playbackrate = true; // 재생속도컨트롤
                                                option.exist_btnTune = true; // 튠 조절 버튼
                                                break;
                                        case "music_simple": // 이전 버전 typeD, +notes(typeB), +btnUpdown(typeI)
                                                option.exist_btnPlay = true; // 재생버튼
                                                option.exist_btnStop = true; // 정지버튼
                                                option.exist_barTime = true; // 시간막대
                                                option.exist_laeTime = true; // 시간레이블
                                                option.exist_loop = true; // 반복
                                                break;
                                        case "video":
                                                option.exist_btnPlay = true; // 재생버튼
                                                option.exist_btnStop = true; // 정지버튼
                                                option.exist_barTime = true; // 시간막대
                                                option.exist_laeTime = true; // 시간레이블
                                                option.exist_volume = true; // 볼륨
                                                option.exist_fullscreen = true; // 풀스크린
                                                break;
                                                // 템플릿:단순버튼기능(play/stop)
                                        case "btnonly":
                                                option.no_ui = true; // UI 없음
                                                option.exist_onetouch = true; // 원터치
                                                break;
                                                // 특수옵션
                                        case "fullscreentarget": // 풀스크린을 위한 타겟 미디어플레이어
                                                option.exist_fullscreen = true;
                                                option.fullscreen_target = true;
                                                break;
                                        case "no_ui": option.no_ui = true; break; // UI 없음
                                        case "scroll": option.subtitle_scroll = true; break; // 자막에 라이브러리 스크롤 있음
                                                // 컴포넌트
                                        case "btnPlay": option.exist_btnPlay = true; break; // 재생버튼
                                        case "btnStop": option.exist_btnStop = true; break; // 정지버튼
                                        case "btnMove": option.exist_btnMove = true; break; // FWD, BWD 버튼
                                        case "barTime": option.exist_barTime = true; break; // 시간막대
                                        case "laeTime": option.exist_laeTime = true; break; // 시간레이블
                                        case "volume": option.exist_volume = true; break; // 볼륨컨트롤(사운드on/off 버튼 + 볼륨조절막대)
                                        case "repeat": option.exist_repeat = true; break; // 구간반복
                                        case "loop": option.exist_loop = true; break; // 루프버튼
                                        case "playbackrate": option.exist_playbackrate = true; break; // 재생속도컨트롤
                                        case "onetouch": option.exist_onetouch = true; break; // 원터치
                                        case "fullscreen":
                                                option.exist_fullscreen = true;
                                                if (ar_detail.length == 1) { option.fullscreen_style = ""; }
                                                else { option.fullscreen_style = "_" + ar_detail[1]; }
                                                break; // 전체화면버튼
                                        case "cover": option.exist_cover = true; break; // 포스터
                                        case "thumbnail": option.exist_thumbnail = true; break; // 썸네일
                                        case "subtitle": option.exist_subtitle = true; break; // 자막
                                        case "btnSubtitle": option.exist_btnSubtitle = true; break; // 자막 on/off 버튼 (자막 자동 설정)
                                        case "btnLanguage": option.exist_btnLanguage = true; break; // 한/영 버튼 (자막 자동 설정)
                                        case "btnFontsize": option.exist_btnFontsize = true; break; // 폰트사이즈 버튼 (자막 자동 설정)
                                        case "roleplay": option.exist_roleplay = true; break; // 롤플레이
                                        case "notes": option.exist_notes = true; break; // 악보
                                        case "btnListen": option.exist_btnListen = true; break; // 전체듣기/소절듣기 버튼
                                        case "btnWayloop": option.exist_btnWayloop = true; break; // 웨이포인트 전용 루프 버튼
                                        case "btnFocus": // 포커스 가시여부 조절 버튼
                                                option.exist_notes = true;
                                                option.exist_btnFocus = true;
                                                break;
                                        case "btnLyrics": // 가사 가시여부 조절 버튼
                                                option.exist_notes = true;
                                                option.exist_btnLyrics = true;
                                                break;
                                        case "btnTune": option.exist_btnTune = true; break; // 튠 조절 버튼
                                        case "btnUpdown": option.exist_btnUpdown = true; break; // 상,하향음 버튼
                                        case "btnScale": // 계이름 표시 별도 버튼 (모양만 바꾼 btnLyrics)
                                                option.exist_btnLyrics = true;
                                                option.btnScale = true;
                                                break;
                                }
                        }
                },



                ///// onInit

                // mp_text 특수
                mpText_onInit: function () { },

                // core
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

                // btnPlay
                btnPlay_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (hie.controlPannel == null) { hie.controlPannel = tools_addElement("<div class='controlPannel'></div>", hie.mediaControls); }
                        hie.btnPlay = tools_addElement("<div class='mCBtn btnPlay'></div>", hie.controlPannel);
                },

                // btnStop
                btnStop_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (hie.controlPannel == null) { hie.controlPannel = tools_addElement("<div class='controlPannel'></div>", hie.mediaControls); }
                        hie.btnStop = tools_addElement("<div class='mCBtn btnStopOff'></div>", hie.controlPannel);
                },

                // btnMove
                btnMove_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (hie.controlPannel == null) { hie.controlPannel = tools_addElement("<div class='controlPannel'></div>", hie.mediaControls); }
                        hie.btnMoveBackward = tools_addElement("<div class='btnProto btnMoveBackward'></div>", hie.controlPannel);
                        hie.btnMoveForward = tools_addElement("<div class='btnProto btnMoveForward'></div>", hie.controlPannel);
                },

                // volume
                volume_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnSound = tools_addElement("<div class='mCBtn btnSoundOn'></div>", hie.mediaControls);
                        hie.barVolume = tools_addElement("<div class='barProto mvSound'></div>", hie.mediaControls);
                        hie.barVolume.back = tools_addElement("<div class='back'></div>", hie.barVolume);
                        hie.barVolume.current = tools_addElement("<div class='current'></div>", hie.barVolume.back);
                        hie.barVolume.marker = tools_addElement("<div class='marker'></div>", hie.barVolume.back);
                        hie.barVolume.toucharea = tools_addElement("<div class='toucharea'></div>", hie.barVolume.back);
                },

                // barTime
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

                // laeTime
                laeTime_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (hie.barTime == null) { tools_addElement("<div class='barProto mvTime'></div>", hie.mediaControls); }
                        hie.laeTime = tools_addElement("<div class='label'></div>", hie.barTime);
                },

                // playbackrate
                playbackrate_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (hie.speedPannel == null) { hie.speedPannel = tools_addElement("<div class='speedPannel'></div>", hie.mediaControls); }
                        switch (OPTION_PLAYBACKRATE_TYPE) {
                                case 0:
                                        hie.btnSlow = tools_addElement("<div class='btnSlow'></div>", hie.speedPannel);
                                        hie.laePlaybackrate = tools_addElement("<div class='label'></div>", hie.speedPannel);
                                        hie.btnFast = tools_addElement("<div class='btnFast'></div>", hie.speedPannel);
                                        break;
                                case 1:
                                        hie.btnSlow = tools_addElement("<div class='btnSlow'>x" + OPTION_PLAYBACKRATE_VALUE_SLOW + "</div>", hie.speedPannel);
                                        hie.btnNormal = tools_addElement("<div class='btnNormal'>x1.0</div>", hie.speedPannel);
                                        hie.btnFast = tools_addElement("<div class='btnFast'>x" + OPTION_PLAYBACKRATE_VALUE_FAST + "</div>", hie.speedPannel);
                                        break;
                                case 2:
                                        hie.btnPlaybackrate = tools_addElement("<div class='mIBtn btnPlaybackrateNormal'></div>", hie.speedPannel);
                                        hie.menuPlaybackrate = tools_addElement("<div class='menuDropDown'></div>", hie.btnPlaybackrate);
                                        hie.btnFast = tools_addElement("<div class='btnPlaybackrateFast'></div>", hie.menuPlaybackrate);
                                        hie.btnNormal = tools_addElement("<div class='btnPlaybackrateNormal'></div>", hie.menuPlaybackrate);
                                        hie.btnSlow = tools_addElement("<div class='btnPlaybackrateSlow'></div>", hie.menuPlaybackrate);
                                        break;
                        }
                },

                // repeat
                repeat_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnRepeatStart = tools_addElement("<div class='btnProto btnRepeatStartOff'></div>", hie.mediaControls);
                        hie.btnRepeatEnd = tools_addElement("<div class='btnProto btnRepeatEndOff'></div>", hie.mediaControls);
                        if (_parent._option().exist_barTime == true) {
                                hie.barTime.markerRepeatStart = tools_addElement("<div class='repeat'></div>", hie.barTime);
                                hie.barTime.markerRepeatEnd = tools_addElement("<div class='repeat'></div>", hie.barTime);
                        }
                },

                // loop
                loop_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnLoop = tools_addElement("<div class='mIBtn btnLoopOff'></div>", hie.mediaControls);
                },


                // cover
                cover_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.coverContainer == null) { hie.coverContainer = tools_addElement("<div class='coverContainer'></div>", hie.mediaContainer, "before"); }
                        if (VIDEO_EXIST_BTN_COVER == true) { hie.btnCover = tools_addElement("<div class='btnCover'></div>", hie.coverContainer); }
                        hie.poster = tools_addElement("<div class='poster'></div>", hie.coverContainer);
                },

                // fullscreen
                fullscreen_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnFullscreen = tools_addElement("<div class='mCBtn btnFullscreenOff'></div>", hie.mediaControls);
                },

                // thumbnail
                thumbnail_onInit: function () { },


                // subtitle
                subtitle_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();
                        var option = _parent._option();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (option.exist_btnLanguage == true) { hie.btnLanguage = tools_addElement("<div class='btnProto btnLanguageOff'></div>", hie.mediaControls); }
                        if (option.exist_btnSubtitle == true) { hie.btnSubtitle = tools_addElement("<div class='btnProto btnSubtitleOff'></div>", hie.mediaControls); }
                        if (option.exist_btnFontsize == true) {
                                hie.btnFontsizeDown = tools_addElement("<div class='btnProto btnFontsizeDown'></div>", hie.mediaControls);
                                hie.btnFontsizeUp = tools_addElement("<div class='btnProto btnFontsizeUp'></div>", hie.mediaControls);
                        }
                },

                // roleplay
                roleplay_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnRoleplayArray = new Array();
                        for (var ii = 1 ; ii < ROLEPLAY_MAX_AMOUNT + 1 ; ii++) { hie.btnRoleplayArray[ii - 1] = tools_addElement("<div class='btnProto btnRoleplay" + ii + "Off'></div>", hie.mediaControls); }
                },


                // notes
                notes_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();
                        var option = _parent._option();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (option.exist_btnListen == true) {
                                hie.btnListen = tools_addElement("<div class='mIBtn btnListenAll'></div>", hie.btnPlay, "before");
                                hie.menuListen = tools_addElement("<div class='menuDropDown'></div>", hie.btnListen);
                                hie.btnListenAll = tools_addElement("<div class='btnListenAll'></div>", hie.menuListen);
                                hie.btnListenPart = tools_addElement("<div class='btnListenPart'></div>", hie.menuListen);
                                hie.btnWaypointPrev = tools_addElement("<div class='mIBtn btnWaypointPrev'></div>", hie.btnStop, "after");
                                hie.btnWaypointLabel = tools_addElement("<div class='btnWaypointLabel'></div>", hie.btnWaypointPrev, "after");
                                hie.btnWaypointLabel.label = tools_addElement("<div class='label'></div>", hie.btnWaypointLabel);
                                hie.btnWaypointNext = tools_addElement("<div class='mIBtn btnWaypointNext'></div>", hie.btnWaypointLabel, "after");
                                hie.menuWaypoint = tools_addElement("<div class='menuDropDown'></div>", hie.btnWaypointLabel);
                        }
                        if (option.exist_btnWayloop == true) { hie.btnWayloop = tools_addElement("<div class='mIBtn btnWayloopOff'></div>", hie.btnWaypointNext, "after"); }
                        if (option.exist_btnFocus == true) { hie.btnFocus = tools_addElement("<div class='mIBtn btnFocusOff'></div>", hie.btnWayloop, "after"); }
                        if (option.exist_btnLyrics == true) {
                                if (option.btnScale == true) { // 계이름 표시 별도 버튼
                                        hie.btnLyrics = tools_addElement("<div class='mIBtn btnScale btnLyricsOff'></div>", hie.mediaControls);
                                } else {
                                        if (hie.btnFocus == null) { hie.btnLyrics = tools_addElement("<div class='mIBtn btnLyricsOff'></div>", hie.mediaControls); }
                                        else { hie.btnLyrics = tools_addElement("<div class='mIBtn btnLyricsOff'></div>", hie.btnFocus, "after"); }
                                }
                        }
                        if (option.exist_btnTune == true) {
                                hie.btnTune = tools_addElement("<div class='mIBtn btnTuneNormal'></div>", hie.btnLyrics, "after");
                                hie.menuTune = tools_addElement("<div class='menuDropDown tune'></div>", hie.btnTune);
                                //hie.btnTuneUp = tools_addElement("<div class='btnTuneUp'></div>", hie.menuTune);
                                hie.btnTuneNormal = tools_addElement("<div class='btnTuneNormal'></div>", hie.menuTune);
                                hie.btnTuneDown = tools_addElement("<div class='btnTuneDown'></div>", hie.menuTune);
                        }
                },

                // btnUpdown
                btnUpdown_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();
                        var option = _parent._option();

                        // UI
                        hie.btnUpdownUp = tools_addElement("<div class='mSbtn btnUpdownUp on'></div>", hie.btnPlay, "before");
                        hie.btnUpdownDown = tools_addElement("<div class='mSbtn btnUpdownDown'></div>", hie.btnUpdownUp, "after");
                },


                // 시작 전 커스텀
                onBeforeStart: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();
                        var option = _parent._option();

                        // audio 일 때 audioControls 에 클래스 추가
                        if (cat == "audio" && option.exist_btnListen == false) {
                                if (option.exist_btnUpdown == true) { $(hie.mediaControls).addClass("vocal"); }
                                else { $(hie.mediaControls).addClass("normal"); }
                        }
                }
        }
}