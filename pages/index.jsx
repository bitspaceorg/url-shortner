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
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-white">
        <form onSubmit={(e) => generateShort(e)} className="flex flex-col justify-center items-center" >
          {col ? (
            <div className="flex flex-row flex-wrap justify-center items-center">
              <input
                placeholder="Enter your url *here*"
                className="w-[270px]  h-[50px] border-4 border-black px-2 outline-none text-xl"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-black h-[50px] text-white px-2 font-[600]  text-xl"
              >
                Shorten
              </button>
            </div>
          ) : (
           <div className="flex flex-col  justify-center items-center">
            <div className="flex flex-row flex-wrap justify-center items-center">
              <input
                placeholder="Enter your url *here*"
                className="w-[270px]  h-[50px] border-4 border-red-500 px-2 outline-none text-xl"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-500 h-[50px]   text-white px-2 font-[600]  text-xl "
              >
                Shorten
              </button>
            </div>
              <br />
              <div className="text-red-500 mt-2">
                <i className="mr-2 text-red-500 align-middle material-symbols-outlined">error</i>
              Invalid URL
              </div>
            </div>
          )}
            <style jsx>
              {`
 
              @media screen and (max-width: 358px) {
                button {
                  width: 270px;
                }
              }
            `}
            </style>
        </form>
        <div className="text-2xl font-[600] m-4">
          {isLoading ? <h1>Loading...</h1> : null}
          {copy.length === 0 || !col ? null : (
            <div>
              <h1
                onClick={() => navigator.clipboard.writeText(`${HOST}/${copy}`)}
                className="text-3xl font-black cursor-pointer text-center mt-4"
              >
                {copy} <i className="font-black material-icons">&#xe3e0;</i>
              </h1>
            </div>
          )}
        </div>
        </div>
    
  );
  
}

