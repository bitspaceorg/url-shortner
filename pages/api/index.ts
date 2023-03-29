import { prisma } from "@/libs/prisma";
const handler = async (req,res) => {
    if(req.method==='POST'){
        console.log(req.body.toShort);
    const data = await prisma.urls.create({
        data : {
            short : req.body.toShort,
            long : "wthsdfssdddr"
        }
    });
    res.json(data)
    }
}
export default handler;
