import { BiErrorCircle } from "react-icons/bi";
import { motion } from "framer-motion";

interface Props {
  text: string;
  error: boolean;
}

const Alert = ({ text, error }: Props) => {
  if (error)
    return (
      <div className="my-2 flex justify-center">
        <motion.div
          className="px-6 py-3 w-fit flex items-center gap-2 rounded-md bg-red-700 text-white"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <BiErrorCircle className="text-2xl" />
          <p>{text}</p>
        </motion.div>
      </div>
    );
  return (
    <div className="p-2 bg-black rounded-md text-white">
      <p>{text}</p>
    </div>
  );
};
export default Alert;
