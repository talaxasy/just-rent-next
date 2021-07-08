import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  defaultHouseTypes: Array<HouseType>;
  safetyAmenities: Array<SafetyAmeneties>;
  defaultRoomTypes: Array<RoomType>;
  defaultAmenities: Array<DefaultAmenities>;
  defaultRules: Array<DefaultRules>;
  reviews: Array<Review>;
  searchListings?: Maybe<Array<House>>;
  getCustomerBookings?: Maybe<Array<Booking>>;
  getAdminBookings?: Maybe<Array<Booking>>;
  getBookings: Array<Scalars['String']>;
  houses: PaginatedHouses;
  house?: Maybe<House>;
};


export type QueryReviewsArgs = {
  houseId: Scalars['Int'];
};


export type QuerySearchListingsArgs = {
  input: SearchInput;
};


export type QueryGetCustomerBookingsArgs = {
  finished?: Maybe<Scalars['Boolean']>;
};


export type QueryGetAdminBookingsArgs = {
  finished?: Maybe<Scalars['Boolean']>;
};


export type QueryGetBookingsArgs = {
  houseId: Scalars['Int'];
};


export type QueryHousesArgs = {
  housesById?: Maybe<Scalars['Boolean']>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryHouseArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  secondName: Scalars['String'];
  description: Scalars['String'];
  phone: Scalars['String'];
  gender: Scalars['Float'];
  birthDay: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type HouseType = {
  __typename?: 'HouseType';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SafetyAmeneties = {
  __typename?: 'SafetyAmeneties';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type RoomType = {
  __typename?: 'RoomType';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type DefaultAmenities = {
  __typename?: 'DefaultAmenities';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type DefaultRules = {
  __typename?: 'DefaultRules';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  userId: Scalars['Float'];
  user: User;
  houseId: Scalars['Float'];
  house: House;
  text: Scalars['String'];
  mark: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type House = {
  __typename?: 'House';
  id: Scalars['Float'];
  reviewCount?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  description: Scalars['String'];
  country: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  apartment: Scalars['String'];
  zip: Scalars['String'];
  bed_count: Scalars['Float'];
  bedroom_count: Scalars['Float'];
  bathroom_count: Scalars['Float'];
  guests_count: Scalars['Float'];
  booking_before: Scalars['String'];
  availability_arrivals_start: Scalars['String'];
  availability_arrivals_end: Scalars['String'];
  booking_can_advance_checker: Scalars['Boolean'];
  booking_can_advance_time: Scalars['String'];
  booking_min: Scalars['Float'];
  booking_max: Scalars['Float'];
  price: Scalars['Float'];
  amenities: Array<Scalars['String']>;
  rules: Array<Scalars['String']>;
  safety_amenities?: Maybe<Array<Scalars['String']>>;
  pictureUrl: Array<Scalars['String']>;
  disability: Scalars['Boolean'];
  avalible_dates: Array<Scalars['String']>;
  address: Scalars['String'];
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  rating: Scalars['Float'];
  userId: Scalars['Float'];
  house_typeId: Scalars['Float'];
  room_typeId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  house_type: HouseType;
  room_type: RoomType;
  user: User;
  textSnippet: Scalars['String'];
};

export type SearchInput = {
  country?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  apartment?: Maybe<Scalars['String']>;
  bed_count?: Maybe<Scalars['Float']>;
  guests_count?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['Boolean']>;
  endDate?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

export type Booking = {
  __typename?: 'Booking';
  id: Scalars['Float'];
  endDate: Scalars['String'];
  startDate: Scalars['String'];
  guests_count: Scalars['Float'];
  status: Scalars['String'];
  userId: Scalars['Float'];
  user: User;
  houseId: Scalars['Float'];
  house: House;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedHouses = {
  __typename?: 'PaginatedHouses';
  houses: Array<House>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  updateUser?: Maybe<User>;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  doBooking: Array<Scalars['String']>;
  createHouse: HouseResponse;
  leaveReview: Scalars['Boolean'];
  updateHouse?: Maybe<House>;
  deleteHouse: Scalars['Boolean'];
  deleteBooking: Scalars['Boolean'];
  changeBookingStatus: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  firstName: Scalars['String'];
  secondName: Scalars['String'];
  description: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: ImportantUserFields;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationDoBookingArgs = {
  houseId: Scalars['Int'];
  guests_count: Scalars['Int'];
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};


export type MutationCreateHouseArgs = {
  input: HouseInput;
};


export type MutationLeaveReviewArgs = {
  options: ReviewInput;
};


export type MutationUpdateHouseArgs = {
  description: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteHouseArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteBookingArgs = {
  id: Scalars['Int'];
};


export type MutationChangeBookingStatusArgs = {
  finished?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ImportantUserFields = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type HouseResponse = {
  __typename?: 'HouseResponse';
  errors?: Maybe<Array<FieldError>>;
  house?: Maybe<House>;
};

export type HouseInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  country: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  apartment: Scalars['String'];
  zip: Scalars['String'];
  bed_count: Scalars['Float'];
  bedroom_count: Scalars['Float'];
  bathroom_count: Scalars['Float'];
  guests_count: Scalars['Float'];
  booking_can_advance_checker: Scalars['Boolean'];
  booking_can_advance_time: Scalars['String'];
  booking_min: Scalars['Float'];
  booking_max: Scalars['Float'];
  price: Scalars['Float'];
  amenities: Array<Scalars['String']>;
  rules?: Maybe<Array<Scalars['String']>>;
  safety_amenities?: Maybe<Array<Scalars['String']>>;
  disability: Scalars['Boolean'];
  avalible_dates: Array<Scalars['String']>;
  address: Scalars['String'];
  longitude: Scalars['Float'];
  booking_before: Scalars['String'];
  availability_arrivals_start: Scalars['String'];
  availability_arrivals_end: Scalars['String'];
  latitude: Scalars['Float'];
  rating?: Maybe<Scalars['Float']>;
  house_typeId: Scalars['Float'];
  room_typeId: Scalars['Float'];
  file?: Maybe<Array<Scalars['Upload']>>;
};


export type ReviewInput = {
  houseId: Scalars['Int'];
  mark: Scalars['Int'];
  text: Scalars['String'];
};

export type HouseSnippetFragment = (
  { __typename?: 'House' }
  & Pick<House, 'id' | 'title' | 'createdAt' | 'updatedAt' | 'rating' | 'price'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'phone' | 'description' | 'firstName' | 'secondName'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangeBookingStatusMutationVariables = Exact<{
  id: Scalars['Int'];
  active?: Maybe<Scalars['Int']>;
  finished?: Maybe<Scalars['Int']>;
}>;


export type ChangeBookingStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeBookingStatus'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateHouseMutationVariables = Exact<{
  input: HouseInput;
}>;


export type CreateHouseMutation = (
  { __typename?: 'Mutation' }
  & { createHouse: (
    { __typename?: 'HouseResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>>, house?: Maybe<(
      { __typename?: 'House' }
      & Pick<House, 'title' | 'description' | 'country' | 'street' | 'city' | 'state' | 'apartment' | 'zip' | 'bed_count' | 'bedroom_count' | 'bathroom_count' | 'guests_count' | 'booking_can_advance_checker' | 'booking_can_advance_time' | 'price' | 'booking_min' | 'booking_max' | 'amenities' | 'rules' | 'safety_amenities' | 'disability' | 'avalible_dates' | 'address' | 'longitude' | 'latitude' | 'house_typeId' | 'room_typeId' | 'booking_before' | 'availability_arrivals_start' | 'availability_arrivals_end' | 'pictureUrl'>
    )> }
  ) }
);

export type DeleteBookingMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteBookingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBooking'>
);

export type DeleteHouseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteHouseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteHouse'>
);

export type DoBookingMutationVariables = Exact<{
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  guests_count: Scalars['Int'];
  houseId: Scalars['Int'];
}>;


export type DoBookingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'doBooking'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LeaveReviewMutationVariables = Exact<{
  houseId: Scalars['Int'];
  mark: Scalars['Int'];
  text: Scalars['String'];
}>;


export type LeaveReviewMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveReview'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: ImportantUserFields;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdateHouseMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdateHouseMutation = (
  { __typename?: 'Mutation' }
  & { updateHouse?: Maybe<(
    { __typename?: 'House' }
    & Pick<House, 'id' | 'title'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  phone: Scalars['String'];
  description: Scalars['String'];
  secondName: Scalars['String'];
  firstName: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type DefaultAmenitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type DefaultAmenitiesQuery = (
  { __typename?: 'Query' }
  & { defaultAmenities: Array<(
    { __typename?: 'DefaultAmenities' }
    & Pick<DefaultAmenities, 'id' | 'name' | 'description'>
  )> }
);

export type DefaultHouseTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type DefaultHouseTypesQuery = (
  { __typename?: 'Query' }
  & { defaultHouseTypes: Array<(
    { __typename?: 'HouseType' }
    & Pick<HouseType, 'id' | 'name' | 'description'>
  )> }
);

export type DefaultRoomTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type DefaultRoomTypesQuery = (
  { __typename?: 'Query' }
  & { defaultRoomTypes: Array<(
    { __typename?: 'RoomType' }
    & Pick<RoomType, 'id' | 'name' | 'description'>
  )> }
);

export type DefaultRulesQueryVariables = Exact<{ [key: string]: never; }>;


export type DefaultRulesQuery = (
  { __typename?: 'Query' }
  & { defaultRules: Array<(
    { __typename?: 'DefaultRules' }
    & Pick<DefaultRules, 'id' | 'name' | 'description'>
  )> }
);

export type GetAdminBookingsQueryVariables = Exact<{
  finished?: Maybe<Scalars['Boolean']>;
}>;


export type GetAdminBookingsQuery = (
  { __typename?: 'Query' }
  & { getAdminBookings?: Maybe<Array<(
    { __typename?: 'Booking' }
    & Pick<Booking, 'id' | 'endDate' | 'startDate' | 'guests_count' | 'status' | 'userId' | 'houseId' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
    ), house: (
      { __typename?: 'House' }
      & Pick<House, 'id' | 'pictureUrl' | 'title' | 'country' | 'street' | 'state' | 'apartment' | 'price' | 'city'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'phone' | 'firstName' | 'secondName'>
      ) }
    ) }
  )>> }
);

export type GetBookingsQueryVariables = Exact<{
  houseId: Scalars['Int'];
}>;


export type GetBookingsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getBookings'>
);

export type GetCustomerBookingsQueryVariables = Exact<{
  finished?: Maybe<Scalars['Boolean']>;
}>;


export type GetCustomerBookingsQuery = (
  { __typename?: 'Query' }
  & { getCustomerBookings?: Maybe<Array<(
    { __typename?: 'Booking' }
    & Pick<Booking, 'id' | 'endDate' | 'startDate' | 'guests_count' | 'status' | 'userId' | 'houseId' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), house: (
      { __typename?: 'House' }
      & Pick<House, 'id' | 'pictureUrl' | 'title' | 'country' | 'street' | 'state' | 'apartment' | 'price' | 'city'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'phone' | 'firstName' | 'secondName'>
      ) }
    ) }
  )>> }
);

