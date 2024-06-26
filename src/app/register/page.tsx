"use client";

import "./style.css";
import Cookies from "js-cookie";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

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

    const createGoAction = (
        svA: Dispatch<SetStateAction<boolean>>,
        svB: Dispatch<SetStateAction<boolean>>
    ) => () => {
        svA(false);
        setTimeout(() => svB(true), FADEIN_TIME);
    };
    const goNext0 = createGoAction(setVis0, setVis1);
    const goPrev1 = createGoAction(setVis1, setVis0);
    const goNext1 = createGoAction(setVis1, setVis2);
    const goPrev2 = createGoAction(setVis2, setVis1);
    const submit = () => setVis2(false);

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