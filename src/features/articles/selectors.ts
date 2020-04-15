import { RootState } from 'MyTypes';

export const getArticles = (state: RootState) => state.articles.articles;
