package br.com.vehiclesdata.repository;

import br.com.vehiclesdata.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
}
