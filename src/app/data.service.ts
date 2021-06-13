import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams } from '@angular/common/http';
import { Number } from './number/number'
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "https://first-me.herokuapp.com/api/fizzbuzz"
  //private REST_API_SERVER = "http://localhost:8080/api/fizzbuzz"

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  sendGetRequest(page:number, limit:number): Observable<Number[]> {
    const options = {params: new HttpParams({fromString:"_page="+page+"&_limit="+limit})}
    return this.http.get<Number[]>(this.REST_API_SERVER,options).pipe(retry(1), catchError(this.handleError));
  }
}
