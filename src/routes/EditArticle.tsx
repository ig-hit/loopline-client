import React from 'react';
import { match } from 'react-router';
import ArticleForm from '../features/articles/components/ArticleForm';
import Main from '../layouts/Main';
import BackLink from '../components/BackLink';
import {Article} from "MyModels";
import {get} from "../services/notebooks-api-client";

type OwnProps = {
  match: match<{ articleId: string }>;
};

interface State {
  article?: Article;
}

class EditArticle extends React.Component<OwnProps, State> {
  constructor(props: OwnProps) {
    super(props);
    this.state = {}
  }
  componentDidMount(): void {
    const { match: { params } } = this.props;
    const articleId = params.articleId;
    get(articleId)
      .then(article => this.setState({article}))
      .catch(err => {

      });
  }

  render() {
    const article = this.state.article;
    if (!article) {
      return ''
    }

    return (
      <Main renderActionsMenu={() => <BackLink />}>
        <ArticleForm article={article} />
      </Main>
    );
  }
}

export default EditArticle;
