$(document).ready(function() {
	// 팝업 버튼
	var data = DATA.listInfo;

	$(".popBtncont").on("click", function() {
		var page = this.id;
		var pageinfo = this.id.split("_");
		var btnChap = pageinfo[0].substring(2);
		var pageNum = pageinfo[1];
		var i = 0, j = 0, k = 0, n = 0;
		var chapter, unit, sub, section, file, title;

		for(; i < data.length; i++){
			if (btnChap - 1 === i) {
				chapter = data[i];
				unit = chapter.unit;

				for (; j < unit.length; j++) {
					sub = unit[j].sub;
					for (; k < sub.length; k++){
						section = sub[k].section;
						n = 0;
						
						for (; n < section.length; n++) {
							file = section[n].file;
							title = section[n].title;
	
							if (file === page) {
								parent.viewer.syncPageViewGA("팝업+초등학교 체육5+" + pageNum + "_" + title + ".html");
								return;
							}
						}
					}
				}
			}
		}
	});
});
