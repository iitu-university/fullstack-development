package com.packt.cardatabase;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.packt.cardatabase.domain.Owner;
import com.packt.cardatabase.domain.OwnerRepository;

@DataJpaTest
@ActiveProfiles("test")
class OwnerRepositoryTest {
    @Autowired
    private OwnerRepository repository;

    @Test
    void saveOwner() {
        repository.save(new Owner("Lucy", "Smith"));

        assertThat(repository.findByFirstname("Lucy"))
                .isPresent()
                .get()
                .extracting(Owner::getLastname)
                .isEqualTo("Smith");
    }

    @Test
    void updateOwner() {
        Owner owner = repository.save(new Owner("Lucy", "Smith"));
        owner.setLastname("Jones");
        repository.save(owner);

        assertThat(repository.findById(owner.getOwnerid()))
                .isPresent()
                .get()
                .extracting(Owner::getLastname)
                .isEqualTo("Jones");
    }

    @Test
    void deleteOwners() {
        repository.save(new Owner("Lisa", "Morrison"));
        repository.deleteAll();

        assertThat(repository.count()).isZero();
        assertThat(repository.findByFirstname("Lisa")).isEmpty();
    }
}
