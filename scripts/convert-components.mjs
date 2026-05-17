import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const assetImports = [];

function stripAssetImports(content) {
  assetImports.length = 0;
  return content.replace(
    /^import\s+(\w+)\s+from\s+["'](?:\.\.\/)+assets\/([^"']+)["'];?\s*$/gm,
    (_, name, file) => {
      assetImports.push({ name, file });
      return "";
    }
  );
}

function replaceAssetRefs(content) {
  let c = content;
  for (const { name, file } of assetImports) {
    const pub = `/assets/${file}`;
    c = c.replace(new RegExp(`src=\\{${name}\\}`, "g"), `src="${pub}"`);
    c = c.replace(
      new RegExp(`url\\(\\$\\{${name}\\}\\)`, "g"),
      `url('${pub}')`
    );
    c = c.replace(
      new RegExp(`background:\\s*url\\(\\$\\{${name}\\}\\)`, "g"),
      `background: url('${pub}')`
    );
  }
  // img1..img9 in Menu
  for (let i = 1; i <= 9; i++) {
    const n = `img${i}`;
    if (c.includes(n) && !assetImports.find((a) => a.name === n)) {
      c = c.replace(
        new RegExp(`collaborate\\s*=\\s*\\[img1[^\\]]+\\]`, "s"),
        `collaborate = [${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => `"/assets/${x}.png"`).join(", ")}]`
      );
    }
  }
  return c;
}

function convert(content, isLayout = false) {
  let c = stripAssetImports(content);
  if (!c.includes('"use client"')) {
    c = '"use client";\n\n' + c;
  }
  c = c.replace(/^import React[^;]*;\r?\n/gm, "");
  c = c.replace(/^import React from ["']react["'];\r?\n/gm, "");

  c = c.replace(
    /import\s*\{\s*Link\s*,\s*useNavigate\s*\}\s*from\s*["']react-router-dom["'];?/g,
    `import Link from "next/link";\nimport { useRouter } from "next/navigation";`
  );
  c = c.replace(
    /import\s*\{\s*useNavigate\s*\}\s*from\s*["']react-router-dom["'];?/g,
    `import { useRouter } from "next/navigation";`
  );
  c = c.replace(
    /import\s*\{\s*Link\s*\}\s*from\s*["']react-router-dom["'];?/g,
    `import Link from "next/link";`
  );
  c = c.replace(
    /import\s*\{\s*NavLink\s*\}\s*from\s*["']react-router-dom["'];?/g,
    ""
  );
  c = c.replace(/<Link\s+to=/g, "<Link href=");
  c = c.replace(/const navigate = useNavigate\(\)/g, "const router = useRouter()");
  c = c.replace(/navigate\(/g, "router.push(");

  c = c.replace(
    /import\s+Context\s+from\s+["'](?:\.\.\/)+Context\/Context["'];?/g,
    `import { useAppState } from "@/hooks/useAppState";`
  );
  c = c.replace(/useContext\(Context\)/g, "useAppState()");

  c = c.replace(
    /from\s+["'](?:\.\.\/)+Sdk\/sdk["']/g,
    `from "@/lib/firebase"`
  );
  c = c.replace(
    /from\s+["'](?:\.\.\/)+Toast\/toast["']/g,
    `from "@/lib/toast"`
  );

  c = c.replace(
    /import\s+AboutVideo\s+from\s+["'][^"']+["'];?\s*/g,
    ""
  );
  c = c.replace(/<source src=\{AboutVideo\} \/>/g, `<source src="/video/AboutVideo.mp4" />`);

  c = c.replace(/\.\.\/Component\//g, "@/components/");
  c = c.replace(/\.\.\/\.\.\/Component\//g, "@/components/");
  c = c.replace(/\.\.\/Common\//g, "@/components/common/");
  c = c.replace(/\.\.\/\.\.\/Common\//g, "@/components/common/");
  c = c.replace(/\.\.\/Layout\//g, "@/components/layout/");
  c = c.replace(/from\s+["']\.\/Container["']/g, 'from "@/components/Container"');
  c = c.replace(/from\s+["']\.\//g, 'from "@/components/');

  c = c.replace(/<Outlet\s*\/>/g, "{children}");
  c = c.replace(
    /document\.querySelector\(['"]#root['"]\)\.addEventListener\("wheel", scroll\)/g,
    'window.addEventListener("wheel", scroll)'
  );

  c = c.replace(/Blog_D\[0\]\.image/g, "imageSrc(Blog_D?.[0]?.image ?? '')");
  c = c.replace(
    /src=\{Blog_D\[0\]\.image\}/g,
    "src={Blog_D?.[0] ? imageSrc(Blog_D[0].image) : ''}"
  );

  if (c.includes("BlogDetails") || c.includes("Blog_D[0]")) {
    if (!c.includes('imageSrc')) {
      c = c.replace(
        /("use client";\s*\n\n)/,
        `$1import { imageSrc } from "@/lib/imageSrc";\n`
      );
    }
  }

  c = c.replace(/src=\{el\.image\}/g, "src={imageSrc(el.image)}");
  c = c.replace(/src=\{image\}/g, "src={imageSrc(image)}");

  if (
    (c.includes("imageSrc(") || c.includes("item.image")) &&
    !c.includes("@/lib/imageSrc")
  ) {
    c = c.replace(
      /("use client";\s*\n\n)/,
      `$1import { imageSrc } from "@/lib/imageSrc";\n`
    );
  }

  c = replaceAssetRefs(c);

  // Routlayout children prop
  if (c.includes("Routlayout") || c.includes("const Routlayout")) {
    c = c.replace(
      /const Routlayout = \(\) =>/,
      "interface RoutlayoutProps { children: React.ReactNode }\n\nconst Routlayout = ({ children }: RoutlayoutProps) =>"
    );
    if (!c.includes("React.ReactNode")) {
      c = c.replace(
        /("use client";\s*\n\n)/,
        `$1import type { ReactNode } from "react";\n`
      );
      c = c.replace(/React\.ReactNode/g, "ReactNode");
    }
  }

  c = c.replace(/import\s*\{\s*Outlet\s*\}\s*from\s*["']react-router-dom["'];?\s*/g, "");

  c = c.replace(
    /import\s*\{\s*data\s*\}\s*from\s*["']autoprefixer["'];?\s*/g,
    ""
  );

  return c;
}

const mappings = [
  { src: "src/Component", dest: "src/components", skip: ["List.jsx", "Routlayout.jsx"] },
  { src: "src/Common", dest: "src/components/common" },
  { src: "src/Layout", dest: "src/components/layout" },
];

for (const { src, dest, skip = [] } of mappings) {
  const srcDir = path.join(root, src);
  if (!fs.existsSync(srcDir)) continue;
  const walk = (dir, rel = "") => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const relPath = path.join(rel, ent.name);
      if (ent.isDirectory()) {
        walk(path.join(dir, ent.name), relPath);
      } else if (ent.name.endsWith(".jsx")) {
        if (skip.includes(ent.name)) continue;
        const content = fs.readFileSync(path.join(dir, ent.name), "utf8");
        const out = convert(content);
        const outPath = path.join(
          root,
          dest,
          relPath.replace(/\.jsx$/, ".tsx")
        );
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, out);
        console.log("Wrote", outPath);
      }
    }
  };
  walk(srcDir);
}

console.log("Done (skipped List, Routlayout - manual)");
