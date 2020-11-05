
import { Component, OnInit } from '@angular/core';
import {Circle, Point, Line} from "./shapes";
import {SnapCircle, SnapLine} from "./Snappers";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App';
  line : SnapLine;
  canvas : any
  ngOnInit() {
    this.canvas = Snap("#canvas");
    let circle = new Circle(10,50,50);  
    let snapcircle = new SnapCircle(circle, this.canvas);
    snapcircle.render();
    snapcircle.ActiveDragable();
  }    
}
