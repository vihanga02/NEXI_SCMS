import React from 'react';
import './Alert.css';

const Alert = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="overlay">
            <div className="alertBox">
                <p>{message}</p>
                <div className="buttonContainer">
                    <button onClick={onConfirm} className="confirmButton">Yes</button>
                    <button onClick={onCancel} className="cancelButton">No</button>
                </div>
            </div>
        </div>
    );
};

export default Alert;