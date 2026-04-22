import {
  DEFAULT_ASSET_DIR,
  DEFAULT_CONTENT_DIR,
  DEFAULT_OBSIDIAN_SOURCE_DIR,
  syncObsidianSiteContent,
} from "./lib/obsidian-publishing.mjs";

const result = await syncObsidianSiteContent({
  sourceDir: DEFAULT_OBSIDIAN_SOURCE_DIR,
  contentDir: DEFAULT_CONTENT_DIR,
  assetDir: DEFAULT_ASSET_DIR,
});

console.log(
  `Synced ${result.entries.length} item(s) from ${DEFAULT_OBSIDIAN_SOURCE_DIR} to ${DEFAULT_CONTENT_DIR}.`,
);
