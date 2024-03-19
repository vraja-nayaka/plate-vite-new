import plantumlEncoder from "plantuml-encoder";
import { Wrapper } from "./plantuml-preview.styles";
import { plantumlBaseUrl } from "../plugin";

interface PlantumlEditorProps {
  content: string;
}

export const PlantumlPreview = (props: PlantumlEditorProps) => {
  const { content } = props;
  const src = plantumlBaseUrl + plantumlEncoder.encode(content);

  return (
    <Wrapper>
      <img src={src} />
    </Wrapper>
  );
};
