/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout";
import { socket } from "../../socket/client";
import Title from "../../components/title";
import Status from "../../components/status";
import Button from "../../components/button";

const Room = () => {
  const { roomId } = useParams();
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [voteEvents, setVoteEvents] = useState<any>([]);

  useEffect(() => {
    if (!roomId) {
      setError("Room not found");
      return;
    }

    // socket.emit("join_room", roomId);

    const onVoteEvents = (value: any) => {
      setVoteEvents((previous: any[]) => [...previous, value]);
    };

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("vote", onVoteEvents);
    socket.on("join_room", () => null);

    return () => {
      socket.off("connect", () => setIsConnected(true));
      socket.off("disconnect", () => setIsConnected(false));
      socket.off("vote", onVoteEvents);
      socket.off("joined_room", () => null);
    };
  }, []);

  if (error) {
    return <Layout>{error}</Layout>;
  }

  console.log(voteEvents);
  const submitName = () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
    if (name.trim().toLowerCase() === "Host") {
      alert("Please enter a different name");
      return;
    }
    socket.emit("join_room", { roomId, name });
    setReady(true);
  };

  return (
    <Layout>
      <Title>Room: {roomId}</Title>
      <Status isConnected={isConnected} />
      {ready ? (
        <div>
          <div>Votes!</div>
        </div>
      ) : (
        <>
          <input
            className="bg-gray-900 border border-slate-200 p-2 rounded-lg"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={submitName}>
            Click here to join with your name!
          </Button>
        </>
      )}
    </Layout>
  );
};

export default Room;
