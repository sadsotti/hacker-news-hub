import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsItem } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class HackerNewsService {
  private http = inject(HttpClient);
  private baseUrl = 'https://hacker-news.firebaseio.com/v0';

  getNewStoriesIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/newstories.json`);
  }

  getNewsItem(id: number): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.baseUrl}/item/${id}.json`);
  }
}