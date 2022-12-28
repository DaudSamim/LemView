import * as InboxSDK from "@inboxsdk/core";
import $ from "jquery";
import "./styles/index.scss";
import { DROPDOWN_ITEMS } from "./constants";
import { getThreadEndpoint } from "./api/endpoints/gmail";
import parse from "parse-email";

window.setImmediate = window.setTimeout;

const threadIdArray = [];

InboxSDK.load(2, "sdk_gmail-message_90905ac7ac").then(async (sdk) => {
  onLoadSetup();
  getAllThreadIds(sdk.Lists);

  const getEmailResponse = await onGetThreadMessage();

  const response = await parse(getEmailResponse);

  console.log(response, "email parser");
});

const onLoadSetup = () => {
  const findToolbarContainer = setInterval(() => {
    setToolbarButton();
    clearInterval(findToolbarContainer);
  }, 500);
};

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

  if (item === DROPDOWN_ITEMS.ITEM_ONE) {
    console.log("None");
    onListPopupClose();
  }

  if (item === DROPDOWN_ITEMS.ITEM_TWO) {
    console.log("One Line");
    onListPopupClose();
  }

  if (item === DROPDOWN_ITEMS.ITEM_THREE) {
    console.log("Two Line");
    onListPopupClose();
  }

  if (item === DROPDOWN_ITEMS.ITEM_FOUR) {
    console.log("Three Line");
    onListPopupClose();
  }
};

/************ Ending Toolbar Button Module ************/

/************ Start Get all Thread Ids Module ************/

const getAllThreadIds = (list) => {
  list.registerThreadRowViewHandler(async (threadRowView) => {
    threadIdArray.push(await threadRowView.getThreadIDAsync());
  });
};

/************ Ending Get all Thread Ids Module ************/

/************ Starting Gmail API Calling Module ************/

const onGetThreadMessage = async (threadId) => {
  const response = await getThreadEndpoint("185587b33ad9d0cb");
  if (response.status === 200) {
    return response.data;
  }
};

// "185587b33ad9d0cb"

/************ Ending Gmail API Calling Module ************/
