import styled from "@emotion/styled";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CustomRow = styled(Row)`
  margin-bottom: 8px;
  span {
    min-width: 120px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
