import * as InboxSDK from "@inboxsdk/core";
import $ from "jquery";
import "./styles/index.scss";
import {
  DROPDOWN_ITEMS,
  g_black_listed_string_params,
  g_black_listed_websites,
} from "./constants";
import { getThreadEndpoint } from "./api/endpoints/gmail";
import parse from "parse-email";
import { getSelectedItem, setSelectedItem } from "./localStorage";

window.setImmediate = window.setTimeout;

var threadIdArray = [];
var localStorageData = [];
let globalCounter = 0;

var request_counter = 0;
var settimeout_for_request_counter_reset = null;

InboxSDK.load(2, "sdk_gmail-message_90905ac7ac").then(async (sdk) => {
  onLoadSetup(sdk);
  getAllThreadIds(sdk.Lists);
  setEyeIconOnThread(sdk.Lists);
});

/************ Start Load Initial Setup Module ************/

const pickAndStoreFirstThreadId = (sdk, rowClass) => {
  let splitURL = window.location.href.split("#");

  if (document.querySelector(`${rowClass} [data-legacy-thread-id]`)) {
    let thread_row = document.querySelectorAll(
      `${rowClass} [data-legacy-thread-id]`
    );

    var temp_thread_id =
      thread_row.item(0).getAttribute("data-legacy-thread-id") ||
      thread_row.item(1).getAttribute("data-legacy-thread-id") ||
      thread_row.item(2).getAttribute("data-legacy-thread-id") ||
      thread_row.item(3).getAttribute("data-legacy-thread-id");

    if (!localStorage.getItem(`${splitURL[0]}`)) {
      if (temp_thread_id != localStorage.getItem(`${splitURL[0]}`)) {
        localStorage.setItem(`${splitURL[0]}`, temp_thread_id);
      }
    } else if (localStorage.getItem(`${splitURL[0]}`) != temp_thread_id) {
      removeAllLabels();
      removeAllToolbars();
      injectToolbar();

      localStorageData = [];
      threadIdArray = [];
      request_counter = 0;
      globalCounter = 0;

      getAllThreadIds(sdk.Lists);
      localStorage.setItem(`${splitURL[0]}`, temp_thread_id);

      setTimeout(() => {
        onFilterHTMLContent(sdk);
      }, 2000);
    }
  }
};

const injectToolbar = () => {
  if (document.querySelector(".D.E.G-atb[gh='tm']")) {
    setToolbarButton();
  }
};

const removeAllToolbars = () => {
  document.querySelectorAll(".D.E.G-atb").forEach((item) => {
    item.querySelectorAll(".listToolbarContainer").forEach((toolbar) => {
      if (toolbar) {
        toolbar.remove();
      }
    });
  });
};

const onLoadSetup = (sdk) => {
  setInterval(() => {
    let splitURL = window.location.href.split("#");

    removeAdEmails();

    if (splitURL[1] === "inbox")
      pickAndStoreFirstThreadId(sdk, ".BltHke.nH.oy8Mbf[role='main']");
    if (splitURL[1] === "starred")
      pickAndStoreFirstThreadId(sdk, ".BltHke.nH.oy8Mbf[role='main']");
    if (splitURL[1] === "snoozed")
      pickAndStoreFirstThreadId(sdk, ".BltHke.nH.oy8Mbf[role='main']");
    if (splitURL[1] === "sent")
      pickAndStoreFirstThreadId(sdk, ".BltHke.nH.oy8Mbf[role='main']");
    if (splitURL[1] === "drafts")
      pickAndStoreFirstThreadId(sdk, ".BltHke.nH.oy8Mbf[role='main']");
    if (splitURL[1] === "category/social")
      pickAndStoreFirstThreadId(sdk, ".BltHke.nH.oy8Mbf[role='main']");
    if (splitURL[1] === "category/updates")
      pickAndStoreFirstThreadId(sdk, ".BltHke.nH.oy8Mbf[role='main']");
    if (splitURL[1] === "category/forums")
      pickAndStoreFirstThreadId(sdk, ".BltHke.nH.oy8Mbf[role='main']");
    if (splitURL[1] === "category/promotions")
      pickAndStoreFirstThreadId(sdk, ".BltHke.nH.oy8Mbf[role='main']");
  }, 500);

  const initialInterval = setInterval(() => {
    if (!getSelectedItem()) {
      setSelectedItem(DROPDOWN_ITEMS.ITEM_ONE);
    }

    onFilterHTMLContent(sdk);

    if (
      document.querySelector(
        ".D.E.G-atb[gh='tm'] [data-toolbar-icononly='true']"
      )
    ) {
      removeAllToolbars();
      setToolbarButton();
      clearInterval(initialInterval);
    }
  }, 500);
};

