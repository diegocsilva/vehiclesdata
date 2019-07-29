package br.com.vehiclesdata.repository;

import br.com.vehiclesdata.model.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleTypeRepository extends JpaRepository<VehicleType, Integer> {
    VehicleType findByName(String name);
}
