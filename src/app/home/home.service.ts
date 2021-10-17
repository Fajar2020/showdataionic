import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  globalApi='http://localhost:5000/';
  constructor(private http: HttpClient) {}

  getLocation() {
    const apiURL = `${this.globalApi}location`;

    return this.http.get(apiURL).pipe(
      map((data: any) => data)
    );
  }

  searchData(param: any){
    const {locId, id, page, limit}=param;

    const apiURL = `${this.globalApi}doctor?loc_id=${locId?locId:''}&id=${id?id:''}&page=${page?page:1}&limit=${limit?limit:10}`;

    return this.http.get(apiURL).pipe(
      map((data: any) => data)
    );
  }

  getDetailData(id: number){
    const apiURL = `${this.globalApi}doctor?id=${id?id:''}`;

    return this.http.get(apiURL).pipe(
      map((data: any) => data)
    );
  }

}
