import { extendedTheme } from 'chalkui/dist/cjs/React'
import { mode } from 'chalkui/dist/cjs/Theme/Tools'
// import { createBreakpoints } from 'chalkui/chalk/Theme/Tools'

// const fonts = { mono: `'Menlo', monospace` }

// const breakpoints = createBreakpoints({
//    sm: '40em',
//    md: '52em',
//    lg: '64em',
//    xl: '80em',
// })

const theme = extendedTheme({
   styles: {
      global: {
         "html, body": {
            fontFamily: "'Assistant', sans-serif",
            fontStyle: 'normal',
            fontWeight: '600',
            backgroundColor: '#fffcfa',// '#f7f6ee',
         },
      },
   },
   shadows: {
      outline: '0 0 0 3px rgba(0, 0, 0, 0.1)',
   },
   colors: {
      brand: {
         100: '#F0CEA0',
         200: '#3b6147', //'#386641',
         300: '#0E4150',
         400: '#29335C',
         500: '#65394E',
         600: '#772E2E',
         700: '#3b6147',
         800: '#3A302B',
      },
      // primary: '#8937f5',
      primary: '#0E4150',
      secondary: '#3a302b',
      black: '#16161D',
      gray: {
         100: '#f9f9f9',
         200: '#eeeeee',
         // 800: '#272321',
         // 900: '#1d1a18'
      },
   },
   components: {
      Input: {
         defaultProps: {
            focusBorderColor: 'secondary',
         },
         variants: {
            outline: {
               field: {
                  borderColor: '#e0d8d5',
               },
            },
         },
      },
      Select: {
         defaultProps: {
            backgroundColor: '#fff',
            focusBorderColor: 'secondary',
         },
         variants: {
            outline: {
               field: {
                  borderColor: '#e0d8d5',
               },
            },
         },
      },
      Textarea: {
         defaultProps: {
            backgroundColor: '#fff',
            focusBorderColor: 'secondary',
         },
         variants: {
            outline: {
               field: {
                  borderColor: '#e0d8d5',
               },
            },
         },
      },
      Dropdown: {
         baseStyle: {
            list: {
               borderRadius: 0,
               py: 0,
            },
            item: {
               fontSize: '1.1rem',
               fontWeight: 600,
            },
         }
      },
      Modal: {
        baseStyle: (props) => ({
           dialog: {
              bgColor: mode('#fff', 'gray.800')(props)
           }
        })
      },
      List: {
         baseStyle: (props) => ({
            cell: {
               boxShadow: 'none',
               borderColor: mode('#ddd', 'gray.700')(props),
               bgColor: mode('#fff', 'gray.800')(props),
               '.chalk-list__link-item': {
                  _hover: {
                     backgroundColor: mode('#eee', 'gray.700')(props)
                  }
               }
            },
         })
      }
   },
   // fonts,
   // breakpoints,
})

export default theme
