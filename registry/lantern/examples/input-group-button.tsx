"use client";

import * as React from "react";
import { CheckIcon, CopyIcon, EyeIcon, EyeOffIcon, SendIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/lantern/ui/input-group";

export default function InputGroupWithButton() {
  const [copied, setCopied] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput readOnly value="wget run hub://lantern/install" aria-label="Install command" className="font-mono text-[13px]" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={copied ? "Copied" : "Copy command"}
            onClick={() => {
              navigator.clipboard?.writeText("wget run hub://lantern/install");
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? <CheckIcon className="text-success" /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput
          type={visible ? "text" : "password"}
          defaultValue="lantern-key-81"
          aria-label="Hub API key"
          className="font-mono text-[13px]"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={visible ? "Hide key" : "Show key"}
            aria-pressed={visible}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="you@example.com" type="email" aria-label="Email for invite" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="default" size="sm">
            Invite
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Write in the guestbook..." aria-label="Guestbook message" />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText className="text-[11px]">Markdown supported</InputGroupText>
          <InputGroupButton variant="default" size="sm" className="ml-auto">
            <SendIcon />
            Post
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
