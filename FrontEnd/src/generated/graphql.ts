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
  descripcion?: Maybe<Scalars['String']>;
  dimension?: Maybe<Dimension>;
  id?: Maybe<Scalars['String']>;
  nota: Scalars['Int'];
  titulo?: Maybe<Scalars['String']>;
};

export type CalificacionInput = {
  descripcion?: Maybe<Scalars['String']>;
  dimension?: Maybe<DimensionInput>;
  id?: Maybe<Scalars['String']>;
  nota: Scalars['Int'];
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
  carreras?: Maybe<Array<Maybe<Carrera>>>;
  codigo?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  rubricas?: Maybe<Array<Maybe<Rubrica>>>;
  secciones?: Maybe<Array<Maybe<Seccion>>>;
};

export type CursoInput = {
  carreras?: Maybe<Array<Maybe<CarreraInput>>>;
  codigo?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  rubricas?: Maybe<Array<Maybe<RubricaInput>>>;
  secciones?: Maybe<Array<Maybe<SeccionInput>>>;
};

export type Dimension = {
  __typename?: 'Dimension';
  calificaciones?: Maybe<Array<Maybe<Calificacion>>>;
  descripcion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  rubrica?: Maybe<Rubrica>;
};

export type DimensionInput = {
  calificaciones?: Maybe<Array<Maybe<CalificacionInput>>>;
  descripcion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  rubrica?: Maybe<RubricaInput>;
};

export type DimensionSchemaInput = {
  calficaciones?: Maybe<Array<Maybe<CalificacionInput>>>;
  descripcion?: Maybe<Scalars['String']>;
};

export type DimensionUsuario = {
  __typename?: 'DimensionUsuario';
  calificacion?: Maybe<Calificacion>;
  descripcion?: Maybe<Scalars['String']>;
  dimension?: Maybe<Dimension>;
  id?: Maybe<Scalars['String']>;
  nota?: Maybe<Scalars['Float']>;
  rubricaUsuario?: Maybe<RubricaUsuario>;
};

export type DimensionUsuarioInput = {
  calificacion?: Maybe<CalificacionInput>;
  descripcion?: Maybe<Scalars['String']>;
  dimension?: Maybe<DimensionInput>;
  id?: Maybe<Scalars['String']>;
  nota?: Maybe<Scalars['Float']>;
  rubricaUsuario?: Maybe<RubricaUsuarioInput>;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  /** Mutacion para calificar a un alumno */
  calificar_alumno?: Maybe<DimensionUsuario>;
  /** Elimina una relacion profesor-seccion basandose en la llave primaria */
  delete_profesor_seccion_one?: Maybe<Profesor>;
  /** Actualiza una rubrica basandose en la llave primaria */
  evaluate_rubrica_by_pk?: Maybe<Rubrica>;
  /** Populate the database */
  fillAlumnos?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillCalidad?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillCarreras?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillCursos?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillDebugUsers?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillProfes?: Maybe<Scalars['Boolean']>;
  /** Populate the database */
  fillSeccion?: Maybe<Scalars['Boolean']>;
  /** Inserta un alumno */
  insert_alumno_one?: Maybe<Alumno>;
  /** Inserta un usuario de tipo calidad educativa */
  insert_calidad_educativa_one?: Maybe<CalidadEducativa>;
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
  /** Inserta un valor de tipo rubrica usuario */
  insert_rubrica_usuario_one?: Maybe<RubricaUsuario>;
  /** Inserta una seccion */
  insert_seccion_one?: Maybe<Seccion>;
  /** Actualiza un alumno basandose en la llave primaria */
  update_alumno_by_pk?: Maybe<Alumno>;
  /** Actualiza un usuario de calidad educativa basandose en la llave primaria */
  update_calidad_educativa_by_pk?: Maybe<CalidadEducativa>;
  /** Actualiza una carrera basandose en la llave primaria */
  update_carrera_by_pk?: Maybe<Carrera>;
  /** Actualiza un curso basandose en la llave primaria */
  update_curso_by_pk?: Maybe<Curso>;
  /** Actualiza una dimension basandose en la llave primaria */
  update_dimension_by_pk?: Maybe<Dimension>;
  /** Actualiza una calificacion de una dimension */
  update_dimensioncalificacion_by_pk?: Maybe<Dimension>;
  /** Actualiza un profesor basandose en la llave primaria */
  update_profesor_by_pk?: Maybe<Profesor>;
  /** Actualiza una rubrica basandose en la llave primaria */
  update_rubrica_by_pk: Scalars['Boolean'];
  /** Inserta una dimension de la rubrica */
  update_rubrica_dimension_by_pk?: Maybe<Dimension>;
  /** Actualiza una seccion basandose en la llave primaria */
  update_seccion_by_pk?: Maybe<Seccion>;
};


