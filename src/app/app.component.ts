import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HackerNewsService } from './services/hacker-news.service';
import { NewsItem } from './models/news.model';
import { forkJoin, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private newsService = inject(HackerNewsService);
  private cd = inject(ChangeDetectorRef);

  allStoryIds: number[] = [];
  displayedStories: NewsItem[] = [];

  pageSize = 10;
  currentPage = 0;

  isLoadingIds = true;
  isLoadingStories = false;
  hasMoreStories = true;

  ngOnInit() {
    this.loadInitialIds();
  }

  loadInitialIds() {
    console.log('Startup: Fetching IDs...');
    this.isLoadingIds = true;
    
    this.newsService.getNewStoriesIds().pipe(
      timeout(5000), 
      catchError(err => {
        console.error('ID Error', err);
        return of([]); 
      })
    ).subscribe((ids) => {
      this.allStoryIds = ids || [];
      console.log(`Found ${this.allStoryIds.length} IDs.`);
      this.isLoadingIds = false;
      this.cd.detectChanges();

      if (this.allStoryIds.length > 0) {
        this.loadNextBatch();
      }
    });
  }

  loadNextBatch() {
    if (this.isLoadingStories) return;

    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    
    if (start >= this.allStoryIds.length) {
      this.hasMoreStories = false;
      this.isLoadingStories = false;
      this.cd.detectChanges();
      return;
    }

    this.isLoadingStories = true;
    this.cd.detectChanges();

    const idsToLoad = this.allStoryIds.slice(start, end);
    console.log(`Loading stories from ${start} to ${end}`, idsToLoad);

    const requests = idsToLoad.map(id => 
      this.newsService.getNewsItem(id).pipe(
        timeout(3000),
        catchError(_ => of(null))
      )
    );

    forkJoin(requests).subscribe({
      next: (stories) => {
        const validStories = stories.filter((s): s is NewsItem => 
          s !== null && !!s.title && !s.deleted && !s.dead
        );

        this.displayedStories = [...this.displayedStories, ...validStories];
        this.currentPage++;
        
        console.log('Stories loaded. Total visible:', this.displayedStories.length);

        this.isLoadingStories = false; 
        this.cd.detectChanges();

        if (end >= this.allStoryIds.length) {
           this.hasMoreStories = false;
           this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error', err);
        this.isLoadingStories = false;
        this.cd.detectChanges();
      }
    });
  }
}