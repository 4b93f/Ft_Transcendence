import React, {useEffect, useRef} from 'react';

let canvas:any;
let context:any;

const ball = {
    x : 0,
    y : 0,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "#FFFFFF"
}

const u1 = {
    x : 0,
    y : 0,
    width : 50,
    height : 250,
    speed : 20,
    max : 0,
    min : 0,
    score : 0,
    color : "#FFFFFF"
}

const u2 = {
    x : 0,
    y : 0,
    width : 50,
    speed : 10,
    height : 250,
    score : 0,
    color : "#FFFFFF"
}

type CanvasProps = {
    width: number;
    height: number;
}

function DrawRec(x: number, y: number, w: number, h: number, color:string){
    context.fillStyle = color;
    context.fillRect(x, y, w , h);
}

function PaddleUp(){
    context.fillStyle = '#000000';
    context.fillRect(u1.x, u1.y, u1.width, u1.height);
    if (u1.y - u1.speed >= -10)
        u1.y -= u1.speed;
}

function PaddleDown(){
    context.fillStyle = '#000000';
    context.fillRect(u1.x, u1.y, u1.width, u1.height)
    if (u1.y + u1.speed + u1.height <= u1.max + 10)
        u1.y += u1.speed;
    console.log(u1.y);
    console.log(u1.max);
}

function DrawBall(x: number, y: number, r: number, color:string){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

function ResetBall(){
    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function UpdateBall()
{
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }
}


const render = () => {
    ResetBall();
    DrawRec(u1.x, u1.y, u1.width, u1.height, "#FFFFFF");
    DrawRec(u2.x, u2.y, u2.width, u2.height, "#FFFFFF");
    DrawBall(ball.x, ball.y, 20, "#000FFF");
    UpdateBall();
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
                u1.y = (canvas.height - u1.height) / 2 ;
                u2.y = (canvas.height - u2.height) / 2 ;
                u2.x = canvas.width - u2.width;
                ball.y = canvas.height /2;
                u1.max = canvas.height;
                setInterval(render, 10);
            }
            canvas.tabIndex = 1;
            canvas.addEventListener('keydown', function(e:any) {
                if (e.keyCode === 38){
                    console.log("UP");
                    PaddleUp();
                }
                if (e.keyCode === 40){
                    console.log("DOWN");
                    PaddleDown();
                }

            });
        }
    })
    return <canvas ref={canvasRef} height={props.height} width={props.width}/>;
}

export default Canvas;