/************ End Load Initial Setup Module ************/

/************ Start Toolbar Button Module ************/

const setToolbarButton = () => {
  document
    .querySelectorAll(
      ".D.E.G-atb[gh='tm'] [data-toolbar-icononly='true'] > .bzn > .G-tF"
    )
    .forEach((item) => {
      item.innerHTML += `<div class="G-Ni J-J5-Ji listToolbarContainer">
          <div class="T-I J-J5-Ji nf T-I-ax7 L3 listToolbarItem" role="button" tabindex="0" aria-haspopup="false" aria-expanded="false" data-tooltip="Select Line" aria-label="Line">
            <div class="asa">
              <i class="fas fa-bars" style="font-size: 18px; color: #5F6368;"></i>
            </div>
            <div class="G-asx T-I-J3 J-J5-Ji">&nbsp;</div>
          </div>

          <div class="listPopupContainer" style="display: none">
            <div class="J-M aX0 aYO jQjAxd" style="width: 170px; height: auto; padding: 10px 0px; top: 20px; left: 15px;">
              <div class="J-N-Jz listPopupItem ${
                getSelectedItem() === DROPDOWN_ITEMS.ITEM_ONE
                  ? "listPopupItem--active"
                  : ""
              }">
                ${DROPDOWN_ITEMS.ITEM_ONE}
              </div>
              <div class="J-N-Jz listPopupItem ${
                getSelectedItem() === DROPDOWN_ITEMS.ITEM_TWO
                  ? "listPopupItem--active"
                  : ""
              }">
                ${DROPDOWN_ITEMS.ITEM_TWO}
              </div>
              <div class="J-N-Jz listPopupItem ${
                getSelectedItem() === DROPDOWN_ITEMS.ITEM_THREE
                  ? "listPopupItem--active"
                  : ""
              }">
                ${DROPDOWN_ITEMS.ITEM_THREE}
              </div>
              <div class="J-N-Jz listPopupItem ${
                getSelectedItem() === DROPDOWN_ITEMS.ITEM_FOUR
                  ? "listPopupItem--active"
                  : ""
              }">
                ${DROPDOWN_ITEMS.ITEM_FOUR}
              </div>
            </div>
          </div>
        </div>`;
    });

  let eventListenerInterval = setInterval(() => {
    if (
      document.querySelector(".listToolbarItem") &&
      document.querySelector(".listPopupItem")
    ) {
      document
        .querySelectorAll(".listToolbarItem")
        .forEach((item) => item.addEventListener("click", onListSelectPopup));

      document
        .querySelectorAll(".listPopupItem")
        .forEach((item) => item.addEventListener("click", onSelectListItem));

      clearInterval(eventListenerInterval);
    }
  }, 500);
};

const onListSelectPopup = () => {
  if (document.querySelector(".listPopupContainer")) {
    document.querySelectorAll(".listPopupContainer").forEach((item) => {
      if (item.style.display === "none") {
        onListPopupOpen();
      } else {
        onListPopupClose();
      }
    });
  }
};

const onListPopupOpen = () => {
  $(".listPopupContainer").attr("style", "display: block");
};

const onListPopupClose = () => {
  $(".listPopupContainer").attr("style", "display: none");
};

const onSelectListItem = (e) => {
  let item = e.currentTarget.innerText;
  $(".listPopupItem").removeClass("listPopupItem--active");
  e.currentTarget.classList.add("listPopupItem--active");
  onLoadGmailThread(item);
};

/************ Ending Toolbar Button Module ************/

/************ Start Get all Thread Ids Module ************/

const getAllThreadIds = (list) => {
  list.registerThreadRowViewHandler(async (threadRowView) => {
    threadIdArray.push(await threadRowView.getThreadIDAsync());
  });
};

/************ Ending Get all Thread Ids Module ************/

/************ Start Filter HTML Content Module ************/

const onFilterHTMLContent = (sdk) => {
  if (threadIdArray.length > 0) {
    threadIdArray.map((item, index) => {
      var timeout = 130 * request_counter;
      fn_increase_request_counter();
      fn_reset_request_counter();

      setTimeout(async () => {
        const getEmailResponse = await onGetThreadMessage(item);
        const response = await parse(getEmailResponse);
        fn_decrease_request_counter();

        let obj = {
          id: item,
          content: fn_get_plain_text_from_email_original_content(response).text,
          html: fn_get_plain_text_from_email_original_content(response).html,
          showLabel: false,
        };

        const exist = localStorageData.includes(item);

        if (!exist) {
          localStorageData.push(obj);
        }
      }, timeout);
    });
  }

  let dataInsertionInterval = setInterval(() => {
    globalCounter += 1000;
    injectClasses(getSelectedItem());
    setLabelOnThread(sdk);

    if (
      globalCounter > 20000 &&
      localStorageData.length > threadIdArray.length - 5
    ) {
      clearInterval(dataInsertionInterval);
    }
  }, 1000);
};

