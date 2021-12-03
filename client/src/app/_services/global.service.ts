import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  baseURL: String = 'http://127.0.0.1:8081/api'
  constructor(private http: HttpClient) { }

  get(slug: String, param: any | undefined): Observable<any> {
    if (param) {
      return this.http.get(this.baseURL + '/' + slug, { params: param });
    } else {
      return this.http.get(this.baseURL + '/' + slug);
    }
  }

  post(slug: String, body: Object): Observable<any> {
    return this.http.post(this.baseURL + '/' + slug, this.generatePayload(body));
  }

  generatePayload(body: Object): Object {
    return { "attributes": body }
  }
}
