import User from "@models/User";

type QueryResult = {
  user?: User;
  error?: Error;
};

export default QueryResult;
