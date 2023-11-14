/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  connected: any[];
}

const Connected = ({ connected }: Props) => {
  return (
    <ul>
      {connected.map((name: string, index: number) => (
        <li
          key={`connected-${index}`}
          className="list-disc text-xl text-slate-400">
          {name}
        </li>
      ))}
    </ul>
  );
};

export default Connected;
