import { useEffect, useRef, useState } from 'react';
import { TwitterPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';

import { pickColor } from './paletteSlice';

const Palette = () => {
  const dispatch = useDispatch();
  const color = useSelector((state: RootState) => state.paletteSlice.color);
  // const [color,setColor]=useState('#ff0000')
  return (
    <TwitterPicker
      color={color}
      onChangeComplete={(color) => dispatch(pickColor(color.hex))}
      triangle={'top-right'}
      width={'380px'}
    />
  );
};

export default Palette;
