import RegisterComponent from "./_RegisterComponent";

import { SetStateAction, useState, useRef, useCallback, Dispatch, useEffect } from "react";
import Image from "next/image";
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";

const MAX_RECORD_TIME = 60;

function RecordButton({ blob, setBlob }: {
    blob: Blob | undefined,
    setBlob: Dispatch<SetStateAction<Blob | undefined>>
}) {
    const [isRecording, setIsRecording] = useState(false);
    const streamRef = useRef<MediaStream>();
    const isRecordingRef = useRef<boolean>();
    const recorderRef = useRef<RecordRTCPromisesHandler>();

    useEffect(() => {
        isRecordingRef.current = false;
    }, []);

    const [time, setTime] = useState(MAX_RECORD_TIME);

    const onStopClick = useCallback(async () => {
        await recorderRef.current?.stopRecording();
        const newBlob = await recorderRef.current?.getBlob();
        setBlob(newBlob);

        // RecordRTC.invokeSaveAsDialog(newBlob ?? Blob.prototype, 'test.wav');

        isRecordingRef.current = false;
        setIsRecording(false);

        console.log("done", recorderRef.current, streamRef.current);

        streamRef.current?.getAudioTracks()[0].stop();
    }, [setBlob]);

    useEffect(() => {
        if (isRecordingRef.current) {
            let timer = setInterval(() => {
                if (!isRecordingRef.current) {
                    clearInterval(timer);
                }
                setTime(t => {
                    if (t == 1) {
                        (async () => { await onStopClick() })();
                        clearInterval(timer);
                        return 0;
                    }
                    else {
                        return t - 1;
                    }
                });
            }, 1000);
        }
    }, [isRecording, onStopClick]);

    const onRecordClick = useCallback(async () => {
        streamRef.current = await navigator.mediaDevices.getUserMedia({audio: true});
        recorderRef.current = new RecordRTCPromisesHandler(streamRef.current, {
            type: 'audio',
            mimeType: 'audio/wav'
        });
        recorderRef.current.startRecording();

        isRecordingRef.current = true;
        setIsRecording(true);
        setTime(MAX_RECORD_TIME);

        console.log("recording...", isRecordingRef.current);
    }, []);

    return (
        <>{
            isRecordingRef.current ?
            <button className="record-button" onClick={onStopClick}
                style={{ backgroundColor: "#E81C1C", fontSize: "20px" }}
            >
                {time}
            </button> :
            <button className="record-button" onClick={onRecordClick}
                style={blob ? { backgroundColor: "#2BE21B", fontSize: "15px" } : {}}
            >
                {
                    blob ?
                    "재녹음" :
                    <Image src="/mic.png" width={30} height={30} alt="microphone icon"/>
                }
            </button>
        }</>
    );
}

export function RecordInput({ vis, setRecords, goPrev, goNext }:
    {
        vis: boolean,
        setRecords: Dispatch<SetStateAction<any>>,
        goPrev: () => void,
        goNext: () => void
    }
) {
    const [blob1, setBlob1] = useState<Blob | undefined>();
    const [blob2, setBlob2] = useState<Blob | undefined>();
    const [blob3, setBlob3] = useState<Blob | undefined>();

    useEffect(() => {
        setRecords([blob1, blob2, blob3]);
        console.log("records change");
    }, [blob1, blob2, blob3, setRecords]);

    const onNext = () => {
        goNext();
    };

    return (
        <RegisterComponent title="음성 녹음" vis={vis}>
            <p className="guide">
                당신의 이야기가 궁금합니다.<br/>
                각 질문당 1분 이내로 자유롭게 이야기를 들려주세요.<br/>
                당신의 이야기는 공유되지 않습니다.
            </p>
            <table className="record-table">
                <tbody className="record-table">
                <tr>
                    <th>Q1.</th>
                    <th>당신이 가장 많은 영향을 받은 사람이나 경험에 대해 이야기해주세요.</th>
                    <th><RecordButton blob={blob1} setBlob={setBlob1}/></th>
                </tr>
                <tr>
                    <th>Q2.</th>
                    <th>당신은 힘들고 어려운 난관을 어떻게 대했나요?</th>
                    <th><RecordButton blob={blob2} setBlob={setBlob2}/></th>
                </tr>
                <tr>
                    <th>Q3.</th>
                    <th>10년 뒤를 그려보세요. 당신은 어떤 모습인가요?</th>
                    <th><RecordButton blob={blob3} setBlob={setBlob3}/></th>
                </tr>
                </tbody>
            </table>
            <div className="buttonBar">
                <button onClick={goPrev}>이전</button>
                <button onClick={onNext}>계속</button>
            </div>
        </RegisterComponent>
    );
}