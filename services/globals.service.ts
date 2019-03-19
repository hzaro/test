import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class GlobalsService {
  private enterView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isEnterView() {
    return this.enterView.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  inView() {
      this.enterView.next(true);
  }

  outView() {
    this.enterView.next(false);
  }

}