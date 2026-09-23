import { Prose } from "@/registry/lantern/ui/typography";

// Stand-in for HTML rendered from markdown by your CMS or a markdown library.
const html = `
<h2>Relay changelog</h2>
<p>Turtle relays now retry a dropped hop before giving up. Read the <a href="#">relay guide</a> for setup.</p>
<h3>Changed</h3>
<ul>
  <li>Hops time out after <code>3s</code> instead of <code>10s</code>.</li>
  <li>Relays report fuel to the <strong>status page</strong>.</li>
</ul>
<h3>Upgrade</h3>
<ol>
  <li>Stop the relay.</li>
  <li>Update the program.</li>
  <li>Start it again.</li>
</ol>
<pre><code>lantern relay stop
lantern update relay
lantern relay start --hops 4</code></pre>
<blockquote><p>Relays on the old version keep working, but cannot retry.</p></blockquote>
<hr />
<h4>Known issues</h4>
<table>
  <thead><tr><th>Issue</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Relays in unloaded chunks stall</td><td>Investigating</td></tr>
    <tr><td>Fuel reads 0 after restart</td><td>Fixed in 0.3.2</td></tr>
  </tbody>
</table>
`;

export default function TypographyProse() {
  return <Prose className="w-full" dangerouslySetInnerHTML={{ __html: html }} />;
}
