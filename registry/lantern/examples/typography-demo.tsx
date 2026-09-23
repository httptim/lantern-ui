import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyInlineCode,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall,
  TypographyTable,
} from "@/registry/lantern/ui/typography";

export default function TypographyDemo() {
  return (
    <article className="w-full max-w-2xl">
      <TypographySmall>Guide / 4 min read</TypographySmall>
      <TypographyH1 className="mt-4">Publishing your first hub site</TypographyH1>
      <TypographyLead className="mt-5">
        Every in-game computer can serve a small website to the rest of the server. Here is how to put one up.
      </TypographyLead>

      <TypographyH2 className="mt-10">Seed the computer</TypographyH2>
      <TypographyP>
        Run <TypographyInlineCode>lantern seed</TypographyInlineCode> once. It writes a{" "}
        <TypographyInlineCode>.lantern</TypographyInlineCode> folder with your site name and a key that proves the site
        is yours.
      </TypographyP>
      <TypographyBlockquote>Keep the seed file. Lose it and the name goes back to the directory after a week.</TypographyBlockquote>

      <TypographyH3>What goes in a site</TypographyH3>
      <TypographyList>
        <li>An index page, written in plain Lua or markdown.</li>
        <li>Optional pages, one file each.</li>
        <li>A guestbook, if you want visitors to sign.</li>
      </TypographyList>

      <TypographyH3>Limits</TypographyH3>
      <TypographyTable>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Limit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pages per site</td>
            <td>64</td>
          </tr>
          <tr>
            <td>Total size</td>
            <td>512 KB</td>
          </tr>
          <tr>
            <td>Guestbook entries</td>
            <td>1,000</td>
          </tr>
        </tbody>
      </TypographyTable>
      <TypographyMuted>Limits are per computer, not per player.</TypographyMuted>
    </article>
  );
}
