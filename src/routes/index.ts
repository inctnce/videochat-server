import { Router } from "express";
import messageRouter from "./message";
import roomRouter from "./room";
import userRouter from "./user";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/message", messageRouter);

export default router;
