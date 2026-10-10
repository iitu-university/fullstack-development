package com.packt.cardatabase;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.packt.cardatabase.domain.AppUser;
import com.packt.cardatabase.domain.AppUserRepository;
import com.packt.cardatabase.domain.Car;
import com.packt.cardatabase.domain.CarRepository;
import com.packt.cardatabase.domain.Owner;
import com.packt.cardatabase.domain.OwnerRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final CarRepository repository;
    private final OwnerRepository ownerRepository;
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(CarRepository repository, OwnerRepository ownerRepository,
            AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.ownerRepository = ownerRepository;
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        Owner owner1 = new Owner("John", "Johnson");
        Owner owner2 = new Owner("Mary", "Robinson");
        ownerRepository.saveAll(Arrays.asList(owner1, owner2));

        repository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2023, 59000, owner1));
        repository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2020, 29000, owner2));
        repository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2022, 39000, owner2));

        for (Car car : repository.findAll()) {
            logger.info("brand: {}, model: {}", car.getBrand(), car.getModel());
        }

        appUserRepository.save(new AppUser("user", passwordEncoder.encode("user"), "USER"));
        appUserRepository.save(new AppUser("admin", passwordEncoder.encode("admin"), "ADMIN"));
    }
}
