import Message from "@models/Message";

type QueryOneResult = {
  message?: Message;
  error?: Error;
};

export default QueryOneResult;
