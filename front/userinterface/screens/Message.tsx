import { Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../services/theme';
import moment from 'moment';
import { useTypedSelector } from '../../store/store';
import { globalStyles } from '../../services/globalstyles/index';
import IconMailOpen from '../../../assets/icons/icon-mail-open.svg';

const Messages: React.FC = () => {
  const state = useTypedSelector((state) => state);
  const { selectedMessage } = state;

  return (
    <SMessage>
      <SMessageHeader>
        {selectedMessage?.contact?.firstname && (
          <View>
            <IconMailOpen style={styles.IconMail} />
            <STextH3 style={globalStyles.h3}>
              {selectedMessage?.contact?.firstname}{' '}
              {selectedMessage?.contact?.lastname}
            </STextH3>
          </View>
        )}

        {selectedMessage?.contact?.email && (
          <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 20}}>
            <Text style={{width: 80}}>Email </Text>
            <Text style={{color: theme.purple}}>{selectedMessage?.contact?.email}</Text>
          </View>
        )}
        {selectedMessage?.contact?.phone && (
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <Text style={{width: 80}}>Phone </Text>
            <Text style={{color: theme.purple}}>{selectedMessage?.contact?.phone}</Text>
          </View>
        )}

      </SMessageHeader>
      <SMessageBody>
        <STextH3 style={globalStyles.h3}>
          {selectedMessage?.contact?.firstname}{' '}
          {selectedMessage?.contact?.lastname}
        </STextH3>

        <SDate>
          {moment(selectedMessage?.date).format('MMMM Do YYYY, h:mm a')}
        </SDate>
        {selectedMessage?.body && (
          <Text>{selectedMessage?.body}</Text>
        )}
      </SMessageBody>
    </SMessage>
  );
};

export default Messages;

const styles = StyleSheet.create({
  IconMail: {
    position: 'absolute',
    left: -33,
    width: 20
  }
});

const STextH3 = styled.Text`
  font-weight: 600;
`;

const SMessage = styled.ScrollView`
  margin: 15px 15px;
`;

const SMessageHeader = styled.View`
  padding: 25px 20px 10px 50px;
  background: white;
`;

const SMessageBody = styled.View`
  margin: 15px 0;
  padding: 40px 30px;
  background: white;
  height: 100%;
`;

const SDate = styled.Text`
  margin-bottom: 50px;
  font-size: 18px;
  color: ${theme.darkGrey};
`;