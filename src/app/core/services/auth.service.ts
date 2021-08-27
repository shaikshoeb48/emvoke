import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareService } from '../../share.service';
import { NavigationExtras, Router } from '@angular/router';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { user } from '../models/user.model';
import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';
import { environment } from '../../../environments/environment';
import { SignupUtilitiesService } from './../../auth/sign-up/signup-utilities.service';
import { ClinicListComponent } from './../components/clinic-list/clinic-list.component';
import { Location } from '@angular/common';
// import { instantiateSupportedAnimationDriver } from '@angular/platform-browser/animations/src/providers';
import { promise } from 'protractor';
import { EmailConfirmComponent } from 'src/app/auth/email-confirm/email-confirm.component'
import { SecureStorageService } from './secure-storage.service';


@Injectable()
export class AuthService {
  logInStatus = new Subject();
  doctorStepperSub: Subject<any> = new Subject();
  navigationSignUpstepper = new Subject();

  serverUrl = `${environment.baseUrl}${environment.baseParameter}`;
  paymentUrl = `${environment.paymentUrl}`;
  imageData;
  currentRoleSubject: Subject<any> = new Subject()
  private authStateSubject: Subject<CognitoUser | any> = new Subject<CognitoUser | any>();
  authState: Observable<CognitoUser | any> = this.authStateSubject.asObservable();

  constructor(private router: Router, private loader: LoaderService, private http: HttpClient, private location: Location,
    private notification: NotificationService, private dialog: MatDialog, private signupservice: SignupUtilitiesService, private shareService: ShareService,
    private secureStorage: SecureStorageService) {

  }

  set loggedIn(value) {
    this.logInStatus.next(value);
  }

  /* AWS AMPLIFY API CALLS */

  clinicSignUp(userData): void {
    this.loader.show();
    Auth.signUp({
      username: userData.email,
      password: userData.password,
      attributes: {
        email: userData.email,
        name: userData.name,
        phone_number: userData.countryCode + '' + userData.phone_number,
        'custom:Roles': 'admin',

      }
    }).then((data) => {
      console.log('SignUp Success', data);
      if (data) {
        this.loader.hide();
        user.confirm.email = userData.email;
        user.confirm.password = userData.password;
        user.confirm.id = data.userSub;
        user.confirm.name = userData.clinicName;
        user.confirm.country_code = userData.countryCode;
        user.confirm.phone_number = userData.phone_number;
        /*   user.confirm.contact_details = {
             phone_type:'Mobile',
             country_code: userData.countryCode,
             phone_number= userData.phone_number
           } */

        //  this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
        //      const navigationExtras: NavigationExtras = {
        //   state: {
        //     stepId: 1
        //   }
        // };
        //  this.router.navigate(['auth/signup'],navigationExtras);
        //   });
        this.router.navigate(['auth/confirmcode']);
      }
    }).catch((error) => {
      console.log('SignUp Error', error);
      this.loader.hide();
      this.notification.show(error.message, 'Ok', 8000);
      if (error.message == 'An account with the given email already exists.') {
        user.confirm.email = userData.email;
        user.confirm.password = userData.password;
        user.confirm.name = userData.clinicName;
        user.confirm.country_code = userData.countryCode;
        user.confirm.phone_number = userData.phone_number;


        const dialogRef = this.dialog.open(EmailConfirmComponent, {
        });
        dialogRef.afterClosed().subscribe(result => {
          this.signIn(userData.email.toLowerCase(), userData.password)
        }, error => { console.log('Exception occured', error) });
      }

    });
  }

