"use client";

import * as React from "react";
import { FileCode, FileText, Image as ImageIcon, X } from "lucide-react";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/lantern/ui/attachment";
import { Button } from "@/registry/lantern/ui/button";

const initial = [
  { id: "1", name: "startup.lua", size: "2.4 KB", icon: FileCode },
  { id: "2", name: "tunnel-map.png", size: "184 KB", icon: ImageIcon },
  { id: "3", name: "hub-rules.txt", size: "1.1 KB", icon: FileText },
];

export default function AttachmentDemo() {
  const [files, setFiles] = React.useState(initial);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <AttachmentGroup>
        {files.map((file) => (
          <Attachment key={file.id}>
            <AttachmentMedia>
              <file.icon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription>{file.size}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                aria-label={`Remove ${file.name}`}
                onClick={() => setFiles((current) => current.filter((f) => f.id !== file.id))}
              >
                <X />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ))}
      </AttachmentGroup>
      {files.length < initial.length && (
        <Button variant="link" size="sm" className="self-start" onClick={() => setFiles(initial)}>
          Restore files
        </Button>
      )}
    </div>
  );
}
