import styles from "./pagination.module.css"
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { increment, decrement } from '@/redux/features/countPageSlice'
//import  NumberPage from '../numberPage/NumberPage'

const Pagination = ({ pageAmount }) => {
    console.log(pageAmount);
    const actualPage = useAppSelector(state => state.countPageReducer.page)
    const dispatch = useAppDispatch()
    /* const nextPage = () => {
        setPage(page + 1)
    }
    const previusPage = () => {
        setPage(page - 1)
    } */
    console.log(actualPage);
    const numeracion = [];
    let i = 1
    while (i <= pageAmount) {
        numeracion.push(i)
        i++
    }

    return (pageAmount > 1) && (

        <div className="flex justify-center -mb-28 mt-4 gap-2.5">
            <button
                disabled={actualPage === 1 || actualPage < 1}
                onClick={() => {
                    dispatch(decrement())
                }}
                className={styles.button}>
                <i className="ri-arrow-left-circle-fill"></i>
            </button>
            {/* {numeracion.map((e) => {
                return <NumberPage 
                    key = {e}    
                    number= {e}
                    page = {page}
                    setPage = {setPage}
                />})} */}
            <div className=" block text-2xl bg-blue color-white">
                {actualPage} de {pageAmount}
            </div>
            <button
                disabled={actualPage === Math.ceil(pageAmount) || actualPage > Math.ceil(pageAmount)}
                onClick={() => {
                    dispatch(increment())
                }}
                className={styles.button}><i className="ri-arrow-right-circle-fill"></i>
            </button>
        </div>
    )

}
export default Pagination
