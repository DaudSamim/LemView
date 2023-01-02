import * as InboxSDK from "@inboxsdk/core";
import $ from "jquery";
import "./styles/index.scss";
import { DROPDOWN_ITEMS } from "./constants";
import { getThreadEndpoint } from "./api/endpoints/gmail";
import parse from "parse-email";
import {
  getSelectedItem,
  getThreadContent,
  setSelectedItem,
  setThreadContent,
} from "./localStorage";

window.setImmediate = window.setTimeout;

const threadIdArray = [];

var request_counter = 0;
var settimeout_for_request_counter_reset = null;

InboxSDK.load(2, "sdk_gmail-message_90905ac7ac").then(async (sdk) => {
  onLoadSetup();
  getAllThreadIds(sdk.Lists);
  setEyeIconOnThread(sdk.Lists);
});

/************ Start Load Initial Setup Module ************/

const onLoadSetup = () => {
  const initialInterval = setInterval(() => {
    if (!getSelectedItem()) {
      setSelectedItem(DROPDOWN_ITEMS.ITEM_ONE);
    }

    setToolbarButton();
    addEmailPreview();
    onFilterHTMLContent();

    clearInterval(initialInterval);
  }, 500);

  setInterval(() => {
    injectClasses(getSelectedItem());
  }, 1000);
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

const onFilterHTMLContent = () => {
  if (threadIdArray.length > 0) {
    threadIdArray.map((item) => {
      var timeout = 130 * request_counter;
      fn_increase_request_counter();
      fn_reset_request_counter();

      setTimeout(async () => {
        if (item !== getThreadContent(item)?.id) {
          const getEmailResponse = await onGetThreadMessage(item);
          const response = await parse(getEmailResponse);
          fn_decrease_request_counter();

          let obj = {
            id: item,
            content: bodyParser(response.html),
          };

          setThreadContent(item, obj);
          injectClasses(getSelectedItem());
        }
      }, timeout);
    });
  }
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

      if (selectedItem === DROPDOWN_ITEMS.ITEM_ONE) {
        $("[role='link'] > .xT").removeClass("removeFlex");
        $("[role='link'] > .xT").addClass("addFlex");

        messageParagraph.innerHTML = `
          <span class="Zt">&nbsp;-&nbsp;</span>
            ${
              getThreadContent(messageId)
                ? getThreadContent(messageId).content === "false"
                  ? "Preview not available..."
                  : HTMLBodyParser(getThreadContent(messageId).content)
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
            getThreadContent(messageId)
              ? getThreadContent(messageId).content === "false"
                ? "Preview not available..."
                : HTMLBodyParser(getThreadContent(messageId).content).slice(
                    0,
                    108
                  )
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
            getThreadContent(messageId)
              ? getThreadContent(messageId).content === "false"
                ? "Preview not available..."
                : HTMLBodyParser(getThreadContent(messageId).content).slice(
                    0,
                    220
                  )
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
            getThreadContent(messageId)
              ? !getThreadContent(messageId).content
                ? "Preview not available..."
                : HTMLBodyParser(getThreadContent(messageId).content).slice(
                    0,
                    345
                  )
              : "Loading..."
          }
          </p>
        `;
      }
    });
};

/************ Ending Inject CSS Classes Module ************/

const addEmailPreview = () => {
  document
    .querySelectorAll("[data-inboxsdk-thread-row='true']")
    .forEach((threadRow) => {
      let messageId = threadRow
        .querySelector("[data-legacy-thread-id]")
        .getAttribute("data-legacy-thread-id");

      let eyeIcon = threadRow.querySelector(".inboxsdk__thread_row_button");

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
              getThreadContent(messageId)
                ? getThreadContent(messageId).content === "false"
                  ? "Preview not available..."
                  : getThreadContent(messageId).content
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
    console.log("None");
    onListPopupClose();
    setSelectedItem(DROPDOWN_ITEMS.ITEM_ONE);
    injectClasses(DROPDOWN_ITEMS.ITEM_ONE);
  }

  if (item === DROPDOWN_ITEMS.ITEM_TWO) {
    console.log("One Line");
    onListPopupClose();
    setSelectedItem(DROPDOWN_ITEMS.ITEM_TWO);
    injectClasses(DROPDOWN_ITEMS.ITEM_TWO);
  }

  if (item === DROPDOWN_ITEMS.ITEM_THREE) {
    console.log("Two Line");
    onListPopupClose();
    setSelectedItem(DROPDOWN_ITEMS.ITEM_THREE);
    injectClasses(DROPDOWN_ITEMS.ITEM_THREE);
  }

  if (item === DROPDOWN_ITEMS.ITEM_FOUR) {
    console.log("Three Line");
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
