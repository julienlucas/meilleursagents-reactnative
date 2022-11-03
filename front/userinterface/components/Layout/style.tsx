import styled from 'styled-components/native';
import { theme } from '../../../services/theme';

export const SLayout = styled.View`
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  background: ${theme.lightGrey};
  overflow: hidden;
`;
