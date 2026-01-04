import db from "#db/client";

import { createFile } from "./queries/files.js";
import { createFolder } from "./queries/folders.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 3; i++) {
    const folder = await createFolder("Folder " + i);
    for (let j = 1; j <= 5; j++) {
      await createFile({
        name: "File " + j,
        size: 1000 * j,
        folderId: folder.id,
      });
    }
  }
}
