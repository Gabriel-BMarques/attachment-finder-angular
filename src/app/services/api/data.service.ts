import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  async find(url: string, query: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`../../../assets/database/${url}.json`).subscribe((response: any) => {
        const filteredItems = response.filter((item: any) => {
          for (const key in query) {
            if (item[key] !== query[key]) {
              return false;
            }
          }
          return true;
        });

        resolve(filteredItems);
      })
    });
  }

  async findById(url: string, id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(`../../../assets/database/${url}.json`).subscribe((response: any) => {
        const item = response.find((item: any) => item.id === id);
        resolve(item);
      });
    });
  }

}
