import { prisma } from "@/libs/prisma";
import { random_variable_generate } from "@/libs/random_var";

const handler = async (req,res) => {
    if(req.method==='POST'){  
			let input = req.body.toShort
			if ( input.slice(0,7) == 'http://' ) input = input.slice(7)
			if ( input.slice(0,8) == 'https://' ) input = input.slice(8)
    	const data = await prisma.urls.create({
        	data : {
          	  short : random_variable_generate(5),
        	    long : input
      	  }
    	});
    	res.json(data)
    }
}
export default handler;
