import { Drawer, Modal, message } from "antd";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWidth from "../hooks/useWidth";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import {
  Image,
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  ATag,
  TextInput,
  CommonButton,
  TextArea,
} from "./commonComponents";
import MypageMenu from "./MypageMenu";
import Theme from "./Theme";
import useInput from "../hooks/useInput";
import { INQUIRY_REQUEST } from "../reducers/question";

const AppHeader = () => {
  ////////////// - USE STATE- ///////////////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const userId = useInput("");
  const mobile = useInput("");
  const content = useInput("");

  const { logos } = useSelector((state) => state.logo);
  const { me } = useSelector((state) => state.user);
  const { st_inquiryDone, st_inquiryError } = useSelector(
    (state) => state.question
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  const [iModal, setIModal] = useState(false);

  ///////////// - USE EFFECT- ////////////

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_inquiryDone) {
      userId.setValue("");
      mobile.setValue("");
      content.setValue("");

      inquiryModal();

      return message.success("제작문의가 요청되었습니다.");
    }

    if (st_inquiryError) {
      return message.error(st_inquiryError);
    }
  }, [st_inquiryDone, st_inquiryError]);

  ///////////// - EVENT HANDLER- ////////////
  const menuOpenToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [menuOpen]);

  const modalToggle1 = useCallback(() => {
    setModalOpen1((prev) => !prev);
  }, [modalOpen1]);

  const modalToggle2 = useCallback(() => {
    setModalOpen2((prev) => !prev);
  }, [modalOpen2]);

  const inquiryModal = useCallback(() => {
    setIModal((prev) => !prev);
  }, [iModal]);

  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const inquiryHandler = useCallback(() => {
    if (!userId.value) {
      return message.error("아이디를 입력해주세요.");
    }

    if (!mobile.value) {
      return message.error("핸드폰번호를 입력해주세요.");
    }

    if (!content.value) {
      return message.error("요청 내용을 입력해주세요.");
    }

    dispatch({
      type: INQUIRY_REQUEST,
      data: {
        userId: userId.value,
        mobile: mobile.value,
        content: content.value,
      },
    });
  }, [userId, mobile, content]);
  ////////////// - USE EFFECT- //////////////

  return (
    <WholeWrapper
      position={`fixed`}
      top={`0`}
      left={`0`}
      zIndex={`10`}
      height={width < 900 ? `70px` : `84px`}
    >
      {width < 900 ? (
        <RsWrapper dr={`row`} ju={`space-between`} bgColor={Theme.white_C}>
          <Image
            width={`30px`}
            alt="menu icon"
            cursor={`pointer`}
            onClick={menuOpenToggle}
            src={
              router.pathname === `/license`
                ? `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/menu_w.png`
                : `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/menu.png`
            }
          />
          {me ? (
            <Wrapper width={`auto`} dr={`row`} ju={`flex-end`}>
              <Text
                onClick={() => movelinkHandler(`/mypage`)}
                isHover
                color={
                  router.pathname === `/license` ? Theme.white_C : Theme.grey_C
                }
                margin={`0 20px 0 0`}
              >
                {me && me.isArtist}회원
              </Text>
              <Wrapper
                width={`48px`}
                height={`48px`}
                radius={`100%`}
                cursor={`pointer`}
                onClick={() => movelinkHandler(`/mypage`)}
              >
                <Image
                  height={`100%`}
                  radius={`100%`}
                  alt="profile"
                  src={me && me.profileImage}
                />
              </Wrapper>

              <CommonButton
                height={`48px`}
                margin={`0 10px`}
                fontWeight={`500`}
                onClick={inquiryModal}
              >
                New Wave Sound에 제작문의
              </CommonButton>
            </Wrapper>
          ) : (
            <Wrapper width={`auto`} dr={`row`}>
              <Text
                onClick={() => movelinkHandler(`/user/signup`)}
                isHover
                color={
                  router.pathname === `/license` ? Theme.white_C : Theme.grey_C
                }
                margin={`0 20px 0 0`}
              >
                회원가입
              </Text>
              <Wrapper
                width={width < 900 ? `40px` : `48px`}
                height={width < 900 ? `40px` : `48px`}
                bgColor={Theme.basicTheme_C}
                radius={`100%`}
                cursor={`pointer`}
                onClick={() => movelinkHandler(`/user/login`)}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/account.png`}
                  width={`20px`}
                />
              </Wrapper>

              <CommonButton
                height={`48px`}
                margin={`0 10px`}
                fontWeight={`500`}
                onClick={inquiryModal}
              >
                New Wave Sound에 제작문의
              </CommonButton>
            </Wrapper>
          )}
        </RsWrapper>
      ) : (
        <RsWrapper dr={`row`} ju={`space-between`}>
          {router.pathname.includes(`/user`) && (
            <ATag href="/" width={`197px`}>
              {logos && logos.find((data) => data.typeOf === "H") && (
                <Image
                  width={`197px`}
                  src={logos.find((data) => data.typeOf === "H").imageURL}
                  alt="logo"
                />
              )}
            </ATag>
          )}

          {me ? (
            <Wrapper
              width={router.pathname.includes(`/user`) ? `auto` : `100%`}
              dr={`row`}
              ju={`flex-end`}
            >
              <Text
                onClick={() => movelinkHandler(`/mypage`)}
                isHover
                color={
                  router.pathname === `/license` ? Theme.white_C : Theme.grey_C
                }
                margin={`0 20px 0 0`}
              >
                {me && me.isArtist}회원
              </Text>
              <Wrapper
                width={`48px`}
                height={`48px`}
                radius={`100%`}
                cursor={`pointer`}
                onClick={() => movelinkHandler(`/mypage`)}
              >
                <Image
                  height={`100%`}
                  radius={`100%`}
                  alt="profile"
                  src={me && me.profileImage}
                />
              </Wrapper>

              <CommonButton
                height={`48px`}
                margin={`0 10px`}
                fontWeight={`500`}
                onClick={inquiryModal}
              >
                New Wave Sound에 제작문의
              </CommonButton>
            </Wrapper>
          ) : (
            <Wrapper
              width={router.pathname.includes(`/user`) ? `auto` : `100%`}
              dr={`row`}
              ju={`flex-end`}
            >
              <Text
                onClick={() => movelinkHandler(`/user/signup`)}
                isHover
                color={
                  router.pathname === `/license` ? Theme.white_C : Theme.grey_C
                }
                margin={`0 20px 0 0`}
              >
                회원가입
              </Text>
              <Wrapper
                width={`48px`}
                height={`48px`}
                bgColor={Theme.basicTheme_C}
                radius={`100%`}
                cursor={`pointer`}
                onClick={() => movelinkHandler(`/user/login`)}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/account.png`}
                  width={`20px`}
                />
              </Wrapper>

              <CommonButton
                height={`48px`}
                margin={`0 10px`}
                fontWeight={`500`}
                onClick={inquiryModal}
              >
                New Wave Sound에 제작문의
              </CommonButton>
            </Wrapper>
          )}
        </RsWrapper>
      )}

      <Drawer visible={menuOpen} onClose={menuOpenToggle} placement={"left"}>
        <ATag href="/" width={`197px`}>
          {logos && logos.find((data) => data.typeOf === "H") && (
            <Image
              width={`197px`}
              margin={`30px 0 0`}
              src={logos.find((data) => data.typeOf === "H").imageURL}
              alt="logo"
            />
          )}
        </ATag>
        <Wrapper
          margin={`26px 0 40px`}
          width={`180px`}
          position={`relative`}
          height={`40px`}
        >
          <TextInput
            type="text"
            placeholder="Search"
            width={`100%`}
            height={`40px`}
            radius={`30px`}
            padding={`0 30px 0 10px`}
            border={`1px solid ${Theme.lightGrey_C}`}
          />
          <Image
            alt="search icon"
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/search.png`}
            width={`16px`}
            position={`absolute`}
            right={`14px`}
          />
        </Wrapper>
        {router.pathname.includes(`/mypage`) ? (
          <MypageMenu />
        ) : (
          <>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`22px`}
                color={Theme.basicTheme_C}
              >
                Item
              </Text>
              <Image
                alt="icon"
                cursor={`pointer`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/question-mark.png`}
                width={`18px`}
                margin={`0 0 0 4px`}
                onClick={modalToggle1}
              />
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 30px`}
              onClick={() => movelinkHandler(`/artisttem`)}
            >
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/artisttem.png`}
                width={`14px`}
                margin={`0 10px 0 0`}
              />
              <Text fontSize={`16px`} isHover color={Theme.grey_C}>
                Artisttem
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 30px`}
              onClick={() => movelinkHandler(`/musictem`)}
            >
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/musictem.png`}
                width={`14px`}
                margin={`0 10px 0 0`}
              />
              <Text fontSize={`16px`} isHover color={Theme.grey_C}>
                Musictem
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`22px`}
                color={Theme.basicTheme_C}
              >
                Artworks
              </Text>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/question-mark.png`}
                width={`18px`}
                margin={`0 0 0 4px`}
                onClick={modalToggle2}
                cursor={`pointer`}
              />
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 30px`}
              onClick={() => movelinkHandler(`/artwork`)}
            >
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/artworks.png`}
                width={`14px`}
                margin={`0 10px 0 0`}
              />
              <Text fontSize={`16px`} isHover color={Theme.grey_C}>
                Artworks Community
              </Text>
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 30px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`22px`}
                color={Theme.basicTheme_C}
              >
                C/S Center
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 30px`}
              onClick={() => movelinkHandler(`/notice`)}
            >
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/notice.png`}
                width={`14px`}
                margin={`0 10px 0 0`}
              />
              <Text fontSize={`16px`} isHover color={Theme.grey_C}>
                Notice
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 30px`}
              onClick={() => movelinkHandler(`/faq`)}
            >
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/faq.png`}
                width={`14px`}
                margin={`0 10px 0 0`}
              />
              <Text fontSize={`16px`} isHover color={Theme.grey_C}>
                FAQ
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              onClick={() => movelinkHandler(`/contact`)}
            >
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/contact.png`}
                width={`14px`}
                margin={`0 10px 0 0`}
              />
              <Text fontSize={`16px`} isHover color={Theme.grey_C}>
                Contact Us
              </Text>
            </Wrapper>
          </>
        )}
      </Drawer>

      <Modal
        onCancel={modalToggle1}
        visible={modalOpen1}
        footer={null}
        width={`690px`}
      >
        <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
          <Text
            fontWeight={`bold`}
            fontSize={`28px`}
            color={Theme.basicTheme_C}
            margin={`0 0 16px`}
          >
            Item이란?
          </Text>
          <Text fontSize={`16px`} fontWeight={`bold`}>
            Artist를 찾고 의뢰하는 플랫폼 뉴웨이브사운드
          </Text>
          <Text fontSize={`16px`}>
            어떤 음악이든 원하는 사운드를 만드실 수 있습니다.
          </Text>
          <Text fontSize={`16px`}>
            혹은 아티스트가 되어 음악을 판매해보세요!
          </Text>

          <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0 0`}>
            <Wrapper
              width={`280px`}
              bgColor={Theme.subTheme_C}
              radius={`7px`}
              padding={`30px 0`}
            >
              <Text
                color={Theme.basicTheme_C}
                fontWeight={`bold`}
                fontSize={`18px`}
              >
                Artisttem
              </Text>
              <Wrapper
                width={`80px`}
                height={`80px`}
                radius={`100%`}
                bgColor={Theme.white_C}
                margin={`14px 0 24px`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/artisttem.png`}
                  width={`32px`}
                />
              </Wrapper>
              <Text fontSize={`18px`}>원하는 Artist를 탐색하고</Text>
              <Text fontSize={`18px`}>의뢰하여 놀라운 음악을</Text>
              <Text fontSize={`18px`}>완성하세요.</Text>
            </Wrapper>
            <Wrapper
              width={`280px`}
              bgColor={Theme.subTheme_C}
              radius={`7px`}
              padding={`30px 0`}
            >
              <Text
                color={Theme.basicTheme_C}
                fontWeight={`bold`}
                fontSize={`18px`}
              >
                Musictem
              </Text>
              <Wrapper
                width={`80px`}
                height={`80px`}
                radius={`100%`}
                bgColor={Theme.white_C}
                margin={`14px 0 24px`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/musictem.png`}
                  width={`32px`}
                />
              </Wrapper>
              <Text fontSize={`18px`}>당신의 제작물에 청각적</Text>
              <Text fontSize={`18px`}>숨결을 불어넣고 더욱더 완벽한</Text>
              <Text fontSize={`18px`}>작품을 만들어 보세요.</Text>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Modal>
      <Modal onCancel={modalToggle2} visible={modalOpen2} footer={null}>
        <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
          <Text
            fontWeight={`bold`}
            fontSize={`28px`}
            color={Theme.basicTheme_C}
            margin={`0 0 16px`}
          >
            Artworks Community이란?
          </Text>
          <Text fontSize={`16px`} fontWeight={`bold`}>
            Artist를 찾고 의뢰하는 플랫폼 뉴웨이브사운드
          </Text>
          <Text fontSize={`16px`}>
            어떤 음악이든 원하는 사운드를 만드실 수 있습니다.
          </Text>
          <Text fontSize={`16px`}>
            혹은 아티스트가 되어 음악을 판매해보세요!
          </Text>

          <Wrapper margin={`30px 0 0`}>
            <Wrapper
              width={`280px`}
              bgColor={Theme.subTheme_C}
              radius={`7px`}
              padding={`30px 0`}
            >
              <Text
                color={Theme.basicTheme_C}
                fontWeight={`bold`}
                fontSize={`18px`}
              >
                Artworks Community
              </Text>
              <Wrapper
                width={`80px`}
                height={`80px`}
                radius={`100%`}
                bgColor={Theme.white_C}
                margin={`14px 0 24px`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/artworks.png`}
                  width={`32px`}
                />
              </Wrapper>
              <Text fontSize={`18px`}>이젠 편리하게 Track,</Text>
              <Text fontSize={`18px`}>Top-line을 구매해서</Text>
              <Text fontSize={`18px`}>사용하세요.</Text>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Modal>

      <Modal
        width={width < 700 ? `100%` : `680px`}
        onCancel={inquiryModal}
        visible={iModal}
        footer={null}
      >
        <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
          <Text
            fontWeight={`bold`}
            fontSize={width < 900 ? `22px` : `28px`}
            color={Theme.basicTheme_C}
            margin={`0 0 16px`}
          >
            New Wave Sound에 제작 문의하기
          </Text>
          <Wrapper
            bgColor={Theme.lightGrey2_C}
            padding={`30px 20px`}
            al={`flex-start`}
          >
            <Text
              fontSize={width < 900 ? `16px` : `20px`}
              fontWeight={`bold`}
              margin={`0 0 12px`}
            >
              맞춤 제작을 원하시나요?
            </Text>

            <Text
              fontSize={width < 900 ? `16px` : `20px`}
              fontWeight={`bold`}
              margin={`30px 0 12px`}
            >
              메일로 요청하시면 따로 연락 드리겠습니다.
            </Text>

            <Text
              fontSize={width < 900 ? `16px` : `20px`}
              fontWeight={`bold`}
              margin={`30px 0 12px`}
            >
              요청 메일 형식
            </Text>
            <Text
              fontSize={width < 900 ? `14px` : `16px`}
              color={Theme.darkGrey_C}
            >
              요청자 ID
            </Text>
            <TextInput
              margin={`12px 0`}
              width={`100%`}
              height={`50px`}
              border={`1px solid ${Theme.lightGrey_C}`}
              type="text"
              placeholder="아이디를 입력해주세요."
              {...userId}
            />
            <Text
              fontSize={width < 900 ? `14px` : `16px`}
              color={Theme.darkGrey_C}
            >
              핸드폰번호 :
            </Text>
            <TextInput
              margin={`12px 0`}
              width={`100%`}
              height={`50px`}
              border={`1px solid ${Theme.lightGrey_C}`}
              type="text"
              placeholder="핸드폰번호를 입력해주세요."
              {...mobile}
            />
            <Text
              fontSize={width < 900 ? `14px` : `16px`}
              color={Theme.darkGrey_C}
            >
              요청 내용 :
            </Text>
            <TextArea
              margin={`12px 0`}
              width={`100%`}
              border={`1px solid ${Theme.lightGrey_C}`}
              type="text"
              placeholder="내용을 입력해주세요."
              {...content}
            />

            <Wrapper>
              <CommonButton
                width={`180px`}
                height={`48px`}
                margin={`30px 0 0`}
                fontSize={width < 900 ? `16px` : `18px`}
                fontWeight={`500`}
                onClick={inquiryHandler}
              >
                메일로 요청하기
              </CommonButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Modal>
    </WholeWrapper>
  );
};

export default AppHeader;
