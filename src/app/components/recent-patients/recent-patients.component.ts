import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-patients',
  templateUrl: './recent-patients.component.html',
  styleUrls: ['./recent-patients.component.scss']
})
export class RecentPatientsComponent {

  constructor() { }

  earning: Object[] = [
    {
      img: 'assets/images/users/user_1.jpg',
      name: 'Adolfo Meza Romero',
      date: '10-11-2022',
      icon: 'mdi mdi-open-in-new'
    },
    {
      img: 'assets/images/users/user_2.jpg',
      name: 'Brandon Azael Muciño Santiesteban',
      date: '01-11-2022',
      icon: 'mdi mdi-open-in-new'
    },
    {
      img: 'assets/images/users/user_3.jpg',
      name: 'Lissete Rosete Rosas',
      date: '26-03-2023',
      icon: 'mdi mdi-open-in-new'
    }
  ];

}
