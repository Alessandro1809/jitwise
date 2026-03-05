type MarkdownRendererProps = {
  content: string;
};

type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

const flushParagraph = (blocks: Block[], lines: string[]) => {
  if (lines.length === 0) return;
  const text = lines.join(" ").trim();
  if (text.length > 0) {
    blocks.push({ type: "paragraph", text });
  }
  lines.length = 0;
};

const flushList = (blocks: Block[], items: string[]) => {
  if (items.length === 0) return;
  blocks.push({ type: "list", items: [...items] });
  items.length = 0;
};

const parseMarkdown = (content: string): Block[] => {
  const lines = content.split(/\r?\n/);
  const blocks: Block[] = [];
  const paragraphLines: string[] = [];
  const listItems: string[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      flushParagraph(blocks, paragraphLines);
      flushList(blocks, listItems);
      return;
    }

    if (trimmed.startsWith("#")) {
      flushParagraph(blocks, paragraphLines);
      flushList(blocks, listItems);
      const text = trimmed.replace(/^#+\s*/, "");
      blocks.push({ type: "heading", level: 2, text });
      return;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph(blocks, paragraphLines);
      flushList(blocks, listItems);
      blocks.push({
        type: "heading",
        level: 3,
        text: trimmed.replace(/^\d+\.\s+/, ""),
      });
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph(blocks, paragraphLines);
      listItems.push(trimmed.replace(/^[-*]\s+/, ""));
      return;
    }

    if (trimmed.toUpperCase() === trimmed && trimmed.length <= 40) {
      flushParagraph(blocks, paragraphLines);
      flushList(blocks, listItems);
      blocks.push({ type: "heading", level: 2, text: trimmed });
      return;
    }

    paragraphLines.push(trimmed);
  });

  flushParagraph(blocks, paragraphLines);
  flushList(blocks, listItems);

  return blocks;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseMarkdown(content);

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level === 2 ? "h3" : "h4";
          return (
            <Tag
              key={`${block.type}-${index}`}
              className={
                block.level === 2
                  ? "text-base font-semibold text-foreground"
                  : "text-sm font-semibold text-foreground"
              }
            >
              {block.text}
            </Tag>
          );
        }
        if (block.type === "paragraph") {
          return (
            <p key={`${block.type}-${index}`} className="text-sm text-foreground">
              {block.text}
            </p>
          );
        }
        return (
          <ul
            key={`${block.type}-${index}`}
            className="list-disc space-y-2 pl-5 text-sm text-foreground"
          >
            {block.items.map((item, itemIndex) => (
              <li key={`${index}-${itemIndex}`}>{item}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
