import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { WidgetDeviceComponent } from './components/widget-device/widget-device.component';
import { DeviceDisconnectComponent } from './components/widget-device/device-disconnect/device-disconnect.component';
import { DeviceConnectComponent } from './components/widget-device/device-connect/device-connect.component';
import { WidgetSurveyComponent } from './components/widget-survey/widget-survey.component';
import { SurveyRunningComponent } from './components/widget-survey/survey-running/survey-running.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardPage,
    WidgetDeviceComponent,
    DeviceDisconnectComponent,
    DeviceConnectComponent,
    WidgetSurveyComponent,
    SurveyRunningComponent
  ]
})
export class DashboardPageModule { }
