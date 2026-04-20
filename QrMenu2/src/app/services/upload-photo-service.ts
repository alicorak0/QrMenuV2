import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadPhotoService {
  private api = 'https://localhost:44311/api/upload';


  constructor(private http: HttpClient) { }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<{ fileName: string, url: string }>(this.api, formData);
  }




}
