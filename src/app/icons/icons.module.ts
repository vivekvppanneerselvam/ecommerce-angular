import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconCamera, IconHeart, IconGithub, IconShoppingCart, IconUser, IconMenu, IconMail, IconDownload, IconHelpCircle, IconXCircle,IconXSquare, IconCheckSquare, IconCheckCircle, IconBell, IconArrowLeftCircle, IconArrowLeft, IconArrowRightCircle, IconArrowRight, IconSettings,  IconShoppingBag,  IconAward,  IconTruck,  IconHome, IconCheck, IconInstagram, IconTwitter, IconFacebook, IconMapPin, IconTag, IconX, IconRefreshCw, IconCrosshair, IconEdit, IconArrowUp, IconPlusSquare, IconPlus, IconLayout  } from 'angular-feather';
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
  IconMail, 
  IconDownload,
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
  IconX,
  IconRefreshCw,
  IconCrosshair,
  IconEdit,
  IconArrowUp,
  IconPlusSquare,
  IconPlus,
  IconLayout
];
@NgModule({
  exports: icons,
  imports: [
    CommonModule
  ],
  declarations: []
})
export class IconsModule { }
