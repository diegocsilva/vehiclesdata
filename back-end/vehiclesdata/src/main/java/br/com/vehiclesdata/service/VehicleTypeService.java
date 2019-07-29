package br.com.vehiclesdata.service;

import br.com.vehiclesdata.domain.VehicleExceptionType;
import br.com.vehiclesdata.exception.VehicleException;
import br.com.vehiclesdata.exception.FormException;
import br.com.vehiclesdata.exception.VehicleTypeException;
import br.com.vehiclesdata.model.Vehicle;
import br.com.vehiclesdata.model.VehicleType;
import br.com.vehiclesdata.repository.VehicleTypeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static br.com.vehiclesdata.util.ObjectUtil.isNullOrEmpty;

@Service
public class VehicleTypeService {

    private final VehicleTypeRepository repository;

    public VehicleTypeService(VehicleTypeRepository repository) {
        this.repository = repository;
    }

    public List<VehicleType> list() {
        return repository.findAll();
    }

    public void save(VehicleType vehicleType) {
        validations(vehicleType);
        repository.save(vehicleType);
    }

    private void validations(VehicleType vehicleType) {
        List<String> errors = new ArrayList<>(vehicleTypeValidate(vehicleType));
        validateErrors(errors);
    }

    private void validateErrors(List<String> errors) {
        if (!errors.isEmpty()){
            throw new FormException(errors);
        }
    }

    private List<String> vehicleTypeValidate(VehicleType vehicleType){
        List<String> erros = new ArrayList<>();
        if (isNullOrEmpty(vehicleType.getName())){
            erros.add("É obrigatório o preenchimento do Nome do Tipo.");
        }
        if (isNullOrEmpty(vehicleType.getDescription())){
            erros.add("É obrigatório o preenchimento da Descrição do Tipo.");
        }
        VehicleType vehicleTypeSearch = repository.findByName(vehicleType.getName());
        if (vehicleTypeSearch != null && vehicleTypeSearch.getId() != null){
            erros.add("Tipo Veículo já cadastrado.");
        }
        return erros;
    }

    public void edit(VehicleType vehicleType) {
        repository.save(vehicleType);
    }

    public void delete(Integer id) {
        Optional<VehicleType> opVehicleType = repository.findById(id);
        if (opVehicleType.isPresent()){
            repository.delete(opVehicleType.get());
        }else{
            throw new VehicleException(VehicleExceptionType.UNREGISTERED);
        }
    }

    public VehicleType getById(Integer id){
        Optional<VehicleType> opVehicleType = repository.findById(id);
        if (opVehicleType.isPresent()){
            return opVehicleType.get();
        }else{
            throw new VehicleException(VehicleExceptionType.NOT_FOUND_IN_SEARCH);
        }
    }
}
