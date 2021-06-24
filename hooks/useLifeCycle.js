/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef} from 'react';

export const useComponentDidMount = handler => {
  return useEffect(() => {
    handler();
  }, []);
};

export const useComponentDidUpdate = (handler, deps = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      console.log('isInitialMount :>> ', isInitialMount);
      isInitialMount.current = false;

      return;
    }

    return handler();
  }, deps);
};

export const useComponentWillUnmount = handler => {
  return useEffect(() => {
    return () => handler();
  }, []);
};
