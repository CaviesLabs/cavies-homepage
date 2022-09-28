import { FC, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import skrolltop from "skrolltop";
import classnames from "classnames";
import styles from "./index.module.scss";

let themeChange = false;

interface MenuItem {
  title: string;
  slug: string;
}

const Header: FC = () => {
  const { theme, setTheme } = useTheme();
  const [curSlug, setCurSlug] = useState<string>("#about-us");
  const router = useRouter();
  const menuData = useMemo<MenuItem[]>(
    () => [
      { title: "Home", slug: "#about-us" },
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

  /**
   * @description
   * This function is used for checking if current page is home page or not
   * if home page it will automatically focus on fist nav menu
   * else it will be ignore
   */
  const isHomePage = useMemo(
    () => () => {
      const { asPath } = router;
      if (asPath === "/" || asPath.startsWith("/#")) {
        return true;
      }
      return false;
    },
    [router]
  );

  /**
   * @description
   * This function will automatically make bold on menu item when user scroll
   * into the view that item present for
   */
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const ids = ["about-us", "objectives", "hamsterbox"];
      const items = ids.map((id) => document.getElementById(id));
      items.map((item, index: number) => {
        if (
          item?.offsetTop !== undefined &&
          pageYOffset >= item?.offsetTop - 450
        ) {
          setCurSlug(`#${ids[index]}`);
        }

        if (
          index === items.length - 1 &&
          item?.offsetTop !== undefined &&
          pageYOffset + item?.offsetHeight >= item?.offsetTop
        ) {
          setCurSlug(`#${ids[index]}`);
        }
      });
    });
  }, []);

  /**
   * @description
   * This function set current selected section based on the location user are in
   */
  useEffect(() => {
    if (router.asPath.includes("#")) {
      setCurSlug(`#${router.asPath.split("#")[1]}`);
    }
  }, []);

  /**
   * @description
   * This function will focus on header menu item when user scroll into the view
   * which menu-item present for
   */
  useEffect(() => {
    const header = document.getElementById("app-header");
    const scrollDownBtn = document.querySelector(".scroll-down-btn");
    const className = "scrolled-header";
    window.onscroll = () => {
      if (
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        !header?.classList.contains(className) &&
          header?.classList.add("scrolled-header");

        /**
         * @dev
         * Check whether hide middle scroll down button
         */
        scrollDownBtn &&
        (getComputedStyle(scrollDownBtn) as any)?.display == "block"
          ? ((scrollDownBtn as any).style.display = "none")
          : null;
      } else {
        header?.classList.contains(className) &&
          header?.classList.remove("scrolled-header");

        /**
         * @dev
         * Check whether display middle scroll down button
         */
        scrollDownBtn &&
        (getComputedStyle(scrollDownBtn) as any)?.display == "none"
          ? ((scrollDownBtn as any).style.display = "block")
          : null;
      }
    };
  }, []);

  /**
   * @description
   * Handle toggle app theme
   */
  useEffect(() => {
    const themeToggle = document.getElementById("theme-checkbox");
    if (theme === "dark") {
      (themeToggle as any).checked = true;
    } else if (theme === "system") {
      /**
       * @description
       * If user have not custom changing the theme
       * It will be updated automatically following computer's theme change
       */
      setInterval(() => {
        if (themeChange === true) {
          clearInterval(this);
          return;
        }
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkThemeMq.matches) {
          setTheme("dark");
          (themeToggle as any).checked = true;
        } else {
          // Theme set to light.
          setTheme("light");
          (themeToggle as any).checked = false;
        }
      }, 500);
    }
  }, []);

  /**
   * @description
   * Pure theme configuration to tailwind config
   */
  useEffect(() => {
    const classList = document.documentElement.classList;
    document.documentElement.setAttribute("data-theme", theme as string);
    if (theme === "dark") {
      !classList.contains("dark") &&
        document.documentElement.classList.add("dark");
    } else {
      classList.contains("dark") &&
        document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className="app-header border-borderColor dark:border-borderColorDark border-b-[0.5px]"
      id="app-header"
    >
      <div className="py-[18px] md:py-[25px] pl-[20px] pr-0 md:px-[40px] lg:px-[40px] lg:max-w-[1180px] lg:mx-auto flow-root">
        <div className="float-left logo-wrapper md:mt-0 mt-[0px]">
          <a href="/">
            <img
              src="/assets/images/logo.png"
              className="w-[95px] md:w-[149px] dark:hidden"
            />
            <img
              src="/assets/images/logo-dark.png"
              className="w-[95px] md:w-[149px] hidden dark:block"
            />
          </a>
        </div>
        <div className="relative flex items-center float-right  lg:absolute right-[16px]">
          <div className="float-right relative">
            <input
              type="checkbox"
              className="theme-checkbox"
              id="theme-checkbox"
              onChange={() => {
                themeChange = true;
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            />
            <label htmlFor="theme-checkbox" className="theme-label">
              <div className="theme-ball flex items-center">
                <img
                  src="/assets/images/light-icon.svg"
                  className="w-[9px] h-[9px] mx-auto dark:hidden"
                />
                <img
                  src="/assets/images/dark-icon.svg"
                  className="w-[9px] h-[9px] mx-auto hidden dark:block"
                />
              </div>
            </label>
          </div>
          <div className="flex items-center float-right">
            <div
              className={classnames(
                styles["toggle-button"],
                "block md:hidden ml-[20px]"
              )}
              id="mobile-toggle"
              onClick={() => handleClickMobileMenu()}
            >
              <span
                className={classnames(
                  styles.bar,
                  styles.top,
                  "bg-strongTitle dark:bg-strongTitleDark"
                )}
              ></span>
              <span
                className={classnames(
                  styles.bar,
                  styles.middle,
                  "bg-strongTitle dark:bg-strongTitleDark"
                )}
              ></span>
              <span
                className={classnames(
                  styles.bar,
                  styles.bottom,
                  "bg-strongTitle dark:bg-strongTitleDark"
                )}
              ></span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex float-right memu-wrapper flex items-center md:pr-[40px]">
          {
            <ul className="menu-container float-left">
              {menuData.map((item, index) => (
                <li
                  key={`desktop-menu-item-${index}`}
                  className="float-left md:mr-[40px] lg:mr-[40px]"
                  onClick={() => handleOnClickMenu(item.slug)}
                >
                  <a
                    href={"/" + item.slug}
                    className={classnames(
                      "font-[16px] uppercase",
                      styles["desktop-menu-text"],
                      {
                        "text-menuItemSelected":
                          item.slug === curSlug && isHomePage(),
                        "dark:text-menuItemSelectedDark":
                          item.slug === curSlug && isHomePage(),
                        "text-menuItem": item.slug !== curSlug || !isHomePage(),
                        "dark:text-menuItemDark":
                          item.slug !== curSlug || !isHomePage(),
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
        <div className={classnames(styles["mobile-nav"])}>
          <div
            className={classnames(styles["menu-container"], "pt-10")}
            id="mobile-menu"
          >
            <ul className={styles["mobile-menu"]}>
              {menuData.map((item: any, index: number) => (
                <li key={`mobile-menu-${index}`}>
                  <a
                    className={classnames("mt-[30px] md:mt-[60px]", {
                      active: item.slug === curSlug,
                    })}
                    href={item.slug}
                    onClick={() => {
                      window.location.href = item.slug;
                      handleClickMobileMenu();
                    }}
                  >
                    <div className="hidden-layer"></div>
                    <button className="shown-layer">
                      <p className="uppercase text-[16px] md:text-[32px] bold-text">
                        {item.title}
                      </p>
                    </button>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
