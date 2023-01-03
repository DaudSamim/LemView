import * as InboxSDK from "@inboxsdk/core";
import $ from "jquery";
import "./styles/index.scss";
import { DROPDOWN_ITEMS } from "./constants";
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

const onLoadSetup = (sdk) => {
  setInterval(() => {
    var temp_thread_id = document
      .querySelector("span[data-legacy-thread-id]")
      .getAttribute("data-legacy-thread-id");
    if (!localStorage.getItem("First_thread_id")) {
      if (temp_thread_id != localStorage.getItem("First_thread_id")) {
        localStorage.setItem("First_thread_id", temp_thread_id);
      }
    } else if (localStorage.getItem("First_thread_id") != temp_thread_id) {
      localStorageData = [];
      threadIdArray = [];
      request_counter = 0;
      globalCounter = 0;

      getAllThreadIds(sdk.Lists);
      localStorage.setItem("First_thread_id", temp_thread_id);

      setTimeout(() => {
        onFilterHTMLContent(sdk);
      }, 2000);
    }
  }, 1000);

  const initialInterval = setInterval(() => {
    if (!getSelectedItem()) {
      setSelectedItem(DROPDOWN_ITEMS.ITEM_ONE);
    }

    setToolbarButton();
    onFilterHTMLContent(sdk);

    clearInterval(initialInterval);
  }, 500);
};

/************ End Load Initial Setup Module ************/

/************ Start Toolbar Button Module ************/

const setToolbarButton = () => {
  if ($("[data-toolbar-icononly='true']")) {
    $("[data-toolbar-icononly='true'] > .bzn > .G-tF").append(
      `<div class="G-Ni J-J5-Ji">
          <div id="listToolbarItem" class="T-I J-J5-Ji nf T-I-ax7 L3" role="button" tabindex="0" aria-haspopup="false" aria-expanded="false" data-tooltip="Select Line" aria-label="Line">
            <div class="asa">
              <i class="fas fa-bars" style="font-size: 18px; color: #5F6368;"></i>
            </div>
            <div class="G-asx T-I-J3 J-J5-Ji">&nbsp;</div>
          </div>

          <div id="listPopupContainer" style="display: none">
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
        </div>`
    );

    document
      .getElementById("listToolbarItem")
      .addEventListener("click", onListSelectPopup);

    document
      .querySelectorAll(".listPopupItem")
      .forEach((item) => item.addEventListener("click", onSelectListItem));
  }
};

const onListSelectPopup = () => {
  if (document.getElementById("listPopupContainer").style.display === "none") {
    onListPopupOpen();
  } else {
    onListPopupClose();
  }
};

const onListPopupOpen = () => {
  $("#listPopupContainer").attr("style", "display: block");
};

const onListPopupClose = () => {
  $("#listPopupContainer").attr("style", "display: none");
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
          content: bodyParser(response.html),
          showLabel: false,
        };

        localStorageData.push(obj);
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
                  : fn_get_plain_text_from_email_original_content_of_html(
                      result.content
                    )
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
                : fn_get_plain_text_from_email_original_content_of_html(
                    result.content
                  ).slice(0, 108)
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
                : fn_get_plain_text_from_email_original_content_of_html(
                    result.content
                  ).slice(0, 220)
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
                : fn_get_plain_text_from_email_original_content_of_html(
                    result.content
                  ).slice(0, 345)
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
          <div class="iframeContainer" style="width: ${
            threadRow.clientWidth - 48
          }px; left: -${threadRow.clientWidth - 200}px">
            ${
              result
                ? result.content === "false"
                  ? "Preview not available..."
                  : result.content
                : "Loading..."
            }
          </div>
        `;
      });

      eyeIcon.addEventListener("mouseout", (e) => {
        e.currentTarget.innerHTML = `
          <div class="inboxsdk__button_icon">
            <img class="inboxsdk__button_iconImg" src="https://res.cloudinary.com/the-fastech/image/upload/v1672640397/view_qt43wn.png">
          </div>
        `;
      });
    });
};

/************ Ending Inject CSS Classes Module ************/

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
  sdk.Lists.registerThreadRowViewHandler((list, i) => {
    var result = localStorageData.find((obj) => obj.id === list.getThreadID());

    result && result.content !== "false" && !result.showLabel
      ? list.addLabel({
          title: calculateThreadReadingTime(HTMLBodyParser(result.content)),
          foregroundColor: "#E3E3E3",
          backgroundColor: "#FF5834",
        })
      : "";

    result && result.content !== "false" && !result.showLabel
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
