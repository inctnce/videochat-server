import mysql from "mysql";
import QueryResult from "./QueryResult";

class Database {
	private static instance: Database;
	private db: mysql.Pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL!);

	constructor() {
		if (Database.instance) {
			return Database.instance;
		}

		Database.instance = this;
	}

	query(query: string): Promise<QueryResult> {
		return new Promise((resolve) => {
			this.db.query(query, (error: mysql.MysqlError, result: any[]) => {
				if (error) {
					return resolve({ result: undefined, error: error });
				}

				return resolve({ result: result, error: error });
			});
		});
	}
}

export default Database;
