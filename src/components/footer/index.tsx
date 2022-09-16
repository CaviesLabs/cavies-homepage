import { FC, useMemo } from "react";

interface FooterItem {
  name: string;
  uri: string;
}

interface SocialItem {
  image: string;
  uri: string;
}

const Footer: FC = () => {
  const footers = useMemo<FooterItem[]>(
    () => [
      { name: "About Us", uri: "https://cavies.notion.site/About-Cavies-72e60c00426b450e8e57ca3ea5acb0d0" },
      {
        name: "Blog",
        uri: "https://cavies.notion.site/b4ff0745a92144aaaccf5b052d92b540?v=7891d7724e1349a5943c8a101174af5c",
      },
      {
        name: "Careers",
        uri: "https://cavies.notion.site/Job-Board-320ac7987dc64a53b0d3d3e7c52c5ce7",
      },
    ],
    []
  );

  const bottomFooters = useMemo<FooterItem[]>(
    () => [
      { name: "© 2022 Cavies, Ltd.", uri: "#" },
      { name: "Privacy Policy", uri: "#" },
      { name: "Terms of Use", uri: "#" },
      {
        name: "Media Kit",
        uri: "https://cavies.notion.site/59aa5e24fdb146359cdd3cb9336aef45?v=83eedde046594e689d7fabf8932a7284",
      },
    ],
    []
  );

  const socialItems = useMemo<SocialItem[]>(
    () => [{ image: "/assets/images/twitter.svg", uri: "https://twitter.com/CaviesLabs" }],
    []
  );

  return (
    <div className="footer mt-[40px]">
      <div className="flex md:px-[5%] px-[40px] items-center">
        <div className="float-left logo-wrapper w-[60%] md:w-[60%] lg:w-[70%]">
          <img
            src="/assets/images/logo.png"
            className="w-[75px] md:w-[149px]"
          />
        </div>
        <div className="float-right menu-wrapper py-[20px] w-[100%]">
          <ul className="footer-menu w-[100%]">
            {footers.map((item, index) => (
              <li
                key={`footer-item-${index}`}
                className="float-right ml-[20px] md:ml-[30px] cursor-pointer"
              >
                <a
                  target="_blank"
                  href={item.uri}
                  className="text-[10px] md:text-[16px] normal-text"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full divide-y-2 divide-dividerColor">
        <div></div>
        <div></div>
      </div>
      <div className="flex md:px-[5%] px-[40px] py-[10px]">
        <div className="bottom-menu-wrapper float-left w-[60%] md:w-[60%] lg:w-[70%]">
          <ul className="bottom-footer-menu">
            {bottomFooters.map((item, index) => (
              <li key={`bottom-footer-item-${index}`} className="md:float-left">
                <a
                  className="text-grey text-[10px] md:text-[14px] mr-[20px] cursor-pointer normal-text"
                  href={item.uri}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="float-right menu-wrapper w-[100%]">
          <ul className="footer-menu w-[100%]">
            {socialItems.map((item, index) => (
              <li
                key={`footer-item-${index}`}
                className="ml-[20px] md:ml-[30px] cursor-pointer float-right"
                onClick={() => window.open(item.uri)}
              >
                <img
                  src={item.image}
                  className="text-[10px] md:text-[16px] w-[15px] h-[15px] md:w-[32px] md:h-[32px]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
