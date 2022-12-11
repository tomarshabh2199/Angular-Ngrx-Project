import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { decrement, increment, reset } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent implements OnInit {

  // @Output() increment= new EventEmitter<void>();
  // @Output() decrement= new EventEmitter<void>();
  // @Output() reset= new EventEmitter<void>();

  constructor( private store :Store<AppState>) { }

  ngOnInit(): void {
  }

  // onIncrement(){
  //    this.increment.emit();
  // }

  onIncrement(){
     this.store.dispatch(increment());
  }

  // onDecrement(){
  //   this.decrement.emit();
  // }


  onDecrement(){
    this.store.dispatch(decrement());
  }


  // onReset(){
  //  this.reset.emit();
  // }

  onReset(){
   this.store.dispatch(reset());
  }
}
