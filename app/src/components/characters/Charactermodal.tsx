import React, { useState } from 'react';
import { Box, MonsterImage, Image, ModalBtn, MoveBox } from './modalStyle';

function CharacterModal({ setModalCheck, monsterData }: any) {
  const [check, setCheck] = useState(false);
  console.log(monsterData);
  setTimeout(() => {
    setCheck(true);
  }, 4000);
  return (
    <Box>
      {check ? (
        <MoveBox>{monsterData.characterName} 을/를 얻었습니다!!!!</MoveBox>
      ) : null}
      <Image src="https://cdn.discordapp.com/attachments/1051684236299608071/1057294279309013102/0ad12d8525d5ac8c.png"></Image>
      <MonsterImage src={monsterData.chracterImg} />
      <ModalBtn
        onClick={() => {
          setModalCheck(false);
        }}
      >
        확인
      </ModalBtn>
    </Box>
  );
}

export default CharacterModal;
