import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;

  .monaco-editor {
    --monaco-monospace-font: "VTB Group UI", "SF Mono", Monaco, Menlo, Consolas,
      "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New",
      monospace;
    .current-line {
      background-color: #ebebeb;
      border-radius: 0 2px 2px 0;
    }
    .view-overlays .current-line {
      border: none;
    }
    .margin-view-overlays .current-line {
      border-radius: 2px 0 0 2px;
    }
    .line-numbers,
    .line-numbers.active-line-number {
      color: #fff;
    }
  }
`;
