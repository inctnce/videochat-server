import { MysqlError } from "mysql";

type QueryResult = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	result?: any[];
	error: MysqlError;
};

export default QueryResult;
