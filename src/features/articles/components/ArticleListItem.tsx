import { Article } from 'MyModels';
import React from 'react';
import { connect } from 'react-redux';

import { deleteArticleAsync } from '../actions';
import { getPath } from '../../../router-paths';
import { Link } from 'react-router-dom';

const dispatchProps = {
  deleteArticle: deleteArticleAsync.request,
};

type Props = typeof dispatchProps & {
  article: Article;
};

const ArticleListItem = (({ article, deleteArticle }: Props) => {
  return (
      <tr>
          <td>
            <Link to={getPath('viewArticle', article.id)}>
              <i className="action-icon fas fa-eye" title="View"/>
            </Link>
          </td>
          <td>
              <Link to={getPath('editArticle', article.id)}>
                <i className="action-icon fas fa-edit" title="Edit"/>
              </Link>
          </td>
          <td>
            <Link to="#" onClick={() => {
              deleteArticle(article);
              window.location.reload();
            }}>
              <i className="action-icon red fas fa-trash-alt" title="Remove"/>
            </Link>
          </td>
          <td>{article.title}</td>
      </tr>
  );
});

export default connect(
  null,
  dispatchProps
)(ArticleListItem);
