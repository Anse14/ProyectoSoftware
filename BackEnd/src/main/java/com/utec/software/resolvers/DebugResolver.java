package com.utec.software.resolvers;

import com.utec.software.model.*;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;

import javax.transaction.Transactional;
import java.sql.*;
import java.util.*;

@GraphQLApi
public class DebugResolver {
    @ConfigProperty(name = "utec.datasource.username")
    String dbUsername;

    @ConfigProperty(name = "utec.datasource.password")
    String dbPassword;

    @ConfigProperty(name = "utec.datasource.jdbc.url")
    String dbUrl;

    @ConfigProperty(name = "debug.users.prof")
    String[] debugUsersProf;

    @ConfigProperty(name = "debug.users.calidad")
    String[] debugUsersCalidad;

    @ConfigProperty(name = "debug.users.alumn")
    String[] debugUsersAlumn;

    @Mutation("fillCarreras")
    @Description("Populate the database")
    @Transactional
    public Boolean fillCarreras() throws SQLException {
        DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
        List<Carrera> carreras = new ArrayList<>();
        try (Connection con = DriverManager.getConnection(dbUrl,dbUsername,dbPassword);) {
            try (Statement stmt = con.createStatement();) {
                ResultSet rs = stmt.executeQuery(QUERYCARRERAS);
                while(rs.next()) {
                    carreras.add(new Carrera(rs.getString(1)));
                }
            }
        }
        Carrera.persist(carreras);
        System.out.println("Finalizada insercion de carreras");
        return true;
    }

    @Mutation("fillCursos")
    @Description("Populate the database")
    @Transactional
    public Boolean fillCursos() throws SQLException {
        DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
        List<Curso> cursos = new ArrayList<>();
        try (Connection con = DriverManager.getConnection(dbUrl,dbUsername,dbPassword);) {
            try (Statement stmt = con.createStatement();) {
                ResultSet rs = stmt.executeQuery(QUERYCURSO);
                while(rs.next()) {
                    cursos.add(new Curso(rs.getString(2), rs.getString(1)));
                }
            }
        }
        Curso.persist(cursos);
        System.out.println("Finalizada insercion de cursos");
        return true;
    }

    @Mutation("fillProfes")
    @Description("Populate the database")
    @Transactional
    public Boolean fillProfes() throws SQLException {
        DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
        List<Profesor> profes = new ArrayList<>();
        try (Connection con = DriverManager.getConnection(dbUrl,dbUsername,dbPassword);) {
            try (Statement stmt = con.createStatement();) {
                ResultSet rs = stmt.executeQuery(QUERYPROFES);
                while(rs.next()) {
                    var prof = new Profesor();
                    prof.setCodigo(rs.getString(1));
                    prof.setNombre(rs.getString(2));
                    prof.setCorreo(rs.getString(3).split("@")[0] + "@utec.edu.pe");
                    profes.add(prof);
                }
            }
        }
        Profesor.persist(profes);
        System.out.println("Finalizada insercion de profesores");
        return true;
    }

    @Mutation("fillCalidad")
    @Description("Populate the database")
    @Transactional
    public Boolean fillCalidad() throws SQLException {
        DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
        Map<String, CalidadEducativa> calidades = new TreeMap<>();
        try (Connection con = DriverManager.getConnection(dbUrl,dbUsername,dbPassword);) {
            try (Statement stmt = con.createStatement();) {
                ResultSet rs = stmt.executeQuery(QUERYCALIDAD);
                while(rs.next()) {
                    var calidadEducativa = new CalidadEducativa();
                    calidadEducativa.setCodigo(rs.getString(1));
                    calidadEducativa.setNombre(rs.getString(2));
                    calidadEducativa.setCorreo(rs.getString(3).split("@")[0] + "@utec.edu.pe");
                    calidades.put(calidadEducativa.getCorreo(), calidadEducativa);
                }
            }
        }
        CalidadEducativa.persist(calidades.values());
        System.out.println("Finalizada insercion de calidad educativa");
        return true;
    }

