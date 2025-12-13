import React from "react";

const Loader = ({ size = "medium", fullScreen = false }) => {
    const sizeClasses = {
        small: "w-6 h-6 border-2",
        medium: "w-12 h-12 border-3",
        large: "w-16 h-16 border-4",
    };

    const loader = (
        <div className="flex items-center justify-center">
            <div
                className={`${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}
            ></div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    return loader;
};

export default Loader;
