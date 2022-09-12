import { FC, useMemo } from "react";

const Footer: FC = () => {
  const footers = useMemo<string[]>(() => ["About Us", "Blog", "Careers"], []);

  const bottomFooters = useMemo<string[]>(
    () => [
      "© 2022 Cavies, Ltd.",
      "Privacy Policy",
      "Terms of Use",
      "Media Kit",
    ],
    []
  );

  return (
    <div className="footer">
      <div className="flex md:px-[80px] px-[40px]  items-center">
        <div className="float-left logo-wrapper w-[40%] md:w-[80%]">
          <img
            src="/assets/images/logo.png"
            className="w-[75px] md:w-[149px]"
          />
        </div>
        <div className="float-right menu-wrapper py-[20px]">
          <ul className="footer-menu">
            {footers.map((item, index) => (
              <li
                key={`footer-item-${index}`}
                className="float-left ml-[20px] md:ml-[30px]"
              >
                <p className="text-[10px] md:text-[16px]">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full divide-y-2 divide-dividerColor">
        <div></div>
        <div></div>
      </div>
      <div className="flow-root md:px-[80px] px-[40px] py-[10px]">
        <div className="bottom-menu-wrapper float-left">
          <ul className="bottom-footer-menu">
            {bottomFooters.map((item, index) => (
              <li key={`bottom-footer-item-${index}`} className="md:float-left">
                <p className="text-grey text-[10px] md:text-[14px] mr-[20px]">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
