"use client";

import styles from "./page.module.css";
import "remixicon/fonts/remixicon.css";
import { useEffect } from "react";
//Importando componentes
import Product from "@/Components/Product/Product";
import Favorites from "@/Components/Favorites/Favorites";
import Footer from "@/Components/Footer/Footer"
export default function Home() {
  
    useEffect(()=>{
      /*=============== SHOW SCROLL UP ===============*/
      const scrollUp = () => {
          const scrollUp = document.getElementById("scroll-up");
          if (!scrollUp) return;
          // When the scroll is higher than 150 viewport height, add the show-scroll class to the a tag with the scrollup class
          window.scrollY >= 150
            ? scrollUp.classList.add(styles.show_scroll)
            : scrollUp.classList.remove(styles.show_scroll);
        };
        window.addEventListener("scroll", scrollUp);
        
    },[])
   
    return (
      <>
        {/* ==================== MAIN ====================*/}
        <main className="main" /* onClick={handleClick} */>
          
          {/*==================== Productos ====================*/}
          <section className="py-12 px-4 xl:py-24 xl:px-8" id="product">
            <Product />
          </section>
          {/*==================== Favoritos ====================*/}
          <section className="py-12 px-4 xl:py-24 xl:px-8" id="favorites">
            <Favorites />
          </section>
          
        </main>
        {/*==================== FOOTER ====================*/}
        <footer className="bg-neutral-900 p-10">
              <Footer />
          </footer>
          {/*========== SCROLL UP ==========*/}
          <a href="#" className={styles.scrollup} id="scroll-up">
              <i className="ri-arrow-up-line" />
          </a>
      </>
    );
  
}
