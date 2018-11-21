$(document).ready(function(){
    // B
    var $btnColor = $(".line_color");

    global_strokeStyle = "#02b4f5";
    $btnColor.on("click", function() {
        var $this = $(this);
        if ($this.hasClass("c1")) {
            global_strokeStyle = "#02b4f5";
        } else {
            global_strokeStyle = "#2ed925";
        }
        $btnColor.removeClass("on");
        $this.addClass("on");
    });
});