export type HouseQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type HouseQuery = (
  { __typename?: 'Query' }
  & { house?: Maybe<(
    { __typename?: 'House' }
    & Pick<House, 'title' | 'description' | 'country' | 'street' | 'city' | 'state' | 'apartment' | 'zip' | 'bed_count' | 'bedroom_count' | 'bathroom_count' | 'guests_count' | 'booking_can_advance_checker' | 'booking_can_advance_time' | 'price' | 'booking_min' | 'booking_max' | 'amenities' | 'rules' | 'safety_amenities' | 'disability' | 'avalible_dates' | 'address' | 'longitude' | 'latitude' | 'house_typeId' | 'room_typeId' | 'booking_before' | 'availability_arrivals_start' | 'availability_arrivals_end' | 'pictureUrl' | 'createdAt' | 'updatedAt' | 'id' | 'userId' | 'rating' | 'reviewCount'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), room_type: (
      { __typename?: 'RoomType' }
      & Pick<RoomType, 'id' | 'name'>
    ), house_type: (
      { __typename?: 'HouseType' }
      & Pick<HouseType, 'id' | 'name'>
    ) }
  )> }
);

export type HousesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  housesById?: Maybe<Scalars['Boolean']>;
}>;


export type HousesQuery = (
  { __typename?: 'Query' }
  & { houses: (
    { __typename?: 'PaginatedHouses' }
    & Pick<PaginatedHouses, 'hasMore'>
    & { houses: Array<(
      { __typename?: 'House' }
      & Pick<House, 'id' | 'title' | 'createdAt' | 'updatedAt' | 'rating' | 'price' | 'bed_count' | 'bedroom_count' | 'bathroom_count' | 'reviewCount' | 'pictureUrl'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ReviewsQueryVariables = Exact<{
  houseId: Scalars['Int'];
}>;


export type ReviewsQuery = (
  { __typename?: 'Query' }
  & { reviews: Array<(
    { __typename?: 'Review' }
    & Pick<Review, 'houseId' | 'userId' | 'mark' | 'text' | 'createdAt' | 'updatedAt'>
  )> }
);

export type SafetyAmenitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type SafetyAmenitiesQuery = (
  { __typename?: 'Query' }
  & { safetyAmenities: Array<(
    { __typename?: 'SafetyAmeneties' }
    & Pick<SafetyAmeneties, 'id' | 'name' | 'description'>
  )> }
);

export type SearchListingsQueryVariables = Exact<{
  input: SearchInput;
}>;


export type SearchListingsQuery = (
  { __typename?: 'Query' }
  & { searchListings?: Maybe<Array<(
    { __typename?: 'House' }
    & Pick<House, 'title' | 'description' | 'country' | 'street' | 'city' | 'state' | 'apartment' | 'zip' | 'bed_count' | 'bedroom_count' | 'bathroom_count' | 'guests_count' | 'booking_can_advance_checker' | 'booking_can_advance_time' | 'price' | 'booking_min' | 'booking_max' | 'amenities' | 'rules' | 'safety_amenities' | 'disability' | 'avalible_dates' | 'address' | 'longitude' | 'latitude' | 'house_typeId' | 'room_typeId' | 'booking_before' | 'availability_arrivals_start' | 'availability_arrivals_end' | 'pictureUrl' | 'createdAt' | 'updatedAt' | 'id' | 'userId' | 'rating' | 'reviewCount'>
  )>> }
);

export const HouseSnippetFragmentDoc = gql`
    fragment HouseSnippet on House {
  id
  title
  createdAt
  updatedAt
  rating
  price
  user {
    id
    username
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  phone
  description
  firstName
  secondName
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangeBookingStatusDocument = gql`
    mutation ChangeBookingStatus($id: Int!, $active: Int, $finished: Int) {
  changeBookingStatus(id: $id, active: $active, finished: $finished)
}
    `;
export type ChangeBookingStatusMutationFn = Apollo.MutationFunction<ChangeBookingStatusMutation, ChangeBookingStatusMutationVariables>;

/**
 * __useChangeBookingStatusMutation__
 *
 * To run a mutation, you first call `useChangeBookingStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeBookingStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeBookingStatusMutation, { data, loading, error }] = useChangeBookingStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      active: // value for 'active'
 *      finished: // value for 'finished'
 *   },
 * });
 */
export function useChangeBookingStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeBookingStatusMutation, ChangeBookingStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeBookingStatusMutation, ChangeBookingStatusMutationVariables>(ChangeBookingStatusDocument, options);
      }
