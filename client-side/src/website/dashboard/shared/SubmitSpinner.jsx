import React from 'react';

const SubmitSpinner = () => {
    return (
        <>
            <button className="btn btn-primary float-right" type="button" disabled>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        </>
    );
};

export default SubmitSpinner;
