import React from 'react';
import cuid from 'cuid';
import { Form, FormikProps, Field, withFormik, ErrorMessage } from 'formik';
import { Article } from 'MyModels';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {createArticleAsync, updateArticleAsync} from '../actions';
import {push} from "connected-react-router";

type FormValues = Pick<Article, 'title' | 'content'> & {};

const dispatchProps = {
  createArticle: (values: FormValues) =>
    createArticleAsync.request({
      id: cuid(),
      ...values,
    }),
  updateArticle: (values: Article) =>
    updateArticleAsync.request({
      ...values,
    }),
  redirectToListing: () => push('/'),
};

type Props = typeof dispatchProps & {
  article?: Article;
};

const InnerForm: React.FC<Props & FormikProps<FormValues>> = props => {
  const { isSubmitting, dirty } = props;
  return (
    <Form className="notebook-form">
      <div className="form-group row">
        <label htmlFor="title" className="col-sm-2 col-form-label col-form-label-lg">Title</label>
        <br />
        <Field
          name="title"
          placeholder="Title"
          component="input"
          type="text"
          className="form-control notebook-field form-control-lg"
          required
          autoFocus
        />
        <ErrorMessage name="title" />
      </div>

      <div className="form-group row">
        <label htmlFor="title" className="col-sm-2 col-form-label col-form-label-lg">Text</label>
        <br />
        <Field
          name="content"
          placeholder="Notebook content"
          component="textarea"
          className="form-control form-control-lg notebook-field"
          rows="6"
          cols="30"
          type="text"
        />
        <ErrorMessage name="content" />
      </div>

      <button type="submit" className="btn btn-lg btn-primary" disabled={!dirty || isSubmitting}>
        Save
      </button>

    </Form>
  );
};

export default compose(
  connect(
    null,
    dispatchProps
  ),
  withFormik<Props, FormValues>({
    enableReinitialize: true,
    // initialize values
    mapPropsToValues: ({ article: data }) => ({
      title: (data && data.title) || '',
      content: (data && data.content) || '',
    }),
    handleSubmit: (values, form) => {
      if (form.props.article != null) {
        form.props.updateArticle({ ...form.props.article, ...values });
      } else {
        form.props.createArticle(values);
      }

      form.props.redirectToListing();
      form.setSubmitting(false);
    },
  })
)(InnerForm);
