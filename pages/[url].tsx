import { useEffect } from "react";
import { prisma } from "../libs/prisma"
import { useRouter } from "next/router"
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export default function Redirect (p:InferGetServerSidePropsType<typeof getServerSideProps>){

	useEffect(()=>{
		  window.location.replace("https://"+p.data.long);
	}, []);
	return (
    <>Redirecting to {p.data.long}</>
	)
}

export const getServerSideProps : GetServerSideProps = async({res, req, resolvedUrl}) => {
	const url = resolvedUrl.slice(1);
	const data = await prisma.urls.findUnique({
		where : {
			short :url ,
		}
	})
	console.log(data)
	return {
	  props: {data}, 
	}
  }

