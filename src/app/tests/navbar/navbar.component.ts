import { Component } from '@angular/core';
import { Router, ActivatedRoute, } from "@angular/router";


@Component({
    selector: 'msw-navbar',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {

    }
    page: string = "Dispositivos";
    ngOnInit() {
        this.router.events
            //.filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                let currentRoute = this.route.root;
                while (currentRoute.children[0] !== undefined) {
                    currentRoute = currentRoute.children[0];
                }
                this.page = currentRoute.snapshot.data["title"];
            })
    }

}