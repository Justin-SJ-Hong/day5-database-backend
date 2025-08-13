import express from "express";
import { createOne, getAll, updateOne, deleteOne } from "./controller.mjs";

const router = express.Router();
// router.get("/:commentId", getAll);
// router.post("/", createOne);

export const commentRouter = router;
export const commentGetRouter = getAll;
export const commentCreateRouter = createOne;
export const commentUpdateRouter = updateOne;
export const commentDeleteRouter = deleteOne;
