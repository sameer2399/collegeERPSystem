import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

function LoadingOrderCard() {
  const items = [1, 2, 4, 5];
  function Item() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
      <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
        <Box className="flex items-center w-full">
          <motion.div className="avatar" layout />
          <Box className="w-full ml-4">
            <Content />
          </Box>
        </Box>
        <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
      </motion.li>
    );
  }
  function Content() {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="loading-card-row animate-pulse" />
        <div className="loading-card-row animate-pulse" />
        <div className="loading-card-row animate-pulse" />
      </motion.div>
    );
  }
  return (
    <AnimateSharedLayout>
      <motion.ul layout initial={{ borderRadius: 25 }}>
        {items.map((item) => (
          <Item key={item} />
        ))}
      </motion.ul>
    </AnimateSharedLayout>
  );
}

export { LoadingOrderCard };
