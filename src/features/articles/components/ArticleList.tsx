import React from 'react';

import ArticleListItem from './ArticleListItem';
import {Article} from "MyModels";
import {load} from '../../../services/notebooks-api-client';
import store from '../../../store';
import {push} from "connected-react-router";

interface State {
  articles?: Article[];
}

type OwnProps = {};

class ArticleList extends React.Component<OwnProps, State> {
  constructor(props: OwnProps) {
    super(props);
    this.state = {}
  }

  componentDidMount(): void {
    const token = store.getState().notebooks.user.token;
    if (!token) {
      push('/register');
      return;
    }
    load()
      .then((articles: Article[]) => this.setState({articles}));
  }

  render() {
    const articles = this.state.articles;
    if (!articles) {
      return (
        <h1 style={{ textAlign: 'center' }}>
          No notebooks yet
        </h1>
      );
    }
    return (
      <table className="notebook-listing table table-striped">
        <tbody>
        {articles.map((article, num) => (
          <ArticleListItem key={num} article={article}/>
        ))}
        </tbody>
      </table>
    );
  }
}
export default ArticleList;
