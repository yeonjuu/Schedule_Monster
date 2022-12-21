import { Searchbar } from 'components/characters/StoreStyle';
import React, { useState } from 'react';

function Search({ setState }: any) {
  const [value, setValue] = useState('');

  return (
    <Searchbar
    type="text"
    value={value}
    placeholder="아이템 검색 🔍"
    onInput={(event): void => {
      setValue((event.target as HTMLTextAreaElement).value);
      setState((event.target as HTMLTextAreaElement).value);
    }}>

    </Searchbar>

  );
}

export default Search;
