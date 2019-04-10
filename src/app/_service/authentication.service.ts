import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentToken: Observable<string>;
  private apiUrl: string = 'http://localhost:22777';
  private currentTokenSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<string>
    (JSON.parse(localStorage.getItem('token')));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl + '/user/authenticate', {username, password})
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data.token) {
          // store jwt token in local storage
          localStorage.setItem('token', JSON.stringify(data));
          this.currentTokenSubject.next(data.token);
        }

        return data.token;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.currentTokenSubject.next(null);
  }

}