/************ Ending Filter HTML Content Module ************/

/************ Starting Gmail API Module ************/

const onGetThreadMessage = async (threadId) => {
  const response = await getThreadEndpoint(threadId);
  if (response.status === 200) {
    return response.data;
  }
};

/************ Ending Gmail API Module ************/

/************ Starting Inject CSS Classes Module ************/

const injectClasses = (selectedItem) => {
  document
    .querySelectorAll("[data-inboxsdk-thread-row='true']")
    .forEach((threadRow) => {
      if (threadRow.querySelector("[data-legacy-thread-id]")) {
        let messageId = threadRow
          .querySelector("[data-legacy-thread-id]")
          .getAttribute("data-legacy-thread-id");

        threadRow.setAttribute("style", "position: relative;");

        let messageParagraph = threadRow.querySelector(".y2");

        let eyeIcon = threadRow.querySelector(".inboxsdk__thread_row_button");

        var result = localStorageData.find((obj) => {
          return obj.id === messageId;
        });

        if (selectedItem === DROPDOWN_ITEMS.ITEM_ONE) {
          $("[role='link'] > .xT").removeClass("removeFlex");
          $("[role='link'] > .xT").addClass("addFlex");

          messageParagraph.innerHTML = `
            <span class="Zt">&nbsp;-&nbsp;</span>
              ${
                result
                  ? result.content === "false"
                    ? "Preview not available..."
                    : result.content
                  : "Loading..."
              }
            `;
        }

        if (selectedItem === DROPDOWN_ITEMS.ITEM_TWO) {
          $("[role='link'] > .xT").removeClass("addFlex");
          $("[role='link'] > .xT").addClass("removeFlex");

          messageParagraph.setAttribute(
            "style",
            "display: block; margin-top: 5px"
          );
          messageParagraph.innerHTML = `
            <p class="messageText">
            ${
              result
                ? result.content === "false"
                  ? "Preview not available..."
                  : result.content.slice(0, 125)
                : "Loading..."
            }
            </p>
          `;
        }

        if (selectedItem === DROPDOWN_ITEMS.ITEM_THREE) {
          $("[role='link'] > .xT").removeClass("addFlex");
          $("[role='link'] > .xT").addClass("removeFlex");

          messageParagraph.setAttribute(
            "style",
            "display: block; margin-top: 5px"
          );
          messageParagraph.innerHTML = `
            <p class="messageText">
            ${
              result
                ? result.content === "false"
                  ? "Preview not available..."
                  : result.content.slice(0, 250)
                : "Loading..."
            }
            </p>
          `;
        }

        if (selectedItem === DROPDOWN_ITEMS.ITEM_FOUR) {
          $("[role='link'] > .xT").removeClass("addFlex");
          $("[role='link'] > .xT").addClass("removeFlex");

          messageParagraph.setAttribute(
            "style",
            "display: block; margin-top: 5px"
          );
          messageParagraph.innerHTML = `
            <p class="messageText">
            ${
              result
                ? !result.content
                  ? "Preview not available..."
                  : result.content.slice(0, 345)
                : "Loading..."
            }
            </p>
          `;
        }

        eyeIcon.addEventListener("mouseover", (e) => {
          e.currentTarget.setAttribute("style", "position: relative;");
          e.currentTarget.innerHTML = `
            <div class="inboxsdk__button_icon">
              <img class="inboxsdk__button_iconImg" src="https://res.cloudinary.com/the-fastech/image/upload/v1672640397/view_qt43wn.png">
            </div>
            <div class="full_preview_message" data-message-id="${
              result && result.id
            }" style="width: ${threadRow.clientWidth - 15}px; left: -${
            threadRow.clientWidth - 200
          }px">
              <iframe border='0' width='100%' height='100%'></iframe>
            </div>
          `;

          var parent_div = $('<div class="gmail__iframe__scroll"></div>').attr(
            "style",
            "color:#222;font:small/1.5 Arial,Helvetica,sans-serif;line-height:1.5em; word-break: break-all; overflow-wrap: break-word; hyphens: auto; overflow:hidden; width:100%; height:100%"
          );

          var child_div = $(
            '<div style="-webkit-transform: scale(.7);-webkit-transform-origin: 0 0;width: 143%;margin:5px; overflow: hidden"></div>'
          ).html(fn_clean_tracker_images(result && result.html));

          parent_div.append(child_div);

          $(`[data-message-id="${result && result.id}"] > iframe`)
            .contents()
            .find("body")
            .attr(
              "style",
              "padding: 0px !important;margin: 0px !important;width: 100% !important;height: 100% !important; overflow:hidden;"
            )
            .append(parent_div);
        });

        eyeIcon.addEventListener("mouseout", (e) => {
          e.currentTarget.innerHTML = `
            <div class="inboxsdk__button_icon">
              <img class="inboxsdk__button_iconImg" src="https://res.cloudinary.com/the-fastech/image/upload/v1672640397/view_qt43wn.png">
            </div>
          `;
        });
      }
    });
};