export type ChangeBookingStatusMutationHookResult = ReturnType<typeof useChangeBookingStatusMutation>;
export type ChangeBookingStatusMutationResult = Apollo.MutationResult<ChangeBookingStatusMutation>;
export type ChangeBookingStatusMutationOptions = Apollo.BaseMutationOptions<ChangeBookingStatusMutation, ChangeBookingStatusMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateHouseDocument = gql`
    mutation CreateHouse($input: HouseInput!) {
  createHouse(input: $input) {
    errors {
      message
      field
    }
    house {
      title
      description
      country
      street
      city
      state
      apartment
      zip
      bed_count
      bedroom_count
      bathroom_count
      guests_count
      booking_can_advance_checker
      booking_can_advance_time
      price
      booking_min
      booking_max
      amenities
      rules
      safety_amenities
      disability
      avalible_dates
      address
      longitude
      latitude
      house_typeId
      room_typeId
      booking_before
      availability_arrivals_start
      availability_arrivals_end
      pictureUrl
    }
  }
}
    `;
export type CreateHouseMutationFn = Apollo.MutationFunction<CreateHouseMutation, CreateHouseMutationVariables>;

/**
 * __useCreateHouseMutation__
 *
 * To run a mutation, you first call `useCreateHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHouseMutation, { data, loading, error }] = useCreateHouseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHouseMutation(baseOptions?: Apollo.MutationHookOptions<CreateHouseMutation, CreateHouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHouseMutation, CreateHouseMutationVariables>(CreateHouseDocument, options);
      }
export type CreateHouseMutationHookResult = ReturnType<typeof useCreateHouseMutation>;
export type CreateHouseMutationResult = Apollo.MutationResult<CreateHouseMutation>;
export type CreateHouseMutationOptions = Apollo.BaseMutationOptions<CreateHouseMutation, CreateHouseMutationVariables>;
export const DeleteBookingDocument = gql`
    mutation DeleteBooking($id: Int!) {
  deleteBooking(id: $id)
}
    `;
export type DeleteBookingMutationFn = Apollo.MutationFunction<DeleteBookingMutation, DeleteBookingMutationVariables>;

/**
 * __useDeleteBookingMutation__
 *
 * To run a mutation, you first call `useDeleteBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookingMutation, { data, loading, error }] = useDeleteBookingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBookingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookingMutation, DeleteBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookingMutation, DeleteBookingMutationVariables>(DeleteBookingDocument, options);
      }
export type DeleteBookingMutationHookResult = ReturnType<typeof useDeleteBookingMutation>;
export type DeleteBookingMutationResult = Apollo.MutationResult<DeleteBookingMutation>;
export type DeleteBookingMutationOptions = Apollo.BaseMutationOptions<DeleteBookingMutation, DeleteBookingMutationVariables>;
export const DeleteHouseDocument = gql`
    mutation DeleteHouse($id: Int!) {
  deleteHouse(id: $id)
}
    `;
export type DeleteHouseMutationFn = Apollo.MutationFunction<DeleteHouseMutation, DeleteHouseMutationVariables>;

/**
 * __useDeleteHouseMutation__
 *
 * To run a mutation, you first call `useDeleteHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHouseMutation, { data, loading, error }] = useDeleteHouseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteHouseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHouseMutation, DeleteHouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHouseMutation, DeleteHouseMutationVariables>(DeleteHouseDocument, options);
      }
export type DeleteHouseMutationHookResult = ReturnType<typeof useDeleteHouseMutation>;
export type DeleteHouseMutationResult = Apollo.MutationResult<DeleteHouseMutation>;
export type DeleteHouseMutationOptions = Apollo.BaseMutationOptions<DeleteHouseMutation, DeleteHouseMutationVariables>;
export const DoBookingDocument = gql`
    mutation DoBooking($startDate: String!, $endDate: String!, $guests_count: Int!, $houseId: Int!) {
  doBooking(
    startDate: $startDate
    endDate: $endDate
    guests_count: $guests_count
    houseId: $houseId
  )
}
    `;
export type DoBookingMutationFn = Apollo.MutationFunction<DoBookingMutation, DoBookingMutationVariables>;

/**
 * __useDoBookingMutation__
 *
 * To run a mutation, you first call `useDoBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doBookingMutation, { data, loading, error }] = useDoBookingMutation({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      guests_count: // value for 'guests_count'
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useDoBookingMutation(baseOptions?: Apollo.MutationHookOptions<DoBookingMutation, DoBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoBookingMutation, DoBookingMutationVariables>(DoBookingDocument, options);
      }
export type DoBookingMutationHookResult = ReturnType<typeof useDoBookingMutation>;
export type DoBookingMutationResult = Apollo.MutationResult<DoBookingMutation>;
export type DoBookingMutationOptions = Apollo.BaseMutationOptions<DoBookingMutation, DoBookingMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LeaveReviewDocument = gql`
    mutation LeaveReview($houseId: Int!, $mark: Int!, $text: String!) {
  leaveReview(options: {houseId: $houseId, mark: $mark, text: $text})
}
    `;
export type LeaveReviewMutationFn = Apollo.MutationFunction<LeaveReviewMutation, LeaveReviewMutationVariables>;

/**
 * __useLeaveReviewMutation__
 *
 * To run a mutation, you first call `useLeaveReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveReviewMutation, { data, loading, error }] = useLeaveReviewMutation({
 *   variables: {
 *      houseId: // value for 'houseId'
 *      mark: // value for 'mark'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useLeaveReviewMutation(baseOptions?: Apollo.MutationHookOptions<LeaveReviewMutation, LeaveReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveReviewMutation, LeaveReviewMutationVariables>(LeaveReviewDocument, options);
      }
export type LeaveReviewMutationHookResult = ReturnType<typeof useLeaveReviewMutation>;
export type LeaveReviewMutationResult = Apollo.MutationResult<LeaveReviewMutation>;
export type LeaveReviewMutationOptions = Apollo.BaseMutationOptions<LeaveReviewMutation, LeaveReviewMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: ImportantUserFields!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateHouseDocument = gql`
    mutation UpdateHouse($id: Int!, $title: String!, $description: String!) {
  updateHouse(id: $id, title: $title, description: $description) {
    id
    title
  }
}
    `;
export type UpdateHouseMutationFn = Apollo.MutationFunction<UpdateHouseMutation, UpdateHouseMutationVariables>;

/**
 * __useUpdateHouseMutation__
 *
 * To run a mutation, you first call `useUpdateHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHouseMutation, { data, loading, error }] = useUpdateHouseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateHouseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHouseMutation, UpdateHouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHouseMutation, UpdateHouseMutationVariables>(UpdateHouseDocument, options);
      }
export type UpdateHouseMutationHookResult = ReturnType<typeof useUpdateHouseMutation>;
export type UpdateHouseMutationResult = Apollo.MutationResult<UpdateHouseMutation>;
export type UpdateHouseMutationOptions = Apollo.BaseMutationOptions<UpdateHouseMutation, UpdateHouseMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($phone: String!, $description: String!, $secondName: String!, $firstName: String!) {
  updateUser(
    phone: $phone
    description: $description
    secondName: $secondName
    firstName: $firstName
  ) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *      description: // value for 'description'
 *      secondName: // value for 'secondName'
 *      firstName: // value for 'firstName'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DefaultAmenitiesDocument = gql`
    query DefaultAmenities {
  defaultAmenities {
    id
    name
    description
  }
}
    `;

/**
 * __useDefaultAmenitiesQuery__
 *
 * To run a query within a React component, call `useDefaultAmenitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDefaultAmenitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefaultAmenitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDefaultAmenitiesQuery(baseOptions?: Apollo.QueryHookOptions<DefaultAmenitiesQuery, DefaultAmenitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DefaultAmenitiesQuery, DefaultAmenitiesQueryVariables>(DefaultAmenitiesDocument, options);
      }
export function useDefaultAmenitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DefaultAmenitiesQuery, DefaultAmenitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DefaultAmenitiesQuery, DefaultAmenitiesQueryVariables>(DefaultAmenitiesDocument, options);
        }
export type DefaultAmenitiesQueryHookResult = ReturnType<typeof useDefaultAmenitiesQuery>;
export type DefaultAmenitiesLazyQueryHookResult = ReturnType<typeof useDefaultAmenitiesLazyQuery>;
export type DefaultAmenitiesQueryResult = Apollo.QueryResult<DefaultAmenitiesQuery, DefaultAmenitiesQueryVariables>;
export const DefaultHouseTypesDocument = gql`
    query DefaultHouseTypes {
  defaultHouseTypes {
    id
    name
    description
  }
}
    `;

/**
 * __useDefaultHouseTypesQuery__
 *
 * To run a query within a React component, call `useDefaultHouseTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDefaultHouseTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefaultHouseTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDefaultHouseTypesQuery(baseOptions?: Apollo.QueryHookOptions<DefaultHouseTypesQuery, DefaultHouseTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DefaultHouseTypesQuery, DefaultHouseTypesQueryVariables>(DefaultHouseTypesDocument, options);
      }
export function useDefaultHouseTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DefaultHouseTypesQuery, DefaultHouseTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DefaultHouseTypesQuery, DefaultHouseTypesQueryVariables>(DefaultHouseTypesDocument, options);
        }
export type DefaultHouseTypesQueryHookResult = ReturnType<typeof useDefaultHouseTypesQuery>;
export type DefaultHouseTypesLazyQueryHookResult = ReturnType<typeof useDefaultHouseTypesLazyQuery>;
export type DefaultHouseTypesQueryResult = Apollo.QueryResult<DefaultHouseTypesQuery, DefaultHouseTypesQueryVariables>;
export const DefaultRoomTypesDocument = gql`
    query DefaultRoomTypes {
  defaultRoomTypes {
    id
    name
    description
  }
}
    `;

/**
 * __useDefaultRoomTypesQuery__
 *
 * To run a query within a React component, call `useDefaultRoomTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDefaultRoomTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefaultRoomTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDefaultRoomTypesQuery(baseOptions?: Apollo.QueryHookOptions<DefaultRoomTypesQuery, DefaultRoomTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DefaultRoomTypesQuery, DefaultRoomTypesQueryVariables>(DefaultRoomTypesDocument, options);
      }
export function useDefaultRoomTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DefaultRoomTypesQuery, DefaultRoomTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DefaultRoomTypesQuery, DefaultRoomTypesQueryVariables>(DefaultRoomTypesDocument, options);
        }
export type DefaultRoomTypesQueryHookResult = ReturnType<typeof useDefaultRoomTypesQuery>;
export type DefaultRoomTypesLazyQueryHookResult = ReturnType<typeof useDefaultRoomTypesLazyQuery>;
export type DefaultRoomTypesQueryResult = Apollo.QueryResult<DefaultRoomTypesQuery, DefaultRoomTypesQueryVariables>;
export const DefaultRulesDocument = gql`
    query DefaultRules {
  defaultRules {
    id
    name
    description
  }
}
    `;

/**
 * __useDefaultRulesQuery__
 *
 * To run a query within a React component, call `useDefaultRulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDefaultRulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefaultRulesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDefaultRulesQuery(baseOptions?: Apollo.QueryHookOptions<DefaultRulesQuery, DefaultRulesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DefaultRulesQuery, DefaultRulesQueryVariables>(DefaultRulesDocument, options);
      }
export function useDefaultRulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DefaultRulesQuery, DefaultRulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DefaultRulesQuery, DefaultRulesQueryVariables>(DefaultRulesDocument, options);
        }
export type DefaultRulesQueryHookResult = ReturnType<typeof useDefaultRulesQuery>;
export type DefaultRulesLazyQueryHookResult = ReturnType<typeof useDefaultRulesLazyQuery>;
export type DefaultRulesQueryResult = Apollo.QueryResult<DefaultRulesQuery, DefaultRulesQueryVariables>;
export const GetAdminBookingsDocument = gql`
    query GetAdminBookings($finished: Boolean) {
  getAdminBookings(finished: $finished) {
    id
    endDate
    startDate
    guests_count
    status
    userId
    houseId
    createdAt
    updatedAt
    user {
      username
      id
    }
    house {
      user {
        id
        username
        phone
        firstName
        secondName
      }
      id
      pictureUrl
      title
      country
      street
      state
      apartment
      price
      city
    }
  }
}
    `;

/**
 * __useGetAdminBookingsQuery__
 *
 * To run a query within a React component, call `useGetAdminBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminBookingsQuery({
 *   variables: {
 *      finished: // value for 'finished'
 *   },
 * });
 */
