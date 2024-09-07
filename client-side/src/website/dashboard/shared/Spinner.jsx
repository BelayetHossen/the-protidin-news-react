import React from 'react';

const Spinner = () => {
    return (
        <>
            <div className="w-full h-full fixed top-0 left-0 bg-black opacity-75 z-50">
                <div className="flex justify-center items-center mt-[50vh]">
                    <div className="fas fa-circle-notch fa-spin fa-3x text-violet-600"></div>
                </div>
            </div>
        </>
    );
};

export default Spinner;
