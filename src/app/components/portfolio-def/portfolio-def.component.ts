import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {DefPortfolioService} from 'src/app/services/def-portfolio.service';
import {Portfolio} from 'src/app/services/portfolio';

@Component({
  selector: 'app-portfolio-def',
  templateUrl: './portfolio-def.component.html',
  styleUrls: ['./portfolio-def.component.css']
})
export class PortfolioDefComponent implements OnInit {

  portfolios: Array<Portfolio>;
  selected: Portfolio;
  isActive: boolean;

  constructor(private svr: DefPortfolioService)
  { }

  ngOnInit(): void {
    this.svr.getList().subscribe( (data: Array<Portfolio>) => {
      this.portfolios = data;
    } );
  }

  save()
  {

    this.isActive = this.selected.active;
    if (this.selected.active)
    {
        this.portfolios.forEach(function(pos) {

            {pos.active = false; }

        });
    }
    this.selected.active = this.isActive;
    // Zapis do bazy danych
    this.svr.updatePortfolio(this.selected).subscribe( (data: any) => {

    } );

  }

}
