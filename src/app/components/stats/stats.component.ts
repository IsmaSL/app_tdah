import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
})

export class StatsComponent implements OnInit {

    current_user: any;
    count_patients: number = 0;
    count_patients_adhd: number = 0;

    constructor(private userService: UsersService) { }

    ngOnInit(): void {
        this.get_current_user_info();
        this.get_count_patients();
        this.get_count_patiens_adhd();
    }

    get_current_user_info() {
        this.current_user = JSON.parse(this.userService.getCurrentUser());
    }

    get_count_patients() {
        this.userService.get_count_patient().subscribe(
            (response) => {
                this.count_patients = response.count_patients;
            }, (error) => {
                console.log(error.error);
            }
        );
    }

    get_count_patiens_adhd() {
        this.userService.get_count_patients_adhd().subscribe(
            (response) => {
                this.count_patients_adhd = response.count;
            }, (error) => {
                console.log(error.error);
            }
        );
    }

}
