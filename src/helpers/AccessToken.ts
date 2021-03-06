import jwt from "jsonwebtoken";

class AccessToken {
	static generate(id: string): string {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: 60 * 60 });
	}
	static verify(token: string): boolean {
		try {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
			return true;
		} catch (error) {
			return false;
		}
	}

	static decode(token: string): any {
		return jwt.decode(token);
	}
}

export default AccessToken;
