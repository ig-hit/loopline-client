import * as logger from './logger-service';
import * as articles from './articles-api-client';
import * as toast from './toast-service';
import * as localStorage from './local-storage-service';
import * as notebooks from './notebooks-api-client'

export default {
  logger,
  localStorage,
  toast,
  api: {
    articles,
    notebooks,
  },
};
