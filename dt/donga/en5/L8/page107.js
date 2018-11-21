$(document).ready(function(){
	// page js ↓

    //181112 추가
    $(document).on("click", ".btnRoleplayExternal", jsStopEvent);

    function jsStopEvent() {
        $(".btnStop").trigger("click");
    }
});