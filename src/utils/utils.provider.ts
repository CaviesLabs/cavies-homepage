class UtilsProvider {
  /**
   * Will gracefuly scroll the page
   * This function will scroll the page using
   * an `ease-in-out` effect.
   *
   * You can use it to scroll to a given element, as well.
   * To do so, pass the element instead of a number as the position.
   * Optionally, you can pass a `queryString` for an element selector.
   *
   * The default duration is half a second (500ms)
   *
   * This function returns a Promise that resolves as soon
   * as it has finished scrolling. If a selector is passed and
   * the element is not present in the page, it will reject.
   *
   * EXAMPLES:
   *
   * ```js
   * window.scrollPageTo('#some-section', 2000);
   * window.scrollPageTo(document.getElementById('some-section'), 1000);
   * window.scrollPageTo(500); // will scroll to 500px in 500ms
   * ```
   *
   * @returns {Promise}
   * @param {HTMLElement|Number|Selector} Target
   * @param {Number} Duration [default=500]
   *
   *
   */
  public scrollTo(element: HTMLElement, to: number, duration: number) {
    const start = element.scrollTop,
      change = to - start,
      startDate = +new Date(),
      easeInOutQuad = function (t: any, b: any, c: any, d: any) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      },
      animateScroll = function () {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(
          easeInOutQuad(currentTime, start, change, duration)
        );
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          element.scrollTop = to;
        }
      };
    animateScroll();
  }
}

export default UtilsProvider;

export const utilsProvider = new UtilsProvider();
