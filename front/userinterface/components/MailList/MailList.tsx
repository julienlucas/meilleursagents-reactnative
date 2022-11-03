import React, { useEffect } from 'react';
import { View, TouchableHighlight, FlatList, Text, StyleSheet } from 'react-native';
import {
  getMessagesUC,
  getMessagesPaginatedUC,
  setSelectedMessageKeyPressUC,
} from '../../../domain/usecases/messages.usecase';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useTypedSelector } from '../../../store/store';
import { getFomatedDate } from '../../../services/helpers';
import { SMailList, SMail, SSms, SDate } from './style';
import { globalStyles } from '../../../services/globalstyles/index';
import { theme } from '../../../services/theme';

import Message from '../../screens/Messages';

const MailList = (props) => {
  const dispatch = useAppDispatch();
  // const navigation = useNavigation();
  const state = useTypedSelector((state) => state);
  const { selectedRealtorId, page } = state;

  useEffect(() => {
    if (selectedRealtorId) {
      dispatch(getMessagesUC(selectedRealtorId));
    }
  }, [selectedRealtorId]);

  // useEffect(() => {
  //   if (page > 1) {
  //     dispatch(getMessagesPaginatedUC({ selectedRealtorId, params: `page=${page}` }));
  //   }
  // }, [page]);

  const showMessageDetails = (message) => {
    console.log(props)
    props.navigation.navigate('NotFound');
    // navigation.navigate(`/realtors/${state.selectedRealtorId}/messages/${message.id}`, {
    //   state: { openMessageDetails: true },
    // });
  };

  return (
    <SMailList data-testid="maillist">
      <FlatList
        data={state.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const message = item;

          if (message.type === 'email') {
            return (
              <TouchableHighlight onPress={() => showMessageDetails(message)}>
                <SMail
                  readStatus={message.read}
                  style={[message.id.toString() === state.selectedMessageId && { backgroundColor: theme.lightGrey }]}
                >

                  <Text style={globalStyles.h3}>
                    {message.contact?.firstname} {message.contact?.lastname}
                  </Text>
                  <SDate readStatus={message.read}>{getFomatedDate(message.date)}</SDate>
                  <Text style={globalStyles.p}>Email {message.id}</Text>
                  <Text style={globalStyles.p}>{message?.body?.split(' ').slice(0, 12).join(' ')}</Text>
                </SMail>
              </TouchableHighlight>
            )
          }

          if (message.type === 'sms' || message.type === 'phone') {
            return (
              <TouchableHighlight onPress={() => showMessageDetails(message)}>
                <SSms
                  readStatus={message.read}
                  // onClick={() =>
                  //   navigation.push(`/realtors/${state.selectedRealtorId}/messages/${message.id}`)
                  // }
                  style={[message.id.toString() === state.selectedMessageId && { backgroundColor: theme.lightGrey }]}
                >
                  <Text style={globalStyles.h3}>
                    {message.contact?.firstname} {message.contact?.lastname}
                  </Text>
                  <SDate readStatus={message.read}>{getFomatedDate(message.date)}</SDate>
                  <Text style={globalStyles.p}>{message.subject}</Text>
                  <Text style={globalStyles.p}>{message.subject}</Text>
                </SSms>
              </TouchableHighlight>
            )
          }

          return null
        }}
      />
    </SMailList>
  );
};

export default MailList;

export const styles = StyleSheet.create({

})