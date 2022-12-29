import { Searchbar } from 'components/characters/StoreStyle';
import React, { useState } from 'react';

function Search({ setState, placeholder }: any) {
  const [value, setValue] = useState('');

  return (
    <Searchbar
      type="text"
      value={value}
      placeholder={`${placeholder} 🔍`}
      onInput={(event): void => {
        setValue((event.target as HTMLTextAreaElement).value);
        setState((event.target as HTMLTextAreaElement).value);
      }}
    ></Searchbar>
  );
}

export default Search;
