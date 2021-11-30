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

export type Alumno = {
  __typename?: 'Alumno';
  codigo?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  rubricas?: Maybe<Array<Maybe<RubricaUsuario>>>;
};

export type AlumnoInput = {
  codigo?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  rubricas?: Maybe<Array<Maybe<RubricaUsuarioInput>>>;
};

export type AlumnoSchema = {
  __typename?: 'AlumnoSchema';
  codigo?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
};

export type CalidadEducativa = {
  __typename?: 'CalidadEducativa';
  codigo?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  rubricas?: Maybe<Array<Maybe<Rubrica>>>;
};

export type CalidadEducativaInput = {
  codigo?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  rubricas?: Maybe<Array<Maybe<RubricaInput>>>;
};

export type Calificacion = {
  __typename?: 'Calificacion';
  dimension?: Maybe<Dimension>;
  id?: Maybe<Scalars['String']>;
  nota?: Maybe<Scalars['Int']>;
  titulo?: Maybe<Scalars['String']>;
};

export type CalificacionInput = {
  dimension?: Maybe<DimensionInput>;
  id?: Maybe<Scalars['String']>;
  nota?: Maybe<Scalars['Int']>;
  titulo?: Maybe<Scalars['String']>;
};

export type Carrera = {
  __typename?: 'Carrera';
  cursos?: Maybe<Array<Maybe<Curso>>>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
};

export type CarreraInput = {
  cursos?: Maybe<Array<Maybe<CursoInput>>>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
};

export type Curso = {
  __typename?: 'Curso';
  carrera?: Maybe<Carrera>;
  codigo?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  rubricas?: Maybe<Array<Maybe<Rubrica>>>;
  secciones?: Maybe<Array<Maybe<Seccion>>>;
};

export type CursoInput = {
  carrera?: Maybe<CarreraInput>;
  codigo?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  rubricas?: Maybe<Array<Maybe<RubricaInput>>>;
  secciones?: Maybe<Array<Maybe<SeccionInput>>>;
};

export type Dimension = {
  __typename?: 'Dimension';
  calficaciones?: Maybe<Array<Maybe<Calificacion>>>;
  descripcion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  rubrica?: Maybe<Rubrica>;
};

export type DimensionInput = {
  calficaciones?: Maybe<Array<Maybe<CalificacionInput>>>;
  descripcion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  rubrica?: Maybe<RubricaInput>;
};

export type DimensionUsuario = {
  __typename?: 'DimensionUsuario';
  calificacion?: Maybe<Calificacion>;
  descripcion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  rubricaUsuario?: Maybe<RubricaUsuario>;
  username?: Maybe<Scalars['String']>;
};

export type DimensionUsuarioInput = {
  calificacion?: Maybe<CalificacionInput>;
  descripcion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  rubricaUsuario?: Maybe<RubricaUsuarioInput>;
  username?: Maybe<Scalars['String']>;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  /** Elimina una relacion profesor-seccion basandose en la llave primaria */
  delete_profesor_seccion_one?: Maybe<Profesor>;
  /** Inserta un usuario de tipo calidad educativa */
  insert_calidad_educativa_one?: Maybe<CalidadEducativa>;
  /** Inserta una calificacion */
  insert_calificacion_one?: Maybe<Calificacion>;
  /** Inserta una carrera */
  insert_carrera_one?: Maybe<Carrera>;
  /** Inserta un curso */
  insert_curso_one?: Maybe<Curso>;
  /** Inserta una dimension */
  insert_dimension_one?: Maybe<Dimension>;
  /** Inserta un profesor */
  insert_profesor_one?: Maybe<Profesor>;
  /** Inserta un profesorSeccion */
  insert_profesor_seccion_one?: Maybe<Profesor>;
  /** Inserta una rubrica */
  insert_rubrica_one?: Maybe<Rubrica>;
  /** Inserta una seccion */
  insert_seccion_one?: Maybe<Seccion>;
  /** Actualiza un usuario de calidad educativa basandose en la llave primaria */
  update_calidad_educativa_by_pk?: Maybe<CalidadEducativa>;
  /** Actualiza una calificacion basandose en la llave primaria */
  update_calificacion_by_pk?: Maybe<Calificacion>;
  /** Actualiza una carrera basandose en la llave primaria */
  update_carrera_by_pk?: Maybe<Carrera>;
  /** Actualiza un curso basandose en la llave primaria */
  update_curso_by_pk?: Maybe<Curso>;
  /** Actualiza una dimension basandose en la llave primaria */
  update_dimension_by_pk?: Maybe<Dimension>;
  /** Actualiza un profesor basandose en la llave primaria */
  update_profesor_by_pk?: Maybe<Profesor>;
  /** Actualiza una rubrica basandose en la llave primaria */
  update_rubrica_by_pk?: Maybe<Rubrica>;
  /** Actualiza una seccion basandose en la llave primaria */
  update_seccion_by_pk?: Maybe<Seccion>;
};


