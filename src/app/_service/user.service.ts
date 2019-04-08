import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../_model/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {
  public currentUser: Observable<User>;
  private apiUrl: string = 'http://localhost:22777';
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>
    (JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getUser() {
    return this.http.get<User>(this.apiUrl + '/user')
      .pipe(map(user => {
        if (user) {
          // store user details in local storage to keep user between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  register(user: User) {
    return this.http.post(this.apiUrl + '/user/register', user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
