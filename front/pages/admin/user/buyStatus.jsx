import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  message,
  Popover,
  Form,
  Input,
  Button,
  Drawer,
  Modal,
  Image,
} from "antd";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  Text,
  HomeText,
  PopWrapper,
  OtherMenu,
  GuideUl,
  GuideLi,
  CustomTable,
  SearchForm,
  SearchFormItem,
} from "../../../components/commonComponents";
import {
  LOAD_MY_INFO_REQUEST,
  USERLIST_REQUEST,
  USER_BUYSTATUS_REQUEST,
} from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined, EyeOutlined } from "@ant-design/icons";
import { ARTISTEM_DETAIL_REQUEST } from "../../../reducers/artist";
import { PRODUCT_TRACK_DETAIL_REQUEST } from "../../../reducers/product";
import { saveAs } from "file-saver";

const InfoTab = styled.span`
  padding: 1px 3px;
  border-radius: 7px;

  background-color: ${(props) =>
    props.tag ? props.theme.subTheme3_C : props.theme.adminTheme_4};
  color: #fff;
  margin-right: 5px;
`;

const ViewTitle = styled.span`
  display: inline-block;
  font-size: 17px;

  position: relative;

  &:before {
    content: "";
    position: absolute;
    bottom: -2px;
    right: -15px;
    width: 30px;
    height: 15px;
    background-color: #2b17c8;
    border-radius: 6px;
    opacity: 0.3;
  }
`;

const ContentView = styled(Text)`
  width: 100%;
  padding: 15px;

  box-shadow: 3px 3px 10px #d6d6d6;
  border-radius: 5px;
  margin-top: 10px;
`;

const PriceText = styled(Text)`
  font-weight: bold;
  color: ${Theme.basicTheme_C};
  padding: 4px 12px;
  border-radius: 13px;
  background-color: ${(props) => props.theme.subTheme_C};
`;

const TypeView = styled.span`
  padding: 2px 5px;
  background: ${(props) =>
    props.isArtist ? props.theme.subTheme3_C : props.theme.adminTheme_4};
  color: #fff;
  border-radius: 7px;
  font-size: 13px;
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.adminTheme_1 : props.theme.lightGrey_C};
`;

