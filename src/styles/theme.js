import { mixin } from "styles";

const theme = {
    colors: {
        primary : '#111112',
        secondary: '#ff6161',
        tertiary : '#8BD7C1',
    },
    fonts: {
        Nunito : 'Nunito, sans-serif',
    },
    transition: {
        duration: .9, ease: [0.43, 0.13, 0.23, 0.96]
    },
    variants: {
        initial: { y: 7, opacity: 0 },
        exit: { 
            y: 5,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 , duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96]}
            }
         },
        enter: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100,  duration: .9, ease: [0.43, 0.13, 0.23, 0.96] }
            }
        }
    }
}

export default theme;