export function useGetAdminBookingsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminBookingsQuery, GetAdminBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminBookingsQuery, GetAdminBookingsQueryVariables>(GetAdminBookingsDocument, options);
      }
export function useGetAdminBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminBookingsQuery, GetAdminBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminBookingsQuery, GetAdminBookingsQueryVariables>(GetAdminBookingsDocument, options);
        }
export type GetAdminBookingsQueryHookResult = ReturnType<typeof useGetAdminBookingsQuery>;
export type GetAdminBookingsLazyQueryHookResult = ReturnType<typeof useGetAdminBookingsLazyQuery>;
export type GetAdminBookingsQueryResult = Apollo.QueryResult<GetAdminBookingsQuery, GetAdminBookingsQueryVariables>;
export const GetBookingsDocument = gql`
    query GetBookings($houseId: Int!) {
  getBookings(houseId: $houseId)
}
    `;

/**
 * __useGetBookingsQuery__
 *
 * To run a query within a React component, call `useGetBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingsQuery({
 *   variables: {
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useGetBookingsQuery(baseOptions: Apollo.QueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingsQuery, GetBookingsQueryVariables>(GetBookingsDocument, options);
      }
export function useGetBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingsQuery, GetBookingsQueryVariables>(GetBookingsDocument, options);
        }
export type GetBookingsQueryHookResult = ReturnType<typeof useGetBookingsQuery>;
export type GetBookingsLazyQueryHookResult = ReturnType<typeof useGetBookingsLazyQuery>;
export type GetBookingsQueryResult = Apollo.QueryResult<GetBookingsQuery, GetBookingsQueryVariables>;
export const GetCustomerBookingsDocument = gql`
    query GetCustomerBookings($finished: Boolean) {
  getCustomerBookings(finished: $finished) {
    id
    endDate
    startDate
    guests_count
    status
    userId
    houseId
    createdAt
    updatedAt
    user {
      username
    }
    house {
      user {
        id
        username
        phone
        firstName
        secondName
      }
      id
      pictureUrl
      title
      country
      street
      state
      apartment
      price
      city
    }
  }
}
    `;

/**
 * __useGetCustomerBookingsQuery__
 *
 * To run a query within a React component, call `useGetCustomerBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerBookingsQuery({
 *   variables: {
 *      finished: // value for 'finished'
 *   },
 * });
 */
