"use client";

import "./style.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";

type BasicUserInfo = {
    email: string,
    name: string,
    sex: boolean | undefined,
    phoneNumber: string
};

const FADEIN_TIME = 300;
const FADEOUT_TIME = 250;

/*
function createStream(): MediaStream {
    let stream;
    navigator.mediaDevices.getUserMedia({audio: true}).then(s => {stream = s;}).catch(e => console.log("nope"));
    return stream;
}

class AudioRecorder {
    stream: undefined;

    constructor() {
        // RecordRTC.
        this.stream = undefined;
        let recorder = new RecordRTCPromisesHandler(stream, {
            type: 'audio'
        });
    }

    startRecording() {
    }

    stopRecording() {

    }
}
*/

function RegisterComponent({ title, vis, children }: {
    title: string, vis: boolean, children: React.ReactNode
}) {
    const [invisStyle, setInvisStyle] = useState<any>({display: "none"});
    useEffect(() => {
        if (vis) {
            setInvisStyle({animation: "fade-out 1s"});
        }
        else {
            setTimeout(() => setInvisStyle({display: "none"}), FADEOUT_TIME);
        }
    }, [vis]);

    return (
        <div className="inner-box" style={
            vis ? {display: "flex", animation: "fade-in 1s"} : invisStyle
        }>
            <h1 className="us-emoji-small">🌎</h1>
            <h2 className="info-section-title">{title}</h2>
            {children}
        </div>
    )
}

function BasicInfoInput({ email, setUserInfo, vis, goNext }:
    {
        email: string,
        setUserInfo: React.Dispatch<React.SetStateAction<BasicUserInfo>>,
        vis: boolean,
        goNext: any
    }
) {
    const [name, setName] = useState("");
    const [sex, setSex] = useState<boolean | undefined>();
    const [phoneNumber, setPhoneNumber] = useState("");

    const sexRadioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSex(e.target.value == "m");
    };

    const onNext = () => {
        const info = {
            email,
            name,
            sex,
            phoneNumber
        };
        setUserInfo(info);
        goNext();
    };

    return (
        <RegisterComponent title="기본 정보 입력" vis={vis}>
            <table className="basic-info-table">
                <tr>
                    <th>이메일</th>
                    <th><input type="email" value={email} disabled={true}/></th>
                </tr>
                <tr className="space"/>

                <tr>
                    <th>이름</th>
                    <th><input onChange={e => setName(e.target.value)}></input></th>
                </tr>
                <tr className="space"/>

                <tr>
                    <th>성별</th>
                    <th>
                        <label>
                            <input type="radio" name="sex" value="m" onChange={sexRadioHandler} checked={sex == true}/>
                            <span>남</span>
                        </label>
                        <label>
                            <input type="radio" name="sex" value="f" onChange={sexRadioHandler} checked={sex == false}/>
                            <span>여</span>
                        </label>

                    </th>
                </tr>
                <tr className="space"/>

                <tr className="input-button">
                    <th>전화번호</th>
                    <th>
                        <div>
                            <input type="tel" placeholder="010-1234-5678" onChange={e => setPhoneNumber(e.target.value)}/>
                            <button>인증</button>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th></th>
                    <th><p>asdfasdfasdfasdfasdfasdfasdfasdfasdfasdf</p></th>
                </tr>
                <tr className="space"/>

                <tr className="input-button">
                    <th></th>
                    <th>
                        <div>
                            <input/>
                            <button>확인</button>
                        </div>

                    </th>
                </tr>
                <tr>
                    <th></th>
                    <th><p>asdfasdf</p></th>
                </tr>
            </table>
            <div className="buttonBar">
                <div></div>
                <button onClick={onNext}>계속</button>
            </div>
        </RegisterComponent>
    )
}

function RecordInput({ vis, goPrev, goNext }:
    {
        vis: boolean,
        goPrev: any,
        goNext: any
    }
) {
    const onNext = () => {
        goNext();
    };

    return (
        <RegisterComponent title="음성 녹음" vis={vis}>
            <table className="record-table">
                <tr>
                    <th>Q1.</th>
                    <th>당신이 가장 많은 영향을 받은 사람이나 경험에 대해 이야기해주세요.</th>
                    <th>asdf</th>
                </tr>
                <tr>
                    <th>Q2.</th>
                    <th>당신은 힘들고 어려운 난관을 어떻게 대했나요?</th>
                    <th>asdf</th>
                </tr>
                <tr>
                    <th>Q3.</th>
                    <th>10년 뒤를 그려보세요. 당신은 어떤 모습인가요?</th>
                    <th>asdf</th>
                </tr>
            </table>
            <div className="buttonBar">
                <button onClick={goPrev}>이전</button>
                <button onClick={onNext}>계속</button>
            </div>
        </RegisterComponent>
    )
}

function TagInput({ vis, goPrev, submit }:
    {
        vis: boolean,
        goPrev: any,
        submit: any
    }
) {
    const onSubmit = () => {
        submit();
    };

    return (
        <RegisterComponent title="취향 선택" vis={vis}>
            <span style={{fontSize: "100px", color: "white"}}>asdf</span>
            <div className="buttonBar">
                <button onClick={goPrev}>이전</button>
                <button onClick={onSubmit}>제출</button>
            </div>
        </RegisterComponent>
    )
}

function delay(ms?: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export default function Home() {
    const [userInfo, setUserInfo] = useState<BasicUserInfo>({
        email: "",
        name: "",
        sex: undefined,
        phoneNumber: ""
    });

    useEffect(() => {
        Cookies.get("usUser")
        const { email, access_token } = JSON.parse(Cookies.get("usUser") ?? "{}");
        setUserInfo({ ...userInfo, email: email });
        //Cookies.remove("usUser");
    }, []);

    const [vis0, setVis0] = useState(true);
    const [vis1, setVis1] = useState(false);
    const [vis2, setVis2] = useState(false);

    const goNext0 = () => {
        setVis0(false);
        setTimeout(() => setVis1(true), FADEIN_TIME);
    };

    const goPrev1 = () => {
        setVis1(false);
        setTimeout(() => setVis0(true), FADEIN_TIME);
    };
    const goNext1 = () => {
        setVis1(false);
        setTimeout(() => setVis2(true), FADEIN_TIME);
    };

    const goPrev2 = () => {
        setVis2(false);
        setTimeout(() => setVis1(true), FADEIN_TIME);
    };
    const submit = () => {
        setVis2(false);
    }

    return (
        <>
            <div className="h-frame">
                <div className="inner-box">
                    <BasicInfoInput email={userInfo.email} setUserInfo={setUserInfo} vis={vis0} goNext={goNext0}/>
                    <RecordInput vis={vis1} goPrev={goPrev1} goNext={goNext1}/>
                    <TagInput vis={vis2} goPrev={goPrev2} submit={submit}/>
                </div>
            </div>
            {/*
            <span style={{color: "white"}}>{JSON.stringify(userInfo)}</span>
            */}
        </>
    );
}