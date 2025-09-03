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
          className="flex w-fit items-center gap-2 rounded-md bg-red-700 px-6 py-3 text-white"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <BiErrorCircle className="text-2xl" />
          <p>{text}</p>
        </motion.div>
      </div>
    );
  return (
    <div className="rounded-md bg-black p-2 text-white">
      <p>{text}</p>
    </div>
  );
};
export default Alert;
