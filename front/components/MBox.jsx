import React from "react";
import styled from "styled-components";
import { Input, Image } from "antd";
import { Wrapper, Text } from "./commonComponents";

const MBox = styled.div`
  width: 100%;
  border-radius: 3px;
  margin-bottom: 10px;
  box-shadow: 2px 3px 7px #d7d7d7;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    box-shadow: 2px 3px 7px #868686;
  }
`;

const MImage = styled(Image)`
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 3px;
  border: none;
`;

const MBoxNumber = styled.div`
  width: 30px;
  height: 130px;
  border-radius: 3px;
  background-color: #484848;
  color: #fff;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const M_Box = ({ item }) => {
  return (
    <MBox>
      <MBoxNumber>1 </MBoxNumber>
      <Wrapper width="calc(100% - 30px)" height="100%" dr="row" ju="flex-start">
        <MImage src="https://newsimg.sedaily.com/2021/01/17/22HAHIJ7OG_1.jpg" />

        <Wrapper width="calc(100% - 130px)" height="130px">
          <Wrapper height="25px" bgColor="#b9b9b9" ju="space-between" dr="row">
            <Text padding="0px 10px" color="#fff">
              곡 제목 입니다.
            </Text>

            <Text padding="0px 10px" color="#fff">
              <Text>다운로드</Text>
            </Text>
          </Wrapper>
          <Wrapper
            height="105px"
            bgColor="#fff"
            al="flex-start"
            ju="flex-start"
            padding="5px 5px"
          >
            <Text fontSize="11px" color="#484848">
              제작자정보 -
            </Text>
            <Text fontSize="11px" color="#484848">
              음원등록일 -
            </Text>
            <Text fontSize="11px" color="#484848">
              다운로드수 -
            </Text>
            <Text fontSize="11px" color="#484848">
              좋아요집계 -
            </Text>
            <Text fontSize="11px" color="#484848">
              타이틀곡 -
            </Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </MBox>
  );
};

export default M_Box;
