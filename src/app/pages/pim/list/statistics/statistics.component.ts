import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  faHouse,
  faLaptop,
  faGift,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { Statistic } from 'src/app/interfaces';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent {
  faHouse = faHouse;
  faLaptop = faLaptop;
  faGift = faGift;
  faWallet = faWallet;
  @Input('statistics') statistics: Statistic | undefined;

  constructor() {}
}
