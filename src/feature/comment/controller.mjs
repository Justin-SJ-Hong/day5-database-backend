import getPageStartEnd from "../../util/getPageStartEnd.mjs";
import { commentCreate, commentFindById, commentFindMany, commentUpdate } from "./model.mjs";

export const getAll = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const post_id = req.params.postId;
  const { pageStart, pageEnd } = getPageStartEnd(Number(limit), Number(page));

  try {
    const result = await commentFindMany(pageStart, pageEnd, Number(post_id));
    if (!result) return res.status(404).json({ error: "Not Found" });
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ error: e.stack });
  }
};

export const createOne = async (req, res) => {
  const content = req.body.content;
  const customer_id = req.body.customerId;
  const post_id = req.body.postId;
  if (!post_id || !customer_id || !content)
    return res.status(400).json({ error: "Bad Request" });

  const like = {
    post_id,
    customer_id,
    content,
  };

  try {
    const result = await commentCreate(like);
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(400).json({ error: e.stack });
  }
};

export const updateOne = async (req, res) => {
  const content = String(req.body?.content ?? "").trim();
  const comment_id = Number(req.params.commentId);
  const post_id = Number(req.body.postId);

  if (!Number.isInteger(post_id) || !Number.isInteger(comment_id) || !content) {
    return res.status(400).json({ error: "Bad Request" });
  }

  try {
    const existing = await commentFindById(comment_id);
    if(!existing || existing.post_id !== post_id) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const result = await commentUpdate({ comment_id, content });
    return res.status(200).json({ data: result });
  } catch (e) {
    if (e?.code === "P2025") {
      return res.status(404).json({ error: "Comment not found" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}