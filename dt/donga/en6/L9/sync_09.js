$(document).ready(function(){
	// sync data ↓
	mp_data = {  // MP3 sync
		////////////
		// P - 122
		data_122_o_7_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.0, 1.6, 1],
				[2.0, 4.6, 2],
				[5.5, 7.4, 1],
				[8.2, 12.0, 2]
			]
		},
		data_122_o_11: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.4, 2.0, 1],
			]
		},
		data_122_s_28_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.4, 1.5, 1],
				[2.2, 4.7, 2]
			]
		},
		data_122_s_30_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.4, 2.4, 1],
				[3.0, 7.2, 2]
			]
		},
		data_p122_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[7.6, 9.1, 1],
				[10.2, 12.8, 2]
			],
			dialogue: [
				["Who is older?", "누가 더 나이가 많아?"],
				["Jiho is older than Suji.", "지호가 수지보다 나이가 더 많아."],
			],
		},
		data_p122_02: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[11.0, 13.2, 1],
				[14.3, 20.9, 2]
			],
			dialogue: [
				["China is bigger than Russia.", "중국이 러시아보다 더 커."],
				["I don’t think so. Russia is bigger than China.", "난 그렇게 생각하지 않아. 러시아가 중국보다 더 커."],
			],
		},
		////////////
		// P - 123
		data_123_s_1_a_2: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.4, 6.7, 1],
				[7.0, 11.0, 2],
				[11.3, 14.0, 1],
				[14.4, 18.6, 2],
				[18.9, 21.8, 3],
				[22.2, 26.0, 1],
				[26.3, 30.4, 2],
				[30.6, 35.1, 4],
				[35.6, 38.1, 1],
				[38.3, 41.3, 2],
				[41.6, 45.4, 4],
				[45.6, 48.7, "1,2"]
			]
		},
		data_p123_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[3.0, 4.9, 1],
				[7.2, 9.0, 1],
				[9.2, 10.5, 1],
				[11.3, 15.0, 2],
				[17.7, 20.1, 1],
				[21.0, 24.9, 2],
				[29.6, 32.2, 3],
				[34.6, 38.0, 1],
				[39.0, 42.7, 2],
				[56.9, 61.0, 4],
				[61.6, 63.9, 1],
				[64.5, 67.1, 2],
				[76.2, 79.5, 4],
				[81.6, 84.3, "1_2"]
			],
			dialogue: [
				["I like this Sport Park!", "나는 이 스포츠 공원이 좋아!"],
				["Look at Lucy and Hana.", "Lucy와 하나를 봐."],
				["What are they doing?", "그들은 무엇을 하고 있니?"],
				["They’re having a race. Who is faster?", "그들은 경주를 하고 있어. 누가 더 빠르니?"],
				["Lucy is faster than Hana.", "Lucy가 하나보다 더 빨라."],
				["No, look! Hana is faster than Lucy now.", "아니야, 봐! 이제 하나가 Lucy보다 더 빨라."],
				["Yeah! I won the race!", "와! 내가 경주에서 이겼다."],
				["I’m taller than you. I’ll win this game.", "나는 너보다 키가 더 커. 내가 이 경기를 이길 거야."],
				["I don’t think so. I can jump higher!", "나는 그렇게 생각하지 않아. 내가 더 높이 점프할 수 있어!"],
				["Harry, Junho, get up! Who is stronger?", "Harry, 준호, 일어나! 누가 더 힘이 세니?"],
				["I’m stronger than Junho!", "나는 준호보다 더 힘이 세!"],
				["No, I’m stronger than you.", "아니, 내가 너보다 더 힘이 세."],
				["Ha ha, it’s not heavy. Look at me!", "하하, 이건 무겁지 않아. 날 봐!"],
				["Wow, you’re so strong!", "와, 너는 정말 힘이 세구나!"]
			],
		},

		////////////
		// P - 124
		data_124_s_1_a_2: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.1, 2.9, 1],
				[3.3, 8.6, 2],
				[9.0, 12.5, 3],
				[12.8, 15.6, 1],
				[16.2, 18.1, 4],
				[18.4, 21.8, 2],
				[22.0, 26.0, 3],
				[26.5, 28.2, 3],
				[28.5, 32.0, 4],
				[32.3, 34.5, 2],
				[34.8, 38.1, 3],
				[38.4, 42.7, 2],
				[43.2, 46.5, 1]
			]
		},
		data_p124_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[10.0, 12.8, 1],
				[13.1, 18.1, 2],
				[18.4, 21.9, 3],
				[21.9, 24.8, 1],
				[35.3, 37.0, 4],
				[37.3, 40.4, 2],
				[40.6, 44.4, 3],
				[51.6, 53.0, 3],
				[57.3, 60.8, 4],
				[68.2, 70.3, 2],
				[70.5, 73.5, 3],
				[74.1, 76.5, 2],
				[78.8, 80.8, 2],
				[84.3, 87.4, 1]
			],
			dialogue: [
				["Welcome to the Science Mystery!", "과학 미스터리에 온 것을 환영한다!"],
				["It looks interesting. Do you like science, Tao?", "이것은 재미있어 보인다. 너는 과학을 좋아하니, Tao?"],
				["Yes, I do. Let’s try this.", "응, 좋아해. 이것을 해 보자."],
				["Good. Come in, please.", "좋아. 어서 들어오렴."],
				["Which is bigger?", "어떤 것이 더 클까?"],
				["Venus is bigger than Earth.", "금성이 지구보다 더 커."],
				["No. Venus is smaller than Earth.", "아니야. 금성은 지구보다 더 작아."],
				["Which is heavier?", "어떤 것이 더 무거울까?"],
				["The lion is heavier than the panda.", "사자가 판다보다 더 무거워."],
				["Which is longer?", "어떤 것이 더 길까?"],
				["The red line is longer than the blue line.", "빨간 선이 파란 선보다 더 길어."],
				["I don’t think so.", "난 그렇게 생각하지 않아."],
				["They’re the same.", "그것들은 길이가 같아."],
				["Congratulations! You win!", "축하한다! 너희가 우승이야!"]
			],
		},
		data_p124_02: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[1.5, 5.1, 1],
				[8.3, 13.6, 1],
				[14.4, 19.7, 1],
				[20.5, 23.6, 1],
				[26.2, 30.6, 1],
				[32.0, 38.6, 1],
				[39.5, 42.3, 1],
				[43.3, 50.0, 1],
				[52.0, 58.2, 1],
				[59.2, 62.3, 1],
				[63.1, 68.7, 1],
				[70.0, 77.6, 1],
				[78.5, 85.4, 1],
				[87.5, 93.6, 1],
				[94.2, 96.4, 1]
			],
			dialogue: [
				["", "영미권 나라의 길이와 무게의 단위"],
				["", "이야기에서 친구들은 무게와 길이에 관한 퀴즈를 풀었지요?"],
				["", "영미권 나라에서는 길이와 무게를 재는 단위가 우리와 다르답니다."],
				["", "어떻게 다른지 함께 알아볼까요?"],
				["", "영미권에서는 길이를 잴 때 피트(feet)를 사용해요."],
				["", "성인 남자의 발 사이즈를 기준으로 한 1피트는 약 30cm예요."],
				["", "키를 나타낼 때 피트를 쓰지요."],
				["", "사진에서 여자아이의 키가 5피트면, 150cm겠지요?"],
				["", "영미권에서는 무게를 잴 때 온스(ounce)와 파운드(lb - pound)를 단위로 사용해요."],
				["", "1온스는 약 28g이에요."],
				["", "사진의 버터는 4온스로, 약 112g이랍니다."],
				["", "파운드는 온스보다 무거운 단위로, 1파운드는 약 0.45kg이에요."],
				["", "사진의 아령은 하나에 2파운드이므로 약 0.9kg이겠지요?"],
				["", "여러분이 이 밖에 알고 있는 영미권 나라의 길이와 무게의 단위가 있나요?"]
			],
		},

		////////////
		// P - 125
		data_125_s_1_f: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5,	2.0],
				[2.7,	5.5],
				[6.5,	8.0],
				[9.5,	14.0],
				[14.5,	16.5],
				[17.0,	21.0],
				[22.0,	23.5],
				[24.5,	28.5],
				[29.5,	31.5],
				[32.5,	35.5]
			]
		},

		////////////
		// P - 126
		data_126_s_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 2.0, 1],
				[2.5, 6.0, 1],
				[6.5, 8.5, 1],
				[9.0, 12.5, 1],
				[13.0, 15.0, 1],
				[15.5, 19.0, 1],
				[19.5, 21.5, 1],
				[22.5, 26.0, 1],
				[26.5, 28.5, 1],
				[29.5, 33.0, 1],
				[34.0, 36.0, 1],
				[37.0, 40.5, 1]
			]
		},
		data_126_s_2_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 2.0, 1],
				[2.5, 6.0, 1],
				[6.5, 8.5, 1],
				[9.0, 12.5, 1],
				[13.0, 15.0, 1],
				[15.5, 19.0, 1],
				[20.0, 21.5, 1],
				[22.0, 23.5, 1],
				[23.6, 25.0, 1],
				[25.2, 27.0, 1],
				[27.5, 29.0, 1],
				[29.5, 31.5, 1]
			]
		},
		data_126_o_16_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 2.0, 1],
				[3.0, 5.5, 1],
				[6.0, 8.5, 1],
				[9.5, 12.5, 1]
			]
		},
		data_p126_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[7.3, 10.0, 1],
				[10.3, 14.0, 2],
				[14.3, 17.0, 1],
				[17.4, 21.3, 2],
				[21.4, 24.0, 1],
				[24.5, 28.1, 2],
				[35.6, 38.0, 3],
				[38.7, 42.3, 2],
				[42.7, 45.0, 3],
				[45.7, 49.3, 2],
				[49.7, 52.1, 3],
				[52.7, 57.0, 2]
			],
			dialogue: [
				["Who is taller?", "누가 더 키가 큰가요?"],
				["My sister is taller than me.", "누나가 저보다 키가 더 커요."],
				["Who is faster?", "누가 더 빠른가요?"],
				["My sister is faster than me.", "누나가 저보다 더 빨라요."],
				["Who is stronger?", "누가 더 힘이 센가요?"],
				["My sister is stronger than me.", "누나가 저보다 더 힘이 세요."],
				["Which is bigger?", "어떤 것이 더 큰가요?"],
				["The bus is bigger than the taxi.", "버스가 택시보다 더 커요."],
				["Which is longer?", "어떤 것이 더 긴가요?"],
				["The bus is longer than the taxi.", "버스가 택시보다 더 길어요."],
				["Which is heavier?", "어떤 것이 더 무거운가요?"],
				["The bus is heavier than the taxi.", "버스가 택시보다 더 무거워요."],
			],
		},
		data_p126_01_follow: { // 따라하기파일적용 테스트 용
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[7.4, 13.4, 1],
				[13.8, 21.3, 2],
				[21.8, 27.5, 1],
				[27.9, 35.6, 2],
				[35.9, 41.5, 1],
				[41.9, 49.5, 2],
				[57.0, 62.2, 3],
				[62.8, 70.5, 2],
				[70.9, 76.2, 3],
				[76.8, 84.3, 2],
				[84.9, 90.3, 3],
				[91.0, 100.1, 2]
			],
			dialogue: [
				["Who is taller?", "누가 더 키가 큰가요?"],
				["My sister is taller than me.", "누나가 저보다 키가 더 커요."],
				["Who is faster?", "누가 더 빠른가요?"],
				["My sister is faster than me.", "누나가 저보다 더 빨라요."],
				["Who is stronger?", "누가 더 힘이 센가요?"],
				["My sister is stronger than me.", "누나가 저보다 더 힘이 세요."],
				["Which is bigger?", "어떤 것이 더 큰가요?"],
				["The bus is bigger than the taxi.", "버스가 택시보다 더 커요."],
				["Which is longer?", "어떤 것이 더 긴가요?"],
				["The bus is longer than the taxi.", "버스가 택시보다 더 길어요."],
				["Which is heavier?", "어떤 것이 더 무거운가요?"],
				["The bus is heavier than the taxi.", "버스가 택시보다 더 무거워요."],
			],
		},

		////////////
		// P - 127
		data_127_o_2_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 4.5, 1],
				[5.5, 10.0, 1],
				[10.5, 14.0, 1]
			]
		},
		data_127_o_5_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 2.5, 1],
				[3.5, 6.0, 2],
				[6.5, 9.0, 1],
				[9.5, 15.0, 2]
			]
		},

		////////////
		// P - 128
		data_128_s_15_f: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5,	2.5],
				[3.0,	6.5],
				[7.5,	10.5],
				[11.5,	16.5],
				[17.0,	22.5],
				[23.0,	27.5],
				[28.5,	32.5],
				[33.5,	38.0],
				[39.0,	41.5],
				[42.0,	44.5],
				[45.5,	49.5],
				[50.5,	53.5],
				[54.5,	59.5]
			]
		},
		data_128_o_2_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.2, 2.5, 1],
				[3.0, 6.5, 1],
				[7.0, 10.5, 2],
				[11.0, 16.5, 3],
				[17.0, 22.5, 3],
				[23.0, 27.5, 3]
			]
		},
		data_128_o_9_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 5.5, 1],
				[6.5, 11.5, 1],
				[12.5, 17.0, 1],
				[18.0, 22.0, 1]
			]
		},

		////////////
		// P - 129
		data_129_o_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 4.5, 3],
				[5.5, 10.0, 3],
				[11.0, 13.5, 3],
				[14.5, 16.5, 3],
				[17.5, 21.5, 3],
				[22.5, 25.5, 3],
				[26.0, 31.5, 2]
			]
		},
		data_129_o_11_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 2.5, 1],
				[3.0, 7.0, 2],
				[7.5, 9.5, 1],
				[10.5, 14.0, 2],
				[14.5, 17.0, 1],
				[17.5, 21.5, 2],
				[22.0, 24.5, 1],
				[25.5, 29.0, 2]
			]
		},
		data_129_s_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.6, 4.4, 1],
				[5.2, 9.0, 1]
			]
		},

		data_130_o_2_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 2.0, 1],
				[3.0, 6.0, 1],
				[6.5, 12.0, 1],
				[12.5, 16.5, 1],
				[17.5, 22.0, 1]
			]
		},
		////////////
		// P - 131
		data_131_o_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 3.2, 1],
				[4.0, 8.4, 1],
				[9.3, 13.8, 1],
				[14.5, 19.0, 1],
				[19.5, 24.0, 1],
				[24.6, 27.5, 1],
				[28.0, 31.3, 1]
			]
		},

		////////////
		// P - 132
		data_132_o_2_f: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5,	2.0],
				[3.0,	6.0],
				[7.0,	8.5],
				[9.5,	14.0],
				[15.0,	22.0],
				[22.5,	24.5],
				[25.5,	28.5]
			]
		},
		data_132_o_9_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 5.5, 1],
				[6.5, 10.0, 2],
				[11.0, 14.0, 1],
				[14.5, 16.5, 2],
				[17.5, 20.5, 1],
				[21.0, 27.5, 2]
			]
		},
		data_132_o_19_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.2, 4.5, 1],
				[5.5, 9.5, 1],
				[10.0, 14.5, 1],
				[15.0, 19.5, 1]
			]
		},
		data_133_o_1_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 2.5, 1],
				[3.0, 8.0, 2],
				[8.5, 10.5, 1],
				[11.0, 14.0, 2]
			]
		},
		data_132_o_15_a: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5, 4.0, 1],
				[4.5, 8.5, 1],
				[9.0, 12.5, 1],
				[13.0, 16.5, 1]
			]
		},

		///////////
		// P - 132
		data_133_o_5_f: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.5,	2.5],
				[3.0,	7.0],
				[7.5,	10.0],
				[11.0,	15.5]
			]
		},
		data_133_o_15: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[0.0,	6.0]
			]
		},
	}
});