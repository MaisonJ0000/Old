import { useState, useCallback } from 'react';

const useInput = (opts) => {
  const {
    initValue,
    type = 'string',
  } = opts || {};
  const [value, setValue] = useState(initValue || '');

  const handleNumber = useCallback((receivedValue) => {
    if (!Number(receivedValue) && receivedValue !== '') {
      return;
    }
    const returnValue = receivedValue;
    setValue(returnValue);
  }, []);
  const handleString = useCallback((receivedValue) => {
    const returnValue = receivedValue;
    setValue(returnValue);
  }, []);

  const onChangeInput = useCallback((e) => {
    const targetValue = e.target.value || '';
    if (type === 'number') {
      handleNumber(targetValue);
    } else {
      handleString(targetValue);
    }
  }, []);
  return [value, onChangeInput, setValue];
};

export default useInput;
