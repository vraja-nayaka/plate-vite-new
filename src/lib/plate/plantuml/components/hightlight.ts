import * as monaco from "monaco-editor";

export const typewords = [
  "abstract",
  "actor",
  "agent",
  "archimate",
  "artifact",
  "boundary",
  "card",
  "class",
  "cloud",
  "component",
  "control",
  "database",
  "diamond",
  "entity",
  "enum",
  "file",
  "folder",
  "frame",
  "interface",
  "node",
  "object",
  "package",
  "participant",
  "queue",
  "rectangle",
  "stack",
  "state",
  "storage",
  "usecase",
];
export const keywords = [
  "@enddot",
  "@endsalt",
  "@enduml",
  "@startdot",
  "@startsalt",
  "@startuml",
  "activate",
  "again",
  "allow_mixing",
  "allowmixing",
  "also",
  "alt",
  "as",
  "autonumber",
  "bold",
  "bottom",
  "box",
  "break",
  "caption",
  "center",
  "circle",
  "create",
  "critical",
  "deactivate",
  "description",
  "destroy",
  "down",
  "else",
  "elseif",
  "empty",
  "end",
  "endif",
  "endwhile",
  "false",
  "footbox",
  "footer",
  "fork",
  "group",
  "header",
  "hide",
  "hnote",
  "if",
  "is",
  "italic",
  "kill",
  "left",
  "legend",
  "link",
  "loop",
  "members",
  "namespace",
  "newpage",
  "note",
  "of",
  "on",
  "opt",
  "order",
  "over",
  "package",
  "page",
  "par",
  "partition",
  "plain",
  "ref",
  "repeat",
  "return",
  "right",
  "rnote",
  "rotate",
  "show",
  "skin",
  "skinparam",
  "start",
  "stop",
  "strictuml",
  "title",
  "top",
  "top to bottom direction",
  "true",
  "up",
  "while",
];
export const preprocessor = [
  "!define",
  "!definelong",
  "!else",
  "!enddefinelong",
  "!endif",
  "!exit",
  "!if",
  "!ifdef",
  "!ifndef",
  "!include",
  "!pragma",
  "!undef",
  "!while",
  "!endwhile",
  "!foreach",
  "!endfor",
  "!theme",
];

export const languageDef: monaco.languages.IMonarchLanguage = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  // defaultToken: 'invalid',

  keywords: keywords,

  typeKeywords: typewords,

  preprocessor: preprocessor,

  operators: ["<-->"],

  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*/^%]+/,

  // C# style strings
  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      [/@{1}start(.+)/, "annotation"],
      [/@{1}end(.+)/, "annotation"],
      [/![a-zA-Z]+/, { cases: { "@preprocessor": "keyword" } }],
      // identifiers and keywords
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@typeKeywords": "keyword",
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],
      [/[A-Z][\w$]*/, "identifier"], // to show class names nicely

      // whitespace
      { include: "@whitespace" },

      // delimiters and operators
      [/[{}()[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [/@symbols/, { cases: { "@operators": "keyword", "@default": "" } }],

      // numbers
      [/\d*\.\d+([eE][-+]?\d+)?/, "number.float"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/\d+/, "number"],

      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

      // characters
      [/'[^\\']'/, "string"],
      [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
      [/'/, "string.invalid"],
    ],

    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\/'/, { token: "comment", bracket: "@open", next: "@comment" }],
      [/'.*$/, "comment"],
    ],

    comment: [
      [/'\//, { token: "comment", bracket: "@close", next: "@pop" }],
      [/.+/, "comment"],
    ],
  },
};
