package com.alpha.app.Service;

import org.springframework.http.ResponseEntity;

import com.alpha.app.Entity.ProjectSetting;

public interface ISettingService {

	ResponseEntity<?> addNewSetting(ProjectSetting setting);

}
