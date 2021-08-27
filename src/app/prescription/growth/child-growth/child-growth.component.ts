import { Component, OnInit } from '@angular/core';

import { GrowthService } from '../growth.service' ;
import { PrescriptionService } from '../../prescription.service' ;
import { DatePipe } from '@angular/common' ;

@Component({
  selector: 'app-child-growth',
  templateUrl: './child-growth.component.html',
  styleUrls: ['./child-growth.component.scss']
})
export class ChildGrowthComponent implements OnInit {

  constructor(private datepipe: DatePipe, private growthService: GrowthService, private prescriptionService: PrescriptionService) { }

  public weightChart ;
  public heightChart ;
  public bmiChart ;
  public ofcChart ;

  ageUnit = 'months' ;

  chartConfig = {
    modeBarButtonsToRemove: ['pan2d','select2d','lasso2d','resetScale2d', 'zoom2d', 'autoScale2d', 'hoverCompareCartesian', 'hoverClosestCartesian' ,'toggleSpikelines','editInChartStudio' ],
    displaylogo : false
  }

  org = ['anganwadi', 'who', 'fenton'] ;

  showChartMap = {
    'anganwadi' : {
      weight : true , height : true, bmi : false, ofc : false
    },
    'who' : {
      weight : true , height : true, bmi : true, ofc : true
    },
    'fenton' : {
      weight : true , height : true, bmi : false, ofc : true
    }
  }

  growthData = {dob: null, gender : null, appointments : []} ;
  patientData ;
  curveData = {
    age : [] ,    // IN MONTHS
    ageWeeks : [],  // AGE IN WEEKS
    weight : [],  // IN KGS 
    height : [],  // IN CMS
    bmi : [] ,    // IN KG/M2 
    ofc : [] ,     // IN CMS
    appointment_date : []   // STRING OF DATES
  } ;

  selectedGender = "male" ;
  selectedOrg = "anganwadi" ;

