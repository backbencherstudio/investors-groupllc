// Module scaffold generator
// Usage: npm run generate-module <moduleName>
// Example: npm run generate-module blog
//
// Creates:
//   redux/features/<module>/<Module>Types.ts
//   redux/features/<module>/<Module>Api.ts
//   Auto-adds "<Module>" to TAG_TYPES in redux/features/api/tagList.ts

const fs = require("fs");
const path = require("path");

// ─── helpers ────────────────────────────────────────────────────────────────

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created: ${dir}`);
  }
}

function writeFile(filePath: string, content: string) {
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  Skipped (already exists): ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`📄 Created: ${filePath}`);
}

// ─── templates ──────────────────────────────────────────────────────────────

function typesTemplate(Module: string, module: string) {
  return `// ${Module} types

export interface ${Module} {
  id: string;
  // TODO: add ${module} fields
  created_at: string;
  updated_at: string;
}

export interface Create${Module}Dto {
  // TODO: fields needed to create a ${module}
}

export interface Update${Module}Dto extends Partial<Create${Module}Dto> {}

export interface ${Module}ListResponse {
  success: boolean;
  message: string;
  data: ${Module}[];
}

export interface ${Module}Response {
  success: boolean;
  message: string;
  data: ${Module};
}
`;
}

function apiTemplate(Module: string, module: string) {
  return `import { baseApi } from "@/redux/features/api/baseApi";
import type {
  ${Module},
  Create${Module}Dto,
  Update${Module}Dto,
  ${Module}ListResponse,
  ${Module}Response,
} from "./${Module}Types";

export const ${module}Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAll${Module}s: builder.query<${Module}[], void>({
      query: () => ({ url: "/${module}s", method: "GET" }),
      transformResponse: (res: ${Module}ListResponse) => res.data,
      providesTags: ["${Module}"],
    }),

    get${Module}ById: builder.query<${Module}, string>({
      query: (id) => ({ url: "/${module}s/\${id}", method: "GET" }),
      transformResponse: (res: ${Module}Response) => res.data,
      providesTags: (_result, _err, id) => [{ type: "${Module}", id }],
    }),

    create${Module}: builder.mutation<${Module}, Create${Module}Dto>({
      query: (body) => ({ url: "/${module}s", method: "POST", body }),
      transformResponse: (res: ${Module}Response) => res.data,
      invalidatesTags: ["${Module}"],
    }),

    update${Module}: builder.mutation<${Module}, { id: string; body: Update${Module}Dto }>({
      query: ({ id, body }) => ({ url: "/${module}s/\${id}", method: "PATCH", body }),
      transformResponse: (res: ${Module}Response) => res.data,
      invalidatesTags: (_result, _err, { id }) => [{ type: "${Module}", id }, "${Module}"],
    }),

    delete${Module}: builder.mutation<void, string>({
      query: (id) => ({ url: "/${module}s/\${id}", method: "DELETE" }),
      invalidatesTags: ["${Module}"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetAll${Module}sQuery,
  useGet${Module}ByIdQuery,
  useCreate${Module}Mutation,
  useUpdate${Module}Mutation,
  useDelete${Module}Mutation,
} = ${module}Api;
`;
}

// ─── tagList.ts auto-update ──────────────────────────────────────────────────

function injectTagType(Module: string) {
  const tagListPath = path.resolve("redux/features/api/tagList.ts");

  if (!fs.existsSync(tagListPath)) {
    console.log(`⚠️  tagList.ts not found — skipping tag registration.`);
    return;
  }

  const content: string = fs.readFileSync(tagListPath, "utf-8");

  // Match: ["User", "Auth"] inside TAG_TYPES array
  const arrayRegex = /TAG_TYPES\s*=\s*\[([^\]]*)\]\s*as\s*const/;
  const match = content.match(arrayRegex);

  if (!match) {
    console.log(`⚠️  Could not parse TAG_TYPES in tagList.ts — skipping.`);
    return;
  }

  const existing = match[1];

  if (existing.includes(`"${Module}"`)) {
    console.log(`ℹ️  "${Module}" is already in TAG_TYPES — skipping.`);
    return;
  }

  const updated = content.replace(
    arrayRegex,
    `TAG_TYPES = [${existing.trimEnd()}, "${Module}"] as const`
  );

  fs.writeFileSync(tagListPath, updated, "utf-8");
  console.log(`🏷️  Added "${Module}" to TAG_TYPES in redux/features/api/tagList.ts`);
}

// ─── main ────────────────────────────────────────────────────────────────────

function main() {
  const moduleName = process.argv[2];

  if (!moduleName) {
    console.error("❌  Please provide a module name.");
    console.error("    Usage: npm run generate-module <name>");
    console.error("    Example: npm run generate-module blog");
    process.exit(1);
  }

  const module = moduleName.toLowerCase();
  const Module = capitalize(module);

  const outDir = path.resolve(`redux/features/${module}`);
  ensureDir(outDir);

  writeFile(path.join(outDir, `${Module}Types.ts`), typesTemplate(Module, module));
  writeFile(path.join(outDir, `${Module}Api.ts`), apiTemplate(Module, module));

  injectTagType(Module);
  console.log(`\n✅  Module "${Module}" scaffolded at redux/features/${module}/`);
}

main();
