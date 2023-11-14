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
  const [activityId, setActivityId] = useState<any>(-1);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    if (!roomId) {
      setError("Room not found");
      return;
    }

    const onActivitySet = (value: any) => {
      console.log(value);
      setActivityId(value);
    };

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("activity_set", onActivitySet);

    return () => {
      socket.off("connect", () => setIsConnected(true));
      socket.off("disconnect", () => setIsConnected(false));
      socket.on("activity_set", onActivitySet);
    };
  }, []);

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

  const vote = (vote: number) => {
    socket.emit("vote", { roomId, activityId, vote });
    setHasVoted(false);
  };

  useEffect(() => {
    if (activityId !== -1) {
      setHasVoted(true);
    }
  }, [activityId]);

  if (error) {
    return <Layout>{error}</Layout>;
  }

  console.log("hasVoted", hasVoted, hasVoted ? "yes" : "no");
  return (
    <Layout>
      <Title>Room: {roomId}</Title>
      <Status isConnected={isConnected} />
      <p>{JSON.stringify(activityId)}</p>
      {ready ? (
        <div>
          {!hasVoted ? (
            <div>Nothing to vote</div>
          ) : (
            <div>
              <Button onClick={() => vote(1)}>😄</Button>
              <Button onClick={() => vote(0)}>😐</Button>
              <Button onClick={() => vote(-1)}>😞</Button>
            </div>
          )}
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
