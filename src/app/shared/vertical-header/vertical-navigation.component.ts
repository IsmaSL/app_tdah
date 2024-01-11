import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

import { TranslateService } from '@ngx-translate/core';
import { UsersService } from "src/app/services/users.service";
import { DarkModeService } from "src/app/services/DarkMode.service";

declare var $: any;

@Component({
    selector: 'app-vertical-navigation',
    templateUrl: './vertical-navigation.component.html'
})
export class VerticalNavigationComponent implements OnInit {
    @Output() toggleSidebar = new EventEmitter<void>();
    @Output() darkMode = new EventEmitter();

    current_user: any;

    public iconLight = false;

    public config: PerfectScrollbarConfigInterface = {};

    public showSearch = false;

    emitEvent() {
        this.darkMode.emit('dark');
        // this.iconLight = !this.iconLight;
        
        const isDarkMode = !this.iconLight;
        this.dark.setDarkMode(isDarkMode);
        this.iconLight = isDarkMode;
    }

    // This is for Notifications
    notifications: Object[] = [
        {
            btn: "btn-danger",
            icon: "ti-link",
            title: "Luanch Admin",
            subject: "Just see the my new admin!",
            time: "9:30 AM",
        },
        {
            btn: "btn-success",
            icon: "ti-calendar",
            title: "Event today",
            subject: "Just a reminder that you have event",
            time: "9:10 AM",
        },
        {
            btn: "btn-info",
            icon: "ti-settings",
            title: "Settings",
            subject: "You can customize this template as you want",
            time: "9:08 AM",
        },
        {
            btn: "btn-primary",
            icon: "ti-user",
            title: "Pavan kumar",
            subject: "Just see the my admin!",
            time: "9:00 AM",
        },
    ];

    // This is for Mymessages
    mymessages: Object[] = [
        {
            useravatar: "assets/images/users/user1.jpg",
            status: "online",
            from: "Pavan kumar",
            subject: "Just see the my admin!",
            time: "9:30 AM",
        },
        {
            useravatar: "assets/images/users/user2.jpg",
            status: "busy",
            from: "Sonu Nigam",
            subject: "I have sung a song! See you at",
            time: "9:10 AM",
        },
        {
            useravatar: "assets/images/users/user2.jpg",
            status: "away",
            from: "Arijit Sinh",
            subject: "I am a singer!",
            time: "9:08 AM",
        },
        {
            useravatar: "assets/images/users/user4.jpg",
            status: "offline",
            from: "Pavan kumar",
            subject: "Just see the my admin!",
            time: "9:00 AM",
        },
    ];

    public selectedLanguage: any = {
        language: 'Español',
        code: 'es',
        type: 'MX',
        icon: 'mx'
    }

    public languages: any[] = [{
        language: 'English',
        code: 'en',
        type: 'US',
        icon: 'us'
    },
    {
        language: 'Español',
        code: 'es',
        icon: 'mx'
    },
    {
        language: 'Français',
        code: 'fr',
        icon: 'fr'
    },
    {
        language: 'German',
        code: 'de',
        icon: 'de'
    }]

    constructor(private modalService: NgbModal, 
                private translate: TranslateService,
                private router: Router,
                private userServ: UsersService,
                private dark: DarkModeService) {
        translate.setDefaultLang('es');
        this.iconLight = this.dark.getDarkMode();
    }

    changeLanguage(lang: any) {
        this.translate.use(lang.code)
        this.selectedLanguage = lang;
    }

    // Me

    ngOnInit(): void {
        this.current_user = JSON.parse(this.userServ.getCurrentUser());
    }

    closeSesion() {
        this.userServ.close_sesion();
        this.router.navigate(['/login'], { replaceUrl: true });
    }
}