    @Mutation("fillAlumnos")
    @Description("Populate the database")
    @Transactional
    public Boolean fillAlumnos(int start, int end) throws SQLException {
        DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
        List<Alumno> alumnos = new ArrayList<>();
        Integer i = start;
        try (Connection con = DriverManager.getConnection(dbUrl,dbUsername,dbPassword);) {
            try (Statement stmt = con.createStatement();) {
                ResultSet rs = stmt.executeQuery(QUERYALUMNOS + " offset " + start + " rows");
                while(rs.next() && i < end) {
                    var alumno = new Alumno();
                    alumno.setCodigo(rs.getString(1));
                    alumno.setNombre(rs.getString(2));
                    alumno.setCorreo(rs.getString(3).split("@")[0] + "@utec.edu.pe");
                    alumnos.add(alumno);
                    i++;
                }
                if(i < end) {
                    System.out.println("No more data: " +   i);
                }
            }
        }
        Alumno.persist(alumnos);
        System.out.println("Finalizada insercion de alumnos");
        return true;
    }

    @Mutation("fillSeccion")
    @Description("Populate the database")
    @Transactional
    public Boolean fillSeccion() throws SQLException {
        DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
        List<Seccion> secciones = new ArrayList<>();
        try (Connection con = DriverManager.getConnection(dbUrl,dbUsername,dbPassword);) {
            try (Statement stmt = con.createStatement();) {
                ResultSet rs = stmt.executeQuery(QUERYSECCION);
                while(rs.next()) {
                    secciones.add(new Seccion(rs.getString(1), rs.getString(2)));
                }
            }
        }
        Seccion.persist(secciones);
        System.out.println("Finalizada insercion de secciones");
        return true;
    }

    @Mutation("fillDebugUsers")
    @Description("Populate the database")
    @Transactional
    public Boolean fillDebugUsers() {
        List<Profesor> profes = new ArrayList<>();
        List<CalidadEducativa> calidades = new ArrayList<>();
        List<Alumno> alumnos = new ArrayList<>();
        for (var usr : debugUsersProf) {
            var name = usr.split("@")[0].split("\\.")[0];
            var lname = usr.split("@")[0].split("\\.")[1];
            profes.add(new Profesor(usr.split("@")[0], name + lname, usr));
        }
        for (var usr : debugUsersAlumn) {
            var name = usr.split("@")[0].split("\\.")[0];
            var lname = usr.split("@")[0].split("\\.")[1];
            alumnos.add(new Alumno(usr.split("@")[0], name + lname, usr));
        }
        for (var usr : debugUsersCalidad) {
            var name = usr.split("@")[0].split("\\.")[0];
            var lname = usr.split("@")[0].split("\\.")[1];
            calidades.add(new CalidadEducativa(usr.split("@")[0], name + lname, usr));
        }
        Profesor.persist(profes);
        CalidadEducativa.persist(calidades);
        Alumno.persist(alumnos);
        System.out.println("Finalizada insercion de usuarios debug");
        return true;
    }

