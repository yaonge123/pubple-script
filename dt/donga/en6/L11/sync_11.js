$(document).ready(function(){
	// sync data ↓
	mp_data = {  // MP3 sync
		////////////
		// P - 150
		data_p150_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[5.6, 7.8, 1],
				[8.3, 10.0, 2]
			],
			dialogue: [
				["What can we do for the earth?", "우리는 지구를 위해 무엇을 할 수 있을까?"],
				["We can turn off the water.", "우리는 물을 잠글 수 있어."]
			],
		},
		data_p150_02: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[5.5, 8.7, 1],
				[9.4, 10.5, 2]
			],
			dialogue: [
				["Mom, don’t forget to use a shopping bag.", "엄마, 장바구니를 사용하는 것을 잊지 마세요."],
				["Okay.", "그래."]
			],
		},
		data_150_s_26_a: { // 파일명 - Listen and Say(1)
			subtitle: [
				[0.3, 2.6, 1],
				[3.0, 5.0, 2]
			],
		},
		data_150_s_28_a: { // 파일명 - Listen and Say(2)
			subtitle: [
				[0.4, 3.6, 1],
				[4.0, 5.3, 2]
			],
		},
		data_150_o_11_a: { // 파일명 - 학습목표(1)
			subtitle: [
				[0.4, 3.2, 1],
				[4.2, 6.6, 2]
			]
		},
		data_150_o_13: { // 파일명 - 학습목표(2)
			subtitle: [
				[0.2, 4.0, 1]
			]
		},

		////////////
		// P - 151
		data_p151_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[6.6, 11.9, 1],
				[12.2, 16.1, 2],
				[17.3, 22.5, 1],
				[22.6, 24.4, 3],
				[24.6, 26.6, 3],
				[27.0, 29.8, 4],
				[29.9, 31.1, 4],
				[38.2, 40.8, 1],
				[41.4, 44.3, 4],
				[44.5, 48.9, 2],
				[49.2, 51.8, 4],
				[63.2, 66.9, 3],
				[67.4, 69.7, 5],
				[72.7, 74.5, 3]
			],
			dialogue: [
				["Look at the sky. It’s so dirty.", "하늘을 봐. 하늘이 너무 더러워."],
				["Yes. The penguins are losing their home.", "응. 펭귄들은 집을 잃고 있어."],
				["I feel sad. The earth is very sick.", "나는 슬퍼. 지구가 많이 아파."],
				["We should save the earth.", "우리는 지구를 구해야 해. "],
				["What can we do for the earth?", "우리는 지구를 위해 무엇을 할 수 있을까?"],
				["We can do many things for the earth.", "우리는 지구를 위해 많은 일을 할 수 있단다."],
				["I’ll show you.", "내가 보여 줄게."],
				["We can turn off the lights.", "우리는 불을 끌 수 있어요."],
				["Right. That can save energy.", "그렇지. 그것은 에너지를 절약할 수 있단다."],
				["We can plant trees, too. Trees clean the air.", "우리는 나무도 심을 수 있어요. 나무는 공기를 깨끗하게 해요."],
				["Great. Now it’s green.", "좋아. 환경에 좋은 마을이 되었구나."],
				["Justin, don’t forget to turn off the TV.", "Justin, 텔레비전 끄는 것을 잊지 마."],
				["Okay. Sorry.", "알겠어. 미안해."],
				["We should save energy.", "우리는 에너지를 절약해야 해."]
			],
		},
		data_151_s_1_a: { // 파일명 - Look and Listen(1)
			subtitle: [
				[0.0, 5.0, 1],
				[5.5, 9.2, 2],
				[9.5, 15.0, 1],
				[15.5, 19.5, 3],
				[20.0, 24.5, 4],
				[25.0, 27.5, 1],
				[28.0, 31.0, 4],
				[31.5, 35.5, 2],
				[35.7, 38.5, 4],
				[39.5, 43.0, 3],
				[43.5, 46.0, 5],
				[46.5, 48.5, 3]
			]
		},

		////////////
		// P - 152
		data_p152_01: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[7.4, 10.4, 1],
				[10.6, 12.9, 2],
				[13.7, 18.0, 2],
				[18.7, 20.7, 1],
				[21.4, 24.5, 2],
				[26.0, 28.6, 1],
				[29.5, 31.4, 3],
				[32.2, 34.7, 4],
				[35.5, 38.6, 3],
				[43.9, 48.9, 1],
				[48.9, 53.0, 5],
				[53.3, 54.9, 1],
				[55.0, 58.6, 5],
				[58.9, 61.4, 5],
				[68.1, 71.0, 2],
				[71.0, 72.0, 5],
				[81.0, 83.0, 5],
				[83.1, 84.7, 5],
				[89.1, 92.1, 2],
				[95.9, 97.4, 6]
			],
			dialogue: [
				["Emily, what are you doing?", "Emily, 무엇을 하고 있어?"],
				["I’m making a mask.", "나는 가면을 만들고 있어. "],
				["We’ll do a “Save the Earth” campaign at school.", "우리는 ‘지구 구하기’ 캠페인을 학교에서 할 거야."],
				["Campaign for the earth?", "지구를 위한 캠페인이야?"],
				["That’s right. The earth is sick.", "맞아. 지구가 아프거든."],
				["What can we do for the earth?", "우리는 지구를 위해 무엇을 할 수 있을까?"],
				["We can use a cup.", "우리는 컵을 사용할 수 있어."],
				["We can take short showers, too.", "우리는 샤워를 짧게 할 수도 있어."],
				["Right. We can save water then.", "맞아. 그렇게 하면 물을 절약할 수 있지."],
				["Oh, I know this. It’s for recycling.", "오, 나는 이것을 알아. 그것은 재활용 표시야."],
				["You’re right. We should recycle cans and bottles.", "맞아. 우리는 캔과 병을 재활용해야 해."],
				["I see!", "알겠어!"],
				["Kevin, look! We can recycle paper, too.", "Kevin, 봐! 우리는 종이도 재활용할 수 있어. "],
				["Don’t forget to recycle this box.", "이 상자를 재활용하는 것을 잊지 마."],
				["Let’s pick up these cans.", "자, 캔들을 줍자."],
				["Okay.", "그래. "],
				["Don’t put the bottles there.", "저기에 병을 놓지 마렴. "],
				["You should put them here.", "병은 여기에 놓아야 한단다."],
				["Very good. Here you are!", "정말 잘했어. 여기 받아!"],
				["Thank you!", "고맙습니다!"]
			],
		},
		data_p152_02: { // 파일명 -
			subtitle: [ // 자막싱크([시작시간, 끝시간, 역할번호])
				[1.6, 5.0, 1],
				[8.4, 13.5, 1],
				[14.2, 20.6, 1],
				[21.3, 24.4, 1],
				[26.5, 37.3, 1],
				[38.4, 43.7, 1],
				[45.5, 55.3, 1],
				[57.2, 66.0, 1],
				[66.6, 72.5, 1],
				[73.5, 83.1, 1],
				[85.1, 94.0, 1],
				[94.5, 103.0, 1],
				[103.4, 111.4, 1],
				[113.3, 117.2, 1],
				[117.7, 120.2, 1]
			],
			dialogue: [
				["", "세계의 다양한 환경 캠페인"],
				["", "이야기에서 친구들은 학교에서 환경 캠페인을 했지요?"],
				["", "세계 곳곳에서는 지구의 환경을 보호하려는 다양한 캠페인을 하고 있답니다. "],
				["", "어떤 캠페인을 하는지 알아볼까요?"],
				["", "솔라 스쿨은 학교 지붕에 태양광 판넬을 설치하여, 교실에서 태양 에너지를 바로 사용하도록 하는 환경 캠페인이에요.", -10],
				["", "미국을 비롯한 여러 나라에서 솔라 스쿨의 수를 늘려 나가고 있지요. "],
				["", "솔라 스쿨은 친환경 에너지 사용으로 환경에 도움을 주고, 학생들에게 올바른 환경 보호 인식을 심어 준답니다.", -10],
				["", "친환경 공공 자전거는 사람들이 쉽게 자전거를 이용할 수 있도록 만든 무인 자전거 대여 시스템이에요. ", -10],
				["", "대기 오염이 심해지며 자전거는 친환경 이동 수단으로 주목 받았지요. "],
				["", "파리의 공공 자전거 ‘벨리브’의 성공을 시작으로 런던, 시카고 등 많은 도시에 공공 자전거가 생겨났답니다.", -10],
				["", "녹색 지붕 프로젝트는 건물 지붕이나 옥상에 식물을 심어 에너지를 절약하는 환경 캠페인입니다. ", -10],
				["", "녹색 지붕은 여름철 열을 흡수해 실내 온도를 낮추어, 전기 에너지를 절약하는 데 도움을 준답니다. ", -10],
				["", "또, 녹지로 꾸며진 정원은 사람들이 도심 속에서 휴식을 취할 수 있는 쉼터가 되기도 하지요."],
				["", "여러분이 알고 있는 다른 환경 캠페인이 있나요? "],
				["", "인터넷으로 더 찾아보세요."]
			],
		},
		data_152_s_1_a: { // 파일명 - Look and Say(1)
			subtitle: [
				[0.0, 3.1, 1],
				[3.5, 10.45, 2],
				[10.6, 12.5, 1],
				[12.8, 15.95, 2],
				[16.1, 18.6, 1],
				[19.0, 20.85, 3],
				[21.0, 23.6, 4],
				[24.0, 26.95, 3],
				[27.1, 32.0, 1],
				[32.2, 36.0, 5],
				[36.3, 38.0, 1],
				[38.2, 45.0, 5],
				[45.3, 48.1, 2],
				[48.3, 53.3, 5],
				[53.5, 56.5, 2],
				[56.8, 58.3, 6]
			]
		},

		////////////
		// P - 153
		data_153_s_1_f: { // 파일명 - Think and Talk
			subtitle: [
				[0.5,	3.5],
				[4.0,	7.5],
				[8.5,	11.5],
				[12.0,	14.5],
				[15.0,	18.0],
				[19.0,	21.5],
				[22.0,	25.5],
				[26.0,	29.0],
				[29.5,	33.0],
				[33.5,	36.0],
				[36.5,	39.5],
				[40.0,	43.0]
			]
		},

		////////////
		// P - 154
		data_p154_01: { // data_ + sync ID : 0152_01_a_01
			subtitle: [
				[7.2, 9.7, "1_2_3_4"],
				[10.4, 14.5, 5],
				[15.6, 17.5, 1],
				[18.8, 20.4, 2],
				[22.4, 25.1, 3],
				[26.0, 30.5, 4],
				[40.0, 42.2, "1_2_3_4"],
				[43.4, 47.3, 5],
				[48.0, 50.0, 2],
				[51.6, 54.5, 1],
				[55.0, 58.0, 4],
				[58.5, 63.2, 3]
			],
			dialogue: [
				["Let’s save the earth!", "지구를 구하자!"],
				["What can we do for the earth?", "우리는 지구를 위해 무엇을 할 수 있을까?"],
				["We can use a shopping bag.", "우리는 장바구니를 사용할 수 있어."],
				["We can use a cup.", "우리는 컵을 사용할 수 있어."],
				["We can take short showers.", "우리는 샤워를 짧게 할 수 있어."],
				["Don’t forget to turn off the water!", "물 잠그는 것을 잊지 마!"],
				["Let’s save the earth!", "지구를 구하자!"],
				["What can we do for the earth?", "우리는 지구를 위해 무엇을 할 수 있을까?"],
				["We can plant trees.", "우리는 나무를 심을 수 있어."],
				["We can recycle paper.", "우리는 종이를 재활용할 수 있어."],
				["We can recycle cans and bottles.", "우리는 캔과 병을 재활용할 수 있어."],
				["Don’t forget to turn off the lights!", "불 끄는 것을 잊지 마!"]
			]
		},
		data_p154_01_follow: { // 따라하기파일적용 테스트 용
			subtitle: [
				[7.5, 11.5, "1_2_3_4"],
				[12.6, 22.9, 5],
				[23.6, 28.4, 1],
				[29.6, 34.1, 2],
				[35.9, 43.7, 3],
				[44.2, 54.2, 4],
				[63.4, 67.9, "1_2_3_4"],
				[68.8, 78.1, 5],
				[79.0, 83.9, 2],
				[85.3, 92.3, 1],
				[92.9, 99.9, 4],
				[100.2, 110.0, 3]
			],
			dialogue: [
				["Let’s save the earth!", "지구를 구하자!"],
				["What can we do for the earth?", "우리는 지구를 위해 무엇을 할 수 있을까?"],
				["We can use a shopping bag.", "우리는 장바구니를 사용할 수 있어."],
				["We can use a cup.", "우리는 컵을 사용할 수 있어."],
				["We can take short showers.", "우리는 샤워를 짧게 할 수 있어."],
				["Don’t forget to turn off the water!", "물 잠그는 것을 잊지 마!"],
				["Let’s save the earth!", "지구를 구하자!"],
				["What can we do for the earth?", "우리는 지구를 위해 무엇을 할 수 있을까?"],
				["We can plant trees.", "우리는 나무를 심을 수 있어."],
				["We can recycle paper.", "우리는 종이를 재활용 할 수 있어."],
				["We can recycle cans and bottles.", "우리는 캔과 병을 재활용할 수 있어."],
				["Don’t forget to turn off the lights!", "불 끄는 것을 잊지 마!"]
			]
		},
		data_154_s_1_a: { // 파일멸 - Sing and Read
			subtitle: [
				[0.5, 2.5, 1],
				[3.5, 6.5, 1],
				[7.5, 10.5, 1],
				[11.0, 13.5, 1],
				[14.0, 17.0, 1],
				[17.5, 21.5, 1],
				[22.0, 24.5, 1],
				[25.0, 28.0, 1],
				[29.0, 31.0, 1],
				[31.5, 34.5, 1],
				[35.0, 39.0, 1],
				[39.5, 43.5, 1]
			]
		},
		data_154_s_2_a: { // 파일멸 - Sing and Read
			subtitle: [
				[0.5, 2.5, 1],
				[3.5, 6.5, 1],
				[7.5, 10.5, 1],
				[11.0, 13.5, 1],
				[14.0, 17.0, 1],
				[17.5, 21.5, 1],
				[22.0, 24.0, 1],
				[25.0, 27.5, 1],
				[28.0, 32.0, 1],
				[33.0, 34.5, 1]
			]
		},
		data_154_o_16_a: { // 파일멸 - Sing and Read
			subtitle: [
				[0.5, 3.5, 1],
				[4.5, 8.0, 2],
				[8.5, 11.5, 3],
				[12.0, 14.5, 3],
				[15.5, 17.5, 2]
			]
		},

		////////////
		// P - 15
		data_155_o_2_a: { // 파일명 - Write It
			subtitle: [
				[0.5, 4.0, 1],
				[4.5, 7.5, 1],
				[8.5, 10.5, 1],
				[11.5, 14.5, 1]
			]
		},
		data_155_o_6_a: { // 파일명 - Write It
			subtitle: [
				[0.5, 4.0, 1],
				[5.0, 6.0, 2],
				[7.0, 9.0, 1],
				[10.0, 12.5, 2],
				[13.0, 16.5, 1],
				[17.5, 20.5, 1]
			]
		},

		////////////
		// P - 156
		data_156_s_19_f: { // 파일명 - Let’s Read(전체 듣기)
			subtitle: [
				[0.5,	3.0],
				[3.5,	9.0],
				[9.5,	13.0],
				[13.5,	16.0],
				[17.0,	20.0],
				[20.5,	24.5],
				[25.0,	27.5],
				[28.0,	32.0],
				[33.0,	36.5],
				[37.5,	41.0],
				[41.5,	46.5],
				[47.0,	49.5],
				[50.0,	52.5],
				[53.0,	57.0],
				[58.0,	61.5],
				[62.0,	65.0]
			]
		},

		////////////
		// P - 157
		data_157_s_1_a: { // 파일명 - 창의문항
			subtitle: [
				[0.5, 3.5, 1],
				[4.0, 6.5, 1],
				[7.5, 10.0, 1]
			]
		},

		data_157_o_9_a: { // 파일명 - Read and Check(B)
			subtitle: [
				[0.5, 3.5, 1],
				[4.0, 7.0, 1],
				[8.0, 12.0, 1],
				[12.5, 15.5, 1],
				[16.0, 19.5, 1],
				[20.0, 22.5, 2]
			]
		},

		////////////
		// P - 18
		data_158_o_2_a_1: { // Step 1(Soccer Club)
			subtitle: [
				[0.5, 4.0, 1],
				[4.5, 6.5, 1],
				[7.0, 10.0, 1],
				[10.5, 13.0, 1],
				[13.5, 17.4, 1],
				[17.9, 22.3, 1],
				[23.0, 25.5, 1]
			]
		},

		////////////
		// P - 19
		data_159_o_1_a: { // 파일명 - Step 4
			subtitle: [
				[0.5, 3.0, "1_2"],
				[4.0, 7.0, 1],
				[7.5, 10.0, 2],
				[10.5, 13.5, 3],
				[14.5, 18.0, 4],
				[18.5, 23.0, "3_4"]
			]
		},

		////////////
		// P - 20
		data_160_o_2_f: { // 파일명 - Review(A)
			subtitle: [
				[0.5,	4.5],
				[5.5,	7.5],
				[8.0,	11.0],
				[11.5,	14.5],
				[15.0,	18.5],
				[19.5,	26.0],
				[27.0,	28.0]
			]
		},
		data_160_o_9_a: { // 파일명 - Review(B)
			subtitle: [
				[0.5, 4.5, 1],
				[5.5, 11.0, 2],
				[12.0, 13.0, 1],
				[14.0, 17.5, 2]
			]
		},
		data_160_o_13_a: { // 파일명 - Review(B)
			subtitle: [
				[0.0, 3.2, 1],
				[3.8, 6.3, 1],
				[6.8, 9.6, 1],
				[10.3, 13.2, 1]
			]
		},
		data_160_o_17_a: { // 파일명 - Review(C)
			subtitle: [
				[0.2, 3.4, 1],
				[4.0, 7.0, 1],
				[8.0, 11.0, 1],
				[12.0, 15.0, 1],
				[16.0, 20.0, 1],
				[21.0, 24.0, 1]
			]
		},
		data_161_o_1_a: { // 파일명 - Review(D)
			subtitle: [
				[0.5, 2.0, 1],
				[3.0, 4.5, 2],
				[5.0, 7.5, 2],
				[8.0, 10.5, 1],
				[11.0, 13.5, 1],
				[14.0, 16.0, 2],
				[16.2, 19.0, 1]
			]
		},

		////////////
		// P - 21
		data_161_o_7_f: { // 파일명 - Review(E1)
			subtitle: [
				[0.5,	3.0],
				[4.0,	7.5],
				[8.5,	11.5],
				[12.0,	13.5]
			]
		},
		data_161_o_13_a: { // 파일명 - Review(E1)
			subtitle: [
				[0.0, 3.4, 1],
				[3.6, 6.4, 1],
				[6.6, 10.0, 1]
			]
		},
		data_161_o_17: { // 파일명 - Review(E1)
			subtitle: [
				[0.5,	3.4]
			]
		}
	}
});