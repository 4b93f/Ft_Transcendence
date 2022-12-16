/* eslint-disable prettier/prettier */
let canvas: any;
let context: any;

class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  score: number;
  min: number;
  max: number;
  speed: number;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    score: number,
    min: number,
    max: number,
    speed: number,
  ) {
    this.x = x;
    this.y = y - height / 2;
    this.width = 10;
    this.height = height;
    this.color = color;
    this.score = score;
    this.min = min;
    this.max = max;
    this.speed = speed;
  }
  PaddleUp() {
    context.fillStyle = '#ffffff';
    context.fillRect(this.x, this.y, this.width, this.height);
    if (this.y - this.speed >= -10) this.y -= this.speed;
  }
  PaddleDown() {
    context.fillStyle = '#ffffff';
    context.fillRect(this.x, this.y, this.width, this.height);
    if (this.y + this.speed + this.height <= this.max + 10)
      this.y += this.speed;
  }
}

class Ball {
  x: number;
  y: number;
  radius: number;
  speed: number;
  velocityX: number;
  velocityY: number;
  color: string;
  constructor(
    x: number,
    y: number,
    radius: number,
    speed: number,
    velocityX: number,
    velocityY: number,
    color: string,
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.color = color;
  }
}

export class gameInfo {
  Balling: Ball;
  Player1: Player;
  Player2: Player;
  CDimension: { width: number; height: number };
  constructor(widths: number, heights: number) {
    this.CDimension = { width: widths, height: heights };
    this.Balling = new Ball(widths, heights, 10, 0.001, 0.001, 0.001, 'red');
    this.Player1 = new Player(0, 500, 10, 100, 'white', 0, 0, 0, 3);
    this.Player2 = new Player(0, 0, 10, 100, 'white', 0, 0, 0, 3);
  }
}

export class Gaming {
  Info: gameInfo;
  i = 0;

  constructor(width: number, height: number) {
    this.Info = new gameInfo(width, height);
  }

  getInfo(): gameInfo {
    return this.Info;
  }

  rendering() {
    setInterval(this.render, 1000 / 60);
  }

  render = () => {
    this.UpdateBall();
  };

  collision(
      b: any,
      p: any, //Back
  ) {
    b.top = this.Info.Balling.y - this.Info.Balling.radius;
    b.bottom = this.Info.Balling.y + this.Info.Balling.radius;
    b.left = this.Info.Balling.x - b.radius;
    b.right = this.Info.Balling.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    return (
        b.right > p.left &&
        b.bottom > p.top &&
        b.left < p.right &&
        b.top < p.bottom
    );
  }

  UpdateBall() {
    this.Info.Balling.x += this.Info.Balling.velocityX;
    this.Info.Balling.y += this.Info.Balling.velocityY;
    if (this.Info.Balling.x - this.Info.Balling.radius < 0) {
      this.Info.Player2.score++;
      this.ReplaceBall(1);
      return;
    }
    else if (this.Info.Balling.x + this.Info.Balling.radius > this.Info.CDimension.width) {
      this.Info.Player1.score++;
      this.ReplaceBall(0);
      return;
    }
    if (this.Info.Balling.y + this.Info.Balling.radius > this.Info.CDimension.height || this.Info.Balling.y - this.Info.Balling.radius < 0)
      this.Info.Balling.velocityY = -this.Info.Balling.velocityY;
    const player: string = this.Info.Balling.x < this.Info.CDimension.width / 2 ? 'u1' : 'u2';
    if (player === 'u1' && this.collision(this.Info.Balling, this.Info.Player1))
    {
      console.log('u1');
      let colPoint: number = this.Info.Balling.y - (this.Info.Player1.y + this.Info.Player1.height / 2);
      colPoint = colPoint / (this.Info.Player1.height / 2);
      const angleRad: number = (colPoint * Math.PI) / 4;
      const direction: number = this.Info.Balling.x < this.Info.CDimension.width / 2 ? 1 : -1;

      this.Info.Balling.velocityX = direction * this.Info.Balling.speed * Math.cos(angleRad);
      this.Info.Balling.velocityY = this.Info.Balling.speed * Math.sin(angleRad);
    }
    else if (player === 'u2' && this.collision(this.Info.Balling, this.Info.Player2))
    {
      console.log('u2');
      let colPoint: number = this.Info.Balling.y - (this.Info.Player2.y + this.Info.Player2.height / 2);
      colPoint = colPoint / (this.Info.Player2.height / 2);
      const angleRad: number = (colPoint * Math.PI) / 4;
      const direction: number = this.Info.Balling.x < this.Info.CDimension.width / 2 ? 1 : -1;

      this.Info.Balling.velocityX = direction * this.Info.Balling.speed * Math.cos(angleRad);
      this.Info.Balling.velocityY = this.Info.Balling.speed * Math.sin(angleRad);
    }
  }

  ReplaceBall(i: number) {
    console.log(this.Info.Balling);
    this.Info.Balling.x = this.Info.CDimension.width / 2;
    this.Info.Balling.y = this.Info.CDimension.height / 2;

    this.Info.Balling.speed = 0.001;
    this.Info.Balling.velocityY = this.Info.Balling.speed;
    this.Info.Balling.velocityX = -this.Info.Balling.speed;
    if (i === 0) {
      this.Info.Balling.velocityX = this.Info.Balling.speed;
      this.Info.Balling.velocityY = 0;
    }
  }
}


// type CanvasProps = {
//   width: number;
//   height: number;
// }
