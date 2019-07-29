package br.com.vehiclesdata.controller;

import br.com.vehiclesdata.model.Body;
import br.com.vehiclesdata.model.Vehicle;
import br.com.vehiclesdata.model.VehicleType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Objects;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations="classpath:test.properties")
public class VehicleControllerTest {

    private static final String URL = "http://localhost";
    private static final String VEHICLES_PATH = "/vehicles";

    @LocalServerPort
    private int port;

    private TestRestTemplate restTemplate;

    @Before
    public void setUp() {
        this.restTemplate = new TestRestTemplate();
    }

    @Test
    public void when_registering_a_vehicle_then_the_listing_returns_a_list_with_the_vehicle() {
        VehicleType ret = VehicleType.builder()
                .name("RET")
                .description("Modelo com porta malas menor que sedam, possui 5 portas sendo uma o porta malas")
                .build();

        Vehicle vehicle = Vehicle.builder()
                .name("Gol")
                .description("Popular e com valor acessível")
                .plate("HTT0011")
                .vehicleType(ret)
                .build();

        postForEntity(VEHICLES_PATH, vehicle, Body.class);
        ResponseEntity<Body<List<Vehicle>>> r = getForEntity(VEHICLES_PATH, Body.class);

        assertThat(Objects.requireNonNull(r.getBody()).getData(), hasSize(1));
        assertThat(r.getBody().getData(), hasItem(vehicle));
    }

    private ResponseEntity getForEntity(String path, Class<?> reponseType) {
        return this.restTemplate.getForEntity(URL+":"+port+path, reponseType);
    }

    private ResponseEntity postForEntity(String path, Object body, Class<?> reponseType) {
        return this.restTemplate.postForEntity(URL+":"+port+path, body, reponseType);
    }
}
