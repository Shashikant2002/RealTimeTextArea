import { useEffect, useRef, useState } from "react";
import "./App.css";
import Loading from "./Loading";
import axios from "axios";
import { baseUrl } from "../config";
import { initSocketMain } from "./sockerConnection";

function App() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const testServer = async () => {
    try {
      const url = `${baseUrl}`;
      const res = await axios.get(url);

      if (res?.data?.success) {
        alert("Done !!!!!!!!!!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    testServer();
  }, []);

  const socketRef = useRef(null);

  const initSocket = async () => {
    socketRef.current = await initSocketMain();

    socketRef.current.on("connect_error", (err) => {
      return console.log(err);
    });
    socketRef.current.on("connect_failed", (err) => {
      return console.log(err);
    });

    socketRef.current.on("DATA", ({data, id}) => {
      setInput(data, id);
      console.log(data);
      
    });
  };

  useEffect(() => {
    initSocket();
  }, []);

  const sendChanges = (text) => {
    socketRef.current.emit("CHANGE", text);
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      sendChanges(input);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [input]);

  return (
    <>
      {loading ? <Loading /> : ""}
      <textarea
        name=""
        id=""
        style={{
          width: "900px",
          height: "70vh",
          fontSize: "20px",
          padding: "20px",
          border: "2px solid gray",
          background: "#ffffff14",
          outline: "none",

          borderRadius: 10,
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
    </>
  );
}

export default App;
