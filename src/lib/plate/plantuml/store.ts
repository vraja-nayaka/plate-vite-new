import { createAtomStore } from "@udecode/plate-common";
import { TPlantumlElement } from "../plate-types";

export const { plantumlStore, usePlantumlStore, PlantumlProvider } =
  createAtomStore(
    {
      openedPlantuml: null as TPlantumlElement | null,
    },
    { name: "plantuml" as const }
  );

export const useSelectedPlantUml = () =>
  usePlantumlStore().set.openedPlantuml();