/************ Ending Inject CSS Classes Module ************/

const removeAdEmails = () => {
  document
    .querySelectorAll("[data-inboxsdk-thread-row='true']")
    .forEach((threadRow) => {
      if (threadRow.querySelector(`[role="gridcell"] .aPd.am0.aRC .ast`)) {
        threadRow.remove();
      }
    });
};

const removeAllLabels = () => {
  document
    .querySelectorAll("[data-inboxsdk-thread-row='true']")
    .forEach((threadRow) => {
      if (
        threadRow.querySelector(
          `[role="gridcell"] .inboxsdk__gmail_label.ar.as.inboxsdk__thread_row_label`
        )
      ) {
        threadRow
          .querySelectorAll(
            `[role="gridcell"] .inboxsdk__gmail_label.ar.as.inboxsdk__thread_row_label`
          )
          .forEach((item) => item.remove());
      }
    });
};

/************ Starting HTML Body Parser Module ************/

const HTMLBodyParser = (content) => {
  const parser = new DOMParser();
  const documentObj = parser.parseFromString(content, "text/html");

  return documentObj
    .querySelector("body")
    .textContent.normalize()
    .trim()
    .replace(/^\s*$(?:\r\n?|\n)/gm, "    ");
};

const bodyParser = (content) => {
  const parser = new DOMParser();
  const documentObj = parser.parseFromString(content, "text/html");

  return documentObj.querySelector("body").innerHTML;
};

/************ Ending HTML Body Parser Module ************/

/************ Starting Load Gmail Threads Module ************/

const onLoadGmailThread = (item) => {
  if (item === DROPDOWN_ITEMS.ITEM_ONE) {
    onListPopupClose();
    setSelectedItem(DROPDOWN_ITEMS.ITEM_ONE);
    injectClasses(DROPDOWN_ITEMS.ITEM_ONE);
  }

  if (item === DROPDOWN_ITEMS.ITEM_TWO) {
    onListPopupClose();
    setSelectedItem(DROPDOWN_ITEMS.ITEM_TWO);
    injectClasses(DROPDOWN_ITEMS.ITEM_TWO);
  }

  if (item === DROPDOWN_ITEMS.ITEM_THREE) {
    onListPopupClose();
    setSelectedItem(DROPDOWN_ITEMS.ITEM_THREE);
    injectClasses(DROPDOWN_ITEMS.ITEM_THREE);
  }

  if (item === DROPDOWN_ITEMS.ITEM_FOUR) {
    onListPopupClose();
    setSelectedItem(DROPDOWN_ITEMS.ITEM_FOUR);
    injectClasses(DROPDOWN_ITEMS.ITEM_FOUR);
  }
};

/************ Ending Load Gmail Threads Module ************/

/************ Starting Setting Eye Icon Module ************/

const setEyeIconOnThread = (list) => {
  list.registerThreadRowViewHandler((list) => {
    list.addButton({
      title: "Preview Email",
      iconUrl:
        "https://res.cloudinary.com/the-fastech/image/upload/v1672640397/view_qt43wn.png",
    });
  });
};

/************ Ending Setting Eye Icon Module ************/

/************ Starting Request Counter Controllers Module ************/

function fn_increase_request_counter() {
  request_counter = request_counter + 1;
}

function fn_decrease_request_counter() {
  request_counter--;
  if (request_counter < 0) {
    request_counter = 0;
  }
}

function fn_reset_request_counter() {
  if (!settimeout_for_request_counter_reset) {
    settimeout_for_request_counter_reset = setTimeout(function () {
      request_counter = 0;
      try {
        if (settimeout_for_request_counter_reset) {
          clearTimeout(settimeout_for_request_counter_reset);
        }

        settimeout_for_request_counter_reset = null;
      } catch (ex) {
        settimeout_for_request_counter_reset = null;
      }
    }, 1000);
  }
}

