"use client";
import Card from "@/Components/Card/Card";
import React, { useState } from "react";
import Pagination from "@/Components/Pagination/Pagination";
export default function Cards(props) {
  //Paginado
  console.log(props)
  //const pageAmount = Math.ceil(props.data.length / props.pageSize); // cantidad de pag s/cant de cards

  return (
    <div className="flex flex-col mb-16 xl:mb-0">
      <div
        className={`grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:w-[70vw] lg:w-[60vw]   mx-auto justify-end`}
      >
        {props?.data

          .map((e, index) => {
            {
              console.log(e.title);
            }
            return (
              <Card className="border border-bgred rounded-md p-4"
                key={index}
                _id={e._id}
                image={e.image}
                title={e.title}
                price={e.price}
                category={e.category.name}
              />
            );
          })}
      </div>
      <div className="text-center">
        <Pagination page={props.page} setPage={props.setPage} pageAmount={props.pageAmount} />
        {console.log(props)}
      </div>
    </div>
  );
}
