import { useState } from "react";
import axios from "axios";
import { HOST } from "@/libs/constant";

export default function Home() {
  const [input, setInput] = useState("");
  const [copy, setCopy] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateShort = async (e) => {
    e.preventDefault();
    if (input.includes("urlshortener.bitspace.org.in")) {
      setError("Already Shortened");
      setTimeout(() => {
        setError("");
      }, 1000);
      setInput("");
      setCopy("");
      setLoading(false);
      return;
    }
    if (input != "") {
      setError("");
      setCopy("");
      setLoading(true);
      const response = await axios.post("/api", {
        toShort: input,
      });
      if (response.data.status === 404) {
        setError("Not Found");
        setTimeout(() => {
          setError("");
        }, 1000);
        setCopy("");
        setLoading(false);
      } else {
        setError("");
        setLoading(false);
        setCopy(response.data.short);
      }
      setInput("");
    } else {
      setCopy("");
      setError("Enter Something");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  let color = error === "" ? "black" : "red-500";
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <form onSubmit={(e) => generateShort(e)}>
        <div className="flex flex-row flex-wrap items-center justify-center">
          <input
            placeholder="Enter your url *here*"
            className={
              error === ""
                ? "w-[270px]  h-[50px] border-4 px-2 outline-none text-xl border-black"
                : "w-[270px]  h-[50px] border-4 px-2 outline-none text-xl border-red-500"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className={
              error === ""
                ? "bg-black h-[50px] text-white px-2 font-[600] text-xl"
                : "bg-red-500 h-[50px] text-white px-2 font-[600] text-xl"
            }
          >
            shorten
          </button>
        </div>
      </form>

      <style jsx>
        {`
          @media screen and (max-width: 358px) {
            button {
              width: 270px;
            }
          }
        `}
      </style>

      <div className="h-6 font-[600] m-4">
        {isLoading && (
          <h1 className="text-3xl font-black text-center">Loading...</h1>
        )}

        {error !== "" && (
          <h1 className="mr-2 text-red-500 ">
            {" "}
            <i className="align-middle material-symbols-outlined">error</i>{" "}
            {error}
          </h1>
        )}

        {copy.length === 0 || !(error === "") ? null : (
          <h1
            onClick={() => navigator.clipboard.writeText(`${HOST}/${copy}`)}
            className="text-3xl font-black text-center cursor-pointer"
          >
            {copy} <i className="font-black material-icons">&#xe3e0;</i>
          </h1>
        )}
      </div>
    </div>
  );
}
