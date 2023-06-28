import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import {
  CaretLeftFilled,
  CaretRightFilled,
  PlusOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useCallback } from "react";
import { Image, Text, Wrapper } from "../commonComponents";
import Theme from "../Theme";
import useWidth from "../../hooks/useWidth";
import moment from "moment";
import { useRouter } from "next/router";
import { Rate } from "antd";

const LeftBox = styled(Wrapper)`
  width: 50%;
  height: 100%;
  position: relative;

  @media (max-width: 900px) {
    width: 100%;
    height: 350px;
    padding: 40px 0;
  }
`;

const RightBox = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 0 0 34px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 900px) {
    width: 100%;
    padding: 0;
  }
`;

const Btn = styled(Wrapper)`
  flex-direction: row;
  width: auto;
  color: ${Theme.subTheme4_C};

  &:hover {
    cursor: pointer;
    color: ${Theme.black_C};
  }
`;

const Circle = styled(Wrapper)`
  width: 124px;
  min-width: 124px;
  height: 124px;
  border-radius: 100%;
  margin: 0 20px 0 0;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  ${Wrapper} {
    opacity: 0;
    visibility: hidden;
  }

  &:hover ${Wrapper} {
    cursor: pointer;
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 900px) {
    width: 80px;
    min-width: 80px;
    height: 80px;
  }
`;

const Audio = styled.audio`
  width: calc(100% - 150px);
