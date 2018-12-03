///// mediaplayer_core
var mediaplayer_core = function (p_parent) {

        ///// variables

        // module
        var _parent = p_parent;
        var _this;

        // option
        var option_reset_onstop; // 정지 시 리셋 여부(템플릿에서 전달 받음)

        // private
        var b_loaded_media = false; // 미디어 로드 완료 여부
        var i_media_state = 0; // 미디어 상태 (-2:로드실패, -1: 로딩중, 0:대기중, 1:로딩됨)

        // system
        var id_timeout_force_timeupdate; // 강제 시간 갱신 Timeout
        var id_timeout_wait_after_error; // 에러 후 대기 상태로 전환 Timeout
        var time_move_reserve = -1; // 로딩이 아직 안되었을 때 들어오는 moveto 시간을 저장 후 로드 후 실행
        var time_stop_reserve = -1; // 부분 재생 시 멈춤 예약 시간





        ///// function

        return {

                ///// initialize

                // 초기화
                init: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.init()"); }

                        // 연결
                        _this = this;

                        // 커스터마이저
                        _parent._module().customizer.core_onInit();
                },
                start: function (p_preload, p_resetonstop) {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.start(" + p_preload + ", " + p_resetonstop + ")"); }

                        // 설정
                        option_reset_onstop = p_resetonstop;

                        // 빈 플레이어를 위한 보류
                        if (_parent._file() == null || _parent._file() == "") { return; }

                        // 프리로드
                        if (p_preload == true) { _this.createMediaElement(_parent._file()); }
                },

                // 참조
                b_loaded_media: function (exist) { if (exist != null) { b_loaded_media = exist; } else { return b_loaded_media; } },
                i_media_state: function () { return i_media_state; },





                ///// event

                // 미디어 로드 이벤트
                onLoadedData: function () {
                        // 개발
                        if (dev_mode == true && dev_trace_event == true) { console.log("@ " + _parent._id() + ": core.onLoadedData : " + _parent._file()); }

                        // 조건검사
                        if (b_loaded_media == true) { return; }

                        // 플래그
                        b_loaded_media = true;

                        // UI 모듬 갱신
                        _this.updateUI();

                        // 전달
                        if (_parent._module().thumbnail != null) { _parent._module().thumbnail.onLoadedData(); }

                        // 반응 해금
                        _this.setCoreState(1);

                        // 설정 체크
                        if (_parent._module().volume != null) { _this.setVolume(_parent._module().volume.f_vol_current()); }
                        if (_parent._module().loop != null) { _this.setLoop(_parent._module().loop.b_loop_on()); }
                        if (_parent._module().playbackrate != null) { _this.setPlaybackRate(_parent._module().playbackrate.f_rate_set()); }
                        if (_parent._module().roleplay != null) { _parent._module().roleplay.onUpdateUI(); }

                        // 예약 실행
                        if (time_move_reserve != -1) {
                                _this.castMove(time_move_reserve);
                                time_move_reserve = -1;
                        }
                },
                onLoadFailure: function () {
                        // 개발
                        if (dev_mode == true && dev_trace_event == true) { console.log("@ " + _parent._id() + ": core.onLoadFailure : " + _parent._file()); }

                        // 준비
                        var mod = _parent._module();

                        // 상태
                        _this.setCoreState(-2);

                        // 잠시 뒤에 상태 변경
                        id_timeout_wait_after_error = setTimeout(function () { _this.setCoreState(0); }, 1500);
                },

                // 재생 종료 이벤트 : loop 상태가 true 이면 발생하지 않음
                onEnded: function () {
                        // 개발
                        if (dev_mode == true && dev_trace_event == true) { console.log("@ " + _parent._id() + ": onEnded"); }

                        // 조건검사 : 드래그 중에는 무시
                        if (_parent._media().loop == false && _parent._module().barTime != null && _parent._module().barTime.b_drag_bar() == true) { return; }

                        // 외부 연결
                        if (typeof onMediaEnded == "function") { onMediaEnded(_parent._id()); }

                        // 정지
                        _this.castStop();
                },

                // 재생 갱신 이벤트
                onTimeUpdate: function () {
                        // 준비
                        var mod = _parent._module();

                        // 부분 재생에 의한 멈춤
                        if (time_stop_reserve != -1 && _parent._media().currentTime > time_stop_reserve) {
                                if (_parent._module().barTime != null) { _this.castPause(); }
                                else { _this.castStop(); }
                                time_stop_reserve = -1;
                        }

                        // 구간반복 체크
                        if (mod.repeat != null && _parent._media().paused == false && mod.repeat.b_repeat_on() == true) {
                                // 준비
                                var current = _parent._media().currentTime;
                                var start = mod.repeat.f_repeat_start();
                                var end = mod.repeat.f_repeat_end();
                                var revise = 0;

                                // 플랫폼 보정
                                if (tools_chkMobileOS() == "ios") { revise = 0.2; }
                                if (tools_chkMobileOS() == "android") { revise = 0.1; }

                                // 동작
                                if (current < start) {
                                        _this.castMove(start + revise);
                                        return;
                                } else if (current > end) {
                                        _this.castMove(start + revise);
                                        return;
                                }
                        }

                        // 전달
                        if (mod.barTime != null) { mod.barTime.onUpdateUI(); }
                        if (mod.laeTime != null) { mod.laeTime.onUpdateUI(); }
                        if (mod.subtitle != null) { mod.subtitle.onTimeUpdate(); }
                        if (mod.notes != null) { mod.notes.onTimeUpdate(); }
                        //if (mod.thumbnail != null) { mod.thumbnail.onTimeUpdate(); }

                        // 롤플레이에 의한 묵음
                        if (mod.roleplay != null && _parent._media().paused == false) {
                                // 준비
                                var media = _parent._media();
                                var current = _parent._media().currentTime;

                                // 판단
                                var rolemute = mod.roleplay.getRoleMute(current);

                                // 반영
                                if (rolemute == true && media.muted == false) { media.muted = true; }
                                else if (rolemute == false && media.muted == true) { media.muted = false; }
                        }

                        // 강제 시간 갱신
                        if (TIMEOUT_FORCE_TIMEUPDATE != 0) {
                                // 기존 제거
                                if (id_timeout_force_timeupdate != null) {
                                        clearTimeout(id_timeout_force_timeupdate);
                                        id_timeout_force_timeupdate = null;
                                }

                                // 설정
                                if (_parent._media().paused == false) { id_timeout_force_timeupdate = setTimeout(function () { _this.onTimeUpdate(); }, TIMEOUT_FORCE_TIMEUPDATE); }
                        }
                },





                ///// method

                // 제어
                castPlay: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castPlay() try"); }

                        // 조건검사
                        if (_parent._file() == null || _parent._file() == "") { return; }

                        // 다른 미디어플레이어 초기화
                        resetAnotherMediaPlayer(_parent._id());

                        // 아직 준비 안됨 - 미디어 로드
                        if (b_loaded_media == false) { _this.createMediaElement(_parent._file()); }

                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castPlay()"); }

                        // 재생
                        _parent._media().play();

                        // 설정 체크
                        if (_parent._module().volume != null) { _this.setVolume(_parent._module().volume.f_vol_current()); }
                        if (_parent._module().loop != null) { _this.setLoop(_parent._module().loop.b_loop_on()); }
                        if (_parent._module().playbackrate != null) { _this.setPlaybackRate(_parent._module().playbackrate.f_rate_set()); }

                        // UI 모듬 갱신
                        _this.updateUI();

                        // 인터랙션
                        _this.onInteraction();

                        // 전달
                        if (_parent._module().cover != null) { _parent._module().cover.updateModule(false); }
                        if (_parent._module().mpText != null) { _parent._module().mpText.onCastPlay(); }

                        // 재생 갱신 이벤트 강제 발생
                        _this.onTimeUpdate();
                },
                castPause: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castPause() try"); }

                        // 조건검사
                        if (b_loaded_media == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castPause()"); }

                        // 정지
                        _parent._media().pause();

                        // 인터랙션
                        _this.onInteraction();

                        // UI 모듬 갱신
                        _this.updateUI();
                },
                castStop: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castStop() try"); }

                        // 조건검사
                        if (b_loaded_media == false) {
                                _this.updateUI(); // UI 모듬 갱신
                                return; // 중단
                        }
                        if (_parent._media().paused == true && _parent._media().currentTime == 0) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castStop()"); }

                        // 초기화
                        if (_parent._media().paused == false || _parent._media().currentTime != 0) {
                                if (dev_mode == false) { _parent._media().play(); }
                                _parent._media().currentTime = 0;
                        }

                        // 멈춤
                        _parent._media().pause();

                        // 예약 제거
                        time_move_reserve = -1;

                        // UI 모듬 갱신
                        _this.updateUI();

                        // 인터랙션
                        _this.onInteraction();

                        // 전달
                        if (_parent._module().mpText != null) { _parent._module().mpText.onCastStop(); }

                        // 스탑 시 리셋
                        if (option_reset_onstop == true) { _this.castReset(true); }
                },
                castHardReset: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castHardReset()"); }

                        // 제어
                        if (b_loaded_media == true) { _this.castStop(); }

                        // 예약 해제
                        time_stop_reserve = -1;

                        // 준비
                        var mod = _parent._module();

                        // 전달
                        if (mod.btnPlay != null) { mod.btnPlay.onReset(); }
                        if (mod.btnStop != null) { mod.btnStop.onReset(); }
                        if (mod.barTime != null) { mod.barTime.onReset(); }
                        if (mod.laeTime != null) { mod.laeTime.onReset(); }
                        if (mod.volume != null) { mod.volume.onReset(); }
                        if (mod.repeat != null) { mod.repeat.onReset(); }
                        if (mod.loop != null) { mod.loop.onReset(); }
                        if (mod.playbackrate != null) { mod.playbackrate.onReset(); }
                        if (mod.fullscreen != null) { mod.fullscreen.onReset(); }
                        if (mod.cover != null) { mod.cover.onReset(); }
                        if (mod.subtitle != null) { mod.subtitle.onReset(); }
                        if (mod.roleplay != null) { mod.roleplay.onReset(); }
                        if (mod.notes != null) { mod.notes.onHardReset(); }
                        if (mod.btnUpdown != null) { mod.btnUpdown.onHardReset(); }

                        // 갱신
                        _this.updateUI();
                },
                castReset: function (onstop) {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castReset(" + onstop + ")"); }

                        // 제어
                        if ((onstop == null || onstop == false) && b_loaded_media == true) { _this.castStop(); }

                        // 예약 해제
                        time_stop_reserve = -1;

                        // 준비
                        var mod = _parent._module();
                        
                        // 전달
                        if (mod.btnPlay != null) { mod.btnPlay.onReset(); }
                        if (mod.btnStop != null) { mod.btnStop.onReset(); }
                        if (mod.barTime != null) { mod.barTime.onReset(); }
                        if (mod.laeTime != null) { mod.laeTime.onReset(); }
                        if (mod.volume != null) { mod.volume.onReset(); }
                        if (mod.repeat != null) { mod.repeat.onReset(); }
                        if (mod.loop != null) { mod.loop.onReset(); }
                        if (mod.playbackrate != null) { mod.playbackrate.onReset(); }
                        if (mod.fullscreen != null) { mod.fullscreen.onReset(); }
                        if (mod.cover != null) { mod.cover.onReset(); }
                        if (mod.subtitle != null) { mod.subtitle.onReset(); }
                        if (mod.roleplay != null) { mod.roleplay.onReset(); }
                        if (mod.notes != null) { mod.notes.onReset(); }
                        if (mod.btnUpdown != null) { mod.btnUpdown.onReset(); }
                        
                        // 갱신
                        _this.updateUI();
                },
                castMove: function (time) {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castMove(" + time + ") try"); }

                        // 조건검사
                        if (b_loaded_media == false) {
                                time_move_reserve = time;
                                return;
                        }

                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castMove(" + time + ")"); }

                        // 인터랙션
                        _this.onInteraction();

                        // 전달
                        if (_parent._module().cover != null) { _parent._module().cover.updateModule(false); }

                        // 시간 이동
                        _parent._media().currentTime = time;

                        // 갱신
                        _this.updateUI();
                },

                // 설정
                setVolume: function (vol) {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.setVolume(" + vol + ") try"); }

                        // 조건검사
                        if (b_loaded_media == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.setVolume(" + vol + ")"); }

                        // 비디오 뮤트 보정
                        if (_parent._category() == "video" && _parent._media().muted == true) { _parent._media().muted = false; }

                        // 설정
                        _parent._media().volume = vol;
                },
                setLoop: function (p_loop) {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.setLoop(" + p_loop + ") try"); }

                        // 조건검사
                        if (b_loaded_media == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.setLoop(" + p_loop + ")"); }

                        // 설정
                        _parent._media().loop = p_loop;
                },
                setPlaybackRate: function (rate) {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.setPlaybackRate(" + rate + ") try"); }

                        // 조건검사
                        if (b_loaded_media == false) { return; }

                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.setPlaybackRate(" + rate + ")"); }

                        // 설정
                        _parent._media().playbackRate = rate;
                },
                setStopReserve: function (end) {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.setStopReserve(" + end + ")"); }

                        //
                        time_stop_reserve = end;
                },

                // 음원 교체
                castChangeMedia: function (p_media, p_data, p_subtitle) {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.castChangeMedia(" + p_media + ", " + p_data + ", " + p_subtitle + ")"); }

                        // 준비
                        var mod = _parent._module();

                        // 멈춤
                        _this.castStop();

                        // 리셋
                        _this.castReset();

                        // 기존 제거
                        _this.clearMediaElement();

                        // 재정의
                        _parent._file(p_media);

                        // 전달
                        if (mod.cover != null) { mod.cover.onCastChangeMedia(); }
                        if (mod.subtitle != null) { mod.subtitle.onCastChangeMedia(p_data, p_subtitle); }
                        if (mod.roleplay != null) { mod.roleplay.onCastChangeMedia(p_data, p_subtitle); }
                        if (mod.notes != null) { mod.notes.onCastChangeMedia(p_data); }

                        // 재생성
                        _this.createMediaElement(p_media);
                },





                ///// primary

                // 미디어 엘리먼트 생성, 제거
                createMediaElement: function (p_media, p_dev) { // * 주의 : 로드가 끝나야 유효한 duration 을 받을 수 있고, 정보 정리가 가능함
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.createMediaElement(" + p_media + ", " + p_dev + ")"); }

                        // 준비
                        var obj;

                        // 변수
                        b_loaded_media = false;

                        // 상태 변경
                        if (tools_chkMobileOS() == "ios") { _this.setCoreState(0); }
                        else { _this.setCoreState(-1); }

                        // 기존 제거
                        _this.clearMediaElement();

                        // 엘리먼트 생성
                        switch (_parent._category()) {
                                case "audio":
                                        obj = document.createElement("audio");
                                        obj.src = PATH_MEDIA_AUDIO + p_media + ".mp3";
                                        break;
                                case "video":
                                        obj = document.createElement("video");
                                        obj.src = PATH_MEDIA_VIDEO + p_media + ".mp4";
                                        tools_setVideoSize(_parent._ele(), obj);
                                        if (tools_chkMobileOS() == "ios") { $(obj).attr('playsinline', ''); }
                                        break;
                        }

                        // 설정
                        obj.preservesPitch = true; // 피치

                        // 붙이기
                        $(_parent._hierarchy().mediaContainer).append(obj);

                        // 지정
                        _parent._media(obj);

                        // 이벤트 리스너
                        _this.addEL();
                },
                clearMediaElement: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.clearMediaElement()"); }

                        // 조건검사
                        if (_parent._media() == null) { return; }

                        // 이벤트 해제
                        _this.removeEL();

                        // 제거
                        $(_parent._media()).remove();
                },

                // 코어 상태 설정
                setCoreState: function (st) {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.setCoreState(" + st + ")"); }

                        // Timeout 해제
                        if (id_timeout_wait_after_error != null) {
                                clearTimeout(id_timeout_wait_after_error);
                                id_timeout_wait_after_error = null;
                        }

                        // 준비
                        var mod = _parent._module();

                        // 상태 설정
                        i_media_state = st;

                        // 레이블 갱신
                        if (mod.laeTime != null) { mod.laeTime.onUpdateUI(); }
                },

                // UI 모듬 갱신 (코어를 기준으로 하는 UI)
                updateUI: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.updateUI_exe()"); }

                        // 준비
                        var mod = _parent._module();

                        // 갱신
                        if (mod.barTime != null) { mod.barTime.onUpdateUI(); }
                        if (mod.laeTime != null) { mod.laeTime.onUpdateUI(); }
                        if (mod.btnPlay != null) { mod.btnPlay.onUpdateUI(); }
                        if (mod.btnStop != null) { mod.btnStop.onUpdateUI(); }
                        if (mod.roleplay != null) { mod.roleplay.onUpdateUI(); }
                        if (mod.onetouch != null) { mod.onetouch.onUpdateUI(); }
                },





                ///// secondary

                // 인터랙션 반응
                onInteraction: function () {
                        // 예약 해제
                        time_stop_reserve = -1;

                        // 전달
                        if (_parent._module().subtitle != null) { _parent._module().subtitle.onInteraction(); }
                        if (_parent._module().cover != null) { _parent._module().cover.onInteraction(); }
                },

                // 이벤트 연결, 해제
                addEL: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.addEL()"); }

                        //
                        _parent._media().addEventListener("loadeddata", _this.onLoadedData);
                        _parent._media().addEventListener("error", _this.onLoadFailure);
                        _parent._media().addEventListener("ended", _this.onEnded);
                        _parent._media().addEventListener("timeupdate", _this.onTimeUpdate);
                        if (_parent._module().fullscreen != null && VIDEO_CUSTOM_FULLSCREEN == false) {
                                _parent._media().addEventListener("webkitbeginfullscreen", _parent._module().fullscreen.onFullscreen);
                                _parent._media().addEventListener("webkitendfullscreen", _parent._module().fullscreen.onNormalscreen);
                                document.addEventListener("fullscreenchange", _parent._module().fullscreen.onFullscreenchange);
                                document.addEventListener("webkitfullscreenchange", _parent._module().fullscreen.onWebkitfullscreenchange);
                                document.addEventListener("mozfullscreenchange", _parent._module().fullscreen.onMozfullscreenchange);
                                document.addEventListener("MSFullscreenChange", _parent._module().fullscreen.onMSFullscreenChange);
                        }
                },
                removeEL: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.removeEL()"); }

                        //
                        if (id_timeout_force_timeupdate != null) { clearTimeout(id_timeout_force_timeupdate); }
                        _parent._media().removeEventListener("timeupdate", _this.onTimeUpdate);
                        _parent._media().removeEventListener("ended", _this.onEnded);
                        _parent._media().removeEventListener("loadeddata", _this.onLoadedData);
                        if (_parent._module().fullscreen != null && VIDEO_CUSTOM_FULLSCREEN == false) {
                                _parent._media().removeEventListener("webkitbeginfullscreen", _parent._module().fullscreen.onFullscreen);
                                _parent._media().removeEventListener("webkitendfullscreen", _parent._module().fullscreen.onNormalscreen);
                                document.removeEventListener("fullscreenchange", _parent._module().fullscreen.onFullscreenchange);
                                document.removeEventListener("webkitfullscreenchange", _parent._module().fullscreen.onWebkitfullscreenchange);
                                document.removeEventListener("mozfullscreenchange", _parent._module().fullscreen.onMozfullscreenchange);
                                document.removeEventListener("MSFullscreenChange", _parent._module().fullscreen.onMSFullscreenChange);
                        }
                },

                // 설정 수집, 적용
                getState: function () {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.getState()"); }

                        // 준비
                        obj = {};

                        // 수집
                        obj.b_loaded_media = b_loaded_media;
                        obj.i_media_state = i_media_state;

                        // 반환
                        return obj;
                },
                setState: function (obj) {
                        // 개발
                        if (dev_trace_detail == _parent._id()) { console.log("# " + _parent._id() + ": core.setState(" + obj + ")"); }

                        // 적용
                        b_loaded_media = obj.b_loaded_media;
                        _this.setCoreState(i_media_state);
                },
        }
}