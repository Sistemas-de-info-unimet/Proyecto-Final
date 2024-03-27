/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Popup = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="popup"> {/* Add your popup styles here */}
            {children}  {/* Content goes here */}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Popup;