import { motion, Variants } from "framer-motion";
import { CgSpinnerTwo } from "react-icons/cg";

const spinnerContainerVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { when: "beforeChildren" } },
};

const spinnerVariants: Variants = {
  hidden: {},
  visible: { rotateZ: [0, 180, 360], transition: { repeat: Infinity } },
};

const Spinner = () => {
  return (
    <motion.div
      className="my-2 flex justify-center"
      variants={spinnerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={spinnerVariants}>
        <CgSpinnerTwo className="text-4xl" />
      </motion.div>
    </motion.div>
  );
};
export default Spinner;
