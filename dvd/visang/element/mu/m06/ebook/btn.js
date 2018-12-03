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
	$(".btnPopup").on("click", function() {
		var targetUrl = $(this).data("src");
		var targetPopup = $(this).data("pop");
		var interVal;

		resetAllMediaPlayer();

		if (targetPopup) {
			// 팝업 열린채 팝업 띄움
			parent.viewer.link('popup', '../contents/' + targetUrl);

			interVal = setInterval(function() {
				var targetClass = targetPopup === "pop_script_01" ? ".btnScript" : ".btnWordPreview";
				var $targetBtn = $("#framePopupContents", window.parent.document).contents().find(targetClass);
				
				if ($targetBtn.length) {
					$targetBtn.trigger("click");
					clearInterval(interVal);
				}
			}, 1000);
		} else {
			parent.viewer.link('popup', '../contents/' + targetUrl);
		}
	});

});
