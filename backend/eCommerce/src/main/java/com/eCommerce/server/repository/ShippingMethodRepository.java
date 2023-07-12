package com.eCommerce.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eCommerce.server.entity.ShippingMethod;
import com.eCommerce.server.entity.Shipping_method;

public interface ShippingMethodRepository  extends JpaRepository<ShippingMethod, Long>{
	Optional<ShippingMethod> findByName(Shipping_method shippingMethod);
}
