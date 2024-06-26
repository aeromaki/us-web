"use client";

import "./style.css";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";
import axios from "axios";


import { BasicInfoInput, RecordInput, TagInput, BasicUserInfo, FADEIN_TIME } from "./assets";


export default function Home() {
    const [userInfo, setUserInfo] = useState<BasicUserInfo>({
        email: "",
        name: "",
        sex: undefined,
        phoneNumber: ""
    });

    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const { email } = JSON.parse(Cookies.get("usUserEmail") ?? "{}");
        setUserInfo({ ...userInfo, email: email });
        //Cookies.remove("usUserEmail");
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

    const submit = () => {
        setVis2(false);
        axios.post("/api/saveFeatureSelection", {
            feature_value_1: tags[0],
            feature_value_2: tags[1],
            feature_value_3: tags[2],
            feature_value_4: tags[3],
            feature_value_5: tags[4]
        }).then(res => console.log(res)).catch(err => console.log(err));
    };

    return (
        <>
            <div className="h-frame">
                <div className="inner-box">
                    <BasicInfoInput email={userInfo.email} setUserInfo={setUserInfo} vis={vis0} goNext={goNext0}/>
                    <RecordInput vis={vis1} goPrev={goPrev1} goNext={goNext1}/>
                    <TagInput tags={tags} setTags={setTags} vis={vis2} goPrev={goPrev2} submit={submit}/>
                </div>
            </div>
            {/*
            <span style={{color: "white"}}>{JSON.stringify(userInfo)}</span>
            */}
        </>
    );
}