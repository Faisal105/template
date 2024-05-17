import React from 'react';

const Notification = ({ message, type, onClose }) => {
    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'info':
                return 'bg-blue-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-md text-white ${getBackgroundColor()}`}>
            {message}
            <button onClick={onClose} className="ml-4">
                ✖
            </button>
        </div>
    );
};

export default Notification;
