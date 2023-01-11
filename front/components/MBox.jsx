import React from "react";
import styled from "styled-components";
import { Input, Image } from "antd";
import { Wrapper, Text } from "./commonComponents";

const MBox = styled.div`
  width: calc(50% - 10px);
  border-radius: 3px;
  margin-bottom: 10px;
  margin-right: 10px;
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
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 3px;
  border: none;
`;

const MBoxNumber = styled.div`
  width: 30px;
  height: 150px;
  border-radius: 3px;
  background-color: #484848;
  color: #fff;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DownloadText = styled(Text)`
  transition: 0.4s;

  &:hover {
    color: ${(props) => props.theme.subTheme3_C};
  }
`;

const M_Box = ({ item, idx }) => {
  return (
    <MBox>
      <MBoxNumber>{idx} </MBoxNumber>
      <Wrapper width="calc(100% - 30px)" height="100%" dr="row" ju="flex-start">
        <MImage src="https://newsimg.sedaily.com/2021/01/17/22HAHIJ7OG_1.jpg" />

        <Wrapper width="calc(100% - 150px)" height="150px">
          <Wrapper height="25px" bgColor="#b9b9b9" ju="space-between" dr="row">
            <Text padding="0px 10px" color="#fff">
              {item.title}
            </Text>

            <Text padding="0px 10px" color="#fff">
              <DownloadText>음원 다운로드</DownloadText>
            </Text>
          </Wrapper>
          <Wrapper
            height="125px"
            bgColor="#fff"
            al="flex-start"
            ju="flex-start"
            padding="5px 5px"
          >
            <Text fontSize="12px" color="#484848">
              제작자정보 : {item.author}
            </Text>
            <Text fontSize="12px" color="#484848">
              음원등록일 : {item.viewCreatedAt}
            </Text>
            <Text fontSize="12px" color="#484848">
              다운로드수 : {item.downloadCnt}
            </Text>
            <Text fontSize="12px" color="#484848">
              좋아요집계 :
            </Text>
            <Text color={item.isTitle ? "red" : "#999"} fontSize="12px">
              타이틀여부 : {item.isTitle ? "Y" : "N"}
            </Text>
            <Text fontSize="12px" color="#484848">
              장르 :
              {item.gens.map((data) => {
                return <span> {data} | </span>;
              })}
            </Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </MBox>
  );
};

export default M_Box;