/************ Ending Request Counter Controllers Module ************/

/************ Starting Setting Labels on Thread Module ************/

const setLabelOnThread = (sdk) => {
  sdk.Lists.registerThreadRowViewHandler((list) => {
    var result = localStorageData.find((obj) => obj.id === list.getThreadID());

    result && result.content !== "false" && result.showLabel === false
      ? list.addLabel({
          title: calculateThreadReadingTime(HTMLBodyParser(result.content)),
          foregroundColor: "#E3E3E3",
          backgroundColor: "#FF5834",
        })
      : "";

    result && result.content !== "false" && result.showLabel === false
      ? list.addLabel({
          title: `${HTMLBodyParser(result.content).length} Words`,
          foregroundColor: "#E3E3E3",
          backgroundColor: "#FF5834",
        })
      : "";

    localStorageData.find((obj, i) => {
      if (obj.id === list.getThreadID()) {
        localStorageData[i].showLabel = true;
      }
    });
  });
};

/************ Ending Setting Labels on Thread Module ************/

/************ Starting Calculate Thread Reading Time Module ************/

const calculateThreadReadingTime = (content) => {
  let wordCount = content.toString().length;
  let calculateMinutes = (+wordCount / 200).toString().split(".");
  let calculateSeconds = +`0.${calculateMinutes[1]}` * +"0.60" * 100;
  let seconds = calculateSeconds.toString().slice(0, 2).replace(/\./g, "");
  return calculateMinutes[0] + " min" + " " + seconds + " sec";
};

/************ Ending Calculate Thread Reading Time Module ************/

//get text from html details in original content
function fn_get_plain_text_from_email_original_content_of_html(content) {
  var text = "";
  var html_txt;
  if (content.match(/<body/)) {
    html_txt = content
      .substring(content.indexOf("<body"), content.lastIndexOf("</body>"))
      .trim();
    html_txt = html_txt + "</body>";
  } else {
    html_txt = "<body>" + content + "</body>";
  }

  var outer = $("<outer></outer>");
  outer.html(html_txt);
  outer.find("img").remove();

  var element = outer.get(0);
  text = element.innerText || element.textContent;

  return text.trim();
}

function fn_remove_html_tags(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  var text = div.textContent || div.innerText || "";
  return text.trim();
}

function fn_get_plain_text_from_email_original_content(content) {
  var text = "";
  if (content.text && content.text.trim() !== "") {
    text = content.text.trim();
  } else if (content.html) {
    text = fn_get_plain_text_from_email_original_content_of_html(content.html);
  }
  //sometimes it still keeps the html tags, remove those tags
  text = fn_remove_html_tags(text);
  var html = content.html ? content.html : content.textAsHtml;
  return { text: text.replace(/^\s*$(?:\r\n?|\n)/gm, "    "), html: html };
}

function fn_check_in_known_websites(imgurl) {
  var blacklisted = false;
  for (var key in g_black_listed_websites) {
    for (var i = 0; i < g_black_listed_websites[key].length; i++) {
      if (imgurl.indexOf(g_black_listed_websites[key][i]) > -1) {
        blacklisted = true;
        break;
      }
    }
    if (blacklisted === true) {
      break;
    }
  }
  return blacklisted;
}

function fn_check_in_known_string_params(imgurl) {
  var blacklisted = false;
  for (var i = 0; i < g_black_listed_string_params.length; i++) {
    if (imgurl.indexOf(g_black_listed_string_params[i]) > -1) {
      blacklisted = true;
      break;
    }
  }

  return blacklisted;
}

function fn_check_for_black_list(url) {
  var blacklisted = false;
  var imgurl = url.toLowerCase();
  if (imgurl !== "") {
    blacklisted = fn_check_in_known_websites(imgurl);
    //if we are unable to find tracking url in known websites, try with know string parameters
    if (blacklisted === false) {
      blacklisted = fn_check_in_known_string_params(imgurl);
    }
  }
  return blacklisted;
}

function fn_clean_tracker_images(html) {
  var outer = $("<outer></other>");
  outer.html(html);
  try {
    var images = outer.find("img");
    $.each(images, function (k, img) {
      if (img) {
        var img_src = $(img).attr("src");
        if (img_src && fn_check_for_black_list(img_src)) {
          $(img).attr(
            "src",
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          );
        }
      }
    });
  } catch (ex) {}
  return outer.html();
}
