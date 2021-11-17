import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  /** Updates an user based on email */
  updateUserByEmail?: Maybe<User>;
};


/** Mutation root */
export type MutationUpdateUserByEmailArgs = {
  id?: Maybe<Scalars['String']>;
  usr?: Maybe<UserInput>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  /** Brings a user */
  getUser?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UserInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id?: string | null | undefined, name?: string | null | undefined } | null | undefined };

export const GetUserDocument = gql`
    query GetUser {
  getUser {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserGQL extends Apollo.Query<GetUserQuery, GetUserQueryVariables> {
    document = GetUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }