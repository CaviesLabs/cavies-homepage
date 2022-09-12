import { FC, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
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

  const handleClickMobileMenu = (e: any) => {
    const toggleButton = document.getElementById("mobile-toggle");
    const mobileMemu = document.getElementById("mobile-menu");
    toggleButton?.classList?.toggle(styles.active);
    mobileMemu?.classList?.toggle(styles.active);
  };

  useEffect(() => {
    if (router.asPath.includes("#")) {
      setCurSlug(`#${router.asPath.split("#")[1]}`);
    }
  }, []);

  return (
    <div className="app-header py-[25px] px-[40px] flow-root border-solid-black border-b-[1px]">
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
                onClick={() => setCurSlug(item.slug)}
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
        className={styles["toggle-button"]}
        id="mobile-toggle"
        onClick={(e: any) => handleClickMobileMenu(e)}
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
                <a
                  href={item.slug}
                  onClick={() => (window.location.href = item.slug)}
                >
                  {item.title}
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
