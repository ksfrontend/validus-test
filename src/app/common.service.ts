import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  public ApiCall(url: string, postData: any, isShowLoader: boolean, successCall: any): void {
    const self = this;
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      })
    };

    const requestData = JSON.stringify(postData);
    this.http.get<any>(environment.ApiBaseURL + url, httpOptions)
      .subscribe((response) => {
        if (typeof (successCall) === 'function') {
          successCall(response);
        }
      },
        (error) => {
        },
        () => {
        });
  }
}
