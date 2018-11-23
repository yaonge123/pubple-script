$(document).ready(function(){
	// sync data ↓
	// sync data ↓
	mp_data = {  // MP3 sync
		////////////
		// P - 162
		data_p162_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[5.1, 6.7, 1],
				[7.2, 9.2, 2]
			],
			dialogue: [
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be a fashion model.", "나는 패션모델이 되고 싶어."]
			],
		},
		data_p162_02: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[5.6, 8.2, 1],
				[8.4, 10.2, 1],
				[10.6, 12.6, 2]
			],
			dialogue: [
				["Science is my favorite subject.", "과학은 내가 가장 좋아하는 과목이야."],
				["I want to be a scientist.", "나는 과학자가 되고 싶어."],
				["Good. You can do it.", "좋다. 너는 할 수 있어."]
			],
		},
		data_162_o_8_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.6, 3.0, 1],
				[4.0, 6.4, 2]
			]
		},
		data_162_o_10: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.0, 2.3, 1]
			]
		},
		data_162_s_22_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.4, 2.0, 1],
				[2.5, 4.5, 2]
			]
		},
		data_162_s_24_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.0, 5.0, 1],
				[5.6, 7.6, 2]
			]
		},

		////////////
		// P - 163
		data_p163_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[2.8, 7.0, 1],
				[7.4, 8.4, 2],
				[13.0, 18.0, 1],
				[18.4, 20.4, 2],
				[24.2, 26.5, 3],
				[27.6, 29.6, 2],
				[30.5, 33.6, 1],
				[33.7, 35.4, 1],
				[36.4, 38.1, 2],
				[45.5, 48.3, 2],
				[48.5, 53.1, 3],
				[55.4, 58.7, 3],
				[72.3, 74.0, 2],
				[74.7, 78.0, 3]
			],
			dialogue: [
				["Look at me. Can you take a picture of me?", "나를 좀 봐. 내 사진을 찍어 줄 수 있니?"],
				["Sure.", "그럼."],
				["I want to go to Mars. I want to be an astronaut.", "나는 화성에 가고 싶어. 나는 우주 비행사가 될 거야."],
				["Great! You can do it.", "멋지다! 너는 할 수 있어."],
				["What do you want to be, Lucy?", "너는 무엇이 되고 싶니, Lucy?"],
				["I want to be an announcer.", "나는 아나운서가 되고 싶어."],
				["Great! You have a good voice.", "그래! 너는 목소리가 좋아."],
				["Do you want to try?", "한번 해 볼래?"],
				["Yes, I do.", "응, 그래."],
				["What do you want to be, Junho?", "준호야, 너는 무엇이 되고 싶니?"],
				["I want to be a painter. I like to paint pictures.", "나는 화가가 되고 싶어. 나는 그림 그리는 것을 좋아하거든."],
				["Lucy, sit in front of me. I’ll draw you.", "Lucy, 내 앞에 앉아 봐. 내가 널 그려 줄게."],
				["Is that me, Junho?", "준호야, 그 그림이 나야?"],
				["Yes. My favorite painter is Picasso.", "응. 내가 가장 좋아하는 화가는 피카소야."]
			],
		},
		data_163_s_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.0, 4.0, 1],
				[4.5, 5.5, 2],
				[6.0, 10.6, 1],
				[11.0, 13.0, 2],
				[13.5, 16.0, 3],
				[16.5, 19.0, 2],
				[19.5, 24.6, 1],
				[25.0, 27.0, 2],
				[27.5, 29.5, 2],
				[30.0, 34.5, 3],
				[35.0, 38.5, 3],
				[39.0, 40.8, 2],
				[41.5, 44.8, 3]
			]
		},

		////////////
		// P - 164
		data_p164_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[4.2, 5.5, 1],
				[6.0, 7.0, 2],
				[7.6, 10.5, 2],
				[10.7, 15.0, 2],
				[15.2, 16.3, 2],
				[21.2, 25.5, 2],
				[26.4, 29.0, 3],
				[29.1, 31.5, 3],
				[34.8, 38.2, 2],
				[42.6, 46.4, 2],
				[46.6, 49.0, 4],
				[49.2, 51.9, 2],
				[52.0, 55.1, 4],
				[55.5, 57.1, 4],
				[57.3, 59.2, 2],
				[65.2, 69.0, 2],
				[69.8, 73.0, 5],
				[73.5, 76.1, 2],
				[76.8, 78.3, 5],
				[78.4, 81.2, 5],
				[84.1, 85.3, 5]
			],
			dialogue: [
				["Are you ready?", "준비됐어?"],
				["Yes.", "응."],
				["Good afternoon. This is Hana.", "안녕하세요. 저는 하나입니다."],
				["Today I’ll interview my friends about their dreams.", "오늘 친구들의 꿈에 관해 인터뷰를 할 거예요."],
				["Let’s go!", "가시죠!"],
				["Hi, Emily. How often do you practice the piano?", "안녕, Emily. 너는 얼마나 자주 피아노를 연습하니?"],
				["Every day. It’s fun.", "매일 해. 재미있어."],
				["I want to be a pianist.", "나는 피아니스트가 되고 싶어."],
				["How nice! You can do it.", "멋지다! 너는 할 수 있어."],
				["Hi, Tao. What do you want to be?", "안녕, Tao. 너는 무엇이 되고 싶니?"],
				["I want to be a fish doctor.", "나는 물고기 의사가 되고 싶어."],
				["What does a fish doctor do?", "물고기 의사는 어떤 일을 하는데?"],
				["A fish doctor takes care of sick fish.", "물고기 의사는 아픈 물고기들을 돌보지."],
				["I want to help them.", "나는 그들을 돕고 싶어."],
				["Sounds interesting.", "정말 흥미롭다."],
				["Harry, you play soccer very well.", "Harry, 너는 축구를 잘하는구나."],
				["Thanks. I like to play soccer.", "고마워. 나는 축구하는 것을 좋아해."],
				["Do you want to be a soccer player?", "너는 축구 선수가 되고 싶니?"],
				["Yes, I do.", "응."],
				["I want to be a soccer player like Messi.", "나는 메시와 같은 축구 선수가 되고 싶어."],
				["Oh, no!", "오, 이런!"]
			],
		},
		data_164_s_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.0, 1.1, 1],
				[1.5, 11.8, 2],
				[12.0, 16.2, 2],
				[16.7, 21.6, 3],
				[22.0, 25.0, 2],
				[25.5, 29.0, 2],
				[29.5, 31.5, 4],
				[32.0, 34.5, 2],
				[34.64, 39.6, 4],
				[40.0, 42.0, 2],
				[42.5, 46.0, 2],
				[46.5, 49.5, 5],
				[50.0, 52.5, 2],
				[53.0, 59.1, 5]
			]
		},
		data_p164_02: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[1.5, 5.2, 1],
				[8.4, 15.0, 1],
				[15.6, 24.4, 1],
				[25.3, 32.2, 1],
				[32.6, 35.5, 1],
				[39.4, 44.1, 1],
				[44.5, 56.5, 1],
				[57.1, 67.0, 1],
				[70.7, 77.1, 1],
				[77.7, 90.0, 1],
				[90.6, 97.0, 1],
				[100.7, 108.7, 1],
				[109.4, 118.7, 1],
				[119.5, 131.1, 1],
				[132.7, 139.2, 1],
				[139.7, 142.4, 1]
			],
			dialogue: [
				["", "세계의 존경받는 인물들의 직업"],
				["", "이야기에서 친구들은 각자 커서 무엇이 되고 싶은지 이야기를 나누었어요."],
				["", "Emily는 피아니스트, Tao는 물고기를 치료하는 의사, Harry는 축구 선수가 되고 싶다고 했지요.",-10],
				["", "세계에는 자신의 분야에서 뛰어난 업적을 남겨 존경을 받는 사람들이 있답니다."],
				["", "어떤 사람들이 있는지 알아볼까요?"],
				["", "호로비츠는 러시아 출생의 미국 피아니스트예요."],
				["", "호로비츠는 뛰어난 연주 기교로 감성을 탁월하게 표현해, 동시대 피아니스트들에게 존경을 받은 20세기 대표 피아니스트랍니다.",-10],
				["", "특히 쇼팽, 스크라빈, 리스트, 라흐마니노프의 곡을 탁월하게 해석하여 연주한 것으로 유명하지요.",-10],
				["", "닐 암스트롱은 세계 최초로 달에 착륙한 미국의 우주 비행사예요."],
				["", "1969년 7월 20일 아폴로 11호를 타고 달에 착륙하여 달 표면을 약 두 시간 반 동안 탐사하고, 지구로 돌아왔답니다.",-10],
				["", "닐 암스트롱은 달에 간 최초의 우주 비행사로 우리에게 기억되지요."],
				["", "마리 퀴리는 폴란드 출생의 프랑스 과학자로, 방사능 연구에 큰 업적을 남겼어요."],
				["", "마리 퀴리는 폴로늄과 라듐이라는 방사능 원소를 발견해, 방사능 물리학이라는 새 분야를 열었답니다.",-10],
				["", "1903년에 노벨 물리학상을, 1911년에 노벨 화학상을 수상해, 최초로 노벨상을 2회 수상한 과학자이기도 하지요.",-10],
				["", "여러분은 이 밖에 자신의 분야에서 세계적으로 존경받는 인물을 알고 있나요?"],
				["", "인터넷으로 더 찾아보세요."]
			],
		},

		////////////
		// P - 165
		data_165_s_1_f: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5,	3.0],
				[4.0,	6.5],
				[7.0,	10.0],
				[11.0,	13.5],
				[14.5,	17.0],
				[18.0,	21.0],
				[22.0,	24.5],
				[25.5,	28.0],
				[28.5,	32.0],
				[33.0,	35.0],
				[36.0,	39.0],
				[39.5,	43.0],
				[44.0,	46.0],
				[47.0,	50.0],
				[50.5,	53.5]
			]
		},



		////////////
		// P - 166
		data_p166_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[8.4, 11.6, 1],
				[12.3, 15.1, 2],
				[15.5, 18.2, 1],
				[19.0, 22.0, 2],
				[22.1, 24.7, 1],
				[25.6, 28.2, 2],
				[28.4, 32.0, 1],
				[43.8, 46.5, 1],
				[47.4, 49.7, 2],
				[50.4, 53.2, 1],
				[54.0, 57.0, 2],
				[57.1, 60.0, 1],
				[60.7, 63.2, 2],
				[63.2, 68.0, 1]
			],
			dialogue: [
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be a scientist.", "저는 과학자가 되고 싶어요."],
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be a soccer player.", "저는 축구 선수가 되고 싶어요."],
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be an astronaut.", "저는 우주 비행사가 되고 싶어요."],
				["Great! You can do it.", "멋지다! 너는 할 수 있어."],
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be a painter.", "저는 화가가 되고 싶어요."],
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be a pianist.", "저는 피아니스트가 되고 싶어요."],
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be an announcer.", "저는 아나운서가 되고 싶어요."],
				["Great! You can do it.", "멋지다! 너는 할 수 있어."]
			],
		},
		data_p166_01_follow: {
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[8.4, 14.1, 1],
				[15.0, 20.4, 2],
				[20.6, 26.6, 1],
				[27.3, 33.2, 2],
				[33.4, 38.7, 1],
				[39.6, 44.6, 2],
				[44.7, 51.8, 1],
				[63.5, 69.4, 1],
				[70.1, 75.3, 2],
				[75.7, 81.9, 1],
				[82.6, 88.6, 2],
				[89.0, 94.7, 1],
				[95.5, 100.5, 2],
				[100.7, 110.2, 1]

			],
			dialogue: [
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be a scientist.", "저는 과학자가 되고 싶어요."],
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be a soccer player.", "저는 축구 선수가 되고 싶어요."],
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be an astronaut.", "저는 우주 비행사가 되고 싶어요."],
				["Great! You can do it.", "멋지다! 너는 할 수 있어."],
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be a painter.", "저는 화가가 되고 싶어요."],
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be a pianist.", "저는 피아니스트가 되고 싶어요."],
				["What do you want to be?", "너는 무엇이 되고 싶니?"],
				["I want to be an announcer.", "저는 아나운서가 되고 싶어요."],
				["Great! You can do it.", "멋지다! 너는 할 수 있어."]
			],
		},
		data_166_s_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.0, 1],
				[3.5, 6.5, 1],
				[7.5, 10.0, 1],
				[11.0, 14.0, 1],
				[14.5, 17.0, 1],
				[18.0, 21.0, 1],
				[21.5, 24.5, 1],
				[25.5, 28.0, 1],
				[28.5, 31.0, 1],
				[32.0, 34.5, 1],
				[35.0, 38.0, 1],
				[39.0, 41.5, 1],
				[42.0, 45.5, 1],
				[46.0, 49.0, 1]
			]
		},
		data_166_s_2_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.0, 1],
				[3.5, 6.5, 1],
				[7.5, 10.0, 1],
				[11.0, 14.0, 1],
				[14.5, 17.0, 1],
				[18.0, 21.0, 1],
				[21.5, 24.5, 1],
				[25.5, 27.0, 1],
				[27.5, 29.5, 1],
				[29.8, 32.0, 1]
			]
		},
		data_166_o_18_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.3, 3.0, 1],
				[3.6, 6.7, 2],
				[7.2, 10.0, 3],
				[10.4, 13.5, 4]
			]
		},


		////////////
		// P - 167
		data_167_o_2_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.0, 1],
				[4.0, 6.5, 1],
				[7.5, 11.0, 1],
				[11.5, 14.5, 1],
				[15.5, 18.5, 1],
				[19.0, 22.0, 1],
				[23.0, 26.0, 1],
				[26.5, 29.5, 1]
			]
		},
		data_167_o_14_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 2.0, 1],
				[3.0, 5.0, 1],
				[5.5, 9.0, 2],
				[10.0, 13.0, 3],
				[13.7, 14.8, 2],
				[16.0, 18.5, 2],
				[19.5, 22.5, 4],
				[23.5, 25.0, 5],
				[26.0, 28.0, 5]
			]
		},

		////////////
		// P - 168
		data_168_s_17_f: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5,	3.0],
				[4.0,	8.5],
				[9.5,	12.5],
				[13.5,	16.5],
				[17.5,	19.5],
				[20.5,	23.0],
				[23.5,	27.5],
				[28.5,	32.5],
				[33.5,	37.5],
				[38.0,	42.0],
				[43.0,	47.0],
				[48.0,	51.7],
				[52.5,	55.0],
				[55.5,	58.0]
			]
		},
		data_168_o_2_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.0, 1],
				[4.0, 8.5, 1],
				[9.5, 12.5, 1],
				[13.5, 16.5, 1],
				[17.5, 19.5, 1]
			]
		},
		data_168_o_8_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 4.0, 1],
				[5.0, 9.0, 1],
				[9.5, 13.5, 1],
				[14.5, 18.0, 1]
			]
		},

		////////////
		// P - 169
		data_169_o_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.0, 1],
				[3.5, 7.5, 1],
				[8.5, 12.5, 1],
				[13.5, 17.5, 1],
				[18.5, 22.0, 1],
				[23.0, 27.0, 1],
				[28.0, 31.5, 1],
				[32.5, 35.0, 1],
				[35.5, 38.0, 1]
			]
		},
		data_169_o_10_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.4, 2.6, 1],
				[3.6, 6.4, 2]
			]
		},
		data_169_s_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.0, 1],
				[3.5, 6.5, 2],
				[7.5, 10.5, 1]
			]
		},

		////////////
		// P - 170
		data_170_o_2_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 2.5, 1],
				[3.0, 6.0, 1],
				[6.5, 8.5, 1],
				[9.0, 12.0, 1],
				[12.5, 16.0, 1],
				[17.0, 21.0, 1],
				[22.0, 25.0, 1],
				[26.0, 29.5, 1],
				[30.5, 32.5, 2],
				[33.0, 36.0, 2],
				[36.5, 40.5, 2],
				[41.0, 45.5, 2]
			]
		},

		////////////
		// P - 171
		data_171_o_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.0, 1],
				[4.0, 7.8, 1],
				[8.7, 12.2, 1],
				[13.1, 16.6, 1],
				[17.6, 21.7, 1],
				[22.6, 26.4, 1]
			]
		},

		////////////
		// P - 172
		data_172_o_2_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.0, 1],
				[4.0, 7.0, 2],
				[8.0, 11.0, 1],
				[11.5, 15.0, 2],
				[16.0, 18.5, 1]
			]
		},
		data_172_o_7_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.5, 1],
				[4.0, 12.5, 2],
				[13.5, 16.0, 1],
				[17.0, 21.5, 2],
				[22.0, 23.0, 1]
			]
		},
		data_172_o_16_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.0, 1],
				[3.5, 6.0, 2],
				[7.0, 10.0, 2],
				[10.5, 12.5, 2],
				[13.0, 16.0, 1],
				[17.0, 20.0, 1],
				[20.5, 22.0, 2],
				[22.5, 24.5, 2]
			]
		},
		data_173_o_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.0, 1],
				[3.5, 7.5, 1],
				[8.0, 12.0, 1],
				[12.5, 17.0, 1],
				[17.5, 21.5, 1]
			]
		},

		////////////
		// P - 173
		data_173_o_6_f: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5,	3.0],
				[3.5,	7.0],
				[7.5,	10.0],
				[11.0,	13.0]
			]
		},
		data_173_o_12: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.0,	5.9]
			]
		},

	}
});