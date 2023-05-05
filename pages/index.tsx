import { useState } from "react";
import axios from "axios";
import { HOST } from "@/libs/constant";

export default function Home() {
  const [input, setInput] = useState("");
  const [copy, setCopy] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const generateShort = async (e: any) => {
    setError(false);
    e.preventDefault();
    setCopy("");
    setLoading(true);
    const response = await axios.post("/api", {
      toShort: input,
    });
    if (response.data.status === 404) {
      setError(true);
      setCopy("");
      setLoading(false);
    } else {
      setError(false);
      setLoading(false);
      setCopy(response.data.short);
    }
    setInput("");
  };

  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <form onSubmit={(e) => generateShort(e)}>
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
        </form>
        <div className="text-2xl font-[600] m-4">
          {isLoading ? <h1>Loading...</h1> : null}
          {copy.length === 0 ? null : (
            <div>
              <h1
                onClick={() => navigator.clipboard.writeText(`${HOST}/${copy}`)}
                className="text-3xl font-black cursor-pointer"
              >
                {copy} <i className="font-black material-icons">&#xe3e0;</i>
              </h1>
            </div>
          )}
          {error ? (
            <div>
              <i className="text-4xl font-black align-middle material-icons">
                link_off
              </i>
              <span> </span>Broken URL
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
