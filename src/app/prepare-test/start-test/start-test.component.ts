import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-start-test',
    templateUrl: './start-test.component.html',
    styleUrls: ['./start-test.component.scss'],
    providers: [NgbModalConfig, NgbModal],
})

export class StartTestComponent implements OnInit {

    constructor(private router: Router,
        private route: ActivatedRoute,
        config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
        config.centered = true;
        config.animation = true;
        config.size = "sm"
    }

    ngOnInit(): void {
    }

    open(content) {
        this.modalService.open(content);
        setTimeout(() => {
            this.router.navigateByUrl('/app/test/muse-js', { skipLocationChange: false });
            this.modalService.dismissAll(content);
        }, 1500);
    }
    //Cancel button event Starts
    cancel() {
        // this.router.navigate(['tests'], { relativeTo: this.route.parent, skipLocationChange: true });
        this.router.navigate(['devices'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
}
