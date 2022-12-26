import React from 'react';
import { ItemButton, ItemBox } from './StoreStyle';

export default function StoreItem() {
    return (
        <ItemBox>
            <div style={{display:'flex', justifyContent:'space-around', padding:'0.3rem'}}>

            <span>💰 100</span>
            <ItemButton onClick={() => confirm('아이템명을 구매하시겠습니까?')}>
                구매하기
            </ItemButton>
            </div>

        </ItemBox>
    );
}

