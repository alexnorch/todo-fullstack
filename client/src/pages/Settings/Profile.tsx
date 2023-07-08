import { Link } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

export default function Profile() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 20, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Profile</h1>
        <Link to="..">Go back</Link>
      </motion.div>
    </AnimatePresence>
  );
}
