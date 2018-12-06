import { Component, Output, EventEmitter, HostListener, Inject  } from '@angular/core';
import { ClickOutsideDirective } from './../directives/click-outside.directive';
import { IStoreProduct } from '../interfaces/storeproduct';
import { Router } from '@angular/router';
import { ShareDataService } from '../service/share-data.service';
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "../utils/window.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public fixed: boolean = false; 
  clicked: boolean = false;
  clickedOutsideNav: boolean = true;
  addToCartItems: IStoreProduct[] = [];
  cartLength: number = 0;
  subTotal: number = 0;
  mobileNavSubMenu = false;
  mobileNavCategorySubMenu = false;
  mobileNavCategoryView = false;
  mobileNavAccountView = false;
  mobileCanvasHeaderName = "";

  categoryBR = false;
  categoryRR = false;
  categorySR = false;
  categoryTR = false;
  categoryBBR = false;

  @Output() offCanvasClickEvent = new EventEmitter<boolean>();

  constructor(private router: Router, private shareDataService: ShareDataService, @Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number > 30) {
      this.fixed = true;
    } else if (this.fixed && number < 10) {
      this.fixed = false;
    }
  }

  ngOnInit() {
    this.shareDataService.addToCartItems.asObservable().subscribe((data) => {
      this.addToCartItems = data;
      this.cartLength = this.addToCartItems.length;
      this.subTotal = 0;
      for (var i = 0; i < this.addToCartItems.length; i++) {
        this.subTotal = this.subTotal + this.addToCartItems[i].productPrice;
      }
    });
  }
  disableCategorySection() {
    this.categoryBR = false;
    this.categoryRR = false;
    this.categorySR = false;
    this.categoryTR = false;
    this.categoryBBR = false;
  }

  showMobileMenu() {
    this.clicked = !this.clicked;
    this.offCanvasClickEvent.emit(this.clicked);
  }

  clickOutside() {
    this.clickedOutsideNav = !this.clickedOutsideNav;
    if (this.clicked && !this.clickedOutsideNav) {
      this.clickedOutsideNav = false;
      this.clicked = false;
      this.offCanvasClickEvent.emit(this.clicked);
    } else {
      this.clickedOutsideNav = true;
    }

  }


  onShopClick = function () {
    this.router.navigateByUrl('/shop');
  };

  gotoLoginRegPage = function () {
    this.router.navigateByUrl('/login');
  };



  onClickViewCart() {
    this.router.navigateByUrl('/view-cart');
  }

  onClickCheckout() {
    this.router.navigateByUrl('/checkout');
  }

  onMobileNavClickFunction(val) {
    this.mobileNavCategoryView = false;
    this.mobileNavAccountView = false;
    if (val === "category") {
      this.mobileNavCategoryView = true;
      this.mobileNavSubMenu = true;
      this.mobileCanvasHeaderName = "Categories";
    } else {
      this.mobileNavAccountView = true;
      this.mobileNavSubMenu = true;
      this.mobileCanvasHeaderName = "Account";
    }
  }
  onClickOffCanvasCategoryMenu(value) {
    this.mobileNavCategoryView = false;
    this.mobileNavAccountView = false;
    this.mobileNavSubMenu = true;
    this.disableCategorySection();
    if (value === "BR") {
      this.mobileNavCategorySubMenu = true;
      this.categoryBR = true;
      this.mobileCanvasHeaderName = "Categories - Boiled Rice";
    } else if (value === "SR") {
      this.mobileNavCategorySubMenu = true;
      this.categorySR = true;
      this.mobileCanvasHeaderName = "Categories - Steam Rice";
    } else if (value === "RR") {
      this.mobileNavCategorySubMenu = true;
      this.categoryRR = true;
      this.mobileCanvasHeaderName = "Categories - Raw Rice";
    } else if (value === "TR") {
      this.mobileNavCategorySubMenu = true;
      this.categoryTR = true;
      this.mobileCanvasHeaderName = "Categories - Tiffen Rice";
    } else {
      this.mobileNavCategorySubMenu = true;
      this.categoryBBR = true;
      this.mobileCanvasHeaderName = "Categories - Biriyani Rice";
    }
  }
  onClickBackCategoriesSubMenu() {
    this.mobileNavCategorySubMenu = false;
    this.mobileNavCategoryView = true;
    this.disableCategorySection();
  }
  onClickBackSubMenu() {
    this.mobileNavSubMenu = false;

  }

}
