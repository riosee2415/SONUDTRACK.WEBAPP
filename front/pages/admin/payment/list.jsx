import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  Popconfirm,
  Popover,
  Table,
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
  DelBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { BOUGHT_ADMIN_LIST_REQUEST } from "../../../reducers/bought";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.subTheme5_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const List = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("결제관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const [infoForm] = Form.useForm();

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

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
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

  /////////////////////////////////////////////////////////////////////////

  const { adminBoughtList } = useSelector((state) => state.bought);

  ////// HOOKS //////

  //   MODAL
  const [isDetail, setIsDetail] = useState(false);

  //  FORM
  const [detailForm] = Form.useForm();

  ////// USEEFFECT //////

  ////// HANDLER //////

  //   상세보기
  const detailHandler = useCallback(
    (data) => {
      setCurrentData(data);
      setIsDetail(true);
      detailForm.setFieldsValue({
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        payWay: data.payWay,
        price: data.price,
        usePoint: data.usePoint,
        mileagePrice: data.mileagePrice,
        viewCreatedAt: data.viewCreatedAt,
      });
    },
    [detailForm]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  console.log(adminBoughtList);

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "구매자",
      dataIndex: "name",
    },
    {
      title: "구매자전화번호",
      dataIndex: "mobile",
    },
    {
      title: "구매자이메일",
      dataIndex: "email",
    },
    {
      title: "구매방식",
      dataIndex: "payWay",
    },
    {
      title: "구매금액",
      dataIndex: "price",
    },
    {
      title: "사용포인트",
      dataIndex: "usePoint",
    },
    {
      title: "적립금",
      dataIndex: "mileagePrice",
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "상세보기",
      render: (data) => (
        <Button size="small" type="primary" onClick={() => detailHandler(data)}>
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
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>사용자가 결제한 내역을 확인할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            확인만 가능할 뿐 다른기능은 사용할 수 없습니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* TAB */}

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju="space-between">
        <Wrapper padding="0px 10px" shadow={`3px 3px 6px ${Theme.lightGrey_C}`}>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={adminBoughtList}
            size="small"
          />
        </Wrapper>
      </Wrapper>

      <Drawer
        visible={isDetail}
        onClose={() => setIsDetail(false)}
        title="결제내역 상세보기"
        width="600px"
      >
        <Wrapper>
          <Form
            size="small"
            style={{ width: `100%` }}
            labelCol={{ span: 5 }}
            form={detailForm}
          >
            <Form.Item name="name" label="구매자이름">
              <Input disabled />
            </Form.Item>
            <Form.Item name="mobile" label="구매자전화번호">
              <Input disabled />
            </Form.Item>
            <Form.Item name="email" label="구매자이메일">
              <Input disabled />
            </Form.Item>
            <Form.Item name="payWay" label="구매방식">
              <Input disabled />
            </Form.Item>
            <Form.Item name="price" label="구매금액">
              <Input disabled />
            </Form.Item>
            <Form.Item name="usePoint" label="포인트 사용금액">
              <Input disabled />
            </Form.Item>
            <Form.Item name="mileagePrice" label="적립금액">
              <Input disabled />
            </Form.Item>
            <Form.Item name="viewCreatedAt" label="구매일">
              <Input disabled />
            </Form.Item>
            <Form.Item label="구매음원">
              {currentData &&
                currentData.boughtItems.map((data) => {
                  return (
                    <Wrapper dr={`row`} margin={`0 0 10px`}>
                      <Image width={`100px`} src={data.thumbnail} />

                      <Wrapper
                        width={`calc(100% - 100px)`}
                        padding={`0 20px`}
                        al={`flex-start`}
                      >
                        <Wrapper width={`auto`} dr={`row`}>
                          <Text color={Theme.grey_C} margin={`0 10px 0 0`}>
                            앨범명 :
                          </Text>
                          <Text>{data.albumName}</Text>
                        </Wrapper>
                        <Wrapper width={`auto`} dr={`row`}>
                          <Text color={Theme.grey_C} margin={`0 10px 0 0`}>
                            아티스트명 :
                          </Text>
                          <Text>{data.singerName}</Text>
                        </Wrapper>
                        <Wrapper width={`auto`} dr={`row`}>
                          <Text color={Theme.grey_C} margin={`0 10px 0 0`}>
                            곡명 :
                          </Text>
                          <Text>{data.songName}</Text>
                        </Wrapper>
                        <Wrapper width={`auto`} dr={`row`}>
                          <Text color={Theme.grey_C} margin={`0 10px 0 0`}>
                            라이센스명 :
                          </Text>
                          <Text>{data.lisenceName}</Text>
                        </Wrapper>
                        <Wrapper width={`auto`} dr={`row`}>
                          <Text color={Theme.grey_C} margin={`0 10px 0 0`}>
                            금액 :
                          </Text>
                          <Text>{data.viewPrice}</Text>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  );
                })}
            </Form.Item>
          </Form>
        </Wrapper>
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
      type: BOUGHT_ADMIN_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(List);
