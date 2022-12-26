import React from 'react';
import { ItemButton, ItemBox } from './StoreStyle';


export default function MyItem() {
    return (
        <div>
        <ItemBox>
            <div style={{display:'flex', justifyContent:'center', padding:'0.3rem'}}>
            <ItemButton onClick={() => {
                confirm(`아이템을 사용하시겠습니까?`)
            }}>사용하기</ItemButton>
            </div>

        </ItemBox>
        </div>
    );
}

