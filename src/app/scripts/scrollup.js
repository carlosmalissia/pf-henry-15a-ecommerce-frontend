const scrollUp = () => {
    const scrollUp = document.getElementById("scroll-up");
    if (!scrollUp) return;
    // When the scroll is higher than 150 viewport height, add the show-scroll class to the a tag with the scrollup class
    window.scrollY >= 150
      ? scrollUp.classList.add(styles.show_scroll)
      : scrollUp.classList.remove(styles.show_scroll);
  };
  window.addEventListener("scroll", scrollUp);

export default scrollUp