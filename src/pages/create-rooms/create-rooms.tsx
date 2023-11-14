import { useState } from "react";
import { uid } from "uid";
import QRCode from "qrcode";
import Button from "../../components/button";
import Layout from "../../components/layout";
import Title from "../../components/title";
import { Link } from "react-router-dom";

const CreateRooms = () => {
  const [url, setUrl] = useState<string>("");

  const generateRoomId = async () => {
    try {
      const newId = uid(9);
      const URL = `http://localhost:5173/${newId}`;
      await QRCode.toCanvas(
        document?.getElementById("qr-container"),
        URL,
        (error) => {
          if (error) console.error(error);
        }
      );
      setUrl(URL);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Title>Create Room</Title>
      <div className="flex flex-col gap-2">
        <p className="text-gray-400">
          {url
            ? "You are ready to launch your room!"
            : "Create a room and invite your friends to play with you."}
        </p>
        <div>
          {url ? (
            <Button onClick={() => console.log("Launch room!")}>
              Launch Room!
            </Button>
          ) : (
            <Button onClick={generateRoomId}>
              Click here to generate a room
            </Button>
          )}
        </div>
        <canvas id="qr-container"></canvas>
        {url && (
          <Link className="text-slate-200 underline hover:text-white" to={url}>
            {url}
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default CreateRooms;
