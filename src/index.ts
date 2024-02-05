import p5 from "p5";
import Point from "./Point";
import Line from "./Line";

const CANVAS_SIZE = 800;

new p5((p5: p5) => {
  const pointsGroup: Point[][] = [];
  const linesGroup: Line[][] = [];
  let t = 0;
  const finalLinePoints: Point[] = [];

  function reset() {
    t = 0;
    finalLinePoints.splice(0);
  }

  p5.setup = () => {
    p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    const clear = p5.createButton("clear");
    clear.mouseClicked(() => {
      pointsGroup.splice(0);
      linesGroup.splice(0);
    });
  };

  p5.draw = () => {
    p5.background(0)
    p5.stroke(255);
    for (let i = 0; i < pointsGroup[0]?.length; i++) {
      const point = pointsGroup[0]?.[i];
      point.draw(i);
    }

    for (let i = 0; i < linesGroup.length; i++) {
      const lines = linesGroup[i];
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        line.draw(t);
      }
    }
    const p = pointsGroup[pointsGroup.length - 1]?.[0].clone();
    if (p) finalLinePoints.push(p);

    p5.noFill();
    p5.stroke(255, 0, 0);

    p5.beginShape();
    for (let i = 0; i < finalLinePoints.length; i++) {
      const p = finalLinePoints[i];
      p5.vertex(p.x, p.y);
    }
    p5.endShape();

    t += 0.005;
    if (t >= 1) {
      reset();
    }
  };

  p5.mouseClicked = () => {
    if (
      p5.mouseX < 0 ||
      p5.mouseX > p5.width ||
      p5.mouseY < 0 ||
      p5.mouseY > p5.height
    )
      return;
    reset();
    const p = new Point(p5, p5.mouseX, p5.mouseY);
    if (!pointsGroup[0]) pointsGroup.push([]);
    pointsGroup.splice(1);
    linesGroup.splice(0);
    linesGroup.push([]);
    const points = pointsGroup[0];
    points.push(p);

    const generateLines = (points: Point[], index = 0) => {
      const newPoints = [];
      for (let i = 0; i < points.length - 1; i++) {
        const point1 = points[i];
        const point2 = points[i + 1];
        if (!linesGroup[index]) linesGroup[index] = [];
        const line = new Line(p5, point1, point2);
        newPoints.push(line.getPointFromT(0));
        linesGroup[index].push(line);
      }
      if (newPoints.length) {
        pointsGroup.push(newPoints);
        generateLines(newPoints, index++);
      }
    };

    generateLines(points);
    console.log(pointsGroup);
  };
});
