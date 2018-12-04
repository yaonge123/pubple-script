// version 1.0.11 : 예외처리 추가, mediaplayer.js 에서 공통 부분 hq 로 이동
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
var dev_trace_null = false; // data null 체크 (의도적으로 비어있는 경우가 있음)
var dev_trace_detail = "none"; // 세부 추적할 미디어플레이어 ID

// 뷰어 관련
var CONTACTABLE_WITH_PARENT = true; // 상위 뷰어 접근 가능 여부

// 파일 경로
var PATH_MEDIA_AUDIO = "../../common/media/audio/"; // 오디오 미디어 파일 경로
var PATH_MEDIA_VIDEO = "../../common/media/video/"; // 비디오 미디어 파일 경로
var PATH_IMAGE_POSTER = PATH_MEDIA_VIDEO + "thum/"; // 포스터 파일 경로

// 강제 갱신
var TIMEOUT_FORCE_TIMEUPDATE = 50; // 강제 시간 갱신 타임아웃 : 빠를수록 타임바가 부드럽지만 연산 부하 걸림

// 이동 관련
var MOVE_TIME_FWD = 10; // FWD 이동량
var MOVE_TIME_BWD = -10; // BWD 이동량

// 재생속도 관련
var OPTION_PLAYBACKRATE_TYPE = 2; // 재생속도 타입 0:버튼|레이블|버튼 1:버튼|버튼|버튼 2:드랍다운버튼
var OPTION_PLAYBACKRATE_VALUE_SLOW = 0.9; // 타입1 일 때 느린버튼(최하 0.5)
var OPTION_PLAYBACKRATE_VALUE_FAST = 1.1; // 타입1 일 때 빠른버튼(최대 2.0)

// UI 관련 보정값
var REVISE_VOLUME_MARKER = 0; // 볼륨막대 마커 보정값 : (width / 2 * -1) + 픽셀 단위 보정
var REVISE_TIMEBAR_MARKER = -12; // 시간막대 마커 보정값 : 상동
var REVISE_REPEAT_MARKER = -5; // 구간반복 마커 보정값 : 상동
var REVISE_ROLEPLAY_MARKER = -15; // 롤플레이 마커 보정값 : 상동

// 자막 관련
var SUBTITLE_CUSTOME_SCROLL = true; // 커스텀 스크롤
var SUBTITLE_FONTSIZE_MODIFY = 10; // 폰트사이즈 변화량 (*1 / *-1)
var SUBTITLE_FONTSIZE_MIN = -2; // 최소 단계 (기본값 + (SUBTITLE_FONTSIZE_MIN * SUBTITLE_FONTSIZE_MODIFY))
var SUBTITLE_FONTSIZE_MAX = 2; // 최대 단계
var SUBTITLE_COVER_HIDE_TIME = 1000; // 커버 버튼 숨김 시간
var SUBTITLE_PAGE_SCROLL_REF = 0.6; // 페이지 넘김 값 ( * height)

// 롤플레이 관련
var ROLEPLAY_MAX_AMOUNT = 5; // 롤플레이 최대 수
var ROLEPLAY_EXIST_MARKER = true; // 타임바에 올라가는 마커 유무
var ROLEPLAY_EXIST_BAR = true; // 묵음처리 동안 프로그레스 바 존재 여부
var ROLEPLAY_EXTERNAL_BTN = true; // 외부 버튼 모드

