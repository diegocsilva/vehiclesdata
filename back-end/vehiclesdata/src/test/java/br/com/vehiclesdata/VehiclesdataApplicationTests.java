package br.com.vehiclesdata;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@PropertySource("test/resources/application.properties")
public class VehiclesdataApplicationTests {

	@Test
	public void contextLoads() {
	}

}
