const pathsMap = {
  home: () => '/',
  register: () => '/register',
  addArticle: () => '/add',
  viewArticle: (articleId: string) => `/view/${articleId}`,
  editArticle: (articleId: string) => `/edit/${articleId}`,
};
type PathsMap = typeof pathsMap;

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCb: (...args: any[]) => string = pathsMap[route];

  return pathCb(...params);
};
