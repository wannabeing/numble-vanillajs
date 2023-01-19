# 넘블 바닐라JS 챌린지

**Express**를 사용한 서버사이드 웹 사이트입니다.
<br>

---

## 🌐 프로젝트 링크

[클릭](http://175.45.201.161/)하시면 이동합니다.

---

## 🚀 개발환경

- **프론트엔드**: HTML5, SASS, PUG
- **백엔드**: NodeJS, Express
- **배포**: NaverCloud, Ubuntu
- **라이브러리**: npm, webpack, babel, pm2 등

---

## 📦 프로젝트 구조

    src
    ├── apis                # 백엔드 API 요청 및 결과반환
    ├── controllers         # 사용자 요청/응답 처리 폴더
    └── frontend            # static 폴더
        └── js              # js 폴더 (프론트에서 사용되는 자바스크립트)
        └── scss            # sass 폴더
    ├── routers             # 사용자 요청에 따른 라우터 처리 폴더
    ├── utils               # 서버에서 사용되는 자바스크립트
    ├── views               # PUG 뷰 엔진 템플릿 폴더
    └── server.js           # express 서버 파일

---

## ⚙️ 기능

- **글**

  - 글 생성, 수정, 삭제

- **댓글**

  - 댓글 생성, 삭제

---

## ⏱️ 앞으로 추가할 수 있는 기능

    - mongoDB를 통해 사용자 모델 추가

---

## 🎞 상세 페이지 정보

<details>
<summary> 메인 페이지 </summary>

> ![](https://velog.velcdn.com/images/wannabeing/post/51c886eb-698f-4f09-b383-a5ba1f48e302/image.png)

</details>
<details>
<summary> 글 생성 페이지 </summary>

> ![](https://velog.velcdn.com/images/wannabeing/post/79ea48d6-58db-4f92-be38-b323f6774677/image.png)

</details>
<details>
<summary> 글 상세 페이지 </summary>

> ![](https://velog.velcdn.com/images/wannabeing/post/9c3e1a26-8b8a-4d4f-bb03-a78380338a23/image.png)

</details>
<details>
<summary> 글 수정 페이지 </summary>

> ![](https://velog.velcdn.com/images/wannabeing/post/611dfce4-0985-4554-84a9-f2698ff6db15/image.png)

</details>

---

## 👩‍💻 느낀 점

- 기존에 했었던 기술들로 프로젝트를 진행해서 수월하였다. 다시 복습하는 시간이 될 수 있었다. 😎
- 배포를 네이버클라우드를 통해 해봤는데, 굉장히 편했다. 자료들이 없어서 헤매긴 했지만.. ㅎㅎ
- pm2를 이용해 무중단 서비스를 구축해보았다. 이렇게 편한걸 알았으면 진작에 할껄.. 이라는 생각이 들 정도로 좋은 경험이었다.

- **아쉬웠던 점은**, 다른 분들의 코드를 보면서 SPA라는 개념을 내가 제대로 이해하지 못하고 프로젝트를 구축한 것 같다. <br>
나 같은 경우에는 Express 뷰 엔진을 사용하였고, PUG를 사용하였다. 미리 베이스파일(PUG)을 만들어두고,<br>
Express 라우팅을 통해 각 URL 요청에 따라 `베이스파일+라우팅에 따른 파일(PUG)`을 사용자에게 응답했다.<br>
그렇기 때문에 `views`라는 폴더가 생겼고, 그 안에 많은 뷰 템플릿들이 있었다.<br>
좀 더 검색해보고, 고민했으면 더욱 SPA스럽게 만들 수 있지 않았을까하는 생각이 들었다.<br>
'기존에 했던 기술을 사용하면 되겠다'라는 안일한 생각으로 프로젝트를 진행한 것 같았다.<br>

