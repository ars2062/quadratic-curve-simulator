import p5 from "p5";

export default class Point {
  x: number;
  y: number;
  p5: p5;
  constructor(p5: p5, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.p5 = p5;
  }

  draw(index: number) {
    this.p5.circle(this.x, this.y, 5);
    this.p5.fill(255);
    // this.p5.textAlign(this.p5.CENTER);
    // this.p5.text(`p${index}`, this.x, this.y + 10);
  }

  clone() {
    return new Point(this.p5, this.x, this.y);
  }
}
