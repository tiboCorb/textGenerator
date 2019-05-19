import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model';

@Injectable({ providedIn: 'root' })
export class PostService {

    constructor(private http: HttpClient) {
    }

    public creatPost(newPost: any): Observable<any> {
        return this.http.post(environment.api + '/posts', newPost);
    }

    public updatePostbyId(post: Post): Observable<any> {
        return this.http.put(environment.api + `/posts/${post.id}`, post);
    }


    public deletePostById(id: number): Observable<any> {
        return this.http.delete(environment.api + `/posts/${id}`);
    }

    public getPostByCategory(id: number): Observable<any> {
        return this.http.get(environment.api + `/posts?category_id=${id}`);
    }

}
