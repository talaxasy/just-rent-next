import React from 'react'
import CheckboxGroup from './inputs/CheckboxGroup';
import CountInput from './inputs/CountInput';
import SelectInput from './inputs/SelectInput';
import SwitchInput from './inputs/SwitchInput';
import TextInput, { TextInputProps } from './inputs/TextInput';
import LocationField from './LocationField';

interface FormikControlProps extends TextInputProps {
    control: 'input' | 'checkbox' | 'switch' | 'select' | 'count';
}


const FormikControl: React.FC<FormikControlProps> = ({ control, ...rest }) => {
    switch (control) {
        case 'input':
            return <TextInput {...rest} />
        case 'checkbox':
            return <CheckboxGroup {...rest} />
        case 'switch':
            return <SwitchInput {...rest} />
        case 'select':
            return <SelectInput {...rest} />
        case 'count':
            return <CountInput {...rest} />
        default:
            return null;
    }
}

export default FormikControl