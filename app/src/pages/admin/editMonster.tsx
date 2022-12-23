import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import * as API from '../../api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
const EditItemBox = styled.div`
  background-color: white;
`;
const ImgBox = styled.div`
  height: 150px;
  width: 150px;
  .slick-prev:before {
    opacity: 1;
    color: black; // 버튼 색은 검은색으로
    left: 0;
  }
  .slick-next:before {
    opacity: 1;
    color: black;
  }
`;
const Img = styled.img`
  height: 150px;
  width: 150px;
`;
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: true,
};
function EditMonster({ monsterData }: any) {
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
  return (
    <EditItemBox>
      <form>
        <ImgBox>
          <Slider>
            <Img
              src={monster.images.img1}
              alt="이미지가 없거나 파일 형식이 잘못됐습니다"
            ></Img>
            <Img
              src={monster.images.img2}
              alt="이미지가 없거나 파일 형식이 잘못됐습니다"
            ></Img>
            <Img
              src={monster.images.img3}
              alt="이미지가 없거나 파일 형식이 잘못됐습니다"
            ></Img>
          </Slider>
        </ImgBox>
        <div>몬스터 이름</div>
        <input
          type="text"
          value={monster.characterName}
          onChange={onChangeName}
        />
        <div>
          <div>몬스터 레밸당 경험치</div>
          <label htmlFor="lv1">Lv1</label>
          <input
            type="number"
            id="lv1"
            value={monster.levelupPoint.point1}
            onChange={(e) => {
              onChangeLevelUpPoint(e, 'point1');
            }}
          />
          <label htmlFor="lv2">Lv2</label>
          <input
            type="number"
            id="lv2"
            value={monster.levelupPoint.point2}
            onChange={(e) => {
              onChangeLevelUpPoint(e, 'point2');
            }}
          />
          <label htmlFor="lv3">Lv3</label>
          <input
            type="number"
            id="lv3"
            value={monster.levelupPoint.point3}
            onChange={(e) => {
              onChangeLevelUpPoint(e, 'point3');
            }}
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => {
              onChangeImg(e, 'img1');
            }}
          />
          <input
            type="file"
            onChange={(e) => {
              onChangeImg(e, 'img2');
            }}
          />
          <input
            type="file"
            onChange={(e) => {
              onChangeImg(e, 'img3');
            }}
          />
        </div>
        {monster._id !== '' ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (window.confirm('수정하시겠습니까?')) {
                try {
                  API.put(
                    'https://port-0-schedulemonster-883524lbq4l3iv.gksl2.cloudtype.app/characters/update',
                    {
                      _id: monster._id,
                      characterName: monster.characterName,
                      levelupPoint: monster.levelupPoint,
                    },
                  );
                } catch {
                  console.log('에러');
                }
                window.location.reload();
              }
            }}
          >
            수정
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (window.confirm('추가하시겠습니까?')) {
                try {
                  API.post(
                    'https://port-0-schedulemonster-883524lbq4l3iv.gksl2.cloudtype.app/characters/register',
                    {
                      characterName: monster.characterName,
                      levelupPoint: monster.levelupPoint,
                      images: monster.images,
                    },
                  );
                } catch {
                  console.log('에러');
                }
                window.location.reload();
              }
            }}
          >
            추가
          </button>
        )}
        {monster._id !== '' ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (window.confirm('제거하시겠습니까?')) {
                try {
                  API.delete(
                    `https://port-0-schedulemonster-883524lbq4l3iv.gksl2.cloudtype.app/characters/delete/${monster._id}`,
                  );
                } catch {
                  console.log('에러');
                }
                window.location.reload();
              }
            }}
          >
            제거
          </button>
        ) : null}
      </form>
    </EditItemBox>
  );
}

export default EditMonster;
