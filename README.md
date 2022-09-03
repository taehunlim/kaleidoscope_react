# kaleidoscope effect

1. Image에서 색을 추출
2. 추출한 색을 통해서 canvas를 통해 사각형을 그림
3. canvas에 그려진 사격형 rotate로 돌려서 원하는 effect를 만듬

## 고려 사항
- [x] canvas에 transition을 넣어서 그려지는 느낌주기
- [x] Image 슬라이드로 교체 하기
- [x] 반응형은 고려하지 않음. 대신, 처음 이미지 로드시 viewSize를 가져와서 사이즈를 조절

## 문제
- [x] transition 효과 => setTimeout을 사용
- [x] canvas가 다 그려지기 전에 Image를 교체시 이전 이미지의 canvas가 남아 있는 현상 => 이전 Image에 대한 setTimeout이 유효하기 때문에 나타남. 따라서, 이전 Image가 있을 경우에 새 Image load시 이전 setTimeout clear를 시킴으로 해결