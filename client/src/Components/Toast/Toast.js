import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ message, type = "default" }) => {
  useEffect(() => {
    const config = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    switch (type) {
      case "success":
        toast.success(message, config);
        break;
      case "error":
        toast.error(message, config);
        break;
      case "info":
        toast.info(message, config);
        break;
      case "warning":
        toast.warn(message, config);
        break;
      default:
        toast(message, config);
    }
  }, [message, type]);

  return <ToastContainer />;
};

export default Toast;
