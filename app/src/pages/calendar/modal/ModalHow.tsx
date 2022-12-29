import { About, Background, ContentBox, ModalContainer } from "./ModalStyle";
import { useDispatch } from 'react-redux';
import { toggleHow } from "../slice/modalSlice";

const ModalHow=()=>{
const dispatch=useDispatch();
return (
    <>
    <Background
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
       setTimeout(()=>{
        dispatch(toggleHow());
       },100)
        }}
      ></Background>
      <ModalContainer>
        <ContentBox>
            <div>
        <About> -이용 방법- </About>
        <About> 1. 달력을 더블 클릭하여 일정을 등록한다.</About>
        <About> 2. 등록된 일정 라벨을 클릭하여 수정 및 삭제를 할 수 있다.</About>
        <About> 3. 일정을 완료하면 체크 박스를 눌러 포인트를 얻을 수 있다.(일정을 취소하면 지급 취소)</About>
        <About> 4. 얻은 포인트를 이용하여 상점에서 포켓몬을 모아보자!</About>
      
       </div>
        </ContentBox>
      </ModalContainer>
    </>
)
}
export default ModalHow