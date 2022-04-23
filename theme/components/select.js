const select = {
  baseStyle: {
    _focus: {
      borderColor: 'white',
      color: 'white',
      boxShadow: 'none'
    },

    /**
     * Styles set within { variants } will override base styles
     * Styles set within { sizes } will override base styles
     * The Input component uses "md" size and "outline" variant by default.
     *
     * You can unset those defaults by using null in defaultProps:
     *    defaultProps: {
     *      size: null,
     *      variant: null
     *    },
     *
     * You will lose all default styles this way, including things like focus.
     */
    field: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'gray.2300',
      color: 'gray.1200',
      _focus: {
        borderColor: 'white',
        color: 'white'
      },
      _hover: {
        borderColor: 'white',
        color: 'white'
      }
    },
  },
  sizes: {
    /**
     * Input component will receive "md" styles by default
     * Styles set within { variants } will override styles at all sizes
     *
     * The styles below are what Chakra will use unless replaced.
     */
    sm: {
      field: {
        borderRadius: "8px",
        fontSize: "1rem",
      },
    },
    md: {
      field: {
        borderRadius: "8px",
        fontSize: "0.875rem",
      },
    },
  },
  variants: {
    /**
     * Input component will use "outline" styles by default.
     * Styles set here will override anything in { baseStyle } and { sizes }
     *
     * The styles below are what Chakra will use unless replaced.
     */
    error: {
      field: {
        borderColor: "red.500",
        _focus: {
          borderColor: 'red.500',
          color: 'white'
        },
        _hover: {
          borderColor: 'red.500',
          color: 'white'
        }
      },
    },
  },
  defaultProps: {
    /**
     * Set either or both of these to null to use only what's in { baseStyle }
     */
  },
}
export default select