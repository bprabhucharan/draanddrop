import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DragingStages } from 'src/models/dragingstages';
import { DriverDetails } from 'src/models/driver-details';
import { TruckStatus } from 'src/models/truck-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dragingStages: DragingStages[] = [];
  title = 'drag-and-drop';
  constructor(public dragulaService: DragulaService) {
    this.dragulaService.destroy("test1");
    
  }

  ngOnInit(): void {
    this.dragingStages = dragingStagesNew;
    this.loadCore();
  }

  public loadCore():void {
    this.dragulaService.createGroup("test1", {
      moves:(el, source: any,target: any, handle: any) => {
        return false;
      },
      // (handle.className.indexOf("draggable") > -1 && source.id !== target.id)
      accepts:(el, source: any,target: any, handle: any) => {
        return false;
      }
    });
    this.dragulaService.createGroup("innerDisplay", {
      moves:(el, source: any,target: any, handle: any) => {
        return true;
      }
      ,
      accepts:(el, source: any,target: any, handle: any) => {
        return (source.id !== target.id);
      }
    });
    this.dragulaService.drag("test1").subscribe(data => {});
    this.dragulaService.dragend("test1").subscribe(data => {});
    this.dragulaService.dropModel().subscribe(async (value: any): Promise<void> => {
      debugger;
      alert(JSON.stringify(value.item));
        if(value.name === "innerDisplay")  {
          value.item.drivingStageId = value.target.id;
          alert(JSON.stringify(value.item));
          //go and update in db API call goes here....
        } else {
          // alert("Displays")
        }
    });
  }
}

export const driversListOne: DriverDetails[] = [
  {
    truckId: 1,
    driverName: "ABC",
    drivingStageId: 1
  },
  {
    truckId: 2,
    driverName: "PQR",
    drivingStageId: 1
  },
  {
    truckId: 3,
    driverName: "XYZ",
    drivingStageId: 1
  }
];

export const driversListTwo: DriverDetails[] = [
  {
    truckId: 11,
    driverName: "AAA",
    drivingStageId: 2
  },
  {
    truckId: 12,
    driverName: "BBB",
    drivingStageId: 2
  },
  {
    truckId: 13,
    driverName: "CCC",
    drivingStageId: 2
  }
];

export const driversListThree: DriverDetails[] = [
  {
    truckId: 21,
    driverName: "III",
    drivingStageId: 3
  },
  {
    truckId: 22,
    driverName: "JJJ",
    drivingStageId: 3
  },
  {
    truckId: 23,
    driverName: "KKK",
    drivingStageId: 3
  }
];

export const dragingStagesNew: DragingStages[] = [
    {
      id: 1,
      statusId: TruckStatus.start,
      title: TruckStatus.start.toString(),
      driversList: driversListOne
    },
    {
      id: 2,
      statusId: TruckStatus.moving,
      title: TruckStatus.moving.toString(),
      driversList: driversListTwo
    },
    {
      id: 3,
      statusId: TruckStatus.rest,
      title: TruckStatus.rest.toString(),
      driversList: driversListThree
    }
];



