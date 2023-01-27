import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { message, Popover, Form, Input, Button, Drawer } from "antd";
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

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [sData, setSData] = useState("");

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
              ? () => {
                  console.log(data);
                }
              : () => {
                  console.log(data);
                }
          }
        >
          상세보기
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
