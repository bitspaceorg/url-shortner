import { prisma } from "@/libs/prisma";
const handler = async (req,res) => {
    if(req.method==='POST'){
        console.log(req.body.toShort);
        const ra = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let gen = ""
        for(let i = 0 ; i<5;i++)gen+=ra[Math.floor(Math.random() * ra.length)];
        
    const data = await prisma.urls.create({
        data : {
            short : req.body.toShort,
            long : gen
        }
    });
    res.json(data)
    }
}
export default handler;
