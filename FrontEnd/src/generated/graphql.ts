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
  /** Populate the database */
  fillCursos?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillDebugUsers?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillMallas?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillProfes?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillRoles?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillSeccion?: Maybe<Scalars['Boolean']>;
  /** Updates an user based on email */
  updateUserByEmail?: Maybe<UserSchema>;
};


/** Mutation root */
export type MutationUpdateUserByEmailArgs = {
  id?: Maybe<Scalars['String']>;
  usr?: Maybe<UserSchemaInput>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  /** Brings a user */
  getUser?: Maybe<UserSchema>;
};

export enum RolEnum {
  Alumno = 'ALUMNO',
  Calidad = 'CALIDAD',
  Profesor = 'PROFESOR'
}

export type UserSchema = {
  __typename?: 'UserSchema';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rol?: Maybe<RolEnum>;
  status?: Maybe<Scalars['Int']>;
};

export type UserSchemaInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rol?: Maybe<RolEnum>;
  status?: Maybe<Scalars['Int']>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'UserSchema', email?: string | null | undefined, name?: string | null | undefined, rol?: RolEnum | null | undefined, status?: number | null | undefined } | null | undefined };

export const GetUserDocument = gql`
    query GetUser {
  getUser {
    email
    name
    rol
    status
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