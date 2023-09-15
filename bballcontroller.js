import { BBall } from "./bball.js";

export class BallController {
  constructor() {
    this.img = new Image();
    this.img.onload = () => {
      this.loaded();
    };
    this.img.src = 'bball.png';

    this.balls = [];

    this.isLoaded = false;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  loaded() {
    this.isLoaded = true;
    this.addBall();
  }

  addBall() {
    const ball = new BBall(this.img);
    ball.stageHeight = this.stageHeight;
    ball.stageWidth = this.stageWidth;
    this.balls.push(ball);
  }

  drawBasketball(ctx) {
    // Only draw if the SVG is loaded
    if (this.isLoaded) {
      this.addBall();
      
      const ball = this.balls[0];
      ball.draw(ctx);

    }
  }

  

}