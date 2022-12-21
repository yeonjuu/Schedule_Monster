import useModal from 'hooks/useModal';
import { Input } from 'pages/login/form';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { PickColor } from './modal/ModalStyle';
import Palette from './modal/Palette';

const Todo = () => {
  const { toggle, setModal } = useModal();
  const color = useSelector((state: RootState) => state.paletteSlice.color);
  return (
    <>
    <div>
      <Input />
      <PickColor onClick={setModal} labelColor={color}
      style={{backgroundColor: `${color}`}}
      >라벨</PickColor>
      {toggle && <Palette />}
      </div>
    </>
  );
};

export default Todo;
