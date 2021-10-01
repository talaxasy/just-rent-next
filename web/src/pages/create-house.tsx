import {Box, Button, Divider, Flex, Spinner, Text} from '@chakra-ui/react';
import {Form, Formik} from 'formik';
import {CheckboxContainer, CheckboxControl} from 'formik-chakra-ui';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';
import * as Yup from 'yup';
import FormikControl from '../components/FormikControl';
import DropZoneField from '../components/inputs/DropZoneField';
import Layout from '../components/Layout';
import LocationField from '../components/LocationField';
import Wrapper from '../components/Wrapper';
import {
  useCreateHouseMutation,
  useDefaultAmenitiesQuery,
  useDefaultHouseTypesQuery,
  useDefaultRoomTypesQuery,
  useDefaultRulesQuery,
  useSafetyAmenitiesQuery,
} from '../generated/graphql';
import {toErrorMap} from '../utils/toErrorMap';
import {useIsAuth} from '../utils/useIsAuth';
import {withApollo} from '../utils/withApollo';

export interface FormValues {
  title: string;
  description: string;
  country: string;
  street: string;
  city: string;
  state: string;
  apartment: string;
  zip: string;
  bed_count: number;
  bedroom_count: number;
  bathroom_count: number;
  guests_count: number;
  booking_can_advance_checker: boolean;
  booking_can_advance_time: string;
  price: number;
  booking_min: number;
  booking_max: number;
  amenities: string[];
  rules: string[];
  safety_amenities: string[];
  disability: boolean;
  avalible_dates: string[];
  address: string;
  longitude: number;
  latitude: number;
  house_typeId: number;
  room_typeId: number;
  booking_before: string;
  availability_arrivals_start: string;
  availability_arrivals_end: string;
  file: SteroidsFileType[] | null;
}

interface SteroidsFileType extends File {
  preview: string;
}

interface DefaultCenter {
  lat: number;
  lng: number;
}

const MapWithAMarker = withGoogleMap<{
  defaultCenter: DefaultCenter;
  onClick: (e: google.maps.KmlMouseEvent) => void;
  markerPosition: DefaultCenter;
}>(props => (
  <GoogleMap
    defaultZoom={17}
    defaultCenter={props.defaultCenter}
    center={props.defaultCenter}
    onClick={props.onClick}
  >
    <Marker position={props.markerPosition} />
  </GoogleMap>
));

