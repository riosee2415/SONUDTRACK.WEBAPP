import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Wrapper, Image, Text } from "./commonComponents";
import Theme from "./Theme";
import AdminMenuBox from "./AdminMenuBox";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const AdminHeader = styled(Wrapper)`
  transition: 0.6s;

  &:hover {
    box-shadow: 2px 2px 10px ${(props) => props.theme.grey_C};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const items = {
  통계관리: [
    {
      name: "접속자통계",
      link: "/admin/logs/acceptLogs",
      useYn: true,
    },
    {
      name: "페이지접속통계",
      link: "/",
      useYn: true,
    },
  ],
  기초정보관리: [
    {
      name: "사업자정보관리",
      link: "/admin/info/businessInformation",
      useYn: true,
    },
    {
      name: "로고관리",
      link: "/admin/info/logo",
      useYn: true,
    },
    {
      name: "SNS정보관리",
      link: "/admin/info/snsInfo",
      useYn: true,
    },
    {
      name: "카카오톡채널관리",
      link: "/admin/info/kakaoch",
      useYn: true,
    },
  ],
  배너관리: [
    {
      name: "메인배너관리",
      link: "/admin/banner/mainbanner",
      useYn: true,
    },
    {
      name: "팝업관리",
      link: "/admin/banner/popup",
      useYn: true,
    },
  ],
  게시판관리: [
    {
      name: "공지사항관리",
      link: "/admin/boards/notice",
      useYn: true,
    },
    {
      name: "겔러리관리",
      link: "/admin/boards/gallery",
      useYn: true,
    },
  ],
  회원관리: [
    {
      name: "전체회원관리",
      link: "/admin/user/userList",
      useYn: true,
    },
    {
      name: "관리자관리[최고관리자전용]",
      link: "/admin/user/userRight",
      useYn: true,
    },
    {
      name: "탈퇴회원관리",
      link: "/admin/user/userExitList",
      useYn: true,
    },
  ],
  고객지원관리: [
    {
      name: "자주묻는질문관리",
      link: "/admin/supports/faq",
      useYn: true,
    },
    {
      name: "문의관리",
      link: "/admin/supports/question",
      useYn: true,
    },
  ],
  기록관리: [
    {
      name: "사업자정보이력관리",
      link: "/admin/history/companyInfo",
      useYn: true,
    },
    {
      name: "로고변경이력관리",
      link: "/admin/history/logo",
      useYn: true,
    },
    {
      name: "SNS정보이력관리",
      link: "/admin/history/sns",
      useYn: true,
    },
    {
      name: "카카오톡채널이력관리",
      link: "/admin/history/kakaoch",
      useYn: true,
    },
    {
      name: "메인배너이력관리",
      link: "/admin/history/mainbanner",
      useYn: true,
    },
    {
      name: "팝업이력관리",
      link: "/admin/history/popup",
      useYn: true,
    },
    {
      name: "공지사항이력관리",
      link: "/admin/history/notice",
      useYn: true,
    },
  ],
  서버관리: [],
};

const AdminLayout = ({ children }) => {
  const { me } = useSelector((s) => s.user);
  const router = useRouter();

  return (
    <Wrapper className="whole__admin__wrapper">
      {/* ADMIN HEADER */}
      <AdminHeader
        height={`200px`}
        bgColor={Theme.adminTheme_1}
        color={Theme.white_C}
        dr={`row`}
        ju={`space-around`}
      >
        <Wrapper width={`400px`} height={`100%`} position={`relative`}>
          <Image
            position={`absolute`}
            top={`10px`}
            left={`10px`}
            width={`100px`}
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/4LEAFSOFTWARE/assets/images/LOGO/logo2.png`}
          />

          <Image
            width={`170px`}
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/4LEAFSOFTWARE/assets/images/LOGO/logo4.png`}
          />

          <Wrapper margin={`20px 0px 0px 0px`}>
            <Text
              bgColor={Theme.adminTheme_2}
              padding={`2px 15px`}
              radius={`6px`}
            >
              ㅇㅇㅇ 최고관리자님, 환영합니다.
            </Text>
          </Wrapper>
        </Wrapper>
        <Wrapper width={`calc(100% - 400px)`} height={`100%`}>
          <Wrapper
            width={`70%`}
            height={`80%`}
            bgColor={Theme.adminTheme_2}
            padding={`15px`}
            ju={`space-around`}
            radius={`6px`}
          >
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`0px 5px`}
              borderBottom={`0.5px solid ${Theme.adminTheme_3}`}
              margin={`0px 0px 5px 0px`}
            >
              <Text>오늘 가입한 회원</Text>
              <Text>1건</Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`0px 5px`}
              borderBottom={`0.5px solid ${Theme.adminTheme_3}`}
              margin={`0px 0px 5px 0px`}
            >
              <Text>오늘 접수된 문의사항</Text>
              <Text>1건</Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`0px 5px`}
              borderBottom={`0.5px solid ${Theme.adminTheme_3}`}
              margin={`0px 0px 5px 0px`}
            >
              <Text>오늘 새로 등록된 공지사항</Text>
              <Text>1건</Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`0px 5px`}
              borderBottom={`0.5px solid ${Theme.adminTheme_3}`}
              margin={`0px 0px 5px 0px`}
            >
              <Text>오늘 어쩌구 저쩌구 저쩌구 저쩌구</Text>
              <Text>1건</Text>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </AdminHeader>

      {router.pathname === "/admin" ? (
        <Wrapper dr={`row`}>
          <AdminMenuBox
            right={me && me.menuRight1}
            title={`통계관리`}
            menus={items["통계관리"]}
          />
          <AdminMenuBox
            right={me && me.menuRight2}
            title={`기초정보관리`}
            menus={items["기초정보관리"]}
          />
          <AdminMenuBox
            right={me && me.menuRight3}
            title={`배너관리`}
            menus={items["배너관리"]}
          />
          <AdminMenuBox
            right={me && me.menuRight4}
            title={`게시판관리`}
            menus={items["게시판관리"]}
          />
          <AdminMenuBox
            right={me && me.menuRight5}
            title={`회원관리`}
            menus={items["회원관리"]}
          />
          <AdminMenuBox
            right={me && me.menuRight6}
            title={`고객지원관리`}
            menus={items["고객지원관리"]}
          />
          <AdminMenuBox
            right={me && me.menuRight7}
            title={`기록관리`}
            menus={items["기록관리"]}
          />
          <AdminMenuBox
            right={me && me.menuRight8}
            title={`서버관리`}
            menus={items["서버관리"]}
          />
        </Wrapper>
      ) : (
        <Wrapper>{children}</Wrapper>
      )}

      {/* ADMIN FOOTER */}
      <Wrapper></Wrapper>
    </Wrapper>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
