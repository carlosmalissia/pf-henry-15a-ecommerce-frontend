"use client";

import React from "react";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

//import CartCounter from "@/components/Cart/CartCounter/CartCounter";
//import { useSession } from "next-auth/react";
import Ingresar from "../Ingresar/Ingresar";

//import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
//import { usePathname } from "next/navigation";

//-------iconos---//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faShoppingBag,
  faUsers,
  faUserShield,

  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from "@/redux/hooks";
import { getlogindata } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import BotonPerfil from "../BotonPerfil/BotonPerfil";
import { useSession } from "next-auth/react";

const home = <FontAwesomeIcon icon={faHome} />;
const favorite = <FontAwesomeIcon icon={faHeart} />;
const productos = <FontAwesomeIcon icon={faShoppingBag} />;
const user = <FontAwesomeIcon icon={faUsers} />;
const admin = <FontAwesomeIcon icon={faUserShield} />;
const cart = <FontAwesomeIcon icon={faCartShopping} />;

function NavBar() {




  const userData = useAppSelector((state) => state.loginReducer.user);
  console.log("userData", userData);
  const userName = userData?.name;
  const dispatch = useDispatch();
  const { status } = useSession();


  /* const pathname = usePathname();
  if (pathname === "/AdminDashboard") return; */
  useEffect(() => {



    /*=============== SHOW MENU ===============*/
    const navMenu = document.getElementById("nav-menu"),
      navContainer = document.getElementById("header"),
      navToggle = document.getElementById("nav-toggle"),
      carrito = document.getElementById("carrito"),
      navClose = document.getElementById("nav-close");
    /*===== MENU SHOW =====*/
    /* Validate if constant exists */
    if (navToggle) {
      navToggle.addEventListener("click", () => {
        navMenu?.classList.add(styles.show_menu);
        navContainer?.classList.add(styles.expanded);
        if (navToggle && window.innerWidth < 1023)
          navToggle.style.display = "none";
      });
    }

    /*===== MENU HIDDEN =====*/
    /* Validate if constant exists */
    if (navClose) {
      navClose.addEventListener("click", () => {
        navMenu?.classList.remove(styles.show_menu);
        navContainer?.classList.remove(styles.expanded);
        if (navToggle && window.innerWidth < 1023)
          navToggle.style.display = "flex";
      });
    }

    /*=============== REMOVE MENU MOBILE ===============*/
    const navLink = document.querySelectorAll(`.${styles.nav__link}`);
    const linkAction = () => {
      // When we click on each nav__link, we remove the show-menu class
      navMenu?.classList.remove(styles.show_menu);
      navContainer?.classList.remove(styles.expanded);
      if (navToggle && window.innerWidth < 1023)
        navToggle.style.display = "flex";
    };
    carrito?.addEventListener("click", linkAction);
    navLink.forEach((n) => n.addEventListener("click", linkAction));

    window.addEventListener("resize", () => {
      window.innerWidth > 1023
        ? navToggle && (navToggle.style.display = "none")
        : navToggle && (navToggle.style.display = "flex");
    });

    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
    const sections = document.querySelectorAll("section[id]");

    const scrollActive = () => {
      const scrollY = window.pageYOffset;
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute("id"),
          sectionsClass = document.querySelector(
            "#nav-menu a[href='#" + sectionId + "']"
          );
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          sectionsClass?.classList.add(styles.active_link);
        } else {
          sectionsClass?.classList.remove(styles.active_link);
        }
      });
    };
    window.addEventListener("scroll", scrollActive);
  }, []);

  //items del carrito
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemsCount(count);
    dispatch(getlogindata());
  }, [cartItems]);


  /* const { data: session, status } = useSession(); */
  return (
    <header className={styles.header} id="header">
      <nav className={`${styles.nav} ${styles.container}`}>
        <a href="/#" className="text-2xl">
          Henrucci
        </a>
        <div className={styles.nav__menu} id="nav-menu">
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <a
                href="/#product"
                className={`${styles.nav__link} ${styles.active_link}`}
              >
                {home} Inicio
              </a>
            </li>

            <li className={styles.nav__item}>
              <a href="/#favorites" className={styles.nav__link}>
                {favorite} Favoritos
              </a>
            </li>
            <li className={styles.nav__item}>
              {/* <a href="/#product" className="nav__link relative text-title-color text-second-font font-medium hover:text-title-color-hover hover:after-width-70 active:after-width-70"> */}

              <Link href="/#product" className={styles.nav__link}>
                {productos} Productos
              </Link>
            </li>
            <Link href="/about" className={styles.nav__link}>
              {user} Quienes somos
            </Link>

            {/* este es mi login */}
            <li className={styles.nav__link}>
              {userName && status === 'unauthenticated' ? (
                <BotonPerfil />
              ) : (
                <Ingresar />
              )}
            </li>

            <li className={styles.nav__item}>
              <Link href="/AdminDashboard" className={styles.nav__link}>
                {admin} Admin
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/cartDetail" className={styles.nav__link}>
                {cart} <span>{cartItemsCount}</span>
              </Link>
            </li>
          </ul>
          {/*Close button*/}
          <div className={styles.nav__close} id="nav-close">
            <i className="ri-close-line" />
          </div>
        </div>
        {/*Toggle button*/}
        <div className={styles.nav__toggle + " z-[103]"} id="nav-toggle">
          <i className="ri-menu-fill" />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;