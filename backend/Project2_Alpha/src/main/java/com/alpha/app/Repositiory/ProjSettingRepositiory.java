package com.alpha.app.Repositiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alpha.app.Entity.ProjectSetting;

@Repository
public interface ProjSettingRepositiory extends JpaRepository<ProjectSetting, Integer>{

}
