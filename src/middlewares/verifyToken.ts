import { NextFunction, Request, Response } from "express";
import AccessToken from "@helpers/AccessToken";

function verifyToken(req: Request, res: Response, next: NextFunction): void | Response {
	if (req.headers.authorization) {
		const accessToken: string = req.headers.authorization.split(" ")[1];

		if (accessToken) {
			const isValid: boolean = AccessToken.verify(accessToken);
			if (isValid) {
				return next();
			}
		}
		return res.status(403).send({ error: "invalid access token" });
	}

	return res.status(403).send({ error: "no authorization header" });
}

export default verifyToken;
