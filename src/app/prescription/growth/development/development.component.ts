import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms' ;
import { NotificationService } from '../../../core/services/notification.service' ;

@Component({
    selector: 'app-development',
    templateUrl: './development.component.html',
    styleUrls: ['./development.component.scss']
})
export class DevelopmentComponent implements OnInit {

    developmentForm: FormGroup ;
    curStatusFilter = -1 ;
    @ViewChild('closeButton') closeButton ;
    monthErr = false ;

    color1 = 'rgba(213,58,53,1)' ;
    color2 = 'rgba(122,113,254,1)' ;

    chartConfig = {
        modeBarButtonsToRemove: ['pan2d','select2d','lasso2d','resetScale2d', 'zoom2d', 'autoScale2d', 'hoverCompareCartesian', 'hoverClosestCartesian' ,'toggleSpikelines','editInChartStudio' ],
        displaylogo : false
    }

    layout = {
      barmode: 'stack',
      showlegend: false,
      width : 1300,
      height : 700,
      xaxis : {
        title : { text : 'Months'}
      }
    };
    labels = [
        {startX: 0, endX: 2, text: 'Social Smile', status : 0},
        {startX: 1, endX: 3, text: 'Eyes Follow Pen', status : 0},
        {startX: 1, endX: 3.7, text: 'Hold Head', status : 0},
        {startX: 2.5, endX: 4.8, text: 'Rolls (Back-Stomach)', status : 0},
        {startX: 3, endX: 5.8, text: 'Turns head on Sound', status : 0},
        {startX: 4, endX: 7, text: 'Transafer Object', status : 0},
        {startX: 5.8, endX: 11, text: 'Raises to sit', status : 0},
        {startX: 6.2, endX: 11, text: 'Stand by Support', status : 0},
        {startX: 6.5, endX: 11, text: 'Fine Prehension Pellet', status : 0},
        {startX: 6.7, endX: 12.9, text: 'Pat a Cake', status : 0},
        {startX: 7.8, endX: 13, text: 'Walks with Help', status : 0},
        {startX: 9.3, endX: 17, text: 'Throws ball', status : 0},
        {startX: 10, endX: 17.2, text: 'Walk Alone', status : 0},
        {startX: 11.1, endX: 19, text: 'Stays Alone', status : 1},
        {startX: 11.1, endX: 19.5, text: 'Walks Backward', status : 0},
        {startX: 12, endX: 24.6, text: 'Walk Upstairs with Help', status : 1},
        {startX: 15, endX: 24.5, text: 'Points To Parts (3 Parts)', status : 0},
        {startX: 21, endX: 25, text: 'Remove Garments', status : 0},
        {startX: 24, endX: 27, text: 'Uses Some Words', status : 0},
        {startX: 26, endX: 29, text: 'Jump in Place', status : 0},
        {startX: 27, endX: 30, text: 'Diffrentiate b/w Big & Small', status : 0},
        {startX: 26, endX: 31, text: 'Points to 7 Objects', status : 0},
        {startX: 23, endX: 32, text: 'Brushes Teeth with Help', status : 0},
        {startX: 30, endX: 33, text: 'Diffrentiate b/w genders', status : 0},
        {startX: 23, endX: 35, text: 'Answer 1 Query Partially understandable', status : 0},
        {startX: 33, endX: 36, text: 'Place Object IN OUT UNDER as Instruction', status : 0},
        {startX: 30, endX: 36, text: 'Ask Simple Question', status : 0}
    ];

