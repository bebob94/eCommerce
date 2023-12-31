package com.eCommerce.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eCommerce.auth.entity.User;
import com.eCommerce.auth.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

	@Autowired
	UserRepository userRepositoryDao;
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MODIFICA USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public User updateUser( User u) {
		if (!userRepositoryDao.existsById(u.getId())) {
			throw new EntityNotFoundException("User not exists!!!");
		} else {
			userRepositoryDao.save(u);
			return u;
		}
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CERCA USER PER ID>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public User findUserById(Long id) {
		if(!userRepositoryDao.existsById(id)) {
			throw new EntityNotFoundException("User not exists!!!");
		}else {
			return userRepositoryDao.findById(id).get();
		}
	}
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CERCA TUTTE GLI USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public List<User> findAllUser() {
		return (List<User>) userRepositoryDao.findAll();
	}
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CERCA USER PER USERNAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public User findUserByUsername(String username) {
	
			return userRepositoryDao.findByUsername(username).get();
	
	}
	
	
	
//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIMUOVI USER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public void removeUser(User u) {
		if (!userRepositoryDao.existsById(u.getId())) {
			throw new EntityNotFoundException("User not exists!!!");
		} else {
			userRepositoryDao.delete(u);
		}
	}
	
	//	<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIMUOVI USER PER ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	public String removeUserById(Long id) {
		if (!userRepositoryDao.existsById(id)) {
			throw new EntityNotFoundException("User not exists!!!");
		} else {
			userRepositoryDao.deleteById(id);
			return "User delete";
		}
	}
}
