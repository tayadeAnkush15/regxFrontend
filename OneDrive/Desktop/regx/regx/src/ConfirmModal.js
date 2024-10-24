// ConfirmModal.js
import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl mb-4">{message}</h2>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
