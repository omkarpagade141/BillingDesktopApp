package com.alpha.app.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.alpha.app.Entity.ProjectSetting;
import com.alpha.app.Repositiory.ProjSettingRepositiory;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SettingServiceImpl implements ISettingService {

	
	@Autowired
	private ProjSettingRepositiory settingRepo;
	
	@Value("${content.upload.folder}")
	private String folderName;

	@Override
	public ResponseEntity<?> addNewSetting(ProjectSetting setting) {
		
		settingRepo.save(setting);
		return new ResponseEntity<>("Setting Done", HttpStatus.CREATED);
	}
}
