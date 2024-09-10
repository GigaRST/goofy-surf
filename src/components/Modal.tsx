import React, { useState, ReactNode } from "react";

interface ModalProps {
  trigger: ReactNode;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ trigger, children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div onClick={handleToggleModal} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-bold">{title}</h1>
              <button
                onClick={handleToggleModal}
                className="btn btn-sm btn-circle"
              >
                ✕
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
