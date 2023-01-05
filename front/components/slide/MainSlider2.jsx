import React from "react";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import {
  CaretLeftFilled,
  CaretRightFilled,
  StarFilled,
} from "@ant-design/icons";
import { useCallback } from "react";
import { Image, Text, Wrapper } from "../commonComponents";
import Theme from "../Theme";
import useWidth from "../../hooks/useWidth";

const LeftBox = styled(Wrapper)`
  width: 50%;
  height: 100%;
  position: relative;

  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    padding: 55px 0;
  }
`;

const RightBox = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 0 0 34px;
  position: relative;
  justify-content: space-between;

  @media (max-width: 900px) {
    width: 100%;
    height: auto;
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

const MainSlider2 = ({
  array = [
    {
      leftImg:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      rightImg:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      name: "이차미",
      title: "아티스트를 소개하는 한 마디를 적어주세요.",
      hash: ["Vocal", "Beat Maker", "Remixer", "Effect & Fx Sound Desingers"],
    },
    {
      leftImg:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/art-goods/assets/images/main-page/img_4s_left_prod.png",
      rightImg:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/art-goods/assets/images/main-page/img_4s_right_prod.png",
      name: "이차미",
      title: "아티스트를 소개하는 한 마디를 적어주세요.",
      hash: ["Vocal", "Beat Maker"],
    },
    {
      leftImg:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      rightImg:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/main-img/artisttem_big.png",
      name: "이차미",
      title: "아티스트를 소개하는 한 마디를 적어주세요.",
      hash: ["Vocal", "Beat Maker", "Remixer", "Effect & Fx Sound Desingers"],
    },
    {
      leftImg:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/art-goods/assets/images/main-page/img_4s_left_prod.png",
      rightImg:
        "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/art-goods/assets/images/main-page/img_4s_right_prod.png",
      name: "이차미",
      title: "아티스트를 소개하는 한 마디를 적어주세요.",
      hash: ["Vocal", "Beat Maker", "Remixer", "Effect & Fx Sound Desingers"],
    },
  ],
}) => {
  const width = useWidth();
  const [status, setStatus] = useState(0);

  const statusChangeHandler = useCallback(
    (statement) => {
      if (statement === 0) {
        setStatus((prev) => {
          if (prev === 0) {
            return array.length - 1;
          } else {
            return prev - 1;
          }
        });
      }

      if (statement === 1) {
        setStatus((prev) => {
          if (prev === array.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      }
    },
    [status, array]
  );

  return (
    <Wrapper dr={`row`} height={width < 900 ? `auto` : `476px`}>
      <LeftBox>
        <Image
          radius={`14px`}
          alt="thumnail"
          height={`100%`}
          src={array[status].rightImg}
        />
      </LeftBox>
      <RightBox>
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
            {array[status].name}
          </Text>
          <Image
            alt="icon"
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/heart.png`}
            width={`14px`}
            margin={`0 4px 0 0`}
          />
          <Text color={Theme.darkGrey_C}>98</Text>
          <Wrapper
            dr={`row`}
            width={`auto`}
            color={Theme.subTheme4_C}
            margin={`0 0 0 14px`}
            fontSize={`16px`}
          >
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
          </Wrapper>
        </Wrapper>
        <Text fontSize={width < 900 ? `14px` : `16px`}>
          {array[status].title}
        </Text>

        <Wrapper dr={`row`} ju={`flex-start`} margin={`20px 0 0`}>
          {array[status].hash.map((data) => {
            return (
              <Wrapper
                width={`auto`}
                border={`1px solid ${Theme.lightGrey_C}`}
                radius={`30px`}
                height={`27px`}
                padding={`0 15px`}
                margin={`0 4px 0 0`}
              >
                {data}
              </Wrapper>
            );
          })}
        </Wrapper>

        {width < 900 ? (
          <>
            <Wrapper
              width={`auto`}
              position={`absolute`}
              left={`15px`}
              top={`50%`}
            >
              <CaretLeftFilled onClick={() => statusChangeHandler(0)} />
            </Wrapper>
            <Wrapper
              width={`auto`}
              position={`absolute`}
              right={`15px`}
              top={`50%`}
            >
              <CaretRightFilled onClick={() => statusChangeHandler(1)} />
            </Wrapper>
          </>
        ) : (
          <Wrapper
            position={`absolute`}
            dr={`row`}
            ju={`flex-end`}
            bottom={`0`}
            right={`0`}
            padding={`50px`}
          >
            <Btn margin={`0 26px 0 0`} onClick={() => statusChangeHandler(0)}>
              <CaretLeftFilled /> prev
            </Btn>
            <Btn onClick={() => statusChangeHandler(1)}>
              next <CaretRightFilled />
            </Btn>
          </Wrapper>
        )}
      </RightBox>
    </Wrapper>
  );
};

export default MainSlider2;