    static final String QUERYCARRERAS = "SELECT UNIQUE P.DESCRIPCIONLARGA AS CARRERA FROM PROGRAMACION.PRO_MALLA_VIGENTE VI INNER JOIN PROGRAMACION.PRO_PERIODORANGO PR ON PR.CODPERIODORANGO = VI.CODPERIODORANGO INNER JOIN CONFIGURACION.CON_MALLA ML ON ML.CODMALLA = VI.CODMALLA INNER JOIN CONFIGURACION.CON_PRODUCTO P ON P.CODPRODUCTO = ML.CODPRODUCTO WHERE PR.ESVIGENTE = 1 AND VI.ISDELETED ='N'AND P.CODPROGRAMA = 1";
    static final String QUERYCURSO = "SELECT UNIQUE ACT.DESCRIPCIONLARGA AS CURSO, ACT.IDACTIVIDAD AS CODCURSO FROM PROGRAMACION.PRO_CURSO_PERIODO PE INNER JOIN CONFIGURACION.CON_ACTIVIDAD ACT ON ACT.CODACTIVIDAD = PE.CODCURSO AND ACT.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SECCION SEC ON SEC.CODCURSOPERIODO = PE.CODCURSOPERIODO AND SEC.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SESION SES ON SES.CODCURSOSECCION = SEC.CODCURSOSECCION AND SES.ISDELETED ='N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SECCIONMTD ON SECCIONMTD.CODMAESTROTABLASDETALLE = SEC.CODSECCIONMTD AND SECCIONMTD.ISDELETED = 'N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SESIONMTD ON SESIONMTD.CODMAESTROTABLASDETALLE = SES.CODTIPOSESIONMTD AND SESIONMTD.ISDELETED = 'N' WHERE PE.CODPERIODORANGO = 503 ORDER BY 2 ASC";
    static final String QUERYPROFES = "SELECT DISTINCT PERSONA.CODPERSONA, UTEC.GET_NOMBRES_PERSONA (PERSONA.CODPERSONA) AS DOCENTE, persona.USERNAME as correo FROM PROGRAMACION.PRO_CURSO_PERIODO PE INNER JOIN CONFIGURACION.CON_ACTIVIDAD ACT ON ACT.CODACTIVIDAD = PE.CODCURSO AND ACT.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SECCION SEC ON SEC.CODCURSOPERIODO = PE.CODCURSOPERIODO AND SEC.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SESION SES ON SES.CODCURSOSECCION = SEC.CODCURSOSECCION AND SES.ISDELETED ='N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SECCIONMTD ON SECCIONMTD.CODMAESTROTABLASDETALLE = SEC.CODSECCIONMTD AND SECCIONMTD.ISDELETED = 'N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SESIONMTD ON SESIONMTD.CODMAESTROTABLASDETALLE = SES.CODTIPOSESIONMTD AND SESIONMTD.ISDELETED = 'N' INNER JOIN GENERAL.GEN_PERSONA PERSONA ON PERSONA.CODPERSONA = SES.CODDOCENTE INNER JOIN GENERAL.GEN_PERSONA PERSONA2 ON PERSONA2.CODPERSONA = PE.CODCOORDINADOR INNER JOIN GENERAL.GEN_EMPLEADO EMP ON EMP.CODEMPLEADO = PERSONA.CODPERSONA INNER JOIN PROGRAMACION.PRO_PERIODO PERIODO ON PERIODO.CODPERIODO = PE.CODPERIODORANGO WHERE PE.CODPERIODORANGO =503 ORDER BY 2 ASC";
    static final String QUERYCALIDAD ="SELECT CODEMPLEADO, NOMBRECOMPLETOAI, GEN_PERSONA.USERNAME FROM GENERAL.GEN_AREA_FUNCIONAL, GENERAL.GEN_EMPLEADO_AREAFUNCIONAL, GENERAL.GEN_PERSONA WHERE GEN_AREA_FUNCIONAL.CODAREAFUNCIONAL = GEN_EMPLEADO_AREAFUNCIONAL.CODAREAFUNCIONAL AND CODEMPLEADO = CODPERSONA AND GEN_AREA_FUNCIONAL.DESCRIPCORTA = 'Calidad Educativa'";
    static final String QUERYALUMNOS = "SELECT IDALUMNO,NOMBRECOMPLETOAI, GEN_PERSONA.USERNAME FROM GENERAL.GEN_PERSONA, GENERAL.GEN_ALUMNO WHERE CODALUMNO = CODPERSONA order by IDALUMNO";
    static final String QUERYSECCION = "SELECT UNIQUE SECCIONMTD.DESCRIPCIONLARGA AS SECCION, PERIODO.DESCRIPCIONLARGA AS PERIODO FROM PROGRAMACION.PRO_CURSO_PERIODO PE INNER JOIN CONFIGURACION.CON_ACTIVIDAD ACT ON ACT.CODACTIVIDAD = PE.CODCURSO AND ACT.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SECCION SEC ON SEC.CODCURSOPERIODO = PE.CODCURSOPERIODO AND SEC.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SESION SES ON SES.CODCURSOSECCION = SEC.CODCURSOSECCION AND SES.ISDELETED ='N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SECCIONMTD ON SECCIONMTD.CODMAESTROTABLASDETALLE = SEC.CODSECCIONMTD AND SECCIONMTD.ISDELETED = 'N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SESIONMTD ON SESIONMTD.CODMAESTROTABLASDETALLE = SES.CODTIPOSESIONMTD AND SESIONMTD.ISDELETED = 'N' INNER JOIN PROGRAMACION.PRO_PERIODO PERIODO ON PERIODO.CODPERIODO = PE.CODPERIODORANGO WHERE PE.CODPERIODORANGO =503 ORDER BY 1 ASC";
}
