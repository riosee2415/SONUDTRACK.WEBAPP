import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
} from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useWidth from "../hooks/useWidth";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FormOutlined,
} from "@ant-design/icons";

const Menu = styled(Wrapper)`
  padding: 0 30px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 4px solid ${Theme.white_C};
  height: 60px;
  min-height: 60px;
  align-items: flex-start;
  color: ${Theme.grey_C};

  &:hover {
    cursor: pointer;
    color: ${Theme.basicTheme_C};
  }

  @media (max-width: 1280px) {
    border-bottom: 4px solid ${Theme.subTheme_C};
  }

  @media (max-width: 900px) {
    font-size: 16px;
    padding: 0;
    height: 50px;
    min-height: 50px;
  }
`;

const MypageMenu = ({}) => {
  ////////////// - USE STATE- ///////////////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [mypageOpen, setMypageOpen] = useState(false);

  ///////////// - EVENT HANDLER- ////////////

  const mypageMenuOpenToggle = useCallback(() => {
    setMypageOpen((prev) => !prev);
  }, [mypageOpen]);

  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  ////////////// - USE EFFECT- //////////////

  return (
    <WholeWrapper>
      <Wrapper margin={`0 0 50px`}>
        <Wrapper
          width={width < 900 ? `100px` : `156px`}
          height={width < 900 ? `100px` : `156px`}
          position={`relative`}
          radius={`100%`}
        >
          <Image
            height={`100%`}
            radius={`100%`}
            alt="profile"
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/art-goods/assets/images/main-page/img_4s_right_prod.png`}
          />

          <Wrapper
            width={`33px`}
            height={`33px`}
            position={`absolute`}
            bottom={`0`}
            right={`16px`}
            radius={`100%`}
            color={Theme.white_C}
            bgColor={`rgba(0, 0, 0, 0.6)`}
          >
            <FormOutlined />
          </Wrapper>
        </Wrapper>
        <Text fontSize={`22px`} fontWeight={`bold`} margin={`20px 0 12px`}>
          차참미
        </Text>
        <CommonButton
          width={`162px`}
          height={`45px`}
          kindOf={`subTheme3`}
          radius={`7px`}
        >
          판매자로 전환
        </CommonButton>
      </Wrapper>

      <Wrapper overflow={`auto`} ju={`flex-start`} wrap={`nowrap`}>
        <Menu
          borderTop={
            width < 1280
              ? `4px solid ${Theme.subTheme_C}`
              : `4px solid ${Theme.white_C}`
          }
          onClick={() => movelinkHandler(`/`)}
        >
          메인으로
        </Menu>
        <Menu onClick={mypageMenuOpenToggle}>
          <Wrapper
            dr={`row`}
            ju={`space-between`}
            color={mypageOpen ? Theme.basicTheme_C : ``}
          >
            구매관리
            {mypageOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </Wrapper>
        </Menu>
        {mypageOpen && (
          <Wrapper
            bgColor={Theme.lightGrey2_C}
            padding={`24px 30px`}
            al={`flex-start`}
          >
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={
                router.pathname === `/mypage/cart`
                  ? Theme.black_C
                  : Theme.grey2_C
              }
              isHover
              margin={`0 0 22px`}
            >
              장바구니
            </Text>
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={
                router.pathname === `/mypage` ? Theme.black_C : Theme.grey2_C
              }
              isHover
              margin={`0 0 22px`}
            >
              찜 보관함
            </Text>
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={
                router.pathname === `/mypage` ? Theme.black_C : Theme.grey2_C
              }
              isHover
              margin={`0 0 22px`}
            >
              구매 내역
            </Text>
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={
                router.pathname === `/mypage` ? Theme.black_C : Theme.grey2_C
              }
              isHover
              margin={`0 0 22px`}
            >
              컨택 내역
            </Text>
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={
                router.pathname === `/mypage` ? Theme.black_C : Theme.grey2_C
              }
              isHover
            >
              결제 내역
            </Text>
          </Wrapper>
        )}
        <Menu>포인트 관리</Menu>
        <Menu>개인정보 관리</Menu>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MypageMenu;
