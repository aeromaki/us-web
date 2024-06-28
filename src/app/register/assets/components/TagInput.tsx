import { useState, Dispatch, SetStateAction, useCallback } from "react";
import { Searcher } from "fast-fuzzy";

import RegisterComponent from "./_RegisterComponent";

const tagList = ["NLP(자연어 처리)","개발","컴퓨터과학","프로그래밍 언어","인공지능","머신러닝","데이터 과학","텍스트 마이닝",
    "로봇공학","사물인터넷","블록체인","암호화폐","자율주행","항공우주","드론","천문학","물리학","화학","생물학","지질학","시스템 구축",
    "엔비디아 (주식)","온톨로지","가벼운 글쓰기","창작 글쓰기","시 쓰기","소설 읽기","그림 그리기","페인팅","공예","도예","조각",
    "명화 감상","사진 찍기","영상촬영","비디오 편집","포토샵","연극","뮤지컬","오페라","영화","애니메이션","그래픽 디자인","웹 디자인",
    "패션 디자인","인테리어 디자인","산업디자인","UX/UI 디자인","블로그 작성","카피라이팅","검정치마","락","블루스","재즈","클래식 감상",
    "흑인 음악","인디밴드","프랑스 힙합","피아노 연주","기타 (악기)","베이스 기타","음악 감상","음향장비","커트 코베인","혁오","건강",
    "피트니스","다이어트","요가","마인드풀니스","명상","달리기","수영","등산","사이클링","스포츠 시청","필라테스","무술","킥복싱","복싱",
    "레슬링","유도","태권도","검도","펜싱","역도","크로스핏","트라이애슬론","마라톤","게임","비디오 게임","보드 게임","모바일 게임","캠핑",
    "백패킹","러닝","하이킹","피크닉","스케이트보드","롤러스케이트","아이스 스케이팅","스키","스노보드","승마","서핑","스쿠버 다이빙",
    "스노클링","윈드서핑","카약","낚시","사냥","체스","바둑","퍼즐","수수께끼","퀴즈","카드 게임","여행","세계 여행","로드 트립",
    "문화 탐방","미식 여행","배낭여행","캠핑카 여행","크루즈 여행","기차 여행","자전거 여행","도보 여행","여행 사진","여행 블로그",
    "여행 가이드","여행 계획","호텔 리뷰","맛집 탐방","커피","차","요리","베이킹","와인","맥주","술","와인 테이스팅","커피 테이스팅",
    "초콜릿 테이스팅","치즈 테이스팅","맥주 양조","와인 양조","커피 로스팅","음료 믹싱","바텐딩","차 문화","와인 문화","술 문화",
    "음식 문화","세계 요리","한식","중식","일식","이탈리아 요리","프랑스 요리","인도 요리","태국 요리","멕시코 요리","브라질 요리",
    "스페인 요리","지중해 요리","역사","철학","심리학","경제학","사회학","정치학","종교학","신화","전설","민담","리더십","자기 계발",
    "시간 관리","목표 설정","생산성","팀워크","커뮤니케이션","프레젠테이션","협상","갈등 해결","문제 해결","창의력","혁신","디자인 씽킹",
    "민속학","문화유산","전통 공예","지역 사회 활동","봉사 활동","기부","정치 참여","인권 운동","페미니즘","성 소수자 권리","소수자 보호",
    "평화 운동","환경 운동","사회적 기업","내 사람들 더 잘 아끼는 방법","뇌 공부","다른 사람들 이야기 듣기","고양이","나무","반려동물",
    "애견 훈련","새","관상어","수족관","정원 가꾸기","생태 여행","동물학","식물학","환경 보호","천체 관측","심해","주식","투자",
    "재무 관리","부동산","주식 시장","경제 전망","시장 분석"
];

function Tag({ text, removeTag }: { text: string, removeTag: () => void }) {
    return (
        <div className="tag">
            <span>{text}</span>
            <button onClick={removeTag}>X</button>
        </div>
    )
}

function TagStorage({ tags, setTags }: { tags: string[], setTags: Dispatch<SetStateAction<string[]>> }) {
    return (
        <div className="tag-storage">
            {tags.map(tag => <Tag key={tag} text={tag} removeTag={() => setTags(tags.filter(i => i != tag))}/>)}
        </div>
    )
}

function TagSearch({ tags, setTags }: { tags: string[], setTags: Dispatch<SetStateAction<string[]>> }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);

    const [searcher, setSearcher] = useState(new Searcher(tagList, {threshold: 0.5}));

    const onQueryChange = (e: any) => {
        setQuery(e.target.value);
        const res = searcher.search(query).slice(0, 10);
        setResults(res);
    };

    const onResultClick = (res: string) => {
        if (!tags.includes(res) && tags.length < 5) {
            setTags([...tags, res]);
        }
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input
                    type="text"
                    onChange={onQueryChange}
                    onKeyDown={e => {
                        if (e.key == "Enter" && tagList.includes(query)) {
                            onResultClick(query);
                        }
                    }}
                    value={query}
                    placeholder="취향 검색"
                />
                <button onClick={() => setQuery("")}>X</button>
            </div>
            {
                query != "" && results.length > 0 ?
                    <div className="search-results">
                        <div>
                            {results.map(res => <p key={res} onClick={() => onResultClick(res)}>{res}</p>)}
                        </div>
                    </div> : <></>
            }
        </div>
    )
}

export function TagInput({ tags, setTags, vis, goPrev, submit }:
    {
        tags: string[],
        setTags: Dispatch<SetStateAction<string[]>>
        vis: boolean,
        goPrev: () => void,
        submit: () => void
    }
) {
    const onSubmit = () => {
        submit();
    };

    return (
        <RegisterComponent title="취향 선택" vis={vis}>
            <p className="guide">
                당신을 이루는 것들이 궁금합니다.<br />
                당신이 가장 좋아하는 다섯 가지를 아래에서 골라주세요.
            </p>
            <TagStorage tags={tags} setTags={setTags}/>
            <TagSearch tags={tags} setTags={setTags}/>
            <div className="buttonBar">
                <button onClick={goPrev}>이전</button>
                <button onClick={onSubmit}>제출</button>
            </div>
        </RegisterComponent>
    )
}