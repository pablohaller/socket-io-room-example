/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { uid } from "uid";
import { Link } from "react-router-dom";
import QRCode from "qrcode";
import Button from "../../components/button";
import Layout from "../../components/layout";
import Title from "../../components/title";
import { socket } from "../../socket/client";
import Status from "../../components/status";
import Host from "../../components/host";

const CreateRooms = () => {
  const [url, setUrl] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [events, setEvents] = useState<any>([]);
  const [isConnected, setIsConnected] = useState<boolean>(socket?.connected);

  useEffect(() => {
    const onEvents = (value: any) => {
      console.log("Event");
      setEvents((previous: any[]) => [...previous, value]);
    };

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("vote", onEvents);
    socket.on("joined_room", onEvents);

    return () => {
      socket.off("connect", () => setIsConnected(true));
      socket.off("disconnect", () => setIsConnected(false));
      socket.off("vote", onEvents);
      socket.off("joined_room", onEvents);
    };
  }, []);

  const generateRoomId = async () => {
    try {
      const newId = uid(9);
      const URL = `http://localhost:5173/room/${newId}`;
      await QRCode.toCanvas(
        document?.getElementById("qr-container"),
        URL,
        (error) => {
          if (error) console.error(error);
        }
      );
      socket.emit("join_room", { roomId: newId, name: "Host" });
      setUrl(URL);
      setRoomId(newId);
    } catch (err) {
      console.error(err);
    }
  };

  const launchGame = () => {
    // navigate(`/room/${roomId}?isHost=true`);
  };

  return (
    <Layout>
      <div className="flex w-full items-start">
        <div className="w-2/5">
          <Title>Create Room</Title>
          <Status isConnected={isConnected} />
          <div className="flex flex-col gap-2 ">
            <p>Room ID: {roomId}</p>
            <p className="text-gray-400">
              {url
                ? "You are ready to launch your room!"
                : "Create a room and invite your friends to play with you."}
            </p>
            <div>
              {url ? (
                <Button onClick={launchGame}>Launch game!</Button>
              ) : (
                <Button onClick={generateRoomId}>
                  Click here to generate a room
                </Button>
              )}
            </div>
            <canvas id="qr-container"></canvas>
            {roomId && (
              <Link
                className="text-slate-200 underline hover:text-white"
                to={url}>
                {url}
              </Link>
            )}
          </div>
        </div>
        {roomId && <Host events={events} />}
      </div>
    </Layout>
  );
};

export default CreateRooms;
