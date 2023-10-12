import './WebChat.css';

import { css } from '@emotion/css';
import { Components, createStore, hooks } from 'botframework-webchat';
import { memo, useEffect, useMemo, useState } from 'react';

// import ActivityWithReferences from './ActivityWithReferences';
import createDirectLineEmulator from '../createDirectLineEmulator';
import customerSatisfactoryMiddleware, {
  forScreenReader as customerSatisfactoryForScreenReaderMiddleware
} from './CustomerSatisfactory/customerSatisfactoryMiddleware';

// import { type PropsOf } from '../types/PropsOf';

const { BasicWebChat, Composer } = Components;
const { useStyleOptions } = hooks;

// type AttachmentMiddleware = PropsOf<typeof Composer>['attachmentMiddleware'];

type Props = {
  activity: readonly unknown[];
};

const _Chat = memo(function () {
  const [{ accent, markdownExternalLinkIconImage }] = useStyleOptions();

  const className = useMemo(
    () =>
      css({
        '--pva__accent-color': accent,
        '--pva__external-link-icon': markdownExternalLinkIconImage,
        '--pva__semantic-colors__link': accent
      }),
    [accent]
  );

  return <BasicWebChat className={className} />;
});

export default memo(function Chat({ activity }: Props) {
  const [ready, setReady] = useState(false);
  const store = useMemo(
    () =>
      // @ts-expect-error 7016
      createStore({}, () => next => action => {
        if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
          setReady(true);
        }

        return next(action);
      }),
    [setReady]
  );

  const { directLine } = useMemo(() => createDirectLineEmulator({ store }), [store]);

  useEffect(() => {
    if (activity && ready) {
      activity.forEach(activity => directLine.emulateIncomingActivity(activity));
    }
  }, [activity, directLine, ready]);

  // Commented out for now... if we need to use activity middleware, instead of attachment middleware, here is the code.
  // Note the activity middleware will render the timestamp, thus, the reference links will be shown *below* the timestamp, which may not be desirable.
  // const activityMiddleware = useMemo<ActivityMiddleware>(() => {
  //   return () =>
  //     next =>
  //     (...args) => {
  //       const [{ activity }] = args;

  //       const original = next(...args);

  //       if (activity.type === 'message') {
  //         return (renderAttachment, props) => (
  //           <ActivityWithReferences activity={activity}>
  //             {original && original(renderAttachment, props)}
  //           </ActivityWithReferences>
  //         );
  //       }

  //       return original;
  //     };
  // }, []);

  // const attachmentMiddleware = useMemo<AttachmentMiddleware>(() => {
  //   return () =>
  //     next =>
  //     (...args) => {
  //       const original = next(...args);

  //       const activity = args[0]?.activity;

  //       // When should we use the middleware with a new/tweaked Markdown engine?
  //       // - Must be a message from bot
  //       // - Must be a Markdown message
  //       // - Must be a generative answer (i.e. check bot entity)
  //       if (
  //         activity &&
  //         activity.from.role === 'bot' &&
  //         activity.type === 'message' &&
  //         (!activity.textFormat || activity.textFormat === 'markdown') &&
  //         activity.entities?.find(entity => '@context' in entity)
  //       ) {
  //         return <MarkdownTextActivity activity={activity}>{original}</MarkdownTextActivity>;
  //       }

  //       return original;
  //     };
  // }, []);

  // const activityStatusMiddleware = useMemo(createActivityStatusMiddleware, []);

  return (
    <div className="chat">
      <Composer
        // activityMiddleware={activityMiddleware}
        // activityStatusMiddleware={activityStatusMiddleware}
        attachmentMiddleware={customerSatisfactoryMiddleware}
        attachmentForScreenReaderMiddleware={customerSatisfactoryForScreenReaderMiddleware}
        directLine={directLine}
        store={store}
      >
        <_Chat />
      </Composer>
    </div>
  );
});
