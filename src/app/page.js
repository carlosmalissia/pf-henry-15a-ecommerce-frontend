"use client"

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartData } from "@/redux/features/cart";

import styles from "./page.module.css";
import "remixicon/fonts/remixicon.css";

import Product from "@/Components/Product/Product";
import Favorites from "@/Components/Favorites/Favorites";

export default function Home() {
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.cartReducer.cartItems);

  /*=============== SHOW SCROLL UP ===============*/
  useEffect(() => {
    const scrollUp = () => {
      const scrollUp = document.getElementById("scroll-up");
      if (!scrollUp) return;
      // When the scroll is higher than 150 viewport height, add the show-scroll class to the a tag with the scrollup class
      window.scrollY >= 150
        ? scrollUp.classList.add(styles.show_scroll)
        : scrollUp.classList.remove(styles.show_scroll);
    };
    window.addEventListener("scroll", scrollUp);

    // Cargar datos del carrito desde localStorage
    dispatch(getCartData());
  }, []);

  return (
    <>
      {/* ==================== MAIN ====================*/}
      <main className="main">
        {/*==================== Productos ====================*/}
        <section className="py-12 px-4 xl:py-24 xl:px-8" id="product">
          <Product />
        </section>
        {/*==================== Favoritos ====================*/}
        <section className="py-12 px-4 xl:py-24 xl:px-8" id="favorites">
          <Favorites />
        </section>
      </main>

      {/*========== SCROLL UP ==========*/}
      <a href="#" className={styles.scrollup} id="scroll-up">
        <i className="ri-arrow-up-line" />
      </a>
    </>
  );
}