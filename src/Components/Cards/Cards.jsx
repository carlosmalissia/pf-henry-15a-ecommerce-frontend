"use client";
import Card from '@/Components/Card/Card'
import React, { useState } from "react";
import Pagination from "@/Components/Pagination/Pagination";

export default function Cards(props) {
  //Paginado
  const [page, setPage] = useState(1); //page es la pagina actual
  const [pageSize, setPageSize] = useState(4);
  const pageAmount = Math.ceil(props.data.length / pageSize); // cantidad de pag s/cant de cards
  
  return  (
    
    <div className="mb-16 xl:mb-0">
      <div className="flex justify-center items-center flex-wrap w-[90vw] my-4 mx-auto">
        {props?.data
          .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
          .map((e, index) => {
            {console.log(e.title)}
               return (  
                  
                <Card
                  key={index}
                  id={e.id}
                  images={e.images[0]}
                  title={e.title}
                  price={e.price}
                />
              ) 
            }  
          )
        }
      </div>
      <div className="text-center">
        <Pagination page={page} setPage={setPage} pageAmount={pageAmount} />
      </div>
    </div>
  ) 
}