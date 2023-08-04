import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import {
  CustomForm,
  CustomTable,
  ModalBtn,
} from "../../../components/commonComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Table,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Button,
} from "antd";
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
  DelBtn,
  SearchForm,
  SearchFormItem,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { useRouter } from "next/router";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  EyeOutlined,
  AlertOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { ARTIST_CONTACT_ADMIN_LIST_REQUEST } from "../../../reducers/artistContact";

const TypeView = styled.span`
  padding: 2px 5px;
  background: ${(props) =>
    props.type === 1
      ? props.theme.subTheme3_C
      : props.type === 2
      ? props.theme.red_C
      : props.theme.adminTheme_4};
  color: #fff;
  border-radius: 7px;
  font-size: 13px;
`;
const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.adminTheme_1};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.adminTheme_1 : props.theme.lightGrey_C};
`;

const ArtistContact = () => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { artistContactAdminList } = useSelector(
    (state) => state.artistContact
  );

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("고객지원관리");
  const [level2, setLevel2] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [sameDepth, setSameDepth] = useState([]);

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

  console.log(artistContactAdminList);
  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const [infoForm] = Form.useForm();
  const [sForm] = Form.useForm();

  // 검색
  const [sData, setSData] = useState(null);
  const [sStatus, setSStatus] = useState(3);

  ////// USEEFFECT //////
  // 기본

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight6)) {
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

  // 검색
  useEffect(() => {
    dispatch({
      type: ARTIST_CONTACT_ADMIN_LIST_REQUEST,
      data: {
        searchStatus: sStatus,
        searchSendUsername: sData ? sData.searchSendUsername : null,
        searchReceptionUsername: sData ? sData.searchReceptionUsername : null,
      },
    });
  }, [sData, sStatus]);

  ////// TOGGLE //////

  ////// HANDLER //////

  // 검색하기
  const searchHandler = useCallback(
    (data) => {
      setSData(data);
    },
    [sForm, sData]
  );

  const sStatusChangeHandler = useCallback(
    (status) => {
      setSStatus(status);
    },
    [sStatus]
  );

  // 선택하기
  const beforeSetDataHandler = useCallback(
    (data) => {
      if (currentData && data.id === currentData.id) {
        setCurrentData(null);
      } else {
        setCurrentData(data);
        infoForm.setFieldsValue({
          type: data.viewType,
          sendName: data.requestUsername,
          sendMobile: data.requestMobile,
          sendEmail: data.requestEmail,
          receptionName: data.artistName,
          receptionMobile: data.receptionMobile,
          receptionEmail: data.receptionEmail,
          sendMessage: data.sendMessage,
          totalPrice: data.viewTotalPrice,
          rejectMessage: data.rejectMessage,
        });
      }
    },
    [currentData]
  );

  ////// DATAVIEW /////

  const col = [
    {
      width: `6%`,
      align: "center",
      title: "번호",
      dataIndex: "num",
    },
    {
      width: `10%`,
      align: "center",
      title: "상태",
      render: (data) => <TypeView type={data.type}>{data.viewType}</TypeView>,
    },
    {
      width: `20%`,
      title: "구매자이름",
      dataIndex: "requestUsername",
    },
    {
      width: `20%`,
      title: "아티스트이름",
      dataIndex: "artistName",
    },
    {
      width: `14%`,
      title: "요청금액",
      dataIndex: "viewTotalPrice",
    },
    {
      width: `20%`,
      title: "구매요청일",
      dataIndex: "viewCreatedAt",
    },
    {
      width: `10%`,
      title: "상태창",
      render: (data) => (
        <>
          <ViewStatusIcon
            active={
              parseInt(data.id) === (currentData && parseInt(currentData.id))
            }
          />
        </>
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
        // shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
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
          <GuideLi>구매요청된 데이터를 확인할 수 있습니다.</GuideLi>
          <GuideLi>구매자 이름과 아티스트이름으로 검색할 수 있습니다.</GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper>
            {/* SEARCH FORM */}
            <SearchForm
              layout="inline"
              style={{ width: "100%" }}
              form={sForm}
              onFinish={searchHandler}
            >
              <SearchFormItem
                name="searchSendUsername"
                style={{ margin: `0px 0px 0px 5px` }}
              >
                <Input
                  size="small"
                  style={{ width: "220px" }}
                  placeholder={`구매자이름을 입력해주세요.`}
                />
              </SearchFormItem>
              <SearchFormItem
                name="searchReceptionUsername"
                style={{ margin: `0px 0px 0px 5px` }}
              >
                <Input
                  size="small"
                  style={{ width: "220px" }}
                  placeholder={`아티스트이름을 입력해주세요.`}
                />
              </SearchFormItem>

              <SearchFormItem>
                <Button
                  size="small"
                  type="primary"
                  htmlType="submit"
                  style={{ margin: `0px 0px 0px 5px` }}
                >
                  검색
                </Button>
              </SearchFormItem>
            </SearchForm>
          </Wrapper>

          <Wrapper dr="row" ju="flex-start" margin="0px 0px 5px 0px">
            <Button
              type={sStatus === 3 ? "primary" : "default"}
              size="small"
              onClick={() => sStatusChangeHandler(3)}
            >
              미처리
            </Button>
            <Button
              type={sStatus === 1 ? "primary" : "default"}
              size="small"
              onClick={() => sStatusChangeHandler(1)}
            >
              승인
            </Button>
            <Button
              type={sStatus === 2 ? "danger" : "default"}
              size="small"
              onClick={() => sStatusChangeHandler(2)}
            >
              거절
            </Button>
          </Wrapper>
          <CustomTable
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            size="small"
            dataSource={artistContactAdminList}
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>
        <Wrapper
          width={`calc(50% - 10px)`}
          margin="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  구매요청 정보
                </InfoTitle>
              </Wrapper>

              <CustomForm
                form={infoForm}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ width: "100%", paddingRight: "20px" }}
                colon={false}
              >
                <Form.Item label="요청상태" name="type">
                  <Input
                    size="small"
                    readOnly
                    style={{
                      background: currentData
                        ? currentData.type === 1
                          ? Theme.subTheme3_C
                          : currentData.type === 2
                          ? Theme.red_C
                          : Theme.adminTheme_4
                        : "#ebebeb",
                      color: Theme.white_C,
                    }}
                  />
                </Form.Item>

                {/* 구매자 정보 */}

                <Form.Item label="구매자 이름" name="sendName">
                  <Input
                    size="small"
                    readOnly
                    style={{ background: "#ebebeb" }}
                  />
                </Form.Item>

                <Form.Item label="구매자 연락처" name="sendMobile">
                  <Input
                    size="small"
                    readOnly
                    style={{ background: "#ebebeb" }}
                  />
                </Form.Item>

                <Form.Item label="구매자 이메일" name="sendEmail">
                  <Input
                    size="small"
                    readOnly
                    style={{ background: "#ebebeb" }}
                  />
                </Form.Item>

                {/* 아티스트 정보 */}

                <Form.Item label="아티스트 이름" name="receptionName">
                  <Input
                    size="small"
                    readOnly
                    style={{ background: "#ebebeb" }}
                  />
                </Form.Item>

                <Form.Item label="요청금액" name="totalPrice">
                  <Input
                    size="small"
                    readOnly
                    style={{ background: "#ebebeb" }}
                  />
                </Form.Item>

                <Form.Item label="요청내용" name="sendMessage">
                  <Input.TextArea
                    autoSize={{
                      minRows: 5,
                      maxRows: 10,
                    }}
                    size="small"
                    readOnly
                    style={{ background: "#ebebeb", margin: `5px 0` }}
                  />
                </Form.Item>

                {currentData && currentData.isReject ? (
                  <Form.Item label="거절사유" name="rejectMessage">
                    <Input.TextArea
                      size="small"
                      readOnly
                      style={{ background: "#ebebeb", margin: `5px 0` }}
                      autoSize={{
                        minRows: 5,
                        maxRows: 10,
                      }}
                    />
                  </Form.Item>
                ) : (
                  ""
                )}
              </CustomForm>

              <Wrapper width="100%" height="1px" margin={`30px 0px`}></Wrapper>
            </>
          ) : (
            <Wrapper padding={`50px 0px`} dr="row">
              <AlertOutlined
                style={{
                  fontSize: "20px",
                  color: Theme.red_C,
                  marginRight: "5px",
                }}
              />
              좌측 데이터를 선택하여 상세정보를 확인하세요.
            </Wrapper>
          )}
        </Wrapper>
      </Wrapper>
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
      type: ARTIST_CONTACT_ADMIN_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default ArtistContact;
