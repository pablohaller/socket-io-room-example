import { twMerge } from "tailwind-merge";

interface Props {
  isConnected: boolean;
}

const Status = ({ isConnected }: Props) => {
  const status = isConnected ? "Connected" : "Disconnected";
  const statusDot = isConnected ? "bg-green-800" : "bg-red-800";
  const statusText = isConnected ? "text-green-800" : "text-red-800";

  return (
    <div className="flex items-center gap-2">
      <span>Status:</span>
      <span className="flex items-center gap-1">
        <span
          className={twMerge(
            "h-3 w-3 rounded-full inline-block",
            statusDot
          )}></span>
        <span className={twMerge("font-bold", statusText)}>{status}</span>
      </span>
    </div>
  );
};

export default Status;
