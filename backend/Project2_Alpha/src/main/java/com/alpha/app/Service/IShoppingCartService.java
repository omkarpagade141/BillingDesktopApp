package com.alpha.app.Service;

import com.alpha.app.Exception.UserHandlingException;

public interface IShoppingCartService {

	void addProductToCart(Long custId, Long prodId, int quantity) throws UserHandlingException;

}
