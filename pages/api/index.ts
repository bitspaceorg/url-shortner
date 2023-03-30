import { prisma } from "@/libs/prisma";
import { random_variable_generate } from "@/libs/random_var";

const handler = async (req,res) => {
    if(req.method==='POST'){
        
    const data = await prisma.urls.create({
        data : {
            short : random_variable_generate(5),
            long : req.body.toShort
        }
    });
    res.json(data)
    }
}
export default handler;
