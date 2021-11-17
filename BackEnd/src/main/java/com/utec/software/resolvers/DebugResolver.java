package com.utec.software.resolvers;

import com.utec.software.model.*;
import com.utec.software.model.enums.RolEnum;
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

    @Mutation("fillMallas")
    @Description("Populate the database")
    @Transactional
    public Boolean fillMallas() throws SQLException {
        DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
        Map<String, Carrera> carreras = new HashMap<>();
        try (Connection con = DriverManager.getConnection(dbUrl,dbUsername,dbPassword);) {
            try (Statement stmt = con.createStatement();) {
                ResultSet rs = stmt.executeQuery(QUERYMALLAS);
                while(rs.next()) {
                    Integer a = rs.getInt(1);
                    String b = rs.getString(2);
                    String c =  rs.getString(4);
                    carreras.put(c, new Carrera(a, b, c));
                }
            }
        }
        Carrera.persist(carreras.values());
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
                    cursos.add(new Curso(rs.getString(1), rs.getString(2), rs.getString(3)));
                }
            }
        }
        Curso.persist(cursos);
        return true;
    }

    @Mutation("fillProfes")
    @Description("Populate the database")
    @Transactional
    public Boolean fillProfes() throws SQLException {
        DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
        List<User> profes = new ArrayList<>();
        Rol rol = new Rol();
        rol.setTipo(RolEnum.PROFESOR);
        rol.persist();
        try (Connection con = DriverManager.getConnection(dbUrl,dbUsername,dbPassword);) {
            try (Statement stmt = con.createStatement();) {
                ResultSet rs = stmt.executeQuery(QUERYPROFES);
                while(rs.next()) {
                    User usr = new User();
                    usr.setCodigo(rs.getString(1));
                    usr.setNombre(rs.getString(2));
                    usr.setEmail(rs.getString(3).split("@")[0] + "@utec.edu.pe");
                    usr.setRol(rol);
                    profes.add(usr);
                }
            }
        }
        User.persist(profes);
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
                    secciones.add(new Seccion(rs.getString(1)));
                }
            }
        }
        Seccion.persist(secciones);
        return true;
    }

    static final String QUERYMALLAS = "SELECT ML.CODMALLA AS CODMALLA, ML.DESCRIPCIONLARGA AS MALLA, P.CODPRODUCTO AS CODPRODUCTO, P.DESCRIPCIONLARGA AS CARRERA FROM PROGRAMACION.PRO_MALLA_VIGENTE VI INNER JOIN PROGRAMACION.PRO_PERIODORANGO PR ON PR.CODPERIODORANGO = VI.CODPERIODORANGO INNER JOIN CONFIGURACION.CON_MALLA ML ON ML.CODMALLA = VI.CODMALLA INNER JOIN CONFIGURACION.CON_PRODUCTO P ON P.CODPRODUCTO = ML.CODPRODUCTO WHERE PR.ESVIGENTE =1 AND VI.ISDELETED ='N' AND P.CODPROGRAMA = 1";
    static final String QUERYCURSO = "SELECT DISTINCT ACT.IDACTIVIDAD AS CODCURSO, PERIODO.DESCRIPCIONLARGA AS PERIODO, ACT.DESCRIPCIONLARGA AS CURSO FROM PROGRAMACION.PRO_CURSO_PERIODO PE INNER JOIN CONFIGURACION.CON_ACTIVIDAD ACT ON ACT.CODACTIVIDAD = PE.CODCURSO AND ACT.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SECCION SEC ON SEC.CODCURSOPERIODO = PE.CODCURSOPERIODO AND SEC.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SESION SES ON SES.CODCURSOSECCION = SEC.CODCURSOSECCION AND SES.ISDELETED ='N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SECCIONMTD ON SECCIONMTD.CODMAESTROTABLASDETALLE = SEC.CODSECCIONMTD AND SECCIONMTD.ISDELETED = 'N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SESIONMTD ON SESIONMTD.CODMAESTROTABLASDETALLE = SES.CODTIPOSESIONMTD AND SESIONMTD.ISDELETED = 'N' INNER JOIN PROGRAMACION.PRO_PERIODO PERIODO ON PERIODO.CODPERIODO = PE.CODPERIODORANGO WHERE PE.CODPERIODORANGO = 503 ORDER BY 2,3 ASC";
    static final String QUERYPROFES = "SELECT DISTINCT PERSONA.CODPERSONA, UTEC.GET_NOMBRES_PERSONA (PERSONA.CODPERSONA) AS DOCENTE, persona.USERNAME as correo FROM PROGRAMACION.PRO_CURSO_PERIODO PE INNER JOIN CONFIGURACION.CON_ACTIVIDAD ACT ON ACT.CODACTIVIDAD = PE.CODCURSO AND ACT.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SECCION SEC ON SEC.CODCURSOPERIODO = PE.CODCURSOPERIODO AND SEC.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SESION SES ON SES.CODCURSOSECCION = SEC.CODCURSOSECCION AND SES.ISDELETED ='N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SECCIONMTD ON SECCIONMTD.CODMAESTROTABLASDETALLE = SEC.CODSECCIONMTD AND SECCIONMTD.ISDELETED = 'N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SESIONMTD ON SESIONMTD.CODMAESTROTABLASDETALLE = SES.CODTIPOSESIONMTD AND SESIONMTD.ISDELETED = 'N' INNER JOIN GENERAL.GEN_PERSONA PERSONA ON PERSONA.CODPERSONA = SES.CODDOCENTE INNER JOIN GENERAL.GEN_PERSONA PERSONA2 ON PERSONA2.CODPERSONA = PE.CODCOORDINADOR INNER JOIN GENERAL.GEN_EMPLEADO EMP ON EMP.CODEMPLEADO = PERSONA.CODPERSONA INNER JOIN PROGRAMACION.PRO_PERIODO PERIODO ON PERIODO.CODPERIODO = PE.CODPERIODORANGO WHERE PE.CODPERIODORANGO = 503 ORDER BY 2 ASC";
    static final String QUERYSECCION = "SELECT DISTINCT SECCIONMTD.DESCRIPCIONLARGA AS SECCION FROM PROGRAMACION.PRO_CURSO_PERIODO PE INNER JOIN PROGRAMACION.PRO_CURSO_SECCION SEC ON SEC.CODCURSOPERIODO = PE.CODCURSOPERIODO AND SEC.ISDELETED ='N' INNER JOIN PROGRAMACION.PRO_CURSO_SESION SES ON SES.CODCURSOSECCION = SEC.CODCURSOSECCION AND SES.ISDELETED ='N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SECCIONMTD ON SECCIONMTD.CODMAESTROTABLASDETALLE = SEC.CODSECCIONMTD AND SECCIONMTD.ISDELETED = 'N' INNER JOIN GENERAL.GEN_MAESTRO_TABLAS_DETALLE SESIONMTD ON SESIONMTD.CODMAESTROTABLASDETALLE = SES.CODTIPOSESIONMTD AND SESIONMTD.ISDELETED = 'N' WHERE PE.CODPERIODORANGO =503 ORDER BY 1 ASC";
}
