import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  find(url: string, query: any): Observable<any> {
    return this.http.get(url).pipe(
      map((response: any) => response.filter((item: any) => {
        for (const key in query) {
          if (item[key] !== query[key]) {
            return false;
          }
        }
        return true;
      }))
    );
  }
}
