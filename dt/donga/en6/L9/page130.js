$(document).ready(function(){
	// page js ↓ 
	// page js ↓ 
	// Step A,B : 부등호 표시
	var content = $(".active_area");
	var $btnCheck = $(".btnCheck");
	var $btnReplay = $(".btnReplay");
	var $quizMarking = $(".quizMarking[data-marking='Quiz_A']");
	
	var $circle = content.find(".circle");
	var circle, answer;

	// 부등호 입력 값 표시
	var InputUserChk = function() {
		setInterval(function() {
			content.find(".blind").each(function() {
				var $input = $(this);
				var onNum;
				if ($input.prop("checked")) {
					onNum = $input[0].className.replace("blind", "");
					$input.parent().prevAll(".circle").addClass(onNum);
				}
			});
		}, 100);
	}
	InputUserChk();
	setTimeout(clearInterval(InputUserChk), 3000);

	$circle.on("click", function() {
		var $this = $(this);

		if ($this.hasClass("on1")) {
			$this.removeClass("on1").addClass("on2");
			$this.parent().find(".on1").prop("checked", false);
			$this.parent().find(".on2").prop("checked", true);
		} else {
			$this.removeClass("on2").addClass("on1");
			$this.parent().find(".on2").prop("checked", false);
			$this.parent().find(".on1").prop("checked", true);
		}
	});

	$btnCheck.on("click", function() {
		var $this = $(this);
		var target = $this.data("target");
		var isCorrect = "correct", efCheck = true;
		
		if (target === "Quiz_A") {
			circle = $(".active_area.n1").find(".circle");
			answer = ["on1", "on1", "on2"];
			
			circle.each(function (i) {
				var el = $(this);
	
				if (!el.hasClass(answer[i])) {
					el.addClass("answer");
					isCorrect = "wrong";
					efCheck = false;
				}
			});

			$quizMarking.addClass(isCorrect);
			playFeedSound(efCheck);
		} else {
			circle = $(".active_area.n2").find(".circle");
			answer = ["on1", "on2", "on1", "on2", "on2", "on1"];

			circle.removeClass("on1 on2").addClass("answer");
		}
	});

	$btnReplay.on("click", function() {
		var $this = $(this);
		var target = $this.data("target");

		if (target === "Quiz_A") {
			circle = $(".active_area.n1").find(".circle");
		} else {
			circle = $(".active_area.n2").find(".circle");
			$(".active_area.n2").find("input").prop("checked", false);
			// $(".active_area.n2").find("input").removeAttr("class");
		}
		circle.removeClass("on1 on2 answer");
	});

	//정오답 효과음 플레이
	function playFeedSound(efCheck) {
		var clickAudio;

		if (efCheck) clickAudio = document.getElementsByClassName('feedOk')[0];
		else clickAudio = document.getElementsByClassName('feedNo')[0];

		if (!clickAudio.ended) {
			clickAudio.currentTime = 0;
		}
		clickAudio.play();
	}
});