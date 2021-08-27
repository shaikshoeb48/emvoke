import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class NotificationService {

  constructor(private toast: MatSnackBar , private toastr:  ToastrService) { }

  //  array:any;

  // show(message: string, buttonLabel: string = 'Ok', toastTimeout: number): MatSnackBarRef<any> {
  //   if (toastTimeout > 0) {
  //     return this.toast.open(message, buttonLabel, {
  //       // duration: toastTimeout,
  //       horizontalPosition: 'left',
  //       verticalPosition: 'bottom',
  //       panelClass: "success-dialog",
        
  //     });

  //   } else {
  //     return this.toast.open(message, buttonLabel, {
  //     });
  //   }
  // }
  // this.array.push(this.toast)
 /** 
 * @deprecated  show method will be removed in future code. Please use one of the below methods
 * show_warn()
 * show_error()
 * show_success()
  */
  show( title: string, message: string, timespan: number){
  
     this.toastr.info(title,'', {
       timeOut: timespan > 7000 ? timespan : 7000,
     })
  }
  /**
   * This method is used to show warning toast.
   * @param title title of warning
   * @param message message of warning
   * @param timespan time duration for warning
   */
  show_warn( title: string, message: string, timespan: number){
    
     this.toastr.warning(title,message, {
       timeOut: timespan,
     })
  }

    /**
   * This method is used to show error toast.
   * @param title title of error
   * @param message message of error
   * @param timespan time duration for error
   */
  show_error( title: string, message: string, timespan: number){
    
     this.toastr.error(title,message, {
       timeOut: timespan,
     })
  }

     /**
   * This method is used to show success toast.
   * @param title title of success
   * @param message message of success
   * @param timespan time duration for success
   */
  show_success( title: string, message: string, timespan: number){
    
     this.toastr.success(title,message, {
       timeOut: timespan,
     })
  }
  

}

