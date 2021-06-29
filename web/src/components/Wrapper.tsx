import { Box } from '@chakra-ui/react';
import React from 'react'

type WrapperVariant = 'infinite' | 'small' | 'large' | 'average';

interface WrapperProps {
    variant?: WrapperVariant;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'large' }) => {
    let mx: undefined | string = '';
    switch (variant) {
        case 'infinite':
            mx = undefined
            break;
        case 'small':
            mx = '400px'
            break;
        case 'large':
            mx = '1300px'
            break;
        case 'average':
            mx = '800px'
            break;
        default:
            break;
    }

    return (
        <Box mx='auto' maxW={mx} w='100%' px={variant !== 'infinite' ? 4 : undefined}>
            {children}
        </Box>
    );
}

export default Wrapper