import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../_model/user';
import {Subscription} from 'rxjs';

import {UserService} from '../_service/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  user: User = new User();

  constructor(
    private userService: UserService
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (!this.userService.currentUserValue) {
      this.loadUser();
    } else {
      this.user = this.currentUser;
    }
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  private loadUser() {
    this.userService.getUser()
      .pipe(first())
      .subscribe(
        user => {
          this.user = user;
        });
  }
}
