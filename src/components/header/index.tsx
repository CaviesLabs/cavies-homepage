import { FC, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import skrolltop from "skrolltop";
import classnames from "classnames";
import styles from "./index.module.scss";

interface MenuItem {
  title: string;
  slug: string;
}

const Header: FC = () => {
  const [curSlug, setCurSlug] = useState<string>("#about-us");
  const router = useRouter();
  const menuData = useMemo<MenuItem[]>(
    () => [
      { title: "About Us", slug: "#about-us" },
      { title: "Objectives", slug: "#objectives" },
      { title: "Hamsterbox", slug: "#hamsterbox" },
    ],
    []
  );

  const handleClickMobileMenu = () => {
    const toggleButton = document.getElementById("mobile-toggle");
    const mobileMemu = document.getElementById("mobile-menu");
    toggleButton?.classList?.toggle(styles.active);
    mobileMemu?.classList?.toggle(styles.active);
  };

  const handleOnClickMenu = (slug: string) => {
    setCurSlug(slug);

    const element = document.getElementById(slug.split("#")[1]);
    element !== null &&
      skrolltop.scrollTo({
        element: element,
        to: 800,
        duration: 800,
      });
  };

  useEffect(() => {
    if (router.asPath.includes("#")) {
      setCurSlug(`#${router.asPath.split("#")[1]}`);
    }
  }, []);

  useEffect(() => {
    const header = document.getElementById("app-header");
    const className = "scrolled-header";
    window.onscroll = () => {
      if (
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        if (!header?.classList.contains(className)) {
          header?.classList.add("scrolled-header");
        }
      } else {
        if (header?.classList.contains(className)) {
          header?.classList.remove("scrolled-header");
        }
      }
    };
  }, []);

  return (
    <div
      className="app-header py-[25px] px-[40px] flow-root border-solid-black border-b-[1px]"
      id="app-header"
    >
      <div className="float-left logo-wrapper">
        <img src="/assets/images/logo.png" className="w-[95px] md:w-[149px]" />
      </div>
      <div className="hidden md:block float-right memu-wrapper">
        {
          <ul className="menu-container">
            {menuData.map((item, index) => (
              <li
                key={`desktop-menu-item-${index}`}
                className="float-left md:mr-[80px] lg:mr-[108px]"
                onClick={() => handleOnClickMenu(item.slug)}
              >
                <a
                  href={item.slug}
                  className={classnames(
                    "text-[18px] text-grey font-normal uppercase",
                    {
                      "text-black": item.slug === curSlug,
                    }
                  )}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        }
      </div>
      <div
        className={classnames(styles["toggle-button"], "block md:hidden")}
        id="mobile-toggle"
        onClick={() => handleClickMobileMenu()}
      >
        <span className={classnames(styles.bar, styles.top)}></span>
        <span className={classnames(styles.bar, styles.middle)}></span>
        <span className={classnames(styles.bar, styles.bottom)}></span>
      </div>
      <div className={classnames(styles["mobile-nav"])}>
        <div
          className={classnames(styles["menu-container"], "pt-10")}
          id="mobile-menu"
        >
          <ul className={styles["mobile-menu"]}>
            {menuData.map((item: any, index: number) => (
              <li key={`mobile-menu-${index}`}>
                {/* <a
                  href={item.slug}
                  onClick={() => (window.location.href = item.slug)}
                >
                  {item.title}
                </a> */}
                <a
                  className="mennu-anim-button mt-[30px] md:mt-[60px]"
                  href={item.slug}
                  onClick={() => (window.location.href = item.slug)}
                >
                  <div className="hidden-layer"></div>
                  <button className="shown-layer">
                    <h3 className="uppercase text-[14px] md:text-[32px]">
                      {item.title}
                    </h3>
                  </button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
