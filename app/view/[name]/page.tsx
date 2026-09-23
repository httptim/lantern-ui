import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blockItems } from "@/lib/docs";
import { blocks } from "@/registry/__index__";

export const metadata: Metadata = { robots: { index: false } };

export function generateStaticParams() {
  return blockItems.map((c) => ({ name: c.name }));
}

/** A block on its own, with no site chrome. The docs load this in an iframe. */
export default async function BlockView({ params }: { params: Promise<{ name: string }> }) {
  const Block = blocks[(await params).name];
  if (!Block) notFound();
  return <Block />;
}
