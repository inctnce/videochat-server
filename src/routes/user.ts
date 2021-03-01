import { Router } from "express";

import User from "@models/User";
import Store from "@store";

import AccessToken from "@helpers/AccessToken";
import Password from "@helpers/Password";
import RefreshToken from "@helpers/RefreshToken";
import verifyToken from "@middlewares/verifyToken";

const userRouter: Router = Router();

userRouter.post("/create", async (req, res) => {
	const nickname: string = req.body.nickname;
	const email: string = req.body.email;
	const password: string = req.body.password;

	if (await Store.User().doesExist(nickname, email)) {
		return res.status(409).send({ error: "user already exists" });
	}

	const hashedPassword: string = await Password.generate(password);
	const id: string = User.createId();
	const accessToken: string = AccessToken.generate(id);
	const refreshToken: string = RefreshToken.generate(id);
	const newUser = new User(nickname, email, hashedPassword, refreshToken, accessToken, id);

	const { error } = await Store.User().create(newUser);
	if (error) {
		res.status(400).send(error);
	}

	return res.status(201).send(newUser);
});

userRouter.post("/login", async (req, res) => {
	const email: string = req.body.email;
	const password: string = req.body.password;

	const doesExist: boolean = await Store.User().doesExist(undefined, email);
	if (doesExist) {
		const { user, error } = await Store.User().readOne(email, "email");

		if (error) {
			return res.status(503).send(error);
		}

		if (user) {
			const isValidPassword: boolean = await Password.compare(password, user.HashedPassword());
			if (isValidPassword) {
				user.SetAccessToken();

				if (user.RefreshToken()) {
					return res.status(200).send(user);
				}

				user.SetRefreshToken();
				const { error } = await Store.User().update(user.Id(), user.RefreshToken(), "token");

				if (error) {
					return res.status(503).send(error);
				}

				return res.status(200).send(user);
			}
		}
	}
	return res.status(400).send({ error: "invalid email or password" });
});

userRouter.get("/:id/logout", verifyToken, async (req, res) => {
	const { error } = await Store.User().update(req.params.id, null, "token");

	if (error) {
		return res.sendStatus(503);
	}

	return res.sendStatus(200);
});

userRouter.get("/", verifyToken, async (req, res) => {
	if (req.headers.authorization) {
		const token: string = req.headers.authorization.split(" ")[1];
		const { id } = AccessToken.decode(token);

		const { user, error } = await Store.User().readOne(id, "id");

		if (error) {
			return res.sendStatus(503);
		}

		return res.status(200).send(user);
	}

	return res.status(400).send({ error: "token was not provided" });
});

userRouter.get("/token", async (req, res) => {
	if (req.headers.authorization) {
		const refreshToken: string = req.headers.authorization.split(" ")[1];
		const id = RefreshToken.decode(refreshToken);

		const isValid: boolean = await RefreshToken.verify(id, refreshToken);
		if (isValid) {
			const accessToken: string = AccessToken.generate(id);
			return res.status(200).send({ accessToken: accessToken });
		}
	}

	return res.status(400).send({ error: "unauthorized user" });
});

export default userRouter;
