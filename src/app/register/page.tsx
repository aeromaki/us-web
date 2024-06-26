"use client";

import "./style.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { BasicInfoInput, RecordInput, TagInput, BasicUserInfo, FADEIN_TIME } from "./assets";


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