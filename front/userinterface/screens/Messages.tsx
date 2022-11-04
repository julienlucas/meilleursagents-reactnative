import { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableHighlight, FlatList, Text, StyleSheet,  } from 'react-native';
import {
  getMessagesUC,
  getSelectedMessageUC,
  setMessageReadedUC,
} from '../../domain/usecases/messages.usecase';
import {
  getRealtorsUC,
  setSelectedRealtorUC,
} from '../../domain/usecases/realtors.usecase';
import { Message } from '../../domain/entities/message.interface';
import { RootStackScreenProps } from '../../../navigation/index.interface';
import { useAppDispatch, useTypedSelector } from '../../store/store';
import { getFomatedDate } from '../../services/helpers';
import { globalStyles } from '../../services/globalstyles/index';
import { theme } from '../../services/theme';

import IconPhone from '../../../assets/icons/icon-phone.svg';
import IconMailOpen from '../../../assets/icons/icon-mail-open.svg';
import IconMail from '../../../assets/icons/icon-mail.svg';

const Messages: React.FC<RootStackScreenProps<any>> = ({ navigation, route }) => {
  const [messageId, setMessageId] = useState<string>('');
  const dispatch = useAppDispatch();
  const state = useTypedSelector((state) => state);
  const { selectedRealtorId } = state;

  const showMessageDetails = (message: Message): void => {
    const { id } = message;
    const messageId = id.toString();

    setMessageId(messageId);
    dispatch(setMessageReadedUC({ realtorId: selectedRealtorId, messageId }));
    dispatch(getSelectedMessageUC(messageId));
    navigation.navigate('Message');
  };

  useEffect(() => {
    dispatch(setSelectedRealtorUC(route?.params?.realtorId));
  }, [navigation]);

  useLayoutEffect(() => {
    dispatch(getMessagesUC(route?.params?.realtorId));
  }, [route]);

  return (
    <SMailList>
      <FlatList
        data={state.messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const message = item;

          if (message.type === 'email') {
            return (
              <TouchableHighlight onPress={() => showMessageDetails(message)} underlayColor={theme.lightGrey}>
                <SMessage style={ message.read && {backgroundColor: theme.lightGrey}}>
                  {message.read ? (
                    <IconMailOpen style={styles.IconMailOpen} />
                  ) : (
                    <IconMail style={styles.IconMail} />
                  )}

                  <STextH3 readStatus={message.read} style={globalStyles.h3}>
                    {message.contact?.firstname} {message.contact?.lastname}
                  </STextH3>
                  <SDate readStatus={message.read}>{getFomatedDate(message.date)}</SDate>
                  <STextSubject readStatus={message.read} style={globalStyles.p}>Email {message.id}</STextSubject>
                  <SBody>{message?.body?.split(' ').slice(0, 12).join(' ')}...</SBody>
                </SMessage>
              </TouchableHighlight>
            )
          }

          if (message.type === 'sms' || 'phone') {
            return (
              <TouchableHighlight onPress={() => showMessageDetails(message)} underlayColor={theme.lightGrey}>
                <SMessage style={ message.read && { backgroundColor: theme.lightGrey }}>
                  <IconPhone style={styles.IconPhone} fill={message.read ? theme.darkGrey : '#5009DC'}/>
                  <STextH3 readStatus={message.read} style={globalStyles.h3}>
                    {message.contact?.firstname} {message.contact?.lastname}
                  </STextH3>
                  <SDate readStatus={message.read}>{getFomatedDate(message.date)}</SDate>
                  <STextSubject readStatus={message.read} style={globalStyles.p}>{message.subject}</STextSubject>
                  <SBody>{message.subject}</SBody>
                </SMessage>
              </TouchableHighlight>
            )
          }

          return null
        }}
      />
    </SMailList>
  );
};

export default Messages;

const styles = StyleSheet.create({
  IconMail: {
    position: 'absolute',
    left: 11,
    top: 23,
    width: 20
  },
  IconMailOpen: {
    position: 'absolute',
    left: 11,
    top: 21,
    width: 20
  },
  IconPhone: {
    position: 'absolute',
    left: 10,
    top: 22,
    width: 20
  }
});

const SMailList = styled.View`
  background: white;
`;

const SDate = styled.Text`
  position: absolute;
  top: 24px;
  right: 15px;
  color: ${(props: { readStatus: boolean }) => (props.readStatus ? theme.darkGrey : theme.purple)};
`

const STextH3 = styled.Text`
  font-weight: 600;
  color: ${(props: { readStatus: boolean }) => (props.readStatus ? theme.darkGrey : 'black')};
`;

const STextSubject = styled.Text`
  color: ${(props: { readStatus: boolean }) => (props.readStatus ? theme.darkGrey : 'black')};
`;

const SMessage = styled.View`
  padding: 20px 20px 20px 40px;
  borderBottomColor: ${theme.lightGrey100};
  borderBottomWidth: 2px;
  color: 'black';
`;

const SBody = styled.Text`
  color: ${theme.darkGrey};
`