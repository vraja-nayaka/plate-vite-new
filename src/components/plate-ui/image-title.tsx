import styled from "styled-components";

export const StyledImageTitle = styled.span`
  padding: 0px 4px;
  margin: 6px 7px;
  background: #f1f3f6;
  gap: 4px;
  border-radius: 4px;
  flex: unset;
`;

export type ImageTitleProps = {
  children: React.ReactNode;
};

export const ImageTitle = ({ children }: ImageTitleProps) => {
  return <StyledImageTitle>{children}</StyledImageTitle>;
};
