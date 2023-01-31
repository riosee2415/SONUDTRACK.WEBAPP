import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  TextArea,
  TextInput,
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
  CloseOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Checkbox, Modal } from "antd";

const Menu = styled(Wrapper)`
  padding: 0 30px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 4px solid ${Theme.white_C};
  height: 60px;
  min-height: 60px;
  align-items: flex-start;
  color: ${(props) =>
    props.isActive ? props.theme.basicTheme_C : props.theme.grey_C};

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
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);

  ////////////// - USE STATE- ///////////////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [mypageOpen, setMypageOpen] = useState(false);
  const [mypageOpen2, setMypageOpen2] = useState(false);
  const [mypageOpen3, setMypageOpen3] = useState(false);

  ///////////// - EVENT HANDLER- ////////////
  const mypageMenuOpenToggle = useCallback(() => {
    setMypageOpen((prev) => !prev);
  }, [mypageOpen]);

  const mypageMenuOpen2Toggle = useCallback(() => {
    setMypageOpen2((prev) => !prev);
  }, [mypageOpen2]);

  const mypageMenuOpen3Toggle = useCallback(() => {
    setMypageOpen3((prev) => !prev);
  }, [mypageOpen3]);

  const modalOpenToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const completeModalOpenToggle = useCallback(() => {
    setIsComplete((prev) => !prev);
  }, [isComplete]);

  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  ////////////// - USE EFFECT- //////////////

  return (
    <WholeWrapper height={`calc(100vh - 166px)`} ju={`flex-start`}>
      <Wrapper margin={`0 0 50px`} ju={`flex-start`}>
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
            cursor={`pointer`}
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
          onClick={modalOpenToggle}
        >
          판매자로 전환
        </CommonButton>

        {/* 판매자로 전환되었을때
        <CommonButton
          width={`162px`}
          height={`45px`}
          kindOf={`subTheme3`}
          radius={`7px`}
          margin={`0 0 10px`}
        >
          My Artisttem
        </CommonButton>
        <CommonButton
          width={`162px`}
          height={`45px`}
          kindOf={`subTheme3`}
          radius={`7px`}
        >
          My Musictem
        </CommonButton> */}
      </Wrapper>

      <Wrapper
        overflow={`auto`}
        ju={`flex-start`}
        wrap={`nowrap`}
        height={`calc(100% - 322px)`}
      >
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
              onClick={() => movelinkHandler(`/mypage/cart`)}
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
                router.pathname === `/mypage/purchase`
                  ? Theme.black_C
                  : Theme.grey2_C
              }
              isHover
              onClick={() => movelinkHandler(`/mypage/purchase`)}
              margin={`0 0 22px`}
            >
              구매 내역
            </Text>
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={
                router.pathname === `/mypage/contact`
                  ? Theme.black_C
                  : Theme.grey2_C
              }
              onClick={() => movelinkHandler(`/mypage/contact`)}
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

        {/* 판매자일때
        <Menu>수익 관리</Menu>
        <Menu onClick={mypageMenuOpen2Toggle}>
          <Wrapper
            dr={`row`}
            ju={`space-between`}
            color={mypageOpen2 ? Theme.basicTheme_C : ``}
          >
            광고
            {mypageOpen2 ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </Wrapper>
        </Menu>
        {mypageOpen2 && (
          <Wrapper
            bgColor={Theme.lightGrey2_C}
            padding={`24px 30px`}
            al={`flex-start`}
          >
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={router.pathname === `/mypage/advertise/application` ? Theme.black_C : Theme.grey2_C}
              isHover
              margin={`0 0 22px`}
              onClick={() => movelinkHandler(`/mypage/advertise/application`)}
            >
              광고 신청
            </Text>
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              onClick={() => movelinkHandler(`/mypage/advertise/history`)}
              color={router.pathname === `/mypage/advertise/history` ? Theme.black_C : Theme.grey2_C}
              isHover
            >
              신청 내역
            </Text>
          </Wrapper>
        )} */}
        <Menu
          isActive={router.pathname === `/mypage/info`}
          onClick={() => movelinkHandler(`/mypage/info`)}
        >
          개인정보 관리
        </Menu>

        {/*
        판매자일때
        <Menu onClick={mypageMenuOpen3Toggle}>
          <Wrapper
            dr={`row`}
            ju={`space-between`}
            color={mypageOpen3 ? Theme.basicTheme_C : ``}
          >
            개인정보 관리
            {mypageOpen3 ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </Wrapper>
        </Menu>
        {mypageOpen3 && (
          <Wrapper
            bgColor={Theme.lightGrey2_C}
            padding={`24px 30px`}
            al={`flex-start`}
          >
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={router.pathname === `/` ? Theme.black_C : Theme.grey2_C}
              isHover
              margin={`0 0 22px`}
              onClick={() => movelinkHandler(`/`)}
            >
              회원정보 수정
            </Text>
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={router.pathname === `/` ? Theme.black_C : Theme.grey2_C}
              isHover
            >
              계좌 관리
            </Text>
          </Wrapper>
        )} */}
      </Wrapper>

      <Modal
        onCancel={modalOpenToggle}
        visible={isModal}
        footer={null}
        width={`646px`}
      >
        <Wrapper padding={`30px`}>
          <Text fontSize={`28px`} fontWeight={`600`} color={Theme.basicTheme_C}>
            판매자로 전환
          </Text>
          <Wrapper
            bgColor={Theme.subTheme_C}
            padding={`18px`}
            radius={`5px`}
            margin={`16px 0 24px`}
            fontWeight={`500`}
          >
            간단한 인터뷰에 응해주시면, 5일 이내에 판매자로 전환이 가능합니다!
          </Wrapper>

          <Wrapper al={`flex-start`}>
            <Text
              fontSize={`16px`}
              fontWeight={`600`}
              color={Theme.basicTheme_C}
            >
              New Wave Sound에서 주 활동 계획은 어떻게 되시나요?
            </Text>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`14px 0 12px`}>
              <Checkbox>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  Musictem 판매
                </Text>
              </Checkbox>
              <Checkbox>
                <Text fontSize={`16px`} color={Theme.grey_C}>
                  Artist로서 활동
                </Text>
              </Checkbox>
            </Wrapper>

            <TextArea
              width={`100%`}
              height={`85px`}
              placeholder="예) 라이브러리를 제작해서 뮤직템에 판매하려고 합니다.&#13;&#10;Artist로서는 정식 음원과 데모 작업 활동을 하려고 합니다"
            />
            <Text
              fontSize={`16px`}
              fontWeight={`600`}
              color={Theme.basicTheme_C}
              margin={`30px 0 14px`}
            >
              주로 하게 될 역할(기술)과 장르는 무엇인가요?
            </Text>
            <TextArea
              width={`100%`}
              height={`85px`}
              placeholder="예) R&B 소울 음악을 추구하고, 주로 트랙을 만들고 작·편곡을 합니다."
            />
            <Text
              fontSize={`16px`}
              fontWeight={`600`}
              color={Theme.basicTheme_C}
              margin={`30px 0 14px`}
            >
              자신있는 대표 작업물을 올려주세요!
            </Text>
            <Text color={Theme.grey_C}>
              (주 활동 계획에 Musictem과 Artist로서 활동을 모두 선택하셨다면 두
              가지 관련된 작업물을 모두 올려주세요!)
            </Text>

            <Wrapper dr={`row`} ju={`space-between`} margin={`12px 0 10px`}>
              <TextInput
                width={`calc(100% - 110px)`}
                height={`50px`}
                type="type"
                border={`1px solid ${Theme.lightGrey_C}`}
                placeholder="장르를 선택해주세요."
              />
              <CommonButton
                width={`100px`}
                height={`50px`}
                fontSize={`16px`}
                fontWeight={`bold`}
                kindOf={`subTheme2`}
              >
                파일등록
              </CommonButton>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`16px 14px`}
              bgColor={Theme.lightGrey2_C}
            >
              <Text fontSize={`16px`} color={Theme.grey_C}>
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/music-file.png`}
                  width={`14px`}
                  margin={`0 5px 0 0`}
                />
                K-Pop.WAV
              </Text>
              <CloseOutlined />
            </Wrapper>
          </Wrapper>
          <CommonButton
            width={`180px`}
            height={`50px`}
            fontSize={`18px`}
            margin={`30px 0 0`}
            onClick={() => [completeModalOpenToggle(), modalOpenToggle()]}
          >
            신청하기
          </CommonButton>
        </Wrapper>
      </Modal>

      <Modal
        footer={null}
        onCancel={completeModalOpenToggle}
        visible={isComplete}
      >
        <Wrapper padding={`30px`}>
          <Text
            fontSize={`28px`}
            fontWeight={`600`}
            color={Theme.basicTheme_C}
            margin={`0 0 16px`}
          >
            신청 완료
          </Text>
          <Text fontSize={`16px`}>판매자로 전환 신청이 완료 되었습니다!</Text>
          <Text fontSize={`16px`}>
            심사가 완료되면, 판매자 기능이 오픈됩니다.
          </Text>
          <Text fontSize={`16px`}>
            그동안 다른 Artist의 음악을 탐색해보세요!
          </Text>
          <CommonButton
            width={`150px`}
            height={`50px`}
            fontSize={`18px`}
            margin={`30px 0 0`}
            onClick={() => completeModalOpenToggle()}
          >
            둘러보기
          </CommonButton>
        </Wrapper>
      </Modal>
    </WholeWrapper>
  );
};

export default MypageMenu;
