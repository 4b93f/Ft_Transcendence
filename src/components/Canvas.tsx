import React, {useEffect, useRef} from 'react';

let canvas:any;
let context:any;

const ball = {
    x : 0,
    y : 0,
    radius : 10,
    velocityX : -3,
    velocityY : 0,
    speed : 3,
    color : "#477cae"
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
    color : "#da0101"
}

const u2 = {
    x : 0,
    y : 0,
    width : 50,
    height : 250,
    speed : 20,
    max: 0,
    min: 0,
    score : 0,
    color : "#39c524"
}

type CanvasProps = {
    width: number;
    height: number;
}

function ReplaceBall(i:number)
{
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    ball.speed = 3;
    ball.velocityY = -ball.velocityY;
    ball.velocityX = -ball.speed;
    if (i === 0)
        ball.velocityX = ball.speed;
}

function DrawScore(x:number, y:number, color:string, text:string)
{
    context.fillStyle = '#ffffff';
    context.font = '45px Arial';
    context.fillText(text, x, y)
}

function DrawRec(x: number, y: number, w: number, h: number, color:string)
{
    context.fillStyle = color;
    context.fillRect(x, y, w , h);
}

function PaddleUp()
{
    context.fillStyle = '#000000';
    context.fillRect(u1.x, u1.y, u1.width, u1.height);
    if (u1.y - u1.speed >= -10)
        u1.y -= u1.speed;
}

function PaddleDown()
{
    context.fillStyle = '#000000';
    context.fillRect(u1.x, u1.y, u1.width, u1.height)
    if (u1.y + u1.speed + u1.height <= u1.max + 10)
        u1.y += u1.speed;
    console.log(u1.y);
    console.log(u1.max);
}

function DrawBall(x: number, y: number, r: number, color:string)
{
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

function ResetBall()
{
    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function UpdateBall()
{
    if (ball.x - ball.radius < 0)
    {
        u2.score++;
        ReplaceBall(1);
    }
    if (ball.x + ball.radius > canvas.width)
    {
        u1.score++;
        ReplaceBall(0);
    }
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
        ball.velocityY = -ball.velocityY;
    let player:string = (ball.x < (canvas.width / 2)) ? 'u1' : 'u2';
    console.log(ball);
    if (player === 'u1' && collision(ball, u1))
    {
        console.log("collision !");
        let colPoint:number = ball.y - (u1.y + (u1.height / 2));
        colPoint = colPoint / (u1.height / 2);
        let angleRad:number = colPoint * Math.PI / 4;
        let direction:number = (ball.x < (canvas.width / 2)) ? 1 : -1;

        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.speed += 0.5;
    }
    if (player === 'u2' && collision(ball, u2))
    {
        console.log("collision !");
        let colPoint:number = ball.y - (u2.y + (u2.height / 2));
        colPoint = colPoint / (u2.height / 2);
        let angleRad:number = colPoint * Math.PI / 4;
        let direction:number = (ball.x < (canvas.width / 2)) ? 1 : -1;

        ball.speed += 0.5;

        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
    }
}

function collision(b:any, p:any)
{
    b.top = ball.y - ball.radius;
    b.bottom = ball.y + ball.radius;
    b.left = ball.x - b.radius;
    b.right = ball.x + b.radius

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

const render = () => {
    ResetBall();
    DrawScore(canvas.width / 4, canvas.height / 4, '#FFFFFF', u1.score.toString());
    DrawScore(3 * canvas.width / 4, canvas.height / 4, '#FFFFFF', u2.score.toString());
    DrawRec(u1.x, u1.y, u1.width, u1.height, u1.color);
    DrawRec(u2.x, u2.y, u2.width, u2.height, u2.color);
    DrawBall(ball.x, ball.y, ball.radius, ball.color);
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
                context.fillStyle = '#959319';
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                u1.y = (canvas.height - u1.height) / 2 ;
                u2.y = (canvas.height - u2.height) / 2 ;
                u2.x = canvas.width - u2.width;
                ball.y = canvas.height /2;
                ball.x = canvas.width / 2;
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