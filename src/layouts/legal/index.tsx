import {
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  FC,
} from "react";
import { useRouter } from "next/router";
import { legalMenus } from "@/src/models/entities/legal.entity";
import { Collapse } from "react-collapse";
import { utilsProvider } from "@/src/utils/utils.provider";
import MainLayout from "@/src/layouts/main";
import classnames from "classnames";
import styles from "./index.module.scss";

interface Props {
  slug: string[];
}

const LegalLayout: FC<Props> = ({ slug }) => {
  let scrolled = false;
  const router = useRouter();
  const [layoutContent, setLayoutContent] = useState<ReactNode>();
  const [slugSelected, setSlugSelected] = useState<string>();
  const [childSlugSelected, setChildSlugSelected] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * @param title
   * @returns slug
   * @description
   * Because title of section is formated following normal text
   * So it need to be covert into slug location fomated with *-*
   */
  const convertToHref = (title: string | undefined) =>
    title ? title.toLowerCase().replaceAll(" ", "-") : "";

  /**
   * @descrition
   * Scroll into current element
   */
  const handleScroll = useCallback(
    (query?: string) => {
      utilsProvider.withTimeout(() => {
        const el = document.getElementById(query || childSlugSelected);
        if (!el) return;
        if (!window.location.href.includes("#")) return;

        scrolled = true;

        // Scroll certain amounts from current position
        window.scrollBy({
          top: el.getBoundingClientRect().top - 450, // could be negative value
          left: 0,
          behavior: "smooth",
        });
      }, 100);
    },
    [childSlugSelected, scrolled]
  );

  /**
   * @description
   */
  const onChangePart = useCallback(
    (query: string) => {
      const availableSlug = legalMenus.find(
        (item) => item.slug === slugSelected
      );

      /** @descriptio Find contents located in current chapper */
      let availablePart = availableSlug?.children.find(
        (item) => item.title === query
      );
      if (!availablePart) {
        const chaper = legalMenus.find(
          (item) => item.children.filter((part) => part.title === query).length
        );

        availablePart = chaper?.children.find((item) => item.title === query);

        setSlugSelected(chaper?.slug);

        setChildSlugSelected(convertToHref(availablePart?.title));

        handleScroll(convertToHref(availablePart?.title));

        setMenuOpen(chaper?.slug || "");

        setLayoutContent(chaper?.content);

        /**
         * @description
         * Change location without refresh page
         * */
        history.pushState(
          {},
          "",
          `/legal${chaper?.slug}/#${convertToHref(availablePart?.title)}`
        );
      } else {
        setChildSlugSelected(convertToHref(availablePart?.title));

        handleScroll(convertToHref(availablePart?.title));

        /**
         * @description
         * Change location without refresh page
         * */
        history.pushState(
          {},
          "",
          `/legal${slugSelected}/#${convertToHref(availablePart?.title)}`
        );
      }
      setMobileMenuOpen(false);
    },
    [slug, router.asPath, slugSelected, childSlugSelected]
  );

  /**
   * @description
   * This function will automatically make bold on menu item when user scroll
   * into the view that item present for
   */
  const handleOnScroll = () => {
    if (scrolled) {
      utilsProvider.withTimeout(() => (scrolled = false), 4000);
      return;
    }
    const id1 = legalMenus[0].children.map((item) => convertToHref(item.title));
    const id2 = legalMenus[1].children.map((item) => convertToHref(item.title));
    const ids = id1.concat(id2);
    const items = ids.map((id) => document.getElementById(id));
    // const fromTop = window.scrollY;
    items.map((item, index: number) => {
      // if (
      //   item?.offsetTop &&
      //   item?.scrollHeight &&
      //   item?.offsetTop <= fromTop &&
      //   item?.offsetTop + item?.offsetHeight > fromTop
      // ) {
      //   setChildSlugSelected(ids[index]);
      // }
      if (
        item?.offsetTop !== undefined &&
        pageYOffset >= item?.offsetTop - 450
      ) {
        setChildSlugSelected(ids[index]);
      }

      if (
        index === items.length - 1 &&
        item?.offsetTop !== undefined &&
        pageYOffset + item?.offsetHeight >= item?.offsetTop
      ) {
        setChildSlugSelected(ids[index]);
      }
    });
  };

  /**
   * @description
   * Step 1: Find section user want to read based on slug, then render the matched layout
   * Step 2: Find part of section
   *         * If available href ID it will focus on the menu item present for and scroll to the view
   *         * If not available, it will render the first part in section
   * Others:
   * Set collapsed menu to open or not based on slug user're in
   */
  useEffect(() => {
    if (!slug.length) {
      return;
    }
    const availableSlug = legalMenus.find(
      (item) => item.slug === `/${slug[0]}`
    );
    if (!availableSlug) {
      return;
    }
    setSlugSelected(availableSlug.slug);
    setLayoutContent(availableSlug.content);
    setMenuOpen(availableSlug.slug);
    const partId = document.location.href.split("#")?.[1];
    if (!partId) {
      setChildSlugSelected(convertToHref(availableSlug.children[0].title));

      handleScroll(partId);
    } else {
      setChildSlugSelected(convertToHref(partId));

      handleScroll(partId);

      utilsProvider.withTimeout(
        () => document.getElementById(partId)?.scrollIntoView(),
        500
      );
    }
  }, [slug, router.asPath]);

  /**
   * @description
   * Listener window on scroll
   */
  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll.bind(this));
  }, []);

  const menuComponent = useMemo(
    () => (
      <ul className="legal-menu pt-[0px] md:pt-0">
        {legalMenus.map((item, index) => (
          <li className="" key={`legal-parent-${index}`}>
            <p className="cursor-pointer text-[16px] text-strongTitle dark:text-strongTitleDark">
              <span onClick={() => setMenuOpen(item.slug)}>
                {menuOpen !== item.slug ? (
                  <i className="bx bxs-right-arrow text-navy dark:text-navyDark mr-[10px]"></i>
                ) : (
                  <i className="bx bxs-down-arrow text-purple dark:text-purpleDark mr-[10px]"></i>
                )}
              </span>
              <span
                onClick={() => setMenuOpen(item.slug)}
                className="medium-text text-strongTitle dark:text-strongTitleDark text-[16px] cursor-pointer"
              >
                {item.title}
              </span>
            </p>
            <ul className="chilren-legal-menu pl-[25px] pb-[20px]">
              <Collapse isOpened={menuOpen === item.slug}>
                {item.children.map((item, index) => (
                  <li
                    key={`children-legal-menu-item-${index}`}
                    className={classnames(
                      "text-navy dark:text-navyDark pt-[10px] text-[16px] regular-text",
                      {
                        "menu-active":
                          convertToHref(item.title) === childSlugSelected,
                      }
                    )}
                  >
                    <span
                      className="cursor-pointer"
                      onClick={() => onChangePart(item.title)}
                    >
                      {item.title}
                    </span>
                  </li>
                ))}
              </Collapse>
            </ul>
          </li>
        ))}
      </ul>
    ),
    [slug, slugSelected, childSlugSelected, menuOpen]
  );

  useEffect(() => {
    document.documentElement.setAttribute("app-bg", "none");
  }, []);

  return (
    <MainLayout>
      <div
        className={classnames(
          "px-[20px] md:mx-[40px] lg:mx-auto w-full lg:max-w-[1180px] pt-[50px]  bg-white dark:bg-backgroundDark",
          styles["legal-content"]
        )}
      >
        <div className="side-bar md:min-w-[200px] md:fixed md:w-[200px] pt-[50px]">
          <div className="block md:hidden fixed bg-purple dark:bg-purpleDark right-0 left-0 py-[15px] px-[20px] top-[55px]">
            <p className="text-[14px] md:text-[16px] text-white dark:text-strongTitle normal-text uppercase max-w-[100%]">
              {childSlugSelected.replaceAll("-", " ")}
            </p>
            <button
              className="absolute right-[20px] bottom-[13px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <i className="bx bxs-chevron-up text-white dark:text-strongTitle"></i>
              ) : (
                <i className="bx bxs-chevron-down text-white dark:text-strongTitle"></i>
              )}
            </button>
          </div>
          {mobileMenuOpen && (
            <Collapse isOpened={mobileMenuOpen}>
              <div
                className="block md:hidden fixed top-[108px] left-0 right-0 bottom-0 pt-[50px] bg-white dark:bg-strongTitle pl-[20px]"
                style={{ zIndex: 39 }}
              >
                {menuComponent}
              </div>
            </Collapse>
          )}
          <div className="hidden md:block">{menuComponent}</div>
        </div>
        <div className="content md:pl-[260px] md:pt-0 md:pr-[20px]">
          {layoutContent}
        </div>
      </div>
    </MainLayout>
  );
};

export default LegalLayout;
