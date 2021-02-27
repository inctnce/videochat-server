import Store from "@store";
import jwt from "jsonwebtoken";

class RefreshToken {
	static generate(id: string): string {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return jwt.sign(JSON.stringify({ id: id }), process.env.REFRESH_TOKEN_SECRET!);
	}
	static async verify(id: string, token: string): Promise<boolean> {
		const { user } = await Store.User().readOne(id, "id");

		if (user) {
			return !!(user.RefreshToken() === token);
		}

		return false;
	}
}

export default RefreshToken;
