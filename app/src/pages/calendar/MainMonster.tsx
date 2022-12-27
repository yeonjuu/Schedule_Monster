import { RootState } from 'store/store';
import { Monster, MonsterBox } from './CalendarStyles';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const MainMonster = () => {
  const monster = useSelector(
    (state: RootState) => state.mainCharacterSlice.main,
  );
  const [move, setMove] = useState<string>('/MonsterGoing.gif');
  const [number, setNum] = useState<number>(1000);

//최초 number State만큼 로딩 이미지 보여준 후에 setInterval 시간 재설정
  setTimeout(() => {
    setNum(5000);
  }, number);

    //useEffect로 랜덤 숫자의 범위에 따라 다른 이미지 링크를 img태그에 넣음
  useEffect(() => {
    const interval = setInterval(() => {
      const num = Math.floor(Math.random() * 10);
      if (num <= 3) {
        setMove(monster.image.versions.blackwhite.animated.front_default);
      }  else if (4 <= num && num < 7) {
        setMove(monster.image.versions.blackwhite.animated.front_shiny);
      } else if (7 <= num && num < 10) {
        setMove(monster.image.versions.blackwhite.animated.back_default);
      }
      
    }, number);

    return () => clearInterval(interval);
  }, [move]);

  return (
    <MonsterBox>
      <Monster  src={move} alt="" />
    </MonsterBox>
  );
};

export default MainMonster;
