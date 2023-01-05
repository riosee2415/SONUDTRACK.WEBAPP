import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  ATag,
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  TextInput,
} from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { useRouter } from "next/router";
import { Drawer, Modal } from "antd";
import useWidth from "../hooks/useWidth";

const Btn = styled(Wrapper)`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  margin: 0 0 16px;

  &:hover {
    background: ${Theme.basicTheme_C};
    cursor: pointer;

    & img {
      filter: brightness(100);
    }
  }
`;

const SideMenu = ({}) => {
  ////////////// - USE STATE- ///////////////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const { logos } = useSelector((state) => state.logo);

  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  ///////////// - EVENT HANDLER- ////////////
  const modalToggle1 = useCallback(() => {
    setModalOpen1((prev) => !prev);
  }, [modalOpen1]);

  const modalToggle2 = useCallback(() => {
    setModalOpen2((prev) => !prev);
  }, [modalOpen2]);

  const menuOpenToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [menuOpen]);
  ////////////// - USE EFFECT- //////////////

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);
  return (
    <WholeWrapper
      width={width < 1280 ? `120px` : `300px`}
      bgColor={Theme.subTheme2_C}
      padding={`30px`}
      al={width < 1280 ? `center` : `flex-start`}
      ju={`flex-start`}
      height={`100vh`}
      position={`fixed`}
      top={`0`}
      left={`0`}
      zIndex={`100`}
    >
      {width < 1280 ? (
        <Wrapper
          padding={`0 0 30px`}
          borderBottom={`1px solid ${Theme.lightGrey_C}`}
        >
          <Image
            width={`40px`}
            alt="menu icon"
            cursor={`pointer`}
            onClick={menuOpenToggle}
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/menu.png`}
          />
        </Wrapper>
      ) : (
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

      {width < 1280 ? (
        <>
          <Image
            width={`40px`}
            margin={`20px 0`}
            alt="logo"
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/logo/favicon.png`}
          />
          <Wrapper
            width={`40px`}
            height={`40px`}
            bgColor={Theme.white_C}
            radius={`100%`}
            cursor={`pointer`}
            onClick={menuOpenToggle}
          >
            <Image
              alt="search icon"
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/search.png`}
              width={`16px`}
            />
          </Wrapper>
          <Wrapper
            borderTop={`1px solid ${Theme.lightGrey_C}`}
            margin={`20px 0 0`}
            padding={`20px 0 0`}
          >
            <Btn>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/artisttem.png`}
                width={`20px`}
              />
            </Btn>
            <Btn>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/musictem.png`}
                width={`20px`}
              />
            </Btn>
            <Btn>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/artworks.png`}
                width={`20px`}
              />
            </Btn>
            <Btn>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/notice.png`}
                width={`20px`}
              />
            </Btn>
            <Btn>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/faq.png`}
                width={`20px`}
              />
            </Btn>
            <Btn>
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/contact.png`}
                width={`20px`}
              />
            </Btn>
          </Wrapper>
        </>
      ) : (
        <>
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
            />
            <Image
              alt="search icon"
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/header-icon/search.png`}
              width={`16px`}
              position={`absolute`}
              right={`14px`}
            />
          </Wrapper>
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
          <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
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
          <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
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
          <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
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
          <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
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
          <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
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
          <Wrapper dr={`row`} ju={`flex-start`}>
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
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
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
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
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
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
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
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
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
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
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
        <Wrapper dr={`row`} ju={`flex-start`}>
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
    </WholeWrapper>
  );
};

export default SideMenu;
