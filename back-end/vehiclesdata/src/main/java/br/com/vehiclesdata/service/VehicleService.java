package br.com.vehiclesdata.service;

import br.com.vehiclesdata.domain.VehicleExceptionType;
import br.com.vehiclesdata.exception.VehicleException;
import br.com.vehiclesdata.exception.FormException;
import br.com.vehiclesdata.exception.VehicleTypeException;
import br.com.vehiclesdata.model.Vehicle;
import br.com.vehiclesdata.model.VehicleType;
import br.com.vehiclesdata.repository.VehicleRepository;
import br.com.vehiclesdata.repository.VehicleTypeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static br.com.vehiclesdata.util.ObjectUtil.isNullOrEmpty;

@Service
public class VehicleService {

    private final VehicleRepository repository;
    private final VehicleTypeService vehicleTypeService;

    public VehicleService(VehicleRepository repository, VehicleTypeService vehicleTypeService) {
        this.repository = repository;
        this.vehicleTypeService = vehicleTypeService;
    }

    public List<Vehicle> list() {
        return repository.findAll();
    }

    public void save(Vehicle vehicle) {
        validations(vehicle);

        if (vehicle.getVehicleType().getId() == null) {
            vehicleTypeService.save(vehicle.getVehicleType());
        }
        repository.save(vehicle);
    }

    private void validations(Vehicle vehicle) {
        List<String> errors = new ArrayList<>();

        errors.addAll(vehicleValidate(vehicle));
        errors.addAll(vehicleTypeValidate(vehicle));

        validateErrors(errors);
    }

    private void validateErrors(List<String> errors) {
        if (!errors.isEmpty()){
            throw new FormException(errors);
        }
    }

    private List<String> vehicleValidate(Vehicle vehicle) {
        List<String> erros = new ArrayList<>();
        if (isNullOrEmpty(vehicle.getName())){
            erros.add("É obrigatório o preenchimento do Nome.");
        }
        if (isNullOrEmpty(vehicle.getDescription())){
            erros.add("É obrigatório o preenchimento da Descrição.");
        }
        if (isNullOrEmpty(vehicle.getPlate())){
            erros.add("É obrigatório o preenchimento da Placa.");
        }
        if (isNullOrEmpty(vehicle.getVehicleType())){
            erros.add("É obrigatório o preenchimento do Tipo do Veículo.");
        }
        return erros;
    }

    private List<String> vehicleTypeValidate(Vehicle vehicle){
        validatePersistVehicleType(vehicle);

        List<String> erros = new ArrayList<>();
        if (isNullOrEmpty(vehicle.getVehicleType().getName())){
            erros.add("É obrigatório o preenchimento do Nome do Tipo.");
        }
        if (isNullOrEmpty(vehicle.getVehicleType().getDescription())){
            erros.add("É obrigatório o preenchimento da Descrição do Tipo.");
        }
        return erros;
    }

    private void validatePersistVehicleType(Vehicle vehicle) {
        if (vehicle.getVehicleType().getId() != null){
            vehicleTypeService.getById(vehicle.getVehicleType().getId());
        }
    }

    public void edit(Vehicle vehicle) {
        vehicleTypeService.save(vehicle.getVehicleType());
        repository.save(vehicle);
    }

    public void delete(Integer id) {
        Optional<Vehicle> opVehicle = repository.findById(id);
        if (opVehicle.isPresent()){
            repository.delete(opVehicle.get());
        }else{
            throw new VehicleException(VehicleExceptionType.UNREGISTERED);
        }
    }

    public Vehicle getById(Integer id){
        Optional<Vehicle> opVehicle = repository.findById(id);
        if (opVehicle.isPresent()){
            return opVehicle.get();
        }else{
            throw new VehicleException(VehicleExceptionType.NOT_FOUND_IN_SEARCH);
        }
    }
}