  weightPercentile = {
    male : {
      anganwadi : [
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [2.1, 2.9, 3.8, 4.4, 4.9, 5.3, 5.7, 5.9, 6.2, 6.4, 6.6, 6.8, 6.9, 7.1, 7.2, 7.4, 7.5, 7.7, 7.8, 8,8.1, 8.2, 8.4, 8.5, 8.6],
            type: 'scatter', 
            fill: 'tozeroy',
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [2.5, 3.4, 4.3, 5, 5.6, 6, 6.4, 6.7, 6.9, 7.1, 7.4, 7.6, 7.7, 7.9, 8.1, 8.3, 8.4, 8.6, 8.8, 8.9, 9.1, 9.2, 9.4, 9.5, 9.7], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name: 'P2'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [3.3, 4.5, 5.6, 6.4, 7, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6, 9.9, 10.1, 10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.8, 12, 12.2], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name : 'P3'
        }, 
      ],
      who : [
         {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [2.5, 3.4, 4.4, 5.1, 5.6, 6.1, 6.4, 6.7, 7, 7.2, 7.5, 7.6, 7.8, 8, 8.2, 8.4, 8.5, 8.7, 8.9, 9, 9.2, 9.3, 9.5, 9.7, 9.8],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [2.9, 3.9, 4.9, 5.6, 6.2, 6.7, 7.1, 7.4, 7.7, 7.9, 8.2, 8.4, 8.6, 8.8, 9, 9.2, 9.4, 9.6, 9.7, 9.9, 10.1, 10.3, 10.5, 10.6, 10.8],
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'orange'},
            name: 'P15'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [3.3, 4.5, 5.6, 6.4, 7, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6, 9.9, 10.1, 10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.8, 12, 12.2],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'yellow'},
            name: 'P50'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [3.9, 5.1, 6.3, 7.2, 7.9, 8.4, 8.9, 9.3, 9.6, 10, 10.3, 10.5, 10.8, 11.1, 11.3, 11.6, 11.8, 12, 12.3, 12.5, 12.7, 13, 13.2, 13.4, 13.7],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'aqua'},
            name: 'P85'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [4.6, 6, 7.4, 8.3, 9.1, 9.7, 10.2, 10.7, 11.1, 11.4, 11.8, 12.1, 12.4, 12.7, 13, 13.3, 13.6, 13.9, 14.2, 14.4, 14.7, 15, 15.3, 15.6, 15.9],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'MediumSeaGreen'},
            name: 'P99'
          }
      ],
      fenton : [
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [0.41, 0.45, 0.48, 0.51, 0.54, 0.57, 0.63, 0.71, 0.82, 0.99, 1.16, 1.35, 1.55, 1.79, 2, 2.24, 2.48, 2.66, 2.81, 2.89, 2.95],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [0.44, 0.5, 0.54, 0.6, 0.66, 0.71, 0.79, 0.89, 1.03, 1.22, 1.41, 1.63, 1.83, 2.07, 2.29, 2.52, 2.75, 2.92, 3.05, 3.15, 3.24], 
            type: 'scatter' ,
            mode: 'lines+points',
            name: 'P10'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [0.64, 0.73, 0.84, 0.96, 1.1, 1.26, 1.43, 1.62, 1.83, 2.05, 2.30, 2.59, 2.84, 3.12, 3.39, 3.66, 3.87, 4.03, 4.18, 4.31, 4.5], 
            type: 'scatter' ,
            mode: 'lines+points',
            name : 'P90'
        }
      ]
    },
    female : {
       anganwadi : [
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [2, 2.7, 3.4, 4, 4.4, 4.8, 5.1, 5.3, 5.6, 5.8, 5.9, 6.1, 6.3, 6.4, 6.6, 6.7, 6.9, 7, 7.2, 7.3, 7.5, 7.6, 7.8, 7.9, 8.1],  
            type: 'scatter', 
            fill: 'tozeroy',
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [2.4, 3.2, 3.9, 4.5, 5.0, 5.4, 5.7, 6, 6.3, 6.5, 6.7, 6.9, 7, 7.2, 7.4, 7.6, 7.7, 7.9, 8.1, 8.2, 8.4, 8.6, 8.7, 8.9, 9], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name: 'P2'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.9, 11.1,11.3, 11.5], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name : 'P3'
        }, 
      ],
      who : [
         {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [2.4, 3.2, 4, 4.6, 5.1, 5.5, 5.8, 6.1, 6.3, 6.6, 6.8, 7,7.1, 7.3, 7.5, 7.7, 7.8, 8, 8.2, 8.3, 8.5, 8.7, 8.8, 9, 9.2],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [2.8, 3.6, 4.5, 5.1, 5.6, 6.1, 6.4, 6.7, 7, 7.3, 7.5, 7.7, 7.9, 8.1, 8.3, 8.5, 8.7, 8.8, 9,9.2, 9.4, 9.6, 9.8, 9.9, 10.1],
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'orange'},
            name: 'P15'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6,7.9, 8.2, 8.5, 8.7, 8.9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.9, 11.1, 11.3, 11.5],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'yellow'},
            name: 'P50'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [3.7, 4.8, 5.9, 6.7, 7.3, 7.8, 8.3, 8.7, 9, 9.3, 9.6, 9.9, 10.2, 10.4, 10.7, 10.9, 11.2, 11.4, 11.6, 11.9, 12.1, 12.4, 12.6, 12.8, 13.1],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'aqua'},
            name: 'P85'
          },
           {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [4.4, 5.7, 6.9, 7.8, 8.6, 9.2, 9.7, 10.2, 10.6, 11, 11.3, 11.7, 12, 12.3, 12.6, 12.9, 13.2, 13.5, 13.8, 14.1, 14.4, 14.6, 14.9, 15.2, 15.5],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'MediumSeaGreen'},
            name: 'P99'
          }
      ],
      fenton : [
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [0.39, 0.42, 0.45, 0.47, 0.5, 0.55, 0.59, 0.67, 0.78, 0.91, 1.08, 1.27, 1.45, 1.7, 1.91, 2.14, 2.38, 2.56, 2.7, 2.77, 2.86],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [0.42, 0.47, 0.51, 0.56, 0.61, 0.67, 0.73, 0.84, 0.97, 1.12, 1.33, 1.52, 1.75, 1.99, 2.19, 2.41, 2.63, 2.8, 2.93, 3, 3.15], 
            type: 'scatter' ,
            mode: 'lines+points',
            name: 'P10'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [0.61, 0.7, 0.78, 0.9, 1, 1.18, 1.35, 1.53, 1.74, 1.97, 2.21, 2.48, 2.76, 3, 3.29, 3.53, 3.73, 3.87, 4.01, 4.13, 4.33], 
            type: 'scatter' ,
            mode: 'lines+points',
            name : 'P90'
        }
      ]
    }
  };

   heightPercentile = {
    male : {
      anganwadi : [
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [44.2, 48.9, 52.4, 55.3, 57.6, 59.6, 61.2, 62.7, 64, 65.2, 66.4, 67.6, 68.6, 69.6, 70.6, 71.6, 72.5, 73.3, 74.2, 75, 75.8, 76.5, 77.2, 78, 78.7],
            type: 'scatter', 
            fill: 'tozeroy',
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [46.1, 50.8, 54.4, 57.3, 59.7, 61.7, 63.3, 64.8, 66.2, 67.5, 68.7, 69.9, 71, 72.1, 73.1, 74.1, 75, 76, 76.9, 77.7, 78.6, 79.4, 80.2, 81, 81.7], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name: 'P2'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72, 73.3, 74.5, 75.7, 76.9, 78, 79.1, 80.2, 81.2, 82.3, 83.2, 84.2, 85.1, 86, 86.9, 87.8], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name : 'P3'
        }, 
      ],
      who : [
         {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [46.3, 51.1, 54.7, 57.6, 60, 61.9, 63.6, 65.1, 66.5, 67.7, 69, 70.2, 71.3, 72.4, 73.4, 74.4, 75.4, 76.3, 77.2, 78.1, 78.9, 79.7, 80.5, 81.3, 82.1],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [47.9, 52.7, 56.4, 59.3, 61.7, 63.7, 65.4, 66.9, 68.3, 69.6, 70.9, 72.1, 73.3, 74.4, 75.5, 76.5, 77.5, 78.5, 79.5, 80.4, 81.3, 82.2, 83, 83.8, 84.6],
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'orange'},
            name: 'P15'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72, 73.3, 74.5, 75.7, 76.9, 78, 79.1, 80.2, 81.2, 82.3, 83.2, 84.2, 85.1, 86, 86.9, 87.8],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'yellow'},
            name: 'P50'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [51.8, 56.7, 60.5, 63.5, 66, 68.1, 69.8, 71.4, 72.9, 74.3, 75.6, 77, 78.2, 79.4, 80.6, 81.8, 82.9, 84, 85.1, 86.1, 87.1, 88.1, 89.1, 90, 91],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'aqua'},
            name: 'P85'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [54.3, 59.3, 63.1, 66.2, 68.7, 70.8, 72.6, 74.2, 75.7, 77.2, 78.6, 80, 81.3, 82.6, 83.8, 85, 86.2, 87.4, 88.5, 89.7, 90.7, 91.8, 92.9, 93.9, 94.9],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'MediumSeaGreen'},
            name: 'P99'
          }
      ],
      fenton : [
        { 
            x: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [27, 28, 29, 30.5, 32, 33, 34.5, 36, 37, 38.5, 40, 41, 42.5, 44, 45, 46, 47, 48, 49],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
        },
        { 
            x: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [28.5, 30, 31, 32, 33.5, 35, 36, 37.5, 39, 40, 41.5, 43, 44, 45, 46, 47, 48, 49.5, 50.3], 
            type: 'scatter' ,
            mode: 'lines+points',
            name: 'P10'
        },
        { 
            x: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35 ,36, 37, 38, 39, 40, 41, 42], 
            y: [33.5, 35, 36.5, 38, 40, 41, 42, 44, 45, 46.5, 48, 49, 50.3, 51.5, 52.5, 53, 54, 55, 56], 
            type: 'scatter' ,
            mode: 'lines+points',
            name : 'P90'
        }
      ]
    },
    female : {
       anganwadi : [
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [43.6, 47.8, 51, 53.5, 55.6, 57.4, 58.9, 60.3, 61.7, 62.9, 64.1, 65.2, 66.3, 67.3, 68.3, 69.3, 70.2, 71.1, 72, 72.8, 73.7, 74.5, 75.2, 76, 76.7],  
            type: 'scatter', 
            fill: 'tozeroy',
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [45.4, 49.8, 53, 55.6, 57.8, 59.6, 61.2, 62.7, 64, 65.3, 66.5, 67.7, 68.9, 70, 71, 72, 73, 74, 74.9, 75.8, 76.7, 77.5, 78.4, 79.2, 80], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name: 'P2'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [49.1, 53.7, 57.1, 59.8, 62.1, 64, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74, 75.2, 76.4, 77.5, 78.6, 79.7, 80.7, 81.7, 82.7, 83.7, 84.6, 85.5, 86.4], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name : 'P3'
        }, 
      ],
      who : [
         {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [45.6, 50, 53.2, 55.8, 58, 59.9, 61.5, 62.9, 64.3, 65.6, 66.8, 68, 69.2, 70.3, 71.3, 72.4, 73.3, 74.3, 75.2, 76.2, 77, 77.9, 78.7, 79.6, 80.3],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [47.2, 51.7, 55, 57.6, 59.8, 61.7, 63.4, 64.9, 66.3, 67.6, 68.9, 70.2, 71.3, 72.5, 73.6, 74.7, 75.7, 76.7, 77.7, 78.7, 79.6, 80.5, 81.4, 82.2, 83.1],
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'orange'},
            name: 'P15'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [49.1, 53.7, 57.1, 59.8, 62.1, 64, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74, 75.2, 76.4, 77.5, 78.6, 79.7, 80.7, 81.7, 82.7, 83.7, 84.6, 85.5, 86.4],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'yellow'},
            name: 'P50'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [51.1, 55.7, 59.2, 62, 64.3, 66.3, 68.1, 69.7, 71.2, 72.6, 74, 75.4, 76.7, 77.9, 79.2, 80.3, 81.5, 82.6, 83.7, 84.8, 85.8, 86.8, 87.8, 88.8, 89.8],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'aqua'},
            name: 'P85'
          },
           {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [53.5, 58.2, 61.8, 64.7, 67.1, 69.2, 71, 72.7, 74.3, 75.8, 77.2, 78.6, 80, 81.3, 82.6, 83.9, 85.1, 86.3, 87.5, 88.6, 89.7, 90.8, 91.9, 92.9, 93.9],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'MediumSeaGreen'},
            name: 'P99'
          }
      ],
      fenton : [
        { 
            x: [ 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [26.9, 28, 29, 30, 31, 32.4, 33.7, 35, 36.4, 37.8, 39, 40.2, 41.7, 43, 44, 45, 46, 47, 48 ],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
        },
        { 
            x: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [28, 29, 30, 31.5, 32.7, 34, 35, 36.5, 38, 39, 40.5, 42, 43, 44.5, 45.5, 46.7, 47.6, 48.5, 49.5], 
            type: 'scatter' ,
            mode: 'lines+points',
            name: 'P10'
        },
        { 
            x: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [33, 34, 35.5, 37, 38.5, 40, 42, 43, 44.8, 46, 47, 48.7, 50, 51, 51.8, 52.5, 53.2, 54, 55], 
            type: 'scatter' ,
            mode: 'lines+points',
            name : 'P90'
        }
      ]
    }
  };

   bmiPercentile = {
    male : {
      anganwadi : [
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [10, 12, 13, 15, 16, 17, 18, 20,22, 25],
            type: 'scatter', 
            fill: 'tozeroy',
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [13, 15, 17, 19, 20, 22, 24, 25,28, 29], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name: 'P2'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [16, 18, 21, 22, 25, 26, 27, 28,30, 31], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name : 'P3'
        }, 
      ],
      who : [
         {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [11.3, 12.6, 13.8, 14.4, 14.7, 14.8, 14.9, 14.9, 14.9, 14.8, 14.7, 14.6, 14.5, 14.4, 14.3, 14.2, 14.2, 14.1, 14, 13.9, 13.9, 13.8, 13.8, 13.7, 13.7],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [12.2, 13.6, 14.9, 15.5, 15.7, 15.9, 15.9, 15.9, 15.9, 15.8, 15.7, 15.6, 15.5, 15.4, 15.3, 15.2, 15.1, 15, 14.9, 14.8, 14.8, 14.7, 14.6, 14.6, 14.5],
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'orange'},
            name: 'P15'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [13.4, 14.9, 16.3, 16.9, 17.2, 17.3, 17.3, 17.3, 17.3, 17.2, 17, 16.9, 16.8, 16.7, 16.6, 16.4, 16.3, 16.2, 16.1, 16.1, 16, 15.9, 15.8, 15.8, 15.7],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'yellow'},
            name: 'P50'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [14.8, 16.4, 17.8, 18.5, 18.7, 18.9, 18.9, 18.9, 18.8, 18.7, 18.6, 18.4, 18.3, 18.1, 18, 17.9, 17.8, 17.6, 17.5, 17.4, 17.4, 17.3, 17.2, 17.1, 17.1],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'aqua'},
            name: 'P85'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [16.9, 18.3, 19.9, 20.6, 20.9, 21, 21.1, 21.1, 21, 20.8, 20.7, 20.5, 20.4, 20.2, 20.1, 19.9, 19.8, 19.7, 19.6, 19.5, 19.4, 19.3, 19.2, 19.1, 19.1],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'MediumSeaGreen'},
            name: 'P99'
          }
      ],
      fenton : [
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [7, 8, 9, 11, 13, 14, 16, 18, 20, 21],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [9, 10, 11, 12, 14, 16, 17, 19,21, 23], 
            type: 'scatter' ,
            mode: 'lines+points',
            name: 'P2'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [11, 13, 14, 16, 18, 19, 20, 22,24, 26], 
            type: 'scatter' ,
            mode: 'lines+points',
            name : 'P3'
        }
      ]
    },
    female : {
       anganwadi : [
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [8, 10, 12, 14, 16, 17, 18, 20,21, 24],  
            type: 'scatter', 
            fill: 'tozeroy',
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [12, 14, 16, 18, 20, 21, 23, 25,27, 29], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name: 'P2'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [15, 17, 20, 22, 24, 26, 27, 28,30, 31], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name : 'P3'
        }, 
      ],
      who : [
         {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [11.2, 12.1, 13.2, 13.7, 14, 14.2, 14.3, 14.3, 14.3, 14.2, 14.1, 14, 13.9, 13.8, 13.7, 13.7, 13.6, 13.5, 13.4, 13.4, 13.3, 13.3, 13.3, 13.2, 13.2],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [12.1, 13.2, 14.3, 14.9, 15.2, 15.3, 15.4, 15.4, 15.4, 15.3, 15.2, 15.1, 15, 14.8, 14.7, 14.6, 14.6, 14.5, 14.4, 14.3, 14.3, 14.2, 14.2, 14.2, 14.1],
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'orange'},
            name: 'P15'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [13.3, 14.6, 15.8, 16.4, 16.7, 16.8, 16.9, 16.9, 16.8, 16.7, 16.6, 16.5, 16.4, 16.2, 16.1, 16, 15.9, 15.8, 15.7, 15.7, 15.6, 15.5, 15.5, 15.4, 15.4],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'yellow'},
            name: 'P50'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [14.7, 16.1, 17.4, 18, 18.3, 18.5, 18.6, 18.6, 18.5, 18.4, 18.2, 18.1, 17.9, 17.8, 17.7, 17.5, 17.4, 17.3, 17.2, 17.2, 17.1, 17, 17, 16.9, 16.9],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'aqua'},
            name: 'P85'
          },
           {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [16.6, 18, 19.5, 20.3, 20.6, 20.8, 20.9, 20.9, 20.8, 20.7, 20.6, 20.4, 20.2, 20.1, 19.9, 19.8, 19.7, 19.5, 19.4, 19.3, 19.3, 19.2, 19.1, 19.1, 19],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'MediumSeaGreen'},
            name: 'P99'
          }
      ],
      fenton : [
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [7, 8, 9, 11, 12, 14, 15, 17, 19, 21],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [9, 10, 11, 12, 13, 15, 17, 18 , 21, 22], 
            type: 'scatter' ,
            mode: 'lines+points',
            name: 'P2'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [10, 12, 14, 16, 18, 19, 20, 21,24, 25], 
            type: 'scatter' ,
            mode: 'lines+points',
            name : 'P3'
        }
      ]
    }
  };


  ofcPercentile = {
    male : {
      anganwadi : [
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [10, 12, 13, 15, 16, 17, 18, 20,22, 25],
            type: 'scatter', 
            fill: 'tozeroy',
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [13, 15, 17, 19, 20, 22, 24, 25,28, 29], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name: 'P2'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [16, 18, 21, 22, 25, 26, 27, 28,30, 31], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name : 'P3'
        }, 
      ],
      who : [
         {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [32.1, 35.1, 36.9, 38.3, 39.4, 40.3, 41, 41.7, 42.2, 42.6, 43, 43.4, 43.6, 43.9, 44.1, 44.3, 44.5, 44.7, 44.9, 45, 45.2, 45.3, 45.4, 45.6, 45.7],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [33.1, 36.1, 37.9, 39.3, 40.4, 41.3, 42.1, 42.7, 43.2, 43.7, 44.1, 44.4, 44.7, 45, 45.2, 45.5, 45.6, 45.8, 46, 46.2, 46.3, 46.4, 46.6, 46.7, 46.8],
            type: 'scatter', 
            marker: {color: 'orange'},
            mode: 'lines+points', 
            name: 'P15'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [34.5, 37.3, 39.1, 40.5, 41.6, 42.6, 43.3, 44, 44.5, 45, 45.4, 45.8, 46.1, 46.3, 46.6, 46.8, 47, 47.2, 47.4, 47.5, 47.7, 47.8, 48, 48.1, 48.3],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'yellow'},
            name: 'P50'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [35.8, 38.5, 40.3, 41.7, 42.9, 43.8, 44.6, 45.3, 45.8, 46.3, 46.7, 47.1, 47.4, 47.7, 47.9, 48.2, 48.4, 48.6, 48.7, 48.9, 49.1, 49.2, 49.4, 49.5, 49.7],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'aqua'},
            name: 'P85'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [37.4, 40, 41.9, 43.3, 44.4, 45.4, 46.2, 46.8, 47.4, 47.9, 48.4, 48.7, 49.1, 49.3, 49.6, 49.8, 50.1, 50.3, 50.5, 50.6, 50.8, 51, 51.1, 51.3, 51.4],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'MediumSeaGreen'},
            name: 'P99'
          }
      ],
      fenton : [
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [19.5, 20.2, 21, 22, 23, 24, 25, 25.9, 26.8, 27.5, 28.2, 29, 30, 30.5, 31, 32, 32.4, 33, 33.5],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [20, 21, 22, 23, 24, 25, 25.8, 26.7, 27.5, 28.2, 29.1, 30, 30.8, 31.5, 32.1, 32.7, 33.1, 33.9, 34.5], 
            type: 'scatter' ,
            mode: 'lines+points',
            name: 'P10'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [23.4, 24.5, 25.4, 26.4, 27.3, 28.4, 29.5, 30.2, 31.1, 32, 33, 34.8, 35.2, 36, 36.5, 37, 37.5, 38], 
            type: 'scatter' ,
            mode: 'lines+points',
            name : 'P90'
        }
      ]
    },
    female : {
       anganwadi : [
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [8, 10, 12, 14, 16, 17, 18, 20,21, 24],  
            type: 'scatter', 
            fill: 'tozeroy',
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [12, 14, 16, 18, 20, 21, 23, 25,27, 29], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name: 'P2'
        },
        { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [15, 17, 20, 22, 24, 26, 27, 28,30, 31], 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name : 'P3'
        }, 
      ],
      who : [
         {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [31.7, 34.3, 36, 37.2, 38.2, 39, 39.7, 40.4, 40.9, 41.3, 41.7, 42, 42.3, 42.6, 42.9, 43.1, 43.3, 43.5, 43.6, 43.8, 44, 44.1, 44.3, 44.4, 44.6],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [32.7, 35.3, 37, 38.2, 39.3, 40.1, 40.8, 41.5, 42, 42.4, 42.8, 43.2, 43.5, 43.8, 44, 44.2, 44.4, 44.6, 44.8, 45, 45.1, 45.3, 45.4, 45.6, 45.7],
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'orange'},
            name: 'P15'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [33.9, 36.5, 38.3, 39.5, 40.6, 41.5, 42.2, 42.8, 43.4, 43.8, 44.2, 44.6, 44.9, 45.2, 45.4, 45.7, 45.9, 46.1, 46.2, 46.4, 46.6, 46.7, 46.9, 47, 47.2],  
            type: 'scatter', 
            mode: 'lines+points',
            marker: {color: 'yellow'}, 
            name: 'P50'
          },
          {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [35.1, 37.8, 39.5, 40.8, 41.9, 42.8, 43.5, 44.2, 44.7, 45.2, 45.6, 46, 46.3, 46.6, 46.8, 47.1, 47.3, 47.5, 47.7, 47.8, 48, 48.2, 48.3, 48.5, 48.6],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'aqua'},
            name: 'P85'
          },
           {
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: [36.6, 39.3, 41.1, 42.4, 43.5, 44.5, 45.2, 45.9, 46.5, 46.9, 47.4, 47.7, 48.1, 48.3, 48.6, 48.8, 49.1, 49.3, 49.5, 49.6, 49.8, 50, 50.1, 50.3, 50.4],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'MediumSeaGreen'},
            name: 'P99'
          }
      ],
      fenton : [
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [19, 20, 21, 21.5, 22.5, 23.5, 24, 25, 26, 27, 28, 29, 29.5, 30.2, 31, 31.5, 32, 32.6, 33.1],  
            type: 'scatter', 
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P3'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
            y: [20, 20.6, 21.5, 22.4, 23.3, 24.1, 25, 26, 27, 28, 28.8, 29.6, 30.2, 31, 31.8, 32.5, 33, 33.5, 34], 
            type: 'scatter' ,
            mode: 'lines+points',
            name: 'P10'
        },
        { 
            x: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 
            y: [23, 24, 25, 26, 27, 28, 28.9, 29.9, 30.8, 31.6, 32.5, 33.5, 34.1, 34.9, 35.3, 36, 36.5, 37, 37.4], 
            type: 'scatter' ,
            mode: 'lines+points',
            name : 'P90'
        }
      ]
    }
  };

  ngOnInit() {
    this.growthService.getChildGrowthData().subscribe(result => {
      const rawData = result.Data ;
      let growthData = [];
      if(rawData){
        growthData = JSON.parse(atob(rawData)) ;

        console.log(growthData) ;

        for(let data of growthData){
          let appObj = {} ;
          let weightConvertedVal = data.weight ? this.convertUnit(data.weight.value, data.weight.unit, 'kg') : null ;
          let heightConvertedVal = data.height ? this.convertUnit(data.height.value, data.height.unit, 'cm') : null ;
          let ofcConvertedVal = data.ofc ? this.convertUnit(data.ofc.value, data.ofc.unit, 'cm') : null ;
          this.curveData.appointment_date.push(this.datepipe.transform(data.appointment_date, 'dd-MMM-yyyy')) ;

          appObj = {
           weight : weightConvertedVal,
           height : heightConvertedVal,
           ofc : ofcConvertedVal,
           date : new Date(data.appointment_date) 
          };

          this.growthData.appointments.push(appObj) ;
        }
        console.log(this.growthData) ;
        this.prescriptionService.patientDataVal.subscribe(patientData => {
          this.growthData.dob = new Date(patientData.date_of_birth) ;
          this.growthData.gender = patientData.gender == 'm' ? 'male' : 'female' ;
          this.createCurveDataPoints() ;
          this.updateCharts() ;
        });
      }
    });
  }

  convertUnit(value, curUnit, nextUnit){
    if(curUnit == nextUnit)
      return value ;

    else if(curUnit == 'm' && nextUnit == 'cm'){
      return value * 100 ;
    }

    else if(curUnit == 'ft' && nextUnit == 'cm'){
      return value * 30.48 ;
    }

    else if(curUnit == 'g' && nextUnit == 'kg'){
      return value / 1000 ;
    }

    else if(curUnit == 'lbs' && nextUnit == 'kg'){
      return value * 0.454 ;
    }

    return value ;
  }

  onDropDown(gender, org){
    this.selectedGender = gender ;
    this.selectedOrg = org ;

    if(org == 'fenton'){
      this.ageUnit = 'weeks' ;
    }
    else{
      this.ageUnit = 'months' ;
    }

    this.updateCharts() ;
  }

  showChart(chartName){
    return this.showChartMap[this.selectedOrg][chartName] ;
  }

  updateCharts(){
    this.weightChart = {
       data: [...this.weightPercentile[this.selectedGender][this.selectedOrg], 
          {
            x : this.selectedOrg == 'fenton' ? this.curveData.ageWeeks : this.curveData.age ,
            y : this.curveData.weight,
            type : 'scatter',
            marker: {color: 'blue'},
            name : 'curve',
            hovertext : this.curveData.appointment_date,
            line : {
              width : 3
           }
         }
       ],

      layout: { title: 'Weight Vs Age', 
       xaxis : { title : {text : `Age(${this.ageUnit})` }} ,
       yaxis : { title :  { text : "Weight(kgs)" } }
     }
   };

     this.heightChart = {
       data: [...this.heightPercentile[this.selectedGender][this.selectedOrg],
            {
              x : this.selectedOrg == 'fenton' ? this.curveData.ageWeeks : this.curveData.age ,
              y : this.curveData.height,
              type : 'scatter',
              marker: {color: 'blue'},
              line : {
                width : 3
              },
              hovertext : this.curveData.appointment_date,
              name : 'curve'
            }
        ],

        layout: { title: 'Height Vs Age',
         xaxis : { title : {text : `Age(${this.ageUnit})` }} ,
         yaxis : { title :  { text : "Height(cm)" } }
       }
    };

    // BMI VS AGE
    this.bmiChart = {
        data: [...this.bmiPercentile[this.selectedGender][this.selectedOrg],
            {
              x : this.selectedOrg == 'fenton' ? this.curveData.ageWeeks : this.curveData.age ,
              y : this.curveData.bmi,
              type : 'scatter',
              marker: {color: 'blue'},
              hovertext : this.curveData.appointment_date,
              name : 'curve',
              line : {
                width : 3
              },
            }
        ],

        layout: { title: 'BMI Vs Age', 
         xaxis : { title : {text : `Age(${this.ageUnit})` }} ,
         yaxis : { title :  { text : "BMI(kg/Msq)" } }
       }
    };

    // OFC VS AGE
    this.ofcChart = {
        data: [...this.ofcPercentile[this.selectedGender][this.selectedOrg],
            {
              x : this.selectedOrg == 'fenton' ? this.curveData.ageWeeks : this.curveData.age ,
              y : this.curveData.ofc,
              hovertext : this.curveData.appointment_date,
              type : 'scatter',
              marker: {color: 'blue'},
              name : 'curve',
              line : {
                width : 3
              },
            }
        ],

        layout: { title: 'OFC Vs Age', 
         xaxis : { title : {text : `Age(${this.ageUnit})` }} ,
         yaxis : { title :  { text : "OFC(cm)" } }
       }
    };

  }


  createCurveDataPoints(){
    const dateList = [] ;
    for(let value of this.growthData.appointments){
      this.curveData.weight.push(value.weight) ;
      this.curveData.height.push(value.height) ;
      this.curveData.ofc.push(value.ofc) ;
      dateList.push(value.date) ;

      const bmi = (value.weight) / ((value.height * value.height) / (100 * 100))  ;
      this.curveData.bmi.push(bmi) ;
    }
    this.createAgeList(dateList, 'month') ;
    this.createAgeList(dateList, 'week') ;
  }

  createAgeList(dateList, type){
    const dob = this.growthData.dob ;
    // const dobYear = dob.getYear() ;
    // const dobMonth = dob.getMonth() ;
    // const dobDate = dob.getDate() ;
    const minWeek = 22   // FOR FENTON

    if(type == 'month'){
      for(let value of dateList){
        // const yearDiff = value.getYear() - dobYear ;
        // const monthDiff = value.getMonth() - dobMonth ;
        let dateDiff ;

        // if(yearDiff == 0 && monthDiff == 0){
        //   dateDiff = (value.getDate() - dobDate) > 15 ? 1 : 0 ;
        // }
        // else{
        //  dateDiff = this.findDateDiff(dobDate, value.getDate()) ;
        // }

        dateDiff = this.findDateDiff(dob, value) ;
        const monthsCount = Math.round(dateDiff / 30) ;
        this.curveData.age.push(monthsCount) ;
      }
      console.log(this.curveData.age);

    }
    else if(type == 'week'){
      for(let value of dateList){
        // const yearDiff = value.getYear() - dobYear ;
        // const monthDiff = value.getMonth() - dobMonth ;
        // const dayDiff = value.getDate() - dobDate ;
        let dateDiff ;

        dateDiff = this.findDateDiff(dob, value) ;

        const weekCounts = Math.round(dateDiff / 7) ; 
        if(weekCounts >= minWeek)
          this.curveData.ageWeeks.push(weekCounts) ;
      }
      console.log(this.curveData.ageWeeks);
    }
  }

  findDateDiff(start, end){
    const totalMilliSec = end.getTime() - start.getTime() ;
    const totalDays = (totalMilliSec / (1000 * 3600 * 24)) ;

    return totalDays ;
  }

  // findDateDiff(start, end){
  //   const startDays = 31 - start ;
  //   const endDays = end ;

  //   let ans ;

  //   if(startDays + endDays < 15){
  //     return - 1
  //   }
  //   else if(startDays + endDays >= 15 && startDays + endDays < 45){
  //     return 0 ;
  //   }
  //   else{
  //     return 1 ;
  //   }
  // }


}





/* [
          { 
            x: [0,1, 2, 3, 4, 5, 6, 7, 8 ,9, 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            y: ,  
            type: 'scatter', 
            fill: 'tozeroy',
            mode: 'lines+points', 
            marker: {color: 'red'},
            name: 'P1'
          },
          { 
            x: [1, 2,3, 4, 5, 6, 7, 8 , 9, 10], 
            y: , 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name: 'P2'
          },
          { 
            x: [1, 2, 3, 4, 5, 6, 7, 8 , 9, 10], 
            y: , 
            type: 'scatter' ,
            fill : 'tonexty',
            mode: 'lines+points',
            name : 'P3'
          },
          {
            x : this.curveData.age ,
            y : this.curveData.weight,
            type : 'scatter',
            marker: {color: 'blue'},
            name : 'curve',
            line : {
              width : 3
            },
          }
      ]

      */