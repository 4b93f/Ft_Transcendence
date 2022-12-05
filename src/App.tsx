import React, {useState, useEffect, useCallback} from "react";
import {Gaming} from "./components/Canvas";
import axios from "axios";


function App() {
    let g = new Gaming(1000, 600);
    const [data, setData] = useState([]);
    const test = useCallback(async () => {
        const response = await axios.get("http://localhost:5000");
        console.log(response.data);
        setData(response.data);
    }, []);
    useEffect(() => {
        test();
    }, []);
    return (
        <div/>
    );
}

export default App;