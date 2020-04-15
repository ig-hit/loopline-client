import React from 'react';

import { Article } from 'MyModels';

type Props = {
  article: Article;
};

const ArticleView: React.FC<Props> = ({ article }) => {
  return (
    <div className="view jumbotron">
      <h1 className="display-6">{article.title}</h1>
      <hr className="my-4"/>
        <p>{article.content}</p>
    </div>
  );
};

export default ArticleView;
