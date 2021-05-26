import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

interface Task {
  id?: string;
  name: string;
  createdat?: Date;
  updatedat?: Date;
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  uriApi!: string;

  constructor(private http: HttpClient) {
    this.uriApi = environment.urlApi + 'task/';
  }

  create(body: Task): Observable<Task>{
    return this.http.post<Task>(this.uriApi, body);
  }

  getAll(): Observable<Task[]>{
    return this.http.get<Task[]>(this.uriApi);
  }

  getOne(id: string): Observable<Task>{
    return this.http.get<Task>(this.uriApi + id);
  }

  update(id: string,body: Task): Observable<Task>{
    return this.http.put<Task>(this.uriApi + id, body);
  }

  delete(id: string): Observable<Task>{
    return this.http.delete<Task>(this.uriApi + id);
  }

}
