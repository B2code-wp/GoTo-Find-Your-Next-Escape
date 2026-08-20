import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { IonHeader } from "@ionic/angular/standalone";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-destination-card',
  templateUrl: './destination-card.component.html',
  styleUrls: ['./destination-card.component.scss'],
  imports: [MatIcon, IonHeader, MatToolbar],
})
export class DestinationCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';

  @Output() select = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    // Any initialization logic goes here
  }

  onSelect(): void {
    this.select.emit();
  }
}
