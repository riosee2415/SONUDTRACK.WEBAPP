import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MY_INFO_REQUEST,
  UPDATE_MODAL_CLOSE_REQUEST,
  UPDATE_MODAL_OPEN_REQUEST,
  USERLIST_REQUEST,
  USERLIST_UPDATE_REQUEST,
} from "../../../reducers/user";
import {
  Table,
  Button,
  Popover,
  message,
  Modal,
  Select,
  notification,
  Input,
  Form,
  Switch,
  Drawer,
  Checkbox,
  Image,
} from "antd";
import {
  HomeText,
  OtherMenu,
  GuideUl,
  GuideLi,
  SearchForm,
  SearchFormItem,
  SettingBtn,
} from "../../../components/commonComponents";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import { items } from "../../../components/AdminLayout";
import axios from "axios";
import {
  Text,
  Wrapper,
  PopWrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import { CloseOutlined, HomeOutlined, RightOutlined } from "@ant-design/icons";
import {
  CATEGORY_ADMIN_LIST_REQUEST,
  CATEGORY_LIST_REQUEST,
} from "../../../reducers/category";
import { TAG_TYPE_LIST_REQUEST } from "../../../reducers/tag";
import {
  ALBUM_FILE_RESET,
  ALBUM_PREMIUM_CREATE_REQUEST,
  ALBUM_TRACK_FILE_REQUEST,
  ALBUM_TRACK_FILE_RESET,
} from "../../../reducers/album";
import {
  SELLER_IMAGE_REQUEST,
  SELLER_IMAGE_RESET,
} from "../../../reducers/seller";

const TypeView = styled.span`
  padding: 2px 5px;
  background: ${(props) =>
    props.isArtist ? props.theme.subTheme3_C : props.theme.adminTheme_4};
  color: #fff;
  border-radius: 7px;
  font-size: 13px;
`;

const TypeButton = styled(Button)``;

const GuideDiv = styled.div`
  width: 100%;
  color: ${(props) => (props.isImpo ? props.theme.red_C : "")};
  margin-left: 3px;
`;

const PointText = styled.div`
  color: ${(props) => props.theme.adminTheme_4};
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const ArtistList = ({}) => {
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

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
  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const {
    users,
    updateModal,
    st_userListError,
    st_userListUpdateDone,
    st_userListUpdateError,
  } = useSelector((state) => state.user);
  const { categoryList } = useSelector((state) => state.category);
  const { tagTypeList } = useSelector((state) => state.tag);
  const {
    albumFile,
    albumTrackFile,
    //
    st_albumPremiumCreateDone,
    st_albumPremiumCreateError,
  } = useSelector((state) => state.album);
  const { sellerImage } = useSelector((state) => state.seller);

  const [sameDepth, setSameDepth] = useState([]);

  const [updateData, setUpdateData] = useState(null);

  const [sData, setSData] = useState("");

  // FORM
  const [levelForm] = Form.useForm();
  const [sForm] = Form.useForm();
  const [albumForm] = Form.useForm();

  const [currentTab, setCurrentTab] = useState(0);

  const [searchType, setSearchType] = useState(1);

  const [level1, setLevel1] = useState("회원관리");
  const [level2, setLevel2] = useState("");

  //   MODAL
  const [createModal, setCreateModal] = useState(false);

  const [currentData, setCurrentData] = useState(null);

  const [options, setOptions] = useState([]);
  const [tagData, setTagData] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [isTitle, setIsTitle] = useState(false);

  // DATA
  const [trackData, setTrackData] = useState([]);
  const [trackname, setTrackname] = useState(null);
  const [albumImageName, setAlbumImageName] = useState(null);

  // REF
  const trackRef = useRef();
  const imageRef = useRef();
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_albumPremiumCreateDone) {
      setIsCreate(false);
      albumForm.resetFields();
      dispatch({
        type: SELLER_IMAGE_RESET,
      });
      dispatch({
        type: ALBUM_FILE_RESET,
      });
      return message.success("앨범 프리미엄이 등록되었습니다.");
    }

    if (st_albumPremiumCreateError) {
      return message.error(st_albumPremiumCreateError);
    }
  }, [st_albumPremiumCreateDone, st_albumPremiumCreateError]);

  useEffect(() => {
    let arr = [];

    for (
      let i = 0;
      i <
      tagTypeList.find((value) => value.value === "Genre").underValues.length;
      i++
    ) {
      arr.push({
        value: tagTypeList.find((value) => value.value === "Genre").underValues[
          i
        ].id,
        label: tagTypeList.find((value) => value.value === "Genre").underValues[
          i
        ].tagValue,
      });
    }

    setOptions(arr);
  }, [tagTypeList]);

  useEffect(() => {
    if (albumTrackFile && trackname) {
      let arr = trackData ? trackData.map((data) => data) : [];

      arr.push({
        filename: trackname,
        filepath: albumTrackFile,
        title: isTitle,
      });

      setTrackData(arr);

      dispatch({
        type: ALBUM_TRACK_FILE_RESET,
      });
    }
  }, [albumTrackFile]);

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  // 권한 수정 후처리
  useEffect(() => {
    if (st_userListUpdateDone) {
      dispatch({
        type: UPDATE_MODAL_CLOSE_REQUEST,
      });

      dispatch({
        type: USERLIST_REQUEST,
        data: {
          isArtist: true,
        },
      });

      return message.success("유저정보가 수정되었습니다.");
    }
  }, [st_userListUpdateDone]);

  // 사용자 리스트 조회 에러처리
  useEffect(() => {
    if (st_userListError) {
      return message.error(st_userListError);
    }
  }, [st_userListError]);

  // 권한 수정 에러 메세지
  useEffect(() => {
    if (st_userListUpdateError) {
      return message.error(st_userListUpdateError);
    }
  }, [st_userListUpdateError]);

  useEffect(() => {
    dispatch({
      type: USERLIST_REQUEST,
      data: {
        searchType: searchType,
        searchData: sData,
        searchLevel: currentTab,
        isArtist: true,
      },
    });
  }, [currentTab, sData, searchType]);

  ////// TOGGLE //////

  ////// HANDLER //////

  // 프리미엄 앨범 등록하기
  const premiumCreateHandler = useCallback(
    (data) => {
      let result = [];

      data.tags.map((value, idx) => {
        result.push({
          TagTypeId: value[1],
          TagId: value[2],
          sort: idx + 1,
        });
      });

      let trackResult = [];

      trackData.map((value) => {
        trackResult.push({
          songName: value.filename,
          singerName: "-",
          fileName: value.filename,
          filePath: value.filepath,
          fileLength: "0",
          isTitle: value.title,
        });
      });

      dispatch({
        type: ALBUM_PREMIUM_CREATE_REQUEST,
        data: {
          albumImage: sellerImage,
          albumImageName: albumImageName,
          bitRate: data.bitRate,
          sampleRate: data.sampleRate,
          fileName: "",
          filePath: "",
          categorys: [
            {
              CateTypeId: data.category[1],
              CategoryId: data.category[2],
              sort: data.category[3],
            },
          ],
          tags: result,
          MusictemId: currentData && currentData.musictemId,
          trackInfos: trackResult,
        },
      });
    },
    [trackData, sellerImage, albumImageName, currentData]
  );

  // 이미지 선택
  const imageRefClickHandler = useCallback(
    (data) => {
      imageRef.current.click();
    },
    [imageRef]
  );

  // 트랙 삭제
  const trackDeleteHandler = useCallback(
    (idx) => {
      let arr = trackData ? trackData.map((data) => data) : [];
      // const currentId = arr.findIndex(
      //   (value) => value.filename === data.filename
      // );

      arr.splice(idx, 1);

      setTrackData(arr);
    },
    [trackData]
  );

  const imageUploadHandler = useCallback(
    (e) => {
      setAlbumImageName(e.target.files[0].name);
      const formData = new FormData();

      [].forEach.call(e.target.files, (file) => {
        formData.append("image", file);
      });

      if (e.target.files.length < 1) {
        return;
      }

      dispatch({
        type: SELLER_IMAGE_REQUEST,
        data: formData,
      });
    },
    [trackname]
  );

  const trackUploadHandler = useCallback(
    (e) => {
      setTrackname(e.target.files[0].name);
      const formData = new FormData();

      [].forEach.call(e.target.files, (file) => {
        setTrackname(file.name);

        formData.append("file", file);
      });

      if (e.target.files.length < 1) {
        return;
      }

      dispatch({
        type: ALBUM_TRACK_FILE_REQUEST,
        data: formData,
      });
    },
    [trackname]
  );

  //  트랙 등록
  const trackRefClickHandler = useCallback(() => {
    trackRef.current.click();
  }, [trackRef]);

  // tag 선택
  const tagSelectHandler = useCallback(
    (data) => {
      setTagData(data);
    },
    [options]
  );

  //   premiumModalToggle
  const permiumModalToggle = useCallback(
    (data) => {
      setCurrentData(data);
      setCreateModal(!createModal);
    },
    [createModal]
  );

  const searchHandler = useCallback(
    (data) => {
      setSData(data.sData);
    },
    [sForm, sData]
  );

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

  ////// DATAVIEW //////

  const columns = [
    {
      align: "center",
      width: "5%",
      title: "번호",
      dataIndex: "num",
    },

    {
      width: "10%",
      title: "회원이름",
      dataIndex: "username",
    },
    {
      width: "10%",
      title: "닉네임",
      dataIndex: "nickname",
    },
    {
      width: "15%",
      title: "이메일",
      dataIndex: "email",
    },
    {
      width: "15%",
      title: "전화번호",
      dataIndex: "mobile",
    },
    {
      width: "15%",
      title: "가입일",
      dataIndex: "viewCreatedAt",
    },
    {
      width: "15%",
      title: "가입일",
      dataIndex: "viewCreatedAt",
    },
    {
      width: "15%",
      title: "프리미엄등록",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => permiumModalToggle(data)}
        >
          프리미엄등록
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
      <Wrapper margin={`10px 0px 0px 10px`}>
        <GuideUl>
          <GuideLi isImpo={true}>
            해당 메뉴에서 홈페이지에 가입된 회원의 정보를 확인할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            이름 및 이메일로 사용자를 검색할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            변경된 정보는 홈페이지에 즉시 적용되기 때문에, 신중한 처리를 필요로
            합니다.
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
        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={columns}
          dataSource={users ? users : []}
          size="small"
        />
      </Wrapper>

      <Drawer
        visible={createModal}
        onClose={() => permiumModalToggle(null)}
        width="900px"
        title="프리미엄 앨범등록하기"
        footer={
          <Wrapper al={`flex-end`}>
            <Button
              size="small"
              type="primary"
              onClick={() => albumForm.submit()}
            >
              등록하기
            </Button>
          </Wrapper>
        }
      >
        <Wrapper
          dr={`row`}
          padding={`0 0 20px`}
          borderBottom={`1px solid ${Theme.grey2_C}`}
          margin={`0 0 20px`}
        >
          <Wrapper dr={`row`} ju={`space-between`}>
            <Text>앨범이미지</Text>
            <input
              type="file"
              accept=".png , .jpg"
              hidden
              ref={imageRef}
              onChange={imageUploadHandler}
            />
            <Button size="small" type="primary" onClick={imageRefClickHandler}>
              등록하기
            </Button>
          </Wrapper>

          {sellerImage && <Image src={sellerImage} />}
        </Wrapper>
        <Form
          size="small"
          labelCol={{ span: 3 }}
          onFinish={premiumCreateHandler}
          form={albumForm}
        >
          <Form.Item label="bitRate" name={"bitRate"}>
            <Input />
          </Form.Item>
          <Form.Item label="sampleRate" name={"sampleRate"}>
            <Input />
          </Form.Item>
          <Form.Item label="category" name={"category"}>
            <Select>
              {categoryList.map((data, idx) => {
                return (
                  <Select.Option
                    key={data.id}
                    value={[data.value, data.CateTypeId, data.id, 1]}
                  >
                    {data.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="tags" name={"tags"}>
            <Select onChange={tagSelectHandler} mode="tags">
              {tagTypeList
                .find((value) => value.value === "Genre")
                .underValues.map((data) => {
                  return (
                    <Select.Option
                      key={data.id}
                      value={[data.tagValue, data.TagTypeId, data.id]}
                    >
                      {data.tagValue}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="track">
            <Button type="primary" onClick={() => setIsCreate(true)}>
              추가하기
            </Button>
          </Form.Item>
        </Form>
        {isCreate && (
          <Form size="small">
            <Form.Item label="track">
              <Wrapper dr={`row`} ju={`flex-start`}>
                <Checkbox
                  onChange={() => setIsTitle(!isTitle)}
                  checked={isTitle}
                >
                  title
                </Checkbox>
                <Input style={{ width: `80%` }} readOnly />
                <input
                  type="file"
                  accept=".wav, .mp3"
                  hidden
                  ref={trackRef}
                  onChange={trackUploadHandler}
                />
                <Button type="primary" onClick={trackRefClickHandler}>
                  업로드
                </Button>
              </Wrapper>
            </Form.Item>
          </Form>
        )}

        {trackData.map((data, idx) => {
          return (
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              margin={`0 0 5px`}
              key={idx}
            >
              <Wrapper dr={`row`} width={`auto`}>
                {data.title && (
                  <Text margin={`0 5px 0 0`} color={Theme.basicTheme_C}>
                    Title
                  </Text>
                )}
                <Button
                  size="small"
                  type="primary"
                  download={true}
                  href={data.filepath}
                >
                  {data.filename}
                </Button>
              </Wrapper>

              <Text isHover onClick={() => trackDeleteHandler(idx)}>
                <CloseOutlined />
              </Text>
            </Wrapper>
          );
        })}
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
      data: {
        isArtist: true,
      },
    });

    context.store.dispatch({
      type: CATEGORY_LIST_REQUEST,
      data: {
        CateTypeId: 2,
      },
    });

    context.store.dispatch({
      type: TAG_TYPE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(ArtistList);
