$(document).ready(function(){
	// sync data ↓ 
	// sync data ↓ 
	mp_data = {  // MP3 sync 
		////////////
		// P - 22
		data_p022_01: { // 파일명 - 
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[12.4, 14.0, 1],
				[15.0, 17.0, 2]
			],
			dialogue: [
				["Why are you sad?", "너는 왜 슬퍼하니?"],
				["I lost my cell phone.", "나는 휴대 전화를 잃어버렸어."]
			],
		},
		data_p022_02: { // 파일명 - 
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[6.2, 7.5, 1],
				[9.2, 11.0, 2],
				[11.7, 14.0, 1]
			],
			dialogue: [
				["Why are you worried?", "너는 왜 걱정하니?"],
				["I have a math test.", "나는 수학 시험이 있어."],
				["Don't worry. I can help you.", "걱정하지 마. 내가 도와줄게."]
			],
		},
		data_22_s_29_a: { // 파일명 - Listen and Say(1)
			subtitle: [
				[0.4, 1.9, 1],
				[2.6, 4.5, 1]
			],
		},
		data_22_s_31_a: { // 파일명 - Listen and Say(2)
			subtitle: [
				[0.3, 1.5, 1],
				[2.3, 4.0, 2],
				[4.7, 6.7, 1]
			],
		},
		data_22_o_3_a: { // 파일명 - 학습목표(1)
			subtitle: [
				[0.4, 2.3, 1],
				[3.0, 5.1, 2]
			],
		},
		data_22_o_5: { // 파일명 - 학습목표(2)
			subtitle: [
				[0.6, 2.8, 1]
			]
		},

		////////////
		// P - 23
		data_p023_01: { // 파일명 - 
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[3.2, 6.3, 1],
				[6.5, 11.2, 2],
				[11.4, 15.1, 1],
				[15.4, 18.3, 3],
				[18.7, 20.3, 1],
				[29.2, 31.7, 2],
				[37.3, 39.2, 3],
				[39.5, 44.2, 1],
				[49.3, 51.3, 1],
				[52.1, 55.2, 2],
				[55.4, 59.7, 1],
				[60.1, 61.6, 3],
				[61.7, 65.3, 2]
			],
			dialogue: [
				["Mom! Mom! I'm home.", "엄마! 엄마! 저 왔어요."],
				["You look excited. Why are you so excited?", "신나 보이는구나. 너는 왜 그렇게 신났니?"],
				["I got a present from my friend. Look!", "저는 친구에게 선물을 받았어요. 보세요!"],
				["Wow! Can I read this?", "와! 내가 이거 읽어도 돼?"],
				["No, no!", "아니, 안 돼!"],
				["So cute. I want a dog.", "정말 귀엽다. 나는 강아지를 키우고 싶어."],
				["Let's play together.", "같이 놀자."],
				["Sorry, I’m busy. I’m making a dog for my friend.", "미안, 나는 바빠. 친구에게 줄 강아지 장난감을 만들고 있어. "],
				["Oh, no! Sally!", "안 돼! Sally!"],
				["Harry, why are you upset?	Harry,", "너는 왜 화가 났니?"],
				["She broke my toy. I made it for my friend.", "동생이 제 장난감을 망가트렸어요. 제가 친구 주려고 만든 거였어요."],
				["I'm sorry.", "미안해."],
				["Don't worry. Let's make it together.", "걱정하지 마. 같이 다시 만들자."]
			],
		},
		data_23_s_1_a: { // 파일명 - Look and Listen(1)
			subtitle: [
				[0.2, 2.9, 1],
				[3.1, 7.6, 2],
				[7.7, 10.8, 1],
				[11.5, 14.2, 3],
				[14.5, 16.1, 1],
				[16.6, 19.1, 2],
				[19.7, 21.5, 3],
				[22.0, 29.2, 1],
				[29.8, 32.7, 2],
				[33.3, 37.7, 1],
				[38.0, 39.6, 3],
				[40.0, 43.3, 2]
			],
		},

		////////////
		// P - 24
		data_p024_01: { // 파일명 - 
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[9.5, 12.6, 1],
				[13.6, 16.0, 2],
				[17.3, 19.7, 1],
				[21.0, 22.6, 2],
				[23.7, 25.3, 1],
				[30.1, 33.6, 2],
				[35.1, 37.6, 3],
				[38.2, 40.4, 2],
				[40.7, 43.5, 2],
				[44.6, 50.7, 4],
				[53.3, 57.3, 3],
				[59.3, 62.5, 4],
				[64.3, 66.0, 3],
				[67.2, 69.4, 4],
				[69.5, 71.1, 4],
				[72.0, 73.3, 3],
				[89.0, 90.3, "2_4"],
				[101.0, 104.0, 3],
				[104.4, 105.7, 3]
			],
			dialogue: [
				["I’m tired. I want to sleep.", "나는 피곤해. 나는 자고 싶어."],
				["Why are you so tired?", "너는 왜 그렇게 피곤하니?"],
				["I stayed up late last night.", "나는 어젯밤 늦게까지 깨어 있었어."],
				["What did you do?", "너는 무엇을 했는데?"],
				["I did my homework.", "나는 숙제를 했어."],
				["You look worried. Why are you worried?", "걱정 있어 보인다. 너는 왜 걱정하니?"],
				["I have a singing contest.", "나는 노래 대회가 있어."],
				["Oh, it’s today.", "오, 오늘이구나. "],
				["Don’t worry. You sing well.", "걱정하지 마. 너는 노래 잘하잖아."],
				["Aha! I have an idea. This is for you.", "아하! 좋은 생각이 있어. 이건 너를 위한 거야."],
				["Wow, it's so small. What is it?", "와, 정말 작다. 그것이 무엇이니?"],
				["It's a worry doll. Her name is Mo.", "그것은 걱정 인형이야. 그녀의 이름은 Mo야."],
				["Worry doll?", "걱정 인형?"],
				["Tell the doll about your worry.", "인형에게 네 걱정을 말해 봐. "],
				["She can help you.", "그녀는 너를 도와줄 거야."],
				["Thanks.", "고마워."],
				["Don't worry.", "걱정하지 마."],
				["I did it! I'm so happy.", "난 해냈어! 나는 정말 행복해. "],
				["Thanks, Mo.", "고마워, Mo."]
			],
		},
		data_p024_02: { // 파일명 - 
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[1.5, 6.0, 1],
				[8.4, 16.3, 1],
				[17.2, 24.2, 1],
				[25.0, 28.0, 1],
				[31.7, 38.7, 1],
				[39.5, 46.6, 1],
				[48.3, 59.4, 1],
				[63.4, 72.5, 1],
				[73.3, 86.0, 1],
				[89.5, 96.4, 1],
				[97.3, 103.7, 1],
				[104.5, 113.4, 1],
				[115.5, 121.0, 1],
				[121.5, 124.2, 1]
			],
			dialogue: [
				["", "좋은 일을 바라는 마음이 담긴 물건"],
				["", "이야기에서 Lucy는 Emily의 걱정을 덜어 주려고 Emily에게 걱정 인형을 주었지요?"],
				["", "걱정 인형처럼, 세계에는 좋은 일을 바라는 마음이 담긴 다양한 물건이 있답니다. "],
				["", "어떤 물건이 있는지 알아볼까요?"],
				["", "걱정 인형은 과테말라에서 오래 전부터 전해 오는 마야인의 전통 인형이에요."],
				["", "과테말라에서는 걱정으로 잠 못 이루는 아이에게 걱정 인형을 선물하는 풍습이 있어요."],
				["", "인형에게 걱정을 이야기한 후 베개 밑에 두고 잠들면, 인형이 걱정을 가져가서 걱정이 사라진다는 전설이 전해진답니다.", -10],
				["", "드림 캐처는 북아메리카 오지브와 부족이 만든 고리 모양 수제 장식으로, 행운을 비는 부적이랍니다.", -10],
				["", "나쁜 꿈은 잡아 두었다가 새벽에 떠오르는 태양 빛에 사라지게 하고, 좋은 꿈은 깃털을 타고 내려와 잠든 사람에게 깃들도록 한다고 전해지지요.", -10],
				["", "달라 호스는 스웨덴에서 행복을 불러 온다고 믿는 전통 목각 인형이에요."],
				["", "꼬리가 없는 말 모양인 이 인형은 스웨덴을 대표하는 상징물이기도 하지요."],
				["", "스웨덴 사람들은 달라호스가 가정에는 평화를, 개인에게는 행복을 가져다 준다고 믿는답니다."],
				["", "여러분은 좋은 일을 바라는 마음이 담긴 다른 물건을 알고 있나요?"],
				["", "인터넷으로 더 찾아보세요."],

			],
		},
		data_24_s_1_a: { // 파일명 - Look and Say(1)
			subtitle: [
				[0.0, 3.0, 1],
				[3.3, 5.5, 2],
				[5.7, 8.3, 1],
				[8.6, 10.2, 2],
				[10.5, 12.2, 1],
				[12.7, 16.0, 2],
				[16.3, 19.0, 3],
				[19.3, 26.6, 2],
				[25.1, 29.2, 4],
				[29.5, 33.6, 3],
				[34.0, 37.3, 4],
				[37.7, 39.3, 3],
				[39.5, 43.4, 4],
				[43.6, 45.0, 3],
				[45.2, 46.6, "2_4"],
				[26.8, 51.8, 3],
			],
		},

		////////////
		// P - 25
		data_25_s_1_f: { // 파일명 - Think and Talk
			subtitle: [
				[0.3,	2.2],
				[3.0,	5.4],
				[6.2,	8.2],
				[8.8,	11.0],
				[12.0,	14.0],
				[14.7,	17.1],
				[17.5,	20.0],
				[20.6,	23.4],
				[24.2,	26.3],
				[27.0,	30.0]
			],
		},

		////////////
		// P - 26
		data_p026_01: { // data_ + sync ID : 012_01_a_01
			subtitle: [
				[9.8, 12.5, 1],
				[13.8, 16.2, "2_3_4"],
				[16.3, 18.7, "2_3_4"],
				[20.0, 23.5, 1],
				[24.2, 25.8, 2],
				[28.5, 30.3, "1_3_4"],
				[30.3, 32.9, "1_3_4"],
				[34.1, 38.0, 2],
				[38.5, 42.0, 1],
				[52.5, 54.5, 3],
				[56.6, 58.7, "1_2_4"],
				[58.8, 61.2, "1_2_4"],
				[62.2, 66.5, 3],
				[66.6, 68.3, 4],
				[70.3, 72.6, "1_2_3"],
				[72.3, 75.5, "1_2_3"],
				[76.5, 80.0, 4],
				[80.6, 84.1, 3]
			],
			dialogue: [
				["I'm Excited", "나는 신나."],
				["Why are you excited?", "너는 왜 신났니?"],
				["Why are you excited?", "너는 왜 신났니?"],
				["I got a present.", "나는 선물을 받았어."],
				["I'm worried.", "나는 걱정이 있어."],
				["Why are you worried?", "너는 왜 걱정하니?"],
				["Why are you worried?", "너는 왜 걱정하니?"],
				["I have a math test.", "나는 수학 시험이 있어."],
				["Don't worry. I can help you.", "걱정하지 마. 내가 도와줄게."],
				["I'm tired.", "나는 피곤해."],
				["Why are you tired?", "너는 왜 피곤하니?"],
				["Why are you tired?", "너는 왜 피곤하니?"],
				["I stayed up late last night.", "나는 지난밤 늦게까지 깨어 있었어. "],
				["I'm upset.", "나는 화가 나."],
				["Why are you upset?", "너는 왜 화가 났니?"],
				["Why are you upset?", "너는 왜 화가 났니?"],
				["My sister broke my toy.", "여동생이 내 장난감을 망가트렸어."],
				["Don't worry. I can help you.", "걱정하지 마. 내가 도와줄게."]
			],
		},
		data_26_s_1_a: { // 파일멸 - Sing and Read
			subtitle: [
				[0.0, 2.0, 1],
				[2.5, 5.0, 1],
				[5.5, 8.0, 1],
				[8.5, 10.4, 1],
				[11.0, 12.5, 1],
				[13.3, 15.4, 1],
				[16.3, 18.2, 1],
				[19.0, 21.2, 1],
				[22.0, 25.0, 1],
				[25.5, 27.0, 1],
				[28.0, 30.3, 1],
				[31.0, 33.0, 1],
				[33.4, 36.5, 1],
				[37.0, 39.0, 1],
				[39.1, 41.0, 1],
				[41.5, 43.7, 1],
				[44.4, 47.2, 1],
				[48.0, 51.0, 1]
			],
		},
		data_26_s_2_a: { // 파일멸 - Sing and Read
			subtitle: [
				[0.0, 2.0, 1],
				[2.5, 5.0, 1],
				[5.5, 8.0, 1],
				[8.5, 10.4, 1],
				[11.0, 12.5, 1],
				[13.3, 15.4, 1],
				[16.3, 18.2, 1],
				[19.0, 21.2, 1],
				[22.0, 25.0, 1],
				[25.7, 26.8, 1],
				[27.7, 30.2, 1],
				[31.0, 32.3, 1],
				[32.8, 36.0, 1]
			],
		},

		data_26_s_6: { // 파일멸 - Sing and Read
			subtitle: [
				[0.5, 2.5, 1],
				[3.0, 5.0, 1],
				[5.5, 7.5, 1],
				[8.5, 11.0, 2],
				[11.5, 15.5, 3],
				[16.0, 18.0, 4]
			],
		},

		data_26_o_16_a: { // 파일멸 - Sing and Read
			subtitle: [
				[0.8, 3.5, 1],
				[4.0, 7.0, 2],
				[7.5, 10.5, 3],
				[11.0, 14.0, 4],
				[14.5, 17.5, 5]
			],
		},

		////////////
		// P - 27
		data_27_s_1_a: { // 파일명 - Write It
			subtitle: [
				[0.4, 2.4, 1],
				[3.6, 5.4, 1],
				[6.3, 8.0, 1]
			],
		},
		data_27_s_2_a: { // 파일명 - Write It
			subtitle: [
				[0.2, 2.1, 1],
				[2.7, 5.0, 2],
				[5.5, 8.3, 1],
				[9.0, 10.5, 2],
				[11.2, 13.0, 2],
				[13.4, 15.1, 3],
				[15.7, 17.7, 4],
				[18.4, 20.5, 3],
				[21.0, 22.7, 4],
				[23.7, 25.4, 4]
			],
		},

		////////////
		// P - 28
		data_28_s_16_f: { // 파일명 - Let's Read(전체 듣기)
			subtitle: [
				[0.5,	2.5],
				[3.0,	6.0],
				[6.5,	9.5],
				[10.0,	12.5],
				[13.5,	16.5],
				[17.0,	19.0],
				[19.5,	22.5],
				[23.0,	26.5],
				[27.0,	28.5],
				[29.5,	31.0],
				[31.5,	34.0],
				[34.5,	36.5],
				[37.0,	40.0],
				[40.5,	42.5],
				[43.0,	45.0],
				[45.5,	48.5],
				[49.0,	52.0],
				[52.5,	55.0],
				[55.5,	58.5],
				[59.0,	60.5]
			],
		},
		data_28_o_2_a: { // 파일명 - Let's Read(읽기 1)
			subtitle: [
				[0.8, 2.8, 1],
				[3.2, 6.2, 2],
				[6.6, 9.8, 1],
				[10.2, 12.8, 1]

			],
		},
		data_28_o_6_a: { // 파일명 - Let's Read(읽기 1)
			subtitle: [
				[0.5, 3.5, 3],
				[4.0, 6.0, 4],
				[6.5, 9.5, 4],
				[10.0, 13.5, 4],
				[14.0, 16.0, 5],
				[16.5, 18.0, 5],
				[19.0, 21.0, 5],
				[21.5, 24.0, 6],
				[24.5, 27.0, 6]
			],
		},

		////////////
		// P - 29
		data_29_o_1_a: { // 파일명 - 창의문항
			subtitle: [
				[0.5, 2.5, 7],
				[3.0, 5.5, 7],
				[6.0, 8.5, 7],
				[9.0, 12.0, 8],
				[12.5, 15.0, 8],
				[15.5, 18.5, 9],
				[19.0, 20.5, 9]
			],
		},
		data_29_o_8_a: { // 파일명 - Let's Read(읽기 1)
			subtitle: [
				[0.5, 2.4, 1],
				[3.2, 6.3, 1],
				[7.0, 9.0, 1],
				[9.6, 12.0, 1],
				[13.0, 15.0, 1],
				[15.8, 19.6, 1],
				[20.3, 22.3, 1],
				[23.0, 26.0, 1]
			],
		},
		
		////////////
		// P - 30
		data_30_o_2_a: { // Step 1(Soccer Club)
			subtitle: [
				[0.4, 3.0, 1],
				[3.5, 5.5, 1],
				[6.2, 8.2, 1],
				[9.0, 13.4, 1],
				[14.1, 17.0, 2],
				[18.0, 20.7, 2],
				[21.6, 24.2, 2],
				[25.0, 27.2, 2]
			],
		},
		
		////////////
		// P - 31
		data_30_o_22_a: { // Step 2(Soccer Club)
			subtitle: [
				[0.5, 1.6, 1],
				[3.0, 4.5, 2],
				[5.5, 1.3, 1],
				[11.2, 14.1, 2]
			],
		},

		////////////
		// P - 32
		data_31_o_2_f: { // 파일명 - Review(B)
			subtitle: [
				[0.4,	2.1],
				[3.0,	7.8],
				[8.7,	1.4],
				[11.4,	13.8],
				[14.8,	18.0],
				[19.0,	22.6],
				[23.7,	25.6]
			],
		},
		data_31_o_9_a: { // 파일명 - Review(C)
			subtitle: [
				[0.2, 4.1, 1],
				[4.2, 6.0, 2],
				[6.5, 12.0, 1],
				[13.0, 16.5, 2]
			],
		},
		data_31_o_19_a: { // 파일명 - Review(D)
			subtitle: [
				[0.5, 4.1, 1],
				[5.0, 7.9, 1],
				[8.6, 11.2, 1],
				[12.0, 14.0, 1]
			],
		},
		data_31_o_23_a: { // 파일명 - Try More
			subtitle: [
				[0.2, 2.0, 1],
				[2.7, 4.8, 2],
				[5.8, 7.0, 1],
				[7.1, 8.5, 1],
				[9.3, 11.0, 1],
				[11.6, 13.7, 3],
				[14.7, 17.3, 1]
			],
		},
		////////////
		// P - 33
		data_31_o_30_f: { // 파일명 - Review(E)
			subtitle: [
				[0.2,	2.5],
				[3.2,	4.9],
				[5.5,	7.4],
				[8.2,	10.8],
				[11.6,	14.8]
			],
		},
		data_31_o_37_a: { // 파일명 - Try More
			subtitle: [
				[0.4, 2.0, 1],
				[3.0, 5.1, 2],
				[6.2, 9.6, 1]
			],
		},

		////////////
		// wrap_up
		data_34_s_1_f: { // 파일명 - Try More
			subtitle: [
				[0.5,	2.0],
				[3.5,	5.0],
				[5.5,	8.0],
				[8.5,	12.5],
				[13.0,	15.5],
				[16.0,	18.0],
				[18.5,	21.5],
				[22.0,	25.0],
				[25.5,	29.0],
				[29.5,	34.0],
				[34.5,	37.0],
				[37.5,	44.0],
				[44.5,	47.5],
				[48.0,	50.0],
				[50.5,	53.0],
				[53.5,	55.5],
				[56.0,	59.0],
				[59.5,	62.0],
				[62.5,	66.0],
				[66.5,	68.5],
				[69.5,	73.0],
				[73.5,	77.5],
				[78.0,	80.5],
				[81.0,	83.5],
				[84.0,	87.0],
			],
		},
		data_34_o_3_a: { // 파일명 - Try More
			subtitle: [
				[0.5, 2.0, 1],
				[2.5, 4.5, 2],
				[5.0, 7.5, 2],
				[8.0, 12.0, 2],
				[12.5, 14.5, 2],
				[15.0, 17.5, 2]
			],
		},
		data_34_o_9_a: { // 파일명 - Try More
			subtitle: [
				[0.5, 3.5, 2],
				[4.0, 6.5, 2],
				[7.0, 11.0, 2],
				[11.5, 16.0, 2],
				[16.5, 19.0, 2],
				[19.5, 26.0, 2],
				[26.5, 29.5, 2],
				[30.0, 32.0, 3],
				[32.5, 35.0, 4],
				[35.5, 38.0, 5],
				[38.5, 41.0, 6],
				[41.5, 44.0, 3],
				[44.5, 48.0, 3],
				[48.5, 51.0, 3]
			],
		},
		data_35_o_1_a: { // 파일명 - Try More
			subtitle: [
				[0.5, 4.0, 3],
				[5.0, 9.0, 2],
				[9.5, 11.5, 6],
				[12.0, 14.5, 2],
				[15.0, 18.0, 2]
			],
		},
		data_35_o_20_a: { // 파일명 - Try More
			subtitle: [
				[0.3, 2.7, 1],
				[3.3, 5.7, 1],
				[6.6, 8.6, 1],
				[9.4, 13.8, 1],
				[14.7, 16.7, 1],
				[17.6, 20.6, 1],
				[21.4, 23.0, 1],
				[24.0, 27.0, 2],
				[27.5, 30.0, 2],
				[30.5, 33.0, 2],
				[33.5, 36.5, 2],
				[37.0, 40.5, 2],
				[41.0, 43.5, 2]
			],
		},
		data_36_s_1_a: { // 파일명 - Try More
			subtitle: [
				[0.5, 5.0, 1],
				[6.0, 9.0, 1],
				[9.7, 12.8, 1],
				[13.2, 16.1, 1],
				[17.1, 19.2, 1],
				[20.1, 22.6, 2],
				[23.3, 26.0, 1],
				[26.7, 28.0, 2],
			],
		},
	}
});