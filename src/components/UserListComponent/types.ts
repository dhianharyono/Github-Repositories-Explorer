export interface User {
    id: number;
    login: string;
    avatar_url: string;
  }
  
  export interface Repo {
    id: number;
    name: string;
    description: string;
    stargazers_count: number | null;
    html_url: string;
    homepage: string;
    language: string | null;
  }
  