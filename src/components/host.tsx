import Connected from "./connected";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  events: any[];
}

const Host = ({ events }: Props) => {
  const eventByType = events.reduce(
    () => {
      return {
        connected: events
          .filter(({ type }) => type === "join")
          .map(({ name }) => name),
        others: events.filter(({ type }) => type !== "join"),
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
      </div>
      <div className="w-1/3">
        <h1 className="text-2xl">Question:</h1>
      </div>
    </div>
  );
};

export default Host;
