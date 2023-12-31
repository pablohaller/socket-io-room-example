import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CreateRooms from "./pages/create-rooms/create-rooms.tsx";
import Room from "./pages/room/room.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateRooms />,
  },
  {
    path: "/room",
    element: <Room />,
    children: [
      {
        path: "/room/:roomId",
        element: <Room />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
