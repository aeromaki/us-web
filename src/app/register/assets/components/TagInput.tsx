import RegisterComponent from "./_RegisterComponent";

export function TagInput({ vis, goPrev, submit }:
    {
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
                당신의 취미, 관심사, 취향을 선택해주세요.<br />
                많이 고를수록 당신을 더욱 잘 표현할 수 있습니다.
            </p>
            <span style={{ fontSize: "100px", color: "white" }}>asdf</span>
            <div className="buttonBar">
                <button onClick={goPrev}>이전</button>
                <button onClick={onSubmit}>제출</button>
            </div>
        </RegisterComponent>
    )
}