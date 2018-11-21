$(document).ready(function () {
    // page js ↓ 
    // Read and Do
    $("[ data-qid='Quiz_A']").find(".essayAnswer").on("click", function() {
        var answer = $(this).text();
        $("[data-icon='q_num_" + answer + "']").parent().click();
    });
});