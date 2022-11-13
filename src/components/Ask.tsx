import React from "react";

function Ask(props: any){
    function ConfirmB(){
        props.onConfirm();
    }

    function CancelB(){
        props.onCancel();
    }

    return(
        <div className='modal'>
            <p>Did you clicked on me UwU ? </p>
            <button className='btn' onClick={ConfirmB}>Yes UwU</button>
            <button className='btn btn--alt' onClick={CancelB}>No UwU</button>
        </div>
    );
}

export default Ask