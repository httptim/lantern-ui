import { createHighlighter, type Highlighter } from "shiki";

const lantern = {
  name: "lantern",
  type: "dark" as const,
  colors: { "editor.background": "#00000000", "editor.foreground": "#c6d4b8" },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#6c7f68", fontStyle: "italic" } },
    { scope: ["keyword", "storage", "storage.type", "keyword.control", "keyword.operator.new"], settings: { foreground: "#f5a665" } },
    { scope: ["string", "string.quoted", "string.template"], settings: { foreground: "#d9b774" } },
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#e8c98a" } },
    { scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: "#9bba86" } },
    { scope: ["entity.name.tag", "support.class.component"], settings: { foreground: "#8fb3c9" } },
    { scope: ["entity.other.attribute-name"], settings: { foreground: "#e8c98a" } },
    { scope: ["entity.name.type", "support.type", "entity.name.class"], settings: { foreground: "#8fb3c9" } },
    { scope: ["variable", "variable.other", "meta.object-literal.key"], settings: { foreground: "#eeeade" } },
    { scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: "#96a399" } },
    { scope: ["support.type.property-name.css", "support.type.property-name"], settings: { foreground: "#9bba86" } },
  ],
};

let highlighter: Promise<Highlighter> | undefined;

export async function highlight(code: string, lang = "tsx") {
  highlighter ??= createHighlighter({ themes: [lantern], langs: ["tsx", "bash", "css", "json"] });
  return (await highlighter).codeToHtml(code, { lang, theme: "lantern" });
}
