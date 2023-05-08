import { useState } from "react";
import axios from "axios";
import { HOST } from "@/libs/constant";

export default function Home() {
  const [input, setInput] = useState("");
  const [copy, setCopy] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [col, setCol] = useState(true);

  const generateShort = async (e) => {
    e.preventDefault();
    if (input != "") {
      setCol(true);
      setError(false);
      setCopy("");
      setLoading(true);
      const response = await axios.post("/api", {
        toShort: input,
      });
      if (response.data.status === 404) {
        setCol(false);
          setTimeout(()=>{
              setCol(true)
          },1000)
        setError(true);
        setCopy("");
        setLoading(false);
      } else {
        setCol(true);
        setError(false);
        setLoading(false);
        setCopy(response.data.short);
      }
      setInput("");
    } else {
      setCopy("");
      setCol(false);
          setTimeout(()=>{
              setCol(true)
          },1000)
    }
  };

  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <form onSubmit={(e) => generateShort(e)}>
          {col ? (
            <>
              <input
                placeholder="Enter your url *here*"
                className="w-[300px] h-[50px] border-4 border-black px-2 outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-black h-[50px] text-white px-2 font-[600]"
              >
                Shorten
              </button>
            </>
          ) : (
            <>
              <input
                placeholder="Enter your url *here*"
                className="w-[300px] h-[50px] border-4 border-red-500 px-2 outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-500 h-[50px] text-white px-2 font-[600]"
              >
                Shorten
              </button>
              <br />
              <div className="text-red-500">
                <i className="mr-2 text-red-500 align-middle material-symbols-outlined">error</i>
              Invalid URL
              </div>
            </>
          )}
        </form>
        <div className="text-2xl font-[600] m-4">
          {isLoading ? <h1>Loading...</h1> : null}
          {copy.length === 0 || !col ? null : (
            <div>
              <h1
                onClick={() => navigator.clipboard.writeText(`${HOST}/${copy}`)}
                className="text-3xl font-black cursor-pointer"
              >
                {copy} <i className="font-black material-icons">&#xe3e0;</i>
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
