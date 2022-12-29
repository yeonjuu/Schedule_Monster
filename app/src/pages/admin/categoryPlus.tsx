import React, { useState } from 'react';
import * as API from '../../api';
import * as Style from '../../components/modal/modal';
import { useSelector } from 'react-redux';

export const Plus = ({ setCheck }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const addHandler = async (name: string) => {
    const data = await API.post('/category/register', {
      categoryName: name,
    });
    setCheck(true);
  };
  const changeHandler = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };
  return (
    <Style.Wrapper>
      <Style.Button type="button" value="+" onClick={clickHandler} />
      {isOpen && <Modal onChange={changeHandler} onSave={addHandler} />}
    </Style.Wrapper>
  );
};
type modalType = {
  isOpen?: boolean;
  isClose?: boolean;
  onChange: (a: boolean) => void;
  onSave: (a: string) => void;
};

const Modal: React.FC<modalType> = ({ onChange, onSave }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const categoryList = useSelector(
    (state: any) => state.categoryListReducer.categoryList,
  );
  const findCategory = (): any => {
    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].categoryName === name) {
        return false;
      }
    }
    return true;
  };
  const addClickHandler = () => {
    if (!window.confirm('추가하시겠습니까?')) {
      return;
    }
    if (name === '') {
      setError(true);
      return;
    } else if (!findCategory()) {
      setError(true);
      return;
    }
    setError(false);
    onSave(name);
    onChange(false);
  };
  const cancelClickHandler = () => {
    setName('');
    onChange(false);
  };
  return (
    <Style.Container>
      <Style.Title>카테고리추가</Style.Title>
      <Style.Label>카테고리이름</Style.Label>
      <Style.Input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      />
      <Style.Error>
        {error && '값이 입력되지 않았거나 이미 존재하는 항목입니다'}
      </Style.Error>
      <Style.ButtonCotainer>
        <Style.Button type="button" value="추가" onClick={addClickHandler} />
        <Style.Button type="button" value="취소" onClick={cancelClickHandler} />
      </Style.ButtonCotainer>
    </Style.Container>
  );
};
