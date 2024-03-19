import {
  createPluginFactory,
  HotkeyPlugin,
  onKeyDownToggleElement,
  Value,
} from "@udecode/plate-common";

export const ELEMENT_PLANT_UML = "plantuml";
export const plantumlBaseUrl = "https://www.plantuml.com/plantuml/png/";

/**
 * Enables support for plantuml diagram
 */
export const createPluntumlPlugin = createPluginFactory<HotkeyPlugin, Value>({
  key: ELEMENT_PLANT_UML,
  isElement: true,
  isVoid: true,
  then: (_editor, { type }) => ({
    deserializeHtml: {
      rules: [
        {
          validNodeName: "MACRO",
          validAttribute: {
            "data-name": "plantuml",
          },
        },
      ],
      withoutChildren: true,
      getNode: (element: HTMLElement) => {
        const titleParameter = element.querySelector(
          "macro-parameter[data-name]"
        );
        const title = titleParameter?.textContent;

        const plainTextElement = element.querySelector(
          "macro-plain-text"
        ) as HTMLElement;
        const content = plainTextElement?.innerText;

        return {
          type,
          title,
          content,
        };
      },
    },
  }),
  handlers: {
    onKeyDown: onKeyDownToggleElement,
  },
  options: {},
});