  doctorSignup(userData): void {
    this.loader.show();
    console.log(userData);
    Auth.signUp({
      username: userData.email,
      password: userData.password,
      attributes: {
        email: userData.email,
        name: userData.first_name,
        phone_number: '+' + userData.countryCode + '' + userData.phone_number,
        'custom:Roles': 'doctor'
      }
    }).then((data) => {
      console.log('Doctor SignUp Success', data);
      if (data) {
        localStorage.setItem('doctorId', data.userSub);
        const doctorObj = {
          _id: data.userSub,
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone_number: userData.phone_number,
          email: userData.email,
          services: [],
          contact_details: userData.contact_details,
          memberships: [],
          device_details: [],
          registration_details: [],
          social_handles: [],
          education_details: []
        };
        this.doctorCreate(doctorObj, 'create');
      }
    }).catch((error) => {
      switch (error.code) {
        case 'UsernameExistsException':
          this.doctorAsAdminExist(userData.email).subscribe((result) => {
            const rawData = atob(result.Data)
            if (rawData.length) {
              this.loader.hide();
              const parsedData = JSON.parse(rawData)
              const resultantId = parsedData.resultant_id
              localStorage.setItem('doctorId', resultantId);

              const doctorObj = {
                _id: resultantId,
                first_name: userData.first_name,
                last_name: userData.last_name,
                phone_number: userData.phone_number,
                email: userData.email,
                services: [],
                contact_details: userData.contact_details,
                memberships: [],
                device_details: [],
                registration_details: [],
                social_handles: [],
                education_details: []
              };
              this.doctorCreate(doctorObj, 'create');

            }
          },
            (err) => {
              //change this according to new MESSAGE
              console.log('Doctor SignUp Error.Please contact team@emvoke.com', error);
              this.loader.hide();
              this.notification.show(error.message, 'Ok', 8000);
            })

          break;
        default:
          console.log('Doctor SignUp Error', error);
          this.loader.hide();
          this.notification.show(error.message, 'Ok', 8000);
          break;
      }


      //call the backend api to get SUB of user if user already exist

    });
  }

  receptionSignup(userData): void {
    this.loader.show();
    if(userData.countryCode.indexOf('+') == -1){
      userData.countryCode = '+' + userData.countryCode;
    }
    Auth.signUp({
      username: userData.email,
      password: userData.password,
      attributes: {
        email: userData.email,
        name: userData.firstName,
        phone_number: userData.countryCode + userData.mobileNo,
        'custom:Roles': 'reception'
      }
    }).then((data) => {
      console.log('Reception SignUp Success', data);
      if (data) {
        localStorage.setItem('receptionId', data.userSub);
        const receptionObj = {
          _id: localStorage.getItem('clinicId'),
          reception: {
            reception_id: localStorage.getItem('receptionId'),
            email: userData.email
          }
        };
        this.receptionCreate(receptionObj, 'create');
      }
    }).catch((error) => {
      switch (error.code) {
        case 'UsernameExistsException':
          this.doctorAsAdminExist(userData.email).subscribe((result) => {
            if (result.Data) {
              const rawData = atob(result.Data)
              if (rawData.length) {
                this.loader.hide();
                const parsedData = JSON.parse(rawData)
                const resultantId = parsedData.resultant_id
                localStorage.setItem('receptionId', resultantId);
                const receptionObj = {
                  _id: localStorage.getItem('clinicId'),
                  reception: {
                    reception_id: localStorage.getItem('receptionId'),
                    email: userData.email
                  }
                };
                this.receptionCreate(receptionObj, 'create');
              }
            }
            else {
              this.loader.hide();
              this.doctorExist(userData.email).subscribe((doctorResult) => {
                if (doctorResult.Data) {
                  const rawData = atob(doctorResult.Data)
                  if (rawData.length) {
                    const parsedData = JSON.parse(rawData)
                    const resultantId = parsedData._id
                    localStorage.setItem('receptionId', resultantId);
                    const receptionObj = {
                      _id: localStorage.getItem('clinicId'),
                      reception: {
                        reception_id: localStorage.getItem('receptionId'),
                        email: userData.email
                      }
                    };
                    this.receptionCreate(receptionObj, 'create');
                  }
                }
                else {
                  this.loader.hide();
                  this.notification.show('Reception SignUp Error.Please contact team@emvoke.com', 'Ok', 8000);
                }
              })
            }

          },
            (err) => {

              //change this according to new MESSAGE
              console.log('Reception SignUp Error.Please contact team@emvoke.com', err);
              this.loader.hide();
              this.notification.show(err.message, 'Ok', 8000);
            })
          break;

        default:
          console.log('Reception SignUp Error', error);
          this.loader.hide();
          this.notification.show(error.message, 'Ok', 8000);
          break;
      }


    });
  }

  confirmSignUp(email: string, confirmCode: string): void {
    this.loader.show();
    Auth.confirmSignUp(email, confirmCode).then((data: any) => {
      console.log('ConfirmCode Success', data);
      if (data === 'SUCCESS' && user.confirm.email && user.confirm.password) {
        this.signIn(user.confirm.email, user.confirm.password, { type: 'onSignUp', id: user.confirm.id, name: user.confirm.name });
        //  this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
        //      const navigationExtras: NavigationExtras = {
        //   state: {
        //     stepId: 1
        //   }
        // };
        //  this.router.navigate(['auth/signup'],navigationExtras);
        //   });
        //this.signIn(user.confirm.email, user.confirm.password, { type: 'onSignUp', id: user.confirm.id, name: user.confirm.name });
      }
    }).catch((error: any) => {
      console.log('Confirm Code Error', error);
      this.loader.hide();
      this.notification.show(error.message, 'Ok', 8000);
    });
  }

