import { useState, useEffect } from 'react'

export default function Filtros({ handleChange, handleChangeRange, select, selectRange }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (select.category !== "") {
      setShow(false)
    }
  }, [select]);
  return (
    <>

      <div className={`${show ? "hidden" : "bg-gray text-black fixed top-18 mt-10 lg:hidden"}`} onClick={() => setShow(true)}>
        <button className="mt-2 text-black">
          Filtros
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <div className={`${show ? "lg:w-1/4 w-7/12 fixed z-10 h-48" : "lg:w-1/4 max-lg:hidden h-full"} bg-white mt-64 rounded-md pb-32`}>
        <div className="bg-gray text-black fixed top-28 mt-12">
          <button className="mt-2 text-black lg:hidden" onClick={() => setShow(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-col h-60 ml-[13%] mt-8 max-sm:ml-2">
          <div className="">
            <select
              name="category"
              id=""
              onChange={handleChange}
              className="mb-8 cursor-pointer hover:bg-gray-700 hover:text-white text-black font-serif py-2 px-4 rounded-lg  w-64 shadow-xl block p-4 m-6 
              text-center  text-lg bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0
               focus:border-gray-200 peer"
            >
              <option value="" >Categorias</option>
              <option value="ropa hombre" >Ropa de Hombre</option>
              <option value="ropa mujer" >Ropa de Mujer</option>
              <option value="joyeria" >Joyeria</option>
            </select>
          </div>
          <div>
            <select
              name="rating"
              id=""
              onChange={handleChange}
              className="mb-8 cursor-pointer hover:bg-gray-700 hover:text-white text-black font-serif py-2 px-4 rounded-lg  w-64 shadow-xl block p-4 m-6 
              text-center  text-lg bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0
               focus:border-gray-200 peer"
            >
              <option value="">Clasificacion</option>
              <option value="asc">Ascendente</option>
              <option value="des">Descendente</option>
            </select>
          </div>
          <div>

            <select
              name="price"
              id=""
              onChange={handleChange}
              className="mb-8 cursor-pointer hover:bg-gray-700 hover:text-white text-black font-serif py-2 px-4 rounded-lg  w-64 shadow-xl block p-4 m-6 
              text-center  text-lg bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0
               focus:border-gray-200 peer"
            >
              <option value="">Precio</option>
              <option value="asc">Ascendente</option>
              <option value="des">Descendente</option>
              <option value="range">Rango de Precio</option>
            </select>
            {select.price === "range" && (

              <div className="">

                <div className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                  <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                    <div role="button"
                      className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                      <label htmlFor="vertical-list-react" className="flex items-center w-full px-3 py-2 cursor-pointer">
                        <div className="grid mr-3 place-items-center">
                          <div className="inline-flex items-center">
                            <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="vertical-list-react">

                              <input name="vertical-list" id="vertical-list-react" type="radio"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-solid border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                value="min"
                                checked={selectRange.minprice === 1}
                                onChange={handleChangeRange}
                              />
                              <span

                                className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">

                                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                              </span>
                            </label>
                          </div>
                        </div>

                        <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-gray-600 bg-transparent">

                          1 a 100 $U
                        </p>
                      </label>
                    </div>
                    <div role="button"

                      className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                      <label htmlFor="vertical-list-vue" className="flex items-center w-full px-3 py-2 cursor-pointer">
                        <div className="grid mr-3 place-items-center">
                          <div className="inline-flex items-center">
                            <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="vertical-list-vue">
                              <input name="vertical-list" id="vertical-list-vue" type="radio"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-solid border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"

                                value="medium"
                                checked={selectRange.minprice === 100}
                                onChange={handleChangeRange}
                              />
                              <span

                                className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">

                                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                              </span>
                            </label>
                          </div>
                        </div>

                        <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-gray-400 bg-transparent">

                          100 a 500 $U
                        </p>
                      </label>
                    </div>
                    <div role="button"

                      className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                      <label htmlFor="vertical-list-svelte" className="flex items-center w-full px-3 py-2 cursor-pointer">
                        <div className="grid mr-3 place-items-center">
                          <div className="inline-flex items-center">
                            <label className="relative flex items-center p-0 rounded-full cursor-pointer"
                              htmlFor="vertical-list-svelte">
                              <input name="vertical-list" id="vertical-list-svelte" type="radio"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-solid border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"

                                value="max"
                                checked={selectRange.minprice === 500}
                                onChange={handleChangeRange}
                              />
                              <span

                                className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">

                                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                              </span>
                            </label>
                          </div>
                        </div>

                        <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-gray-400 bg-transparent">

                          500 a 5000 $U
                        </p>
                      </label>
                    </div>
                  </nav>


                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )

}