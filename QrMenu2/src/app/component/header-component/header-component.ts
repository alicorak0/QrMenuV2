  import { Component } from '@angular/core';
  import { AfterViewInit } from '@angular/core';
  import Swiper from 'swiper';
  import { FreeMode } from 'swiper/modules';
  import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
  import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
  import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // ← ekle
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Product } from '../../models/productModel';
import { ProductService } from '../../services/product-service';

import { SignalService } from '../../services/signal-service';


  @Component({
    selector: 'app-header-component',
    imports: [FontAwesomeModule,RouterModule,CommonModule],
    templateUrl: './header-component.html',
    styleUrl: './header-component.css',
  })
  export class HeaderComponent    {
     
   
isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }




  }
