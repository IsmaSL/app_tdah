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
      img: 'assets/images/users/user1.jpg',
      name: 'Andrew Simon',
      date: '10-11-2016',
      icon: 'mdi mdi-open-in-new'
    },
    {
      img: 'assets/images/users/user2.jpg',
      name: 'John Deo',
      date: '01-11-2018',
      icon: 'mdi mdi-open-in-new'
    },
    {
      img: 'assets/images/users/user3.jpg',
      name: 'Shaina Nehwal',
      date: '26-03-2018',
      icon: 'mdi mdi-open-in-new'
    }
  ];

}
