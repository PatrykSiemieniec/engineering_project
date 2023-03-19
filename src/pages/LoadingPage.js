import React from "react";
import './LoadingPage.css';
const LoadingPage = () => {
    return (
        <div className="container">
            <div className="spinner">
                <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        className="path"
                        fill="none"
                        strokeWidth="6"
                        strokeLinecap="round"
                        cx="33"
                        cy="33"
                        r="30"
                    ></circle>
                </svg>
            </div>
        </div>
    );
};

export default LoadingPage;
