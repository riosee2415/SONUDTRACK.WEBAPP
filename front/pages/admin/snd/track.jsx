import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  message,
  Switch,
  Image,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input,
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
  ModalBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { CheckOutlined, HomeOutlined, RightOutlined } from "@ant-design/icons";
import {
  PRODUCT_TRACK_ISOK_REQUEST,
  PRODUCT_TRACK_ISREJECT_REQUEST,
  PRODUCT_TRACK_TYPELIST_REQUEST,
} from "../../../reducers/product";
import { saveAs } from "file-saver";

const PriceText = styled(Text)`
  font-weight: bold;
  color: ${(props) => props.theme.basicTheme_C};
  padding: 4px 12px;
  border-radius: 13px;
  background-color: ${(props) => props.theme.subTheme_C};
`;

const CateBox = styled.span`
  padding: 2px 9px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.subTheme3_C};
  color: #fff;
  margin-right: 2px;
`;

const CheckIcon = styled(CheckOutlined)`
  color: ${(props) => props.theme.naver_C};
`;

const Track = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    trackTypeList,

    st_productTrackIsOkLoading,
    st_productTrackIsOkDone,
    st_productTrackIsOkError,
    //
    st_productTrackIsRejectLoading,
    st_productTrackIsRejectDone,
    st_productTrackIsRejectError,
  } = useSelector((state) => state.product);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("음원관리");
  const [level2, setLevel2] = useState("");
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

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  const [rForm] = Form.useForm();

  const [listType, setListType] = useState(3);

  const [rModal, setRModal] = useState(false);
  const [rData, setRData] = useState(false);

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight8)) {
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

  // 승인 후 처리
  useEffect(() => {
    if (st_productTrackIsOkDone) {
      dispatch({
        type: PRODUCT_TRACK_TYPELIST_REQUEST,
      });

      return message.success("승인되었습니다.");
    }

    if (st_productTrackIsOkError) {
      return message.error(st_productTrackIsOkError);
    }
  }, [st_productTrackIsOkDone, st_productTrackIsOkError]);

  // 거절 후 처리
  useEffect(() => {
    if (st_productTrackIsRejectDone) {
      dispatch({
        type: PRODUCT_TRACK_TYPELIST_REQUEST,
      });

      rModalToggle(null);

      return message.success("거절되었습니다.");
    }

    if (st_productTrackIsRejectError) {
      return message.error(st_productTrackIsRejectError);
    }
  }, [st_productTrackIsRejectDone, st_productTrackIsRejectError]);

  useEffect(() => {
    dispatch({
      type: PRODUCT_TRACK_TYPELIST_REQUEST,
      data: {
        listType: listType,
      },
    });
  }, [listType]);

  ////// TOGGLE //////
  const rModalToggle = useCallback(
    (data) => {
      if (data) {
        setRData(data);
        rForm.setFieldsValue({
          rejectContent: data.rejectContent,
        });
      } else {
        rForm.resetFields();
        setRData(null);
      }
      setRModal((prev) => !prev);
    },
    [rData, rModal]
  );

  ////// HANDLER //////
  // 승인하기
  const isOkChangeHandler = useCallback((data) => {
    dispatch({
      type: PRODUCT_TRACK_ISOK_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);
  // 거절하기
  const isRejectChangeHandler = useCallback(
    (data) => {
      dispatch({
        type: PRODUCT_TRACK_ISREJECT_REQUEST,
        data: {
          id: rData.id,
          rejectContent: data.rejectContent,
        },
      });
    },
    [rData]
  );

  // 승인하기
  const listTypeChangeHandler = useCallback(
    (type) => {
      setListType(type);
    },
    [listType]
  );

  // 파일 다운로드
  const fileDownloadHandler = useCallback(async (fileName, filePath) => {
    let blob = await fetch(filePath).then((r) => r.blob());

    const file = new Blob([blob]);

    // const ext = filePath.substring(
    //   filePath.lastIndexOf(".") + 1,
    //   filePath.length
    // );

    const originName = `${fileName}`;

    saveAs(file, originName);
  }, []);
  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "음원명",
      dataIndex: "title",
    },
    {
      title: "제작자",
      dataIndex: "author",
    },
    {
      align: "end",
      title: "스텐다드 금액",
      render: (data) => <PriceText>{data.viewsPrice}</PriceText>,
    },
    {
      align: "end",
      title: "디럭스 금액",
      render: (data) => <PriceText>{data.viewdPrice}</PriceText>,
    },
    {
      align: "end",
      title: "플레티넘 금액",
      render: (data) => <PriceText>{data.viewpPrice}</PriceText>,
    },
    {
      title: "음원등록일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "장르",
      render: (data) =>
        data.genList.map((v) => {
          return <CateBox key={v}>{v.value}</CateBox>;
        }),
    },
    {
      title: "다운로드",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          style={{ height: "20px", fontSize: "11px" }}
          onClick={() => fileDownloadHandler(data.filename, data.filepath)}
        >
          내려받기
        </Button>
      ),
    },
    {
      title: "다운로드 수",
      dataIndex: "downloadCnt",
    },
    {
      title: "승인/거절",
      render: (data) =>
        data.isOk ? (
          <CheckIcon />
        ) : data.isReject ? (
          <Button onClick={() => rModalToggle(data)} size="small" type="danger">
            거절사유
          </Button>
        ) : (
          <>
            <Popconfirm
              title="승인하시겠습니까?"
              okText="승인"
              cancelText="취소"
              onConfirm={() => isOkChangeHandler(data)}
            >
              <Button
                size="small"
                type="primary"
                loading={st_productTrackIsOkLoading}
              >
                승인
              </Button>
            </Popconfirm>

            <Button
              onClick={() => rModalToggle(data)}
              size="small"
              type="danger"
              loading={st_productTrackIsRejectLoading}
            >
              거절
            </Button>
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
          <GuideLi>미처리, 승인, 거절로 조회할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            승인 또는 거절시 되돌릴 수 없어 신중한 작업을 필요로 합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* LIST TYPE */}
      <Wrapper dr="row" ju={`flex-start`} padding="0px 20px 10px">
        <Button
          size="small"
          type={listType === 3 && "primary"}
          onClick={() => listTypeChangeHandler(3)}
        >
          미처리
        </Button>
        <Button
          size="small"
          type={listType === 1 && "primary"}
          onClick={() => listTypeChangeHandler(1)}
        >
          승인
        </Button>
        <Button
          size="small"
          type={listType === 2 && "primary"}
          onClick={() => listTypeChangeHandler(2)}
        >
          거절
        </Button>
      </Wrapper>

      <Wrapper padding="0px 20px">
        <CustomTable
          rowKey="id"
          columns={columns}
          dataSource={trackTypeList ? trackTypeList : []}
          size="small"
        />
      </Wrapper>

      {/* REJECT MODAL */}
      <Modal
        width={`600px`}
        title="거절하기"
        visible={rModal}
        onCancel={() => rModalToggle(null)}
        footer={null}
      >
        <Form form={rForm} onFinish={isRejectChangeHandler}>
          <Form.Item
            label="거절사유"
            name="rejectContent"
            rules={[{ required: true, message: "거절사유를 입력해주세요." }]}
          >
            <Input.TextArea
              readOnly={rData && rData.isReject}
              autoSize={{ minRows: 6, maxRows: 8 }}
              placeholder="거절사유를 입력해주세요."
            />
          </Form.Item>

          {rData && !rData.isReject && (
            <Wrapper dr={`row`} ju={`flex-end`}>
              <ModalBtn size="small" onClick={() => rModalToggle(null)}>
                취소
              </ModalBtn>
              <ModalBtn size="small" type="primary" htmlType="submit">
                거절
              </ModalBtn>
            </Wrapper>
          )}
        </Form>
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
      type: PRODUCT_TRACK_TYPELIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Track);
