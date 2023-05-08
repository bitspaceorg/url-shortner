import { useEffect, useState } from "react";
import { prisma } from "../libs/prisma";

export default function Redirect( p ) {

  const [isValid, setValid] = useState(false);

  useEffect(() => {
    if (!(p.data == null)) {
      setValid(true);
      window.location.replace("https://" + p.data.long);
    } else {
      setValid(false);
        setTimeout(()=>{
            window.location.replace("https://urlshortener.bitspace.org.in");
        },2000)
    }
  },[p.data]);

  return (
    <div className="w-screen h-screen">
      {isValid ? (
        <div>Redirecting {p.data.long}</div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          The link you entered is not available
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = async ({ res, req, resolvedUrl }) => {
  const url = resolvedUrl.slice(1);
  const data = await prisma.urls.findUnique({
    where: {
      short: url,
    },
  });
  return {
    props: { data },
  };
};
