import React, { useState } from 'react';

function Search({ setState }: any) {
  const [value, setValue] = useState('');

  return (
    <input
      type="text"
      value={value}
      placeholder="검색"
      onInput={(event): void => {
        setValue((event.target as HTMLTextAreaElement).value);
        setState((event.target as HTMLTextAreaElement).value);
      }}
    />
  );
}

export default Search;
