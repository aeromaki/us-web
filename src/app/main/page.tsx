"use client";

import "./style.css";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function Home() {
    const [infos, setInfos] = useState({
        name: "",
        email: "",
        phoneNumber: ""
    });

    useEffect(() => {
        axios.get("/api/dashboard").then(res => {
            console.log(res);
            const {
                email,
                featureValue1,
                featureValue2,
                featureValue3,
                featureValue4,
                featureValue5,
                name,
                phoneNumber,
                sex
            } = res.data;
            setInfos({
                email: email,
                //tags: [featureValue1, featureValue2, featureValue3, featureValue4, featureValue5],
                name: name,
                phoneNumber: phoneNumber
            });
        }).catch(err => console.log(err));
    }, []);

    /*
    const [matchResult, setMatchResult] = useState({
        reason: "",
        user_name: ""
    });*/

    const [matchResult, setMatchResult] = useState({
        "reason": "",
        "user_name": ""
    });

    const fetchMatch = () => {
        console.log("fetchMatch");
        axios.get("/match").then(res => {
            console.log(res.data);
            setMatchResult(res.data);
        }).catch(err => console.log(err));
    };

    const [invisStyle, setInvisStyle] = useState<any>({});
    const [invisStyle1, setInvisStyle1] = useState<any>({ display: "none" });

    const match = useCallback(() => {
        fetchMatch();
        setInvisStyle({ animation: "fade-out 3s" });
        setTimeout(() => {
            setInvisStyle({ display: "none" });
            setInvisStyle1({ display: "flex", animation: "fade-in 2s" });
        }, 3000);
    }, []);

    return (
        <div className="h-frame">
            <div className="inner-box" style={invisStyle}>
                <h1 className="us-emoji-main">🌎</h1>
                <div className="profile">
                    <Image
                        className="profile-image"
                        src="/sample-profile-image-0.jpg"
                        alt="profile image"
                        width={120} height={120}
                    />
                    <div className="profile-text">
                        <span>{infos.name}</span>
                        <span>{infos.email}</span>
                        <span>{infos.phoneNumber}</span>
                    </div>
                </div>
                <div className="button-box">
                    <button>설정</button>
                    <button>로그아웃</button>
                </div>
                <button className="match-button" onClick={match}>대화 상대 찾기</button>
            </div>
            <div className="inner-box" style={invisStyle1}>
                {
                    matchResult.reason ?
                    <>
                        <h2 className="match-done">매칭 완료!</h2>
                        <div className="profile-images">
                            <div className="profile-box">
                                <Image
                                    className="profile-image"
                                    src="/sample-profile-image-0.jpg"
                                    alt="profile image"
                                    width={120} height={120}
                                />
                                <span>{infos.name}</span>
                            </div>
                            <span> - - - - - </span>
                            <div className="profile-box">
                                <Image
                                    className="profile-image"
                                    src="/sample-profile-image-1.jpg"
                                    alt="profile image"
                                    width={120} height={120}
                                />
                                <span>{matchResult.user_name}</span>
                            </div>
                        </div>
                        <p className="reason">{matchResult.reason}</p>
                        <button className="match-button">대화하기</button>
                    </> :
                    <div className="waiting">
                        <Image
                            className="dong"
                            src="/dong.png"
                            alt="prodong"
                            width={536/2} height={668/2}
                        />
                        <span>매칭 중입니다. 잠시 기다려주세요...</span>
                    </div>
                }
            </div>
        </div>
    );
}
