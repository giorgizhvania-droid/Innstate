import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { Destination, Deal } from "./data";

const FILE = path.join(process.cwd(), "src/data/content.json");

export type Content = {
  destinations: Destination[];
  deals: Deal[];
};

export async function getContent(): Promise<Content> {
  const raw = await fs.readFile(FILE, "utf-8");
  return JSON.parse(raw) as Content;
}

export async function saveContent(content: Content): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(content, null, 2), "utf-8");
}

export async function getDestinations(): Promise<Destination[]> {
  return (await getContent()).destinations;
}

export async function getDeals(): Promise<Deal[]> {
  return (await getContent()).deals;
}
