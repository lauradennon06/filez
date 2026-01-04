import express from "express";
const router = express.Router();
export default router;

import { getFilesAndFolderName } from "#db/queries/files";

router.get("/", async (req, res) => {
  const files = await getFilesAndFolderName();
  res.send(files);
});
