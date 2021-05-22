import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getAllNotesByUserId() {
    return this.http.get(environment.baseUrl + '/notes/user/' + localStorage.getItem("userId"));
  }

  save(note: any) {
    return this.http.post(environment.baseUrl + '/notes', note);
  }

  update(note: any) {
    return this.http.put(environment.baseUrl + '/notes', note);
  }

  delete(id: number) {
    return this.http.delete(environment.baseUrl + '/notes/' + id);
  }

}
