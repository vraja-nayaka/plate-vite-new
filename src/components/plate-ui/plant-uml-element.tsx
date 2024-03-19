import { withRef } from "@udecode/cn";
import { PlateElement, useRemoveNodeButton } from "@udecode/plate-common";
import { MacroWrapper } from "./macro-wrapper";
import { plantumlBaseUrl } from "@/lib/plate/plantuml/plugin";
import { TPlantumlElement } from "@/lib/plate/plate-types";
import PlantUmlEncoder from "plantuml-encoder";
import { useMemo } from "react";
import { Icons } from "@/components/icons";
import { Button } from "./button";
import { useSelectedPlantUml } from "@/lib/plate/plantuml/store";

export const PlantumlElement = withRef<
  // TODO: change types
  typeof PlateElement<TPlantumlElement[]>
>((element, ref) => {
  const { children, ...props } = element;
  const { title, content } = props.element;

  const src = useMemo(
    () => plantumlBaseUrl + PlantUmlEncoder.encode(content),
    [content]
  );

  const { props: removeButtonProps } = useRemoveNodeButton(element);

  const setSelected = useSelectedPlantUml();
  const onEditClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setSelected(props.element);
  };

  return (
    <PlateElement
      ref={ref}
      contentEditable="false"
      suppressContentEditableWarning
      {...props}
    >
      <MacroWrapper
        header={<>PlantUml {title}</>}
        actions={
          <>
            <Button
              variant="ghost"
              className="h-5 justify-between px-1 text-xs"
              size="xs"
              onClick={onEditClick}
            >
              <Icons.editing />
            </Button>
            <Button
              variant="ghost"
              className="h-5 justify-between px-1 text-xs"
              size="xs"
              {...removeButtonProps}
            >
              <Icons.clear />
            </Button>
          </>
        }
      >
        <img src={src} />
      </MacroWrapper>
      {children}
    </PlateElement>
  );
});
