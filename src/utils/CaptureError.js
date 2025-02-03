import * as Sentry from 'sentry-expo';

export const captureError = (error) => {
  console.error(error); // Always log to console

  if (process.env.EXPO_PUBLIC_NODE_ENV !== 'prod') {
    return;
  }

  try {
    safeCaptureException(error);
  } catch (err) {
    console.warn("Error capturing exception in Sentry:", err);
  }
};

export const captureMessage = (message) => {
  console.warn(message); // Always log to console

  if (process.env.EXPO_PUBLIC_NODE_ENV !== 'prod') {
    return;
  }

  try {
    safeCaptureException(message);
  } catch (err) {
    console.warn("Error capturing message in Sentry:", err);
  }
};

const safeCaptureException = (error) => {
  if (typeof error === "string") {
    Sentry.captureMessage(error);
  } else if (error instanceof Error) {
    Sentry.captureException(error);
  } else {
    console.error("Unexpected error format:", error);
  }
};
