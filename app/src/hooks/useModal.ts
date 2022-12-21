import { useState, useCallback, Ref, useEffect, RefObject } from 'react';

const useModal = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const setModal = () => {
    setToggle((curr) => !curr);
  };

  return { toggle, setModal };
};

export default useModal;