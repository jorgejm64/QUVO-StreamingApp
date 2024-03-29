import { useState, useEffect, useCallback, useRef } from "react";

const useLazyLoad = (customCallBack) => {
  const endPageRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const currentRef = endPageRef.current;

  const callbackFunction = useCallback(
    (entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting) customCallBack();
    },
    [customCallBack]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction);
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [currentRef, callbackFunction]);

  return [endPageRef, isIntersecting];
};

export default useLazyLoad;
