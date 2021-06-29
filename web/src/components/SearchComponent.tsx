import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useState } from 'react'
import { MeQuery, MeDocument } from '../generated/graphql';
import login from '../pages/login';
import { toErrorMap } from '../utils/toErrorMap';
import FormikControl from './FormikControl';
import SearchInput from './search/SearchInput';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import { useRouter } from 'next/router';


interface SearchComponentProps {

}

interface SearchValues {
    [key: string]: any;
}

const initialValues: SearchValues = {
    guests_count: '',
    startDate: '',
    endDate: '',
    lat: 0, lng: 0,
    street: '',
    city: '',
    state: '',
    country: '',
    apartment: ''
}

const SearchComponent: React.FC<SearchComponentProps> = ({ }) => {
    moment.locale('ru');
    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);
    const [focusedInput, setFocusedInput] = useState<any | null>(null);
    const router = useRouter();



    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setErrors, setSubmitting }) => {

                router.push({
                    pathname: '/search/[data]',
                    query: {
                        data: JSON.stringify(values),
                    },
                });
                setSubmitting(false);
            }}>
            {({ isSubmitting, setValues, setFieldValue, values }) => (
                <Form>
                    <Flex>
                        <SearchInput
                            name='street'
                            placeholder='Адрес'
                            setValues={setValues}
                            setFieldValue={setFieldValue}
                            values={values}
                            maxW='200px'
                        />

                        <Box mx='10px'>
                            <DateRangePicker
                                startDate={startDate} // momentPropTypes.momentObj or null,
                                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                endDate={endDate} // momentPropTypes.momentObj or null,
                                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                onDatesChange={({ startDate, endDate }) => {
                                    setStartDate(startDate);
                                    setEndDate(endDate);
                                    setValues({
                                        ...values,
                                        startDate: '' + startDate,
                                        endDate: '' + endDate,
                                    });
                                }} // PropTypes.func.isRequired,
                                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                                readOnly={true}
                                daySize={50}
                                hideKeyboardShortcutsPanel={true}
                                withPortal={true}
                                startDatePlaceholderText='Прибытие'
                                endDatePlaceholderText='Выезд'
                            />
                        </Box>

                        <FormikControl
                            control='count'
                            name='guests_count'
                            placeholder='Гости'
                            width='100px'
                        />


                        <IconButton ml='10px' colorScheme='airbnb' aria-label="Search database" isLoading={isSubmitting} type='submit' icon={<SearchIcon />} />
                    </Flex>
                    {/* <pre style={{ userSelect: 'none', position: 'fixed', top: 0, right: 0, fontSize: '12px' }}>
                        {JSON.stringify(values, null, 2)}
                    </pre> */}
                </Form>
            )}
        </Formik>
    );
}

export default SearchComponent