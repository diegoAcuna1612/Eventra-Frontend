import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {GeneralDataResponse, StatisticsService} from '../../services/data.service';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    NgForOf,
    SidebarComponent
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  events: any[] = [];
  event: any;

  statistics: GeneralDataResponse | null = null;
  socialLikes: { facebook: number, twitter: number, instagram: number } = { facebook: 0, twitter: 0, instagram: 0 };

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    const eventId = 1;
    this.statisticsService.getStatisticsById(eventId).subscribe(
      (data) => {
        this.statistics = data;
        if(this.statistics?.interaccion){
          this.distributeSocialLikes(this.statistics.interaccion);
        }
      },
      (error) => {
        console.error('Error fetching statistics', error);
      }
    );
  }

  calculatePurchaseRate(actual: number | undefined, aforum: number | undefined): string {
    if (actual !== undefined && aforum !== undefined && aforum > 0) {
      return ((actual / aforum) * 100).toFixed(2) + '%';
    }
    return '0%';
  }

  distributeSocialLikes(totalInteractions: number): void {
    const facebook = Math.floor(Math.random() * totalInteractions);
    const twitter = Math.floor(Math.random() * (totalInteractions - facebook));
    const instagram = totalInteractions - facebook - twitter;
    this.socialLikes = { facebook, twitter, instagram };
  }

}

