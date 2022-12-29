import React, { useEffect, useState } from 'react';

import produce from 'immer';
import * as API from '../../api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { asyncMonsterListFetch } from './slice/monsterListSlice';
import { useDispatch } from 'react-redux';
import { AddAndEditBtn } from './adminCss';
import {
  MonsterContainer,
  MonsterImage,
  MonsterImageContainer,
  MonsterLine,
} from 'components/characters/StoreStyle';
import { AppDispatch } from 'store/store';
function EditMonster({ monsterData }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [check, setCheck] = useState(false);
  const [monster, setMonster] = useState({
    _id: monsterData._id,
    characterId: monsterData.characterId,
    characterName: monsterData.nameKo,
    image: {
      imageSprites: {
        back_default: monsterData.image.imageSprites.back_default,
        front_default: monsterData.image.imageSprites.front_default,
        front_shiny: monsterData.image.imageSprites.front_shiny,
      },
    },
  });
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMonster(
      produce((draft: any) => {
        draft.characterName = e.target.value;
      }),
    );
  };
  const put = async () => {
    await API.put('/characters/update', {
      characterId: monster.characterId,
      nameKo: monster.characterName,
    });
  };
  useEffect(() => {
    setMonster({
      _id: monsterData._id,
      characterId: monsterData.characterId,
      characterName: monsterData.nameKo,
      image: {
        imageSprites: {
          back_default: monsterData.image.imageSprites.back_default,
          front_default: monsterData.image.imageSprites.front_default,
          front_shiny: monsterData.image.imageSprites.front_shiny,
        },
      },
    });
  }, [monsterData]);
  useEffect(() => {
    dispatch(asyncMonsterListFetch());
    setCheck(false);
  }, [check]);
  return (
    <MonsterContainer>
      <MonsterImageContainer>
        <MonsterImage src={monster.image.imageSprites.front_default} />
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
                put();
              } catch {
              } finally {
                setCheck(true);
              }
            }
          }}
        >
          수정
        </AddAndEditBtn>
      ) : null}
    </MonsterContainer>
  );
}

export default EditMonster;
