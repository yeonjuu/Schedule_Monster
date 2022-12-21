import useModal from 'hooks/useModal';
import { Input } from 'pages/login/form';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { PickColor } from './modal/ModalStyle';
import Palette from './modal/Palette';

const Schedule = ({ dates }: { dates: string | any }) => {
    const { toggle, setModal } = useModal();
  const color = useSelector((state: RootState) => state.paletteSlice.color);
    const year = Number(dates.slice(0, 4));
  const month = Number(dates.slice(4, 6));
  const day = Number(dates.slice(6, 8));
  return (
    <div>
     <span>
          {year}년 {month}월 {day}일
        </span>
      <Input placeholder="제목" style={{width: '100%'}}/>
      <Input placeholder="기간: 날짜 라이브러리 도입 예정" style={{width: '100%'}}/>
      <Input  />
      <PickColor
          onClick={setModal}
          labelColor={color}
          style={{ backgroundColor: `${color}` }}
        >
          라벨
        </PickColor>
        {toggle && <Palette />}
       
    </div>
  );
};

export default Schedule;
