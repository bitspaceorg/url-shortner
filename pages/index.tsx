import { useState } from "react";
import axios from 'axios';

let tocopy = true;

const Button = ({submitted,tocopy}) => {
        if(!(submitted)){
        return(
        <>
        <span>{tocopy}</span>
        <button onClick={()=>navigator.clipboard.writeText(tocopy)}>Copy url</button>
        </>
        )
        }
}

export default function Home() {
    const [input,setInput] = useState("");
    const [copy,setCopy] = useState("");
    const generateShort = async (e) => {
        e.preventDefault();
        console.log(input);

        const response = await axios.post('/api',{
            toShort : input 
        })
        tocopy = false;
        setInput("");
       setCopy(response.data.long);
    }
	return (
    <>
        <div>
        <form onSubmit={(e)=>generateShort(e)}>
            <input placeholder="Enter your url *here*"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            />
            <button type="submit">Shorten</button>
        </form>
        </div>
            <Button
                submitted = {tocopy}
                tocopy = {copy}
            ></Button>
    </>
	) 
}
