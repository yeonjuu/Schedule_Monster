import { RootState } from 'store/store';
import { Monster, MonsterBox } from './CalendarStyles';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const MainMonster = () => {
  const monster = useSelector(
    (state: RootState) => state.mainCharacterSlice.main,
  );
  const [move, setMove] = useState<string>('/MonsterGoing.gif');
  const [number, setNum] = useState<number>(1600);
  //useEffect로 랜덤 숫자의 범위에 따라 다른 이미지 링크를 img태그에 넣음

  setTimeout(() => {
    setNum(4500);
  }, number);

  useEffect(() => {
    const interval = setInterval(() => {
      const num = Math.floor(Math.random() * 10);
      if (num <= 1) {
        setMove(monster.image.versions.blackwhite.animated.front_default);
      } else if (2 <= num && num < 4) {
        setMove(monster.image.front_default);
      } else if (4 <= num && num < 6) {
        setMove(monster.image.back_default);
      } else if (6 <= num && num < 8) {
        setMove(monster.image.versions.blackwhite.animated.front_shiny);
      } else if (8 <= num && num < 10) {
        setMove(monster.image.versions.blackwhite.animated.back_default);
      }
    }, number);

    return () => clearInterval(interval);
  }, [move]);

  return (
    <MonsterBox>
      <Monster style={{ transform: 'scaleX(-1)' }} src={move} alt="" />
    </MonsterBox>
  );
};

export default MainMonster;
