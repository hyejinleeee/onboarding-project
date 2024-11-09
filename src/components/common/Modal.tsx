import BackDrop from "./BackDrop";
import Button from "./Button";
import { ModalType } from "../../types/modal.type";

type ModalProps = {
  modal: ModalType;
};
const splitCommentWithSlash = (comment: string): string[] => {
  return comment.split("/");
};

const Modal = ({ modal }: ModalProps) => {
  const {
    label,
    onConfirm,
    onCancel,
    isConfirmModal = true,
    confirmButtonContent,
    cancelButtonContent,
  } = modal;

  return (
    <BackDrop>
      <div className="inline-flex flex-col items-center bg-white border-2 rounded-2xl  px-4 py-4 gap-4">
        <div className=" font-normal text-base ">
          {splitCommentWithSlash(label).map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        {isConfirmModal && cancelButtonContent ? (
          <div className="flex items-start gap-3">
            <Button onClick={onConfirm} size={"lg"}>
              {confirmButtonContent.children}
            </Button>
            <Button onClick={onCancel} size={"lg"} variant={"outline"}>
              {cancelButtonContent.children}
            </Button>
          </div>
        ) : (
          <Button onClick={onConfirm} size={"lg"}>
            {confirmButtonContent.children}
          </Button>
        )}
      </div>
    </BackDrop>
  );
};

export default Modal;
