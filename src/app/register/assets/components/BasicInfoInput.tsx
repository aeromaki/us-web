import { useState } from "react";

import RegisterComponent from "./_RegisterComponent";
import { BasicUserInfo } from "../types";

export function BasicInfoInput({ email, setUserInfo, vis, goNext }:
    {
        email: string,
        setUserInfo: React.Dispatch<React.SetStateAction<BasicUserInfo>>,
        vis: boolean,
        goNext: () => void
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

    const [phoneMes, setPhoneMes] = useState("");
    const [phoneVer, setPhoneVer] = useState("");
    const [trigger, setTrigger] = useState(false);

    return (
        <RegisterComponent title="기본 정보 입력" vis={vis}>
            <table className="basic-info-table">
                <tr>
                    <th>이메일</th>
                    <th><input type="email" value={email} disabled={true} /></th>
                </tr>
                <tr className="space" />

                <tr>
                    <th>이름</th>
                    <th><input onChange={e => setName(e.target.value)}></input></th>
                </tr>
                <tr className="space" />

                <tr>
                    <th>성별</th>
                    <th>
                        <label>
                            <input type="radio" name="sex" value="m" onChange={sexRadioHandler} checked={sex == true} />
                            <span>남</span>
                        </label>
                        <label>
                            <input type="radio" name="sex" value="f" onChange={sexRadioHandler} checked={sex == false} />
                            <span>여</span>
                        </label>

                    </th>
                </tr>
                <tr className="space" />

                <tr className="input-button">
                    <th>전화번호</th>
                    <th>
                        <div>
                            <input type="tel" placeholder="010-1234-5678" onChange={e => setPhoneNumber(e.target.value)} />
                            <button onClick={() => {
                                setPhoneMes("인증번호가 전송됐습니다. 메시지를 확인해주세요.");
                                setTrigger(true);
                            }}>인증</button>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th></th>
                    <th><p>{phoneMes}</p></th>
                </tr>
                <tr className="space" />

                <tr className="input-button" style={trigger ? {} : {display: "none"}}>
                    <th></th>
                    <th>
                        <div>
                            <input placeholder="인증번호"/>
                            <button onClick={() => setPhoneVer("인증됐습니다!")}>확인</button>
                        </div>

                    </th>
                </tr>
                <tr>
                    <th></th>
                    <th><p>{phoneVer}</p></th>
                </tr>
            </table>
            <div className="buttonBar">
                <div></div>
                <button onClick={onNext}>계속</button>
            </div>
        </RegisterComponent>
    )
}