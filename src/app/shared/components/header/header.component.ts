import {Component, Inject, OnInit} from '@angular/core';

import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie';

import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  selectedLanguage: string;
  progressBarMode: string;
  currentUrl: string;
  languages: any[];
  href: string;

  constructor(private cookieService: CookieService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
    this.languages = [
      {name: 'en', label: 'English'},
      {name: 'vi', label: 'Vietnam'}
    ];
    this.href = window.location.href;
  }

  ngOnInit() {
    console.log(this.href);
    this.selectedLanguage = this.cookieService.get('language') || 'vi';

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log('currentUrl', this.currentUrl);
      }
    });

    if (this.href === 'http://localhost:4000' || this.href === 'http://localhost:4000/') {
      window.open(this.href + this.selectedLanguage + '/', '_self');
    }
    //console.log('activeRouter', this.activatedRoute.url)
  }

  changeLanguage(language: string): void {
    this.cookieService.put('language', language);
    this.selectedLanguage = language;
  }
}
