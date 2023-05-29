import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Button,
  Table,
  Form,
  Input,
  Select,
  message,
  Switch,
  Modal,
  Popconfirm,
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
  Image,
  SearchForm,
  SearchFormItem,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  ADMIN_NOTICE_LIST_REQUEST,
  NOTICE_UPDATE_REQUEST,
  NOTICE_FILE_REQUEST,
  UPLOAD_PATH_INIT,
  NOTICE_CREATE_REQUEST,
  NOTICE_DELETE_REQUEST,
} from "../../../reducers/notice";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  EyeOutlined,
  AlertOutlined,
  CheckOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { saveAs } from "file-saver";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.basicTheme_C};
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.basicTheme_C : props.theme.lightGrey_C};
`;

const Notice = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    adminNotices,

    st_noticeUpdateDone,
    st_noticeUpdateError,

    uploadFilePath,
    st_noticeFileLoading,
    st_noticeFileDone,
    st_noticeFileError,

    st_noticeCreateDone,
    st_noticeCreateError,

    st_noticeDeleteDone,
    st_noticeDeleteError,
  } = useSelector((state) => state.notice);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("게시판관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [currentData, setCurrentData] = useState(null);

  const [infoForm] = Form.useForm();

  const fileRef = useRef();

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
  const [searchForm] = Form.useForm();

  const [noticeTitle, setNoticeTitle] = useState(""); // 공지사항 제목

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight4)) {
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
      type: ADMIN_NOTICE_LIST_REQUEST,
      data: {
        searchTitle: noticeTitle,
      },
    });
  }, [noticeTitle]);

  // ********************** 공지사항 생성 후처리 *************************
  useEffect(() => {
    if (st_noticeCreateDone) {
      message.success("공지사항이 생성 되었습니다.");

      dispatch({
        type: ADMIN_NOTICE_LIST_REQUEST,
        data: {
          searchTitle: noticeTitle,
        }
      });
    }
  }, [st_noticeCreateDone]);

  useEffect(() => {
    if (st_noticeCreateError) {
      return message.error(st_noticeCreateError);
    }
    if (st_noticeFileError) {
      return message.error(st_noticeFileError);
    }
  }, [st_noticeCreateError, st_noticeFileError]);

  // ********************** 공지사항 수정 *************************
  useEffect(() => {
    if (st_noticeUpdateDone) {
      message.success("공지사항이 수정 되었습니다.");

      dispatch({
        type: ADMIN_NOTICE_LIST_REQUEST,
        data: {
          searchTitle: noticeTitle,
        },
      });
    }
  }, [st_noticeUpdateDone]);

  useEffect(() => {
    if (st_noticeUpdateError) {
      return message.error(st_noticeUpdateError);
    }
  }, [st_noticeUpdateError]);

  // ********************** 공지사항 삭제 *************************
  useEffect(() => {
    if (st_noticeDeleteDone) {
      message.success("공지사항이 삭제되었습니다.");

      setCurrentData(null);

      dispatch({
        type: ADMIN_NOTICE_LIST_REQUEST,
        data: {
          searchTitle: noticeTitle,
        },
      });
    }
  }, [st_noticeDeleteDone]);

  useEffect(() => {
    if (st_noticeDeleteError) {
      return message.error(st_noticeDeleteError);
    }
  }, [st_noticeDeleteError]);

  // ********************** 공지사항 이미지 변경 *************************

  useEffect(() => {
    if (st_noticeFileDone) {
      return message.success(
        "공지사항 이미지가 업로드되었습니다. 정보 업데이트 버튼을 눌러주세요."
      );
    }
  }, [st_noticeFileDone]);

  useEffect(() => {
    if (st_noticeFileError) {
      return message.error(st_noticeFileError);
    }
  }, [st_noticeFileError]);

  ////// HANDLER //////

  const searchHandler = useCallback(
    (data) => {
      setNoticeTitle(data.title);
    },
    [noticeTitle]
  );

  const allSearchHandler = useCallback(() => {
    searchForm.resetFields();
    setNoticeTitle("");
  }, [noticeTitle]);

  const createWithTypeHandler = useCallback(() => {
    dispatch({
      type: NOTICE_CREATE_REQUEST,
      data: {
        type: "공지사항",
      },
    });
  }, []);

  const clickFileUpload = useCallback(() => {
    fileRef.current.click();
  }, [fileRef.current]);

  const onChangeFiles = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: NOTICE_FILE_REQUEST,
      data: formData,
    });
  });



  const beforeSetDataHandler = useCallback(
    (record) => {
      dispatch({
        type: UPLOAD_PATH_INIT,
      });

      setCurrentData(record);

      infoForm.setFieldsValue({
        title: record.title,
        type: record.type,
        content: record.content,
        hit: record.hit,
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
        updator: record.updator,
      });
    },
    [currentData, infoForm]
  );

  const infoFormFinish = useCallback(
    (data) => {
      dispatch({
        type: NOTICE_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          title: data.title,
          content: data.content,
          imagePath: uploadFilePath ? uploadFilePath : currentData.imagePath,
          type: "공지사항",
        },
      });
    },
    [currentData, uploadFilePath]
  );

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: NOTICE_DELETE_REQUEST,
      data: {
        id: data.id,
        title: data.title,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const noticeCol = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "공지사항 제목",
      dataIndex: "title",
      width: "50%",
    },
    {
      title: "작성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "상태창",
      render: (data) => (
        <ViewStatusIcon
          active={
            parseInt(data.id) === (currentData && parseInt(currentData.id))
          }
        />
      ),
    },
    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={() => deleteHandler(data)}
          okText="삭제"
          cancelText="취소"
        >
          <DelBtn />
        </Popconfirm>
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
          <GuideLi>
            공지사항을 추가 / 수정 / 삭제 등 관리를 할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            공지사항이미지는 5MB이하 용량으로 올려주세요.
          </GuideLi>
          <GuideLi isImpo={true}>
            공지사항이미지사이즈는 420px X 400px입니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            공지사항이미지는 정보 업데이트버튼을 눌러야 적용이 됩니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제처리 된 공지사항은 복구가 불가능합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

            {/* 검색 */}
      <Wrapper padding={`10px 20px`}>
        <SearchForm
          form={searchForm}
          onFinish={searchHandler}
          layout="inline"
          style={{ width: "100%" }}
        >
          <SearchFormItem name="title">
            <Input size="small" placeholder="제목으로 검색해주세요." />
          </SearchFormItem>

          <SearchFormItem>
            <Button icon={<SearchOutlined />} size="small" htmlType="submit">
              검색
            </Button>
          </SearchFormItem>

          <SearchFormItem>
            <Button
              icon={<UnorderedListOutlined />}
              size="small"
              type="primary"
              onClick={allSearchHandler}
            >
              전체조회
            </Button>
          </SearchFormItem>
        </SearchForm>
      </Wrapper>

      {/* CONTENT */}

      <Wrapper dr="row" padding="0px 20px" al="flex-start">
        <Wrapper
          width={`calc(50% - 10px)`}
          margin="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper al="flex-end">
            <Button size="small" type="primary" onClick={createWithTypeHandler}>
              공지사항 생성
            </Button>
          </Wrapper>
          <Table
            size="small"
            dataSource={adminNotices}
            columns={noticeCol}
            rowKey="id"
            style={{ width: "100%" }}
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          ></Table>
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
                  공지사항 이미지 정보
          </InfoTitle>
        </Wrapper>

              <Wrapper width={`auto`} margin={`0 0 30px`}>
                <Image
                  width={`420px`}
                  height={`400px`}
                  src={uploadFilePath ? uploadFilePath : currentData.imagePath}
                  alt={`image`}
                />

                <input
                  hidden
                  type={`file`}
                  ref={fileRef}
                  accept={`.jpg, .png`}
                  onChange={onChangeFiles}
                />
                <Button
                  loading={st_noticeFileLoading}
                  style={{ width: `420px`, marginTop: `5px` }}
                  size="small"
                  type="primary"
                  onClick={clickFileUpload}
                >
                  공지사항 이미지 업로드
                </Button>
              </Wrapper>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  공지사항 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                style={{ width: "100%", paddingRight: "20px" }}
                onFinish={infoFormFinish}
              >
                <Form.Item
                  label="제목"
                  name="title"
                  rules={[
                    { required: true, message: "제목은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="내용"
                  name="content"
                  rules={[
                    { required: true, message: "내용은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input.TextArea rows={10} />
                </Form.Item>

                <Form.Item label="조회수" name="hit">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="작성일" name="createdAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="수정일" name="updatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="최근작업자" name="updator">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Wrapper al="flex-end">
                  <Button type="primary" size="small" htmlType="submit">
                    정보 업데이트
                  </Button>
                </Wrapper>
              </Form>
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
      type: ADMIN_NOTICE_LIST_REQUEST,
      data: {
        title: "",
        type: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Notice);