export function useGetCustomerBookingsQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>(GetCustomerBookingsDocument, options);
      }
export function useGetCustomerBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>(GetCustomerBookingsDocument, options);
        }
export type GetCustomerBookingsQueryHookResult = ReturnType<typeof useGetCustomerBookingsQuery>;
export type GetCustomerBookingsLazyQueryHookResult = ReturnType<typeof useGetCustomerBookingsLazyQuery>;
export type GetCustomerBookingsQueryResult = Apollo.QueryResult<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>;
export const HouseDocument = gql`
    query House($id: Int!) {
  house(id: $id) {
    title
    description
    country
    street
    city
    state
    apartment
    zip
    bed_count
    bedroom_count
    bathroom_count
    guests_count
    booking_can_advance_checker
    booking_can_advance_time
    price
    booking_min
    booking_max
    amenities
    rules
    safety_amenities
    disability
    avalible_dates
    address
    longitude
    latitude
    house_typeId
    room_typeId
    booking_before
    availability_arrivals_start
    availability_arrivals_end
    pictureUrl
    createdAt
    updatedAt
    id
    userId
    rating
    reviewCount
    safety_amenities
    user {
      id
      username
    }
    room_type {
      id
      name
    }
    house_type {
      id
      name
    }
  }
}
    `;