`;

const MainSlider2 = ({ datum }) => {
  console.log(datum);
  const width = useWidth();
  const router = useRouter();

  const [status, setStatus] = useState(0);
  const [isMusic, setIsMusic] = useState(false);
  const [musticData, setMusticData] = useState(null);

  const aRef = useRef();

  // 오디오 시간조회
  // aRef && aRef.current && moment(aRef.current.duration * 1000).format("mm:ss")

  const statusChangeHandler = useCallback(
    (statement) => {
      if (statement === 0) {
        setStatus((prev) => {
          if (prev === 0) {
            return datum.length - 1;
          } else {
            return prev - 1;
          }
        });
      }

      if (statement === 1) {
        setStatus((prev) => {
          if (prev === datum.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      }
    },
    [status, datum]
  );

  const musicToggle = useCallback(
    (data) => {
      if (musticData && data.id === musticData.id) {
        setMusticData(null);
        setIsMusic(false);
        return;
      }

      setMusticData(data);
      setIsMusic(true);
    },
    [musticData, isMusic]
  );

  // 페이지 이동
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Wrapper dr={`row`} height={width < 900 ? `auto` : `476px`}>
      <LeftBox>
        <Image
          radius={`14px`}
          alt="thumnail"
          height={`100%`}
          src={datum[status] && datum[status].artistProfileImage}
        />
      </LeftBox>
      <RightBox>
        <Wrapper al={`flex-start`}>
          <Wrapper dr={`row`} ju={`flex-start`}>
            <Image
              alt="icon"
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/artisttem.png`}
              width={`18px`}
              margin={`0 6px 0 0`}
            />
            <Text fontWeight={`500`} fontSize={`30px`}>
              Artisttem
            </Text>
          </Wrapper>
          <Wrapper dr={`row`} ju={`flex-start`} margin={`30px 0 12px`}>
            <Text
              fontSize={width < 900 ? `14px` : `18px`}
              fontWeight={`500`}
              margin={`0 14px 0 0`}
            >
              {datum[status] && datum[status].artistname}
            </Text>
            <Image
              alt="icon"
              src={
                datum[status] && datum[status].isLike
                  ? `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart_a.png`
                  : `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`
              }
              width={`14px`}
              margin={`0 4px 0 0`}
            />
            <Text color={Theme.darkGrey_C}>
              {datum[status] && datum[status].likeCnt}
            </Text>

            <Wrapper dr={`row`} width={`auto`} margin={`0 0 0 14px`}>
              {/* <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled /> */}
              <Rate
                value={datum[status] && datum[status].likeCnt}
                disabled
                style={{
                  fontSize: `16px`,
                  color: Theme.subTheme4_C,
                }}
              />
            </Wrapper>
          </Wrapper>
          <Text fontSize={width < 900 ? `14px` : `16px`}>
            "{datum[status] && datum[status].artistInfo}"
          </Text>

          <Wrapper dr={`row`} ju={`flex-start`} margin={`20px 0 0`}>
            {datum[status] &&
              datum[status].tags.map((data) => {
                return (
                  <Wrapper
                    width={`auto`}
                    border={`1px solid ${Theme.lightGrey_C}`}
                    radius={`30px`}
                    height={`27px`}
                    padding={`0 15px`}
                    margin={`0 4px 0 0`}
                  >
                    {data.tagValue}
                  </Wrapper>
                );
              })}
          </Wrapper>
        </Wrapper>
        <Wrapper>
          <Wrapper
            className="scroll"
            dr={`row`}
            margin={width < 900 ? `30px 0 15px` : `0 0 15px`}
            ju={`flex-start`}
            overflow={`auto`}
            wrap={`nowrap`}
            padding={`0 0 30px`}
          >
            {datum &&
              datum.map((value) => {
                return (
                  <Circle
                    key={value.id}
                    bgImg={`url("${value.profileImage}")`}
                    onClick={() => musicToggle(value)}
                  >
                    <Wrapper bgColor={`rgba(0, 0, 0, 0.4)`} height={`100%`}>
                      <Image
                        alt="playicon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/play_white.png`}
                        width={width < 900 ? `15px` : `32px`}
                      />
                    </Wrapper>
                  </Circle>
                );
              })}
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-end`}>
            <Btn margin={`0 26px 0 0`} onClick={() => statusChangeHandler(0)}>
              <CaretLeftFilled /> prev
            </Btn>
            <Btn onClick={() => statusChangeHandler(1)}>
              next <CaretRightFilled />
            </Btn>
          </Wrapper>
        </Wrapper>
      </RightBox>
      {isMusic && musticData && (
        <Wrapper
          position={`fixed`}
          zIndex={`100`}
          bottom={`0`}
          left={`0`}
          bgColor={Theme.lightGrey2_C}
          padding={`15px 30px`}
          dr={`row`}
          ju={`space-between`}
          shadow={`0 0 10px rgba(0, 0, 0, 0.1)`}
        >
          <Wrapper width={`270px`} dr={`row`} ju={`flex-start`}>
            <Image
              width={`61px`}
              height={`61px`}
              radius={`100%`}
              src={musticData.profileImage}
            />
            <Wrapper width={`auto`} al={`flex-start`} padding={`0 0 0 14px`}>
              <Text fontSize={`20px`} fontWeight={`bold`}>
                {musticData.title}
              </Text>
              <Text>{musticData.artistname}</Text>
            </Wrapper>
          </Wrapper>
          <Wrapper width={`calc(100% - 540px)`} dr={`row`}>
            <Audio ref={aRef} controls src={musticData.repSongFilePath}></Audio>
            <Wrapper
              width={`150px`}
              dr={`row`}
              al={`flex-start`}
              ju={`center`}
              margin={`10px 0 0`}
            >
              {/* <Wrapper width={`50px`} cursor={`pointer`}>
                <Image
                  alt="icon"
                  width={`22px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/download.png`}
                />
                <Text fontSize={`12px`} color={Theme.grey_C}>
                  15,000
                </Text>
              </Wrapper>
              <Wrapper width={`50px`} cursor={`pointer`}>
                <Image
                  alt="icon"
                  width={`22px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/cart.png`}
                />
              </Wrapper>
              <Wrapper width={`50px`}>
                <Image
                  alt="icon"
                  width={`22px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
                />
                <Text fontSize={`12px`} color={Theme.grey_C}>
                  98
                </Text>
              </Wrapper> */}
            </Wrapper>
          </Wrapper>
          <Wrapper
            width={`270px`}
            al={`flex-end`}
            fontWeight={`bold`}
            color={Theme.subTheme4_C}
            onClick={() =>
              moveLinkHandler(`/artisttem/${datum[status] && datum[status].id}`)
            }
          >
            <Text isHover>
              MORE <PlusOutlined />
            </Text>
          </Wrapper>
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default MainSlider2;
