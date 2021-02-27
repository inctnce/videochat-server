import Model from "./Model";
import AccessToken from "@helpers/AccessToken";
import RefreshToken from "@helpers/RefreshToken";

class User extends Model {
	private nickname: string;
	private email: string;
	private hashedPassword: string;
	private refreshToken: string;
	private accessToken: string;

	constructor(
		nickname: string,
		email: string,
		hashedPassword: string,
		refreshToken: string,
		accessToken: string,
		id?: string,
		creationDate?: Date
	) {
		super(id, creationDate);
		this.nickname = nickname;
		this.email = email;
		this.hashedPassword = hashedPassword;
		this.refreshToken = refreshToken;
		this.accessToken = accessToken;
	}

	Nickname(): string {
		return this.nickname;
	}

	Email(): string {
		return this.email;
	}

	HashedPassword(): string {
		return this.hashedPassword;
	}

	RefreshToken(): string {
		return this.refreshToken;
	}

	AccessToken(): string {
		return this.accessToken;
	}

	SetAccessToken() {
		this.accessToken = AccessToken.generate(this.id);
	}

	SetRefreshToken() {
		this.refreshToken = RefreshToken.generate(this.id);
	}
}

export default User;
