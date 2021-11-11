import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: NbAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout('google');
  }

}
