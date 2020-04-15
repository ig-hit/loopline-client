import config from '../config';
import {Article} from "MyModels";

interface BackendArticle {
  id: number;
  title: string;
  text: string;
}

export function register(name: string): Promise<string> {
  return fetch(config.registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: name}),
  })
    .then(res => {
      if (res.status !== 201) {
        throw new Error(res.statusText);
      }
      return res;
    })
    .then(res => res.json());
}

export function get(id: number|string): Promise<Article> {
  return fetch(config.viewUrl.replace(':id', ''+id), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    }
  })
    .then(res => res.json())
    .then((a: BackendArticle) => ({
      id: String(a.id),
      title: a.title,
      content: a.text,
    }))
  ;
}

export function create(article: Article): Promise<Article[]> {
  return fetch(config.createUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      title: article.title,
      text: article.content,
    })
  })
    .then(res => res.json());
}

export function update(article: Article): Promise<Article[]> {
  return fetch(config.editUrl.replace(':id', article.id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      title: article.title,
      text: article.content,
    })
  })
    .then(res => res.json());
}

export function remove(article: Article): Promise<Article> {
  return fetch(config.deleteUrl.replace(':id', article.id), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    }
  })
    .then(_ => article);
}

export function load(): Promise<Article[]> {
  return fetch(config.createUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    }
  })
    .then(res => res.json())
    .then(res => {
      return res.map((a: BackendArticle) => ({
        id: a.id,
        title: a.title,
        content: a.text,
      }))
    });
}

function getToken(): string {
  return localStorage.getItem('token') || '';
}
