import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconCamera, IconHeart, IconGithub, IconShoppingCart, IconUser, IconMenu, IconHelpCircle, IconXCircle, IconCheckSquare, IconCheckCircle, IconBell, IconArrowLeftCircle, IconArrowLeft, IconArrowRightCircle, IconArrowRight, IconSettings,  IconShoppingBag,  IconAward,  IconTruck,  IconHome, IconCheck, IconInstagram, IconTwitter, IconFacebook } from 'angular-feather';
const icons = [
  IconCamera,
  IconHeart,
  IconGithub,
  IconShoppingCart,
  IconUser,
  IconMenu,
  IconHelpCircle,
  IconXCircle, 
  IconCheckSquare, 
  IconCheckCircle, 
  IconBell, 
  IconArrowLeftCircle, 
  IconArrowLeft, 
  IconArrowRightCircle,
  IconArrowRight,
  IconSettings,
  IconShoppingBag,
  IconAward,
  IconTruck,
  IconHome,
  IconCheck,
  IconInstagram,
  IconTwitter,
  IconFacebook

];
@NgModule({
  exports: icons,
  imports: [
    CommonModule
  ],
  declarations: []
})
export class IconsModule { }
