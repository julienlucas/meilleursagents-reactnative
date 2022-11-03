import styled from 'styled-components/native';
import { theme } from '../../../services/theme';
// const iconMailOpen = '../../../../assets/icon-mail-open.svg';
// const iconMail = '../../../../assets/icon-mail.svg';
// const iconPhone = '../../../../assets/icon-phone.svg';

export const SMailList = styled.View`
  position: relative;
  float: left;
  width: 100%;
  background: white;
  border-right: 2px solid ${theme.lightGrey100};
  overflow-y: scroll;
  z-index: 1;

  @media (max-width: 768px) {
    max-width: 275px;
  }
  @media (max-width: 580px) {
    max-width: 100%;
  }
`;

export const SDate = styled.Text`
  position: relative;
  float: right;
  color: ${(props: { readStatus: boolean }) => (props.readStatus ? theme.darkGrey : theme.purple)};
`

export const SSms = styled.View`
  position: relative;
  padding: 20px 20px 20px 40px;
  borderBottomColor: ${theme.lightGrey100};
  borderBottomWidth: 2;
  color: ${(props) => (props.readStatus ? theme.darkGrey : 'black')};

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-position: 10px 22px;
    background-repeat: no-repeat;
    content: '';

    ${({ readStatus } : { readStatus: boolean}) =>
      readStatus &&
      `
        filter: grayscale(100%) brightness(500%);
      `}
  }

  &:hover,
  &.active {
    background-color: ${theme.lightGrey};
  }

  * {
    margin: 0;
    padding: 0;
  }

  .body {
    color: ${theme.darkGrey};
  }

  h3 {
    display: inline-block;
  }
`;

export const SMail = styled.View`
  position: relative;
  padding: 20px 20px 20px 40px;
  borderBottomColor: ${theme.lightGrey100};
  borderBottomWidth: 2;
  color: ${(props: { readStatus: boolean }) => (props.readStatus ? theme.darkGrey : 'black')};

  &:hover, &.active {
    background-color: ${theme.lightGrey};
  }

  * {
    margin: 0;
    padding: 0;
  }

  .body {
    color: ${theme.darkGrey};
  }

  .date {
    position: relative;
    bottom: -3px;
    float: right;
    color: ${(props: { readStatus: boolean }) => (props.readStatus ? theme.darkGrey : theme.purple)};
  }

  h3 {
    display: inline-block;
  }
`;
