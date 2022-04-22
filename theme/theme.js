import { extendTheme } from '@chakra-ui/react'
import components from './components'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.2400'
      }
    }
  },
  fonts: {
    body: 'Poppins'
  },
  colors: {
    primary: {
      100: '#DAFEE9',
      200: '#B5FDDB',
      300: '#8FFAD2',
      400: '#72F6D1',
      500: '#45F0D1',
      600: '#32CEC0',
      700: '#22ABAC',
      800: '#167F8B',
    },
    blue: {
      100: '#E2F0FF',
      200: '#C5DFFF',
      300: '#A9CDFF',
      400: '#93BDFF',
      500: '#5f97ff',
      600: '#517DDB',
      700: '#385BB7',
      800: '#233E93',
    },
    red: {
      100: '#fdeded',
      200: '#fbdadc',
      300: '#f5a3a7',
      400: '#ef6b72',
      500: '#ea3943',
      600: '#e8212b',
      700: '#cb151e',
      800: '#941016',
    },
    green: {
      100: '#EEFDE2',
      200: '#D8FCC5',
      300: '#BCF6A6',
      400: '#A0ED8D',
      500: '#76E268',
      600: '#50C24C',
      700: '#34A239',
      800: '#21832D',
    },
    yellow: {
      100: '#fefae5',
      200: '#fef4c6',
      300: '#fee793',
      400: '#fed861',
      500: '#fec62d',
      600: '#daa320',
      700: '#b68316',
      800: '#93640e',
    },
    gray: {
      100: '#fbfcff',
      200: '#f6f7fa',
      300: '#f3f4f7',
      400: '#e7e8ee',
      500: '#dbdde6',
      600: '#cfd1dd',
      700: '#c3c6d5',
      800: '#b7bbcc',
      900: '#abafc4',
      1000: '#a0a4bb',
      1100: '#9498b3',
      1200: '#888daa',
      1300: '#7c81a2',
      1400: '#707699',
      1500: '#666c8f',
      1600: '#5d6383',
      1700: '#555a77',
      1800: '#4c516b',
      1900: '#44485f',
      2000: '#3b3f54',
      2100: '#323546',
      2200: '#2a2d3c',
      2300: '#222531',
      2400: '#17171a',
    }
  },
  components
})

export default theme