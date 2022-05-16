import swal from "sweetalert2";

export const showNotification = (
  icon,
  title,
  text,
  confirmButtonText,
  callBack
) => {
  swal
    .fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonText: confirmButtonText,
      allowOutsideClick: false,
    })
    .then((result) => {
      if (result.isConfirmed)
        if (callBack !== undefined && callBack !== null) {
          callBack();
        }
    });
};
