import React, { useCallback } from "react";
import { Carousel } from "antd";
import { Image, Text, Wrapper, CommonButton } from "../commonComponents";
import styled from "styled-components";
import Theme from "../Theme";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ALBUM_TRACK_DELETE_REQUEST } from "../../reducers/album";

const AlbumSliderWrapper = styled(Wrapper)`
  & .ant-carousel {
    width: 100%;
  }

  & .slick-dots-bottom {
    margin: 0 0 -50px;
  }

  & .ant-carousel .slick-dots li button {
    background-color: ${(props) => props.theme.basicTheme_C};
  }
`;

const CdWrapper = styled(Wrapper)`
  height: 200px;
  border-radius: 100%;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    width: 60px;
    height: 60px;
    background: ${(props) => props.theme.white_C};
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 700px) {
    height: 150px;
  }

  &:hover {
    transition: 0.9s;
    transform: rotate(20deg);
  }
`;

const AlbumSlider = ({ list }) => {
  const { st_albumDeleteDone, st_albumDeleteError } = useSelector(
    (state) => state.album
  );
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 앨범삭제
  const deleteHandler = useCallback((data) => {
    console.log(data);
    dispatch({
      type: ALBUM_TRACK_DELETE_REQUEST,
      data: {
        AlbumId: data.id,
      },
    });
  }, []);

  return (
    <AlbumSliderWrapper>
      <Carousel slide="div" slidesToShow={6} slidesToScroll={6}>
        {list &&
          list.map((data) => {
            return (
              <Wrapper
                width={width < 700 ? `150px !important` : `200px !important`}
              >
                <CdWrapper onClick={() => moveLinkHandler(`/album/${data.id}`)}>
                  <Image
                    radius={`100%`}
                    width={`100%`}
                    height={`100%`}
                    src={data.albumImage}
                    alt="corverImage"
                  />
                </CdWrapper>
                <Wrapper margin={`20px 0 14px`}>
                  <Text fontSize={`20px`} fontWeight={`600`}>
                    {data.title}
                  </Text>
                  <Text fontSize={`16px`} color={Theme.subTheme4_C}>
                    {data.value}
                  </Text>
                </Wrapper>

                <Wrapper>
                  {data.isTrackPermit ? (
                    <>
                      <Wrapper
                        width={`auto`}
                        padding={`5px 10px`}
                        fontSize={`18px`}
                        bgColor={Theme.lightGrey_C}
                        color={Theme.darkGrey_C}
                      >
                        Track 등록완료
                      </Wrapper>
                    </>
                  ) : (
                    <>
                      <CommonButton
                        fontSize={`10px`}
                        padding={`5px`}
                        margin={`0 0 5px`}
                        onClick={() => deleteHandler(data)}
                      >
                        앨범 삭제하기
                      </CommonButton>
                      <Text
                        color={Theme.red_C}
                        fontSize={`11px`}
                        textAlign={`center`}
                        margin={`0 0 5px`}
                      >
                        * Track을 등록한 후에는 삭제가 불가합니다.
                      </Text>
                      <CommonButton
                        kindOf={`subTheme2`}
                        onClick={() =>
                          moveLinkHandler(
                            `/mypage/musictem/trackUpload/${data.id}`
                          )
                        }
                      >
                        Track 등록하기
                      </CommonButton>
                    </>
                  )}
                </Wrapper>
              </Wrapper>
            );
          })}

        {/* LIST 가 6개 이상 없을 시 갯수 채우기위해 만듬 */}
        {list &&
          list.length < 6 &&
          Array(6 - list.length)
            .fill()
            .map((data, idx) => {
              return (
                <Wrapper
                  key={idx}
                  width={width < 700 ? `150px !important` : `200px !important`}
                ></Wrapper>
              );
            })}
      </Carousel>
    </AlbumSliderWrapper>
  );
};

export default AlbumSlider;
