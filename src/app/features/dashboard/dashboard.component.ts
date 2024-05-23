import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../core/services/alertify/alertify.service';
import { CrudService, IListRequest } from '../../core/services/crud/crud.service';
import { CommonModule } from '@angular/common';
declare var $:any;
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  //Total Fine Dues
  controllerFineDue="Finedues";
  actionFineDue="finedue/statistics";
  fineDue!:number;
  //Total Fine Payments
  controllerFinePayment="FinePayments";
  actionFinePayment="finePaymentMoney-statistics";
  finePayment!:number;
  //Total Numbers
  controllerMember="Members";
  actionNumbers="general-number";
  memberCount!:number;
  //Total Books
  bookCount!:number;
  //Pie Chart
  pieChartList!:piechart;
  /**
   *
   */
  constructor(
    private alertify:AlertifyService,
    private crudService:CrudService,
  ) {
    
  }



  ngOnInit(): void {
    this.getTotalFineDue();
    this.getTotalFinePayment();
    this.getTotalNumbers();
  }
  getTotalFineDue(){
    this.crudService.getStatistics({
      controller:this.controllerFineDue,
      action:this.actionFineDue
    }).subscribe((data:any)=>{
      this.fineDue =data;
    });
  }
  getTotalFinePayment(){
    this.crudService.getStatistics({
      controller:this.controllerFinePayment,
      action:this.actionFinePayment
    }).subscribe((data:any)=>{
      this.finePayment =data;
    });
  }
  getTotalNumbers(){
    this.crudService.getStatistics<numberStatistic>({
      controller:this.controllerMember,
      action:this.actionNumbers
    }).subscribe((data:numberStatistic)=>{
      this.memberCount =data.numberOfMembers;
      this.bookCount = data.numberOfBooks;
      this.pieChartList={Books:data.numberOfBooks,Catalogs:data.numberOfCatalogs,Magazines:data.numberOfMagazines}
      const pieChartName:any=Object.keys(this.pieChartList);
      const pieChartValue:any=Object.values(this.pieChartList);
      console.log(pieChartName)
      console.log(pieChartValue)

      this.pieChart(pieChartName,pieChartValue);
    });
  }
  pieChart(dataName:string[],dataValue:number[]){
    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: [dataName[0],dataName[1],dataName[2]],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                ],
                data: [dataValue[0],dataValue[1],dataValue[2]]
            }]
        },
        options: {
            responsive: true
        }
    });
    return myChart5;
  }
}
export interface numberStatistic{
  numberOfBooks:number,
  numberOfMagazines:number,
  numberOfMembers:number,
  numberOfLibraryStaff:number,
  numberOfCatalogs:number
}
export interface piechart{
  Magazines:number,
  Catalogs:number,
  Books:number
}