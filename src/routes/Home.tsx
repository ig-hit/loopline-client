import React from 'react';

import ArticleList from '../features/articles/components/ArticleList';
import ArticleActionsMenu from '../features/articles/components/ArticleActionsMenu';
import Main from '../layouts/Main';
import { RootState } from 'MyTypes';
import {connect} from "react-redux";

const mapStateToProps = (state: RootState) => ({});
const dispatchProps = {};

const Home = () => (
  <Main renderActionsMenu={() => <ArticleActionsMenu />}>
    <ArticleList />
  </Main>
);
export default connect(
  mapStateToProps,
  dispatchProps
)(Home);
