// version 1.0.59 : btnAnotherChange 추가
///// mediaplayer_template
var mediaplayer_template = function (p_type, p_ele) {

        ///// variables

        // module
        var _type = p_type;
        var _ele = p_ele;
        var _id, _file, _category; // 변수 : _id, _file(미디어파일명), _category(video/audio)
        var _this, _media, _module, _custom, _hierarchy, _tag; // 접근자 : _this(클래스), _media(미디어엘리먼트), _module(모듈오브젝트), _custom(커스텀UI구성물), _hierarchy(하이어라키오브젝트), _tag(접근명)

        // option
        var _option = {
                preload: false, // 프리로드
                reset_on_stop: false, // 정지 시 리셋
                no_ui: false, // UI 없음 (기본 UI 생성 안함, UI 존재를 기본으로 하는 컴포넌트 동작 안함)
                no_text_event: false, // 자막 문장에 이벤트 X
                subtitle_scroll: false, // 자막 스크롤 존재
                fullscreen_target: false, // 풀스크린 전용 미디어플레이어
                fullscreen_style: "", // 풀스크린 스타일
                musicalscale: false, // 계이름표시 별도 버튼
                exception: {}, // 예외사항들
                event: {}, // 등록된 이벤트 들(dictionary)

                exist_mpText: false, // mp_text : 텍스트가 버튼 역할, onEnded 에 css 컬러 조정

                exist_btnPlay: false, // 재생버튼
                exist_btnStop: false, // 정지버튼
                exist_btnMove: false, // 이동버튼(BWD/FWD)
                exist_barTime: false, // 시간막대
                exist_laeTime: false, // 시간레이블
                exist_volume: false, // 볼륨
                exist_repeat: false, // 구간반복
                exist_loop: false, // 반복버튼
                exist_playbackrate: false, // 재생속도

                exist_cover: false, // 커버(포스터&큰재생버튼)
                exist_fullscreen: false, // 전체화면
                exist_thumbnail: false, // 썸네일
                exist_follow: false, // 따라말하기

                exist_subtitle: false, // 자막
                exist_btnSubtitle: -1, // 자막 on/off 버튼(-1:없음, 0:초기설정off, 1:초기설정on)
                exist_btnLanguage: false, // 한영 버튼
                exist_btnLanKor: false, // 한 버튼
                exist_btnLanEng: false, // 영 버튼
                exist_btnFontsize: false, // 폰트사이즈 버튼

                exist_roleplay: false, // 롤플레이
                exist_onetouch: false, // 원터치
                exist_btnChange: "", // 미디어 교체 버튼
                exist_btnAnotherChange: "", // 상동 하나 더

                exist_notes: false, // 악보
                exist_btnListen: false, // 전체듣기/소절듣기 버튼
                exist_btnWayloop: false, // 웨이포인트 전용 루프 버튼
                exist_btnFocus: false, // 포커스 가시여부 조절 버튼
                exist_btnLyrics: false, // 가사 표시 여부 조절 버튼
                exist_btnTune: false, // 튠 조절 버튼
                exist_btnUpdown: false, // 상/하향음 버튼(단순 changeMedia 기능 버튼)
        }

        // obj
        var _received; // setData 를 통해 받은 정보 오브젝트

        // state
        var b_ignore_change_media = false; // changeMedia 방어(순간적으로 같이 들어오는 경우 버블링 등 오류로 판단하는 임시 조치).
        var id_ignore_change_media; // 위 관련 타임아웃





        ///// function

        return {

                ///// initialize

                // 초기화
                init: function (p_id) {
                        // 개발
                        if (dev_trace_detail == p_id) { console.log("# template.init(" + p_id + ")"); }

                        // 연결
                        _this = this;
                        _id = p_id;
                        _file = $(_ele).attr("data-media");
                        _tag = {};

                        // 준비
                        _module = {};
                        _custom = {};
                        _hierarchy = {};

                        // 커스터마이저 준비
                        _module.customizer = new mediaplayer_customizer(this);
                        _module.customizer.init();

                        // 컴포 설정
                        var ar_order = _module.customizer.setCompoByType();

                        // 코어 준비
                        _module.core = new mediaplayer_core(this);
                        _module.core.init();

                        // 부속
                        if (_option.exist_mpText == true) { _module.mpText = new mediaplayer_compo_mpText(this); _module.mpText.init(); }
                        if (_option.exist_btnPlay == true) { _module.btnPlay = new mediaplayer_compo_btnPlay(this); _module.btnPlay.init(); }
                        if (_option.exist_btnStop == true) { _module.btnStop = new mediaplayer_compo_btnStop(this); _module.btnStop.init(); }
                        if (_option.exist_btnMove == true) { _module.btnMove = new mediaplayer_compo_btnMove(this); _module.btnMove.init(); }
                        if (_option.exist_barTime == true) { _module.barTime = new mediaplayer_compo_barTime(this); _module.barTime.init(); }
                        if (_option.exist_laeTime == true) { _module.laeTime = new mediaplayer_compo_laeTime(this); _module.laeTime.init(); }
                        if (_option.exist_volume == true) { _module.volume = new mediaplayer_compo_volume(this); _module.volume.init(); }
                        if (_option.exist_repeat == true) { _module.repeat = new mediaplayer_compo_repeat(this); _module.repeat.init(); }
                        if (_option.exist_loop == true) { _module.loop = new mediaplayer_compo_loop(this); _module.loop.init(); }
                        if (_option.exist_playbackrate == true) { _module.playbackrate = new mediaplayer_compo_playbackrate(this); _module.playbackrate.init(); }

                        if (_option.exist_cover == true) { _module.cover = new mediaplayer_compo_cover(this); _module.cover.init(); }
                        if (_option.exist_fullscreen == true) { _module.fullscreen = new mediaplayer_compo_fullscreen(this); _module.fullscreen.init(); }
                        if (_option.exist_thumbnail == true) { if (_module.thumbnail == null) { _module.thumbnail = new mediaplayer_compo_thumbnail(this); _module.thumbnail.init(); } }
                        if (_option.exist_follow == true) { if (_module.follow == null) { _module.follow = new mediaplayer_compo_follow(this); _module.follow.init(); } }

                        if (_option.exist_subtitle == true) { _module.subtitle = new mediaplayer_compo_subtitle(this); _module.subtitle.init(); }
                        if (_option.exist_btnSubtitle != -1) { if (_module.subtitle == null) { _module.subtitle = new mediaplayer_compo_subtitle(this); _module.subtitle.init(); } }
                        if (_option.exist_btnLanguage == true) { if (_module.subtitle == null) { _module.subtitle = new mediaplayer_compo_subtitle(this); _module.subtitle.init(); } }
                        if (_option.exist_btnLanKor == true) { if (_module.subtitle == null) { _module.subtitle = new mediaplayer_compo_subtitle(this); _module.subtitle.init(); } }
                        if (_option.exist_btnLanEng == true) { if (_module.subtitle == null) { _module.subtitle = new mediaplayer_compo_subtitle(this); _module.subtitle.init(); } }
                        if (_option.exist_btnFontsize == true) { if (_module.subtitle == null) { _module.subtitle = new mediaplayer_compo_subtitle(this); _module.subtitle.init(); } }

                        if (_option.exist_roleplay == true) { if (_module.roleplay == null) { _module.roleplay = new mediaplayer_compo_roleplay(this); _module.roleplay.init(); } }
                        if (_option.exist_onetouch == true) { if (_module.onetouch == null) { _module.onetouch = new mediaplayer_compo_onetouch(this); _module.onetouch.init(); } }
                        if (_option.exist_btnChange != "") { if (_module.btnChange == null) { _module.btnChange = new mediaplayer_compo_btnChange(this); _module.btnChange.init(); } }
                        if (_option.exist_btnAnotherChange != "") { if (_module.btnAnotherChange == null) { _module.btnAnotherChange = new mediaplayer_compo_btnAnotherChange(this); _module.btnAnotherChange.init(); } }

                        if (_option.exist_notes == true) { if (_module.notes == null) { _module.notes = new mediaplayer_compo_notes(this); _module.notes.init(); } }
                        if (_option.exist_btnListen == true) { if (_module.notes == null) { _module.notes = new mediaplayer_compo_notes(this); _module.notes.init(); } }
                        if (_option.exist_btnWayloop == true) { if (_module.notes == null) { _module.notes = new mediaplayer_compo_notes(this); _module.notes.init(); } }
                        if (_option.exist_btnFocus == true) { if (_module.notes == null) { _module.notes = new mediaplayer_compo_notes(this); _module.notes.init(); } }
                        if (_option.exist_btnLyrics == true) { if (_module.notes == null) { _module.notes = new mediaplayer_compo_notes(this); _module.notes.init(); } }
                        if (_option.exist_btnTune == true) { if (_module.notes == null) { _module.notes = new mediaplayer_compo_notes(this); _module.notes.init(); } }
                        if (_option.exist_btnUpdown == true) { _module.btnUpdown = new mediaplayer_compo_btnUpdown(this); _module.btnUpdown.init(); }

                        // 버튼 순서 정렬
                        _this.setCompoUIOrder(ar_order);

                        // 시작 전 커스텀
                        _module.customizer.onBeforeStart();

                        // 코어 시작
                        _module.core.start(_option.preload, _option.reset_on_stop);

                        // 리셋
                        _this.reset();
                },

                // 추적
                trace: function () { console.log("mediaplayer : \n\t_id : " + _id + "\n\t_type : " + _type + "\n\t_file : " + _file + "\n\t_tag : " + _tag.data + " / " + _tag.subtitle + "\n\t_core state : " + _module.core.i_media_state()); },

                // 참조
                _type: function () { return _type; },
                _ele: function () { return _ele; },
                _id: function () { return _id; },
                _file: function (p_file) { if (p_file != null) { _file = p_file; } else { return _file; } },
                _tag: function (p_tag) { if (p_tag != null) { _tag = p_tag; } else { return _tag; } },
                _category: function (p_cat) { if (p_cat != null) { _category = p_cat; } else { return _category; } },
                _media: function (p_media) { if (p_media != null) { _media = p_media; } else { return _media } },
                _module: function () { return _module; },
                _custom: function () { return _custom; },
                _hierarchy: function () { return _hierarchy; },
                _option: function () { return _option; },
                _received: function () { return _received; },





                ///// event

                // onSvgClick
                onSvgClick: function () {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.onSvgClick()"); }

                        //
                        if (_module.notes != null) { _module.notes.onSvgClick(); }
                },

                // onPopupMediaPlayer
                onPopupToMediaPlayer: function () {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.onPopupToMediaPlayer()"); }

                        //
                        if (_module.roleplay != null) { _module.roleplay.onPopupToMediaPlayer(); }
                },





                ///// method

                // 제어
                reset: function (hard_reset) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.reset()"); }

                        //
                        if (hard_reset == true) { _module.core.castHardReset(); }
                        else { _module.core.castReset(); }
                },
                play: function () {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.play()"); }

                        //
                        _module.core.castPlay();
                },
                playPartial: function (start, end) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.playPartial(" + start + ", " + end + ")"); }

                        // 시작 지점 이동
                        _module.core.castMove(start);

                        // 재생
                        _module.core.castPlay();

                        // 종료 예약
                        if (end != null) { _module.core.setStopReserve(end); }
                },
                pause: function () {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.pause()"); }

                        //
                        _module.core.castPause();
                },
                stop: function () {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.stop()"); }

                        //
                        _module.core.castStop();
                },
                move: function (time) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.move(" + time + ")"); }

                        //
                        _module.core.castMove(time);
                },
                setNeutralize: function (what, b) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.setNeutralize(" + what + ", " + b + ")"); }

                        //
                        var str = what + "";
                        if (_module[str].setNeutralize != null) { _module[str].setNeutralize(b); }
                },
                changeMedia: function (media, data, subtitle, option) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.changeMedia(" + media + ", " + data + ", " + subtitle + ")"); }

                        // 방어
                        if (b_ignore_change_media == true) { return; }
                        b_ignore_change_media = true;
                        if (id_ignore_change_media != null) { clearTimeout(id_ignore_change_media); }
                        id_ignore_change_media = setTimeout(function () { b_ignore_change_media = false; }, 1);

                        // 동작
                        _module.core.castChangeMedia(media, data, subtitle);

                        // 옵션 처리
                        switch (option) {
                                case "hideTune": // 음정조정버튼 숨기기
                                        if (_module.notes != null) { _module.notes.i_current_tune(0); }
                                        if (_module.notes != null) { _module.notes.showCompo("tune", false); }
                                        break;
                                case "tuneUp": // 음정 조정
                                        if (_module.notes != null) { _module.notes.i_current_tune(1); }
                                        break;
                                case "tuneNormal":
                                        if (_module.notes != null) { _module.notes.i_current_tune(0); }
                                        break;
                                case "tuneDown":
                                        if (_module.notes != null) { _module.notes.i_current_tune(-1); }
                                        break;
                                case "updownUp":
                                        if (_module.btnUpdown != null) { _module.btnUpdown.i_current_updown(1); }
                                        break;
                                case "updownAll":
                                        if (_module.btnUpdown != null) { _module.btnUpdown.i_current_updown(0); }
                                        break;
                                case "updownDown":
                                        if (_module.btnUpdown != null) { _module.btnUpdown.i_current_updown(-1); }
                                        break;
                                case "btnChange0":
                                        if (_module.btnChange != null) { _module.btnChange.i_current_media(0); }
                                        break;
                                case "btnChange1":
                                        if (_module.btnChange != null) { _module.btnChange.i_current_media(1); }
                                        break;
                                case "btnAnotherChange0":
                                        if (_module.btnAnotherChange != null) { _module.btnAnotherChange.i_current_media(0); }
                                        break;
                                case "btnAnotherChange1":
                                        if (_module.btnAnotherChange != null) { _module.btnAnotherChange.i_current_media(1); }
                                        break;
                        }
                },
                customOrder: function (what, param) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.customOrder(" + what + ", " + param + ")"); }

                        //
                        _module.customizer.customOrder(what, param);
                },
                setClassToCompo: function (what, cl, addorremove) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.setClassToCompo(" + what + ", " + cl + ", " + addorremove + ")"); }

                        //
                        var ar = _this.getCompoUI(what);
                        for (var ii = 0 ; ii < ar.length ; ii++) { tools_setClass(ar[ii], cl, addorremove); }
                },
                setCssToCompo: function (what, param1, param2) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.setCssToCompo(" + what + ", " + param1 + ", " + param2 + ")"); }

                        //
                        var ar = _this.getCompoUI(what);
                        for (var ii = 0 ; ii < ar.length ; ii++) { $(ar[ii]).css(param1, param2); }
                },

                // 미디어 옮기기
                getMediaAndSleep: function () {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.getMediaAndSleep() try"); }

                        // 조건검사
                        if (_media == null) { return null; }
                        if (_module.core.i_media_state() < 0) { return null; }

                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.getMediaAndSleep()"); }

                        // 이벤트 연결 해제
                        _module.core.removeEL();

                        // 준비
                        var core = _module.core;
                        var rtn = {};
                        rtn.file = _file;
                        rtn.media = _media;
                        rtn.isplay = !_media.paused;
                        rtn.currentTime = _media.currentTime;
                        rtn.window = window;
                        rtn.client = _id;

                        // 모듈 상태 수집
                        rtn.core_state = _module.core.getState();
                        if (_module.volume != null) { rtn.volume = _module.volume.getState(); }
                        if (_module.repeat != null) { rtn.repeat = _module.repeat.getState(); }
                        if (_module.loop != null) { rtn.loop = _module.loop.getState(); }
                        if (_module.playbackrate != null) { rtn.playbackrate = _module.playbackrate.getState(); }
                        if (_module.cover != null) { rtn.cover = _module.cover.getState(); }
                        if (_module.subtitle != null) { rtn.subtitle = _module.subtitle.getState(); }
                        if (_module.roleplay != null) { rtn.roleplay = _module.roleplay.getState(); }
                        if (_module.thumbnail != null) { rtn.thumbnail = _module.thumbnail.getState(); }

                        // 초기화
                        core.castStop();
                        _media = null;
                        core.b_loaded_media(false);
                        core.setCoreState(0);

                        // 리셋
                        core.castReset(true);

                        // 반환
                        return rtn;
                },
                setMedia: function (obj) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.setMedia(" + obj + ")"); }

                        // 변수 저장
                        _received = obj;

                        // 준비
                        var core = _module.core;

                        // 기존 제거
                        core.clearMediaElement();

                        // 붙이기
                        $(_hierarchy.mediaContainer).append(obj.media);

                        // 재설정
                        _file = obj.file;
                        _media = obj.media;

                        // 이벤트 연결
                        core.addEL(_media);

                        // 코어 상태 적용
                        _module.core.setState(obj.core_state);
                        core.updateUI();
                        setTimeout(function () { core.updateUI(); }, 100);

                        // 비디오 사이즈
                        if (_category == "video") { tools_setVideoSize(_ele, _media); }

                        // 모듈 상태 적용
                        if (obj.volume != null && _module.volume != null) { _module.volume.setState(obj.volume); }
                        if (obj.repeat != null && _module.repeat != null) { _module.repeat.setState(obj.repeat); }
                        if (obj.loop != null && _module.loop != null) { _module.loop.setState(obj.loop); }
                        if (obj.playbackrate != null && _module.playbackrate != null) { _module.playbackrate.setState(obj.playbackrate); }
                        if (obj.cover != null && _module.cover != null) { _module.cover.setState(obj.cover); }
                        if (obj.subtitle != null && _module.subtitle != null) { _module.subtitle.setState(obj.subtitle); }
                        if (obj.roleplay != null && _module.roleplay != null) { _module.roleplay.setState(obj.roleplay); }
                        if (obj.thumbnail != null && _module.thumbnail != null) { _module.thumbnail.setState(obj.thumbnail); }

                        // 실행 중이었다면 실행
                        if (obj.currentTime != null && obj.currentTime != 0) { _module.core.castMove(obj.currentTime); }
                        if (obj.isplay == true) { _module.core.castPlay(); }
                },

                // UI 구성물 순서 설정
                setCompoUIOrder: function (ar) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.setCompoUIOrder(" + ar + ") try"); }

                        // 조건검사
                        if (ar == null || ar.length == 0) { return; }

                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.setCompoUIOrder(" + ar + ")"); }

                        // 준비
                        var ar_compo_ui = [];

                        // 검색
                        for (var ii = 0 ; ii < ar.length ; ii++) {
                                // 세부 검색
                                var detail = _this.getCompoUI(ar[ii]);

                                if (detail != null) {
                                        for (var jj = 0 ; jj < detail.length ; jj++) { ar_compo_ui.push(detail[jj]); }
                                }
                        }

                        // 정렬
                        for (var aa = 1 ; aa < ar_compo_ui.length ; aa++) { $(ar_compo_ui[aa - 1]).after(ar_compo_ui[aa]); }
                },
                getCompoUI: function (str) {
                        // 개발
                        if (dev_trace_detail == _id) { console.log("# template.getCompoUI(" + str + ")"); }

                        // 준비
                        var rtn = _module.customizer.getCompoUI(str);

                        // 조건검사
                        if (rtn == null) { console.error("MediaPlayer 오류 : " + _id + " 의 getCompoUI(" + str + ") 가 실패하였습니다."); }

                        // 반환
                        return rtn;
                },
        }
}