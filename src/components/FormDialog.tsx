import React, { type ReactNode } from "react";

type FormDialogProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  title: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  children: ReactNode;
};

const FormDialog = ({
  dialogRef,
  title,
  onClose,
  onSubmit,
  children,
}: FormDialogProps) => {
  return (
    <dialog
      ref={dialogRef}
      className="w-1/2 top-1/2 left-1/2 -translate-1/2 bg-(--color-bg) text-(--color-text) py-4 px-6 rounded-2xl backdrop:backdrop-brightness-25 backdrop:backdrop-blur-md"
    >
      <button
        onClick={onClose}
        className="absolute top-0.5 right-0.5 text-sm rounded-full hover:brightness-85"
      >
        <i className="fas fa-times"></i>
      </button>
      <h2 className="text-2xl mb-4 border-b-2 border-(--color-primary) text-center">
        {title}
      </h2>

      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-3">
        {children}

        <div className="flex items-center gap-4 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="border border-(--color-primary) text-(--color-primary) py-2 px-4 hover:bg-(--color-primary) hover:text-(--color-bg)"
          >
            <i className="fas fa-times mr-0.5"></i>Cancel
          </button>
          <button
            type="submit"
            className="border border-(--color-primary) bg-(--color-primary) text-(--color-bg) py-2 px-4 hover:bg-(--color-bg) hover:text-(--color-primary)"
          >
            <i className="fas fa-save mr-0.5"></i>Save
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default FormDialog;
