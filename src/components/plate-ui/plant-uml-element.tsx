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
import { MacroTitleInput } from "./macro-title-input";
import { useReadOnly } from "slate-react";
import { ImageTitle } from "./image-title";

export const PlantumlElement = withRef<
  // TODO: change types
  typeof PlateElement<TPlantumlElement[]>
>((element, ref) => {
  const { children, ...props } = element;
  const { content, title } = props.element;
  const readOnly = useReadOnly();

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
      {readOnly ? (
        <>
          <ImageTitle>{title}</ImageTitle>
          <img src={src} />
        </>
      ) : (
        <MacroWrapper
          header={
            <>
              PlantUml <MacroTitleInput />
            </>
          }
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
      )}
      {children}
    </PlateElement>
  );
});
