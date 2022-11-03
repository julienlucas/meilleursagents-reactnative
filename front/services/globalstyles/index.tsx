import { theme } from '../theme';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  body: {
    position: 'relative',
    margin: 0,
    background: '#f2f2f2'
  },

  a: {
    color: theme.purple,
    textDecoration: 'none'
  },

  p: {
    fontSize: 14
  },

  h1: {
    padding: 0,
    margin: 0,
  },
  h2: {
    position: 'relative',
    padding: 0,
    margin: 0,
    marginBottom: -10,
    fontSize: 20,
    fontWeight: 700
  },
  h3: {
    fontSize: 18,
    padding: 0,
    margin: 0,
  },
  h4: {
    padding: 0,
    margin: 0,
  },
  h5: {
    padding: 0,
    margin: 0,
  },
  h6: {
    padding: 0,
    margin: 0,
  }
})
