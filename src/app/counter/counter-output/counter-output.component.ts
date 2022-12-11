import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit, OnDestroy {

  //@Input() counter: any;
  counter:number | undefined;

  counter$:Observable<{ counter: number; }> | undefined;

  counterSubscription: Subscription = new Subscription;
  
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.counterSubscription=this.store
    .select('counter')
    .subscribe(data=>{
      console.log('Counter Observable called');
      this.counter=data.counter;
    })

    this.counter$=this.store.select('counter');
  }

  ngOnDestroy(){
    if(this.counterSubscription){
      this.counterSubscription.unsubscribe();
    }
  }
}
