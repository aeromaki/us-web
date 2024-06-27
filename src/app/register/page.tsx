"use client";

import "./style.css";
import { useEffect, useState, Dispatch, SetStateAction, useCallback } from "react";
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
    const [records, setRecords] = useState<Blob[]>([]);
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

    const uploadBasicInfo = useCallback(() => {
        axios.post("/api/signup", {
            "name": userInfo.name,
            "phoneNumber": userInfo.phoneNumber,
            "sex": userInfo.sex
        }).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    }, [userInfo]);

    const uploadRecords = useCallback(() => {
        if (records.reduce((a, b) => a && b)) {
            const { email } = JSON.parse(Cookies.get("usUserEmail") ?? "{}");
            const ee = email.replace(".", "-");

            const createFormData = (blob: Blob, i: number) => {
                const file = new File([blob], `${ee}-file${i}.wav`);
                const formData = new FormData();
                formData.append("file", file);
                formData.append("quesNumber", `${i}`);
                return formData;
            }

            for (const [i, blob] of records.entries()) {
                axios.postForm("/upload", createFormData(blob, i+1)).then(res => {
                    console.log(i+1, res);
                }).catch(err => console.log(err));
            }
        }
        else {
            console.log("some blob is missing");
        }
    }, [records]);

    const uploadTags = useCallback(() => {
        axios.post("/api/saveFeatureSelection", {
            feature_value_1: tags[0],
            feature_value_2: tags[1],
            feature_value_3: tags[2],
            feature_value_4: tags[3],
            feature_value_5: tags[4]
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    }, [tags]);

    const submit = () => {
        setVis2(false);
        alert("asdf")
    };

    return (
        <>
            <div className="h-frame">
                <div className="inner-box">
                    <BasicInfoInput
                        vis={vis0}

                        setUserInfo={setUserInfo}

                        email={userInfo.email}
                        goNext={goNext0}
                    />
                    <RecordInput
                        vis={vis1}

                        setRecords={setRecords}

                        goPrev={goPrev1}
                        goNext={goNext1}
                    />
                    <TagInput
                        vis={vis2}

                        setTags={setTags}

                        tags={tags}
                        goPrev={goPrev2}
                        submit={submit}
                    />
                </div>
            </div>
        </>
    );
}