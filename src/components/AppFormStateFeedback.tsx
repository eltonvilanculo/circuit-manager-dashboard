import AppErrorFeedback from "./AppErrorFeedback";

type Props<T> = {
  keyName: string;
  feedback?: T;
};

export default function AppFormStateFeedback<T extends Record<string, any>>({
  keyName,
  feedback,
}: Props<T>) {
  return (
    <>
      {feedback && feedback[keyName] && (
        <AppErrorFeedback label={feedback[keyName][0]} />
      )}
    </>
  );
}