/** Mutation root */
export type MutationCalificar_AlumnoArgs = {
  calificacion_id: Scalars['String'];
  descripcion?: Maybe<Scalars['String']>;
  nota: Scalars['Float'];
  rubrica_usuario_id: Scalars['String'];
};


/** Mutation root */
export type MutationDelete_Profesor_Seccion_OneArgs = {
  profesorSeccion: ProfesorSeccionSchemaInput;
};


/** Mutation root */
export type MutationEvaluate_Rubrica_By_PkArgs = {
  calidadEducativaId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
};


/** Mutation root */
export type MutationFillAlumnosArgs = {
  end: Scalars['Int'];
  start: Scalars['Int'];
};


/** Mutation root */
export type MutationInsert_Alumno_OneArgs = {
  alumno: AlumnoInput;
};


/** Mutation root */
export type MutationInsert_Calidad_Educativa_OneArgs = {
  calidadEducativa: CalidadEducativaInput;
};


/** Mutation root */
export type MutationInsert_Carrera_OneArgs = {
  carrera: CarreraInput;
};


/** Mutation root */
export type MutationInsert_Curso_OneArgs = {
  carreraId: Scalars['String'];
  curso: CursoInput;
};


/** Mutation root */
export type MutationInsert_Dimension_OneArgs = {
  dimension: DimensionInput;
};


/** Mutation root */
export type MutationInsert_Profesor_OneArgs = {
  profesor: ProfesorInput;
};


/** Mutation root */
export type MutationInsert_Profesor_Seccion_OneArgs = {
  profesorSeccion: ProfesorSeccionSchemaInput;
};


/** Mutation root */
export type MutationInsert_Rubrica_OneArgs = {
  cursoId: Scalars['String'];
  rubrica: RubricaInput;
};


