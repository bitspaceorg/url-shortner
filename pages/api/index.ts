import { prisma } from "@/libs/prisma";
import { random_variable_generate } from "@/libs/random_var";
import axios from "axios"

const handler = async (req:any, res:any) => {

  if (req.method === "POST") {
    let input = req.body.toShort;
    if (input.slice(0, 7) == "http://") input = input.slice(7);
    if (input.slice(0, 8) == "https://") input = input.slice(8);

    await fetch ("https://" + input)
      .then(async (response: any) => {
        if (response.ok || response.status == 999) {
          const v = await prisma.urls.findUnique({
            where: {
              long: input,
            },
          });
          if (v === undefined || v === null) {
            const data = await prisma.urls.create({
              data: {
                short: random_variable_generate(5),
                long: input,
              },
            });
            res.json(data);
          } else {
            res.json({
              short: v.short,
            });
          }
        }
        else res.send({ status: 404 })
      })
      .catch((e: any) => {
        res.send({ status: 404 });
      });

  }

};
export default handler;
