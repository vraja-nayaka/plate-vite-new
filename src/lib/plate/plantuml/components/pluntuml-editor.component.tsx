import * as monaco from "monaco-editor";
import { Wrapper } from "./plantuml-editor.styles";
import { useEffect, useRef } from "react";
import Editor, { BeforeMount } from "@monaco-editor/react";
import { languageDef } from "./hightlight";

interface PlantumlEditorProps {
  onChange: (content: string) => void;
  value: string;
}

export const PlantumlEditor = (props: PlantumlEditorProps) => {
  const { onChange, value } = props;

  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const disposersRef = useRef<monaco.IDisposable[]>([]);

  const handleEditorChange = (value?: string) => {
    onChange(value || "");
  };

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.languages.register({
      id: "plantuml",
      filenamePatterns: ["\\.(puml|plantuml)(\\.svg)?$"],
      aliases: ["puml"],
    });

    disposersRef.current.push(
      monaco.languages.setMonarchTokensProvider("plantuml", languageDef)
    );
  };

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    monacoRef.current = editor;
    editor.focus();
  }

  useEffect(() => {
    const disposers = disposersRef.current;
    return () => {
      disposers.forEach((disposer) => disposer.dispose());
    };
  }, []);

  return (
    <Wrapper>
      <Editor
        defaultValue={value}
        value={value}
        defaultLanguage="plantuml"
        language="plantuml"
        data-testid="plantuml-editor"
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          scrollbar: {
            horizontal: "hidden",
            vertical: "hidden",
            verticalScrollbarSize: 0,
          },
        }}
      />
    </Wrapper>
  );
};
