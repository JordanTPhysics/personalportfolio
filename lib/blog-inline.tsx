import Link from "next/link";
import React from "react";

/**
 * Allows inline references in blog content:
 * - `[link text](https://example.com/path)` — external or absolute-path links
 * - `**bold**` — works in the same runs of text (link labels can include bold)
 */

function sanitizeBlogHref(raw: string): string | null {
  const href = raw.trim();
  if (!href) return null;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  const lower = href.toLowerCase();
  if (lower.startsWith("https://") || lower.startsWith("http://")) return href;
  return null;
}

function parseBoldOnly(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split("**");
  return parts.flatMap((part, i) => {
    if (!part) return [];
    if (i % 2 === 1) {
      return [
        <strong key={`${keyPrefix}-s${i}`} className="font-semibold">
          {part}
        </strong>,
      ];
    }
    return [<React.Fragment key={`${keyPrefix}-p${i}`}>{part}</React.Fragment>];
  });
}

const MD_LINK_RE = /\[([^\]]*)\]\(([^)\s]+)\)/g;

function renderBlogLink(
  label: string,
  href: string,
  key: string
): React.ReactElement {
  const children = parseBoldOnly(label, `${key}-lbl`);
  const className =
    "text-blue-600 underline hover:text-blue-800";

  if (href.startsWith("/")) {
    return (
      <Link key={key} href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function renderInlineMarkdown(
  text: string,
  keyPrefix: string
): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(MD_LINK_RE.source, "g");
  let chunk = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      out.push(
        ...parseBoldOnly(text.slice(last, m.index), `${keyPrefix}-b${chunk++}`)
      );
    }
    const label = m[1];
    const rawUrl = m[2];
    const safe = sanitizeBlogHref(rawUrl);
    if (safe) {
      out.push(renderBlogLink(label, safe, `${keyPrefix}-L${m.index}`));
    } else {
      out.push(
        <span key={`${keyPrefix}-bad${m.index}`} className="text-body">
          {m[0]}
        </span>
      );
    }
    last = m.index + m[0].length;
  }

  if (last < text.length) {
    out.push(...parseBoldOnly(text.slice(last), `${keyPrefix}-b${chunk}`));
  }

  if (out.length === 0) {
    return parseBoldOnly(text, keyPrefix);
  }

  return out;
}
