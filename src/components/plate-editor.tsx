"use client";

import { useMemo, useRef } from "react";
import { cn } from "@udecode/cn";
import { CommentsProvider } from "@udecode/plate-comments";
import {
  Plate,
  Value,
  createPlateEditor,
  deserializeHtml,
} from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { commentsUsers, myUserId } from "@/lib/plate/comments";
import { MENTIONABLES } from "@/lib/plate/mentionables";
import { plugins } from "@/lib/plate/plate-plugins";
import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { MentionCombobox } from "@/components/plate-ui/mention-combobox";
import { PlantumlDrawer } from "@/lib/plate/plantuml/components/plantumlDrawer/plantuml-drawer.component";
import { wrapMacroByDiv } from "@/lib/plate/deserialize/StorageFormatHandler";
import { content } from "@/lib/plate/deserialize/content";
import { PlantumlProvider } from "@/lib/plate/plantuml/store";

export default function PlateEditor() {
  const containerRef = useRef(null);

  // const initialValue: Value = [
  //   {
  //     id: "1",
  //     type: ELEMENT_PARAGRAPH,
  //     children: [{ text: "Hello, World!" }],
  //   },
  // ];

  const initialValue = useMemo(() => {
    const tmpEditor = createPlateEditor({ plugins });
    const preparedContent = wrapMacroByDiv(content);
    return deserializeHtml(tmpEditor, { element: preparedContent }) as Value;
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <PlantumlProvider>
          <Plate plugins={plugins} initialValue={initialValue}>
            <div
              ref={containerRef}
              className={cn(
                // Block selection
                "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
              )}
            >
              <FixedToolbar>
                <FixedToolbarButtons />
              </FixedToolbar>

              <Editor
                className="px-[96px] py-16"
                autoFocus
                focusRing={false}
                variant="ghost"
                size="md"
              />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>

              <MentionCombobox items={MENTIONABLES} />

              <CommentsPopover />

              <CursorOverlay containerRef={containerRef} />
              <PlantumlDrawer />
            </div>
          </Plate>
        </PlantumlProvider>
      </CommentsProvider>
    </DndProvider>
  );
}
