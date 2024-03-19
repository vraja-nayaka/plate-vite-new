import { useEffect, useState } from "react";
import {
  Button,
  ContentSwitcherItem,
  DrawerButtonPanel,
} from "@admiral-ds/react-ui";
import { StyledContentSwitcher, StyledDrawer } from "./plantuml-drawer.styles";
import { PlantumlEditor, PlantumlPreview } from "..";
import { usePlantumlStore, useSelectedPlantUml } from "../../store";
import { findNodePath, useEditorRef } from "@udecode/plate-common";

interface IQlDrawerProps {}

const tabs = [{ title: "Код" }, { title: "Диаграмма" }];

export const PlantumlDrawer: React.FC<IQlDrawerProps> = () => {
  const openedPlantuml = usePlantumlStore().get.openedPlantuml();
  const editor = useEditorRef();

  const [content, setContent] = useState(openedPlantuml?.content || "");
  const setSelected = useSelectedPlantUml();

  useEffect(() => {
    setContent(openedPlantuml?.content || "");
  }, [openedPlantuml]);

  const onContentChange = (content: string) => {
    setContent(content);
  };

  const [active, setActive] = useState(0);

  const close = () => {
    setActive(0);
    setSelected(null);
    setContent("");
  };

  const complete = () => {
    if (openedPlantuml) {
      editor.setNodes(
        {
          // @ts-ignore
          content,
        },
        { at: findNodePath(editor, openedPlantuml) }
      );
      close();
    }
  };

  const headerTitle = openedPlantuml
    ? "Редактирование PlantUML"
    : "Создание PlantUML";

  const isOpen = Boolean(openedPlantuml);

  return (
    <StyledDrawer
      isOpen={isOpen}
      onClose={close}
      style={{ transition: "unset", width: "620px" }}
    >
      <h3>{headerTitle}</h3>
      <div>
        <StyledContentSwitcher dimension="m">
          {tabs.map((item, index) => (
            <ContentSwitcherItem
              key={index}
              active={index === active}
              onClick={() => setActive(index)}
            >
              {item.title}
            </ContentSwitcherItem>
          ))}
        </StyledContentSwitcher>
      </div>
      {isOpen && (
        <div style={{ height: "100%" }}>
          {active === 0 && (
            <PlantumlEditor onChange={onContentChange} value={content} />
          )}
          {active === 1 && <PlantumlPreview content={content} />}
        </div>
      )}
      <DrawerButtonPanel>
        <Button dimension="s" appearance="primary" onClick={complete}>
          Сохранить
        </Button>
        <Button dimension="s" appearance="secondary" onClick={close}>
          Отменить
        </Button>
      </DrawerButtonPanel>
    </StyledDrawer>
  );
};
