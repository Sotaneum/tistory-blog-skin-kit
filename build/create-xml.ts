import pkg from "../package.json";

type Any = string | number | boolean | null | undefined;
type JSON = { [key: string]: Any | JSON };

const HEADER = '<?xml version="1.0" encoding="utf-8"?>';

function toString(value: Any) {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return `${value}`;
  }
  if (typeof value === "boolean") {
    return value ? `true` : `false`;
  }
  if (value === null || value === undefined) {
    return "";
  }
  throw new Error("Invalid" + value);
}

function jsonToXML(json: JSON, tabSize = 2, depth = 0): string {
  const spaces = new Array(depth)
    .fill(
      new Array(tabSize)
        .fill(1)
        .map(() => " ")
        .join("")
    )
    .join("");
  return Object.keys(json)
    .map((key: string) => {
      const isObject =
        typeof json[key] === "object" && !Array.isArray(json[key]);
      const body = isObject
        ? `\n${jsonToXML(json[key] as JSON, tabSize, depth + 1)}\n${spaces}`
        : toString(json[key] as Any);
      return `${spaces}<${key}>${body}</${key}>`;
    })
    .join("\n");
}

function createXml() {
  const information = {
    name: pkg.name,
    version: pkg.version,
    description: `<![CDATA[${pkg.description}]]>`,
    license: `<![CDATA[pkg.license]]>`,
    ...pkg.xml?.information,
  };
  const contest = {
    description: information.description,
    preview: pkg.homepage,
    document: pkg.readme,
    ...pkg.xml?.contest,
  };
  const authorStr = pkg.author || "";
  const [, name] = /^([^<(]*)/.exec(authorStr) ?? [];
  const [, email] = /<(.*)>/.exec(authorStr) ?? [];
  const [, homepage] = /\((.+)\)/.exec(authorStr) ?? [];
  const author = {
    name: name.trim(),
    email,
    homepage,
    ...pkg.xml?.author,
  };
  return (
    HEADER +
    "\n" +
    jsonToXML(
      {
        skin: {
          information,
          author,
          contest,
          default: pkg.xml?.default,
        },
      },
      4
    )
  );
}

function saveXML(xml: string) {
  const file = Bun.file("./dist/index.xml");
  const writer = file.writer();
  writer.write(xml);
  writer.flush();
}

saveXML(createXml());