/**
 * __useHouseQuery__
 *
 * To run a query within a React component, call `useHouseQuery` and pass it any options that fit your needs.
 * When your component renders, `useHouseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHouseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHouseQuery(baseOptions: Apollo.QueryHookOptions<HouseQuery, HouseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HouseQuery, HouseQueryVariables>(HouseDocument, options);
      }
export function useHouseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HouseQuery, HouseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HouseQuery, HouseQueryVariables>(HouseDocument, options);
        }
export type HouseQueryHookResult = ReturnType<typeof useHouseQuery>;
export type HouseLazyQueryHookResult = ReturnType<typeof useHouseLazyQuery>;
export type HouseQueryResult = Apollo.QueryResult<HouseQuery, HouseQueryVariables>;
export const HousesDocument = gql`
    query Houses($limit: Int!, $cursor: String, $housesById: Boolean) {
  houses(limit: $limit, cursor: $cursor, housesById: $housesById) {
    hasMore
    houses {
      id
      title
      createdAt
      updatedAt
      rating
      price
      bed_count
      bedroom_count
      bathroom_count
      reviewCount
      pictureUrl
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useHousesQuery__
 *
 * To run a query within a React component, call `useHousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHousesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      housesById: // value for 'housesById'
 *   },
 * });
 */
export function useHousesQuery(baseOptions: Apollo.QueryHookOptions<HousesQuery, HousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HousesQuery, HousesQueryVariables>(HousesDocument, options);
      }
