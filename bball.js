export class BBall {

  constructor(img) {
    this.img = img;

    // Dimensions
    this.imgWidth = 150;
    this.imgHeight = 150;
    this.ballWidth = 69;
    this.ballHeight = 69;
    this.ballWidthHalf = this.ballWidth / 2;

    // Position & Velocity
    this.x = 200;
    this.y = 200;
    this.vx = 0;
    this.vy = 0;

    // Rotation
    this.rotation = 0;
    this.angularVelocity = 0;

    // Controls
    this.dribbleDirection = 1;
    this.isAiming = false;
    
    // Physics
    this.gravity = 0.8;
    this.bounceFactor = -0.8;
    this.friction = 0.98;

    document.addEventListener('click', this.handleDribble.bind(this));
    document.addEventListener('mousedown', this.aim.bind(this));
    document.addEventListener('mouseup', this.stopaim.bind(this));

  }

  aim() {
    this.isAiming = true;
    this.vx = 0;
    this.vy = 0;
    this.angularVelocity = 0;
  }

  stopaim() {
    this.isAiming = false;
  }

  handleDribble() {
    if (this.isAiming) return;
    this.vy = 18;

    let strength = 10;
    let crossOver = strength * this.dribbleDirection;
    this.vx = crossOver;
    this.dribbleDirection *= -1;
  }

  animate(ctx) {
    // Gravity
    if (!this.isAiming) {
      this.vy += this.gravity;
    }

    // Horizontal Friction (only when ball touches ground)
    if (this.y + this.ballHeight >= this.stageHeight) {
      this.vx *= this.friction;
      this.angularVelocity = this.vx * 0.01;
    }

    // Update Position
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.angularVelocity;

    // Floor Collision
    if (this.y + this.ballHeight >= this.stageHeight) {
      this.y = this.stageHeight - this.ballHeight;
      this.vy *= this.bounceFactor;
    }

    // Wall Collision
    if (this.x + this.ballWidth >= this.stageWidth) {
      this.x = this.stageWidth - this.ballWidth;
      this.vx *= -0.75;
    } else if (this.x <= 0) {
      this.x = 0;
      this.vx *= -0.75;
    }

    // Drawing
    ctx.save();
    ctx.translate(this.x + this.ballWidth / 2, this.y + this.ballHeight / 2);
    ctx.rotate(this.rotation);
    ctx.drawImage(
      this.img,
      -this.ballWidth / 2,
      -this.ballHeight / 2,
      this.ballWidth,
      this.ballHeight
    );
    ctx.restore();
  }

  draw(ctx) {
    this.animate(ctx);
  }
}
