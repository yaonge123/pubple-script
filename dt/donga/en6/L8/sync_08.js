$(document).ready(function(){
	// sync data ↓
	// sync data ↓
	mp_data = {  // MP3 sync
		////////////
		// P - 22
		data_p106_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[4.2, 5.7, 1],
				[7.1, 9.6, 2]
			],
			dialogue: [
				["May I take your order?", "주문하시겠어요?"],
				["Yes, please. I’d like a spaghetti.", "네. 저는 스파게티를 주세요."]
			],
		},
		data_p106_02: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[9.6, 11.0, 1],
				[11.6, 14.6, 2]
			],
			dialogue: [
				["How’s your curry?", "네 카레는 어떠니?"],
				["It’s hot, but I like it.", "맵지만 전 맛있어요."],
			],
		},
		data_106_s_29_a: { // 파일명 - Listen and Say(1)
			subtitle: [
				[0.4, 1.8, 1],
				[2.5, 4.9, 2]
			],
		},
		data_106_s_31_a: { // 파일명 - Listen and Say(2)
			subtitle: [
				[0.5, 1.4, 1],
				[2.3, 4.8, 2]
			],
		},
		data_106_o_12_a: { // 파일명 - 학습목표(1)
			subtitle: [
				[0.6, 2.6, 1],
				[3.8, 6.4, 2]
			],
		},
		data_106_o_14: { // 파일명 - 학습목표(1)
			subtitle: [
				[0.3, 2.1, 1]
			],
		},


		////////////
		// P - 107
		data_p107_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[3.5, 4.5, 1],
				[4.7, 8.4, 1],
				[8.8, 11.5, 2],
				[13.2, 16.0, 1],
				[20.3, 23.2, 3],
				[30.1, 32.7, 3],
				[35.2, 37.3, 4],
				[37.4, 40.6, 3],
				[41.1, 42.1, "5_6"],
				[42.7, 45.7, 1],
				[46.2, 49.0, 1],
				[49.4, 52.1, 4],
				[59.8, 64.8, 5],
				[65.1, 66.0, 3],
				[70.3, 74.2, 6],
				[77.4, 79.2, 1]
			],
			dialogue: [
				["Excuse me.", "실례합니다."],
				["A strawberry ice cream and an apple juice, please.", "딸기 아이스크림과 사과 주스를 주세요."],
				["Okay. Here you go.", "네. 여기 있어요."],
				["Mmm... this is sweet.", "음∙∙∙∙∙∙ 이건 달아."],
				["We should get off here. Let’s go.", "우리는 여기서 내려야 한단다. 가자."],
				["It’s time for lunch. Come here.", "점심 먹을 시간이구나. 이리 오렴."],
				["May I take your order?", "주문하시겠어요?"],
				["Yes, please. I’d like noodles.", "네. 저는 국수를 주세요."],
				["Me, too.", "저도요."],
				["Wow, this is beautiful.", "와, 이것은 아름다워. "],
				["I’d like a flower <i>bibimbap</i>, please.", "저는 꽃 비빔밥을 주세요."],
				["Good. It’s our special.", "알겠어요. 그것은 저희 특별 메뉴예요."],
				["This is salty. Mom, can I have some water?", "이것은 짜요. 엄마, 물 좀 마셔도 될까요?"],
				["Sure.", "그럼."],
				["This is good. How’s your flower <i>bibimbap</i>?", "이거 맛있다. 네 꽃 비빔밥은 어때?"],
				["It’s delicious.", "맛있어."]
			],
		},
		data_107_s_1_a: { // 파일명 - Look and Listen(1)
			subtitle: [
				[0.5, 5.5, 1],
				[6.0, 8.5, 2],
				[9.5, 12.5, 1],
				[13.5, 16.2, 3],
				[16.5, 19.1, 3],
				[20.0, 21.6, 4],
				[22.5, 25.3, 3],
				[25.5, 27.0, "5_6"],
				[27.5, 33.5, 1],
				[34.5, 37.1, 4],
				[38.0, 42.5, 6],
				[42.8, 43.6, 3],
				[43.8, 47.6, 5],
				[48.0, 50.0, 1]
			],
		},

		////////////
		// P - 108
		data_p108_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[8.3, 10.4, 1],
				[11.3, 15.2, 2],
				[24.5, 27.2, 3],
				[27.5, 30.7, 1],
				[31.4, 32.9, 3],
				[33.5, 35.2, 1],
				[37.6, 39.0, 3],
				[39.7, 40.6, 1],
				[42.5, 46.2, 1],
				[48.7, 52.0, 4],
				[52.7, 56.0, 5],
				[56.7, 61.2, 2],
				[61.5, 62.7, 4],
				[63.2, 65.1, 2],
				[75.1, 79.3, 5],
				[83.7, 86.4, 1]
			],
			dialogue: [
				["Mom, I’m hungry.", "엄마, 저는 배고파요."],
				["Okay. Let’s go there and get some food.", "알았어. 저기에 가서 음식을 좀 먹자."],
				["Hello. May I take your order?", "안녕하세요. 주문하시겠어요?"],
				["Yes, I’d like a kebab, please.", "네. 저는 케밥을 주세요."],
				["Any drinks?", "음료는요?"],
				["A lemonade, please.", "레모네이드를 주세요."],
				["Here you go.", "여기 있어요."],
				["Thank you.", "고맙습니다. "],
				["Oh, this lemonade is really sour!", "오, 이 레모네이드는 정말 시네요!"],
				["Good evening. May I take your order?", "안녕하세요. 주문하시겠어요?"],
				["Yes, please. I’d like a steak.", "네. 저는 스테이크를 주세요."],
				["I’d like a chicken salad and an orange juice, please.", "저는 치킨 샐러드와 오렌지 주스를 주세요."],
				["Is that all?", "그것이 전부인가요?"],
				["Yes, that’s all.", "네, 그래요."],
				["Mmm... this is delicious. How’s your kebab?", "음∙∙∙∙∙∙ 이건 맛있구나. 네 케밥은 어떠니?"],
				["It’s hot, but I like it!", "그것은 맵지만 전 맛있어요!"]
			],
		},
		data_p108_02: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[1.6, 5.2, 1],
				[8.5, 14.1, 1],
				[15.0, 19.1, 1],
				[19.6, 26.3, 1],
				[27.1, 30.4, 1],
				[34.5, 39.2, 1],
				[40.0, 49.4, 1],
				[50.3, 64.1, 1],
				[69.4, 74.1, 1],
				[74.7, 85.7, 1],
				[86.7, 94.2, 1],
				[95.0, 96.3, 1],
				[100.2, 104.7, 1],
				[105.4, 118.7, 1],
				[121.1, 126.1, 1],
				[126.5, 129.1, 1]
			],
			dialogue: [
				["", "세계 여러 나라의 길거리 음식"],
				["", "이야기에서 Tao는 야시장에서 케밥을 맛있게 먹었지요?"],
				["", "케밥은 터키의 유명한 길거리 음식이랍니다."],
				["", "이처럼 세계에는 각 나라별로 주로 즐겨 먹는 길거리 음식이 있지요. "],
				["", "어떤 길거리 음식이 있는지 알아볼까요?"],
				["", "케밥은 터키에서 즐겨 먹는 길거리 음식이랍니다."],
				["", "‘구이’라는 뜻인 케밥은 과거 유목민들이 먹던 음식으로, 종류가 300가지에 이를 만큼 다양하지요.", -10],
				["", "그 중 양고기, 닭고기 등을 쇠꼬챙이에 꿰어 빙빙 돌리며 구운 다음, 잘게 썰어서 채소, 빵 등과 함께 먹는 도너 케밥이 유명하답니다. ", -10],
				["", "엘로테는 멕시코의 대표적인 길거리 음식이에요."],
				["", "‘옥수수 속대’라는 뜻인 엘로테는 옥수수를 통째로 삶거나 구워서 치즈와 고춧가루 등 양념을 뿌려 먹는 음식이랍니다.", -10],
				["", "버터, 치즈의 고소한 맛과 고춧가루의 매운맛이 더해져 독특한 맛을 낸답니다."],
				["", "맛있겠지요? "],
				["", "다코야키는 일본에서 유명한 길거리 음식이에요."],
				["", "오사카에서 처음 만들어진 음식인 다코야키는 밀가루 반죽에 문어, 파 등을 넣어 동그랗게 구워낸 후, 양념을 뿌려 먹는 일본의 대표적인 간식이랍니다.", -10],
				["", "여러분은 이 밖에 다른 나라의 길거리 음식을 알고 있나요?"],
				["", "인터넷으로 더 찾아보세요."]
			],
		},
		data_108_s_1_a: { // 파일명 - Look and Say(1)
			subtitle: [
				[0.1, 2.0, 1],
				[2.15, 5.95, 2],
				[6.1, 9.0, 3],
				[9.2, 12.1, 1],
				[12.6, 14.0, 3],
				[14.2, 16.0, 1],
				[16.5, 17.5, 3],
				[18.1, 22.8, 1],
				[23.0, 26.0, 4],
				[26.2, 29.0, 5],
				[29.5, 33.6, 2],
				[34.2, 35.35, 4],
				[35.5, 37.1, 2],
				[37.3, 41.5, 5],
				[42.1, 44.6, 1]
			],
		},

		////////////
		// P - 109
		data_109_s_1_f: { // 파일명 - Think and Talk
			subtitle: [
				[0.5,	2.5],
				[3.5,	7.0],
				[8.0,	10.0],
				[11.0,	13.0],
				[14.0,	17.5],
				[18.0,	20.5],
				[21.2,	24.0],
				[24.5,	28.0],
				[28.5,	30.5],
				[31.5,	33.5],
				[34.0,	38.0],
				[38.5,	40.5],
				[41.5,	43.5],
				[44.5,	48.0],
				[49.0,	51.0],
				[52.0,	54.5],
				[55.0,	59.5],
				[60.5,	62.0]
			],
		},

		////////////
		// P - 110
		data_p110_01: { // data_ + sync ID : 012_01_a_01
			subtitle: [
				[10.4, 12.7, 1],
				[13.0, 15.5, 2],
				[15.5, 17.5, 2],
				[18.0, 20.5, 3],
				[20.5, 22.1, 3],
				[23.1, 25.6, 4],
				[25.7, 27.3, 4],
				[41.0, 43.4, 5],
				[43.5, 46.2, 1],
				[46.2, 48.3, 1],
				[48.7, 51.3, 2],
				[51.3, 53.5, 2],
				[53.8, 56.1, 3],
				[56.4, 58.0, 3]
			],
			dialogue: [
				["May I take your order?", "주문하시겠어요?"],
				["I’d like a salad, please.", "저는 샐러드를 주세요."],
				["This is delicious.", "이것은 맛있어요."],
				["I’d like a curry, please.", "저는 카레를 주세요."],
				["This is hot.", "이것은 매워요."],
				["I’d like a lemonade, please.", "저는 레모네이드를 주세요."],
				["This is sour.", "이것은 셔요."],
				["May I take your order?", "주문하시겠어요?"],
				["I’d like a spaghetti, please.", "저는 스파게티를 주세요."],
				["This is delicious.", "이것은 맛있어요."],
				["I’d like a steak, please.", "저는 스테이크를 주세요."],
				["This is salty.", "이것은 짜요."],
				["I’d like an ice cream, please.", "저는 아이스크림을 주세요."],
				["This is sweet.", "이것은 달아요."],
			],
		},
		data_p110_01_follow: { // 따라하기파일적용 테스트 용
			subtitle: [
				[10.5, 15.1, 1],
				[15.4, 20.6, 2],
				[20.7, 24.3, 2],
				[24.9, 30.0, 3],
				[30.2, 34.3, 3],
				[34.8, 39.7, 4],
				[39.9, 43.9, 4],
				[57.2, 61.6, 5],
				[61.9, 67.3, 1],
				[67.4, 71.6, 1],
				[72.0, 77.7, 2],
				[77.8, 81.8, 2],
				[82.2, 87.5, 3],
				[87.6, 91.2, 3]
			],
			dialogue: [
				["May I take your order?", "주문하시겠어요?"],
				["I’d like a salad, please.", "저는 샐러드를 주세요."],
				["This is delicious.", "이것은 맛있어요."],
				["I’d like a curry, please.", "저는 카레를 주세요."],
				["This is hot.", "이것은 매워요."],
				["I’d like a lemonade, please.", "저는 레모네이드를 주세요."],
				["This is sour.", "이것은 셔요."],
				["May I take your order?", "주문하시겠어요?"],
				["I’d like a spaghetti, please.", "저는 스파게티를 주세요."],
				["This is delicious.", "이것은 맛있어요."],
				["I’d like a steak, please.", "저는 스테이크를 주세요."],
				["This is salty.", "이것은 짜요."],
				["I’d like an ice cream, please.", "저는 아이스크림을 주세요."],
				["This is sweet.", "이것은 달아요."],
			],
		},
		data_110_s_1_a: { // 파일멸 - Sing and Read
			subtitle: [
				[0.5, 2.5, 1],
				[3.6, 5.5, 1],
				[6.6, 8.3, 1],
				[9.0, 11.0, 1],
				[12.0, 13.3, 1],
				[14.0, 16.5, 1],
				[17.5, 19.0, 1],
				[20.0, 22.0, 1],
				[23.0, 25.0, 1],
				[26.0, 28.0, 1],
				[28.5, 31.0, 1],
				[31.5, 33.0, 1],
				[34.0, 36.5, 1],
				[37.5, 39.0, 1]
			],
		},
		data_110_s_2_a: { // 파일멸 - Sing and Read
			subtitle: [
				//[0.5, 2.5, 1],
				//[3.6, 5.5, 1],
				//[6.6, 8.3, 1],
				//[9.0, 11.0, 1],
				//[12.0, 13.3, 1],
				//[14.0, 16.5, 1],
				//[17.5, 19.0, 1]
				[0.5, 2.8, 1],
				[3.5, 5.9, 1],
				[6.5, 8.7, 1],
				[9.2, 11.4, 1],
				[11.9, 13.5, 1],
				[14.1, 16.5, 1],
				[17.5, 19.0, 1],
				[19.8, 21.4, 1],
				[21.8, 23.2, 1],
				[23.6, 25.1, 1],
				[25.5, 27.1, 1],
				[27.3, 28.7, 1]
			],
		},
		data_110_o_16_a: { // 파일멸 - Sing and Read
			subtitle: [
				[0.8, 3.5, 1],
				[4.0, 7.0, 2],
				[7.5, 10.5, 3],
				[11.0, 14.0, 4],
				[14.5, 17.5, 5]
			],
		},
		data_110_o_18_a: { // 파일멸 - Sing and Read
			subtitle: [
				[0.5, 2.0, 1],
				[3.0, 4.5, 1],
				[5.5, 7.5, 1],
				[8.0, 10.0, 1]
			],
		},

		////////////
		// P - 111
		data_111_o_2_a: { // 파일명 - Write It
			subtitle: [
				[0.5, 2.0, 1],
				[3.0, 4.5, 1],
				[5.5, 7.5, 1],
				[8.0, 10.0, 1]
			],
		},
		data_111_o_6_a: { // 파일명 - Write It
			subtitle: [
				[0.5, 2.2, 1],
				[3.0, 7.0, 2],
				[7.5, 10.0, 3],
				[10.5, 13.9, 2],
				[14.0, 16.0, 2],
				[16.5, 19.5, 3]
			],
		},

		////////////
		// P - 112
		data_112_s_15_f: { // 파일명 - Let’s Read(전체 듣기)
			subtitle: [
				[0.6,	2.0],
				[3.0,	4.6],
				[5.6,	6.5],
				[7.5,	10.0],
				[11.0,	13.0],
				[13.5,	16.0],
				[16.5,	19.0],
				[20.0,	21.0],
				[21.5,	23.5],
				[24.5,	26.5],
				[27.0,	30.5],
				[31.0,	34.0],
				[35.0,	36.0],
				[37.0,	39.5],
				[40.0,	42.0],
				[43.0,	45.5],
				[46.0,	48.5],
				[49.0,	50.5],
				[51.5,	54.0],
				[55.0,	57.0],
				[57.5,	60.0],
				[60.5,	62.5],
				[63.0,	67.5]
			],
		},
		data_112_o_2_a: { // 파일명 - Let’s Read(읽기 1)
			subtitle: [
				[0.5, 2.0, 1],
				[3.0, 4.5, 1],
				[5.5, 6.5, 1],
				[7.5, 10.0, 1],
				[11.0, 12.8, 1],
				[13.5, 15.8, 1],
				[16.5, 19.0, 1],
				[20.0, 21.0, 1],
				[21.7, 23.5, 1],
				[24.5, 26.5, 1],
				[27.0, 30.5, 1],
				[31.0, 34.0, 1]
			],
		},
		data_112_o_19_a: { // 파일명 - Let’s Read(읽기 1)
			subtitle: [
				[0.5, 4.0, 1],
				[5.0, 8.6, 1],
				[9.5, 13.0, 1],
				[14.2, 17.0, 1]
			],
		},

		////////////
		// P - 113
		data_113_s_1_a: { // 파일명 - 창의문항
			subtitle: [
				[0.0, 1.8, 1],
				[2.2, 3.6, 1],
				[4.0, 6.8, 1]
			],
		},
		data_113_o_1_a: { // 파일명 - Let’s Read(읽기 1)
			subtitle: [
				[0.5, 1.5, 1],
				[2.2, 5.0, 1],
				[5.5, 7.2, 1],
				[8.2, 10.7, 1],
				[11.5, 14.0, 1],
				[14.5, 16.0, 1],
				[16.7, 19.5, 1],
				[20.5, 22.2, 1],
				[23.0, 25.0, 1],
				[26.0, 27.8, 1],
				[28.5, 32.5, 2]
			],
		},
		data_113_o_15_a: { // 파일명 - Let’s Read(읽기 1)
			subtitle: [
				[0.5, 3.5, 1],
				[4.0, 6.0, 1],
				[7.0, 10.5, 1],
				[11.5, 15.3, 1],
				[16.0, 19.5, 1],
				[20.2, 22.2, 1]
			],
		},
		////////////
		// P - 30
		data_114_o_2_a: { // Step 1(Soccer Club)
			subtitle: [
				[0.0, 1.5, 1],
				[2.0, 5.7, 1],
				[6.2, 8.5, 1],
				[8.8, 11.0, 1],
				[11.5, 15.7, 1],
				[16.0, 20.0, 1],
				[20.3, 23.0, 1],
				[23.5, 25.0, 1],
				[25.15, 28.5, 1]
			],
		},

		////////////
		// P - 31
		data_115_o_1: { // Step 2(Soccer Club)
			subtitle: [
				[0.5, 2.5, 1],
				[3.5, 7.0, 2],
				[8.0, 11.0, 3]
			],
		},

		data_115_o_1_a: { // Step 2(Soccer Club)
			subtitle: [
				[0.5, 2.5, 1],
				[3.5, 7.0, 2],
				[8.0, 11.0, 3]
			],
		},

		////////////
		// P - 32
		data_116_o_2_f: { // 파일명 - Review(B)
			subtitle: [
				[0.5,	4.0],
				[5.0,	8.0],
				[9.0,	12.0],
				[13.0,	17.5],
				[18.3,	20.0],
				[21.0,	24.3]
			],

		},

		data_161_o_7_f: { // 파일명 - Review(C)
			subtitle: [
				[0.5,	3.0],
				[4.0,	7.5],
				[8.5,	11.5],
				[12.0,	13.5]
			],
		},

		data_116_o_8_a: { // 파일명 - Review(C)
			subtitle: [
				[0.5, 2.1, 1],
				[2.7, 5.5, 2],
				[6.0, 8.2, 1],
				[8.8, 12.5, 2]
			],
		},
		data_116_o_12: { // 파일명 - Review(C)
			subtitle: [
				[0.0, 3.0, 1]
			],
		},
		data_116_o_13_a: { // 파일명 - Review(D)
			subtitle: [
				[0.5, 2.3, 1],
				[3.0, 4.5, 2],
				[5.0, 7.0, 2],
				[7.8, 11.2, 3],
				[12.0, 14.3, 4],
				[15.2, 16.5, 2],
				[17.0, 18.5, 4],
				[19.5, 22.5, 4]
			],
		},
		data_117_o_1_a: { // 파일명 - Review(E)
			subtitle: [
				[0.5, 2.3, 1],
				[3.0, 4.4, 2],
				[5.2, 7.0, 2],
				[8.0, 9.2, 1],
				[10.3, 13.0, 2],
				[13.5, 15.5, 3],
				[16.5, 18.2, 4],
				[19.0, 20.5, 4]
			],
		},
		data_117_o_9_f: { // 파일명 - Try More
			subtitle: [
				[0.5,	2.2],
				[3.1,	7.4],
				[8.3,	10.8],
				[11.5,	14.0]
			],
		},
		data_117_o_17: { // 파일명 - Try More
			subtitle: [
				[0.5,	5.0]
			],
		},
	}
});
