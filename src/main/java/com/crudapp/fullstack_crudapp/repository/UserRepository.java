package com.crudapp.fullstack_crudapp.repository;

import com.crudapp.fullstack_crudapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
