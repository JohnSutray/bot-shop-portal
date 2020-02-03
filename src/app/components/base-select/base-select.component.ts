import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-select',
  templateUrl: './base-select.component.html',
  styleUrls: ['./base-select.component.scss'],
})
export class BaseSelectComponent implements OnChanges, OnInit {
  @Output() readonly selectionChange = new Subject<any>();

  @Input() readonly label: string;
  @Input() readonly items: any[];
  @Input() readonly control: FormControl;
  @Input() readonly itemMapper = item => item;

  ngOnInit(): void {
    this.handleNewItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.items) {
      return;
    }

    this.handleNewItems();
  }

  handleNewItems(): void {
    if (this.items.includes(this.control.value)) {
      return;
    }

    if (this.items.length) {
      this.control.setValue(this.items[0]);
    }
  }
}
