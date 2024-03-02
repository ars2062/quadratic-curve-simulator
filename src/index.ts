import p5 from "p5";
import Point from "./Point";
import Line from "./Line";

const CANVAS_SIZE = 800;

new p5((p5: p5) => {
  const points: Point[] = [];
  const linesList: Line[][] = [];
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
      points.splice(0);
      linesList.splice(0);
    });
  };

  p5.draw = () => {
    p5.background(0);
    p5.stroke(255);
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      point.draw(i);
    }

    for (let i = 0; i < linesList.length; i++) {
      const lines = linesList[i];
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        line.draw(t);
      }
    }
    const p = linesList[linesList.length - 1]?.[0]?.TPoint?.clone();

    if (p) {
      finalLinePoints.push(p);
    }

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
    linesList.splice(0);
    linesList.push([]);
    points.push(p);

    const generateLines = (points: Point[], index = 0) => {
      const newPoints = [];
      for (let i = 0; i < points.length - 1; i++) {
        if (!linesList[index]) linesList[index] = [];
        const point1 = points[i];
        const point2 = points[i + 1];
        const line = new Line(p5, point1, point2);
        newPoints.push(line.TPoint);
        linesList[index].push(line);
      }
      if (newPoints.length) {
        generateLines(newPoints, ++index);
      }
    };

    generateLines(points);
  };
});
