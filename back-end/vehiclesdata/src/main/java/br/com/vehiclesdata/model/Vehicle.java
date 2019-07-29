package br.com.vehiclesdata.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = AUTO)
    private Integer id;
    private String name;
    private String description;
    private String plate;
    @ManyToOne
    @JoinColumn(name="vehicleType_id", referencedColumnName="id",nullable=false)
    private VehicleType vehicleType;
}
