package com.eCommerce.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eCommerce.auth.entity.ERole;
import com.eCommerce.auth.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
	Optional<Role> findByRoleName(ERole roleName);

}