const BuyStatus = ({}) => {
  const { users, st_loadMyInfoDone, me, buyStatus, st_userListError } =
    useSelector((state) => state.user);

  const { artistemDetail, st_artistemDetailError } = useSelector(
    (state) => state.artist
  );

  const { trackDetail, st_productTrackDetailError } = useSelector(
    (state) => state.product
  );

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [sData, setSData] = useState("");
  const [artistemDModal, setArtistemDModal] = useState(false);
  const [musicTemDModal, setMusicTemDModal] = useState(false);

  const [currentData, setCurrentData] = useState(null);

  const [statusDr, setStatusDr] = useState(false);

  const [sForm] = Form.useForm();

  const [selectUserId, setSelectUserId] = useState(0);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;

        return (
          <OtherMenu key={data.link} onClick={() => moveLinkHandler(data.link)}>
            {data.name}
          </OtherMenu>
        );
      })}
    </PopWrapper>
  );

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight5)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: USERLIST_REQUEST,
      data: {
        searchData: sData,
      },
    });
  }, [sData]);

  // 뮤직탬 상세 조회 에러처리
  useEffect(() => {
    if (st_productTrackDetailError) {
      return message.error(st_productTrackDetailError);
    }
  }, [st_productTrackDetailError]);
  // 아티스탬 상세 조회 에러처리
  useEffect(() => {
    if (st_artistemDetailError) {
      return message.error(st_artistemDetailError);
    }
  }, [st_artistemDetailError]);

  // 사용자 리스트 조회 에러처리
  useEffect(() => {
    if (st_userListError) {
      return message.error(st_userListError);
    }
  }, [st_userListError]);

  ////// HANDLER //////

  const searchHandler = useCallback(
    (data) => {
      setSData(data.sData);
    },
    [sForm, sData]
  );

  const statusDrToggle = useCallback(
    (data) => {
      if (data) {
        setCurrentData(data);
        setSelectUserId(data.id);

        dispatch({
          type: USER_BUYSTATUS_REQUEST,
          data: {
            UserId: data.id,
          },
        });
      }

      setStatusDr((p) => !p);
    },
    [statusDr]
  );

  const artistemDToggle = useCallback(
    (data) => {
      if (data && data.buyType === "artisTem") {
        dispatch({
          type: ARTISTEM_DETAIL_REQUEST,
          data: {
            id: data.ArtistemId,
          },
        });
      }

      setArtistemDModal((p) => !p);
    },
    [artistemDModal]
  );

  const musicTemDToggle = useCallback(
    (data) => {
      if (data && data.buyType === "musicTem") {
        dispatch({
          type: PRODUCT_TRACK_DETAIL_REQUEST,
          data: {
            id: data.ProductTrackId,
          },
        });
      }

      setMusicTemDModal((p) => !p);
    },
    [musicTemDModal]
  );

  // 파일 다운로드
  const fileDownloadHandler = useCallback(async (fileName, filePath) => {
    let blob = await fetch(filePath).then((r) => r.blob());

    const file = new Blob([blob]);

    const ext = filePath.substring(
      filePath.lastIndexOf(".") + 1,
      filePath.length
    );

    const originName = `${fileName}.${ext}`;

    saveAs(file, originName);
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      align: "center",
      title: "번호",
      dataIndex: "num",
    },
    {
      align: "center",
      title: "유형",
      render: (data) => (
        <TypeView isArtist={data.isArtist === "아티스트" ? 1 : 0}>
          {data.isArtist}
        </TypeView>
      ),
    },
    {
      title: "회원이름",
      dataIndex: "username",
    },
    {
      title: "닉네임",
      dataIndex: "nickname",
    },
    {
      title: "이메일",
      dataIndex: "email",
    },
    {
      title: "전화번호",
      dataIndex: "mobile",
    },
    {
      title: "가입일",
      dataIndex: "viewCreatedAt",
    },
    {
      width: `10%`,
      title: "상태창",
      render: (data) => (
        <>
          <ViewStatusIcon
            active={
              parseInt(data.id) === (selectUserId && parseInt(selectUserId))
            }
          />
        </>
      ),
    },
  ];

  const columns2 = [
    {
      align: "center",
      title: "번호",
      dataIndex: "num",
    },
    {
      align: "end",
      title: "음원 유형",
      width: "10%",
      render: (data) => (
        <Text fontWeight={`800`}>
          {data.buyType === "musicTem" ? "뮤직탬" : "아티스탬"}
        </Text>
      ),
    },
    {
      align: "end",
      title: "커버 이미지",
      render: (data) => (
        <Image
          src={
            data.buyType === "musicTem"
              ? data.musicTemThumbnail
              : data.artisTemCoverImage
          }
          alt={data.buyType === "musicTem" ? "thumbnail" : "coverImage"}
        />
      ),
    },
    {
      align: "end",
      title: "음원명",
      render: (data) => (
        <Text fontWeight={`600`}>
          {data.buyType === "musicTem"
            ? data.musicTemTitle
            : data.artisTemTitle}
        </Text>
      ),
    },
    {
      align: "end",
      title: "스텐다드 금액",
      render: (data) => (
        <PriceText>
          {data.buyType === "musicTem"
            ? data.musicTemViewsPrice
            : data.artisTemViewsPrice}
        </PriceText>
      ),
    },
    {
      align: "end",
      title: "디럭스 금액",
      render: (data) => (
        <PriceText>
          {data.buyType === "musicTem"
            ? data.musicTemViewdPrice
            : data.artisTemViewdPrice}
        </PriceText>
      ),
    },
    {
      align: "end",
      title: "플레티넘 금액",
      render: (data) => (
        <PriceText>
          {data.buyType === "musicTem"
            ? data.musicTemViewpPrice
            : data.artisTemViewpPrice}
        </PriceText>
      ),
    },
    {
      align: "end",
      title: "상세정보",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          style={{ height: "20px", fontSize: "11px" }}
          onClick={
            data.buyType === "musicTem"
              ? () => musicTemDToggle(data)
              : () => artistemDToggle(data)
          }
        >
          상세보기
        </Button>
      ),
    },
    {
      align: "end",
      title: "다운로드",
      render: (data) => (
        <Button
          size="small"
          type="dashed"
          style={{ height: "20px", fontSize: "11px" }}
          onClick={
            data.buyType === "musicTem"
              ? () =>
                  fileDownloadHandler(
                    data.musicTemFilename,
                    data.musicTemFilepath
                  )
              : () =>
                  fileDownloadHandler(
                    data.artisTemFilename,
                    data.artisTemFilepath
                  )
          }
        >
          내려받기
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* MENU TAB */}
      <Wrapper
        height={`30px`}
        bgColor={Theme.lightGrey_C}
        dr={`row`}
        ju={`flex-start`}
        al={`center`}
        padding={`0px 15px`}
        color={Theme.grey_C}
      >
        <HomeText
          margin={`3px 20px 0px 20px`}
          onClick={() => moveLinkHandler("/admin")}
        >
          <HomeOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
          메인
        </HomeText>
        <RightOutlined />
        <Text margin={`3px 20px 0px 20px`}>{level1} </Text>
        <RightOutlined />
        <Popover content={content}>
          <HomeText cur={true} margin={`3px 20px 0px 20px`}>
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>회원 별 음원 구매 현황 목록을 조회할 수 있습니다.</GuideLi>
          <GuideLi>
            회원을 클릭하면 해당 회원의 음원 구매 현황 목록을 확인할 수
            있습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding="0px 20px">
        {/* SEARCH FORM */}
        <SearchForm
          layout="inline"
          style={{ width: "100%" }}
          form={sForm}
          onFinish={searchHandler}
        >
          <SearchFormItem name="sData" style={{ margin: `0px 0px 0px 5px` }}>
            <Input
              size="small"
              style={{ width: "320px" }}
              placeholder={`회원을 검색할 정보를 입력해주세요.`}
            />
          </SearchFormItem>

          <SearchFormItem>
            <Button size="small" type="primary" htmlType="submit">
              검색
            </Button>
          </SearchFormItem>
        </SearchForm>
      </Wrapper>

      <Wrapper padding={`0px 20px`}>
        <CustomTable
          style={{ width: "100%" }}
          rowKey="num"
          columns={columns}
          dataSource={users ? users : []}
          size="small"
          onRow={(record, index) => {
            return {
              onClick: (e) => statusDrToggle(record),
            };
          }}
        />
      </Wrapper>

      <Drawer
        width="100%"
        visible={statusDr}
        title={`[${currentData && currentData.nickname}] 의 음원 구매 현황`}
        onClose={() => statusDrToggle(null)}
      >
        <CustomTable
          rowKey="num"
          columns={columns2}
          dataSource={buyStatus}
          size="small"
        />
      </Drawer>

      <Modal
        onCancel={() => artistemDToggle(null)}
        visible={artistemDModal}
        title={`${artistemDetail && artistemDetail.title} 상세정보`}
        footer={null}
        width={`1000px`}
      >
        <ViewTitle>커버이미지</ViewTitle>
        <Wrapper>
          <Image
            src={artistemDetail && artistemDetail.coverImage}
            alt={`coverImage`}
          />
        </Wrapper>
        <ViewTitle>제목</ViewTitle>
        <ContentView>{artistemDetail && artistemDetail.title}</ContentView>
        <br />

        <ViewTitle>부제</ViewTitle>
        <ContentView>{artistemDetail && artistemDetail.subTitle}</ContentView>
        <br />

        <ViewTitle>아티스트명</ViewTitle>
        <ContentView>{artistemDetail && artistemDetail.artistName}</ContentView>
        <br />

        <ViewTitle>한줄설명</ViewTitle>
        <ContentView>{artistemDetail && artistemDetail.content}</ContentView>
        <br />

        <ViewTitle>장르</ViewTitle>
        <ContentView>
          {artistemDetail &&
            artistemDetail.gens &&
            (artistemDetail.gens.length === 0 ? (
              <Text>장르 정보가 존재하지 않습니다.</Text>
            ) : (
              artistemDetail.gens.map((data, idx) => {
                return <InfoTab key={idx}>{data}</InfoTab>;
              })
            ))}
        </ContentView>
        <br />

        <ViewTitle>태그</ViewTitle>
        <ContentView>
          {artistemDetail &&
            artistemDetail.tags &&
            (artistemDetail.tags.length === 0 ? (
              <Text>태그 정보가 존재하지 않습니다.</Text>
            ) : (
              artistemDetail.tags.map((data, idx) => {
                return <InfoTab key={idx}>{data}</InfoTab>;
              })
            ))}
        </ContentView>
        <br />

        <ViewTitle>스탠다드 금액</ViewTitle>
        <ContentView>
          {artistemDetail && artistemDetail.viewsPrice}원
        </ContentView>
        <br />

        <ViewTitle>디럭스 금액</ViewTitle>
        <ContentView>
          {artistemDetail && artistemDetail.viewdPrice}원
        </ContentView>
        <br />

        <ViewTitle>플레티넘 금액</ViewTitle>
        <ContentView>
          {artistemDetail && artistemDetail.viewpPrice}원
        </ContentView>
        <br />

        <ViewTitle>음원 등록일</ViewTitle>
        <ContentView>
          {artistemDetail && artistemDetail.viewCreatedAt}
        </ContentView>
      </Modal>

      <Modal
        onCancel={() => musicTemDToggle(null)}
        visible={musicTemDModal}
        title={`${trackDetail && trackDetail.title} 상세정보`}
        footer={null}
        width={`1000px`}
      >
        <ViewTitle>커버이미지</ViewTitle>
        <Wrapper>
          <Image src={trackDetail && trackDetail.thumbnail} alt={`thumbnail`} />
        </Wrapper>

        <ViewTitle>음원명</ViewTitle>
        <ContentView>{trackDetail && trackDetail.title}</ContentView>
        <br />

        <ViewTitle>제작자</ViewTitle>
        <ContentView>{trackDetail && trackDetail.author}</ContentView>
        <br />

        <ViewTitle>장르</ViewTitle>
        <ContentView>
          {trackDetail &&
            trackDetail.gens &&
            (trackDetail.gens.length === 0 ? (
              <Text>장르 정보가 존재하지 않습니다.</Text>
            ) : (
              trackDetail.gens.map((data, idx) => {
                return <InfoTab key={idx}>{data}</InfoTab>;
              })
            ))}
        </ContentView>
        <br />

        <ViewTitle>스탠다드 금액</ViewTitle>
        <ContentView>{trackDetail && trackDetail.viewsPrice}원</ContentView>
        <br />

        <ViewTitle>디럭스 금액</ViewTitle>
        <ContentView>{trackDetail && trackDetail.viewdPrice}원</ContentView>
        <br />

        <ViewTitle>플레티넘 금액</ViewTitle>
        <ContentView>{trackDetail && trackDetail.viewpPrice}원</ContentView>
        <br />

        <ViewTitle>음원 등록일</ViewTitle>
        <ContentView>{trackDetail && trackDetail.viewCreatedAt}</ContentView>
      </Modal>
    </AdminLayout>
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
      type: USERLIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(BuyStatus);
