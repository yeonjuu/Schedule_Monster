import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import * as API from '../../api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { asyncMonsterListFetch } from './slice/monsterListSlice';
import { useDispatch } from 'react-redux';
import { EditMonsterBox, InputBox, AddAndEditBtn, DelBtn } from './adminCss';
import {
  MonsterContainer,
  MonsterImage,
  MonsterImageContainer,
  MonsterLine,
  MonsterStatus,
} from 'components/characters/StoreStyle';
function EditMonster({ monsterData }: any) {
  const dispatch = useDispatch<any>();
  const [check, setCheck] = useState(false);
  const [monster, setMonster] = useState({
    _id: monsterData._id,
    characterName: monsterData.characterName,
    images: {
      img1: '',
      img2: '',
      img3: '',
    },
    levelupPoint: {
      point1: monsterData.levelupPoint.point1,
      point2: monsterData.levelupPoint.point2,
      point3: monsterData.levelupPoint.point3,
    },
  });
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMonster(
      produce((draft: any) => {
        draft.characterName = e.target.value;
      }),
    );
  };
  const onChangeLevelUpPoint = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: string,
  ): any => {
    setMonster(
      produce((draft: any) => {
        draft.levelupPoint[idx] = e.target.value;
      }),
    );
  };
  const onChangeImg = (e: any, idx: string): any => {
    setMonster(
      produce((draft: any) => {
        draft.images[idx] = URL.createObjectURL(e.target.files[0]);
      }),
    );
  };
  useEffect(() => {
    setMonster({
      _id: monsterData._id,
      characterName: monsterData.characterName,
      images: {
        img1: '',
        img2: '',
        img3: '',
      },
      levelupPoint: {
        point1: monsterData.levelupPoint.point1,
        point2: monsterData.levelupPoint.point2,
        point3: monsterData.levelupPoint.point3,
      },
    });
  }, [monsterData]);
  useEffect(() => {
    dispatch(asyncMonsterListFetch());
    setCheck(false);
  }, [check, dispatch]);
  return (
    <MonsterContainer>
      <MonsterImageContainer>
        <MonsterImage src={monster.images.img1} />
      </MonsterImageContainer>
      <MonsterLine>
        <div>몬스터 이름</div>
        <input
          type="text"
          value={monster.characterName}
          onChange={onChangeName}
        />
      </MonsterLine>

      {monster._id !== '' ? (
        <AddAndEditBtn
          onClick={(e) => {
            e.preventDefault();
            if (window.confirm('수정하시겠습니까?')) {
              try {
                API.put('/characters/update', {
                  _id: monster._id,
                  characterName: monster.characterName,
                  levelupPoint: monster.levelupPoint,
                });
              } catch {
                console.log('에러');
              } finally {
                setCheck(true);
              }
            }
          }}
        >
          수정
        </AddAndEditBtn>
      ) : (
        <AddAndEditBtn
          onClick={(e) => {
            e.preventDefault();
            if (window.confirm('추가하시겠습니까?')) {
              try {
                API.post('/characters/register', {
                  characterName: monster.characterName,
                  levelupPoint: monster.levelupPoint,
                  images: monster.images,
                });
              } catch {
                console.log('에러');
              } finally {
                setCheck(true);
              }
            }
          }}
        >
          추가
        </AddAndEditBtn>
      )}
      {monster._id !== '' ? (
        <DelBtn
          onClick={(e) => {
            e.preventDefault();
            if (window.confirm('제거하시겠습니까?')) {
              try {
                API.delete(`/characters/delete/${monster._id}`);
              } catch {
                console.log('에러');
              } finally {
                setCheck(true);
              }
            }
          }}
        >
          제거
        </DelBtn>
      ) : null}
    </MonsterContainer>
  );
}

export default EditMonster;
