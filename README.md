# Seoul Mate

# Project Member

| 이름   | 역할                  |
| ------ | --------------------- |
| 박지수 | 프론트엔드            |
| 조원일 | 프론트엔드            |
| 선혜주 | 인공지능/중간 발표    |
| 임동현 | 인공지능              |
| 홍지운 | 백엔드                |
| 이상원 | 백엔드/팀장/최종 발표 |

# 기술 스택

| Position                | Languages & Tools    |
| ----------------------- | -------------------- |
| Frontend                | ReactJS              |
| Backend                 | NestJS<br>MySQL      |
| Artificial intelligence | Python<br>Tensorflow |

# 협업 도구

-   Gitlab: 프로젝트 코드 저장소, webhook을 이용해 Merge Request 발생 시 discord 푸시 사용
-   Discord: 팀 공지사항, 아이디어 회의, Merge Request 발생 확인
-   Figma: 디자인 회의, 아이디어 회의, 스크럼에 활용

# 애자일 방법론: scrum

-   화 ~ 토 오전 10시 scrum 진행
-   각자 개발하고 있는 부분의 진행도를 공유

# 기획 의도

## 서비스 목표

코로나 19의 완화로 국외 여행길이 열리면서 외국인 관광객이 증가할 것으로 예상됩니다. 단순히 여행객들이 랜드마크에서 사진만 찍고 끝나는 것이 아닌 랜드마크의 정보를 제공하고, 랜드마크 방문 시 스탬프를 찍어 여행을 게임처럼 재밌게 느낄 수 있는 경험을 제공합니다.

Seoul Mate는 한국의 랜드마크를 방문, 스탬프를 얻어 여행 레벨을 높일 수 있습니다. 게임의 퀘스트를 진행하는 느낌을 주며, 다양한 랜드마크에 방문할 수 있는 기회를 제공합니다.

