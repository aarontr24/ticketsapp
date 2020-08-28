import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer2, NgZone, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  @ViewChild('divHeader') divHeader: ElementRef;
  @ViewChild('slide') slide: ElementRef;

  

  user: User;

  constructor(
    private renderer: Renderer2,
    public _userServices: UserService,
    public route: Router,
    private zone: NgZone
    ) { }

  innerHeight: any;

  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    this.user = this._userServices.user;
    const height = window.innerHeight * 7 / 8;
    setTimeout(() => {
      this.renderer.setStyle(this.divHeader.nativeElement, 'height', `${height}px`);
      this.renderer.setStyle(this.slide.nativeElement, 'height', `${height}px`);
    }, 0);
  }

  goRecharge() {
    this.zone.run(() =>
      this.route.navigate(['/points'])
    );
  }

  goLogin() {
    this.zone.run(() =>
      this.route.navigate(['/login'])
    );
  }


}
