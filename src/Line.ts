import p5 from "p5";
import Point from "./Point";

export default class Line {
  point1: Point;
  point2: Point;
  tPoint?: Point;
  p5: p5;
  constructor(p5: p5, point1: Point, point2: Point) {
    this.point1 = point1;
    this.point2 = point2;
    this.p5 = p5;
  }

  getPointFromT(t: number) {
    const x = this.point1.x + t * (this.point2.x - this.point1.x);
    const y = this.point1.y + t * (this.point2.y - this.point1.y);
    if (!this.tPoint) this.tPoint = new Point(this.p5, x, y);
    else {
      this.tPoint.x = x;
      this.tPoint.y = y;
    }
    return this.tPoint;
  }

  draw(t: number) {
    this.p5.stroke(255);
    this.p5.line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
    const tPoint = this.getPointFromT(t);
    tPoint.draw(0);
    return tPoint;
  }
}
