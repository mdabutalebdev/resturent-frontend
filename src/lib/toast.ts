import { toast, Bounce, type ToastPosition, type Theme } from "react-toastify";

export function successMessage(
  title = "sucess",
  position: ToastPosition = "top-right",
  theme: Theme = "light",
  delay = 4000,
  transition = Bounce
) {
  toast.success(title, {
    position,
    autoClose: delay,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme,
    transition,
  });
}

export function errorMessage(
  title = "error",
  position: ToastPosition = "bottom-right",
  theme: Theme = "light",
  delay = 4000,
  transition = Bounce
) {
  toast.error(title, {
    position,
    autoClose: delay,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
    transition,
  });
}
