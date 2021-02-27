import Store from "@store";
import jwt from "jsonwebtoken";

class RefreshToken {
	static generate(id: string): string {
		return jwt.sign(JSON.stringify({ id: id }), process.env.REFRESH_TOKEN_SECRET!);
	}
	static async verify(id: string, token: string): Promise<boolean> {
		const { user, error } = await Store.User().readOne(id, "id");

		return !!(user!.RefreshToken() === token);
	}
}

export default RefreshToken;
