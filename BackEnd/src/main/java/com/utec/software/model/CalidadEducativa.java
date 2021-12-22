package com.utec.software.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class CalidadEducativa extends PanacheEntityBase {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "codigo", unique = true)
    private String codigo;
    private String nombre;

    @Column(name = "correo", unique = true)
    private String correo; // Username

    @LazyCollection(LazyCollectionOption.TRUE)
    @OneToMany(mappedBy = "calidadEducativa")
    private List<Rubrica> rubricas;

    public CalidadEducativa() {}

    public CalidadEducativa(String codigo, String nombre, String correo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.correo = correo;
    }

    public void updateAttributes(CalidadEducativa calidadEducativa){
        this.nombre = calidadEducativa.nombre == null ? this.nombre : calidadEducativa.nombre;
        this.codigo = calidadEducativa.codigo == null ? this.codigo : calidadEducativa.codigo;
        this.correo = calidadEducativa.correo == null ? this.correo : calidadEducativa.correo;
    }

    public static Optional<CalidadEducativa> findByEmail(String email) {
        return find("correo", email).firstResultOptional();
    }
}
