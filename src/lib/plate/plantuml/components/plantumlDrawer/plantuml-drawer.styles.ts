import styled from "styled-components";
import { ContentSwitcher, Drawer } from "@admiral-ds/react-ui";

export const StyledDrawer = styled(Drawer)`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 16px;
  .slider {
    width: 8px;
    border-radius: 4px;
  }
`;

export const StyledContentSwitcher = styled(ContentSwitcher)`
  margin-top: 8px;
  margin-bottom: 8px;
  > button[type="button"] {
    padding: 0 12px;
  }
`;
