$(document).ready(function() {
	$(".btnCheck .overBtn").on("click", function() {
		var targetDiv = $(this).parent().find(".overlayPop");

		if (targetDiv.hasClass("show")) {
			targetDiv.removeClass("show");
		} else {
			targetDiv.addClass("show");
		}
	});
	
	$(".btnMp3 .overBtn").on("click", function() {
		var targetDiv = $(this).parent().find(".overlayPop");

		if (targetDiv.hasClass("show")) {
			targetDiv.removeClass("show");
		} else {
			targetDiv.addClass("show");
		}
	});


	// 미디어 플레이어 닫기 버튼
	$(".mp3_close_btn").on("click", function() {
		var $this = $(this);
		var mediaId = $this.prev().attr("id");

		stopMediaPlayer(mediaId);
		$this.parents(".overlayPop").removeClass("show");
	});

	// 팝업 띄우기 버튼
	$(".popupBtn").on("click", function() {
		var targetUrl = $(this).data("src");
		var targetPopup = $(this).data("pop");
		var page = pageinfo[1];

		parent.viewer.syncPageViewGA("팝업+초등학교 음악5+" + page + "_" + targetPopup + ".html");
		parent.viewer.link('popup', '../../data/' + targetUrl);
	});
});
