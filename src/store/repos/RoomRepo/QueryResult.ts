import Room from "@models/Room";

type QueryResult = {
  rooms?: Room[];
  error?: Error;
};

export default QueryResult;
