import Swal, { SweetAlertIcon } from "sweetalert2";
interface Props {
  headTitle: string;
  body: string;
  type: SweetAlertIcon;
  btnText: string;
}
export const AlertPrimary = ({
  body = "",
  type,
  headTitle = "",
  btnText = "",
}: Props) => {
  return Swal.fire({
    title: headTitle,
    html: body,
    icon: type,
    confirmButtonText: btnText,
  });
};
