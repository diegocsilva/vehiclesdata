package br.com.vehiclesdata.controller;

import br.com.vehiclesdata.model.Body;
import br.com.vehiclesdata.model.VehicleType;
import br.com.vehiclesdata.service.VehicleTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static br.com.vehiclesdata.util.ResponseUtil.responseByMessage;

@RestController
@RequestMapping(value = "/vehicles-types", produces = MediaType.APPLICATION_JSON_VALUE)
public class VehicleTypeController {

    @Autowired
    private VehicleTypeService service;

    @GetMapping
    public ResponseEntity<Body<List<VehicleType>>> list(){
        Body<List<VehicleType>> body = new Body<>();
        body.setData(service.list());
        return ResponseEntity.ok(body);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody VehicleType vehicleType){
        service.save(vehicleType);
        return ResponseEntity.ok(responseByMessage("Veículo cadastrado com sucesso!"));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> edit(@RequestBody VehicleType vehicleType){
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
        service.delete(id);
        return ResponseEntity.ok("");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id){
        return ResponseEntity.ok("");
    }

    @PostMapping("/filter")
    public ResponseEntity<?> findByFilter(@RequestBody Body<VehicleType> vehicleTypeFilter){
        return ResponseEntity.ok("");
    }

}
