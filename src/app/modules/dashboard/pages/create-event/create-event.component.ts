import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  formCreateEvent: FormGroup;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.formCreateEvent = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  startEvent() {
    const { name } = this.formCreateEvent.value;
    console.log(name, 'create event');
    this.close();
  }

  close() {
    this.modalController.dismiss();
  }
}
