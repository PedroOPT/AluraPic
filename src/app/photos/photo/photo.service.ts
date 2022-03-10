import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';
import { environment } from '../../../environments/environment'

const API_URL= environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) { }

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(`${API_URL}/${userName}/photos`);
    }

    listFromUserPaginated(userName: string, page: number) {

        const params = new HttpParams().append('page', page.toString());

        return this.http
            .get<Photo[]>(`${API_URL}/${userName}/photos`, { params: params });
    }

    upload(description: string, allowComments: boolean, file: File){
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);
        return this.http
            .post(API_URL + '/photos/upload', formData, { observe: 'events', reportProgress: true })
    }

    findById(photoId: number){
        return this.http
            .get<Photo>(API_URL + '/photos/' + photoId);
    }

    getComments(photoId: number){
        return this.http
            .get<PhotoComment[]>(API_URL + '/photos/' + photoId + '/comments')
    }

    addComment(photoId: number, commentText: string){
        return this.http
        .post(API_URL + '/photos/' + photoId + '/comments', {commentText: commentText})
    }

    removePhoto(photoId: number){
        return this.http
        .delete(API_URL + '/photos/' + photoId)
    }

    like(photoId: number){
        return this.http
            .post(API_URL + '/photos/' + photoId + '/like', {}, {observe: 'response'})
            .pipe(map(res=> true))
            .pipe(catchError(err => {
                return err.status == '304' ? of(false) : throwError(err); //se for 304 retoran outro observable e não estora o erro
            }));
    }

    //Podemos estipular o tipo retornado pelo método, caso contrário seu retorno padrão será Observable
    //Tipagem do retorno de API_URL com httpClient: 
    // Ajuda na refatoração do sistema toda vez que a API no servidor mudar.
    // Permite lançar mão da checagem estática, inclusive o autocomplete.

    //Através do operador catchError podemos tratar erros, evitando assim que se propague para quem realizou a inscrição no Observable.

    

}