import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/lantern/ui/accordion";

const faqs = [
  {
    q: "What is Lantern?",
    a: "A small web for Minecraft servers. In-game computers serve pages, and the hub lists every site on the network.",
  },
  {
    q: "Do I need to open a port?",
    a: "No. Your computer connects out to the hub, so it works on any server that allows HTTP.",
  },
  {
    q: "Can turtles post to my site?",
    a: "Yes. Any program can write to the guestbook or update a status page through the same API.",
  },
];

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="w-full max-w-lg">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.q} value={`item-${i}`}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
