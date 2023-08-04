import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";
import GlobalStyles from "../components/GlobalStyles";
import WidthProvider from "../components/WidthProvider";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ACCEPT_LOG_CREATE_REQUEST } from "../reducers/accept";
import wrapper from "../store/configureStore";
import { SessionProvider } from "next-auth/react";

const Fourleaf = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const getIpClient = useCallback(async () => {
    const isCheck = sessionStorage.getItem("QSIDSPDSDQDAQSTEFA");

    if (!isCheck && router.pathname.indexOf("admin") === -1) {
      try {
        const ipData = await fetch("https://geolocation-db.com/json/");
        const locationIp = await ipData.json();

        sessionStorage.setItem(
          "QSIDSPDSDQDAQSTEFA",
          "ISDGSAWDCASDHERGEKIJCSDMK"
        );

        dispatch({
          type: ACCEPT_LOG_CREATE_REQUEST,
          data: {
            ip: locationIp.IPv4,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    getIpClient();
  }, []);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Head>
          <title>NEW WAVE Sound | administrator</title>

          <meta name="author" content="4LEAF SOFTWARE <4leaf.ysh@gmail.com>" />
          {/* <!-- OG tag  --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://nwsound1.com/" />
          <meta name="subject" content="NEW WAVE Sound" />
          <meta name="title" content="NEW WAVE Sound" />
          <meta property="og:title" content="NEW WAVE Sound"></meta>
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="400" />
          <meta property="og:image" content="./og_img.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="canonical" href="https://nwsound1.com" />

          <meta name="keywords" content="NEW WAVE Sound" />
          <meta property="og:keywords" content="NEW WAVE Sound" />

          <meta property="og:description" content="NEW WAVE Sound" />
          <meta name="description" content="NEW WAVE Sound" />

          {/* 프리텐다드 폰트 */}
          <link
            href="https://webfontworld.github.io/pretendard/Pretendard.css"
            rel="stylesheet"
          />

          <script
            type="text/javascript"
            src="https://code.jquery.com/jquery-1.12.4.min.js"
          ></script>

          <script
            type="text/javascript"
            src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
          ></script>

          <script type="text/javascript" src="../customScript.js"></script>

          {/* 카카오 */}
          <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
  Kakao.init('4e975050984ead9abff80bcf8bb1b3fa');
  `,
            }}
          />

          {/* 마우스 우클릭 */}
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
            document.addEventListener("contextmenu", function(event){
              event.preventDefault();
              }, false);
                    `,
            }}
          /> */}
        </Head>
        <Component />
      </ThemeProvider>
    </SessionProvider>
  );
};
Fourleaf.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Fourleaf);