const CreateHouse: React.FC = ({}) => {
  const {loading: meLoading, data: meData} = useIsAuth({redirectTo: '/login'});
  if (!meData?.me || meLoading) return <Spinner />;

  const router = useRouter();
  const {data: defaultAmenities, loading: loadingAmenities} = useDefaultAmenitiesQuery();
  const {data: defaultRules, loading: loadingRules} = useDefaultRulesQuery();
  const {data: defaultHouseTypes, loading: loadingHouse} = useDefaultHouseTypesQuery();
  const {data: defaultRoomTypes, loading: loadingRoom} = useDefaultRoomTypesQuery();
  const {data: safetyAmenities, loading: loadingSafety} = useSafetyAmenitiesQuery();
  const [createHouse] = useCreateHouseMutation();
  const [roomType, setRoomType] = useState(1);
  const [defaultCenterForeign, setDefaultCenterForeign] = useState<DefaultCenter | null>(null);

  const getRoomType = (val: number) => {
    setRoomType(val);
  };

  const getDefaultCenter = (val: DefaultCenter | null) => {
    setDefaultCenterForeign(val);
  };

  let defHouseTypes: Array<{id: number; name: string; description: string}> = [];
  let defRoomTypes: Array<{id: number; name: string; description: string}> = [];
  let defAmenities: Array<{name: string; description: string}> = [];
  let defRules: Array<{name: string; description: string}> = [];
  let safAmenities: Array<{name: string; description: string}> = [];

  defaultHouseTypes?.defaultHouseTypes.map(el => {
    defHouseTypes.push({id: el.id, name: el.name, description: el.description});
  });
  defaultRoomTypes?.defaultRoomTypes.map(el => {
    defRoomTypes.push({id: el.id, name: el.name, description: el.description});
  });
  defaultAmenities?.defaultAmenities.map(el => {
    defAmenities.push({name: el.name, description: el.description});
  });
  defaultRules?.defaultRules.map(el => {
    defRules.push({name: el.name, description: el.description});
  });
  safetyAmenities?.safetyAmenities.map(el => {
    safAmenities.push({name: el.name, description: el.description});
  });

  const validationSchema = Yup.object({
    amenities: Yup.array().min(1, 'Должно быть минимум одно удобство'),
    title: Yup.string()
      .min(5, 'Динна названия должно быть минимум 5 симоволов')
      .required('Это поле обязательно'),
  });

  const initialValues: FormValues = {
    title: '',
    description: '',
    country: '',
    street: '',
    city: '',
    state: '',
    apartment: '',
    zip: '',
    bed_count: 1,
    bedroom_count: 1,
    bathroom_count: 1,
    guests_count: 1,
    booking_can_advance_checker: false,
    booking_can_advance_time: '',
    price: 0,
    booking_min: 0,
    booking_max: 0,
    amenities: [],
    rules: [],
    safety_amenities: [],
    disability: false,
    avalible_dates: [],
    address: '',
    longitude: 0,
    latitude: 0,
    house_typeId: 1,
    room_typeId: 1,
    booking_before: '',
    availability_arrivals_start: '',
    availability_arrivals_end: '',
    file: null,
  };

  return (
    <>
      <Layout>
        <Wrapper variant="average">
          <Box mx="auto" w="fit-content" fontSize="26px" fontWeight="bold" my={10}>
            Добавление нового жилья
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {setErrors}) => {
              if (roomType === 3) {
                values.bedroom_count = 0;
              }

              if (values.file?.length === 0) {
                values.file = null;
              }
              values.price = parseInt('' + values.price, 10) ? parseInt('' + values.price, 10) : 1;

              const resp = await createHouse({
                variables: {input: values},
                update: cache => {
                  cache.evict({
                    fieldName: 'houses:{}',
                  });
                },
              });
              if (resp.data?.createHouse.errors) {
                setErrors(toErrorMap(resp.data.createHouse.errors));
                console.log(resp.data.createHouse.errors);
              } else if (resp.data?.createHouse.house) {
                console.log(resp.data.createHouse.house);
                router.push('/');
              }
              console.log(values);
            }}
          >
            {({isSubmitting, values, setFieldValue, setValues}) => (
              <Form style={{position: 'relative', marginBottom: '30px'}}>
                <Flex flexDirection="column">
                  <Flex>
                    <FormikControl
                      control="input"
                      name="title"
                      label="Название объявления"
                      placeholder="Название"
                      description="Гостей привлечет название, отражающее уникальность жилья"
                    />
                  </Flex>
                  <Box h={5}></Box>
                  <Flex>
                    <FormikControl
                      control="input"
                      name="description"
                      placeholder="Расскажите гостям о жилье"
                      label="Расскажите гостям о жилье"
                      description="Расскажите, чем интересен ваш район, и укажите особенности жилья, например быстрый Wi-Fi или парковку."
                      textarea={true}
                    />
                  </Flex>
                  <Divider my={10} />
                  <DropZoneField
                    name="file"
                    setFieldValue={setFieldValue}
                    label="Оживите объявление с помощью фото"
                    description="Снимайте телефоном или фотоаппаратом. Для публикации объявления нужно хотя бы одно фото. Перетаскивая изображения, расставьте их в нужном порядке. Отредактировать фото или добавить новые можно позже."
                  />

                  <Divider my={10} />
                  <Text fontSize="xl" fontWeight="bold" mb="40px">
                    Какое жилье вы сдаете?
                  </Text>
                  <Flex>
                    {!loadingHouse ? (
                      <FormikControl
                        control="select"
                        name="house_typeId"
                        label="Выберите тип жилья"
                        array={defHouseTypes}
                      />
                    ) : (
                      <Spinner />
                    )}

                    <Box w={20}></Box>
                    {!loadingRoom ? (
                      <FormikControl
                        control="select"
                        name="room_typeId"
                        label="Сузим выбор"
                        array={defRoomTypes}
                        getRoomType={getRoomType}
                      />
                    ) : (
                      <Spinner />
                    )}
                  </Flex>
                  <Divider my={10} />
                  {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
                  <Flex>
                    <FormikControl
                      control="input"
                      smallSize={true}
                      name="country"
                      placeholder="Страна"
                      label="Страна"
                    />
                    <Box w={20}></Box>
                    {/* <FormikControl
                        control='input'
                        smallSize={true}
                        name='street'
                        placeholder='Улица'
                        label='Улица'
                    /> */}
                    <LocationField
                      name="tmp"
                      label="Улица"
                      values={values}
                      setValues={setValues}
                      getDefaultCenter={getDefaultCenter}
                      setFieldValue={setFieldValue}
                    />
                  </Flex>
                  <Box my={3}></Box>
                  <Flex>
                    <FormikControl
                      control="input"
                      smallSize={true}
                      name="apartment"
                      placeholder="Квартира"
                      label="Квартира/корпус"
                    />
                    <Box w={20}></Box>
                    <FormikControl
                      control="input"
                      smallSize={true}
                      name="state"
                      placeholder="Штат"
                      label="Штат/регион"
                    />
                  </Flex>
                  <Box my={3}></Box>
                  <Flex mb="40px">
                    <FormikControl
                      control="input"
                      smallSize={true}
                      name="city"
                      placeholder="Город"
                      label="Город"
                    />
                    <Box w={20}></Box>
                    <FormikControl
                      control="input"
                      smallSize={true}
                      name="zip"
                      placeholder="Почтовый индекс"
                      label="Почтовый индекс"
                    />
                  </Flex>
                  {defaultCenterForeign && (
                    <MapWithAMarker
                      containerElement={<div style={{height: `400px`}} />}
                      mapElement={<div style={{height: `100%`}} />}
                      defaultCenter={defaultCenterForeign}
                      markerPosition={{lat: values.latitude, lng: values.longitude}}
                      onClick={async x => {
                        const lat = x.latLng?.lat();
                        const lng = x.latLng?.lng();

                        let country = '';
                        let city = '';
                        let state = '';
                        let street = '';
                        let apartment = '';

                        if (lat && lng) {
                          // let placeFromLarLng: any = null;
                          let geocoder = new google.maps.Geocoder();
                          const placeFrom = await geocoder.geocode(
                            {
                              location: new google.maps.LatLng(lat, lng),
                            },
                            function (results, status) {
                              if (status == google.maps.GeocoderStatus.OK && results) {
                                return results;
                              }
                            },
                          );

                          let placeFromLarLng = placeFrom?.results[0];

                          if (placeFromLarLng) {
                            for (let i = 0; i < placeFromLarLng.address_components.length; i++) {
                              for (
                                let j = 0;
                                j < placeFromLarLng.address_components[i].types.length;
                                j++
                              ) {
                                if (placeFromLarLng.address_components[i].types[j] == 'country')
                                  country = placeFromLarLng.address_components[i].long_name;
                              }
                            }
                            for (let i = 0; i < placeFromLarLng.address_components.length; i++) {
                              for (
                                let j = 0;
                                j < placeFromLarLng.address_components[i].types.length;
                                j++
                              ) {
                                if (placeFromLarLng.address_components[i].types[j] == 'locality')
                                  city = placeFromLarLng.address_components[i].long_name;
                              }
                            }
                            for (let i = 0; i < placeFromLarLng.address_components.length; i++) {
                              for (
                                let j = 0;
                                j < placeFromLarLng.address_components[i].types.length;
                                j++
                              ) {
                                if (
                                  placeFromLarLng.address_components[i].types[j] ==
                                  ('sublocality_level_1' ||
                                    'sublocality' ||
                                    'administrative_area_level_1')
                                )
                                  state = placeFromLarLng.address_components[i].long_name;
                              }
                            }
                            for (let i = 0; i < placeFromLarLng.address_components.length; i++) {
                              for (
                                let j = 0;
                                j < placeFromLarLng.address_components[i].types.length;
                                j++
                              ) {
                                if (placeFromLarLng.address_components[i].types[j] == 'route')
                                  street = placeFromLarLng.address_components[i].long_name;
                              }
                            }
                            for (let i = 0; i < placeFromLarLng.address_components.length; i++) {
                              for (
                                let j = 0;
                                j < placeFromLarLng.address_components[i].types.length;
                                j++
                              ) {
                                if (
                                  placeFromLarLng.address_components[i].types[j] == 'street_number'
                                )
                                  apartment = placeFromLarLng.address_components[i].long_name;
                              }
                            }
                          }

                          setValues({
                            ...values,
                            longitude: lng,
                            latitude: lat,
                            street,
                          });
                          setFieldValue('country', country);
                          setFieldValue('city', city);
                          setFieldValue('state', state);
                          setFieldValue('apartment', apartment);
                        }
                      }}
                    />
                  )}
                  <Divider my={10} />
                  {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
                  <Flex flexDirection="column">
                    {/* <FormControl isInvalid={!!error}>
                                            <FormLabel htmlFor={field.name}>{label}</FormLabel>
                                            <HStack maxW="320px">
                                                <Button {...dec}>-</Button>
                                                <Input id={ } {...input} />
                                                <Button {...inc}>+</Button>
                                            </HStack>
                                        </FormControl> */}
                    {/* <Box mt={10}></Box> */}
                    {/* <InputFieldProps
                                            name='guests_count'
                                            label='Сколько гостей вмещает ваше жилье?'
                                            typeField='count'
                                            markForCount='guests'
                                            description='У каждого гостя должно быть свое комфортное спальное место.'
                                            prelabel='Гости'
                                        /> */}
                    <Text fontSize="xl" mb="5px" fontWeight="bold">
                      Сколько гостей вмещает ваше жилье?
                    </Text>
                    <Text fontSize="lg" mb="30px" opacity=".9">
                      У каждого гостя должно быть свое комфортное спальное место.
                    </Text>
                    <FormikControl
                      control="count"
                      name="guests_count"
                      label="Сколькими спальнями могут пользоваться гости?"
                      preLabel="Гости"
                      maxW="100px"
                    />
                    <Box mt={10}></Box>
                    <FormikControl
                      control="count"
                      name="bed_count"
                      label="Сколькими кроватями могут пользоваться гости?"
                      preLabel="Кровати"
                      maxW="100px"
                    />

                    {roomType !== 3 ? (
                      <>
                        <Box mt={10}></Box>
                        <FormikControl
                          control="count"
                          name="bedroom_count"
                          label="Сколькими спальнями могут пользоваться гости?"
                          preLabel="Спальни"
                          maxW="100px"
                        />
                      </>
                    ) : null}
                  </Flex>
                  <Divider my={10} />
                  <Flex>
                    <FormikControl
                      control="count"
                      name="bathroom_count"
                      label="Количество душевых комнат"
                      preLabel="Душевые комнаты"
                      maxW="100px"
                    />
                  </Flex>
                  <Divider my={10} />
                  {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
                  <Flex>
                    <Box w="55%">
                      {!loadingAmenities ? (
                        <CheckboxContainer
                          stackProps={{pl: 0, mt: 0, spacing: 5}}
                          variant="teal"
                          name="amenities"
                        >
                          <Text fontSize="xl" fontWeight="bold">
                            Какие удобства вы предлагаете?
                          </Text>
                          <Text mb="20px" fontSize="lg" opacity=".9">
                            Гости обычно рассчитывают на эти удобства, но после публикации можно
                            добавить другие.
                          </Text>
                          {defAmenities ? (
                            defAmenities.map(el => {
                              return (
                                <CheckboxControl
                                  key={el.name}
                                  display="flex"
                                  alignItems="flex-start"
                                  colorScheme="teal"
                                  size="lg"
                                  name="amenities"
                                  value={el.name}
                                >
                                  <Box pl="10px">
                                    <Text lineHeight="1.4" mt="-3px">
                                      {el.name}
                                    </Text>
                                    {el.description ? (
                                      <span
                                        style={{
                                          fontSize: '14px',
                                          opacity: '.9',
                                          lineHeight: '1.2',
                                          display: 'inline-flex',
                                        }}
                                      >
                                        {el.description}
                                      </span>
                                    ) : null}
                                  </Box>
                                </CheckboxControl>
                              );
                            })
                          ) : (
                            <Box>Увы но, какбы что-то пошло нет так</Box>
                          )}
                        </CheckboxContainer>
                      ) : (
                        <Spinner />
                      )}
                    </Box>
                    <Box w="50px" />
                    <Box w="45%">
                      {!loadingSafety ? (
                        <CheckboxContainer
                          mb="50px"
                          stackProps={{pl: 0, mt: 0, spacing: 5}}
                          variant="teal"
                          name="safety_amenities"
                        >
                          <Text fontSize="xl" mb="20px" fontWeight="bold">
                            Оборудование для безопасности
                          </Text>
                          {safAmenities ? (
                            safAmenities.map(el => {
                              return (
                                <CheckboxControl
                                  key={el.name}
                                  colorScheme="teal"
                                  display="flex"
                                  alignItems="flex-start"
                                  size="lg"
                                  name="safety_amenities"
                                  value={el.name}
                                >
                                  <Box pl="10px">
                                    <Text lineHeight="1.4" mt="-3px">
                                      {el.name}
                                    </Text>
                                    {el.description ? (
                                      <span
                                        style={{
                                          fontSize: '14px',
                                          opacity: '.9',
                                          lineHeight: '1.2',
                                          display: 'inline-flex',
                                        }}
                                      >
                                        {el.description}
                                      </span>
                                    ) : null}
                                  </Box>
                                </CheckboxControl>
                              );
                            })
                          ) : (
                            <Box>Увы но, какбы что-то пошло нет так</Box>
                          )}
                        </CheckboxContainer>
                      ) : (
                        <Spinner />
                      )}

                      {!loadingRules ? (
                        <CheckboxContainer
                          stackProps={{pl: 0, mt: 0, spacing: 5}}
                          variant="teal"
                          name="rules"
                        >
                          <Text fontSize="xl" mb="20px" fontWeight="bold">
                            Правила дома
                          </Text>
                          {defRules ? (
                            defRules.map(el => {
                              return (
                                <CheckboxControl
                                  key={el.name}
                                  colorScheme="teal"
                                  display="flex"
                                  alignItems="flex-start"
                                  size="lg"
                                  name="rules"
                                  value={el.name}
                                >
                                  <Box pl="10px">
                                    <Text lineHeight="1.4" mt="-3px">
                                      {el.name}
                                    </Text>
                                    {el.description ? (
                                      <span
                                        style={{
                                          fontSize: '14px',
                                          opacity: '.9',
                                          lineHeight: '1.2',
                                          display: 'inline-flex',
                                        }}
                                      >
                                        {el.description}
                                      </span>
                                    ) : null}
                                  </Box>
                                </CheckboxControl>
                              );
                            })
                          ) : (
                            <Box>Увы но, какбы что-то пошло нет так</Box>
                          )}
                        </CheckboxContainer>
                      ) : (
                        <Spinner />
                      )}
                    </Box>
                  </Flex>
                  {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
                  <Divider my={10} />
                  <Flex flexDir="column">
                    <Text fontSize="xl" fontWeight="bold" mb="10px">
                      Жилье оснащено удобствами для людей с особыми потребностями?
                    </Text>
                    <Text fontSize="lg" mb="20px" opacity=".9">
                      Каждый месяц тысячи гостей ищут жилье с удобствами для людей с особыми
                      потребностями. Добавьте их, чтобы привлечь внимание к объявлению и сделать
                      путешествия более доступными для всех.
                      <br />
                      <br />
                      Опубликуйте объявление. Удобства для людей с особыми потребностями добавите
                      позже. Мы напомним об этом и подскажем, как их сфотографировать.
                    </Text>
                    <FormikControl
                      control="switch"
                      colorScheme="teal"
                      size="lg"
                      name="disability"
                      label="Напомнить об удобствах для людей с особыми потребностями"
                    />
                  </Flex>
                  <Divider my={10} />
                  <Flex flexDir="column">
                    <Text fontSize="xl" fontWeight="bold" mb="10px">
                      Оцените свое жилье
                    </Text>
                    <Text fontSize="lg" mb="10px">
                      Установить базовую цену для каждой ночи
                    </Text>
                    <Text fontSize="md" opacity=".8" mb="20px">
                      К цене, установленной хозяином, добавляется 14% сбора за услуги, но иногда его
                      сумма зависит от продолжительности поездки.
                    </Text>
                    <FormikControl
                      control="input"
                      name="price"
                      label="Базовая цена"
                      description="Это ваша цена по умолчанию."
                      sightInput={true}
                      maxW="250px"
                    />
                  </Flex>
                </Flex>
                <Button
                  colorScheme="teal"
                  maxWidth="300px"
                  mt="40px"
                  mx="auto"
                  w="100%"
                  h="50px"
                  fontSize="xl"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Добавить
                </Button>
                {/* <pre style={{ userSelect: 'none', position: 'fixed', top: 0, right: 0, fontSize: '12px' }}>
                                    {JSON.stringify(values, null, 2)}
                                </pre> */}
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withApollo({ssr: false})(CreateHouse);
