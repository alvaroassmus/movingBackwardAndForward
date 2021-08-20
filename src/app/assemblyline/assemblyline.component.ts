import {AfterContentInit, Component, Input} from "@angular/core";

@Component({
  selector: "assemblyline",
  templateUrl: "./assemblyline.component.html",
  styleUrls: ["./assemblyline.component.css"]
})
export class AssemblyLineComponent implements AfterContentInit {
  @Input() stages: string[] = [];
  stagesAndElements: Map<string, []> = new Map<string, []>();
  theItem: string = "";

  constructor() {
  }

  ngAfterContentInit() {
    this.stages.forEach(stage => {
      this.stagesAndElements.set(stage, []);
    });
  }

  addItem() {
    if (this.theItem !== "") {
      // @ts-ignore
      const nextId = this.stagesAndElements.get(this.stages[0]).length + new Date().getTime();
      const elemContent = {
        id: nextId,
        value: this.theItem
      };
      // @ts-ignore
      this.stagesAndElements.get(this.stages[0]).push(elemContent);
      this.theItem = "";
    }
  }

  moveStep(event: any, forward: boolean, index: number, element: {}) {
    event.preventDefault();
    // @ts-ignore
    let elementPosition = this.stagesAndElements.get(this.stages[index]).indexOf(element);
    // @ts-ignore
    const newStep = forward ? index + 1 : index - 1;
    if (newStep < this.stages.length && newStep >= 0) {
      this.excecuteMoveToNewtStep(newStep, elementPosition, element);
    }
    this.removeElementFromStep(index, elementPosition);
  }

  excecuteMoveToNewtStep(newStep: number, elementPosition: number, element: {}) {
    // @ts-ignore
    this.stagesAndElements.get(this.stages[newStep]).push(element);
  }

  removeElementFromStep(index: number, elementPosition: number) {
    if (elementPosition > -1) {
      // @ts-ignore
      this.stagesAndElements.get(this.stages[index]).splice(elementPosition, 1);
    }
  }
}
