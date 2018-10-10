import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconCamera, IconHeart, IconGithub, IconShoppingCart, IconUser, IconMenu, IconHelpCircle, IconXCircle,IconXSquare, IconCheckSquare, IconCheckCircle, IconBell, IconArrowLeftCircle, IconArrowLeft, IconArrowRightCircle, IconArrowRight, IconSettings,  IconShoppingBag,  IconAward,  IconTruck,  IconHome, IconCheck, IconInstagram, IconTwitter, IconFacebook, IconMapPin, IconTag, IconX } from 'angular-feather';
const icons = [
  IconCamera,
  IconHeart,
  IconGithub,
  IconShoppingCart,
  IconUser,
  IconMenu,
  IconHelpCircle,
  IconXCircle, 
  IconXSquare,
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
  IconFacebook,
  IconMapPin,
  IconTag,
  IconX

];
@NgModule({
  exports: icons,
  imports: [
    CommonModule
  ],
  declarations: []
})
export class IconsModule { }
