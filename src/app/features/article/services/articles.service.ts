import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Article } from "../models/article.model";
import { mockUser } from "../../../shared/mock-user";

@Injectable({ providedIn: "root" })
export class ArticlesService {
  constructor(private readonly http: HttpClient) {}

  // Updated query method to use mock data
  query(
    config: ArticleListConfig,
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    // Mock Data
    const mockArticles: Article[] = [
      {
        slug: "mock-article-1",
        title: "Mock Article 1",
        description: "Description for Mock Article 1",
        body: "Body content of Mock Article 1",
        tagList: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorited: false,
        favoritesCount: 10,
        author: mockUser, 
      },
      {
        slug: "mock-article-2",
        title: "Mock Article 2",
        description: "Description for Mock Article 2",
        body: "Body content of Mock Article 2",
        tagList: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorited: false,
        favoritesCount: 5,
        author: mockUser, 
      },
    ];

    const mockResponse = {
      articles: mockArticles,
      articlesCount: mockArticles.length,
    };

    // Return the mock data wrapped in an observable
    return of(mockResponse);
  }

  get(slug: string): Observable<Article> {
    return this.http
      .get<{ article: Article }>(`/articles/${slug}`)
      .pipe(map((data) => data.article));
  }

  delete(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}`);
  }

  create(article: Partial<Article>): Observable<Article> {
    return this.http
      .post<{ article: Article }>("/articles/", { article: article })
      .pipe(map((data) => data.article));
  }

  update(article: Partial<Article>): Observable<Article> {
    return this.http
      .put<{ article: Article }>(`/articles/${article.slug}`, {
        article: article,
      })
      .pipe(map((data) => data.article));
  }

  favorite(slug: string): Observable<Article> {
    return this.http
      .post<{ article: Article }>(`/articles/${slug}/favorite`, {})
      .pipe(map((data) => data.article));
  }

  unfavorite(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}/favorite`);
  }
}
