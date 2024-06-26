import RegisterComponent from "./_RegisterComponent";

import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";

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


export function RecordInput({ vis, goPrev, goNext }:
    {
        vis: boolean,
        goPrev: () => void,
        goNext: () => void
    }
) {
    const onNext = () => {
        goNext();
    };

    return (
        <RegisterComponent title="음성 녹음" vis={vis}>
            <p className="guide">
                당신의 목소리를 들려주세요.<br />
                각 질문에 대한 녹음은 최대 1분까지 가능합니다.
            </p>
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