/** Mutation root */
export type MutationInsert_Rubrica_Usuario_OneArgs = {
  alumnoId?: Maybe<Scalars['String']>;
  rubricaId?: Maybe<Scalars['String']>;
  rubricaUsuario: RubricaUsuarioInput;
  seccionId?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationInsert_Seccion_OneArgs = {
  cursoId: Scalars['String'];
  seccion: SeccionInput;
};


/** Mutation root */
export type MutationUpdate_Alumno_By_PkArgs = {
  alumno: AlumnoInput;
  id: Scalars['String'];
};


/** Mutation root */
export type MutationUpdate_Calidad_Educativa_By_PkArgs = {
  calidadEducativa: CalidadEducativaInput;
  id: Scalars['String'];
};


/** Mutation root */
export type MutationUpdate_Carrera_By_PkArgs = {
  carrera: CarreraInput;
  id: Scalars['String'];
};


/** Mutation root */
export type MutationUpdate_Curso_By_PkArgs = {
  curso: CursoInput;
  id: Scalars['String'];
};


/** Mutation root */
export type MutationUpdate_Dimension_By_PkArgs = {
  dimension: DimensionInput;
  id: Scalars['String'];
};


/** Mutation root */
export type MutationUpdate_Dimensioncalificacion_By_PkArgs = {
  descripcion?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  nota: Scalars['Int'];
  option: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationUpdate_Profesor_By_PkArgs = {
  id: Scalars['String'];
  profesor: ProfesorInput;
};


/** Mutation root */
export type MutationUpdate_Rubrica_By_PkArgs = {
  id: Scalars['String'];
  profesorId: Scalars['String'];
};


/** Mutation root */
export type MutationUpdate_Rubrica_Dimension_By_PkArgs = {
  dimension: DimensionSchemaInput;
  id: Scalars['String'];
};


/** Mutation root */
export type MutationUpdate_Seccion_By_PkArgs = {
  id: Scalars['String'];
  seccion: SeccionInput;
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
  /** Trae todos los alumnos */
  alumno?: Maybe<Array<Maybe<Alumno>>>;
  /** Trae un alumno basado en la llave primaria */
  alumno_by_pk?: Maybe<Alumno>;
  /** Trae todos los usuarios de tipo calidad educativa */
  calidad_educativa?: Maybe<Array<Maybe<CalidadEducativa>>>;
  /** Trae un usuario de tipo calidad educativa basado en la llave primaria */
  calidad_educativa_by_pk?: Maybe<CalidadEducativa>;
  /** Trae todas las calificaciones */
  calificacion?: Maybe<Array<Maybe<Calificacion>>>;
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
  /** Trae una dimension basado en la llave primaria */
  dimension_by_pk?: Maybe<Dimension>;
  /** Trae todas las relaciones de dimension usuario */
  dimension_usuario?: Maybe<Array<Maybe<DimensionUsuario>>>;
  /** Trae la relacion dimension usuario en base al id */
  dimension_usuario_by_pk?: Maybe<DimensionUsuario>;
  /** Trae todas las relaciones de dimension usuario */
  dimension_usuario_by_rubrica_usuario?: Maybe<Array<Maybe<DimensionUsuario>>>;
  /** Verifica si la rubrica tiene alguna dimension */
  existedimension_rubrica_by_pk: Scalars['Boolean'];
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
  /** Trae todas las relaciones de rubrica usuario */
  rubrica_usuario?: Maybe<Array<Maybe<RubricaUsuario>>>;
  /** Trae todas las relaciones de rubrica usuario */
  rubrica_usuario_by_rubrica?: Maybe<Array<Maybe<RubricaUsuario>>>;
  /** Trae todas las relaciones de rubrica usuario */
  rubrica_usuario_by_rubrica_seccion?: Maybe<Array<Maybe<RubricaUsuario>>>;
  /** Trae todas las secciones */
  seccion?: Maybe<Array<Maybe<Seccion>>>;
  /** Trae una seccion basada en la llave primaria */
  seccion_by_pk?: Maybe<Seccion>;
};


/** Query root */
export type QueryAlumno_By_PkArgs = {
  id: Scalars['String'];
};


/** Query root */
export type QueryCalidad_Educativa_By_PkArgs = {
  id: Scalars['String'];
};


/** Query root */
export type QueryCarrera_By_PkArgs = {
  id: Scalars['String'];
};


/** Query root */
export type QueryCurso_By_PkArgs = {
  id: Scalars['String'];
};


/** Query root */
export type QueryDimension_By_PkArgs = {
  id: Scalars['String'];
};


/** Query root */
export type QueryDimension_Usuario_By_PkArgs = {
  id: Scalars['String'];
};


/** Query root */
export type QueryDimension_Usuario_By_Rubrica_UsuarioArgs = {
  rubrica_usuario_id: Scalars['String'];
};


/** Query root */
export type QueryExistedimension_Rubrica_By_PkArgs = {
  id: Scalars['String'];
};


/** Query root */
export type QueryProfesor_By_PkArgs = {
  id: Scalars['String'];
};


/** Query root */
export type QueryRubrica_By_PkArgs = {
  id: Scalars['String'];
};


/** Query root */
export type QueryRubrica_Usuario_By_RubricaArgs = {
  rubricaId: Scalars['String'];
};


/** Query root */
export type QueryRubrica_Usuario_By_Rubrica_SeccionArgs = {
  rubricaId: Scalars['String'];
  seccionId: Scalars['String'];
};


/** Query root */
export type QuerySeccion_By_PkArgs = {
  id: Scalars['String'];
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
  lastUpdateProfesor?: Maybe<Profesor>;
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
  lastUpdateProfesor?: Maybe<ProfesorInput>;
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
  id?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  tipo?: Maybe<RolEnum>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'UserSchema', id?: string | null | undefined, codigo?: string | null | undefined, correo?: string | null | undefined, nombre?: string | null | undefined, tipo?: RolEnum | null | undefined } | null | undefined };

export type GetprofesorbyidQueryVariables = Exact<{
  ID: Scalars['String'];
}>;


export type GetprofesorbyidQuery = { __typename?: 'Query', profesor_by_pk?: { __typename?: 'Profesor', id?: string | null | undefined, nombre?: string | null | undefined, secciones?: Array<{ __typename?: 'Seccion', id?: string | null | undefined, codigo?: string | null | undefined, curso?: { __typename?: 'Curso', id?: string | null | undefined, codigo?: string | null | undefined, nombre?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetCursoRubricasByPkQueryVariables = Exact<{
  ID: Scalars['String'];
}>;


export type GetCursoRubricasByPkQuery = { __typename?: 'Query', curso_by_pk?: { __typename?: 'Curso', rubricas?: Array<{ __typename?: 'Rubrica', id?: string | null | undefined, criterioDeDesempenho?: string | null | undefined, status?: boolean | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetCursoByPkQueryVariables = Exact<{
  ID: Scalars['String'];
}>;


export type GetCursoByPkQuery = { __typename?: 'Query', curso_by_pk?: { __typename?: 'Curso', id?: string | null | undefined, codigo?: string | null | undefined, nombre?: string | null | undefined, secciones?: Array<{ __typename?: 'Seccion', id?: string | null | undefined, codigo?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type VerifydimensioninrubricaQueryVariables = Exact<{
  ID: Scalars['String'];
}>;


export type VerifydimensioninrubricaQuery = { __typename?: 'Query', existedimension_rubrica_by_pk: boolean };

export type GetrubricasusuarioQueryVariables = Exact<{
  ID: Scalars['String'];
}>;


export type GetrubricasusuarioQuery = { __typename?: 'Query', rubrica_usuario_by_rubrica?: Array<{ __typename?: 'RubricaUsuario', id?: string | null | undefined } | null | undefined> | null | undefined };

export type GetDimensionUsuarioByRubricaUsuarioQueryVariables = Exact<{
  ID: Scalars['String'];
}>;


export type GetDimensionUsuarioByRubricaUsuarioQuery = { __typename?: 'Query', dimension_usuario_by_rubrica_usuario?: Array<{ __typename?: 'DimensionUsuario', descripcion?: string | null | undefined } | null | undefined> | null | undefined };

export type GetrubricaQueryVariables = Exact<{
  ID: Scalars['String'];
}>;


export type GetrubricaQuery = { __typename?: 'Query', rubrica_by_pk?: { __typename?: 'Rubrica', id?: string | null | undefined, evidencia?: string | null | undefined, actividadBase?: string | null | undefined, ciclo?: string | null | undefined, codigo?: string | null | undefined, criterioDeDesempenho?: string | null | undefined, numCritDesemp?: string | null | undefined, fecha?: string | null | undefined, semana?: string | null | undefined, semestre?: string | null | undefined, status?: boolean | null | undefined, tipo?: string | null | undefined, dimensiones?: Array<{ __typename?: 'Dimension', id?: string | null | undefined, descripcion?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetdimensionbypkQueryVariables = Exact<{
  ID: Scalars['String'];
}>;


export type GetdimensionbypkQuery = { __typename?: 'Query', dimension_by_pk?: { __typename?: 'Dimension', id?: string | null | undefined, descripcion?: string | null | undefined, calificaciones?: Array<{ __typename?: 'Calificacion', id?: string | null | undefined, descripcion?: string | null | undefined, nota: number, titulo?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type RubricaUsuarioByRubricaSeccionQueryVariables = Exact<{
  ID: Scalars['String'];
  SECCIONID: Scalars['String'];
}>;


export type RubricaUsuarioByRubricaSeccionQuery = { __typename?: 'Query', rubrica_usuario_by_rubrica_seccion?: Array<{ __typename?: 'RubricaUsuario', id?: string | null | undefined, evaluacionTotal: number, alumno?: { __typename?: 'Alumno', id?: string | null | undefined, nombre?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type CalificaalumnoMutationVariables = Exact<{
  NOTA: Scalars['Float'];
  DESC?: Maybe<Scalars['String']>;
  CALIFICID: Scalars['String'];
  RUBUSERID: Scalars['String'];
}>;


export type CalificaalumnoMutation = { __typename?: 'Mutation', calificar_alumno?: { __typename?: 'DimensionUsuario', id?: string | null | undefined, descripcion?: string | null | undefined, nota?: number | null | undefined } | null | undefined };

export type UpdaterubricaMutationVariables = Exact<{
  ID: Scalars['String'];
  ProfesorId: Scalars['String'];
}>;


export type UpdaterubricaMutation = { __typename?: 'Mutation', update_rubrica_by_pk: boolean };

export type InsertdimensionrubricaMutationVariables = Exact<{
  ID: Scalars['String'];
  DIMENSION: DimensionSchemaInput;
}>;


export type InsertdimensionrubricaMutation = { __typename?: 'Mutation', update_rubrica_dimension_by_pk?: { __typename?: 'Dimension', id?: string | null | undefined, calificaciones?: Array<{ __typename?: 'Calificacion', id?: string | null | undefined, descripcion?: string | null | undefined, nota: number, titulo?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type UpdatedimensionMutationVariables = Exact<{
  ID: Scalars['String'];
  NOTA: Scalars['Int'];
  DESCRIPCION: Scalars['String'];
  TITLE: Scalars['String'];
  OPTION: Scalars['Boolean'];
}>;


export type UpdatedimensionMutation = { __typename?: 'Mutation', update_dimensioncalificacion_by_pk?: { __typename?: 'Dimension', id?: string | null | undefined } | null | undefined };

export type GetcarrerasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetcarrerasQuery = { __typename?: 'Query', carrera?: Array<{ __typename?: 'Carrera', id?: string | null | undefined, nombre?: string | null | undefined } | null | undefined> | null | undefined };

export type GetcursosbycarreraQueryVariables = Exact<{
  ID: Scalars['String'];
}>;


export type GetcursosbycarreraQuery = { __typename?: 'Query', carrera_by_pk?: { __typename?: 'Carrera', cursos?: Array<{ __typename?: 'Curso', id?: string | null | undefined, nombre?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetallcursosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetallcursosQuery = { __typename?: 'Query', curso?: Array<{ __typename?: 'Curso', id?: string | null | undefined, nombre?: string | null | undefined, rubricas?: Array<{ __typename?: 'Rubrica', id?: string | null | undefined, status?: boolean | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type VerifyMutationVariables = Exact<{
  ID: Scalars['String'];
  CALIDAD?: Maybe<Scalars['String']>;
  BOOL: Scalars['Boolean'];
}>;


export type VerifyMutation = { __typename?: 'Mutation', evaluate_rubrica_by_pk?: { __typename?: 'Rubrica', id?: string | null | undefined } | null | undefined };

export const GetUserDocument = gql`
    query GetUser {
  getUser {
    id
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
export const GetprofesorbyidDocument = gql`
    query GETPROFESORBYID($ID: String!) {
  profesor_by_pk(id: $ID) {
    id
    nombre
    secciones {
      id
      codigo
      curso {
        id
        codigo
        nombre
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetprofesorbyidGQL extends Apollo.Query<GetprofesorbyidQuery, GetprofesorbyidQueryVariables> {
    document = GetprofesorbyidDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCursoRubricasByPkDocument = gql`
    query GetCursoRubricasByPk($ID: String!) {
  curso_by_pk(id: $ID) {
    rubricas {
      id
      criterioDeDesempenho
      status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCursoRubricasByPkGQL extends Apollo.Query<GetCursoRubricasByPkQuery, GetCursoRubricasByPkQueryVariables> {
    document = GetCursoRubricasByPkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCursoByPkDocument = gql`
    query GetCursoByPk($ID: String!) {
  curso_by_pk(id: $ID) {
    id
    codigo
    nombre
    secciones {
      id
      codigo
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCursoByPkGQL extends Apollo.Query<GetCursoByPkQuery, GetCursoByPkQueryVariables> {
    document = GetCursoByPkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const VerifydimensioninrubricaDocument = gql`
    query VERIFYDIMENSIONINRUBRICA($ID: String!) {
  existedimension_rubrica_by_pk(id: $ID)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class VerifydimensioninrubricaGQL extends Apollo.Query<VerifydimensioninrubricaQuery, VerifydimensioninrubricaQueryVariables> {
    document = VerifydimensioninrubricaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetrubricasusuarioDocument = gql`
    query GETRUBRICASUSUARIO($ID: String!) {
  rubrica_usuario_by_rubrica(rubricaId: $ID) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetrubricasusuarioGQL extends Apollo.Query<GetrubricasusuarioQuery, GetrubricasusuarioQueryVariables> {
    document = GetrubricasusuarioDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetDimensionUsuarioByRubricaUsuarioDocument = gql`
    query GetDimensionUsuarioByRubricaUsuario($ID: String!) {
  dimension_usuario_by_rubrica_usuario(rubrica_usuario_id: $ID) {
    descripcion
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDimensionUsuarioByRubricaUsuarioGQL extends Apollo.Query<GetDimensionUsuarioByRubricaUsuarioQuery, GetDimensionUsuarioByRubricaUsuarioQueryVariables> {
    document = GetDimensionUsuarioByRubricaUsuarioDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetrubricaDocument = gql`
    query GETRUBRICA($ID: String!) {
  rubrica_by_pk(id: $ID) {
    id
    evidencia
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
    dimensiones {
      id
      descripcion
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetrubricaGQL extends Apollo.Query<GetrubricaQuery, GetrubricaQueryVariables> {
    document = GetrubricaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetdimensionbypkDocument = gql`
    query GETDIMENSIONBYPK($ID: String!) {
  dimension_by_pk(id: $ID) {
    id
    descripcion
    calificaciones {
      id
      descripcion
      nota
      titulo
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetdimensionbypkGQL extends Apollo.Query<GetdimensionbypkQuery, GetdimensionbypkQueryVariables> {
    document = GetdimensionbypkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RubricaUsuarioByRubricaSeccionDocument = gql`
    query rubricaUsuarioByRubricaSeccion($ID: String!, $SECCIONID: String!) {
  rubrica_usuario_by_rubrica_seccion(rubricaId: $ID, seccionId: $SECCIONID) {
    id
    evaluacionTotal
    alumno {
      id
      nombre
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RubricaUsuarioByRubricaSeccionGQL extends Apollo.Query<RubricaUsuarioByRubricaSeccionQuery, RubricaUsuarioByRubricaSeccionQueryVariables> {
    document = RubricaUsuarioByRubricaSeccionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CalificaalumnoDocument = gql`
    mutation CALIFICAALUMNO($NOTA: Float!, $DESC: String, $CALIFICID: String!, $RUBUSERID: String!) {
  calificar_alumno(
    nota: $NOTA
    descripcion: $DESC
    calificacion_id: $CALIFICID
    rubrica_usuario_id: $RUBUSERID
  ) {
    id
    descripcion
    nota
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CalificaalumnoGQL extends Apollo.Mutation<CalificaalumnoMutation, CalificaalumnoMutationVariables> {
    document = CalificaalumnoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdaterubricaDocument = gql`
    mutation UPDATERUBRICA($ID: String!, $ProfesorId: String!) {
  update_rubrica_by_pk(id: $ID, profesorId: $ProfesorId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdaterubricaGQL extends Apollo.Mutation<UpdaterubricaMutation, UpdaterubricaMutationVariables> {
    document = UpdaterubricaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const InsertdimensionrubricaDocument = gql`
    mutation INSERTDIMENSIONRUBRICA($ID: String!, $DIMENSION: DimensionSchemaInput!) {
  update_rubrica_dimension_by_pk(id: $ID, dimension: $DIMENSION) {
    id
    calificaciones {
      id
      descripcion
      nota
      titulo
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InsertdimensionrubricaGQL extends Apollo.Mutation<InsertdimensionrubricaMutation, InsertdimensionrubricaMutationVariables> {
    document = InsertdimensionrubricaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatedimensionDocument = gql`
    mutation UPDATEDIMENSION($ID: String!, $NOTA: Int!, $DESCRIPCION: String!, $TITLE: String!, $OPTION: Boolean!) {
  update_dimensioncalificacion_by_pk(
    id: $ID
    nota: $NOTA
    descripcion: $DESCRIPCION
    title: $TITLE
    option: $OPTION
  ) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatedimensionGQL extends Apollo.Mutation<UpdatedimensionMutation, UpdatedimensionMutationVariables> {
    document = UpdatedimensionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetcarrerasDocument = gql`
    query GETCARRERAS {
  carrera {
    id
    nombre
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetcarrerasGQL extends Apollo.Query<GetcarrerasQuery, GetcarrerasQueryVariables> {
    document = GetcarrerasDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetcursosbycarreraDocument = gql`
    query GETCURSOSBYCARRERA($ID: String!) {
  carrera_by_pk(id: $ID) {
    cursos {
      id
      nombre
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetcursosbycarreraGQL extends Apollo.Query<GetcursosbycarreraQuery, GetcursosbycarreraQueryVariables> {
    document = GetcursosbycarreraDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetallcursosDocument = gql`
    query GETALLCURSOS {
  curso {
    id
    nombre
    rubricas {
      id
      status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetallcursosGQL extends Apollo.Query<GetallcursosQuery, GetallcursosQueryVariables> {
    document = GetallcursosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const VerifyDocument = gql`
    mutation VERIFY($ID: String!, $CALIDAD: String, $BOOL: Boolean!) {
  evaluate_rubrica_by_pk(id: $ID, calidadEducativaId: $CALIDAD, status: $BOOL) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class VerifyGQL extends Apollo.Mutation<VerifyMutation, VerifyMutationVariables> {
    document = VerifyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }