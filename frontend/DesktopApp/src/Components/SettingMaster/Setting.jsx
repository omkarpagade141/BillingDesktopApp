import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Setting = () => {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setCountries(data.map((item) => item.name)); // Extract country names
      })
      .catch((error) => console.error('Error fetching data', error));
  }, []);

  const handleCountryChange = (event) => {
    const name = event.target.value;
    setSelectedCountry(name);
    setSelectedState('');
    setSelectedCity('');
    const selectedCountryData = data.find((item) => item.name === name);
    setStates(selectedCountryData ? selectedCountryData.states.map((state) => state.name) : []);
    setCities([]);
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity('');
    const selectedCountryData = data.find((item) => item.name === selectedCountry);
    const selectedStateData = selectedCountryData.states.find((item) => item.name === state);
    setCities(selectedStateData ? selectedStateData.cities.map((city) => city.name) : []);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const validateForm = () => {
    const errors = {};
    if (!selectedCountry) errors.name = 'Country is required';
    if (!selectedState) errors.state = 'State is required';
    if (!selectedCity) errors.city = 'City/District is required';
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('Form Submitted:', {
        selectedCountry,
        selectedState,
        selectedCity,
      });
      // Handle form submission logic here
    }
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <h4>Setting Form</h4>
        {/* First row: Setting ID, Business Name, Business Mobile */}
        <div className="form-row mb-4">
          <div className="form-group col-md-4">
            <label htmlFor="settingId">Setting ID</label>
            <input
              type="text"
              className="form-control"
              id="settingId"
              placeholder="Setting ID"
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              className="form-control"
              id="businessName"
              placeholder="Business Name"
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="businessMobile">Business Mobile</label>
            <input
              type="tel"
              className="form-control"
              id="businessMobile"
              placeholder="Business Mobile"
            />
          </div>
        </div>

        {/* Second row: Business Email, Business GST Number, Business Logo */}
        <div className="form-row mb-4">
          <div className="form-group col-md-4">
            <label htmlFor="businessEmail">Business Email</label>
            <input
              type="email"
              className="form-control"
              id="businessEmail"
              placeholder="Business Email"
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="businessGstNumber">Business GST Number</label>
            <input
              type="text"
              className="form-control"
              id="businessGstNumber"
              placeholder="GST Number"
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="businessLogo">Business Logo</label>
            <input
              type="file"
              className="form-control-file"
              id="businessLogo"
            />
          </div>
        </div>

        {/* Separation line */}
        <hr className="mb-3" />

        {/* Firm Address Details */}
        <h5>Address</h5>

        {/* Country, State, City/District Dropdowns */}
        <div className="form-row mb-4">
          <div className="form-group col-md-4">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              className="form-control"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="state">State</label>
            <select
              id="state"
              className="form-control"
              value={selectedState}
              onChange={handleStateChange}
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {formErrors.state && <div className="text-danger">{formErrors.state}</div>}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="city">City/District</label>
            <select
              id="city"
              className="form-control"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!selectedState}
            >
              <option value="">Select City/District</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {formErrors.city && <div className="text-danger">{formErrors.city}</div>}
          </div>
        </div>

        {/* Additional Form Fields */}
        <div className="form-row mb-4">
          <div className="form-group col-md-4">
            <label htmlFor="zipCode">Zip Code</label>
            <input type="text" className="form-control" id="zipCode" required />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="storeEmail">Store Email</label>
            <input type="email" className="form-control" id="storeEmail" required />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="countryCode">Country Code</label>
            <input type="text" className="form-control" id="countryCode" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            className="form-control"
            id="address"
            rows="3"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Setting;
