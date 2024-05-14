import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import logo from "../assets/MusicLabwhite_LOGO.png";
import textLogo from "../assets/header/Text_logo.png";
import axios from "axios";

import { toast } from "sonner";
import { useEffect, useState } from "react";

const InviteRoute = () => {
  // Get the room ID from the URL
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { roomId } = JSON.parse(decodeURI(atob(id)));

  /**
   * @type {[import("../types/user").RoomType]}
   */
  const [room, setRoom] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/invite/" + id);
      toast.warning("You must login to accept the invite.");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!roomId || !isAuthenticated) return;

    axios //
      .get(`/room/${roomId}`)
      .then((res) => setRoom(res.data));
  }, [roomId, user, isAuthenticated]);

  // Call the API to join the room
  const joinRoom = () => {
    try {
      axios //
        .post(`/room/${roomId}/join`)
        .then((res) => {
          console.log(res.data);
          toast.success("Successfully joined the room");
          navigate("/home");
        });
    } catch (error) {
      console.error("❌ Error joining room:", error);
    }
  };

  return (
    <section className="min-h-screen h-full grid place-items-center">
      <div className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900 rounded">
        <header>
          <Link to="/" className="flex items-center">
            <img
              className="w-auto h-12 sm:h-16"
              src={logo}
              alt="MusicLab Logo"
            />
            <img
              className="w-auto h-8 sm:h-10"
              src={textLogo}
              alt="MusicLab Logo"
            />
          </Link>
        </header>

        <main className="mt-8">
          <h2 className="text-gray-700 dark:text-gray-200">
            Hi {user?.username ?? "user"},
          </h2>

          <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
            You have been invited you to join the team on{" "}
            <span className="font-semibold ">{room?.name ?? "MusicLab"}</span>.
          </p>

          <button
            className="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            onClick={joinRoom}
          >
            Accept the invite
          </button>

          <p className="mt-8 text-gray-600 dark:text-gray-300">
            Thanks, <br />
            MusicLab team
          </p>
        </main>

        <footer className="mt-8">
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} MusicLab. All Rights Reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default InviteRoute;
