import styled from 'styled-components';

//나브바 메인
export const Main = styled.main`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    /* margin-left: 5rem; */
`

//상점 메인 페이지
export const ContentsBox = styled.div`
    background-color: #85A6FC;
    border-radius: 1rem;
    height: 75vh;

    display: flex;
    justify-content: space-around;
    align-items: center;

    margin: 0 2rem;
    padding: 1rem;

    box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);

`

//몬스터 프로필
export const MonsterContainer = styled.div`
    background-color: white;
    width: 30%;
    height: 80%;
    border-radius: 1rem;
    padding: 1rem;
    margin-left: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    overflow: hidden;

    box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);

`

export const MonsterImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 15rem;
    height: 15rem;
    background-color: aliceblue;
    border-radius: 50%;
    margin-bottom: 1.5rem;

    box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);

    &:hover{
        width: 16rem;
        height: 16rem;
        background-color: aliceblue;
        border-radius: 50%;
        margin-bottom: 1.5rem;
    }
`

export const MonsterStatus = styled.div`
    background-color: aliceblue;
    width: 15rem;
    height: 10rem;
    border-radius: 1rem;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
`
export const MonsterLine = styled.li`
    list-style: none;
`

export const ItemList = styled.div`
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 60%;
    height: 80%;

    box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);

`

//아이템 리스트
export const ItemContainer = styled.div`
    width: 90%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    overflow: hidden;
    overflow-y: hidden;

`

export const CategoryBox = styled.div`
    background-color: #A2BCFE;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 1rem;

    flex-shrink: 0;

    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;

    flex-wrap: wrap;

    overflow-y: scroll;

`
export const ItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: aliceblue;
    width: 130px;
    height: 150px;
    margin: 1rem;
    
    border-radius: 1rem;

    flex-shrink: 0;

    box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    
    &:hover {
        transform: scale(1.1);
    }
`

//수집도감 리스트
export const CharacterContainer = styled.div`
    background-color: white;
    border-radius: 1rem;
    width: 60%;
    height: 80%;

    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    padding: 1rem;
`
export const CharacterBox = styled.div`
    background-color: aliceblue;
    width: 130px;
    height: 150px;
    margin: 1rem;
    flex-shrink: 0;
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;

    box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);

    &:hover {
        transform: scale(1.1);
    }
`


//검색창
export const Searchbar = styled.input`
    width: 50%;
    height: 10%;
    flex-shrink: 0;

    border: 2px solid #a2bcff;

    border-radius: 10rem;
    margin-bottom: 1rem;

    color: gray;
    text-align: start;
    padding: 0 0.5rem;

    box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);


    &::placeholder {
        font-size: 200;
        opacity: 0.8;
        color: gray;
        margin-left: 1rem;
        font-style: italic;
    }

    &:focus {
        border-color: black;
    }
`

//구매, 사용 버튼
export const ItemButton = styled.button`
    background-color: #a2bcff;
    cursor: pointer;
    border: none;
    border-radius: 0.3rem;
    padding: 0.3rem;

    width: 100%;
    height: 1.5rem;

    font-weight: bold;

    &:hover {
     background-color: #84a5f8;
    }
`

//구매 수량 버튼
export const QuanButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    border-style: none;
    border-radius: 50%;
    background-color: #a2bcff;
    font-size: large;
    font-weight: 500;
    &:hover {
     background-color: #84a5f8;
    }
`