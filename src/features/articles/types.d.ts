declare module 'MyModels' {
  export type Article = {
    id: string;
    title: string;
    content: string;
  };

  type ErrorDetails = {
    message: string;
    messageCode: string;
  }

  export type ArticleError = {
    description: string;
    error: ErrorDetails[];
  };
}
