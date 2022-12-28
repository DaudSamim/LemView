import { REQ } from "../../../constants";
import { callGet } from "../../integrations/calls";

export const getThreadEndpoint = async (threadId) => {
  return await callGet(REQ.GMAIL.GET_MESSAGE.replace("threadId", threadId));
};
