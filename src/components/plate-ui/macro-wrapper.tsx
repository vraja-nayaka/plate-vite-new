import styled from "styled-components";

export const StyledContainer = styled.div`
  background-color: #f1f3f6;
  border-radius: 12px;
  display: inline-flex;
  flex-direction: column;
  padding: 8px;
  width: 760px;
  min-width: 760px;
`;

export const StyledHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  height: 32px;
  justify-content: space-between;
`;

export const StyledInfo = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1;
  white-space: nowrap;
`;

export const StyledActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledMain = styled.div`
  background: #fff;
  border-radius: 12px;
  margin: 8px 0 0;
  min-height: 52px;
  overflow-x: auto;
  padding: 10px;
  width: 100%;
`;

type Props = {
  header: React.ReactNode;
  actions: React.ReactNode;
  children: React.ReactNode;
};

export const MacroWrapper = ({
  header,
  actions,
  children,
  ...props
}: Props) => {
  return (
    <StyledContainer {...props}>
      <StyledHeader>
        <StyledInfo>{header}</StyledInfo>
        <StyledActions>{actions}</StyledActions>
      </StyledHeader>
      <StyledMain>{children}</StyledMain>
    </StyledContainer>
  );
};
