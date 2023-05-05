import { useEffect, useState } from "react";
import { prisma } from "../libs/prisma";
import { useRouter } from "next/router";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Redirect( p: InferGetServerSidePropsType<typeof getServerSideProps> ) {

  const [isValid, setValid] = useState<boolean>(false);

  useEffect(() => {
    if (!(p.data == null)) {
      setValid(true);
      window.location.replace("https://" + p.data.long);
    } else {
      setValid(false);
    }
  }, []);

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

export const getServerSideProps: GetServerSideProps = async ({ res, req, resolvedUrl }) => {
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
