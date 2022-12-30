const splitURL = window.location.href.split("#");

export const BASE_GMAIL_LINK = splitURL[0].slice(0, splitURL[0].length - 1);
export const PAGE_LINK = `/#${splitURL[1]}`;

export const REQ = {
  GMAIL: {
    GET_MESSAGE:
      BASE_GMAIL_LINK + "?view=att&th=threadId&attid=0&disp=comp&safe=1&zw",
  },
};

export const DROPDOWN_ITEMS = {
  ITEM_ONE: "None",
  ITEM_TWO: "One Line",
  ITEM_THREE: "Two Line",
  ITEM_FOUR: "Three Line",
};
