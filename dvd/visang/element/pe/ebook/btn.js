$(document).ready(function() {
	// 팝업 띄우기 버튼
	$(".popBtncont").on("click", function() {
		var targetUrl = $(this).data("src");
		var targetPopup = $(this).data("pop");
		var pageinfo = this.id.split("_");
		var page = pageinfo[1];

		parent.viewer.syncPageViewGA("팝업+초등학교 체육5+" + page + "_" + targetPopup + ".html");
		parent.viewer.link('popup', '../../data/' + targetUrl);
	});
});
