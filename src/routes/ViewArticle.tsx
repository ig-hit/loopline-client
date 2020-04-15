import React from 'react';
import { match } from 'react-router';
import {get} from '../services/notebooks-api-client';

import ArticleView from '../features/articles/components/ArticleView';
import Main from '../layouts/Main';
import BackLink from '../components/BackLink';
import {Article} from "MyModels";

type OwnProps = {
  match: match<{ articleId: string }>;
};

interface State {
  article?: Article;
}

class ViewArticle extends React.Component<OwnProps, State> {
  constructor(props: OwnProps) {
    super(props);
    this.state = {}
  }

  componentDidMount(): void {
    const { match: { params } } = this.props;
    const articleId = params.articleId;
    get(articleId)
      .then(article => this.setState({article}));
  }

  render() {
    const article = this.state.article;
    if (!article) {
      return ''
    }
    return (
      <Main renderActionsMenu={() => <BackLink />}>
        <ArticleView article={article} />
      </Main>
    );
  }
}
export default ViewArticle;
