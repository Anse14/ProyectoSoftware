import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import 'p5/lib/addons/p5.sound';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  canvas;
  angle = 90;

  constructor() {}

  ngOnInit(): void {
    const sketch = (s) => {
      s.setup = () => {
        s.createCanvas(s.windowWidth/5, s.windowHeight/5).parent('myCanvas');
        // s.createCanvas(900, 900);
      };

      s.draw = () => {
        let lines = 280;

        let firstColor = { r: 223, g: 228, b: 234 };
        let secondColor = { r: 130, g: 225, b: 255 };

        let transitionR = this.getTransition(
          firstColor.r,
          secondColor.r,
          lines
        );
        let transitionG = this.getTransition(
          firstColor.g,
          secondColor.g,
          lines
        );
        let transitionB = this.getTransition(
          firstColor.b,
          secondColor.b,
          lines
        );

        s.background(255, 255, 255);
        s.translate(s.width / 2, s.height / 2);
        s.strokeWeight(3);

        for (let i = 0; i < lines; i += 10) {
          s.push();
          s.rotate(s.radians(i) * s.cos(s.radians(this.angle)));
          s.stroke(
            firstColor.r + s.floor(i * transitionR),
            firstColor.g + s.floor(i * transitionG),
            firstColor.b + s.floor(i * transitionB)
          );
          // stroke(223, 228, 234);
          s.line(25 * s.cos(s.radians(this.angle)), 0, 0, 50);
          s.pop();
        }
        this.angle++;
        this.angle %= 360;
      };
    };

    this.canvas = new p5(sketch);
  }

  getTransition(colorA, colorB, steps) {
    let diference = colorB - colorA;
    return diference / steps;
  }
}
