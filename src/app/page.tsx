"use client"

import "./style.css";
import Image from 'next/image';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

import { useGoogleLogin } from '@react-oauth/google';
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

function LoginButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined,
  imgSrc: string,
  text: string
}) {
  const { onClick, imgSrc, text } = props;
  return (
    <button className="login-button" onClick={onClick}>
      <Image src={imgSrc} width={20} height={20} alt="google logo"/>
      <div style={{width: "230px", justifyContent: "center"}}>
        {text}
      </div>
    </button>
  )
}

function checkGoogleAccessToken(access_token: string): Promise<AxiosResponse<any, any>> {
  return axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
    headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json'
    }
  });
}

export default function Home() {
  const { push } = useRouter();
  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      const access_token = tokenResponse.access_token;
      if (access_token) {
        checkGoogleAccessToken(access_token)
                .then(res => {
                    console.log(JSON.stringify({ email: res.data.email, access_token: access_token }));
                    axios.post("/api/validateToken", { email: res.data.email, access_token: access_token }).then(res => {
                      console.log("validateToken", res.data);
                      return axios.get("/api/userInfo");
                    })
                      .then(res => {
                        const { email, name, phoneNumber, sex } = res.data.user;
                        console.log("userInfo", res.data, { email, name, phoneNumber, sex });

                        if ((email != null) && (name != null) && (phoneNumber != null) && (sex != null)) {
                          Cookies.set("usUserInfo", JSON.stringify({ email, name, phoneNumber, sex }));
                          push("/main");
                        }
                        else {
                          Cookies.set("usUserEmail", JSON.stringify({ email }));
                          push("/register");
                        }
                      })
                      .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
      }
    },
    onError: () => console.log("no")
  });

  return (
      <div className="h-frame">
        <div className="inner-box">
          <h1 className="us-emoji">🌎</h1>
          <div className="textbox">
            <p>Us에 오신 걸 환영합니다!</p>
            <p>이야기를 나누러 떠나봅시다.</p>
          </div>
          <LoginButton onClick={() => googleLogin()} imgSrc="/google.png" text="Google 계정으로 로그인"/>
          <LoginButton onClick={undefined} imgSrc='/apple.png' text="Apple ID로 로그인"/>
        </div>
      </div>
  );
}
