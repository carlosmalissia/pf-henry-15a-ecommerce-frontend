import styles from './footer.module.css'

export default function Home() {
    return (
        <div className={`${styles.footer__container} ${styles.container} ${styles.grid}`}>
            <div className={`${styles.footer__content} ${styles.grid}`}>
                <div>
                <a href="#" className={styles.footer__logo}>
                    Henrucci
                </a>
                <p className={styles.footer__description}>
                    La moda y mejor calidad <br />
                    al alcance de un solo click.
                </p>
                </div>
                <div className={`${styles.footer__data} ${styles.grid}`}>
                <div>
                    <h3 className={styles.footer__title}>Acerca de</h3>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        Acerca de nosotros
                    </a>
                    </ul>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        Caracteristicas
                    </a>
                    </ul>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        News &amp; Blog
                    </a>
                    </ul>
                </div>
                <div>
                    <h3 className={styles.footer__title}>Compania</h3>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        FAQs
                    </a>
                    </ul>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        Historia
                    </a>
                    </ul>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        Testimonios
                    </a>
                    </ul>
                </div>
                <div>
                    <h3 className={styles.footer__title}>Contactos</h3>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        Call Center
                    </a>
                    </ul>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        Centro de soporte
                    </a>
                    </ul>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        Contáctenos
                    </a>
                    </ul>
                </div>
                <div>
                    <h3 className={styles.footer__title}>Soporte</h3>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        Politica de privacidad
                    </a>
                    </ul>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        Terms &amp; Services
                    </a>
                    </ul>
                    <ul className={styles.footer__links}>
                    <a href="#" className={styles.footer__link}>
                        Medios de pagos
                    </a>
                    </ul>
                </div>
                </div>
            </div>
            <div className={styles.footer__group}>
                <div className={styles.footer__social}>
                <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className={styles.footer__social_link}
                >
                    <i className="ri-facebook-line" />
                </a>
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    className={styles.footer__social_link}
                >
                    <i className="ri-instagram-line" />
                </a>
                <a
                    href="ttps://twitter.com/"
                    target="_blank"
                    className={styles.footer__social_link}
                >
                    <i className="ri-twitter-line" />
                </a>
                <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    className={styles.footer__social_link}
                >
                    <i className="ri-youtube-line" />
                </a>
                </div>
                <span className={styles.footer__copy}>
                © Copyright GenioTotal. Todos los derechos reservados
                </span>
            </div>
            </div>
    )

}