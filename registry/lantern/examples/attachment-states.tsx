import { FileCode, FileWarning, Upload } from "lucide-react";

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/registry/lantern/ui/attachment";
import { Spinner } from "@/registry/lantern/ui/spinner";

export default function AttachmentStates() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Attachment state="idle">
        <AttachmentMedia>
          <Upload />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Drop a file</AttachmentTitle>
          <AttachmentDescription>Up to 1 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentTrigger aria-label="Choose a file" />
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>excavate.lua</AttachmentTitle>
          <AttachmentDescription>Uploading 64%</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <FileWarning />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>world-backup.zip</AttachmentTitle>
          <AttachmentDescription>Too large, 48 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <div className="flex gap-2">
        <Attachment size="sm">
          <AttachmentMedia>
            <FileCode />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>go.lua</AttachmentTitle>
            <AttachmentDescription>820 B</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment size="xs" className="min-w-0">
          <AttachmentMedia>
            <FileCode />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>fuel.lua</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
      </div>
    </div>
  );
}
