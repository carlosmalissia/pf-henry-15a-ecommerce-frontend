import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [width, setWidth] = useState(360);
  const [height, setHeight] = useState(740);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  return { height, width }
}

export default useScreenSize;