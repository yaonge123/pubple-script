$(document).ready(function() {
	// 팝업 띄우기 버튼
	$(".btnPopup").on("click", function() {
		var targetUrl = $(this).data("src");
		var targetPopup = $(this).data("pop");
		var pageinfo = this.id.split("_");
		var page = parseInt(pageinfo[1]);
		var chapter = parseInt(pageinfo[0].replace(/[a-z]/gi, ""));
		var targetClass;
		var section;

		console.log("팝업+초등학교 실과5+" + page + "p+Lesson " + chapter + "+" + section);
		$.ajax({
			url: "./toc.ncx",
			dataType: "xml",
			success: function(data) {
				section = $(data).find("content[page='" + page + "']").prev().children().text();
				//parent.viewer.syncPageViewGA("팝업+초등학교 실과5+" + page + "p+Lesson " + chapter + "+" + section);
			},
			error: function(xhr) {
				console.log("error! " + xhr.status + xhr.responseText);
			}
		})

		resetAllMediaPlayer();

		if (targetPopup) {
			// 팝업 열린채 팝업 띄움
			targetClass = targetPopup === "pop_script_01" ? "btnScript" : "btnWordPreview";
			parent.viewer.link('popup', '../data/' + targetUrl + '?' + targetClass);
		} else {
			parent.viewer.link('popup', '../data/' + targetUrl);
		}
	});

});
