$(document).ready(function(){
    // page js
    // B번 문제 : img on 클래스 추가
    $(".btnCheck[data-target='Quiz_B']").on("click", function() {
        $(".active_area.n2").find(".img_box").addClass("on");
    });

    $(".btnReplay[data-target='Quiz_B']").on("click", function() {
        $(".active_area.n2").find(".img_box").removeClass("on");
    });
});
