import {data} from "@/libs/data"
import { useRouter } from "next/router"

export default function url() {
	const router = useRouter()
	const curr = router.query.url
	const v = data.find(i => i.short === curr)
	if(!(v === undefined)){
    window.location.assign(v.long)
		console.log("HELLO")
	} else {
		return (
			<>
			  LINK 404	
			</>
	)
	}
}
