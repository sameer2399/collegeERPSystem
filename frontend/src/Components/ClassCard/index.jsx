import Styles from "./Class.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
const ClassCard = ({ subjectName, time, date, bg }) => {
  const [showSkills, setSkills] = useState(true);
  const socialItemVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };
  const socialVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
        type: "tween",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className={Styles.new}
      variants={socialVariants}
      initial="hidden"
      animate={showSkills ? "show" : "hidden"}
    >
      <motion.div className={Styles.class} variants={socialItemVariants}>
        <div style={{ background: bg }} className={Styles.first}>
          <p>{subjectName}</p>
        </div>
        <div className={Styles.second}>
          <h2>{time ? time.replace("-", " to ") : ""}</h2>
        </div>
        <div className={Styles.third}>
          <p>{date}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export { ClassCard };
