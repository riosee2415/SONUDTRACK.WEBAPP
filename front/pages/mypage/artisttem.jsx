import React, { useEffect, useRef } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  LOAD_MY_INFO_REQUEST,
  USER_IMAGE_RESET,
  USER_UPLOAD_REQUEST,
} from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  SquareBox,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import { Checkbox, message, Modal, Switch } from "antd";
import Theme from "../../components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import useInput from "../../hooks/useInput";
import { COMMON_TAG_LIST_REQUEST } from "../../reducers/product";
import {
  ARTIST_INFO_UPDATE_REQUEST,
  FILMO_FILE_RESET,
  FILMO_FILE_UPLOAD_REQUEST,
  FILMO_IMAGE_RESET,
  FILMO_IMG_UPLOAD_REQUEST,
} from "../../reducers/artist";

const Box = styled(Wrapper)`
  width: calc(100% / 6 - 37px);
  margin: 0 44px 40px 0;
  border-radius: 7px;
  position: relative;
  overflow: hidden;

  &:nth-child(6n) {
    margin: 0 0 40px;
  }

  @media (max-width: 1400px) {
    width: calc(100% / 5 - 24px);
    margin: 0 30px 40px 0;

    &:nth-child(6n) {
      margin: 0 30px 40px 0;
    }

    &:nth-child(5n) {
      margin: 0 0 40px;
    }
  }

  @media (max-width: 700px) {
    width: calc(100% / 2 - 8px);
    margin: 0 10px 40px 0;

    &:nth-child(6n) {
      margin: 0 5px 40px 0;
    }

    &:nth-child(5n) {
      margin: 0 5px 40px 0;
    }

    &:nth-child(2n) {
      margin: 0 5px 40px 0;
    }
  }
`;

