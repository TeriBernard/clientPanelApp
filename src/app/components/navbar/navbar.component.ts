import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private settingsService: SettingsService
  ) { }

  ngOnInit( ) {
    //check to see if current user is logged in
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    })

    // find out if registration is allowed from Settings
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onClickLogout(){
    this.authService.logout();
    this.flashMessagesService.show('You are now logged out', {cssClass:'alert-success', timeout:5000});
    this.router.navigate(['/login']);
  }
}
