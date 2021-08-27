import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import * as $ from 'jquery';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from './sidebar.service';
import { ShareService } from 'src/app/share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {

  userName: null;
  menuItems: {} = [];
  clinicLogo;
  currentRole;
  currentRoleSubscription:Subscription = Subscription.EMPTY;
  constructor(private mScrollbarService: MalihuScrollbarService, private authService: AuthService,
    private sidebarService: SidebarService, private amplify: AmplifyService, private share: ShareService) {
    this.getSideMenusList();


    /*  this.amplify.authStateChange$
        .subscribe(authState => {
          console.log("CHECKING", authState)
          if(authState && authState.state == 'signedOut'){
            this.userName = null;
          }else if(authState && !authState.user && !authState.user.attributes) {
            this.userName = null;
          } else if(!this.userName){
            this.userName = authState.user.attributes.name;
          }
        }); */
  }

  //get clinic logo
  /* test(){
    this.authService.getClinicLogo().subscribe(data => {
      console.log(data);
      data = this.share.imageDataSh;

    })
  }  */

  getClinicLogoImg() {
    this.authService.getClinicLogo(this.authService.getClinicHeader()).subscribe(data => {
      if (data) {
        this.clinicLogo = data.data
        this.share.updateImageData(data);
        console.log(data)
      }

    },
    error => {
      this.share.updateImageData('')
      this.clinicLogo = ''

    })


    // this.share.clinicData.subscribe((a) => {
    //   if (a.logo) {
    //     this.authService.getClinicLogo(this.authService.getClinicHeader()).subscribe(data => {
    //       if (data) {
    //         this.share.updateImageData(data);

    //       }

    //     },
    //     error => this.share.updateImageData(''))
    //   }
    //   this.share.imageDataSh.subscribe((logo) => {
    //     this.clinicLogo = logo.data;
    //   //  console.log(this.clinicLogo);
    //   })
    // })


    //  this.share.imageDataSh.subscribe((a)=>{
    //  console.log(a);
    //this.clinicLogo = a.data;
    //console.log(this.clinicLogo)
    //  })
  }


  getSideMenusList(): void {
    //this.menuItems = this.sidebarService.getMenuItems();
    this.sidebarService.getMenuItems().subscribe(data => {
      //console.log(data);
      //this.menuItems = JSON.parse(data);
      //console.log("MENUITEM", data.menuItems)
      this.menuItems = data.menuItems
    });
  }

  anchorClicked(event: MouseEvent): void {
    const target = (event.currentTarget as Element).id;
    const $li = $('#' + target.replace('chevron', 'li')).parent();
    if ($li.is('.active')) {
      $li.removeClass('active active-sm');
      $('ul:first', $li).slideUp(10,function () { });
      // $('ul:first li', $li).slideUp(150,function () {
      // });
    } else {
      // prevent closing menu if we are on child menu
      if (!$li.parent().is('.child_menu')) {
        $('#sidebar-menu')
          .find('li')
          .removeClass('active active-sm');
        $('#sidebar-menu')
          .find('li ul')
          .slideUp(10);
        // if($('#sidebar-menu').find('li ul li').is(":visible")){
        // $('#sidebar-menu')
        // .find('li ul li')
        // .slideUp(180);
        // }

      }
      $li.addClass('active');
      $('ul:first', $li).slideDown(10,function () {
        // if($('ul:first li', $li).is(":hidden")){
        //   $('ul:first li', $li).slideDown(150,function () {

        //   });
        // }

      });
    }
  }

  ngOnInit() {
    this.getClinicName();
    this.getClinicLogoImg();
    this.currentRole = localStorage.getItem('roles')
    this.currentRoleSubscription = this.authService.currentRoleSubject.subscribe((data) =>{
        this.currentRole = data
        this.getSideMenusList()
        this.getClinicLogoImg()
    })
  }

  signOut() {
    this.authService.signOut();
  }

  ngAfterViewInit() {
    this.mScrollbarService.initScrollbar('#sideMenu', { axis: 'y', theme: 'minimal', scrollButtons: { enable: false } });
  }

  ngOnDestroy() {
    this.mScrollbarService.destroy('#sideMenu');
    this.currentRoleSubscription.unsubscribe()
  }


  getClinicName() {
    this.share.clinicData.subscribe((a) => {

      this.userName = a.name
    })
  }


}
