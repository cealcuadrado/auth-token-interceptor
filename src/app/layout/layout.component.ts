import { LocalStorageService } from './../services/local-storage.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.authService.requestAuthToken().subscribe(obj => {
      this.localStorage.set('token', obj.request_token);
    });
  }
}
