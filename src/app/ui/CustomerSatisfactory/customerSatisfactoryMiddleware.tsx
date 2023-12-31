import { Fragment } from 'react';
import { parse } from 'valibot';
import { type AttachmentMiddleware, type AttachmentForScreenReaderMiddleware } from 'botframework-webchat-api';

import { isReviewAction } from '../../external/OrgSchema/ReviewAction';
import CustomerSatisfactory from './CustomerSatisfactory';
import CustomerSatisfactoryForScreenReader from './CustomerSatisfactoryForScreenReader';
import reviewActionSchema from './private/schema/reviewActionSchema';

const customerSatisfactoryMiddleware: AttachmentMiddleware =
  () =>
  next =>
  (...args) => {
    const [arg0] = args;

    if (arg0) {
      const {
        attachment: { content, contentType }
      } = arg0;

      if (contentType === 'application/ld+json' && isReviewAction(content)) {
        try {
          const reviewAction = parse(reviewActionSchema, content);

          return <CustomerSatisfactory initialReviewAction={reviewAction} />;
        } catch (error) {
          // TODO: We should use <ErrorBoundary>.
          console.error(`botframework-webchat: Failed to render ReviewAction.`, { error });

          return <Fragment />;
        }
      }
    }

    return next(...args);
  };

export default customerSatisfactoryMiddleware;

const forScreenReader: AttachmentForScreenReaderMiddleware =
  () =>
  next =>
  (...args) => {
    const [arg0] = args;

    if (arg0) {
      const {
        attachment: { content, contentType }
      } = arg0;

      if (contentType === 'application/ld+json' && isReviewAction(content)) {
        try {
          const reviewAction = parse(reviewActionSchema, content);

          return () => <CustomerSatisfactoryForScreenReader initialReviewAction={reviewAction} />;
        } catch (error) {
          // TODO: We should use <ErrorBoundary>.
          console.error(`botframework-webchat: Failed to render ReviewAction for screen reader.`, { error });

          return () => <Fragment />;
        }
      }
    }

    return next(...args);
  };

export { forScreenReader };
