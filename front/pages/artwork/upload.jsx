import React, { useCallback, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Checkbox, Modal, Radio, Select } from "antd";
import {
  CloseOutlined,
  DownloadOutlined,
  LeftOutlined,
} from "@ant-design/icons";

const Btn = styled(Wrapper)`
  width: auto;
  color: ${Theme.grey_C};
  font-size: 22px;
  position: relative;
  margin: 0 10px;
  padding: 0 0 16px;

  &:before {
    content: "";
    width: 0;
    height: 1px;
    background: ${Theme.basicTheme_C};
    position: absolute;
    bottom: 0;
    left: 0;
    transition: 0.3s;
  }

  ${(props) =>
    props.isActive &&
    `
   color: ${Theme.basicTheme_C};
    font-weight: bold;

    &:before {
      width: 100%;
    }
  `}

  &:hover {
    cursor: pointer;
    color: ${Theme.basicTheme_C};
    font-weight: bold;

    &:before {
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    font-size: 16px;
    width: 50%;
    margin: 0;
    padding: 0 10px;
  }
`;

const CustomSelect = styled(Wrapper)`
  width: 100%;
  height: ${(props) => props.height || `50px`};

  .ant-select {
    width: 100%;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-search-input {
    width: 100%;
    height: ${(props) => props.height || `50px`};
  }

  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    width: 100%;
    line-height: ${(props) => props.height || `50px`};
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const [isModal, setIsModal] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [typeValue, setTypeValue] = useState(1);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const fileToggle = useCallback(() => {
    setIsFile((prev) => !prev);
  }, [isFile]);
  ////// HANDLER //////
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const typeChangeHandler = useCallback(
    (e) => {
      setTypeValue(e.target.value);
    },
    [typeValue]
  );
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>NEW WAVE Sound | Artworks Community</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              height={`260px`}
              bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/banner/artworks.png")`}
              radius={`14px`}
              overflow={`hidden`}
              position={`relative`}
              shadow={`3px 3px 15px rgba(0, 0, 0, 0.15)`}
              color={Theme.white_C}
            >
              <Text
                fontSize={`16px`}
                fontWeight={`bold`}
                isHover
                position={`absolute`}
                top={`30px`}
                right={`30px`}
                td={`underline`}
                onClick={modalToggle}
              >
                How to use
              </Text>
              <Wrapper height={`100%`} bgColor={`rgba(0, 0, 0, 0.4)`}>
                <Text
                  fontSize={width < 900 ? `25px` : `32px`}
                  fontWeight={`500`}
                  margin={`0 0 16px`}
                >
                  Artwork Community
                </Text>
                <Text
                  fontSize={width < 900 ? `14px` : `16px`}
                  lineHeight={`26px`}
                  textAlign={`center`}
                  margin={`0 0 28px`}
                >
                  Tracker, Top Liner가 필요할 때 이용하세요!
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              margin={`40px 0 20px`}
            >
              <Btn onClick={() => setCurrentTab(0)} isActive={currentTab === 0}>
                Track (for Singer, Top Liner)
              </Btn>
              <Btn onClick={() => setCurrentTab(1)} isActive={currentTab === 1}>
                Top Line (for Tracker)
              </Btn>
            </Wrapper>

            <Wrapper
              padding={`50px 0 100px`}
              width={width < 700 ? `100%` : `440px`}
            >
              <Wrapper dr={`row`} ju={`space-between`}>
                <Wrapper width={`12px`} fontSize={`20px`} al={`flex-start`}>
                  <LeftOutlined />
                </Wrapper>
                <Text fontSize={`24px`} fontWeight={`bold`}>
                  나의 업로드
                </Text>
                <Wrapper width={`12px`} />
              </Wrapper>
              <Wrapper
                bgColor={Theme.subTheme_C}
                padding={`20px 10px`}
                radius={`5px`}
                margin={`16px 0 40px`}
                fontSize={width < 700 ? `14px` : `16px`}
              >
                <Text fontWeight={`500`}>
                  로고 사운드가 포함된 트랙을 가장 먼저 등록하세요!
                </Text>
                <Text fontWeight={`500`}>
                  라이센스 형식에 맞게 등록하셔야 합니다.
                </Text>
                <Text color={Theme.subTheme4_C}>
                  신청 후 1~2일 이내에 업로드가 완료됩니다.
                </Text>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                fontSize={width < 700 ? `14px` : `16px`}
              >
                <Text fontWeight={`500`} color={Theme.grey_C}>
                  독점 종류
                </Text>

                <Wrapper dr={`row`} ju={`flex-start`} margin={`22px 0 30px`}>
                  <Radio.Group value={typeValue} onChange={typeChangeHandler}>
                    <Radio value={1}>
                      <Text fontSize={`16px`}>독점</Text>
                    </Radio>
                    <Radio value={2}>
                      <Text fontSize={`16px`}>비독점</Text>
                    </Radio>
                  </Radio.Group>
                </Wrapper>

                {typeValue === 1 && (
                  <>
                    <Text fontWeight={`500`} color={Theme.grey_C}>
                      가격<SpanText color={Theme.basicTheme_C}>*</SpanText>
                    </Text>
                    <TextInput
                      placeholder="250만 원 이상 적어주세요."
                      border={`1px solid ${Theme.lightGrey_C}`}
                      width={`100%`}
                      height={`50px`}
                      margin={`12px 0 30px`}
                    />
                  </>
                )}

                {typeValue === 2 && (
                  <>
                    <Text fontWeight={`500`} color={Theme.grey_C}>
                      Pro 이용권 가격
                      <SpanText color={Theme.basicTheme_C}>*</SpanText>
                    </Text>
                    <TextInput
                      placeholder="110만 원 이상 적어주세요."
                      border={`1px solid ${Theme.lightGrey_C}`}
                      width={`100%`}
                      height={`50px`}
                      margin={`12px 0 30px`}
                    />
                    <Text fontWeight={`500`} color={Theme.grey_C}>
                      Semi-pro 이용권 가격
                      <SpanText color={Theme.basicTheme_C}>*</SpanText>
                    </Text>
                    <TextInput
                      placeholder="20만 원 이상 적어주세요."
                      border={`1px solid ${Theme.lightGrey_C}`}
                      width={`100%`}
                      height={`50px`}
                      margin={`12px 0 30px`}
                    />
                  </>
                )}
                <Text fontWeight={`500`} color={Theme.grey_C}>
                  곡 제목<SpanText color={Theme.basicTheme_C}>*</SpanText>
                </Text>
                <TextInput
                  placeholder="곡 제목을 입력해주세요."
                  border={`1px solid ${Theme.lightGrey_C}`}
                  width={`100%`}
                  height={`50px`}
                  margin={`12px 0 30px`}
                />

                {currentTab === 1 && (
                  <>
                    <Text fontWeight={`500`} color={Theme.grey_C}>
                      성별
                    </Text>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      margin={`22px 0 30px`}
                    >
                      <Radio.Group>
                        <Radio>
                          <Text fontSize={`16px`}>Male</Text>
                        </Radio>
                        <Radio>
                          <Text fontSize={`16px`}>Female</Text>
                        </Radio>
                      </Radio.Group>
                    </Wrapper>
                  </>
                )}
                <Text fontWeight={`500`} color={Theme.grey_C}>
                  장르 (중복선택가능)
                  <SpanText color={Theme.basicTheme_C}>*</SpanText>
                </Text>
                <CustomSelect margin={`12px 0 10px`}>
                  <Select placeholder="장르를 선택해주세요.">
                    <Select.Option>K-Pop</Select.Option>
                  </Select>
                </CustomSelect>
                <Wrapper
                  bgColor={Theme.lightGrey2_C}
                  color={Theme.grey_C}
                  fontSize={`16px`}
                  padding={`15px`}
                  dr={`row`}
                  ju={`space-between`}
                >
                  K-Pop
                  <Text color={Theme.basicTheme_C}>
                    <CloseOutlined />
                  </Text>
                </Wrapper>

                <Text
                  fontWeight={`500`}
                  color={Theme.grey_C}
                  margin={`30px 0 12px`}
                >
                  BPM<SpanText color={Theme.basicTheme_C}>*</SpanText>
                </Text>
                <CustomSelect>
                  <Select placeholder="BPM을 선택해주세요.">
                    <Select.Option>BPM</Select.Option>
                  </Select>
                </CustomSelect>
                <Text
                  fontWeight={`500`}
                  color={Theme.grey_C}
                  margin={`30px 0 12px`}
                >
                  Key<SpanText color={Theme.basicTheme_C}>*</SpanText>
                </Text>
                <CustomSelect>
                  <Select placeholder="Key를 선택해주세요.">
                    <Select.Option>Key</Select.Option>
                  </Select>
                </CustomSelect>
                <Text
                  fontWeight={`500`}
                  color={Theme.grey_C}
                  margin={`30px 0 12px`}
                >
                  Tag (중복선택가능)
                  <SpanText color={Theme.basicTheme_C}>*</SpanText>
                </Text>
                <CustomSelect>
                  <Select placeholder="장르를 선택해주세요.">
                    <Select.Option>장르</Select.Option>
                  </Select>
                </CustomSelect>

                {typeValue === 1 ? (
                  <>
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      margin={`30px 0 12px`}
                    >
                      <Text fontWeight={`500`} color={Theme.grey_C}>
                        음원파일
                        <SpanText color={Theme.basicTheme_C}>*</SpanText>
                      </Text>
                      <Text
                        color={Theme.basicTheme_C}
                        td={`underline`}
                        isHover
                        onClick={fileToggle}
                        margin={`0 0 0 6px`}
                      >
                        파일 등록 가이드
                      </Text>
                    </Wrapper>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <TextInput
                        border={`1px solid ${Theme.lightGrey_C}`}
                        placeholder="음원을 업로드해주세요."
                        width={`calc(100% - 110px)`}
                        height={`50px`}
                      />
                      <CommonButton
                        kindOf={`subTheme2`}
                        width={`100px`}
                        height={`50px`}
                      >
                        파일등록
                      </CommonButton>
                    </Wrapper>
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
                        K-Pop.WAV
                      </Text>
                      <CloseOutlined />
                    </Wrapper>
                  </>
                ) : (
                  <>
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      margin={`30px 0 12px`}
                    >
                      <Text fontWeight={`500`} color={Theme.grey_C}>
                        Pro음원파일
                        <SpanText color={Theme.basicTheme_C}>*</SpanText>
                      </Text>
                      <Text
                        color={Theme.basicTheme_C}
                        td={`underline`}
                        isHover
                        onClick={fileToggle}
                        margin={`0 0 0 6px`}
                      >
                        파일 등록 가이드
                      </Text>
                    </Wrapper>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <TextInput
                        border={`1px solid ${Theme.lightGrey_C}`}
                        placeholder="음원을 업로드해주세요."
                        width={`calc(100% - 110px)`}
                        height={`50px`}
                      />
                      <CommonButton
                        kindOf={`subTheme2`}
                        width={`100px`}
                        height={`50px`}
                      >
                        파일등록
                      </CommonButton>
                    </Wrapper>
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
                        K-Pop.WAV
                      </Text>
                      <CloseOutlined />
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      margin={`30px 0 12px`}
                    >
                      <Text fontWeight={`500`} color={Theme.grey_C}>
                        Semi-pro음원파일
                        <SpanText color={Theme.basicTheme_C}>*</SpanText>
                      </Text>
                      <Text
                        color={Theme.basicTheme_C}
                        td={`underline`}
                        isHover
                        onClick={fileToggle}
                        margin={`0 0 0 6px`}
                      >
                        파일 등록 가이드
                      </Text>
                    </Wrapper>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <TextInput
                        border={`1px solid ${Theme.lightGrey_C}`}
                        placeholder="음원을 업로드해주세요."
                        width={`calc(100% - 110px)`}
                        height={`50px`}
                      />
                      <CommonButton
                        kindOf={`subTheme2`}
                        width={`100px`}
                        height={`50px`}
                      >
                        파일등록
                      </CommonButton>
                    </Wrapper>
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
                        K-Pop.WAV
                      </Text>
                      <CloseOutlined />
                    </Wrapper>
                  </>
                )}

                <Wrapper dr={`row`} ju={`flex-start`} margin={`30px 0 12px`}>
                  <Text fontWeight={`500`} color={Theme.grey_C}>
                    제작 참여 동의서 업로드
                  </Text>
                  <Text
                    color={Theme.basicTheme_C}
                    td={`underline`}
                    isHover
                    margin={`0 6px`}
                  >
                    동의서 다운로드
                  </Text>
                  <DownloadOutlined style={{ color: Theme.basicTheme_C }} />
                </Wrapper>

                <Wrapper
                  padding={`20px`}
                  radius={`5px`}
                  bgColor={Theme.lightGrey2_C}
                  al={`flex-start`}
                >
                  <Text>
                    해당 음원 판매를 위하여 제작에 참여한 연주자, 보컬, 프로듀서
                    등의 판매 허가 동의서가 필요합니다.
                  </Text>
                  <Text>반드시 참여한 모든 인원에 서명을 받아 제출하세요.</Text>
                </Wrapper>

                <Wrapper dr={`row`} ju={`space-between`} margin={`12px 0 40px`}>
                  <TextInput
                    border={`1px solid ${Theme.lightGrey_C}`}
                    placeholder="동의서를 업로드해주세요.(중복 가능)"
                    width={`calc(100% - 110px)`}
                    height={`50px`}
                  />
                  <CommonButton
                    kindOf={`subTheme2`}
                    width={`100px`}
                    height={`50px`}
                  >
                    파일등록
                  </CommonButton>
                </Wrapper>
              </Wrapper>
              <Text
                fontSize={width < 700 ? `14px` : `16px`}
                fontWeight={`bold`}
              >
                업로드한 전 곡은 New Wave Sound 외에 어느 곳에서도
              </Text>
              <Text
                fontSize={width < 700 ? `14px` : `16px`}
                fontWeight={`bold`}
                margin={`0 0 10px`}
              >
                유통 및 스트리밍 된 적이 없습니까?
              </Text>
              <Text color={Theme.grey2_C}>
                ※다른 곳에서 유통 및 스트리밍한 내역이 있을 경우
              </Text>
              <Text color={Theme.grey2_C} margin={`0 0 20px`}>
                New Wave Sound에서 판매가 불가합니다.
              </Text>
              <Checkbox>
                <Text fontSize={width < 700 ? `14px` : `16px`}>
                  (필수)네, 없습니다.
                </Text>
              </Checkbox>

              <CommonButton
                width={`100%`}
                margin={`40px 0 0`}
                height={`48px`}
                fontSize={`18px`}
              >
                업로드 신청
              </CommonButton>
            </Wrapper>
          </RsWrapper>

          <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            width={`650px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={width < 900 ? `18px` : `28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                How to Use Artworks Community
              </Text>
              <Wrapper
                bgColor={Theme.subTheme_C}
                radius={`5px`}
                padding={`17px 10px`}
                margin={`0 0 30px`}
              >
                <Text>
                  Multu Track의 경우 새로운 창작물을 만들 때 그대로 사용하실 수
                  없습니다.
                </Text>
                <Text>
                  조금의 편집과 새로운 구성이 필요합니다. 아이디어를 발휘해
                  보세요!
                </Text>
                <Text color={Theme.red_C} fontWeight={`500`}>
                  모든 Track은 다른 사람에게 재 판매를 하거나 라이센스를 부여할
                  수 없습니다.
                </Text>
              </Wrapper>

              <Wrapper dr={`row`} ju={`space-between`}>
                <Wrapper
                  width={width < 900 ? `100%` : `40%`}
                  dr={`row`}
                  ju={`space-between`}
                >
                  <Wrapper
                    width={width < 900 ? `75px` : `100px`}
                    height={width < 900 ? `75px` : `100px`}
                    radius={`100%`}
                    bgColor={Theme.lightGrey2_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                    margin={width < 900 ? `0` : `0 0 20px`}
                  >
                    <Text>Royalty</Text>
                    <Text>free</Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 900 ? `75px` : `100px`}
                    height={width < 900 ? `75px` : `100px`}
                    radius={`100%`}
                    bgColor={Theme.lightGrey2_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                    margin={width < 900 ? `0` : `0 0 20px`}
                  >
                    <Text>High</Text>
                    <Text>Quality</Text>
                    <Text>WAV</Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 900 ? `75px` : `100px`}
                    height={width < 900 ? `75px` : `100px`}
                    radius={`100%`}
                    bgColor={Theme.lightGrey2_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                  >
                    <Text>무제한</Text>
                    <Text>스트림</Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 900 ? `75px` : `100px`}
                    height={width < 900 ? `75px` : `100px`}
                    radius={`100%`}
                    bgColor={Theme.lightGrey2_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                  >
                    <Text>전체</Text>
                    <Text>상업</Text>
                    <Text>사용</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `45%`}
                  al={`flex-start`}
                  fontSize={`16px`}
                  margin={width < 900 && `20px 0 0`}
                >
                  <Text fontWeight={`bold`} color={Theme.basicTheme_C}>
                    독점
                  </Text>
                  <Text>모든 Royalty는 당신에게 귀속됩니다.</Text>
                  <Text>가장 먼저 획득하세요!</Text>
                  <Text
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                    margin={`40px 0 0`}
                  >
                    비독점
                  </Text>
                  <Text>총 10개까지만 구매 가능하며,</Text>
                  <Text>소진 시 삭제됩니다.</Text>
                  <Text>품절되기 전에 구매하세요!</Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Modal>

          <Modal
            onCancel={fileToggle}
            visible={isFile}
            footer={null}
            width={`640px`}
          >
            <Wrapper padding={width < 900 ? `30px 0` : `30px 25px`}>
              <Text
                fontWeight={`bold`}
                fontSize={`28px`}
                color={Theme.basicTheme_C}
                margin={`0 0 16px`}
              >
                파일 등록 가이드
              </Text>

              <Wrapper
                bgColor={Theme.subTheme_C}
                padding={`17px 10px`}
                margin={`0 0 24px`}
              >
                <Text fontWeight={`500`}>파일형식 : 44.1kHz, 24-bit, WAV</Text>
                <Text>
                  메인 트랙에만 New Wave Sound의 워터마크가 등록하실 음원에
                </Text>
                <Text>10초에 한 번씩 재생되도록 작업하여 업로드 하세요.</Text>
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text
                  fontSize={`16px`}
                  color={Theme.basicTheme_C}
                  fontWeight={`bold`}
                >
                  필수 업로드 파일 항목
                </Text>
                {currentTab === 0 ? (
                  <>
                    <Text fontSize={`16px`} margin={`8px 0 6px`}>
                      - 로고가 포함된 Track, 원본 Track, Multi
                    </Text>
                    <Text>
                      ex&#41; Multi - Drums, Guitar, Piano, Bass, String, Synth,
                      Pad, Fx 등의 Track
                    </Text>
                  </>
                ) : (
                  <>
                    <Text fontSize={`16px`} margin={`8px 0 6px`}>
                      - 로고가 포함된 Track(AR), Wet Main Vocal, 3X Dry Main
                      Vocal, Harmony Vocal, Pad, Ad-lip 등의 Vocal Track
                    </Text>
                    <Text fontSize={`16px`} margin={`0px 0 6px`}>
                      - Instruments, Instruments Multi
                    </Text>
                    <Text>
                      ex&#41; Instruments Multi - Drums, Guitar, Piano, Bass,
                      String, Synth, Pad, Fx 등의 Track
                    </Text>
                  </>
                )}
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={`30px 0 8px`}
                fontSize={`18px`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/title_musictem.png`}
                  width={`10px`}
                />
                <Text
                  td={`underline`}
                  fontSize={`16px`}
                  margin={`0 5px`}
                  isHover
                >
                  New Wave Sound Water Mark
                </Text>
                <DownloadOutlined />
              </Wrapper>

              <Wrapper dr={`row`} ju={`flex-start`} fontSize={`18px`}>
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/title_musictem.png`}
                  width={`10px`}
                />
                <Text
                  td={`underline`}
                  fontSize={`16px`}
                  margin={`0 5px`}
                  isHover
                >
                  Sample
                </Text>
                <DownloadOutlined />
              </Wrapper>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
