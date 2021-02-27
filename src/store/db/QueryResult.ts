import { MysqlError } from "mysql";

type QueryResult = {
	result?: any[];
	error: MysqlError;
};

export default QueryResult;
