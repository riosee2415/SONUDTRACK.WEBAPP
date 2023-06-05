import { Button, Input } from "antd";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Text, Wrapper } from "../components/commonComponents";

const UseAdminInput = ({
  init, // 초기값
  REQUEST_TARGET, // 리듀서
  DATA_TARGET, // 리듀서 데이터
  placeholder, // placeholder
  isNum, // input number
  title, // 타이틀
  updateValue, // 수정할 데이터
  isArea, // input Area
}) => {
  const [value, setValue] = useState(init);
  const [titleValue, setTitleValue] = useState([]);

  const dispatch = useDispatch();

  const changeHandler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    if (title) {
      let arr = [...title];

      setTitleValue(arr);
    }
  }, [title]);

  const updateHandler = useCallback(() => {
    DATA_TARGET[updateValue] = value;

    dispatch({
      type: REQUEST_TARGET,
      data: {
        ...DATA_TARGET,
      },
    });
  }, [value, REQUEST_TARGET, DATA_TARGET, init]);

  return (
    <Wrapper dr={`row`} ju={`space-between`}>
      {title && <Text>{title}</Text>}

      {isArea ? (
        <Input.TextArea
          size="small"
          style={{
            width: `100%`,
            height: `200px`,
          }}
          placeholder={placeholder}
          onChange={changeHandler}
          value={value}
          type={isNum && `number`}
          onKeyDown={(e) => e.keyCode === 13 && updateHandler()}
        />
      ) : (
        <Input
          size="small"
          style={{
            width: title
              ? `calc(100% - ${titleValue.length * 12}px - 45px - 10px)`
              : `calc(100% - 45px)`,
          }}
          placeholder={placeholder}
          onChange={changeHandler}
          value={value}
          type={isNum && `number`}
          onKeyDown={(e) => e.keyCode === 13 && updateHandler()}
        />
      )}

      <Button
        size="small"
        type="primary"
        onClick={updateHandler}
        style={{ width: isArea ? `100%` : `` }}
      >
        수정
      </Button>
    </Wrapper>
  );
};

export default UseAdminInput;
