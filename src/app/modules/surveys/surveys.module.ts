import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SurveysPageRoutingModule } from './surveys-routing.module';
import { SurveysPage } from './surveys.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveysPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SurveysPage],
  providers:[
    DatePipe
  ]
})
export class SurveysPageModule { }
