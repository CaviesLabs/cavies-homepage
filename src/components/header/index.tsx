import { FC, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";

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
    </div>
  );
};

export default Header;
