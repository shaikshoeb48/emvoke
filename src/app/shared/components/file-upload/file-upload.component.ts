import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ShareService } from 'src/app/share.service'
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ProfileComponent } from 'src/app/layout/profile/profile.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  files: any = [];
  file;
  selectedFile: File = null;
  compFile;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  testImg;
  uploadedLogo;
  title: string;
  button: string;
  isButton: boolean;
  input: boolean;
  bottomTitle = '';
  profileLogo;
  tempProfileLogo;



  constructor(private auth: AuthService, private share: ShareService, private imageCompress: NgxImageCompressService, private _snackBar: MatSnackBar) {
   }

  ngOnInit() {
    this.getLogo();
  }

  getLogo() {
    const role = localStorage.getItem('roles');
    if (role === 'doctor') {
      this.share.DrImageData.subscribe((logo) => {
        this.profileLogo = logo.data;
        this.tempProfileLogo = logo.data;
      });
    } else if (role === 'admin' || role === 'reception') {
      this.share.clinicData.subscribe((a) => {
        if (a.logo) {
          this.share.imageDataSh.subscribe((logo) => {
            this.profileLogo = logo.data;
            this.tempProfileLogo = logo.data;
            //   console.log("yes got prof it is clinic")
          })
        }
      })
    } else {
      this.profileLogo = "";
    }
  }

  uploadFile(eventData, event) {
    if (event[0]) {
      const file: File = event[0];
      var pattern = /image-*/;

      if (!file.type.match(pattern)) {
        console.log("invalid format");
        this._snackBar.open('invalid format ', 'Ok', {
          duration: 2000,
        });
        return;
      }
    }

    if (event[0].size < 4948848) {
      for (let index = 0; index < event.length; index++) {

        const element = event[index];
        this.files.push(element.name);
        this.file = this.files[0]
      }
      this.selectedFile = <File>eventData.target.files[0];
      console.log(this.uploadedLogo)
      let reader = new FileReader();

      reader.readAsDataURL(this.selectedFile);
      let data;
      reader.onload = async () => {
        data = reader.result;
        console.log("came")
        this.uploadedLogo = reader.result;
        this.profileLogo = reader.result;
       // this.profile.enableUpload = true; 
        if (this.selectedFile.size > 1024 * 1024) {
          let _data = await this.compressFile(data);
          console.log("file compressed");
          console.log("image encoded");
          console.log(_data);
          this.auth.imageData = _data;
        }
        else {
          this.auth.imageData = data;
          console.log("file is not compressed")
        }
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

    } else {
      this._snackBar.open('Size is greater than 5mb ', 'Ok', {
        duration: 2000,
      });
      console.log("size is greater")
    }


  }
  async compressFile(image) {
    var orientation = -1;
    let imageData = await this.imageCompress.compressFile(image, orientation, 70, 70).then(
      result => {
        var fileName: any;
        fileName = image['name'];
        const imageBlob = this.dataURItoBlob(result.split(',')[1]);
        const imageName = fileName;
        const imageFile = new File([result], imageName);
        //  console.log(result);
        //  console.log(image);
        return result;
      });
    return imageData;
  };
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  deleteAttachment() {
    this.files.splice(0, 1);
    this.profileLogo = this.tempProfileLogo;
    this.auth.imageData = "";
    this.file = ""
  //  this.profile.enableUpload = false;
   // return this.profileLogo;
  }
}

/*
  uploadFile(eventData,event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
    }
    this.selectedFile = <File>eventData.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    let data;
    reader.onload = ()=> {
      data = reader.result;
     // console.log(data);
     console.log(data);
     this.auth.imageData = data;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };


  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }
} */

/*
  uploadFile(eventData, event) {
    for (let index = 0; index < event.length; index++) {

      const element = event[index];
      this.files.push(element.name);
    }
    this.selectedFile = <File>eventData.target.files[0];

    let reader = new FileReader();


    reader.readAsDataURL(this.selectedFile);
    let data;
    reader.onload = async () => {
      data = reader.result;
      let _data = await this.compressFile(data);
      console.log("file compressed");
      console.log("image encoded");
      console.log(_data);
      this.auth.imageData = _data;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };


  }
  async compressFile(image) {
    var orientation = -1;
    let imageData = await this.imageCompress.compressFile(image, orientation, 60, 60).then(
      result => {
        var fileName: any;
        fileName = image['name'];
        const imageBlob = this.dataURItoBlob(result.split(',')[1]);
        const imageName = fileName;
        const imageFile = new File([result], imageName);
      //  console.log(result);
      //  console.log(image);
        return result;
      });
      return imageData;
  };
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);

  }
*/