    y = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27] ;

    trace1 = {
      x: [],
      y: [] ,
      orientation: 'h',
      hoverinfo : 'none',
      marker: {
        color: 'rgba(55,128,191,0)'
      },
      type: 'bar'
    };

    trace2 = {
      x: [],
      y : [],
      text : [],
      textposition : 'inside',
      insidetextanchor : 'middle', 
      orientation: 'h',
      type: 'bar',
      hoverinfo : 'none',
      textfont: {
        family: 'sans serif',
        size: 22,
        color: '#fff'
      },
      marker: {
        color: []
      }
    };

    data = [this.trace1, this.trace2];

    constructor(private notification: NotificationService) { }

    ngOnInit() {
        this.createGraph(false) ;
        this.developmentForm = new FormGroup({
            value : new FormControl('', Validators.required),
            startMonth : new FormControl('', Validators.required),
            endMonth : new FormControl('', Validators.required),
            status : new FormControl('0', Validators.required)
        });
    }

    addDevelopment(){

        console.log(this.developmentForm) ;
        this.monthErr = false ;

        const start = this.developmentForm.value.startMonth ;
        const end = this.developmentForm.value.endMonth ;
        const text = this.developmentForm.value.value ;
        const status = this.developmentForm.value.status ;

        if(end <= start){
            this.notification.show("End Month can't be equal & less that start Month", '', 3000) ;
            this.monthErr = true ;
            return ;
        }

        this.y.push(this.y.length+1) ;
        this.labels.push({
            startX : start,
            endX : end ,
            status : status,
            text : text
        });

        this.developmentForm.reset() ;
        this.createGraph(false) ;
        this.monthErr = false ;
        this.closeButton.nativeElement.click() ;
    }

    filterDevelopment(basedOn){

    }

    statusFilter(status){

        if(this.curStatusFilter == status){
            this.createGraph(true) ;
            this.curStatusFilter = -1 ;
            return ;
        }

        this.curStatusFilter = status ;
        this.createGraph(true) ;
        let count = 1 ;
        let color ;
        if(status == 0){
            color = this.color1 ;
        }
        else{
            color = this.color2 ;
        }
        let invisibleColor = 'rgba(213,58,53,0)' ;

        let newTrace1 = [] ;
        let newTrace2 = [] ;
        let text = [];
        let colors = [] ;
        let y = [] ;

        let index = 0 ;

        for(let dev of this.trace2.marker.color){
            if(dev != color){
                // newTrace1.push(this.trace1.x[index]) ;
                // newTrace2.push(this.trace2.x[index]) ;
                colors.push(this.trace2.marker.color[index]) ;
                // text.push(this.trace2.text[index]) ;
                // y.push(count) ;
                // count++ ;
            }
            else{
                colors.push(invisibleColor) ;
            }
            index++ ;
        }
        
        // this.trace1.x = [...newTrace1] ;
        // this.trace2.x = [...newTrace2] ;

        // this.trace1.y = [...y] ;
        // this.trace2.y = [...y] ;

        // this.trace2.text = [...text] ;
        this.trace2.marker.color = [...colors] ;

    }

    onChartClick(event){
        console.log(event) ;
        const index = event.points[0].label - 1 ;

        const status = this.labels[index].status ;

        if(status == 0){
            this.labels[index].status = 1 ;
            this.trace2.marker.color[index] = this.color2 ;
        }
        else{
            this.labels[index].status = 0 ;
            this.trace2.marker.color[index] = this.color1 ;
        }
        this.trace2.y = [...this.y] ;
        // this.data = [{...this.trace1}, {...this.trace2}] ;
    }

    createGraph(isSorted){
        let xStart = [] ;
        let xEnd=  [] ;
        let color = [] ;
        let text = [] ;

        if(!isSorted){
            this.labels.sort((a,b) => {
                if(a.endX != b.endX){
                    return a.endX - b.endX ;
                }
                else{
                    return a.startX - b.startX ;
                }
            });
        }

        for(let val of this.labels){
            xStart.push(val.startX) ;
            xEnd.push(val.endX - val.startX) ;   // THE DIFFERENCE BETWEEN THE RANGE

            if(val.status == 0){
                color.push(this.color1) ;
            }
            else{
                color.push(this.color2) ;
            }

            text.push(`<b>${val.text.toUpperCase()}</b>`) ;
        }

        this.trace1.x = [...xStart] ;
        this.trace1.y = [...this.y] ;

        this.trace2.x = [...xEnd] ;
        this.trace2.y = [...this.y] ;

        this.trace2.text = [...text] ;
        this.trace2.marker.color = [...color] ;

        // this.data = [this.trace1, this.trace2] ;
    }

}