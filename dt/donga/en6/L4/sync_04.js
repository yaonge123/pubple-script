$(document).ready(function(){
	// sync data ↓
	mp_data = {  // MP3 sync
		////////////
		// P - 50
		data_50_1: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[8.2, 10.8, 1],
				[11.1, 12.6, 2]
			],
			dialogue: [
				["How often do you play computer games?", "너는 얼마나 자주 컴퓨터 게임을 하니?"],
				["Four times a week.", "일주일에 네 번."]
			],
		},
		data_50_2: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[4.5, 6.6, 1],
				[7.5, 9.4, 2],
				[10.5, 12.5, 1]
			],
			dialogue: [
				["How often do you eat fast food?", "너는 얼마나 자주 패스트푸드를 먹니?"],
				["Three times a week.", "일주일에 세 번."],
				["You should eat more healthy food.", "너는 더 건강에 좋은 음식을 먹어야 해."]
			],
		},
		data_50_o_9_a: { // 파일명 - 학습목표(1)
			subtitle: [
				[0.5,	3.2],
				[4.4,	5.8]
			]
		},
		data_50_o_11: { // 파일명 - 학습목표(2)
			subtitle: [
				[0.1,	3.5]
			]
		},
		data_p050_01: { // 파일명 - Listen and Say(1)
			subtitle: [

			]
		},
		data_50_s_32_a: { // 파일명 - Listen and Say(1)
			subtitle: [
				[0.4,	3.2],
				[3.6,	5.1]
			]
		},
		data_p050_02: { // 파일명 - Listen and Say(2)
			subtitle: [

			]
		},
		data_50_s_34_a: { // 파일명 - Listen and Say(2)
			subtitle: [
				[0.4,	2.4],
				[3.0,	4.9],
				[5.6,	7.4]
			]
		},

		////////////
		// P - 51
		data_51_1: { // 파일명 - Look and Listen
			subtitle: [
				[3.0, 5.7, 1],
				[5.9, 8.2, 1],
				[8.5, 13.5, 2],
				[15.4, 17.6, 1],
				[29.7, 32.3, 2],
				[32.6, 38.5, 1],
				[38.7, 42.5, 2],
				[46.6, 48.8, 3],
				[48.9, 52.6, 1],
				[52.7, 54.5, 2],
				[54.6, 57.5, 2],
				[64.0, 66.5, 2],
				[67.1, 70.3, 1],
				[70.4, 73.1, 2],
				[74.6, 76.3, 1],
				[76.4, 79.2, 2],
				[79.3, 80.3, 2]
			],
			dialogue: [
				["Steak! My favorite!", "스테이크! 내가 가장 좋아하는 음식이네!"],
				["I’m so hungry.", "난 정말 배고파."],
				["No, Justin! Go and wash your hands first. They’re dirty.", "안 돼, Justin! 가서 손 먼저 씻고 와. 손이 더럽잖아."],
				["Oh, okay.", "오, 알았어."],
				["How often do you wash your hands?", "오빠는 얼마나 자주 손을 씻어?"],
				["Well... I’m not sure. Twice a day?", "글쎄∙∙∙∙∙∙ 잘 모르겠어. 하루에 두 번?"],
				["Oh, no! You should wash your hands more often.", "안 돼! 손을 더 자주 씻어야 해."],
				["Do you want some salad?", "샐러드 좀 먹을래?"],
				["No, thanks. I don’t like vegetables.", "괜찮아요. 저는 채소를 좋아하지 않아요."],
				["You should eat vegetables.", "오빠는 채소를 먹어야 해."],
				["They’re good for your health. Have some!", "채소는 건강에 좋아. 좀 먹어 봐!"],
				["Did you brush your teeth after dinner?", "저녁 먹고 이 닦았니?"],
				["No, I didn’t. I was busy.", "아니. 나 바빴어."],
				["How often do you brush your teeth?", "오빠는 이를 얼마나 자주 닦니?"],
				["Once a day.", "하루에 한 번."],
				["You should brush your teeth three times a day.", "이를 하루에 세 번 닦아야 해."],
				["Let’s go.", "가자."]
			]
		},
		data_51_s_1_a: { // 파일명 - Look and Listen
			subtitle: [
				[0.3,	5.4],
				[6.1,	11.6],
				[12.1,	14.8],
				[15.0,	18.0],
				[18.5,	23.8],
				[24.1,	28.2],
				[28.6,	30.9],
				[31.1,	35.2],
				[36.0,	40.5],
				[41.0,	44.0],
				[44.3,	47.6],
				[48.3,	50.9],
				[51.5,	53.2],
				[53.5,	57.6]
			]
		},

		////////////
		// P - 52
		data_52_1: { // 파일명 - Look and Say
			subtitle: [
					[8.1, 13.0, 1],
					[13.7, 16.7, 2],
					[17.3, 20.0, 1],
					[22.7, 25.7, 3],
					[33.5, 36.1, 1],
					[40.2, 42.0, 3],
					[42.4, 46.6, 1],
					[48.5, 51.7, 3],
					[69.7, 73.1, 4],
					[73.3, 74.9, 3],
					[75.6, 79.6, 4],
					[79.8, 81.5, 3],
					[86.4, 88.0, 4],
					[94.5, 96.7, 1],
					[97.0, 98.9, 5],
					[106.8, 108.7, 1]
			],
			dialogue: [
				["You’re great, Harry! How often do you exercise?", "대단하다, Harry! 너는 얼마나 자주 운동하니?"],
				["Five times a week. How about you, Tao?", "일주일에 다섯 번. Tao, 너는?"],
				["Umm... once a week.", "음∙∙∙∙∙∙ 일주일에 한 번."],
				["You should exercise more often.", "너는 운동을 더 자주 해야 해."],
				["Whew... I’m hungry.", "휴∙∙∙∙∙∙ 난 배고파."],
				["Do you want some fruit?", "과일 좀 먹을래?"],
				["No, thanks. I want a hamburger.", "고맙지만 괜찮아. 나는 햄버거를 먹고 싶어."],
				["Tao! You should eat more healthy food.", "Tao! 너는 더 건강에 좋은 음식을 먹어야 해."],
				["How often do you have breakfast?", "얼마나 자주 아침 식사를 하나요?"],
				["Every day.", "매일요."],
				["How often do you play computer games?", "얼마나 자주 컴퓨터 게임을 하나요?"],
				["Twice a week.", "일주일에 두 번요."],
				["You’re healthy!", "건강하군요!"],
				["Mom, where’s my jump rope?", "엄마, 내 줄넘기 어디에 있어요?"],
				["It’s in the box.", "그것은 상자 안에 있단다."],
				["I want to be healthy!", "나도 건강해지고 싶어!"]
			]
		},
		data_52_s_1_a: { // 파일명 - Look and Say
			subtitle: [
				[0.0,	4.5],
				[5.0,	8.0],
				[8.8,	11.3],
				[12.0,	14.7],
				[15.6,	18.0],
				[18.5,	20.5],
				[21.2,	24.6],
				[25.3,	28.5],
				[29.4,	32.7],
				[33.2,	34.7],
				[35.5,	39.2],
				[40.0,	41.5],
				[42.2,	43.6],
				[44.4,	46.7],
				[47.5,	49.1],
				[49.7,	51.3]
			]
		},
		data_52_2: { // 파일명 - Hello World
			subtitle: [
					[1.4, 6.1, 1],
					[9.3, 18.0, 1],
					[18.7, 23.5, 1],
					[24.4, 30.0, 1],
					[30.6, 34.1, 1],
					[37.7, 43.3, 1],
					[44.1, 51.1, 1],
					[52.0, 58.1, 1],
					[59.1, 67.2, 1],
					[71.2, 75.3, 1],
					[76.0, 83.1, 1],
					[83.5, 89.5, 1],
					[90.2, 100.3, 1],
					[104.3, 110.0, 1],
					[110.6, 121.6, 1],
					[122.4, 133.7, 1],
					[136.0, 140.1, 1],
					[140.5, 143.2, 1]
			],
			dialogue: [
				["", "세계 여러 나라의 건강을 위한 생활 습관"],
				["", "이야기에서 Harry는 자주 운동하는 습관, 하나는 매일 아침을 먹는 습관이 있었지요?"],
				["", "건강한 생활을 하려면 좋은 습관을 갖는 것이 중요해요."],
				["", "세계 여러 나라에는 그 나라만의 건강에 좋은 습관이 있답니다."],
				["", "어떤 건강 습관이 있는지 알아볼까요?"],
				["", "네덜란드는 높은 자전거 이용 인구로 잘 알려져 있지요."],
				["", "자전거 수가 인구 수보다 많을 만큼 네덜란드 사람들은 자전거를 많이 탄답니다."],
				["", "평소 이동할 때에 자전거를 자주 타고, 자전거 여행도 즐겨 하지요."],
				["", "자전거 타기는 건강에 효과적인 운동이면서 친환경적이기도 한 매우 좋은 습관이랍니다."],
				["", "핀란드 사람들은 사우나를 자주 하는 습관이 있어요."],
				["", "핀란드 사람들은 약 2000년 전부터 추위를 이겨 내려고 사우나를 이용해 왔답니다."],
				["", "지금도 일주일에 2-3번은 사우나를 할 만큼 사우나를 즐기지요."],
				["", "사우나는 신진대사와 혈액 순환을 돕고 땀으로 노폐물을 몸에서 내보내도록 해, 건강에 매우 좋답니다.", -10],
				["", "중국 사람들은 전통적으로 차를 일상에서 마시는 습관이 있답니다."],
				["", "뜨거운 물을 담은 보온병이나 찻병을 휴대하며 차를 언제든 마실 수 있도록 준비할 만큼, 차를 즐기고 항상 가까이 하지요.", -10],
				["", "기름기가 많은 중국 음식을 차가 중화하는 역할을 하는데, 이는 중국에서 사회적 비만 현상이 두드러지지 않는 이유 중 하나랍니다.", -10],
				["", "여러분은 다른 나라의 건강 습관을 알고 있나요?"],
				["", "인터넷에서 더 찾아보세요."]
			]
		},

		////////////
		// P - 53
		data_53_s_1_f: {
			subtitle: [
				[0.4,	3.4],
				[4.5,	5.7],
				[6.9,	9.9],
				[11.0,	14.2],
				[15.1,	16.8],
				[17.7,	21.0],
				[22.0,	25.2],
				[26.2,	28.0],
				[28.5,	31.4],
				[32.2,	34.2],
				[34.8,	38.3],
				[39.0,	40.5],
				[41.5,	45.0],
				[45.7,	47.1]
			]
		},

		////////////
		// P - 54
		data_54_1: {
			subtitle: [
				[8.6, 12.1, 1],
				[12.5, 13.6, 2],
				[14.6, 15.6, 2],
				[16.6, 20.4, 1],
				[20.8, 23.8, 1],
				[24.8, 28.5, 3],
				[29.0, 31.8, 3],
				[34.0, 36.0, 1],
				[45.2, 48.3, 1],
				[49.1, 50.4, 4],
				[51.1, 52.5, 4],
				[53.2, 57.0, 1],
				[57.4, 61.0, 1],
				[61.4, 65.0, 5],
				[65.5, 68.6, 5],
				[70.6, 72.5, 1]
			],
			dialogue: [
				["How often do you eat vegetables?", "너는 얼마나 자주 채소를 먹니?"],
				["Twice a week.", "일주일에 두 번요."],
				["Twice a week.", "일주일에 두 번요."],
				["You should eat vegetables more often.", "너는 채소를 더 자주 먹어야 해."],
				["How often do you brush your teeth?", "너는 얼마나 자주 이를 닦니?"],
				["I brush my teeth three times a day.", "저는 하루에 세 번 이를 닦아요."],
				["I exercise every day.", "저는 매일 운동을 해요."],
				["You’re healthy!", "너는 건강하구나!"],
				["How often do you wash your hands?", "얼마나 자주 손을 씻니?"],
				["Twice a day.", "하루에 두 번요."],
				["Twice a day.", "하루에 두 번요."],
				["You should wash your hands more often.", "너는 손을 더 자주 씻어야 해."],
				["How often do you eat fast food?", "얼마나 자주 패스트푸드를 먹니?"],
				["I eat fast food once a week.", "저는 일주일에 한 번 패스트푸드를 먹어요."],
				["I exercise every day.", "저는 매일 운동을 해요."],
				["You’re healthy!", "너는 건강하구나!"],
			]
		},
		data_54_1_follow: { // 따라하기파일적용 테스트 용
			subtitle: [
				[8.4, 15.7, 1],
				[16.1, 19.0, 2],
				[19.8, 23.1, 2],
				[24.0, 31.0, 1],
				[31.3, 36.6, 1],
				[38.0, 45.6, 3],
				[45.9, 51.4, 3],
				[53.6, 57.8, 1],
				[66.8, 72.9, 1],
				[73.9, 76.2, 4],
				[77.0, 79.7, 4],
				[80.4, 87.8, 1],
				[88.0, 95.8, 1],
				[96.2, 103.5, 5],
				[103.9, 110.1, 5],
				[112.3, 115.7, 1]
			],
			dialogue: [
				["How often do you eat vegetables?", "너는 얼마나 자주 채소를 먹니?"],
				["Twice a week.", "일주일에 두 번요."],
				["Twice a week.", "일주일에 두 번요."],
				["You should eat vegetables more often.", "너는 채소를 더 자주 먹어야 해."],
				["How often do you brush your teeth?", "너는 얼마나 자주 이를 닦니?"],
				["I brush my teeth three times a day.", "저는 하루에 세 번 이를 닦아요."],
				["I exercise every day.", "저는 매일 운동을 해요."],
				["You’re healthy!", "너는 건강하구나!"],
				["How often do you wash your hands?", "얼마나 자주 손을 씻니?"],
				["Twice a day.", "하루에 두 번요."],
				["Twice a day.", "하루에 두 번요."],
				["You should wash your hands more often.", "너는 손을 더 자주 씻어야 해."],
				["How often do you eat fast food?", "얼마나 자주 패스트푸드를 먹니?"],
				["I eat fast food once a week.", "저는 일주일에 한 번 패스트푸드를 먹어요."],
				["I exercise every day.", "저는 매일 운동을 해요."],
				["You’re healthy!", "너는 건강하구나!"],
			]
		},
		data_54_s_1_a: { // 파일명 - Sing and Read
			subtitle: [
				[0.5,	3.8],
				[4.6,	8.1],
				[9.0,	12.2],
				[13.2,	16.0],
				[16.8,	20.5],
				[21.5,	24.0],
				[24.5,	26.5],
				[27.3,	30.5],
				[31.3,	34.7],
				[35.7,	39.0],
				[39.8,	43.0],
				[43.9,	47.0],
				[47.7,	50.8],
				[51.0,	52.8]
			]
		},
		data_54_s_2_a: { // 파일명 - Sing and Read
			subtitle: [
				[0.5,	3.8],
				[4.6,	8.1],
				[9.0,	12.2],
				[13.2,	16.0],
				[16.8,	20.5],
				[21.5,	24.0],
				[24.5,	26.5],
				[27.5,	29.5],
				[30.0,	31.5],
				[32.0,	34.0],
				[34.2,	36.0]
			]
		},
		data_54_o_18_a: { // 파일명 - Read and Do
			subtitle: [
				[0.2,	3.6],
				[4.4,	8.0],
				[8.7,	11.6],
				[12.5,	14.1],
				[15.3,	18.4],
				[19.2,	20.5]
			]
		},

		////////////
		// P - 55
		data_55_o_2_a: { // 파일명 - Write It
			subtitle: [
				[0.4,	4.0],
				[4.3,	8.4],
				[8.5,	12.0]
			]
		},
		data_55_o_6_a: { // 파일명 - Write It
			subtitle: [
				[0.4,	3.7],
				[4.7,	6.7],
				[7.4,	10.9],
				[11.7,	13.5],
				[14.1,	17.4],
				[18.1,	22.0]
			]
		},

		////////////
		// P - 56
		data_56_s_15_f: { // 파일명 - Let’s Read(전체 듣기)
			subtitle: [
				[0.4,	1.9],
				[2.5,	5.0],
				[5.7,	7.8],
				[8.5,	10.4],
				[11.0,	12.6],
				[13.1,	15.6],
				[16.2,	18.3],
				[19.0,	20.4],
				[21.0,	22.6],
				[23.3,	26.4],
				[26.8,	28.2],
				[28.7,	31.7],
				[32.3,	36.4],
				[37.0,	38.8],
				[39.3,	42.8],
				[43.6,	46.8],
				[47.6,	49.6],
				[50.2,	54.1],
				[54.8,	57.6],
				[58.2,	60.3],
				[60.8,	64.5]
			]
		},
		data_56_o_2_a: { // 파일명 -
			subtitle: [
				[0.4,	1.6],
				[2.5,	4.8],
				[5.7,	7.6],
				[8.5,	10.2],
				[11.0,	12.1],
				[13.1,	15.3],
				[16.2,	18.1],
				[19.0,	20.2],
				[21.0,	22.3],
				[23.3,	26.0],
				[26.8,	28.0],
				[28.7,	31.5],
				[32.3,	36.1],
				[37.0,	38.6],
				[39.3,	42.6]
			]
		},
		data_56_o_18_a: { // 파일명 -
			subtitle: [
				[0.5,	2.5],
				[3.5,	7.5],
				[8.2,	11.5],
				[12.3,	15.6]
			]
		},

		////////////
		// P - 57
		data_57_o_1_a: { // 파일명 -
			subtitle: [
				[0.5,	3.5],
				[4.5,	6.5],
				[7.2,	11.0],
				[11.7,	14.5],
				[15.2,	17.0],
				[17.8,	21.0]
			]
		},
		data_57_s_1_a: { // 파일명 -
			subtitle: [
				[0.0,	2.0],
				[2.1,	6.5],
				[6.6,	9.2],
				[9.3,	12.8],
				[13.0,	15.7]
			]
		},
		data_57_o_7_a: { // 파일명 -
			subtitle: [
				[1.0, 2.7, 1],
				[3.3, 6.7, 1],
				[7.2, 10.2, 1],
				[10.7, 14.3, 1],
				[14.6, 16.6, 2],
				[17.2, 21.5, 2],
				[22.0, 24.6, 2],
				[25.0, 28.4, 2],
				[29.0, 32.1, 2]
			]
		},

		////////////
		// P - 58
		data_58_o_2_a: { // Step 1(Are you healthy?)
			subtitle: [
				[0.1,	1.5],
				[1.9,	6.4],
				[6.9,	10.8],
				[11.2,	14.5],
				[15.1,	18.7],
				[19.3,	22.0],
				[22.5,	26.6],
				[27.0,	30.4],
				[30.7,	34.1],
				[34.6,	38.2],
				[38.8,	41.3],
				[41.6,	46.3],
				[46.6,	50.0],
				[50.4,	54.2],
				[54.6,	58.5],
				[58.9,	62.8],
				[63.2,	67.7],
				[68.0,	70.5],
				[71.0,	73.6],
				[74.0,	76.9],
				[77.2,	80.1]
			]
		},
		data_58_o_23_a: { // Step 2
			subtitle: [
				[0.4,	3.2],
				[4.2,	5.4],
				[6.4,	9.2]
			]
		},

		////////////
		// P - 59
		data_59_o_1_a: { // 파일명 - Step 3
			subtitle: [
				[0.2,	3.2],
				[4.0,	7.2],
				[7.8,	11.8],
				[12.7,	16.5],
				[17.0,	21.3],
				[22.1,	26.2],
				[27.0,	30.5],
				[31.2,	35.3],
				[36.0,	40.5],
				[41.0,	45.7],
				[46.5,	51.0],
				[51.8,	56.5]
			]
		},
		data_59_o_13_a: { // 파일명 - Step 4
			subtitle: [
				[0.3,	4.2],
				[5.3,	8.6],
				[9.3,	14.0],
				[14.4,	19.2],
				[20.0,	24.5],
				[25.2,	28.3]
			]
		},

		////////////
		// P - 60
		data_60_o_2_f: { // 파일명 - Review(A)
			subtitle: [
				[0.4,	3.3],
				[4.3,	6.1],
				[7.2,	10.2],
				[11.3,	14.5],
				[15.6,	17.2],
				[18.2,	20.7],
				[22.0,	24.6],
				[25.6,	27.2],
				[28.1,	31.8]
			]
		},
		data_60_o_11_a: { // 파일명 - Review(B)
			subtitle: [
				[0.5,	3.7],
				[4.5,	10.5],
				[11.5,	15.5],
				[16.1,	18.6],
				[19.6,	20.8]
			]
		},
		data_60_o_16_1: { // 파일명 - Review(B)
			subtitle: [
				[0.3, 4.2],
				[4.8, 8.1]
			]
		},
		data_60_o_18_a: { // 파일명 - Review(C)
			subtitle: [
				[0.2,	2.7],
				[3.5,	7.1],
				[7.6,	11.3],
				[12.0,	15.0],
				[16.2,	18.7],
				[19.5,	22.0]
			]
		},
		data_61_o_1_a: { // 파일명 - Review(D)
			subtitle: [
				[0.2,	3.6],
				[4.2,	6.2],
				[7.0,	10.0],
				[10.7,	13.7],
				[14.5,	15.6],
				[16.7,	19.5]
			]
		},
		data_61_o_7_f: {
			subtitle: [
				[0.4,	3.1],
				[4.0,	5.6],
				[6.5,	9.2],
				[10.0,	11.5],
				[12.2,	16.0]
			]
		},
		data_61_o_14_a: {
			subtitle: [
				[0.3, 3.9, 1],
				[4.7, 7.9, 2]
			]
		},

	}
});