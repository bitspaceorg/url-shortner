import { useState } from "react";
import axios from 'axios';
import {HOST} from "@/libs/constant";

export default function Home() {

    const [input, setInput] = useState("");
    const [copy, setCopy] = useState("");
    const [isLoading, setLoading] = useState<boolean>(false);

    const generateShort = async (e: any) => {

        e.preventDefault();
        setCopy("");
        setLoading(true);
        const response = await axios.post('/api', {
            toShort : input 
        })
        setLoading(false);
        setInput("");
        setCopy(response.data.short);
    }

	return (
        <div className="w-screen h-screen bg-white">
            <div className="flex flex-col items-center justify-center w-full h-full">
                <form onSubmit={(e) => generateShort(e)}>
                    <input placeholder="Enter your url *here*"
                    className="w-[300px] h-[50px] border-4 border-black px-2 outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" className="bg-black h-[50px] text-white px-2 font-[600]">Shorten</button>
                </form>
                <div className="text-2xl font-[600] m-4">
                { isLoading ? <h1>Loading...</h1> : null }
                { copy.length === 0 ? null : 
                    <div>
                        <h1 onClick={() => navigator.clipboard.writeText(`${HOST}/${copy}`)} className="text-3xl font-black cursor-pointer">{copy} <i className="font-black material-icons">&#xe3e0;</i></h1>
                    </div>
                }
                </div>
            </div>
        </div>
	)
}