  resendSignUp(email: string) {
    Auth.resendSignUp(email)
      .then(() => this.notification.show('A code has been messaged to you', 'Ok', 8000))
      .catch(() => this.notification.show('An error occurred', 'Ok', 8000));
  }

  getSubscriptionHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      'LIC-Customer-ID': environment.customerID,
      'LIC-Consumer-ID': localStorage.getItem('clinicId')
    });
  }

  async readSubscription(role) {
    let status = '';
    await this.http.get(`${this.paymentUrl}/subscription/read_subscription`, { headers: this.getSubscriptionHeader() }).toPromise().then((res: any) => {
      if (res.Data) {
        this.shareService.updateSubscriptionData(JSON.parse(atob(res.Data)));
        status = JSON.parse(atob(res.Data)).status;
      } else {
        this.shareService.updateSubscriptionData({status:'NOTACTIVE'});
        status = 'NOTACTIVE';
      }
    })
    if (role == 'doctor' || role == 'reception') {
      if (status == 'ACTIVE') {
        this.router.navigate(['queuemgmt'], { replaceUrl: true });
      }
      else {
        this.router.navigate(['payment-pending']);
      }
    }
    else if (role == 'admin') {
      if (status == 'ACTIVE') {
        this.router.navigate(['dashboard'], { replaceUrl: true });
      }
      else {
        this.router.navigate(['pricing']);
      }
    }
    return status;
  }

  async getSubscriptionDetails() {
    let data ;
    await this.http.get(`${this.paymentUrl}/subscription/read_subscription`, { headers: this.getSubscriptionHeader() }).toPromise().then((res: any) => {
      if (res.Data) {
        this.shareService.updateSubscriptionData(JSON.parse(atob(res.Data)));
        data = JSON.parse(atob(res.Data));
      } else {
        data =   {
          status:'NOTACTIVE'
        };
      }
    });
    return data;
  }

  signIn(eMail: string, password: string, signupParams?): void {
    this.loader.show();
    Auth.signIn(eMail, password)
      .then(async (userData: CognitoUser | any) => {
        console.log('SignIn Success', userData);
        this.setLoginCredentials(userData);
        //==================Changes for adding user permissions api===========================================
        if (signupParams && signupParams.type === 'onSignUp' && userData.attributes['custom:Roles'] === 'admin') {
          this.loader.hide();
          const navigationExtras: NavigationExtras = {
            state: {
              stepId: 1
            }
          };

          this.router.navigate(['/auth/signup'], navigationExtras);
        }
        else {
          this.getUserPermissions().subscribe((result) => {
            const rawData = atob(result.Data)
            if (rawData.length) {
              let userPermissions = JSON.parse(rawData)
              this.setUserClinic(userPermissions)
            }
          }, (err) => {
            this.loader.hide();
            const navigationExtras: NavigationExtras = {
              state: {
                stepId: 0
              }
            };
            if (this.router.url == "/auth/signin") {
              this.router.navigate(['/auth/signup'], navigationExtras);

            }
            else {
              this.navigationSignUpstepper.next(1);

            }

          })
        }
        //=============================old code=============================================
        /* this.loader.hide();
        const role = localStorage.getItem('roles');

        if (signupParams && signupParams.type === 'onSignUp' && role === 'admin') {
          const navigationExtras: NavigationExtras = {
            state: {
              stepId: 1
            }
          };
          this.router.navigate(['/auth/signup'], navigationExtras);
        } else if (userData.attributes['custom:Roles'] == 'admin') {
          const subs = this.readClinicDetails();
          if (subs) {
            (await subs).subscribe((data: any) => {
              if (data) {
                this.loggedIn = true;
                this.readSubscription(role);
                //this.router.navigate(['dashboard'], { replaceUrl: true });
              }
            }, (error) => {
              console.log("EEEE", error.statusText)
              if (error.statusText == "Not Found") {
                const navigationExtras: NavigationExtras = {
                  state: {
                    stepId: 1
                  }
                };
                this.router.navigate(['auth/signup'], navigationExtras);
              }
            });
          }

        } else if (role == 'reception') {
          //Backend call for ClinicID
          console.log(localStorage.getItem('receptionId'));
          const subs = this.readClinicDetailsForReception(this.getReceptionClinicHeader());
          if (subs) {
            (await subs).subscribe(data => {
              const rawClinicDetails = atob(data.Data);
              const parseClinicDetails = JSON.parse(rawClinicDetails);
              localStorage.setItem('clinicId', parseClinicDetails._id);
              this.readSubscription(role);
            }, error => console.log('ClinicID error', error));
            //Dialog box
            const dialogRef = this.dialog.open(ClinicListComponent, {
              width: '500px',
              data: {
                title: 'Please Enter Your Name',
                input: true,
                button: 'submit'
              }
            });
            dialogRef.afterClosed().subscribe(result => {
              this.loggedIn = true;
              console.log(result);
              localStorage.setItem('Recepname', result);
            }, error => console.log('reception signin error', error));
          }
        }
        else if (userData.attributes['custom:Roles'] == 'doctor') {
          const subs = this.readDoctorDetails(userData.attributes.sub);
          if (subs) {
            (await subs).subscribe(async data => {
              const docData = atob(data.Data);
              const doctor = JSON.parse(docData);
              if (doctor.clinic_info.length > 1) {
                const dialogRef = this.dialog.open(ClinicListComponent, {
                  width: '500px',
                  height: '600px',
                  data: {
                    title: 'Choose a Clinic',
                    clinicList: doctor.clinic_info
                  }
                });
                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    this.loggedIn = true;
                    localStorage.setItem('clinicId', result);
                    this.readSubscription(userData.attributes['custom:Roles']);
                    //this.router.navigate(['queuemgmt'], { replaceUrl: true });
                  }
                }, error => console.log('Clinic list dialog error', error));
              }
              else {
                localStorage.setItem('clinicId', doctor.clinic_info[0].clinic_id);
                this.readSubscription(userData.attributes['custom:Roles']);
                //this.router.navigate(['queuemgmt']);
                //this.router.navigate(['queuemgmt'], { replaceUrl: true });
              }

            }, error => console.log('clinic list error', error));
          }


        } */
      }).catch((error: any) => {
        console.log('SignInError', error);
        this.loader.hide();
        this.loggedIn = false;
        this.notification.show(error.message, 'Ok', 8000);
        switch (error.code) {
          case 'UserNotConfirmedException':
            user.confirm.email = eMail;
            user.confirm.password = password;
            // //this.router.navigate(['auth/signup']);
            // const navigationExtras: NavigationExtras = {
            //   state: {
            //     stepId: 1
            //   }
            // };
            // this.router.navigate(['auth/signup'],navigationExtras);
            this.router.navigate(['auth/confirmcode'])
            break;
          case 'UsernameExistsException':
            this.router.navigate(['auth/signin']);
            break;
        }
      });
  }

  setLoginCredentials(userData) {
    localStorage.setItem('token', userData.signInUserSession.idToken.jwtToken);
    localStorage.setItem('roles', userData.attributes['custom:Roles']);
    user.confirm.email = userData.attributes.email;
    user.confirm.name = userData.attributes.name;
    const role = userData.attributes['custom:Roles'];
    if (role === 'admin') {
      localStorage.setItem('clinicId', userData.attributes.sub);
    } else if (role === 'doctor') {
      localStorage.setItem('doctorName', userData.attributes.name);
      localStorage.setItem('doctorId', userData.attributes.sub);
    } else if (role === 'reception') {
      localStorage.setItem('receptionId', userData.attributes.sub);
    } else { }
  }

  signOut(): void {
    this.loader.show();
    Auth.signOut().then(() => {
      localStorage.clear();
      this.secureStorage.clear();
      console.log('Signout Success');
      this.router.navigate(['auth/signin']);
      this.loggedIn = false;
      this.loader.hide();
    }).catch((error: any) => {
      console.log('Signout Error', error);
      this.loggedIn = true;
      this.loader.hide();
      this.notification.show(error, 'Ok', 8000);
    });
  }

  forgotPassword(email: string): Promise<any> {
    return Auth.forgotPassword(email);
  }

  forgotPasswordSubmit(email: string, code: string, newPwd: string) {
    this.loader.show();
    Auth.forgotPasswordSubmit(email, code, newPwd)
      .then(data => {
        console.log('Forgot Password Submit Success', data);
        this.router.navigate(['auth/signin']);
        this.loader.hide();
      }).catch(err => {
        console.log('Forgot Password Submit Error', err);
        this.loader.hide();
        this.notification.show(err.message, 'Ok', 8000);
      });
  }

  /* Header Informations */
  getClinicHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp',
      'X-Reception-ID': localStorage.getItem('receptionId') ? localStorage.getItem('receptionId') : 'temp',
      Authorization: `Bearer ${token}`
    });
  }
  getReceptionClinicHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Reception-ID': localStorage.getItem('receptionId'),
      Authorization: `Bearer ${token}`
    });
  }


  getDoctorHeader(doctorId?: string) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : 'temp',
      'X-Doctor-ID': (doctorId) ? doctorId : localStorage.getItem('doctorId'),
      Authorization: `Bearer ${token}`
    });
  }


  /* Clinic API CALLS */

  async clinicCreate(clinicObj, signupType: string) {
    // console.log(clinicObj);
    var promise = new Promise<void>((resolve, reject) => {
      if (signupType === 'create') {
        const country_code = user.confirm.country_code;
        const phone_number = user.confirm.phone_number
        const phone_type = 'Mobile';
        clinicObj = Object.assign({}, clinicObj,
          {
            _id: localStorage.getItem('clinicId'),
            email: user.confirm.email,//user.confirm.email
            name: user.confirm.name,
            contact_details: [{ phone_type, country_code, phone_number }],
            licenses: [],
            holidays: [],
            timings: [],
            package: [],
            doctors: []
          });
        this.createClinic(clinicObj, this.getClinicHeader()).subscribe(
          clinicData => {
            // console.log("clinicData:"+clinicData);
            if (clinicData) {
              //call p/user here and set the values
              this.getUserPermissions().subscribe((result) => {
                const rawData = atob(result.Data)
                if (rawData.length) {
                  let userPermissions = JSON.parse(rawData)
                  this.setUserClinic(userPermissions)
                  resolve();
                  this.loader.hide();
                  this.router.navigate(['pricing']);
                }
              }, (err) => {
                this.router.navigate(['auth/signin']);

              })

              // this.router.navigate(['auth/doctorsignup']);
            }
          },
          error => console.log('Create clinic error', error)
        );
      } else {
        // patch & other logic
      }
    })
    return promise;
  }

  /* DOCTOR API CALLS */

  doctorCreate(doctorObj, signupType: string) {
    //  doctorObj['contact_details'] = [];
    if (signupType === 'create') {
      this.createDoctor(doctorObj, this.getDoctorHeader()).subscribe(
        doctorData => {
          if (doctorData) {
            this.linkDoctorClinic(this.getDoctorHeader()).subscribe(linkData => {
              if (linkData) {
                this.loader.hide();
                this.doctorStepperSub.next(1); // Move to next step
              }
            }, error => console.log('Link doctor-clinic error', error));
          }
        },
        error => console.log('Create doctor error', error)
      );
    } else if (signupType === 'update') {
      this.updateDoctor(doctorObj, this.getDoctorHeader()).subscribe(
        doctorData => {
          if (doctorData) {
            this.loader.hide();
            this.router.navigate(['']);
          }
        },
        error => console.log('update doctor error', error)
      );
    } else { }
  }

  linkDoctorWithClinic(doctorId) {
    this.linkDoctorClinic(this.getDoctorHeader(doctorId)).subscribe(linkData => {
      if (linkData) {
        this.loader.hide();
        this.shareService.updatedocterLink("linked")
      }
    }, error => console.log('link dcotor-with-clinic error', error));
  }

  doctorExist(email) {
    return this.checkDoctorExist({ "email": email }, this.getDoctorHeader('temp'));
  }

  /* RECEPTION API CALLS */
  receptionCreate(receptionObj, signupType: string) {
    if (signupType === 'create') {
      this.createReception(receptionObj, this.getClinicHeader()).subscribe(
        receptionData => {
          if (receptionData) {
            this.notification.show('Reception SignUp Success', 'Ok', 8000);
            this.loader.hide();
            this.dialog.closeAll();
            if(receptionObj._id == receptionObj.reception.reception_id){
              this.shareService.updatedocterLink("receptionLinked")
            }
          }
        },
        error => console.log('Create reception error', error)
      );
    } else if (signupType === 'update') {
      this.updateReception(receptionObj, this.getClinicHeader()).subscribe(results => {
        if (results) {
          this.loader.hide();
        }
      },
        error => console.log('update reception error', error));
    } else { }
  }

  /* Get Clinic Details */
  readClinicDetails() {
    // const status = await this.readSubscription();
    // if (status) {
    //   if (status == 'ACTIVE') {
    return this.getClinicDetails(this.getClinicHeader());
    //   } else if (status == 'PENDING') {
    //     this.router.navigate(['payment-pending']);
    //   } else {
    //     this.router.navigate(['pricing']);
    //   }
    // } else {
    //   this.router.navigate(['pricing']);
    // }
  }

  /* Get Doctor Details */
  readDoctorDetails(doctorId) {
    // const status = await this.readSubscription();
    // if (status) {
    //   if (status == 'ACTIVE') {
    return this.getDoctorDetails(this.getDoctorHeader(doctorId));
    //   } else if (status == 'PENDING') {
    //     this.router.navigate(['payment-pending']);
    //   } else {
    //     this.router.navigate(['pricing']);
    //   }
    // } else {
    //   this.router.navigate(['payment-pending']);
    // }
  }

  /* Get Reception Details */
  readReceptionDetails(receptionId) {
    return this.getReceptionDetails(this.getClinicHeader());
  }
  /* UI API's */
  getUi(header): Observable<any> {
    return this.http.get<Event>(`${environment.baseUrl}ui/read`, { headers: header })
  }
  /* Clinic API's */

  getClinicDetails(header): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/clinic/read`, { headers: header });
  }

  createClinic(data, header): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/clinic/create`, data, { headers: header });
  }

  updateClinic(data): Observable<any> {
    const role = localStorage.getItem('roles');
    const token = localStorage.getItem('token');
    let head = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      Authorization: `Bearer ${token}`
    });
    return this.http.patch<any>(`${this.serverUrl}/clinic/patch`, data, { headers: head });
  }

  /* Upload Clinic logo API */
  uploadClinicLogo(): Observable<any> {
    const role = localStorage.getItem('roles');
    const token = localStorage.getItem('token');
    let head;
    if (role === 'admin') {
      head = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Clinic-ID': localStorage.getItem('clinicId'),
        Authorization: `Bearer ${token}`
      });
    } else if (role === 'reception') {
      head = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Clinic-ID': localStorage.getItem('clinicId'),
        'X-Reception-ID': localStorage.getItem('receptionId'),
        Authorization: `Bearer ${token}`
      });
    }
    return this.http.post<any>(`${this.serverUrl}/clinic/upload-logo`, { "Data": this.imageData }, { headers: head });
  }

  /*upload dr profile logo */
  uploadDrImg() {
    const token = localStorage.getItem('token');
    let head = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.serverUrl}/doctor/upload-logo`, { "Data": this.imageData }, { headers: head });
  };



  /*get clinic logo based on role */

  /* getClinicLogo(): Observable<any> {
     const token = localStorage.getItem('token');
     const role = localStorage.getItem('roles');
     let head;

     if (role === 'admin') {
       head = new HttpHeaders({
         'Content-Type': 'application/json',
         'X-Clinic-ID': localStorage.getItem('clinicId'),
         Authorization: `Bearer ${token}`
       });
     } else if (role === 'reception') {
       head = new HttpHeaders({
         'Content-Type': 'application/json',
         'X-Clinic-ID': localStorage.getItem('clinicId'),
         'X-Reception-ID': localStorage.getItem('receptionId'),
         Authorization: `Bearer ${token}`
       });
     } else if (role === 'doctor') {
       head = new HttpHeaders({
         'Content-Type': 'application/json',
         'X-Clinic-ID': localStorage.getItem('clinicId'),
         'X-Doctor-ID': localStorage.getItem('doctorId'),
         Authorization: `Bearer ${token}`
       });
     }
     return this.http.get<any>(`${this.serverUrl}/clinic/logo`, { headers: head });
   }  */


  getReceptionHeaderLogo() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Reception-ID': localStorage.getItem('receptionId'),
      Authorization: `Bearer ${token}`
    });
  }

  getClinicLogo(header) {
    return this.http.get<any>(`${this.serverUrl}/clinic/logo`, { headers: header });
  }

  getDrLogo(): Observable<any> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('roles');
    let head
    if (role === 'doctor') {
      head = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Clinic-ID': localStorage.getItem('clinicId'),
        'X-Doctor-ID': localStorage.getItem('doctorId'),
        Authorization: `Bearer ${token}`
      });
    }
    return this.http.get<any>(`${this.serverUrl}/doctor/logo`, { headers: head });
  }



  /* Doctor API's */
  getDoctorDetails(header): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/doctor/read`, { headers: header });
  }
  checkDoctorExist(data, header): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/doctor/read-email`, data, { headers: header });
  }
  updateDoctor(data, header): Observable<any> {
    return this.http.patch<any>(`${this.serverUrl}/doctor/patch`, data, { headers: header });
  }
  createDoctor(data, header): Observable<string> {
    return this.http.post<string>(`${this.serverUrl}/doctor/create`, data, { headers: header });
  }

  /* Doctor-Clinic API's */
  linkDoctorClinic(header): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/doctor-clinic/link`, '', { headers: header });
  }
  unlinkDoctorClinic(header): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/doctor-clinic/unlink`, '', { headers: header });
  }
  activateDoctorClinic(header): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/doctor-clinic/activate`, '', { headers: header });
  }
  deactivateDoctorClinic(header): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/doctor-clinic/deactivate`, '', { headers: header });
  }
  updateDoctorClinic(data, header): Observable<any> {
    return this.http.patch<any>(`${this.serverUrl}/doctor-clinic/patch`, data, { headers: header });
  }

  /* Reception API's */
  getReceptionDetails(header): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/reception/read`, { headers: header });
  }
  updateReception(data, header): Observable<any> {
    return this.http.patch<any>(`${this.serverUrl}/reception/patch`, data, { headers: header });
  }
  createReception(data, header): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/reception/create`, data, { headers: header });
  }
  readClinicDetailsForReception(header) {
    // const status = await this.readSubscription();
    // if (status) {
    //   if (status == 'ACTIVE') {
    return this.http.get<any>(`${this.serverUrl}/reception/read-email`, { headers: header });
    //   } else if (status == 'PENDING') {
    //     this.router.navigate(['payment-pending']);
    //   } else {
    //     this.router.navigate(['pricing']);
    //   }
    // } else {
    //   this.router.navigate(['pricing']);
    // }
  }


  /* Function for role Guard */

  isAdmin(): boolean {
    let role = localStorage.getItem('roles');
    if (role === "admin") {
      return true;
    }
    else {
      return false;
    }
  }



  checkSubscription() {
    return new Promise<boolean>((resolve, reject) => {
      this.shareService.subscriptionData.subscribe(
        async (a) => {
          if (Object.keys(await a) != null) {
            if (Object.keys(a).length) {
              if (a.status == 'ACTIVE') {
                resolve(true);
                return true;
              }
              else {
                reject(false);
                return false;
              }
            }
            else {
              if (localStorage.getItem('clinicId')) {
                this.getSubscriptionDetails().then(
                  (b: any) => {
                    status = a.status;
                    if (a.status == 'ACTIVE') {
                      resolve(true);
                      return true;
                    }
                    else {
                      reject(false);
                      return false;
                    }
                  }
                )
              }
              else {
                reject(false);
                return false;
              }
            }
          }
          else {
            if (localStorage.getItem('clinicId')) {
              this.getSubscriptionDetails().then(
                (b: any) => {
                  status = a.status;
                  if (a.status == 'ACTIVE') {
                    resolve(true);
                    return true;
                  }
                  else {
                    reject(false);
                    return false;
                  }
                }
              )
            }
            else {
              reject(false);
              return false;
            }
          }
        }
      )
    })
  }

  //=================changes for admin as a doctor login ===========================

  doctorAsAdminExist(email) {
    return this.checkDoctorAsAdminExist({ "email": email }, this.doctorAsAdminExistHeader());
  }

  checkDoctorAsAdminExist(data, header): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/clinic/lookup`, data, { headers: header });
  }

  doctorAsAdminExistHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }


  getUserPermissions() {
    const token = localStorage.getItem('token');
    let header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.baseUrl}p/user`, { headers: header });
  }


  setUserClinic(userPermissions) {
    const clinicInfo = userPermissions.clinic_info;
    const userId = userPermissions.user_id;
    if(clinicInfo.length > 0){
    this.secureStorage.set('clinicInfo', JSON.stringify(clinicInfo))

    }
    this.secureStorage.set('userId', JSON.stringify(userId))

    this.loader.hide();
    let currentClinic;

    if (clinicInfo.length > 1) {
      const dialogRef = this.dialog.open(ClinicListComponent, {
        width: '500px',
        height: '600px',
        data: {
          title: 'Choose a Clinic',
          clinicList: clinicInfo
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.loggedIn = true;
          // localStorage.setItem('clinicId', result);
          this.loader.show();
          clinicInfo.forEach((clinic) => {
            if (clinic.clinic_id == result) {
              currentClinic = clinic
            }
          })
          this.setUserRole(currentClinic, userId)
        }
      },
        (error) => {
          console.log('Clinic list dialog error', error)
        });
    }
    else if (clinicInfo.length == 1){
      currentClinic = clinicInfo[0]
      this.setUserRole(currentClinic, userId)
    }
    else{

      this.router.navigate(['/noclinicfound']);    }

  }

  setUserRole(currentClinic, userId) {
    let currentRole;
    let clinicId = currentClinic.clinic_id;
    localStorage.setItem('clinicId', clinicId)
    let currentClinicAvailableRoles = currentClinic.clinic_roles
    // this.secureStorage.set('rolesAvailable', JSON.stringify(currentClinicAvailableRoles))
    if (currentClinicAvailableRoles.includes('admin')) {
      currentRole = 'admin'
    }
    else if (currentClinicAvailableRoles.includes('doctor')) {
      currentRole = 'doctor'
    }
    else {
      currentRole = 'reception'
    }
    localStorage.setItem('roles', currentRole)

    this.getUserData(currentRole, userId)

  }


  getUserData(currentRole, userId,switchRole?) {
    console.log(userId)
    if (currentRole == 'admin') {
      if(switchRole == 'switchUser'){
        this.currentRoleSubject.next("admin")

      }

      this.readClinicDetails().subscribe((result) => {
        const rawData = atob(result.Data)
        if (rawData.length) {
          const clinicData = JSON.parse(rawData)
          this.shareService.updateClinicData(clinicData)
          this.loggedIn = true;
          this.loader.hide();
          this.readSubscription(currentRole)
        }
      })
    }
    else if (currentRole == 'doctor') {
      let doctorId = userId.slice()
      localStorage.setItem('doctorId', doctorId);
      if(switchRole == 'switchUser'){
        this.currentRoleSubject.next("doctor")

      }
      this.readDoctorDetails(doctorId).subscribe((result) => {
        const rawData = atob(result.Data)
        if (rawData.length) {
          const doctorData = JSON.parse(rawData)
          console.log(doctorData)
          localStorage.setItem('doctorName', doctorData.first_name);
          this.loggedIn = true;
          this.loader.hide();
          this.readClinicDetails().subscribe((result) => {
            const rawData = atob(result.Data)
            if (rawData.length) {
              const clinicData = JSON.parse(rawData)
              this.shareService.updateClinicData(clinicData)
              // this.getUserData(currentRole,x)

                const docName = localStorage.getItem('doctorName');
                this.router.navigate(['/queuemgmt/doctor', docName]);

              this.readSubscription(currentRole)

            }
          },
            err => { console.log(err) })
          // this.readSubscription(currentRole)
        }
      })
    }
    else if (currentRole == 'reception') {
      const receptionId = userId.slice()
      localStorage.setItem('receptionId', receptionId)
      if(switchRole == 'switchUser'){
        this.currentRoleSubject.next("reception")

      }
      this.getReceptionDetails(this.getReceptionClinicHeader()).subscribe((result) => {
        const rawData = atob(result.Data)
        if (rawData.length) {
          const receptionData = JSON.parse(rawData)
          this.loader.hide();
          const dialogRef = this.dialog.open(ClinicListComponent, {
            width: '500px',
            data: {
              title: 'Please Enter Your Name',
              input: true,
              button: 'submit'
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            this.loggedIn = true;
            console.log(result);
            this.readSubscription(currentRole)

            localStorage.setItem('Recepname', result);
          }, error => console.log('reception signin error', error));
        }
      })
    }
  }


  switchUserRole(clinic, role) {
    //set new clininc,roles and call usergetdata

    let clinicId = clinic.clinic_id
    let currentRole = role
    let id = JSON.parse(this.secureStorage.get('userId'))
    localStorage.setItem('clinicId', clinicId)
    localStorage.setItem('roles', currentRole)
    // this.currentRoleSubject.next(currentRole)
    this.getUserData(currentRole, id,'switchUser')


  }

}