const TagBtn = styled(CommonButton)`
  ${(props) =>
    props.isActive &&
    `
    border :1px solid ${Theme.basicTheme_C};
    background: ${Theme.white_C};
    color : ${Theme.black_C};
  `}
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const {
    me,
    userPath,

    st_userUploadLoading,
    st_userUploadDone,
    st_userUploadError,
  } = useSelector((state) => state.user);

  const { commonTags } = useSelector((state) => state.product);

  const {
    filmoFile,
    st_filmoFileUploadLoading,
    st_filmoFileUploadDone,
    st_filmoFileUploadError,

    filmoImg,
    st_filmoImgUploadLoading,
    st_filmoImgUploadDone,
    st_filmoImgUploadError,

    st_artistInfoUpdateDone,
    st_artistInfoUpdateError,
  } = useSelector((state) => state.artist);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const imgRef = useRef(); // 프로필 변경
  const filmoFileRef = useRef(); // 필모 음원
  const filmoImgRef = useRef(); // 필모 앨범이미지

  const comName = useInput(""); // 담당자명
  const comNum = useInput(""); // 사업자번호
  const [isComNum, setIsComNum] = useState(false); // 사업자번호 인증
  const artistName = useInput(""); // 아티스트명
  const [profileName, setProfileName] = useState(""); // 프로필이미지 이름
  const artistInfo = useInput(""); // 아티스트소개
  const artCoun = useInput(""); // 사용가능한 언어
  const [useArtCoun, setUseArtCoun] = useState([]); // 사용가능한 언어/국가
  const ques1 = useInput(""); // 질문1
  const ques2 = useInput(""); // 질문2
  const ques3 = useInput(""); // 질문3
  const ques4 = useInput(""); // 질문4
  const ques5 = useInput(""); // 질문5
  const ques6 = useInput(""); // 질문6
  const ques7 = useInput(""); // 질문7
  const ques8 = useInput(""); // 그 외 질문8

  const roleName = useInput(""); // 필모 역활
  const comment = useInput(""); // 필모 코멘트
  const singer = useInput(""); // 필모 가수
  const songTitle = useInput(""); // 필모 곡제목
  const filmoFileName = useInput(""); // 필모 파일이름
  const filmoImgName = useInput(""); // 필모 곡제목
  const [filmoArr, setFilmoArr] = useState([]); // 필모그래피 데이터
  const [tagArr, setTagArr] = useState([]); // 검색 태그

  const [filmo, setFilmo] = useState(false);
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);
      window.scrollTo({ top: 0, behavior: "smooth" });

      return message.error(`로그인이 필요한 페이지입니다.`);
    }
  }, [me]);

  useEffect(() => {
    if (!filmo) {
      roleName.setValue("");
      comment.setValue("");
      singer.setValue("");
      songTitle.setValue("");
      filmoFileName.setValue("");
      filmoImgName.setValue("");

      dispatch({
        type: FILMO_FILE_RESET,
      });
      dispatch({
        type: FILMO_IMAGE_RESET,
      });
    }
  }, [filmo]);

  // 필모 음원 등록
  useEffect(() => {
    if (st_filmoFileUploadDone) {
      return message.success("음원이 등록되었습니다.");
    }
    if (st_filmoFileUploadError) {
      return message.error(st_filmoFileUploadError);
    }
  }, [st_filmoFileUploadDone, st_filmoFileUploadError]);

  // 필모 앪범 이미지 등록
  useEffect(() => {
    if (st_filmoImgUploadDone) {
      return message.success("앨범 커버 이미지가 등록되었습니다.");
    }
    if (st_filmoImgUploadError) {
      return message.error(st_filmoImgUploadError);
    }
  }, [st_filmoImgUploadDone, st_filmoImgUploadError]);

  useEffect(() => {
    if (st_artistInfoUpdateDone) {
      comName.setValue("");
      comNum.setValue("");
      setIsComNum(false);
      artistName.setValue("");
      setProfileName("");
      artistInfo.setValue("");
      artCoun.setValue("");
      setUseArtCoun([]);
      ques1.setValue("");
      ques2.setValue("");
      ques3.setValue("");
      ques4.setValue("");
      ques5.setValue("");
      ques6.setValue("");
      ques7.setValue("");
      ques8.setValue("");
      setFilmoArr([]);

      router.push(`/artisttem/${me && me.ArtistId}`);

      return message.success("프로필이 수정되었습니다.");
    }

    if (st_artistInfoUpdateError) {
      return message.error(st_artistInfoUpdateError);
    }
  }, [st_artistInfoUpdateDone, st_artistInfoUpdateError]);

  ////// TOGGLE //////
  const filmoToggle = useCallback(() => {
    setFilmo((prev) => !prev);
  }, [filmo]);

  ////// HANDLER //////
  // 사업자번호 존재하면 기업명 가져오기
  const businessNumCheck = useCallback(() => {
    if (!comNum.value) {
      return message.error("사업자번호를 입력해주세요.");
    }

    const b1 = comNum.value.substr(0, 3);
    const b2 = comNum.value.substr(3, 2);
    const b3 = comNum.value.substr(5, 6);

    let checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    // let tmpBizID, i, chkSum=0, c2, remander;

    let chkSum = 0;
    let c2 = null;
    let remander = null;
    let bizID = b1 + b2 + b3;

    if (!bizID) return false;

    for (let i = 0; i <= 7; i++) chkSum += checkID[i] * bizID.charAt(i);
    c2 = "0" + checkID[8] * bizID.charAt(8);
    c2 = c2.substring(c2.length - 2, c2.length);
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
    remander = (10 - (chkSum % 10)) % 10;

    if (Math.floor(bizID.charAt(9)) === remander) {
      setIsComNum(true);
      return message.success("인증되었습니다.");
    } // OK!
    else {
      setIsComNum(false);
      return message.error("사업자번호를 정확하게 다시 입력해주세요.");
    }
  }, [comNum.value, isComNum]);

  // 프로필 등록
  const imgClickHandler = useCallback(() => {
    imgRef.current.click();
  }, [imgRef]);

  const imgUploadHandler = useCallback((e) => {
    setProfileName(e.target.files[0].name);

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

  // 프로필 삭제
  const profileDeleteHandler = useCallback(() => {
    setProfileName("");

    dispatch({
      type: USER_IMAGE_RESET,
    });
  }, []);

  // 사용가능한 언어/국가 추가
  const artCounCreateHandler = useCallback(() => {
    if (!artCoun.value) {
      return message.error("사용가능한 언어/국가를 입력해주세요.");
    }

    if (artCoun.value) {
      let arr = useArtCoun ? useArtCoun.map((data) => data) : [];

      arr.push(artCoun.value);

      setUseArtCoun(arr);

      artCoun.setValue("");
    }
  }, [artCoun, useArtCoun]);

  // 사용가능한 언어/국가 삭제
  const artCounDeleteHandler = useCallback(
    (data) => {
      if (useArtCoun) {
        const arr = useArtCoun.filter(function (_, index) {
          return index !== data;
        });

        setUseArtCoun(arr);
      }
    },
    [useArtCoun]
  );

  // 필모음원 등록
  const filmoFileClickHandler = useCallback(() => {
    filmoFileRef.current.click();
  }, [filmoFileRef]);

  const filmoFileUploadHandler = useCallback((e) => {
    filmoFileName.setValue(e.target.files[0].name);

    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (e.target.files.length < 1) {
      return;
    }

    dispatch({
      type: FILMO_FILE_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  // 필모음원 삭제
  const filmoFileDeleteHandler = useCallback(() => {
    filmoFileName.setValue("");

    dispatch({
      type: FILMO_FILE_RESET,
    });
  }, []);

  // 필모앨범이미지 등록
  const filmoImgClickHandler = useCallback(() => {
    filmoImgRef.current.click();
  }, [filmoImgRef]);

  const filmoImgUploadHandler = useCallback((e) => {
    filmoImgName.setValue(e.target.files[0].name);

    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (e.target.files.length < 1) {
      return;
    }

    dispatch({
      type: FILMO_IMG_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  // 필모앨범이미지 삭제
  const filmoImgDeleteHandler = useCallback(() => {
    filmoImgName.setValue("");

    dispatch({
      type: FILMO_IMAGE_RESET,
    });
  }, []);

  const filmoCreateHandler = useCallback(() => {
    if (!roleName.value || roleName.value.trim() === "") {
      return message.error("역활을 입력해주세요.");
    }

    if (!comment.value || comment.value.trim() === "") {
      return message.error("Comment를 입력해주세요.");
    }

    if (!singer.value || singer.value.trim() === "") {
      return message.error("가수명을 입력해주세요.");
    }

    if (!songTitle.value || songTitle.value.trim() === "") {
      return message.error("곡제목을 입력해주세요.");
    }

    if (!filmoFile) {
      return message.error("음원을 등록해주세요.");
    }

    if (!filmoImg) {
      return message.error("이미지를 등록해주세요.");
    }

    let arr = filmoArr ? filmoArr.map((data) => data) : [];

    arr.push({
      roleName: roleName.value,
      comment: comment.value,
      name: singer.value,
      title: songTitle.value,
      musicFile: filmoFile,
      coverImage: filmoImg,
      sort: arr.length + 1,
    });

    setFilmoArr(arr);

    filmoToggle();

    return message.success("필모그래피가 등록되었습니다.");
  }, [roleName, comment, singer, songTitle, filmoFile, filmoImg, filmoArr]);

  // 검색태그 아이디 추가
  const tagHandler = useCallback(
    (type) => {
      const index = tagArr.indexOf(type.id);
      let tempArr = tagArr.map((data) => data);

      if (index !== -1) {
        tempArr = tempArr.filter((data) => data !== type.id);
      } else {
        tempArr.push(type.id);
      }

      setTagArr(tempArr);
    },
    [tagArr]
  );

  const saveHandler = useCallback(() => {
    if (!comName.value || comName.value.trim() === "") {
      return message.error("담당자 성함을 입력해주세요.");
    }

    if (!isComNum) {
      return message.error("사업자번호 인증해주세요.");
    }

    if (!artistName.value || artistName.value.trim() === "") {
      return message.error("아티스트명을 입력해주세요.");
    }

    if (!artistInfo.value || artistInfo.value.trim() === "") {
      return message.error("아티스트 소개를 입력해주세요.");
    }

    if (useArtCoun.length === 0) {
      return message.error("사용 가능한 언어/국가를 등록해주세요.");
    }

    if (!ques1.value || ques1.value.trim() === "") {
      return message.error("질문1을 입력해주세요.");
    }

    if (!ques2.value || ques2.value.trim() === "") {
      return message.error("질문2을 입력해주세요.");
    }

    if (!ques3.value || ques3.value.trim() === "") {
      return message.error("질문3을 입력해주세요.");
    }

    if (!ques4.value || ques4.value.trim() === "") {
      return message.error("질문4을 입력해주세요.");
    }

    if (!ques5.value || ques5.value.trim() === "") {
      return message.error("질문5을 입력해주세요.");
    }

    if (!ques6.value || ques6.value.trim() === "") {
      return message.error("질문6을 입력해주세요.");
    }

    if (!ques7.value || ques7.value.trim() === "") {
      return message.error("질문7을 입력해주세요.");
    }

    if (!ques8.value || ques8.value.trim() === "") {
      return message.error("그 외 하고 싶은말을 입력해주세요.");
    }

    if (filmoArr.length === 0) {
      return message.error("필모그래피를 등록해주세요.");
    }

    if (tagArr.length === 0) {
      return message.error("검색관리를 등록해주세요.");
    }

    dispatch({
      type: ARTIST_INFO_UPDATE_REQUEST,
      data: {
        id: me.ArtistId,
        name: comName.value,
        businessNum: comNum.value,
        artistname: artistName.value,
        info: artistInfo.value,
        question1: ques1.value,
        question2: ques2.value,
        question3: ques3.value,
        question4: ques4.value,
        question5: ques5.value,
        question6: ques6.value,
        question7: ques7.value,
        question8: ques8.value,
        artistFilms: filmoArr,
        artistCountries: useArtCoun,
        tags: tagArr,
      },
    });
  }, [
    comName.value,
    comNum.value,
    artistName.value,
    artistInfo.value,
    useArtCoun,
    isComNum,
    ques1.value,
    ques2.value,
    ques3.value,
    ques4.value,
    ques5.value,
    ques6.value,
    ques7.value,
    ques8.value,
    filmoArr,
    tagArr,
    me,
  ]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | My Artisttem</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 50px`}>
              <Text
                al={`flex-start`}
                fontSize={width < 900 ? `20px` : `30px`}
                fontWeight={`bold`}
              >
                My Artisttem
              </Text>
              <CommonButton
                width={`160px`}
                height={`27px`}
                padding={`0`}
                margin={`0 20px 0 14px`}
              >
                My Artistem 보러가기
              </CommonButton>

              <Text fontSize={`16px`} margin={`0 8px 0 0`}>
                휴가중
              </Text>
              <Switch checkedChildren="on" unCheckedChildren="off" />
            </Wrapper>

            <Wrapper al={`flex-start`}>
              <Text fontSize={`24px`} fontWeight={`600`} margin={`0 0 30px`}>
                사업자번호 인증
              </Text>
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q1.
                </SpanText>
                담당자명
              </Text>
              <TextInput
                width={`200px`}
                height={`50px`}
                placeholder="담당자 성함"
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
                {...comName}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q2.
                </SpanText>
                사업자번호
              </Text>
              <Wrapper
                width={width < 700 ? `100%` : `440px`}
                dr={`row`}
                ju={`space-between`}
                margin={`0 0 60px`}
              >
                <TextInput
                  width={`calc(100% - 108px)`}
                  height={`50px`}
                  placeholder="사업자번호를 입력해주세요."
                  tyoe="text"
                  border={`1px solid ${Theme.lightGrey_C}`}
                  {...comNum}
                />
                <CommonButton
                  width={`100px`}
                  height={`50px`}
                  fontSize={`18px`}
                  fontWeight={`600`}
                  kindOf={`subTheme2`}
                  onClick={businessNumCheck}
                >
                  인증하기
                </CommonButton>
              </Wrapper>
              <Text fontSize={`24px`} fontWeight={`600`} margin={`0 0 30px`}>
                프로필 수정
              </Text>
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q1.
                </SpanText>
                아티스트명
                <SpanText
                  color={Theme.grey2_C}
                  fontWeight={`300`}
                  margin={`0 0 0 4px`}
                >
                  (한 번 설정하면 변경이 어려우니 신중하게 등록해주세요!)
                </SpanText>
              </Text>
              <TextInput
                width={`200px`}
                height={`50px`}
                placeholder="아티스트명"
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
                {...artistName}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q2.
                </SpanText>
                프로필 이미지
              </Text>
              <Wrapper
                width={width < 700 ? `100%` : `440px`}
                dr={`row`}
                ju={`space-between`}
                margin={`0 0 10px`}
              >
                <TextInput
                  width={`calc(100% - 108px)`}
                  height={`50px`}
                  placeholder="프로필 이미지를 등록해주세요."
                  tyoe="text"
                  border={`1px solid ${Theme.lightGrey_C}`}
                />
                <input
                  ref={imgRef}
                  type={`file`}
                  accept={`.jpg, .png`}
                  hidden
                  onChange={imgUploadHandler}
                />
                <CommonButton
                  width={`100px`}
                  height={`50px`}
                  fontSize={`18px`}
                  fontWeight={`600`}
                  kindOf={`subTheme2`}
                  onClick={imgClickHandler}
                  loading={st_userUploadLoading}
                >
                  파일등록
                </CommonButton>
              </Wrapper>
              {userPath && (
                <Wrapper
                  width={width < 700 ? `100%` : `440px`}
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
                    {profileName}
                  </Text>
                  <CloseOutlined onClick={profileDeleteHandler} />
                </Wrapper>
              )}
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`30px 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q3.
                </SpanText>
                아티스트를 소개하는 한 마디
                <SpanText
                  color={Theme.grey2_C}
                  fontWeight={`300`}
                  margin={`0 0 0 4px`}
                >
                  (50자 이내)
                </SpanText>
              </Text>
              <TextInput
                width={width < 900 ? `100%` : `60%`}
                height={`50px`}
                placeholder="예) 전자 음악을 실험하는 것을 좋아하고, 저의 사운드는 개성 있고 독특합니다!"
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
                {...artistInfo}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q4.
                </SpanText>
                사용 가능한 언어/국가
              </Text>
              <Wrapper
                width={width < 700 ? `100%` : `440px`}
                dr={`row`}
                ju={`space-between`}
                margin={`0 0 10px`}
              >
                <TextInput
                  width={`calc(100% - 108px)`}
                  height={`50px`}
                  placeholder="사용 가능한 언어를 작성해주세요. ex) 한국어/대한민국"
                  tyoe="text"
                  border={`1px solid ${Theme.lightGrey_C}`}
                  {...artCoun}
                />
                <CommonButton
                  width={`100px`}
                  height={`50px`}
                  fontSize={`18px`}
                  fontWeight={`600`}
                  kindOf={`subTheme2`}
                  onClick={artCounCreateHandler}
                >
                  추가하기
                </CommonButton>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                width={width < 700 ? `100%` : `440px`}
              >
                {useArtCoun &&
                  useArtCoun.map((data, idx) => {
                    return (
                      <Wrapper
                        width={`auto`}
                        height={`27px`}
                        border={`1px solid ${Theme.lightGrey_C}`}
                        padding={`0 15px`}
                        radius={`25px`}
                        dr={`row`}
                        margin={`0 8px 0 0`}
                        key={idx}
                      >
                        {data}
                        <CloseOutlined
                          onClick={() => artCounDeleteHandler(idx)}
                        />
                      </Wrapper>
                    );
                  })}
              </Wrapper>
              <Text fontSize={`24px`} fontWeight={`600`} margin={`60px 0 30px`}>
                상세 프로필 수정
              </Text>

              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q1.
                </SpanText>
                주로 하는 역할(기술)과 장르는 무엇인가요?
              </Text>
              <TextArea
                width={width < 900 ? `100%` : `60%`}
                height={`86px`}
                placeholder="예) 주로 Pop을 하고 노래와 탑라인을 합니다"
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
                {...ques1}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q2.
                </SpanText>
                보통의 작업 시간은 몇일인가요?
              </Text>
              <TextArea
                width={width < 900 ? `100%` : `60%`}
                height={`86px`}
                placeholder="예) 간단한 데모 정도면 1~2일, 모든 하모니와 탑라인을 포함하면 보통 4~5일 걸립니다."
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
                {...ques2}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q3.
                </SpanText>
                녹음 환경과 장비는 무엇을 사용하나요?
              </Text>
              <TextArea
                width={width < 900 ? `100%` : `60%`}
                height={`86px`}
                placeholder="예) 간단한 데모 정도는 집에서 작업하고, 정식 음원 작업은 녹음실을 대여하여 작업합니다. (SM58 마이크, 아폴로 오디오카드)"
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
                {...ques3}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q4.
                </SpanText>
                평균 비용은 어떻게 되나요?
              </Text>
              <TextArea
                width={width < 900 ? `100%` : `60%`}
                height={`86px`}
                placeholder="예) 탑라인은 곡의 사용에 따라 50~100만원, 보컬은 데모는 25만원, 정식 음원 출판은 50만원 선입니다."
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
                {...ques4}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q5.
                </SpanText>
                만약 작업한 프로젝트가 정식 음원이 출판되거나, 광고나
                라이브러리등의 상업적인 용도로 사용된다면 크레딧이 필요한가요?
              </Text>
              <TextArea
                width={width < 900 ? `100%` : `60%`}
                height={`86px`}
                placeholder="예) 광고나 라이브러리로 판매될 때는 상관이 없으나 정식 음원이 출판될 때에는 저작권 또는 실연협회에 등록되길 원합니다."
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
                {...ques5}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q6.
                </SpanText>
                어떤 뮤지션을 좋아하고, 어떤 음악을 추구하나요?
              </Text>
              <TextArea
                width={width < 900 ? `100%` : `60%`}
                height={`86px`}
                placeholder="예) 아리아나 그란데와 태연을 좋아하고 팝스러운 음악을 추구합니다."
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
                {...ques6}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                <SpanText fontWeight={`bold`} margin={`0 4px 0 0`}>
                  Q7.
                </SpanText>
                이 일을 한지는 얼마나 되었고, 보통 어떤 작업을 하나요?
              </Text>
              <TextArea
                width={width < 900 ? `100%` : `60%`}
                height={`86px`}
                placeholder="예) 5년 정도 이 일을 했고, 서울예술대학을 나와서 특정한 소속사 없이 프리랜서로 많은 작업을 했습니다."
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                margin={`0 0 30px`}
                {...ques7}
              />
              <Text
                fontSize={`16px`}
                color={Theme.grey_C}
                fontWeight={`500`}
                margin={`0 0 12px`}
              >
                그 외 하고싶은 말이 있나요?
              </Text>
              <TextArea
                width={width < 900 ? `100%` : `60%`}
                height={`86px`}
                placeholder="예) 음악에 따라 작업 시간과 비용이 달라질 순 있습니다. 팝스러운 멋진 음악을 원하시면 저에게 문의하세요!"
                tyoe="text"
                border={`1px solid ${Theme.lightGrey_C}`}
                {...ques8}
              />

              <Wrapper dr={`row`} ju={`flex-start`} margin={`60px 0 30px`}>
                <Text
                  fontSize={`24px`}
                  fontWeight={`600`}
                  margin={`0 20px 0 0`}
                >
                  필모그래피 등록
                </Text>
                <CommonButton onClick={filmoToggle}>
                  추가하기 <PlusOutlined />
                </CommonButton>
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-start`}>
                {filmoArr &&
                  filmoArr.map((data) => {
                    return (
                      <Box key={data.sort}>
                        <SquareBox>
                          <Image alt="thumbnail" src={data.coverImage} />
                        </SquareBox>
                        <Wrapper
                          height={`100%`}
                          bgColor={`rgba(0, 0, 0, 0.6)`}
                          color={Theme.white_C}
                          position={`absolute`}
                          top={`0`}
                          left={`0`}
                        >
                          <Text fontSize={`20px`} fontWeight={`bold`}>
                            {data.name}
                          </Text>
                          <Text fontSize={`16px`}>{data.title}</Text>
                        </Wrapper>
                      </Box>
                    );
                  })}
              </Wrapper>

              <Text fontSize={`24px`} fontWeight={`600`} margin={`60px 0 30px`}>
                검색 관리(TAG)
              </Text>

              <Text
                fontSize={`16px`}
                fontWeight={`600`}
                color={Theme.grey_C}
                margin={`0 0 12px`}
              >
                카테고리
              </Text>
              <Wrapper
                border={`1px solid ${Theme.lightGrey_C}`}
                padding={`20px 10px`}
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                margin={`0 0 30px`}
              >
                {commonTags &&
                  commonTags.map((data) => {
                    return (
                      data.type === "카테고리" && (
                        <TagBtn
                          key={data.id}
                          kindOf={`grey`}
                          width={
                            width < 1100
                              ? width < 900
                                ? `calc(100% / 3 - 20px)`
                                : `calc(100% / 5 - 20px)`
                              : `calc(100% / 8 - 20px)`
                          }
                          margin={`0 10px`}
                          padding={`0`}
                          height={width < 900 ? `40px` : `54px`}
                          onClick={() => tagHandler(data)}
                          isActive={tagArr.includes(data.id)}
                        >
                          {data.value}
                        </TagBtn>
                      )
                    );
                  })}
              </Wrapper>
              <Text
                fontSize={`16px`}
                fontWeight={`600`}
                color={Theme.grey_C}
                margin={`0 0 12px`}
              >
                Mood
              </Text>
              <Wrapper
                border={`1px solid ${Theme.lightGrey_C}`}
                padding={`20px 10px`}
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                margin={`0 0 30px`}
              >
                {commonTags &&
                  commonTags.map((data) => {
                    return (
                      data.type === "Mood" && (
                        <TagBtn
                          key={data.id}
                          kindOf={`grey`}
                          width={
                            width < 1100
                              ? width < 900
                                ? `calc(100% / 3 - 20px)`
                                : `calc(100% / 5 - 20px)`
                              : `calc(100% / 8 - 20px)`
                          }
                          margin={`0 10px`}
                          padding={`0`}
                          height={width < 900 ? `40px` : `54px`}
                          onClick={() => tagHandler(data)}
                          isActive={tagArr.includes(data.id)}
                        >
                          {data.value}
                        </TagBtn>
                      )
                    );
                  })}
              </Wrapper>
              <Text
                fontSize={`16px`}
                fontWeight={`600`}
                color={Theme.grey_C}
                margin={`0 0 12px`}
              >
                Genre
              </Text>
              <Wrapper
                border={`1px solid ${Theme.lightGrey_C}`}
                padding={`20px 10px`}
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                margin={`0 0 30px`}
              >
                {commonTags &&
                  commonTags.map((data) => {
                    return (
                      data.type === "Genre" && (
                        <TagBtn
                          key={data.id}
                          kindOf={`grey`}
                          width={
                            width < 1100
                              ? width < 900
                                ? `calc(100% / 3 - 20px)`
                                : `calc(100% / 5 - 20px)`
                              : `calc(100% / 8 - 20px)`
                          }
                          margin={`0 10px`}
                          padding={`0`}
                          height={width < 900 ? `40px` : `54px`}
                          onClick={() => tagHandler(data)}
                          isActive={tagArr.includes(data.id)}
                        >
                          {data.value}
                        </TagBtn>
                      )
                    );
                  })}
              </Wrapper>

              <CommonButton
                width={`180px`}
                height={`50px`}
                margin={`10px 0 100px`}
                fontSize={`18px`}
                onClick={saveHandler}
              >
                저장하기
              </CommonButton>
            </Wrapper>
          </RsWrapper>

          <Modal
            visible={filmo}
            onCancel={filmoToggle}
            footer={null}
            width={`645px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 35px`}
              >
                필모그래피 등록
              </Text>

              <Wrapper al={`flex-start`}>
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 14px`}
                >
                  역할
                </Text>
                <TextInput
                  type="text"
                  placeholder="예) Vocal"
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 30px`}
                  {...roleName}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 14px`}
                >
                  Comment
                </Text>
                <TextInput
                  type="text"
                  placeholder="예) 저는 이 곡의 가이드 보컬을 담당했습니다."
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 30px`}
                  {...comment}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 14px`}
                >
                  가수명
                </Text>
                <TextInput
                  type="text"
                  placeholder="예) 이유정"
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 30px`}
                  {...singer}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 14px`}
                >
                  곡제목
                </Text>
                <TextInput
                  type="text"
                  placeholder="예) 구름 위에서"
                  width={`100%`}
                  height={`50px`}
                  border={`1px solid ${Theme.lightGrey_C}`}
                  margin={`0 0 30px`}
                  {...songTitle}
                />
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`0 0 14px`}
                >
                  음원 등록
                </Text>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    placeholder="MP3로만 등록해주세요."
                    width={`calc(100% - 110px)`}
                    readOnly={true}
                    height={`50px`}
                  />
                  <input
                    ref={filmoFileRef}
                    type={`file`}
                    accept={`.mp3`}
                    hidden
                    onChange={filmoFileUploadHandler}
                  />
                  <CommonButton
                    kindOf={`subTheme2`}
                    width={`100px`}
                    height={`50px`}
                    onClick={filmoFileClickHandler}
                    loading={st_filmoFileUploadLoading}
                  >
                    파일등록
                  </CommonButton>
                </Wrapper>
                {filmoFile && (
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    padding={`16px 14px`}
                    bgColor={Theme.lightGrey2_C}
                    margin={`10px 0 0`}
                  >
                    <Text fontSize={`16px`} color={Theme.grey_C}>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/music-file.png`}
                        width={`14px`}
                        margin={`0 5px 0 0`}
                      />
                      {filmoFileName.value}
                    </Text>
                    <CloseOutlined onClick={filmoFileDeleteHandler} />
                  </Wrapper>
                )}

                {/* 음원파일 등록했을때 나옴 */}
                <Text
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.basicTheme_C}
                  margin={`30px 0 14px`}
                >
                  앨범 커버 이미지 등록
                </Text>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    placeholder="이미지를 등록해주세요."
                    width={`calc(100% - 110px)`}
                    readOnly={true}
                    height={`50px`}
                  />
                  <input
                    ref={filmoImgRef}
                    type={`file`}
                    accept={`.jpg, .png`}
                    hidden
                    onChange={filmoImgUploadHandler}
                  />
                  <CommonButton
                    kindOf={`subTheme2`}
                    width={`100px`}
                    height={`50px`}
                    onClick={filmoImgClickHandler}
                    loading={st_filmoImgUploadLoading}
                  >
                    파일등록
                  </CommonButton>
                </Wrapper>
                {filmoImg && (
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    padding={`16px 14px`}
                    bgColor={Theme.lightGrey2_C}
                    margin={`10px 0 0`}
                  >
                    <Text fontSize={`16px`} color={Theme.grey_C}>
                      <Image
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/image-file.png`}
                        width={`14px`}
                        margin={`0 5px 0 0`}
                      />
                      {filmoImgName.value}
                    </Text>
                    <CloseOutlined onClick={filmoImgDeleteHandler} />
                  </Wrapper>
                )}
              </Wrapper>
              <CommonButton
                width={`180px`}
                height={`50px`}
                margin={`34px 0 0`}
                onClick={filmoCreateHandler}
              >
                신청하기
              </CommonButton>
            </Wrapper>
          </Modal>
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: COMMON_TAG_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
