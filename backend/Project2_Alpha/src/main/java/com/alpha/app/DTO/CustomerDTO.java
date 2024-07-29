package com.alpha.app.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class CustomerDTO {

	private Long custId;
	private String custFullName;
	private int custMobile;
	
	public CustomerDTO() {
		// TODO Auto-generated constructor stub
	}

	public CustomerDTO(Long custId, String custFullName, int custMobile) {
		super();
		this.custId = custId;
		this.custFullName = custFullName;
		this.custMobile = custMobile;
	}

	public Long getCustId() {
		return custId;
	}

	public void setCustId(Long custId) {
		this.custId = custId;
	}

	public String getCustFullName() {
		return custFullName;
	}

	public void setCustFullName(String custFullName) {
		this.custFullName = custFullName;
	}

	public int getCustMobile() {
		return custMobile;
	}

	public void setCustMobile(int custMobile) {
		this.custMobile = custMobile;
	}
	
	
}
