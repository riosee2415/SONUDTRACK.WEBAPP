import React, { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Col, Drawer } from "antd";
import Link from "next/link";
import { withResizeDetector } from "react-resize-detector";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { RsWrapper, WholeWrapper, Wrapper } from "./commonComponents";
import SideMenu from "./SideMenu";

const ClientLayout = ({ children, width }) => {
  return (
    <section>
      {/* HEADER */}

      <WholeWrapper dr={`row`} ju={`flex-end`}>
        {width < 900 ? null : <SideMenu />}

        <Wrapper
          width={
            width < 1280
              ? width < 900
                ? `100%`
                : `calc(100% - 120px)`
              : `calc(100% - 300px)`
          }
          padding={`84px 0 0`}
        >
          <AppHeader />
          <Wrapper>{children}</Wrapper>
          <AppFooter />
        </Wrapper>
      </WholeWrapper>
      {/* content */}

      {/* Footer */}
    </section>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withResizeDetector(ClientLayout);
