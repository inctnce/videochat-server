import jwt from "jsonwebtoken";

class AccessToken {
	static generate(id: string): string {
		return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: 60 * 60 });
	}
	static verify(token: string): boolean {
		try {
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
			return true;
		} catch (error) {
			return false;
		}
	}
}

export default AccessToken;
