import { Component } from '@angular/core';
import {SideMenuNavigationComponent} from "../../side-menu-navigation/side-menu-navigation.component";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {AuthService} from "../../../shared/services/auth.service";
import {AuthStoreService} from "../auth-store/services/auth-store.service";

@Component({
  selector: 'app-entrepreneur-page',
  standalone: true,
  imports: [
    SideMenuNavigationComponent,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterOutlet,
    MatSidenavModule,
    MatListItem,
    MatNavList,
    RouterLink
  ],
  templateUrl: './entrepreneur-page.component.html',
  styleUrl: './entrepreneur-page.component.css'
})
export class EntrepreneurPageComponent {
  sideNavOpen: boolean = false;
  constructor(protected authStoreService: AuthStoreService) {
  }

  toggleSideNav(){
    this.sideNavOpen = !this.sideNavOpen;
  }

  logout(): void {
    //console.log('logout');
    this.authStoreService.logout();
  }

}
