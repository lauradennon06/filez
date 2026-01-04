import express from "express";
const router = express.Router();
export default router;

import { createFile } from "#db/queries/files";
import { getFolderAndFiles, getFolders } from "#db/queries/folders";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  const folder = await getFolderAndFiles(id);
  if (!folder) {
    return res.status(404).send({ message: "Folder not found" });
  }
  req.folder = folder;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.folder);
});

router.post("/:id/files", async (req, res) => {
  if (!req.body)
    return res.status(400).send({ message: "Request body is missing" });

  const { name, size } = req.body;
  if (!name || !size)
    return res.status(400).send({ message: "Missing required file details" });

  const file = await createFile(name, size, req.folder.id);
  res.status(201).send(file);
});