[[연합뉴스] "다시 한국으로"...끊어진 외국인 관광객 유치 총력전](https://www.yna.co.kr/view/MYH20220525016900641)

## 서비스의 콘텐츠

### 랜드마크 예측: 메인 기능

Seoul Mate에서는 랜드마크의 사진을 찍어 업로드 하게 되면 어떤 랜드마크인지 알려줍니다. 랜드마크에 대한 주소, 카테고리, 설명을 얻을 수 있습니다.

### 스탬프와 경험치: 서브 기능

Seoule Mate에서는 랜드마크를 방문 후 사진을 찍어 기록할 수 있습니다. 사용자는 사진을 찍어 어떤 랜드마크인지 알 수 있으며, 스탬프로 기록됩니다. 사용자는 사진을 찍은 후 게시글에 공유할 수 있습니다.

스탬프를 기록하면 경험치가 오르고 경험치에 따른 등급이 주어지게 됩니다. 게시글을 작성하면 추가 경험치를 얻을 수 있습니다.

### 서울에 어떤 랜드마크가 있을까?: 서브 기능

Seoul Mate의 메인 페이지에서는 서울에 어떤 랜드마크가 있는지 지도에 나타내 줍니다. 사용자는 주변에 어떤 랜드마크가 있는지 알 수 있습니다.

# 사용된 데이터와 인공지능 모델

## 시용한 데이터

-   [AI 허브 랜드마크 이미지](https://aihub.or.kr/aidata/8009)

    > 인공지능 기반의 컴퓨터 비전 기술 및 서비스 개발에 활용하기 위해 국내 특성(지리 공간적, 기능적)이 반영된 국내 도심 민간건물, 공공기관, 관광명소, 편의시설 등 국내 도시별 주요 랜드마크 이미지 데이터 구축(출처: AI허브)

-   데이터셋 Training 폴더 구조

```
├─[원천]서울특별시_001
│  ├─3.1독립선언기념탑
│  ├─4.19학생혁명기념탑
│  ├─경복궁
│  └─ ...
├─[원천]서울특별시_002
│  ├─동십자각
│  ├─망원정지
│  ├─명동성당
│  └─ ...
│ ...
├─[라벨]서울특별시
│  └─서울특별시
│      ├─150년수령느티나무
│      ├─3.1독립선언기념탑
│      ├─4.19학생혁명기념탑
│      └─ ...

```

-   annotation 파일

```
{
    "info": {
        "description": "2020 landmark Dataset",
        "url": "https://aihub.or.kr/aidata/8009",
        "version": "1.0",
        "year": 2020
    },
    "licenses": [
        {
            "possession": "PCN컨소시엄",
            "id": 1
        }
    ],
    "images": [
        {
            "license": 1,
            "file_name": "3.1독립선언기념탑_039_41544868.jpg",
            "width": 4032,
            "height": 2268,
            "image_id": 41544868
        }
    ],
    "annotations": [
        {
            "type": "Bounding box",
            "category_id": 15919,
            "bbox": [
                1115.06,
                768.19,
                3113.64,
                1877.7
            ],
            "image_id": 41544868,
            "id": "41544868_1",
            "truncated": "0",
            "hidden": "0",
            "light_reflex": "0",
            "na": "1"
        }
    ],
    "categories": [
        {
            "id": 15919,
            "name": "3.1독립선언기념탑",
            "supercategory": "지역상징성",
            "metainfo": {
                "location1": "서울특별시",
                "location2": "서대문구",
                "Type1": "지역상징성",
                "Type2": "기념비",
                "name_kr": "3.1독립선언기념탑",
                "add": "서울특별시 서대문구 현저동 101"
            }
        }
    ]
}
```

## 데이터 전처리

### 데이터 선별

데이터 셋에 아파트나 상가 건물과 같은 주요 랜드마크로 볼 수 없는 것들은 제외하고 관광지 위주의 랜드마크를 선정했습니다.

ex) 제거한 데이터셋

-   라온

    ![image](https://user-images.githubusercontent.com/55024771/194926625-fbc5b77e-27bb-4d63-bca3-fff9a3a9cf7f.png)


<br>

-   메트로팜

    ![image](https://user-images.githubusercontent.com/55024771/194926768-559f5e64-ea29-4c6e-bca0-6c94c13a9283.png)


<br>

-   카이스트 서울캠퍼스

    ![image](https://user-images.githubusercontent.com/55024771/194926849-c088f76a-aa5b-486a-b503-ca1a6e968b44.png)


### 노이즈 제거

ex) 돌담 위주의 이미지로 구성된 `서울 한양 도성` 클래스에서 간판 이미지는 노이즈라 판단하여 제거했습니다.

-   정상 이미지

    ![image](https://user-images.githubusercontent.com/55024771/194926902-2d61f793-0cac-42ed-bc59-3b05a325c5b3.png)


<br>

<br>

-   노이즈

    ![image](https://user-images.githubusercontent.com/55024771/194926986-132ac773-e1d0-4b7d-b773-7cbceb82330e.png)

### EDA

-   클래스 개수: 112개

-   클래스 별 이미지 개수

    Min: 69, Max: 263, Mean: 147

    ![image](https://user-images.githubusercontent.com/55024771/194927103-42437e8b-4161-4038-9355-bafc37d82330.png)

## 인공지능 모델

### YOLO: object detection

랜드마크를 예측하는 인공지능 모델은 `YOLO`모델을 사용합니다. 모델의 inference 속도를 고려해 one stage detector로 실험을 진행합니다. 랜드마크를 object detection을 사용하여 boundary box를 예측, 하나의 랜드마크 객체를 탐지합니다.

# 프로젝트 구조

## 데이터베이스 구조도

![스크린샷 2022-06-10 오후 11 35 45](https://user-images.githubusercontent.com/55802893/173089023-c08de090-9c8d-4d7e-97d3-a117cd58ad94.png)

# 와이어 프레임

[Figma url](https://www.figma.com/file/Lj4EZbN2ulqhSmT0cPGU0O/Elice-AI-Project-team-7?node-id=157%3A1148)
