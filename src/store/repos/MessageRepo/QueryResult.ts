import Message from "@models/Message";

type QueryResult = {
  messages?: Message[];
  error?: Error;
};

export default QueryResult;