// 비디오 관련
var VIDEO_CUSTOM_FULLSCREEN = true; // 풀스크린 형식 (true:컨테이너로관련함수호출, false:네이티브)
var VIDEO_EXIST_BTN_COVER = true; // 커버버튼 존재
var VIDEO_CONTROL_WITH_COVER = true; // false:플레이아닐땐컨트롤숨김(커버버튼 반드시 필요), true:컨트롤항상보임
var VIDEO_CONTROL_HIDE = 0; // 0:인아웃숨김기능없음, 1:인아웃숨김기능있음 * 이 기능을 사용하려면 videoWrap absolute 필수 등의 조건이 필요.
var VIDEO_DEFAULT_WIDTH = 600; // 설정이 없을 때 비디오 width
var VIDEO_DEFAULT_HEIGHT = 400; // 설정이 없을 때 비디오 height
var VIDEO_INOUT_MARGIN_COVER = 100; // 커버 인아웃 체크 여유 공간(상하좌우 전부 적용)
var VIDEO_INOUT_MARGIN_THUMBNAIL = 20; // 썸네일 상동



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
                        var ar = setCompoByType_common_step0(_parent).split(" ");

                        // 템플릿 정리
                        for (var ii = ar.length - 1 ; ii >= 0 ; ii--) {
                                var ar_detail = ar[ii].split(":");
                                switch (ar_detail[0]) {
                                        case "minimum":
                                                ar.splice(ii, 1);
                                                ar.splice(ii, 0, "laeTime"); // 배치하려는 순서의 역순임에 주의할 것!
                                                ar.splice(ii, 0, "barTime");
                                                ar.splice(ii, 0, "btnStop");
                                                ar.splice(ii, 0, "btnPlay");
                                                break;
                                        case "audio":
                                                ar.splice(ii, 1);
                                                ar.splice(ii, 0, "playbackrate");
                                                ar.splice(ii, 0, "volume");
                                                ar.splice(ii, 0, "laeTime");
                                                ar.splice(ii, 0, "barTime");
                                                ar.splice(ii, 0, "btnStop");
                                                ar.splice(ii, 0, "btnPlay");
                                                break;
                                        case "video":
                                                ar.splice(ii, 1);
                                                ar.splice(ii, 0, "cover");
                                                ar.splice(ii, 0, "laeTime");
                                                ar.splice(ii, 0, "barTime");
                                                ar.splice(ii, 0, "btnStop");
                                                ar.splice(ii, 0, "btnPlay");
                                                break;
                                        case "full_video":
                                                ar.splice(ii, 1);
                                                ar.splice(ii, 0, "cover");
                                                ar.splice(ii, 0, "fullscreen");
                                                ar.splice(ii, 0, "volume");
                                                ar.splice(ii, 0, "laeTime");
                                                ar.splice(ii, 0, "barTime");
                                                ar.splice(ii, 0, "btnStop");
                                                ar.splice(ii, 0, "btnPlay");
                                                break;
                                        case "music_full": // 이전 버전 typeA
                                                ar.splice(ii, 1);
                                                ar.splice(ii, 0, "playbackrate");
                                                ar.splice(ii, 0, "btnTune");
                                                ar.splice(ii, 0, "btnLyrics");
                                                ar.splice(ii, 0, "btnFocus");
                                                ar.splice(ii, 0, "btnWayloop");
                                                ar.splice(ii, 0, "btnStop");
                                                ar.splice(ii, 0, "btnPlay");
                                                ar.splice(ii, 0, "btnListen");
                                                break;
                                        case "music_simple": // 종경 레이아웃 확인용 수정 - 노멀용 플레이어 추가
                                                ar.splice(ii, 1);
                                                ar.splice(ii, 0, "laeTime");
                                                ar.splice(ii, 0, "barTime");
                                                ar.splice(ii, 0, "btnStop");
                                                ar.splice(ii, 0, "btnPlay");
                                                break;
                                        case "music_vocal": // 종경 레이아웃 확인용 수정 - 발성 연습 플레이어 추가
                                                ar.splice(ii, 1);
                                                ar.splice(ii, 0, "loop");
                                                ar.splice(ii, 0, "laeTime");
                                                ar.splice(ii, 0, "barTime");
                                                ar.splice(ii, 0, "btnStop");
                                                ar.splice(ii, 0, "btnPlay");
                                                break;
                                }
                        }

                        // 공통:1단계(컴포넌트 정렬 순서 배열 반환)
                        return setCompoByType_common_step1(_parent, ar);
                },

                // 시작 전
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

                        // btnListen UI 구성물 순서 설정 보정
                        if (hie.btnStop != null && hie.btnListen != null) { $(hie.btnListen).after(hie.btnStop); }
                        if (hie.btnPlay != null && hie.btnListen != null) { $(hie.btnListen).after(hie.btnPlay); }

                        // 커스텀 풀스크린 미디어 위치 보정

                },

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
                                case "playbackrate": if (hie.speedPannel != null) return [hie.speedPannel];
                                case "fullscreen": if (hie.btnFullscreen != null) return [hie.btnFullscreen];
                                case "follow": if (hie.btnFollow != null) return [hie.btnFollow];
                                case "btnSubtitle": if (hie.btnSubtitle != null) return [hie.btnSubtitle];
                                case "btnLanguage": if (hie.btnLanguage != null) return [hie.btnLanguage];
                                case "btnLanKor": if (hie.btnLanKor != null) return [hie.btnLanKor];
                                case "btnLanEng": if (hie.btnLanEng != null) return [hie.btnLanEng];
                                case "btnFontsize": if (hie.btnFontsizeDown != null) return [hie.btnFontsizeDown, hie.btnFontsizeUp];
                                case "roleplay": if (hie.roleplayPannel != null) return [hie.roleplayPannel];
                                case "btnChange": if (hie.btnChange != null) return [hie.btnChange];
                                case "btnListen": if (hie.btnListen != null) return [hie.btnListen, hie.btnWaypointPrev, hie.btnWaypointLabel, hie.btnWaypointNext];
                                case "btnWayloop": if (hie.btnWayloop != null) return [hie.btnWayloop];
                                case "btnFocus": if (hie.btnFocus != null) return [hie.btnFocus, hie.btnLyricsFocus];
                                case "btnFocusLyrics": if (hie.btnLyricsFocus != null) return [hie.btnLyricsFocus];
                                case "btnLyrics": if (hie.btnLyrics != null) return [hie.btnLyrics];
                                case "btnTune": if (hie.btnTune != null) return [hie.btnTune];
                                case "btnUpdown": if (hie.btnUpdownUp != null) return [hie.btnUpdownUp, hie.btnUpdownDown];
                                default: if (_parent._custom()[str] != null) return _parent._custom()[str];
                        }

                        // 실패
                        return null;
                },
                


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
                        if (hie.controlPannel == null) { hie.controlPannel = tools_addElement("<div class='controlPannel'></div>", hie.mediaControls); }
                        hie.btnPlay = tools_addElement("<div class='mCBtn btnPlay'></div>", hie.controlPannel);
                },
                btnStop_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (hie.controlPannel == null) { hie.controlPannel = tools_addElement("<div class='controlPannel'></div>", hie.mediaControls); }
                        hie.btnStop = tools_addElement("<div class='mCBtn btnStop'></div>", hie.controlPannel);
                },
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
                volume_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnSound = tools_addElement("<div class='mCBtn btnSound'></div>", hie.mediaControls);
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
                        hie.btnLoop = tools_addElement("<div class='mIBtn btnLoop'></div>", hie.mediaControls);
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
                fullscreen_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        hie.btnFullscreen = tools_addElement("<div class='mCBtn btnFullscreen'></div>", hie.mediaControls);
                },
                subtitle_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();
                        var option = _parent._option();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (option.exist_btnLanguage == true) { hie.btnLanguage = tools_addElement("<div class='btnProto btnLanguage'></div>", hie.mediaControls); }
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
                        hie.btnRoleplayArray = new Array();
                        for (var ii = 1 ; ii < ROLEPLAY_MAX_AMOUNT + 1 ; ii++) { hie.btnRoleplayArray[ii - 1] = tools_addElement("<div class='btnProto btnRoleplay" + ii + "'></div>", hie.mediaControls); }
                },
                notes_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();
                        var option = _parent._option();

                        // UI
                        if (hie.mediaControls == null) { hie.mediaControls = tools_addElement("<div class='" + cat + "Controls'></div>", hie.mediaWrap); }
                        if (hie.controlPannel == null) { hie.controlPannel = tools_addElement("<div class='controlPannel'></div>", hie.mediaControls); }
                        if (option.exist_btnListen == true) {
                                hie.btnListen = tools_addElement("<div class='mIBtn btnListenAll'></div>", hie.controlPannel);
                                hie.menuListen = tools_addElement("<div class='menuDropDown'></div>", hie.btnListen);
                                hie.btnListenAll = tools_addElement("<div class='btnListenAll'></div>", hie.menuListen);
                                hie.btnListenPart = tools_addElement("<div class='btnListenPart'></div>", hie.menuListen);
                                hie.btnWaypointPrev = tools_addElement("<div class='mIBtn btnWaypointPrev'></div>", hie.btnListen, "after");
                                hie.btnWaypointLabel = tools_addElement("<div class='btnWaypointLabel'></div>", hie.btnWaypointPrev, "after");
                                hie.btnWaypointLabel.label = tools_addElement("<div class='label'></div>", hie.btnWaypointLabel);
                                hie.btnWaypointNext = tools_addElement("<div class='mIBtn btnWaypointNext'></div>", hie.btnWaypointLabel, "after");
                                hie.menuWaypoint = tools_addElement("<div class='menuDropDown'></div>", hie.btnWaypointLabel);
                        }
                        if (option.exist_btnWayloop == true) { hie.btnWayloop = tools_addElement("<div class='mIBtn btnWayloop'></div>", hie.btnWaypointNext, "after"); }
                        if (option.exist_btnFocus == true) {
                                hie.btnFocus = tools_addElement("<div class='mIBtn btnFocus'></div>", hie.btnWayloop, "after");
                                if (option.exception.withoutBtnLyricsFocus != true) {
                                        hie.btnLyricsFocus = tools_addElement("<div class='mIBtn btnFocusLyrics'></div>", hie.btnFocus, "after");
                                }
                        }
                        if (option.exist_btnLyrics == true) {
                                if (option.btnScale == true) { // 계이름 표시 별도 버튼
                                        hie.btnLyrics = tools_addElement("<div class='mIBtn btnScale btnLyrics'></div>", hie.mediaControls);
                                } else {
                                        if (hie.btnFocus == null) { hie.btnLyrics = tools_addElement("<div class='mIBtn btnLyrics'></div>", hie.mediaControls); }
                                        else { hie.btnLyrics = tools_addElement("<div class='mIBtn btnLyrics'></div>", hie.btnLyricsFocus, "after"); }  // 종경 레이아웃 확인용 수정
                                }
                        }
                        if (option.exist_btnTune == true) {
                                hie.btnTune = tools_addElement("<div class='mIBtn btnTuneNormal'></div>", hie.btnLyrics, "after");
                                hie.menuTune = tools_addElement("<div class='menuDropDown tune'></div>", hie.btnTune);
                                hie.btnTuneUp = tools_addElement("<div class='btnTuneUp'></div>", hie.menuTune);  // 종경 레이아웃 확인용 수정
                                hie.btnTuneNormal = tools_addElement("<div class='btnTuneNormal'></div>", hie.menuTune);
                                hie.btnTuneDown = tools_addElement("<div class='btnTuneDown'></div>", hie.menuTune);
                        }
                },
                btnUpdown_onInit: function () {
                        // 준비
                        var hie = _parent._hierarchy();
                        var cat = _parent._category();
                        var option = _parent._option();

                        // UI
                        hie.btnUpdownDown = tools_addElement("<div class='mSbtn btnUpdownDown'></div>", hie.btnPlay, "before"); // 종경 레이아웃 확인용 수정
                        hie.btnUpdownUp = tools_addElement("<div class='mSbtn btnUpdownUp'></div>", hie.btnUpdownDown, "before"); // 종경 레이아웃 확인용 수정
                        hie.btnUpdownAll = tools_addElement("<div class='mSbtn btnUpdownAll'></div>", hie.btnUpdownUp, "before"); // 종경 레이아웃 확인용 수정

                        // 관련 정보 반환
                        var data = {};
                        data.init_i_current_updown = 0; // 초기상태 -1:down, 0:all, 1:up
                        data["vocalization"] = { media:"vocalization", index:0, updown:0 }; // idx 는 여러 파일이 존재할 때, updown  -1:down, 0:all, 1:up
                        data["vocalization_d"] = { media: "vocalization_d", index: 0, updown: -1 };
                        data["vocalization_u"] = { media: "vocalization_u", index: 0, updown: 1 };
                        return data;
                },

                follow_onInit: function () { },
                btnChange_onInit: function () { },
                thumbnail_onInit: function () { },
        }
}