export function useHousesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HousesQuery, HousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HousesQuery, HousesQueryVariables>(HousesDocument, options);
        }
export type HousesQueryHookResult = ReturnType<typeof useHousesQuery>;
export type HousesLazyQueryHookResult = ReturnType<typeof useHousesLazyQuery>;
export type HousesQueryResult = Apollo.QueryResult<HousesQuery, HousesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ReviewsDocument = gql`
    query Reviews($houseId: Int!) {
  reviews(houseId: $houseId) {
    houseId
    userId
    mark
    text
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useReviewsQuery(baseOptions: Apollo.QueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
      }
export function useReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, options);
        }
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsQueryResult = Apollo.QueryResult<ReviewsQuery, ReviewsQueryVariables>;
export const SafetyAmenitiesDocument = gql`
    query SafetyAmenities {
  safetyAmenities {
    id
    name
    description
  }
}
    `;

/**
 * __useSafetyAmenitiesQuery__
 *
 * To run a query within a React component, call `useSafetyAmenitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSafetyAmenitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSafetyAmenitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSafetyAmenitiesQuery(baseOptions?: Apollo.QueryHookOptions<SafetyAmenitiesQuery, SafetyAmenitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SafetyAmenitiesQuery, SafetyAmenitiesQueryVariables>(SafetyAmenitiesDocument, options);
      }
