import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { Checkbox, message, Modal } from "antd";
import useInput from "../hooks/useInput";
import {
  LOAD_MY_INFO_REQUEST,
  USER_IMAGE_RESET,
  USER_IMG_UPDATE_REQUEST,
  USER_UPLOAD_REQUEST,
} from "../reducers/user";
import {
  ARTIST_IMAGE_RESET,
  ARTIST_UPLOAD_REQUEST,
  PERMM_WAITING_CREATE_REQUEST,
} from "../reducers/artist";

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
  const {
    me,
    userPath,

    st_userImgUpdateDone,
    st_userImgUpdateError,

    st_userUploadLoading,
    st_userUploadDone,
    st_userUploadError,
  } = useSelector((state) => state.user);

  const {
    artistPath,

    st_permmWaitingCreateDone,
    st_permmWaitingCreateError,

    st_artistUploadLoading,
    st_artistUploadDone,
    st_artistUploadError,
  } = useSelector((state) => state.artist);

  ////////////// - USE STATE- ///////////////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const imgRef = useRef(); // 프로필 변경
  const fileRef = useRef(); // 판매자 파일 등록

  const [isModal, setIsModal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [mypageOpen, setMypageOpen] = useState(false);
  const [mypageOpen2, setMypageOpen2] = useState(false);
  const [mypageOpen3, setMypageOpen3] = useState(false);

  const plan = useInput("");
  const techGenre = useInput("");
  const [fileName, setFileName] = useState("");

  const [files, setFiles] = useState([]);

  ////////////// - USE EFFECT- //////////////

  // 사용자 이미지 변경
  useEffect(() => {
    if (st_userUploadDone) {
      dispatch({
        type: USER_IMG_UPDATE_REQUEST,
        data: {
          profileImage: userPath,
        },
      });
    }
    if (st_userUploadError) {
      return message.error(st_userUploadError);
    }
  }, [st_userUploadDone, st_userUploadError]);

  useEffect(() => {
    if (st_userImgUpdateDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      dispatch({
        type: USER_IMAGE_RESET,
      });

      return message.success("프로필사진이 변경되었습니다.");
    }
    if (st_userImgUpdateError) {
      return message.error(st_userImgUpdateError);
    }
  }, [st_userImgUpdateDone, st_userImgUpdateError]);

  // 판매자 파일 등록
  useEffect(() => {
    if (st_artistUploadDone) {
      let arr = files ? files.map((data) => data) : [];

      arr.push({
        id: arr.length,
        filename: fileName,
        filepath: artistPath,
      });

      setFiles(arr);
    }
    if (st_artistUploadError) {
      return message.error(st_artistUploadError);
    }
  }, [st_artistUploadDone, st_artistUploadError]);

  // 판매자 전환 신청 후처리
  useEffect(() => {
    if (st_permmWaitingCreateDone) {
      plan.setValue("");
      techGenre.setValue("");
      setFileName("");
      setFiles([]);
      dispatch({
        type: ARTIST_IMAGE_RESET,
      });

      modalOpenToggle();
      completeModalOpenToggle();
    }
    if (st_permmWaitingCreateError) {
      return message.error(st_permmWaitingCreateError);
    }
  }, [st_permmWaitingCreateDone, st_permmWaitingCreateError]);

  ///////////// - TOGGLE - ////////////

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

  ///////////// - EVENT HANDLER- ////////////

  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 사용자 이미지 등록
  const imgClickHandler = useCallback(() => {
    imgRef.current.click();
  }, [imgRef]);

  const imgUploadHandler = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (e.target.files.length < 1) {
      return;
    }

    dispatch({
      type: USER_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  // 판매자 파일 등록
  const fileClickHandler = useCallback(() => {
    fileRef.current.click();
  }, [fileRef]);

  const fileUploadHandler = useCallback((e) => {
    setFileName(e.target.files[0].name);

    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (e.target.files.length < 1) {
      return;
    }

    dispatch({
      type: ARTIST_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  // 파일 삭제
  const fileDeleteHandler = useCallback(
    (data) => {
      if (files) {
        const arr = files.filter(function (_, index) {
          return index !== data;
        });

        setFiles(arr);
      }
    },
    [files]
  );

  // 판매자 신청
  const salesRequestHandler = useCallback(() => {
    if (!plan.value || plan.value.trim() === "") {
      return message.error("활동 계획을 입력해주세요.");
    }

    if (!techGenre.value || techGenre.value.trim() === "") {
      return message.error("역활과 장르를 입력해주세요.");
    }

    if (files.length === 0) {
      return message.error("작업물을 등록해주세요.");
    }

    dispatch({
      type: PERMM_WAITING_CREATE_REQUEST,
      data: {
        plan: plan.value,
        gen: techGenre.value,
        imagePaths: files,
      },
    });
  }, [files, plan, techGenre]);

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
            src={userPath ? userPath : me && me.profileImage}
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
            onClick={imgClickHandler}
            loading={st_userUploadLoading}
          >
            <input
              ref={imgRef}
              type={`file`}
              accept={`.jpg, .png`}
              hidden
              onChange={imgUploadHandler}
            />
            <FormOutlined />
          </Wrapper>
        </Wrapper>
        <Text fontSize={`22px`} fontWeight={`bold`} margin={`20px 0 12px`}>
          {me && me.nickname}
        </Text>
        {me && me.isArtist === "일반" ? (
          <CommonButton
            width={`162px`}
            height={`45px`}
            kindOf={`subTheme3`}
            radius={`7px`}
            onClick={modalOpenToggle}
          >
            판매자로 전환
          </CommonButton>
        ) : (
          <>
            <CommonButton
              width={`162px`}
              height={`45px`}
              kindOf={
                router.pathname === `/mypage/artisttem` ? `` : `subTheme3`
              }
              radius={`7px`}
              margin={`0 0 10px`}
              onClick={() => movelinkHandler(`/mypage/artisttem`)}
            >
              My Artisttem
            </CommonButton>
            <CommonButton
              width={`162px`}
              height={`45px`}
              kindOf={
                router.pathname.includes(`/mypage/musictem`) ? `` : `subTheme3`
              }
              radius={`7px`}
              onClick={() => movelinkHandler(`/mypage/musictem`)}
            >
              My Musictem
            </CommonButton>
          </>
        )}
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
            {/* <Text
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
            </Text> */}
            <Text
              fontSize={`16px`}
              fontWeight={`bold`}
              color={
                router.pathname === `/mypage/like`
                  ? Theme.black_C
                  : Theme.grey2_C
              }
              onClick={() => movelinkHandler(`/mypage/like`)}
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
                router.pathname === `/mypage/order`
                  ? Theme.black_C
                  : Theme.grey2_C
              }
              onClick={() => movelinkHandler(`/mypage/order`)}
              isHover
            >
              결제 내역
            </Text>
          </Wrapper>
        )}

        {me && me.isArtist === "아티스트" && (
          <>
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
                  color={
                    router.pathname === `/mypage/advertise/application`
                      ? Theme.black_C
                      : Theme.grey2_C
                  }
                  isHover
                  margin={`0 0 22px`}
                  onClick={() =>
                    movelinkHandler(`/mypage/advertise/application`)
                  }
                >
                  광고 신청
                </Text>
                <Text
                  fontSize={`16px`}
                  fontWeight={`bold`}
                  onClick={() => movelinkHandler(`/mypage/advertise/history`)}
                  color={
                    router.pathname === `/mypage/advertise/history`
                      ? Theme.black_C
                      : Theme.grey2_C
                  }
                  isHover
                >
                  신청 내역
                </Text>
              </Wrapper>
            )}
          </>
        )}
        <Menu
          isActive={router.pathname === `/mypage/point`}
          onClick={() => movelinkHandler(`/mypage/point`)}
        >
          포인트 관리
        </Menu>

        {me && me.isArtist === "아티스트" ? (
          <>
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
                  color={
                    router.pathname === `/` ? Theme.black_C : Theme.grey2_C
                  }
                  isHover
                  margin={`0 0 22px`}
                  onClick={() => movelinkHandler(`/mypage/info`)}
                >
                  회원정보 수정
                </Text>
                <Text
                  fontSize={`16px`}
                  fontWeight={`bold`}
                  color={
                    router.pathname === `/` ? Theme.black_C : Theme.grey2_C
                  }
                  isHover
                >
                  계좌 관리
                </Text>
              </Wrapper>
            )}
          </>
        ) : (
          <Menu
            isActive={router.pathname === `/mypage/info`}
            onClick={() => movelinkHandler(`/mypage/info`)}
          >
            개인정보 관리
          </Menu>
        )}
      </Wrapper>

      {/* 신청토글 */}

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
              {...plan}
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
              {...techGenre}
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
                placeholder="파일을 등록해주세요."
              />
              <input
                type="file"
                name="file"
                hidden
                ref={fileRef}
                onChange={fileUploadHandler}
              />
              <CommonButton
                width={`100px`}
                height={`50px`}
                fontSize={`16px`}
                fontWeight={`bold`}
                kindOf={`subTheme2`}
                onClick={fileClickHandler}
                loading={st_artistUploadLoading}
              >
                파일등록
              </CommonButton>
            </Wrapper>

            {files &&
              files.map((data) => {
                return (
                  <Wrapper
                    key={data.id}
                    dr={`row`}
                    ju={`space-between`}
                    padding={`16px 14px`}
                    margin={`0 0 10px`}
                    bgColor={Theme.lightGrey2_C}
                  >
                    <Text fontSize={`16px`} color={Theme.grey_C}>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/music-file.png`}
                        width={`14px`}
                        margin={`0 5px 0 0`}
                      />
                      {data.filename}
                    </Text>
                    <CloseOutlined
                      cursor={`pointer`}
                      onClick={() => fileDeleteHandler(data.id)}
                    />
                  </Wrapper>
                );
              })}
          </Wrapper>
          <CommonButton
            width={`180px`}
            height={`50px`}
            fontSize={`18px`}
            margin={`30px 0 0`}
            onClick={salesRequestHandler}
          >
            신청하기
          </CommonButton>
        </Wrapper>
      </Modal>

      {/* 신청완료 토글 */}
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
