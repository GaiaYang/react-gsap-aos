/** 區塊元素標籤 */
export type BlockElementTag =
  | "address"
  | "article"
  | "aside"
  | "blockquote"
  | "canvas"
  | "dd"
  | "div"
  | "dl"
  | "dt"
  | "fieldset"
  | "figcaption"
  | "figure"
  | "footer"
  | "form"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "header"
  | "hr"
  | "li"
  | "main"
  | "nav"
  | "noscript"
  | "ol"
  | "p"
  | "pre"
  | "section"
  | "table"
  | "tfoot"
  | "ul"
  | "video";

/** 區塊元素標籤清單 */
const BLOCK_ELEMENT_TAGS: BlockElementTag[] = [
  "address",
  "article",
  "aside",
  "blockquote",
  "canvas",
  "dd",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "noscript",
  "ol",
  "p",
  "pre",
  "section",
  "table",
  "tfoot",
  "ul",
  "video",
];

/**
 * 檢查標籤是否是區塊元素
 *
 * @see https://www.w3schools.com/html/html_blocks.asp
 * */
export default function isBlockElementTag(
  value: unknown,
): value is BlockElementTag {
  return BLOCK_ELEMENT_TAGS.includes(value as BlockElementTag);
}
