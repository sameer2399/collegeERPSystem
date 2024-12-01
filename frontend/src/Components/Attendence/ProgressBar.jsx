import Styles from "./Attendence.module.css";
import React, { useRef, useLayoutEffect } from "react";
const Progress = ({ percentage }) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    ref.current.style.setProperty("width", percentage);
  }, []);
  return (
    <div className={Styles.progress}>
      <div
        style={{
          background:
            parseInt(percentage) <= 20
              ? "#FC3B36"
              : parseInt(percentage) <= 35
              ? "#F9673A"
              : parseInt(percentage) <= 70
              ? "#32F83A"
              : parseInt(percentage) <= 100
              ? "#07F911"
              : "",
        }}
        ref={ref}
        className={Styles.progressvalue}
      >
        <span>
          {parseInt(percentage) > 1 ? `${parseInt(percentage)} %` : ""}
        </span>
      </div>
    </div>
  );
};

export default Progress;
