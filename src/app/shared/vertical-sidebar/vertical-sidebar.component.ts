import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from './vertical-sidebar.metadata';
import { VerticalSidebarService } from './vertical-sidebar.service';

import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-vertical-sidebar',
    templateUrl: './vertical-sidebar.component.html'
})
export class VerticalSidebarComponent {
    showMenu = '';
    public sidebarnavItems: RouteInfo[] = [];
    path = '';
    btnName = 'Cerrar Sesión';

    constructor(private menuServise: VerticalSidebarService, 
                private router: Router,
                private userServ: UsersService) {
        this.menuServise.items.subscribe(menuItems => {
            this.sidebarnavItems = menuItems;

            // Active menu 
            this.sidebarnavItems.filter(m => (
                (s) => {
                    if (s.path === this.router.url) {
                        this.path = m.title;
                    }
                }
            ));

            // this.addExpandClass(this.path);
        });
    }

    addExpandClass(element: any) {
        this.showMenu = element;
    }

    isLinkActive(linkPath: string): boolean {
        return this.router.isActive(linkPath, false);
    }

    // me
    closeSesion(): void {
        this.userServ.close_sesion();
        this.router.navigate(['/login'], { replaceUrl: true });
    }
}
