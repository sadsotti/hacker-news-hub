export interface NewsItem {
  id: number;
  title: string;
  url?: string;
  time: number;
  by: string;
  score?: number;
  type?: string;
  deleted?: boolean;
  dead?: boolean;
}