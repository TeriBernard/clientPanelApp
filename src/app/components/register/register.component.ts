import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.register(this.email, this.password)
      .then((res)=> {
        this.flashMessagesService.show('You are registered!', {
        cssClass: 'alert-success', timeout:10000 
        });
        this.router.navigate(['/']);
      })
      .catch((err)=> {
        this.flashMessagesService.show('Please register', {
          cssClass: 'alert-danger', timeout:10000 
          });
          this.router.navigate(['/register']);
      })
  }

}
