import React from "react";
import { withRef } from "@udecode/cn";

import { usePlantUmlToolbarButton } from "@/lib/plate/plantuml/usePlantUmlToolbarButton";
import { Icons } from "@/components/icons";

import { ToolbarButton } from "./toolbar";

export const PlantUmlToolbarButton = withRef<typeof ToolbarButton>((_, ref) => {
  const { props } = usePlantUmlToolbarButton();

  return (
    <ToolbarButton ref={ref} tooltip="Plant uml" {...props}>
      <Icons.settings />
    </ToolbarButton>
  );
});
