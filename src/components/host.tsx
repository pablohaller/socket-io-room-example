import Connected from "./connected";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  events: any[];
  activity: string;
}

const Host = ({ events, activity }: Props) => {
  const eventByType = events.reduce(
    () => {
      return {
        connected: events
          .filter(({ type }) => type === "join")
          .map(({ name }) => name),
        others: events.filter(({ type }) => type !== "join"),
        newActivity: events.filter(({ type }) => type === "new_activity"),
      };
    },
    {
      connected: [],
      others: [],
    }
  );

  return (
    <div className="w-full flex bg-slate-800 h-full text-gray-200">
      <div className="w-1/3">
        <h1 className="text-2xl">Connected:</h1>
        <Connected connected={eventByType.connected} />
      </div>
      <div className="w-1/3">
        <h1 className="text-2xl">Log:</h1>
        <div>{JSON.stringify(eventByType?.others)}</div>
      </div>
      <div className="w-1/3">
        <h1 className="text-2xl">Activity:</h1>
        {activity}
      </div>
    </div>
  );
};

export default Host;
