import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EventService } from '@data/services/event.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  formCreateEvent: FormGroup;

  constructor(
    private modalController: ModalController,
    private eventService: EventService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.formCreateEvent = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  startEvent() {
    const { name, description } = this.formCreateEvent.value;
    this.eventService.start(name, description)
      .subscribe(() => {
        this.notificationService.toast('Event start success. Please wait for data event!')
        this.close();
      });
  }

  close() {
    this.modalController.dismiss();
  }
}