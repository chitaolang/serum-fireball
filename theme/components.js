const components = {
    Button: {
        baseStyle: {
            fontFamily: 'Poppins',
            fontWeight: '600',
            _focus: {
                outline: 0,
                boxShadow: 'none'
            }
        },
        sizes: {
            lg: {
                borderRadius: '12px',
                padding: '1rem',
                fontSize: '1rem'
            },
            md: {
                borderRadius: '8px',
                padding: '0.75rem 1rem 0.75rem 1rem',
                fontSize: '1rem'
            },
            sm: {
                borderRadius: '8px',
                padding: '0.5rem 1rem 0.5rem 1rem',
                fontSize: '0.875rem'
            }
        },
        variants: {
            bright: {
                bg: 'primary.500',
                color: 'black',
                _hover: {
                    bg: 'primary.600',
                    color: 'black'
                },
                _disabled: {
                    bg: 'gray.2300',
                    color: 'gray.1800'
                }
            },
            dark: {
                bg: 'gray.2300',
                color: 'primary.500',
                _hover: {
                    bg: 'gray.2200',
                    color: 'primary.500'
                },
                _disabled: {
                    bg: 'gray.2300',
                    color: 'gray.1800'
                }
            },
            gray: {
                bg: 'gray.2200',
                color: 'primary.500',
                _hover: {
                    bg: 'gray.2200',
                    color: 'primary.600'
                },
                _disabled: {
                    bg: 'gray.2200',
                    color: 'gray.1800'
                }
            },
            'link-button': {
                bg: 'gray.2200',
                color: 'blue.500',
                textDecoration: 'underline',
                _hover: {
                    bg: 'gray.2200',
                    color: 'blue.600'
                },
                _disabled: {
                    bg: 'gray.2200',
                    color: 'gray.1800'
                }
            }
        }
    }
}
export default components