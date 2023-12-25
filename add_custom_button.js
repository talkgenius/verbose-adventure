(function () {
  const styleSheet = `
                .custom-button-menus li a {
                background-color: #37ca37 !important;
                width: 100%;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1rem;
                border-radius: 10px;
                color: #fff;
                font-weight: 600;
                }

                .custom-button-menus i{
                margin-right: 10px;
                }
                `;

  const custom_style_sheet = document.createElement("style");
  custom_style_sheet.innerHTML = styleSheet;
  const head = document.querySelector("head");
  head.append(custom_style_sheet);
  const fontAwesomeLink = document.createElement("link");
  fontAwesomeLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
  fontAwesomeLink.setAttribute("rel", "stylesheet");
  fontAwesomeLink.setAttribute(
    "integrity",
    "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==",
  );
  fontAwesomeLink.setAttribute("crossorigin", "anonymous");
  fontAwesomeLink.setAttribute("referrerpolicy", "no-referrer");
  head.append(fontAwesomeLink);

  const menu_container = document.createElement("div");
  menu_container.classList.add("custom-button-menus");
  const menu_ul = document.createElement("ul");
  menu_container.append(menu_ul);
  menu_container.style = "margin-right: 10px;";
  menu_ul.className = "flex flex-col gap-3 p-0";
  menu_ul.style = "padding: 0px";

  const buttons_html = buttons.map((menu) => {
    const li = document.createElement("li");
    li.style = ` list-style: none;`;
    const url = document.createElement("a");
    url.href = menu.url;
    url.target = "_blank";
    url.className = `font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out`;
    url.innerHTML = `
  ${menu.icon && `<span>${menu.icon}</span>`}
  ${menu.name}`;
    li.status = menu.status;
    li.productId = menu.productId;
    li.showForAll = menu.showForAll;
    li.append(url);
    return li;
  });

  const app = document.querySelector("#app");
  let currentId = null;
  const observer = new MutationObserver(mutations);
  observer.observe(app, {
    childList: true,
    subtree: true,
  });

  function mutations() {
    let myLibary = document.querySelector(".lesson-stats-instructor-container");
    if (!myLibary)
      myLibary = document.querySelector(".post-materials-container");
    if (!myLibary) return;

    const router = app.__vue_app__.config.globalProperties.$route;
    const { id } = router.params;
    if (currentId !== id) {
      currentId = id;
      menusFilterByProductId(id);
    }

    if (myLibary) {
      if (!menu_container.isConnected) myLibary.prepend(menu_container);
      return;
    }
  }

  const router = app.__vue_app__.config.globalProperties.$router;
  router.afterEach(whenRouteChange);

  function whenRouteChange(e) {
    const { id } = e.params;
    menusFilterByProductId(id);
  }

  function menusFilterByProductId(id) {
    menu_ul.innerHTML = "";
    const readyItem = buttons_html.filter((menu) => {
      if (menu.showForAll) return true;
      if (menu.status && menu.productId.includes(id)) return true;
      return false;
    });
    readyItem.forEach((item) => menu_ul.append(item));
  }
})();