"use client";
import Card from "@/Components/Card/Card";
import React, { useState } from "react";
import Pagination from "@/Components/Pagination/Pagination";
export default function Cards(props) {
  //Paginado
  const [page, setPage] = useState(1); //page es la pagina actual
  const [pageSize, setPageSize] = useState(12);
  const pageAmount = Math.ceil(props.data.length / pageSize); // cantidad de pag s/cant de cards

  return (
    <div className="flex flex-col mb-16 xl:mb-0">
      <div
        className={`grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:w-[70vw] lg:w-[60vw]   mx-auto justify-end`}
      >
        {props?.data
          .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
          .map((e, index) => {
            {
              console.log(e.title);
            }
            return (
              <Card className="border border-bgred rounded-md p-4"
                key={index}
                id={e.id}
                image={e.image}
                title={e.title}
                price={e.price}
              />
            );
          })}
      </div>
      <div className="text-center">
        <Pagination page={page} setPage={setPage} pageAmount={pageAmount} />
      </div>
    </div>
  );
}
