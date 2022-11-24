import React, {useContext, useEffect, useRef} from 'react';

let canvas:any;
let context:any;

type CanvasProps = {
    width: number;
    height: number;
}

function DrawRec(x: number, y: number, w: number, h: number, color:string){
    context.fillStyle = color;
    context.fillRect(x, y, w , h);
}

function DrawBall(x: number, y: number, r: number, color:string){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

const Canvas = (props:CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current)
        {
            canvas = canvasRef.current;
            context = canvas.getContext('2d');
            if (context)
            {
                context.beginPath();
                context.fillStyle = '#000000';
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            }
        }
    })
    return <canvas ref={canvasRef} height={props.height} width={props.width}/>;
}

export default Canvas;