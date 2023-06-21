import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUpDetails } from '../sign-up/sign-up.model';
import { Observable } from 'rxjs';

@Injectable()
export class SignUpService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  private postUrl = 'https://demo-api.now.sh/users';

  constructor(private http: HttpClient) { }

  postSignUpDetails(signUpDetails: SignUpDetails): Observable<SignUpDetails> {
    return this.http.post<SignUpDetails>(this.postUrl, signUpDetails, this.httpOptions);
  }
}
