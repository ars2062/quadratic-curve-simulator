import p5 from "p5";
import Point from "./Point";

export default class Line {
  point1: Point;
  point2: Point;
  _tPoint: Point;
  p5: p5;
  constructor(p5: p5, point1: Point, point2: Point) {
    this.point1 = point1;
    this.point2 = point2;
    this.p5 = p5;
    this._tPoint = this.getPointFromT(0);
  }

  private getPointFromT(t: number) {
    const x = this.point1.x + t * (this.point2.x - this.point1.x);
    const y = this.point1.y + t * (this.point2.y - this.point1.y);
    return new Point(this.p5, x, y);
  }

  get TPoint(): Point {
    return this._tPoint;
  }

  set TPoint(t: number) {
    const x = this.point1.x + t * (this.point2.x - this.point1.x);
    const y = this.point1.y + t * (this.point2.y - this.point1.y);
    this._tPoint.x = x;
    this._tPoint.y = y;
  }

  updateTPoints(t: number) {}

  draw(t: number, stroke=255) {
    this.p5.stroke(stroke);
    this.p5.line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
    this.TPoint = t;
    this.TPoint.draw(0);
  }
}
