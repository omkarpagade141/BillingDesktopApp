package com.alpha.app.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddProductDTO {

	private Long prodId;
	
	private Long custId;
	
	private int quantity;
}
