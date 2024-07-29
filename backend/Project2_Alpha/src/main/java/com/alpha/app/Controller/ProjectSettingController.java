package com.alpha.app.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alpha.app.Entity.ProjectSetting;
import com.alpha.app.Service.ISettingService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/settings")
public class ProjectSettingController {

	
	@Autowired
	private ISettingService settingService;
	
	@PostMapping("/add_setting")
	ResponseEntity<?> addSoftwareSetting(@RequestBody ProjectSetting setting)
	{
		return settingService.addNewSetting(setting);
	}
}
