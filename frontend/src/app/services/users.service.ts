import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

interface Users {
  id?: string;
  name: string;
  city: string;
  createdat?: Date;
  updatedat?: Date;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  uriApi!: string;

  constructor(private http: HttpClient) {
    this.uriApi = environment.urlApi + 'users/';
  }

  create(body: Users): Observable<Users>{
    return this.http.post<Users>(this.uriApi, body);
  }

  getAll(): Observable<Users[]>{
    return this.http.get<Users[]>(this.uriApi);
  }

  getOne(id: string): Observable<Users>{
    return this.http.get<Users>(this.uriApi + id);
  }

  update(id: string,body: Users): Observable<Users>{
    return this.http.put<Users>(this.uriApi + id, body);
  }

  delete(id: string): Observable<Users>{
    return this.http.delete<Users>(this.uriApi + id);
  }

}
