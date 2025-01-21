import React from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  body: string | React.ReactNode;
  onClose: () => void;
  onSave?: () => void;
  actionButtonText?: string;
  closeButtonText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  body,
  onClose,
  onSave,
  actionButtonText = "",
  closeButtonText = "",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal"
      tabIndex={-1}
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            {onSave && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSave}
              >
                {actionButtonText}
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              {closeButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