export function useSafetyAmenitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SafetyAmenitiesQuery, SafetyAmenitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SafetyAmenitiesQuery, SafetyAmenitiesQueryVariables>(SafetyAmenitiesDocument, options);
        }
export type SafetyAmenitiesQueryHookResult = ReturnType<typeof useSafetyAmenitiesQuery>;
export type SafetyAmenitiesLazyQueryHookResult = ReturnType<typeof useSafetyAmenitiesLazyQuery>;
export type SafetyAmenitiesQueryResult = Apollo.QueryResult<SafetyAmenitiesQuery, SafetyAmenitiesQueryVariables>;
export const SearchListingsDocument = gql`
    query SearchListings($input: SearchInput!) {
  searchListings(input: $input) {
    title
    description
    country
    street
    city
    state
    apartment
    zip
    bed_count
    bedroom_count
    bathroom_count
    guests_count
    booking_can_advance_checker
    booking_can_advance_time
    price
    booking_min
    booking_max
    amenities
    rules
    safety_amenities
    disability
    avalible_dates
    address
    longitude
    latitude
    house_typeId
    room_typeId
    booking_before
    availability_arrivals_start
    availability_arrivals_end
    pictureUrl
    createdAt
    updatedAt
    id
    userId
    rating
    reviewCount
  }
}
    `;

/**
 * __useSearchListingsQuery__
 *
 * To run a query within a React component, call `useSearchListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchListingsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchListingsQuery(baseOptions: Apollo.QueryHookOptions<SearchListingsQuery, SearchListingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchListingsQuery, SearchListingsQueryVariables>(SearchListingsDocument, options);
      }
export function useSearchListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchListingsQuery, SearchListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchListingsQuery, SearchListingsQueryVariables>(SearchListingsDocument, options);
        }
export type SearchListingsQueryHookResult = ReturnType<typeof useSearchListingsQuery>;
export type SearchListingsLazyQueryHookResult = ReturnType<typeof useSearchListingsLazyQuery>;
export type SearchListingsQueryResult = Apollo.QueryResult<SearchListingsQuery, SearchListingsQueryVariables>;