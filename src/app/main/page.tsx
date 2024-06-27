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

    const [invisStyle, setInvisStyle] = useState<any>({});
    const [invisStyle1, setInvisStyle1] = useState<any>({ display: "none" });

    const match = useCallback(() => {
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
                        src="/sample-profile-image.jpg"
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
                <div style={{width: "100px", height: "100px", backgroundColor: "white"}}></div>
            </div>
        </div>
    );
}
