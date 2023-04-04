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
		// if ( req.method === 'GET' ) {
		// 	console.log(req.query)
		// 	const { url } = req.query
		// 	console.log(url)
			// const data = await prisma.urls.findMany({
			// 	where: {
			// 		short: url 
			// 	}
			// })
		// 	res.status(200)
		// }
}
export default handler;
