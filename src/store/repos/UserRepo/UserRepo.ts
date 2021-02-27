import User from "@models/User";
import AccessToken from "@helpers/AccessToken";

import QueryResult from "./QueryResult";
import IRepo from "../IRepo";
import Repo from "@repos/Repo";

class UserRepo extends Repo implements IRepo {
	private static instance: UserRepo;

	constructor() {
		super();

		if (UserRepo.instance) {
			return UserRepo.instance;
		}

		UserRepo.instance = this;
	}

	async create(user: User) {
		const query = `INSERT INTO users VALUES("${user.Id()}", "${user.Nickname()}", "${user.Email()}", "${user.HashedPassword()}", "${user.RefreshToken()}")`;
		return await this.db.query(query);
	}

	async readOne(key: string, field: "nickname" | "id" | "email"): Promise<QueryResult> {
		const query = `SELECT * FROM users WHERE \`${field}\` = "${key}"`;
		const { result, error } = await this.db.query(query);

		if (error) {
			return { user: undefined, error: new Error("error getting user") };
		}

		if (result!.length === 0) {
			return {};
		}

		const accessToken: string = AccessToken.generate(result![0].id);
		const user: User = new User(
			result![0].nickname,
			result![0].email,
			result![0].password,
			result![0].token,
			accessToken,
			result![0].id
		);

		return { user: user, error: undefined };
	}

	async update(id: string, value: string | null, field: string): Promise<QueryResult> {
		const query: string = this.setUpdateQuery(value, field, id);
		const { error } = await this.db.query(query);

		if (error) {
			return { user: undefined, error: new Error("error updating user") };
		}

		return { user: undefined, error: undefined };
	}

	private setUpdateQuery(value: string | null, field: string, id: string) {
		if (value === null) {
			return `UPDATE users SET \`${field}\` = NULL WHERE id = "${id}"`;
		} else {
			return `UPDATE users SET \`${field}\` = "${value}" WHERE id = "${id}"`;
		}
	}

	async delete(id: string): Promise<QueryResult> {
		const query = `DELETE FROM users WHERE id = "${id}"`;
		const { error } = await this.db.query(query);

		if (error) {
			return { user: undefined, error: new Error("error updating user") };
		}

		return { user: undefined, error: undefined };
	}

	async doesExist(nickname?: string, email?: string): Promise<boolean> {
		const nicknameExists = nickname ? (await this.readOne(nickname, "nickname")).user : undefined;
		const emailExists = email ? (await this.readOne(email, "email")).user : undefined;

		return !!(nicknameExists || emailExists);
	}
}

export default UserRepo;
