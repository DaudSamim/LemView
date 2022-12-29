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

InboxSDK.load(2, "sdk_gmail-message_90905ac7ac").then(async (sdk) => {
  onLoadSetup();
  getAllThreadIds(sdk.Lists);
});

/************ Start Load Initial Setup Module ************/

const onLoadSetup = () => {
  const initialInterval = setInterval(() => {
    if (!getSelectedItem()) {
      setSelectedItem(DROPDOWN_ITEMS.ITEM_ONE);
    }

    setToolbarButton();
    onFilterHTMLContent();

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
              <img src="https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365" alt="icon"
              width="25px" height="25px" />
            </div>
            <div class="G-asx T-I-J3 J-J5-Ji">&nbsp;</div>
          </div>

          <div id="listPopupContainer" style="display: none">
            <div class="J-M aX0 aYO jQjAxd" style="width: 130px; height: auto; padding: 10px; top: 30px; left: 15px;">
              <div class="J-N-Jz listPopupItem">
                ${DROPDOWN_ITEMS.ITEM_ONE}
              </div>
              <div class="J-N-Jz listPopupItem">
                ${DROPDOWN_ITEMS.ITEM_TWO}
              </div>
              <div class="J-N-Jz listPopupItem">
                ${DROPDOWN_ITEMS.ITEM_THREE}
              </div>
              <div class="J-N-Jz listPopupItem">
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
      if (item !== getThreadContent(item)?.id) {
        setTimeout(async () => {
          const getEmailResponse = await onGetThreadMessage(item);
          const response = await parse(getEmailResponse);

          let obj = {
            id: item,
            content: HTMLBodyParser(response.html),
            html: response.html,
          };

          setThreadContent(item, obj);
          injectClasses(getSelectedItem());
        }, 2000);
      }
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
  document.querySelectorAll("[role='link'] > .xT").forEach((threadRow) => {
    let messageId = threadRow
      .querySelector("[data-legacy-thread-id]")
      .getAttribute("data-legacy-thread-id");

    let messageParagraph = threadRow.querySelector(".y2");

    if (selectedItem === DROPDOWN_ITEMS.ITEM_ONE) {
      $("[role='link'] > .xT").removeClass("removeFlex");
      $("[role='link'] > .xT").addClass("addFlex");

      messageParagraph.innerHTML = `
          <span class="Zt">&nbsp;-&nbsp;</span>
            ${getThreadContent(messageId)?.content}
          `;
    }

    if (selectedItem === DROPDOWN_ITEMS.ITEM_TWO) {
      $("[role='link'] > .xT").removeClass("addFlex");
      $("[role='link'] > .xT").addClass("removeFlex");

      messageParagraph.setAttribute("style", "display: block; margin-top: 5px");
      messageParagraph.innerHTML = `
          <p class="messageText">${getThreadContent(messageId)?.content.slice(
            0,
            108
          )}</p>
        `;
    }

    if (selectedItem === DROPDOWN_ITEMS.ITEM_THREE) {
      $("[role='link'] > .xT").removeClass("addFlex");
      $("[role='link'] > .xT").addClass("removeFlex");

      messageParagraph.setAttribute("style", "display: block; margin-top: 5px");
      messageParagraph.innerHTML = `
          <p class="messageText">${getThreadContent(messageId)?.content.slice(
            0,
            220
          )}</p>
        `;
    }

    if (selectedItem === DROPDOWN_ITEMS.ITEM_FOUR) {
      $("[role='link'] > .xT").removeClass("addFlex");
      $("[role='link'] > .xT").addClass("removeFlex");

      messageParagraph.setAttribute("style", "display: block; margin-top: 5px");
      messageParagraph.innerHTML = `
          <p class="messageText">${getThreadContent(messageId)?.content.slice(
            0,
            345
          )}</p>
        `;
    }
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
    .replace(/\s{2,}/g, " ");
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

/************ Starting Load Gmail Threads Module ************/
