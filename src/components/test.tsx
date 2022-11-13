import React, {useState} from "react";
import Backdrop from "./Backdrop";
import Ask from "./Ask";


function Testing(props:{str: string}) {
    const [ modalOpen, setModalOpen] = useState(false);

    function OpenModal(){
        setModalOpen(true);
    }
    function CloseModal(){
        setModalOpen(false);
    }

    return (
        <div className='card'>
            <h2>{props.str}</h2>
            <div className='actions'>
                <button className='btn' onClick={OpenModal}>Click me UwU</button>
            </div>
            { modalOpen && (<Ask onCancel={CloseModal} onConfirm={CloseModal}/>)}
            { modalOpen && <Backdrop onClick={CloseModal}/>}
        </div>);
}

export default Testing;