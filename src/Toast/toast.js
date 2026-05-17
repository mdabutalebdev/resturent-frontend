import { toast, Bounce } from "react-toastify";
// toast

function successMessage(
  title = "sucess",
  position = "top-right",
  theme = "light",
  delay = 4000,
  transition = Bounce
) {
  toast.success(title, {
    position: position,
    autoClose: delay,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: theme,
    transition: transition,
  });
}

function errorMessage(
  title = "error",
  position = "bottom-right",
  theme = "light",
  delay = 4000,
  transition = Bounce
) {
  toast.error(title, {
    position: position,
    autoClose: delay,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
    transition: transition,
  });
}

export { successMessage, errorMessage };