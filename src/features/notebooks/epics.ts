import { RootEpic } from 'MyTypes';
import { from, of } from 'rxjs';
import {filter, switchMap, map, catchError, tap} from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import {
  loadArticlesAsync,
  createArticleAsync,
  updateArticleAsync,
  deleteArticleAsync,
} from '../articles/actions';
import {register} from "./actions";
import {ArticleError} from "MyModels";

// export const loadDataOnAppStart: RootEpic = (action$, store, { api }) =>
//   action$.pipe(
//     filter(() => store.value.notebooks.user.token !== ""),
//     first(),
//     map(loadArticlesAsync.request)
//   );

export const registerEpic: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(register.request)),
    switchMap((action) =>
      from(api.notebooks.register(action.payload)).pipe(
        tap(token => {
          console.log("received toekn:", token);
          localStorage.setItem('token', token);
          localStorage.setItem('name', action.payload);
        }),
        map(register.success),
        catchError(message => of(register.failure(message)))
      )
    )
  );

export const loadNotebooksEpic: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(loadArticlesAsync.request)),
    switchMap(() =>
      from(api.notebooks.load()).pipe(
        map(loadArticlesAsync.success),
        catchError(message => of(loadArticlesAsync.failure(message)))
      )
    )
  );

export const createNotebooksEpic: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(createArticleAsync.request)),
    switchMap(action =>
      from(api.notebooks.create(action.payload)).pipe(
        map(res => {
          if ('error' in res) {
            const err = res as ArticleError;
            const msg = err.description + ': ' + err.error[0].message;
            createArticleAsync.failure(msg);
            return null;
          }
          return res;
        }),
        switchMap(api.notebooks.load),
        map(createArticleAsync.success),
      )
    )
  );

export const updateNotebooksEpic: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(updateArticleAsync.request)),
    switchMap(action =>
      from(api.notebooks.update(action.payload)).pipe(
        switchMap(api.notebooks.load),
        map(updateArticleAsync.success),
        catchError(message => of(updateArticleAsync.failure(message)))
      )
    )
  );

export const deleteNotebooksEpic: RootEpic = (action$, state$, { api, toast }) =>
  action$.pipe(
    filter(isActionOf(deleteArticleAsync.request)),
    switchMap(action =>
      from(api.notebooks.remove(action.payload)).pipe(
        switchMap(api.notebooks.load),
        map(deleteArticleAsync.success),
        catchError(message => {
          toast.error(message);
          return of(deleteArticleAsync.failure(action.payload));
        })
      )
    )
  );
