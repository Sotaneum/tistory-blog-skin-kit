# Tistory Blog Skin Kit

간단하게 Tistory 블로그 스킨을 만들기 위한 환경 세팅입니다.

- Bun.sh 기반 환경
- Vite + Typescript 기반

## Getting Started

상단의 **Use this template** 버튼을 클릭합니다.

저장소를 Clone하고 디펜던시를 설치합니다.

```bash
bun install
```

### 개발용 스크립트

- `bun run dev`은 dev 서버를 실행하여 작업된 결과물을 볼 수 있습니다. 단, `https://localhost:{port}/skin.html` 으로 접속해야 정상적으로 표시됩니다.
- `bun run build`은 작업된 결과물을 Tistory Blog 포맷에 맞춰 구성합니다.
- `bun run xml`은 `package.json`를 분석하여 스킨 정보인 index.xml 파일을 구성합니다.
- `bun run preview`은 작업된 결과물을 vite 서버로 실행합니다.

### 구조

| 이름                | 내용                                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| build/create-xml.js | `package.json`를 분석하여 `index.xml` 파일을 구성하는 파일입니다.                                                                                                                                                                                 |
| public              | 블로그 스킨에 대한 스크린샷 파일을 담기 위한 공간입니다.                                                                                                                                                                                          |
| src                 | 블로그에 필요한 css, ts 파일을 담기 위한 공간입니다.                                                                                                                                                                                              |
| skin.html           | 스킨을 위한 HTML 파일입니다. ts 파일을 src 폴더에서 import 해야만, 빌드에 자바스크립트 코드가 포함됩니다.                                                                                                                                         |
| package.json        | index.xml 구성을 위한 정보를 여기에서 수집됩니다. 지원되는 값은 [티스토리 가이드](https://tistory.github.io/document-tistory-skin/common/index.xml.html)를 참고하세요. `package.json`에 `xml` 키값을 추가하여 `key:value` 형태로 관리하게 됩니다. |
