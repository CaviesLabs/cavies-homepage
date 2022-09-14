import { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import classnames from "classnames";

/**
 * @descriptionn
 * @var USER_CONSENT_COOKIE_KEY: Cookie consent variable present for cookie license
 * @var SER_CONSENT_COOKIE_EXPIRE_DATE: Exprire of license
 * @var SHOWN_CLASS: Class name for popup animation presenting for showing status
 * @var HIDDEN_CLASS: Class name for popup animation presenting for hiding status
 */
const USER_CONSENT_COOKIE_KEY = "cookie_consent_is_true";
const USER_CONSENT_COOKIE_EXPIRE_DATE =
  new Date().getTime() + 365 * 24 * 60 * 60;
const SHOWN_CLASS = "shown-block";
const HIDDENN_CLASS = "hidden-block";

export const CookieConnsentComponent: FC = () => {
  const [cookieConsent, setCookieConsent] = useState(true);

  const closePopup = () => {
    const element = document.querySelector(".cookie-consent");
    if (element?.classList.contains(SHOWN_CLASS)) {
      element?.classList.remove(SHOWN_CLASS);
    }
    element?.classList.add(HIDDENN_CLASS);
    setTimeout(() => element?.classList.add("hidden"), 500);
  };

  const handleAccept = () => {
    if (cookieConsent) return;
    Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
      expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
    });
    closePopup();
  };

  const handleClose = () => {
    closePopup();
  };

  useEffect(() => {
    setCookieConsent(Cookies.get(USER_CONSENT_COOKIE_KEY) === "true");
  }, []);

  return (
    <section
      className={classnames(
        "fixed bottom-0 md:bottom-[20px] md:right-[20px] py-2 w-[100%] md:w-[416px] md:h-[388px] md:bg-white shadow-xl rounded-[8px] cookie-consent",
        {
          "shown-block": !cookieConsent,
          hidden: cookieConsent,
        }
      )}
    >
      <div className="relative px-[30px] mx-[30px] md:mx-[0] flex items-center h-full bg-white shadow-xl md:shadow-none  pb-[20px] md:pb-0">
        <button
          onClick={handleClose}
          className="absolute right-[30px] md:top-0 top-[20px]"
        >
          <i className="bx bx-x text-black text-[30px]"></i>
        </button>
        <div>
          <img
            src="/assets/images/hamster-cookie.png"
            className="mx-auto md:w-[167px]"
          />
          <p className="text-center text-[16px]">
            We use{" "}
            <a href="/privacy" className="text-purple">
              third-party cookies
            </a>{" "}
            in order to personalize your site experience.
          </p>
          <button
            onClick={handleAccept}
            className="rounded-[8px] w-full mt-[20px] py-[7px] bg-purple"
          >
            <p className="text-white text-center text-[16px] font-bold">
              Accept
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};
