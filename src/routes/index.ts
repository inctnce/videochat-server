import { Router } from "express";
import roomRouter from "./room";
import userRouter from "./user";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/room", roomRouter);

export default router;
