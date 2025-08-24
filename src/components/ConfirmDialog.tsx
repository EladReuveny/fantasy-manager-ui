import React from "react";

type ConfirmDialogProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  message: string;
  item: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
};

const ConfirmDialog = ({
  dialogRef,
  message,
  item,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => {
  return (
    <dialog
      ref={dialogRef}
      className="w-1/2 top-1/2 left-1/2 -translate-1/2 bg-(--color-text)/20 text-(--color-text) py-4 px-6 rounded-lg backdrop:backdrop-brightness-15 backdrop:backdrop-blur-md"
    >
      <button
        onClick={onClose}
        className="absolute top-0.5 right-0.5 text-sm rounded-full hover:brightness-85"
      >
        <i className="fas fa-times"></i>
      </button>
      <h2 className="text-2xl mb-4">
        {message}
        <span className="font-bold text-(--color-primary)">{item}</span>
        ?
      </h2>
      <div className="flex items-center gap-4">
        <button
          onClick={onClose}
          className="border border-(--color-primary) text-(--color-primary) py-2 px-4 hover:bg-(--color-primary) hover:text-(--color-bg)"
        >
          <i className="fas fa-times mr-0.5"></i>Cancel
        </button>
        <button
          onClick={onConfirm}
          className="border border-(--color-primary) bg-(--color-primary) text-(--color-bg) py-2 px-4 hover:bg-(--color-bg) hover:text-(--color-primary)"
        >
          <i className="fas fa-check mr-0.5"></i>Confirm
        </button>
      </div>
    </dialog>
  );
};

export default ConfirmDialog;
