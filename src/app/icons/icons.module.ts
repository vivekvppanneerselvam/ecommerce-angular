import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconCamera, IconHeart, IconGithub, IconShoppingCart, IconUser, IconHelpCircle } from 'angular-feather';
const icons = [
  IconCamera,
  IconHeart,
  IconGithub,
  IconShoppingCart,
  IconUser,
  IconHelpCircle
];
@NgModule({
  exports: icons,
  imports: [
    CommonModule
  ],
  declarations: []
})
export class IconsModule { }