/** Mutation root */
export type MutationDelete_Profesor_Seccion_OneArgs = {
  profesorSeccion?: Maybe<ProfesorSeccionSchemaInput>;
};


/** Mutation root */
export type MutationInsert_Calidad_Educativa_OneArgs = {
  calidadEducativa?: Maybe<CalidadEducativaInput>;
};


/** Mutation root */
export type MutationInsert_Calificacion_OneArgs = {
  calificacion?: Maybe<CalificacionInput>;
  dimensionId?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationInsert_Carrera_OneArgs = {
  carrera?: Maybe<CarreraInput>;
};


/** Mutation root */
export type MutationInsert_Curso_OneArgs = {
  carreraId?: Maybe<Scalars['String']>;
  curso?: Maybe<CursoInput>;
};


/** Mutation root */
export type MutationInsert_Dimension_OneArgs = {
  dimension?: Maybe<DimensionInput>;
  rubricaId?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationInsert_Profesor_OneArgs = {
  profesor?: Maybe<ProfesorInput>;
};


/** Mutation root */
export type MutationInsert_Profesor_Seccion_OneArgs = {
  profesorSeccion?: Maybe<ProfesorSeccionSchemaInput>;
};


/** Mutation root */
export type MutationInsert_Rubrica_OneArgs = {
  cursoId?: Maybe<Scalars['String']>;
  rubrica?: Maybe<RubricaInput>;
};


/** Mutation root */
export type MutationInsert_Seccion_OneArgs = {
  cursoId?: Maybe<Scalars['String']>;
  seccion?: Maybe<SeccionInput>;
};


/** Mutation root */
export type MutationUpdate_Calidad_Educativa_By_PkArgs = {
  calidadEducativa?: Maybe<CalidadEducativaInput>;
  id?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationUpdate_Calificacion_By_PkArgs = {
  calificacion?: Maybe<CalificacionInput>;
  id?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationUpdate_Carrera_By_PkArgs = {
  carrera?: Maybe<CarreraInput>;
  id?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationUpdate_Curso_By_PkArgs = {
  curso?: Maybe<CursoInput>;
  id?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationUpdate_Dimension_By_PkArgs = {
  dimension?: Maybe<DimensionInput>;
  id?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationUpdate_Profesor_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
  profesor?: Maybe<ProfesorInput>;
};


/** Mutation root */
export type MutationUpdate_Rubrica_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
  rubrica?: Maybe<RubricaInput>;
};


/** Mutation root */
export type MutationUpdate_Seccion_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
  seccion?: Maybe<SeccionInput>;
};

export type Profesor = {
  __typename?: 'Profesor';
  codigo?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  secciones?: Maybe<Array<Maybe<Seccion>>>;
};

export type ProfesorInput = {
  codigo?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  secciones?: Maybe<Array<Maybe<SeccionInput>>>;
};

export type ProfesorSeccionSchemaInput = {
  profesorId?: Maybe<Scalars['String']>;
  seccionId?: Maybe<Scalars['String']>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  /** Trae todos los usuarios de tipo calidad educativa */
  calidad_educativa?: Maybe<Array<Maybe<CalidadEducativa>>>;
  /** Trae un usuario de tipo calidad educativa basado en la llave primaria */
  calidad_educativa_by_pk?: Maybe<CalidadEducativa>;
  /** Trae todas las calificaciones */
  calificacion?: Maybe<Array<Maybe<Calificacion>>>;
  /** Trae una calificacion basada en la llave primaria */
  calificacion_by_pk?: Maybe<Calificacion>;
  /** Trae todas las carreras */
  carrera?: Maybe<Array<Maybe<Carrera>>>;
  /** Trae una carrera basado en la llave primaria */
  carrera_by_pk?: Maybe<Carrera>;
  /** Trae todos los cursos */
  curso?: Maybe<Array<Maybe<Curso>>>;
  /** Trae un curso basado en la llave primaria */
  curso_by_pk?: Maybe<Curso>;
  /** Trae todas las dimensiones */
  dimension?: Maybe<Array<Maybe<Dimension>>>;
  /** Trae una dimension basada en la llave primaria */
  dimension_by_pk?: Maybe<Dimension>;
  /** Brings a alumno */
  getAlumno?: Maybe<AlumnoSchema>;
  /** Brings a user */
  getUser?: Maybe<UserSchema>;
  /** Trae todos los profesores */
  profesor?: Maybe<Array<Maybe<Profesor>>>;
  /** Trae un profesor basado en la llave primaria */
  profesor_by_pk?: Maybe<Profesor>;
  /** Trae todas las rubricas */
  rubrica?: Maybe<Array<Maybe<Rubrica>>>;
  /** Trae una rubrica basada en la llave primaria */
  rubrica_by_pk?: Maybe<Rubrica>;
  /** Trae todas las secciones */
  seccion?: Maybe<Array<Maybe<Seccion>>>;
  /** Trae una seccion basada en la llave primaria */
  seccion_by_pk?: Maybe<Seccion>;
};


/** Query root */
export type QueryCalidad_Educativa_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryCalificacion_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryCarrera_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryCurso_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryDimension_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryProfesor_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryRubrica_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
};


/** Query root */
export type QuerySeccion_By_PkArgs = {
  id?: Maybe<Scalars['String']>;
};

export enum RolEnum {
  Alumno = 'ALUMNO',
  Calidad = 'CALIDAD',
  Profesor = 'PROFESOR'
}

export type Rubrica = {
  __typename?: 'Rubrica';
  actividadBase?: Maybe<Scalars['String']>;
  calidadEducativa?: Maybe<CalidadEducativa>;
  ciclo?: Maybe<Scalars['String']>;
  codigo?: Maybe<Scalars['String']>;
  criterioDeDesempenho?: Maybe<Scalars['String']>;
  curso?: Maybe<Curso>;
  dimensiones?: Maybe<Array<Maybe<Dimension>>>;
  evidencia?: Maybe<Scalars['String']>;
  fecha?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nivel?: Maybe<Scalars['Int']>;
  numCritDesemp?: Maybe<Scalars['String']>;
  semana?: Maybe<Scalars['String']>;
  semestre?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  tipo?: Maybe<Scalars['String']>;
};

export type RubricaInput = {
  actividadBase?: Maybe<Scalars['String']>;
  calidadEducativa?: Maybe<CalidadEducativaInput>;
  ciclo?: Maybe<Scalars['String']>;
  codigo?: Maybe<Scalars['String']>;
  criterioDeDesempenho?: Maybe<Scalars['String']>;
  curso?: Maybe<CursoInput>;
  dimensiones?: Maybe<Array<Maybe<DimensionInput>>>;
  evidencia?: Maybe<Scalars['String']>;
  fecha?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nivel?: Maybe<Scalars['Int']>;
  numCritDesemp?: Maybe<Scalars['String']>;
  semana?: Maybe<Scalars['String']>;
  semestre?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  tipo?: Maybe<Scalars['String']>;
};

export type RubricaUsuario = {
  __typename?: 'RubricaUsuario';
  alumno?: Maybe<Alumno>;
  dimensionUsuarios?: Maybe<Array<Maybe<DimensionUsuario>>>;
  evaluacionTotal: Scalars['Float'];
  id?: Maybe<Scalars['String']>;
  rubrica?: Maybe<Rubrica>;
  seccion?: Maybe<Seccion>;
};

export type RubricaUsuarioInput = {
  alumno?: Maybe<AlumnoInput>;
  dimensionUsuarios?: Maybe<Array<Maybe<DimensionUsuarioInput>>>;
  evaluacionTotal: Scalars['Float'];
  id?: Maybe<Scalars['String']>;
  rubrica?: Maybe<RubricaInput>;
  seccion?: Maybe<SeccionInput>;
};

export type Seccion = {
  __typename?: 'Seccion';
  codigo?: Maybe<Scalars['String']>;
  curso?: Maybe<Curso>;
  id?: Maybe<Scalars['String']>;
  profesores?: Maybe<Array<Maybe<Profesor>>>;
  rubricaUsuario?: Maybe<RubricaUsuario>;
  semestre?: Maybe<Scalars['String']>;
};

export type SeccionInput = {
  codigo?: Maybe<Scalars['String']>;
  curso?: Maybe<CursoInput>;
  id?: Maybe<Scalars['String']>;
  profesores?: Maybe<Array<Maybe<ProfesorInput>>>;
  rubricaUsuario?: Maybe<RubricaUsuarioInput>;
  semestre?: Maybe<Scalars['String']>;
};

export type UserSchema = {
  __typename?: 'UserSchema';
  codigo?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  tipo?: Maybe<RolEnum>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'UserSchema', codigo?: string | null | undefined, correo?: string | null | undefined, nombre?: string | null | undefined, tipo?: RolEnum | null | undefined } | null | undefined };

export type GetProfesorQueryVariables = Exact<{
  ID?: Maybe<Scalars['String']>;
}>;


export type GetProfesorQuery = { __typename?: 'Query', profesor_by_pk?: { __typename?: 'Profesor', id?: string | null | undefined, nombre?: string | null | undefined, secciones?: Array<{ __typename?: 'Seccion', codigo?: string | null | undefined, curso?: { __typename?: 'Curso', codigo?: string | null | undefined, nombre?: string | null | undefined, secciones?: Array<{ __typename?: 'Seccion', codigo?: string | null | undefined } | null | undefined> | null | undefined, rubricas?: Array<{ __typename?: 'Rubrica', actividadBase?: string | null | undefined, ciclo?: string | null | undefined, codigo?: string | null | undefined, criterioDeDesempenho?: string | null | undefined, numCritDesemp?: string | null | undefined, evidencia?: string | null | undefined, fecha?: string | null | undefined, semana?: string | null | undefined, semestre?: string | null | undefined, status?: boolean | null | undefined, tipo?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export const GetUserDocument = gql`
    query GetUser {
  getUser {
    codigo
    correo
    nombre
    tipo
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
export const GetProfesorDocument = gql`
    query GetProfesor($ID: String) {
  profesor_by_pk(id: $ID) {
    id
    nombre
    secciones {
      codigo
      curso {
        codigo
        nombre
        secciones {
          codigo
        }
        rubricas {
          actividadBase
          ciclo
          codigo
          criterioDeDesempenho
          numCritDesemp
          evidencia
          fecha
          semana
          semestre
          status
          tipo
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProfesorGQL extends Apollo.Query<GetProfesorQuery, GetProfesorQueryVariables> {
    document = GetProfesorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }