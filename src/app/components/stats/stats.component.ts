import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
})

export class StatsComponent implements OnInit {

    count_patients: number = 0;

    constructor(private userService: UsersService) { }

    ngOnInit(): void {
        this.get_count_patients();
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

}
