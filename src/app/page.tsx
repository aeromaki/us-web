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
                    console.log(res.data);

                    const cookieValue = JSON.stringify({ email: res.data.email, access_token: access_token });
                    console.log(cookieValue);
                    Cookies.set("usUser", cookieValue);

                    push("/register");

                    /*
                    axios.post(process.env.BACKEND ?? "", {
                      email: res.data.email,
                      access_token: user.access_token
                    })
                    */
                })
                /*
                .then(res => {
                  console.log(res);
                })
                */
                .catch(err => console.log(err));
      }
    },
    onError: () => console.log("fuck")
  });

  return (
    <>
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
    </>
  );
}
