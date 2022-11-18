import React from "react";

interface ISuccess {
    count: number
}

export const Success = ({ count }:ISuccess) => {
    return(
        <div className="success-block">
            <img src="/assets/success.svg" alt="Success" />
            <h3>Success!</h3>
            <p>All {count} users invitation send!</p>
            <button onClick={()=>window.location.reload()} className="send-invinite-btn">Back</button>
        </div>
    )
}