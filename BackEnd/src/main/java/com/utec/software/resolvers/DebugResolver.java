package com.utec.software.resolvers;

import com.utec.software.model.Carrera;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@GraphQLApi
public class DebugResolver {
    @ConfigProperty(name = "utec.datasource.username")
    String dbUsername;

    @ConfigProperty(name = "utec.datasource.password")
    String dbPassword;

    @ConfigProperty(name = "utec.datasource.jdbc.url")
    String dbUrl;

    @Mutation("fillData")
    @Description("Populate the database")
    public Boolean fillData() throws SQLException {
        DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
        List<Carrera> carreras = new ArrayList<>();
        try (Connection con = DriverManager.getConnection(dbUrl,dbUsername,dbPassword);) {
            try (Statement stmt = con.createStatement();) {
                ResultSet rs = stmt.executeQuery(QUERY);
                while(rs.next()) {
                    Integer a = rs.getInt(1);
                    String b = rs.getString(2);
                    String c =  rs.getString(4);
                    Carrera carrera = new Carrera(a, b, c);
                    carreras.add(carrera);
                }
            }
        }
        System.out.println("ANTESDE");
        Carrera.persist(carreras);
        System.out.println("DESPUESDE");
        return true;
    }

    static final String QUERY = "SELECT ML.CODMALLA AS CODMALLA, ML.DESCRIPCIONLARGA AS MALLA, P.CODPRODUCTO AS CODPRODUCTO, P.DESCRIPCIONLARGA AS CARRERA FROM PROGRAMACION.PRO_MALLA_VIGENTE VI INNER JOIN PROGRAMACION.PRO_PERIODORANGO PR ON PR.CODPERIODORANGO = VI.CODPERIODORANGO INNER JOIN CONFIGURACION.CON_MALLA ML ON ML.CODMALLA = VI.CODMALLA INNER JOIN CONFIGURACION.CON_PRODUCTO P ON P.CODPRODUCTO = ML.CODPRODUCTO WHERE PR.ESVIGENTE =1 AND VI.ISDELETED ='N' AND P.CODPROGRAMA = 1";
}
