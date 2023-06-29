import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MY_INFO_REQUEST,
  UPDATE_MODAL_CLOSE_REQUEST,
  USERLIST_REQUEST,
} from "../../../reducers/user";
import {
  Table,
  Button,
  Popover,
  message,
  Select,
  notification,
  Input,
  Form,
  Switch,
  Drawer,
  Checkbox,
  Image,
  Popconfirm,
} from "antd";
import {
  HomeText,
  OtherMenu,
  GuideUl,
  GuideLi,
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
import {
  CheckOutlined,
  CloseOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { CATEGORY_LIST_REQUEST } from "../../../reducers/category";
import { TAG_TYPE_LIST_REQUEST } from "../../../reducers/tag";
import {
  ALBUM_FILE_RESET,
  ALBUM_PREMIUM_CREATE_REQUEST,
  ALBUM_TRACK_FILE_REQUEST,
  ALBUM_TRACK_FILE_RESET,
  MUSICTEM_PREMIUM_ADMIN_LIST_REQUEST,
} from "../../../reducers/album";
import {
  SELLER_IMAGE_REQUEST,
  SELLER_IMAGE_RESET,
} from "../../../reducers/seller";
import getBlobDuration from "get-blob-duration";

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

  const { st_userListError, st_userListUpdateDone, st_userListUpdateError } =
    useSelector((state) => state.user);
  const { categoryList } = useSelector((state) => state.category);
  const { tagTypeList } = useSelector((state) => state.tag);
  const {
    albumTrackFile,
    musictemPremiumAdminList,
    //
    st_albumPremiumCreateDone,
    st_albumPremiumCreateError,
    //
    st_albumTrackFileDone,
    st_albumTrackFileError,
  } = useSelector((state) => state.album);
  const { sellerImage } = useSelector((state) => state.seller);

  const [sameDepth, setSameDepth] = useState([]);

  const [sData, setSData] = useState("");

  // FORM
  const [levelForm] = Form.useForm();
  const [sForm] = Form.useForm();
  const [albumForm] = Form.useForm();

  const [currentTab, setCurrentTab] = useState(0);

  const [searchType, setSearchType] = useState(1);

  const [level1, setLevel1] = useState("음원관리");
  const [level2, setLevel2] = useState("");

  //   MODAL
  const [createModal, setCreateModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [options, setOptions] = useState([]);
  const [tagData, setTagData] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isDataModal, setIsDataModal] = useState(false);

  // DATA
  const [trackData, setTrackData] = useState([]);
  const [trackname, setTrackname] = useState(null);
  const [albumImageName, setAlbumImageName] = useState(null);
  const [titleTrackLength, setTitleTrackLength] = useState(0);

  // REF
  const trackRef = useRef();
  const imageRef = useRef();
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_albumTrackFileDone && albumTrackFile) {
      getBlobDuration(albumTrackFile).then(function (duration) {
        setTitleTrackLength(duration);
      });
      return;
    }

    if (st_albumTrackFileError) {
      return message.error(st_albumTrackFileError);
    }
  }, [st_albumTrackFileDone, st_albumTrackFileError]);

  useEffect(() => {
    if (st_albumPremiumCreateDone) {
      dispatch({
        type: SELLER_IMAGE_RESET,
      });
      dispatch({
        type: ALBUM_FILE_RESET,
      });
      setTrackData([]);
      setTitleTrackLength(0);
      setCreateModal(false);
      albumForm.resetFields();
      dispatch({
        type: MUSICTEM_PREMIUM_ADMIN_LIST_REQUEST,
      });
      return message.success("프리미엄 앨범이 등록되었습니다.");
    }

    if (st_albumPremiumCreateError) {
      return message.error(st_albumPremiumCreateError);
    }
  }, [st_albumPremiumCreateDone, st_albumPremiumCreateError]);

  useEffect(() => {
    let arr = [];

    for (
      let i = 0;
      i < tagTypeList.find((value) => value.value === "Genre") &&
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
    if (albumTrackFile && trackname && titleTrackLength) {
      let arr = trackData ? trackData.map((data) => data) : [];

      arr.push({
        filename: trackname,
        filepath: albumTrackFile,
        title: isTitle,
        fileLength: titleTrackLength,
      });

      setTrackData(arr);

      dispatch({
        type: ALBUM_TRACK_FILE_RESET,
      });
    }
  }, [albumTrackFile, titleTrackLength]);

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

  // 상세보기
  const detailHandler = useCallback((data) => {
    setCurrentData(data);
    setIsDataModal(true);
  }, []);

  // 프리미엄 앨범 등록하기
  const premiumCreateHandler = useCallback(
    (data) => {
      if (!sellerImage) {
        return message.error("앨범 이미지를 등록해주세요.");
      }

      if (trackData.length === 0) {
        return message.error("트랙곡을 등록해주세요.");
      }

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
          singerName: data.singerName,
          fileName: value.filename,
          filePath: value.filepath,
          fileLength: value.fileLength,
          isTitle: value.title,
        });
      });

      dispatch({
        type: ALBUM_PREMIUM_CREATE_REQUEST,
        data: {
          albumName: data.albumName,
          albumImage: sellerImage,
          albumImageName: albumImageName,
          bitRate: data.bitRate,
          sampleRate: data.sampleRate,
          fileName:
            trackData.find((value) => value.title) &&
            trackData.find((value) => value.title).filename,
          filePath:
            trackData.find((value) => value.title) &&
            trackData.find((value) => value.title).filepath,
          categorys: [
            {
              CateTypeId: data.category[1],
              CategoryId: data.category[2],
              sort: data.category[3],
            },
          ],
          tags: result,
          MusictemId: 1,
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
  const permiumModalToggle = useCallback(() => {
    // setCurrentData(data);
    setCreateModal(!createModal);
  }, [createModal]);

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
      title: "앨범이미지",
      render: (data) => <Image src={data.albumImage} />,
    },
    {
      width: "10%",
      title: "앨범명",
      dataIndex: "albumName",
    },
    {
      width: "10%",
      title: "bitRate",
      dataIndex: "bitRate",
    },
    {
      width: "10%",
      title: "sampleRate",
      dataIndex: "sampleRate",
    },
    {
      width: "10%",
      title: "대표곡",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          download={true}
          href={data.filePath}
        >
          {data.fileName}
        </Button>
      ),
    },
    {
      width: "10%",
      title: "상세보기",
      render: (data) => (
        <Button size="small" type="primary" onClick={() => detailHandler(data)}>
          상세보기
        </Button>
      ),
    },
    {
      width: "15%",
      title: "등록일",
      dataIndex: "viewCreatedAt",
    },
    // {
    //   width: "5%",
    //   title: "삭제",
    //   render: (data) => (
    //     <Popconfirm title="삭제하시겠습니까?" okText="삭제" cancelText="취소">
    //       <Button type="danger" size="small">
    //         삭제
    //       </Button>
    //     </Popconfirm>
    //   ),
    // },
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
          <GuideLi>프리미엄 앨범을 관리 할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            프리미엄 등록시 사용자가 구매했을 경우를 대비해 수정/삭제는
            불가하며, 수정/삭제를 원하실 시 개발사에 문의해주시기 바랍니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            수정/삭제가 불가하오니 유의해주시기 바랍니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* SEARCH FORM */}
      {/* <Wrapper padding="0px 20px">
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
      </Wrapper> */}

      <Wrapper padding={`0px 20px`}>
        <Wrapper al={`flex-end`} margin={`0 0 5px`}>
          <Button size="small" type="primary" onClick={permiumModalToggle}>
            프리미엄앨범등록
          </Button>
        </Wrapper>
        <Table
          style={{ width: "100%" }}
          rowKey="id"
          columns={columns}
          dataSource={musictemPremiumAdminList}
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
          <Form.Item
            rules={[
              {
                required: true,
                message: "앨범명을 입력해주세요.",
              },
            ]}
            label="앨범명"
            name={"albumName"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "아티스트명을 입력해주세요.",
              },
            ]}
            label="아티스트명"
            name={"singerName"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "bitRate를 입력해주세요.",
              },
            ]}
            label="bitRate"
            name={"bitRate"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "sampleRate를 입력해주세요.",
              },
            ]}
            label="sampleRate"
            name={"sampleRate"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "카테고리를 선택해주세요.",
              },
            ]}
            label="category"
            name={"category"}
          >
            <Select>
              {categoryList.map((data, idx) => {
                return (
                  <Select.Option
                    key={idx}
                    value={[data.value, data.CateTypeId, data.id, 1]}
                  >
                    {data.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "태그를 선택해주세요.",
              },
            ]}
            label="tags"
            name={"tags"}
          >
            <Select onChange={tagSelectHandler} mode="tags">
              {tagTypeList &&
                tagTypeList.find((value) => value.value === "Genre") &&
                tagTypeList
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

      <Drawer
        visible={isDataModal}
        onClose={() => setIsDataModal(false)}
        title="상세보기"
        width={`800px`}
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
          </Wrapper>

          {currentData && <Image src={currentData && currentData.albumImage} />}
        </Wrapper>
        <Form
          size="small"
          labelCol={{ span: 3 }}
          onFinish={premiumCreateHandler}
          form={albumForm}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "앨범명을 입력해주세요.",
              },
            ]}
            label="앨범명"
          >
            <Input value={currentData && currentData.albumName} disabled />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "아티스트명을 입력해주세요.",
              },
            ]}
            label="아티스트명"
          >
            <Input
              value={currentData && currentData.tracks[0].singerName}
              disabled
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "bitRate를 입력해주세요.",
              },
            ]}
            label="bitRate"
          >
            <Input value={currentData && currentData.bitRate} disabled />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "sampleRate를 입력해주세요.",
              },
            ]}
            label="sampleRate"
          >
            <Input value={currentData && currentData.sampleRate} disabled />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "카테고리를 선택해주세요.",
              },
            ]}
            label="category"
          >
            {currentData &&
              currentData.categorys.map((data) => {
                return <Text>{data.catagoryValue}</Text>;
              })}
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "태그를 선택해주세요.",
              },
            ]}
            label="tags"
          >
            {currentData &&
              currentData.tags.map((data) => {
                return <Text>{data.tagValue}</Text>;
              })}
          </Form.Item>
          <Form.Item label="track">
            {currentData &&
              currentData.tracks.map((data, idx) => {
                return (
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    margin={`0 0 5px`}
                    key={idx}
                  >
                    <Wrapper dr={`row`} width={`auto`}>
                      {data.isTitle === 1 && (
                        <Text margin={`0 5px 0 0`} color={Theme.basicTheme_C}>
                          Title
                        </Text>
                      )}
                      <Button
                        size="small"
                        type="primary"
                        download={true}
                        href={data.filePath}
                      >
                        {data.fileName}
                      </Button>
                    </Wrapper>
                  </Wrapper>
                );
              })}
          </Form.Item>
        </Form>
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

    context.store.dispatch({
      type: MUSICTEM_PREMIUM_ADMIN_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(ArtistList);
