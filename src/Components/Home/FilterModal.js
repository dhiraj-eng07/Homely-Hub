import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../CSS/FilterModal.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const { Range } = Slider;

const FilterModal = ({ selectedFilters, onFilterChange, onClose }) => {
  const [priceRange, setPriceRange] = useState({
    min: selectedFilters.priceRange?.min || 600,
    max: selectedFilters.priceRange?.max || 30000,
  });
  const [propertyType, setPropertyType] = useState(selectedFilters.propertyType || "");
  const [roomType, setRoomType] = useState(selectedFilters.roomType || "");
  const [amenities, setAmenities] = useState(selectedFilters.amenities || []);

  useEffect(() => {
    setPriceRange({
      min: selectedFilters.priceRange?.min || 600,
      max: selectedFilters.priceRange?.max || 30000,
    });
    setPropertyType(selectedFilters.propertyType || "");
    setRoomType(selectedFilters.roomType || "");
    setAmenities(selectedFilters.amenities || []);
  }, [selectedFilters]);

  const handlePriceRangeChange = (value) => {
    setPriceRange({ min: value[0], max: value[1] });
  };

  const handleMinInputChange = (e) => {
    const minValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({ ...prev, min: minValue }));
  };

  const handleMaxInputChange = (e) => {
    const maxValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({ ...prev, max: maxValue }));
  };

  const handleFilterChange = () => {
    onFilterChange("minPrice", priceRange.min);
    onFilterChange("maxPrice", priceRange.max);
    onFilterChange("propertyType", propertyType);
    onFilterChange("roomType", roomType);
    onFilterChange("amenities", amenities);
    onClose();
  };

  const propertyTypeOptions = [
    { value: "House", label: "House", icon: "home" },
    { value: "Flat", label: "Flat", icon: "apartment" },
    { value: "Guest House", label: "Guest House", icon: "hotel" },
    { value: "Hotel", label: "Hotel", icon: "meeting_room" },
  ];

  const roomTypeOptions = [
    { value: "Entire Room", label: "Entire Room", icon: "hotel" },
    { value: "Room", label: "Room", icon: "meeting_room" },
    { value: "AnyType", label: "AnyType", icon: "apartment" },
  ];

  const amenitiesOptions = [
    { value: "Wifi", label: "Wifi", icon: "wifi" },
    { value: "Kitchen", label: "Kitchen", icon: "kitchen" },
    { value: "Ac", label: "AC", icon: "ac_unit" },
    { value: "Washing Machine", label: "Washing Machine", icon: "local_laundry_service" },
    { value: "Tv", label: "Tv", icon: "tv" },
    { value: "Pool", label: "Pool", icon: "pool" },
    { value: "Free Parking", label: "Free parking", icon: "local_parking" },
  ];

  const handleClearFilters = () => {
    setPriceRange({ min: 600, max: 30000 });
    setPropertyType("");
    setRoomType("");
    setAmenities([]);
  };

  const handleAmenitiesChange = (selectedAmenity) => {
    setAmenities((prevAmenities) =>
      prevAmenities.includes(selectedAmenity)
        ? prevAmenities.filter((item) => item !== selectedAmenity)
        : [...prevAmenities, selectedAmenity]
    );
  };

  const handlePropertyTypeChange = (selectedType) => {
    setPropertyType((prevType) => (prevType === selectedType ? "" : selectedType));
  };

  const handleRoomTypeChange = (selectedType) => {
    setRoomType((prevType) => (prevType === selectedType ? "" : selectedType));
  };

  return (
    <div className="modal-backdrop">
      <div className="filter-modal-content p-4 bg-light rounded">
        <div className="modal-header sticky-top bg-light" style={{ top: "-25px" }}>
          <h4> Filters </h4>
          <hr />
          <button onClick={handleFilterChange} className="btn btn-outline-dark">
            Apply Filters
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-close btn-danger" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-filters-container">
          <div className="filter-section">
            <label>Price range:</label>
            <Range
              min={600}
              max={30000}
              value={[priceRange.min, priceRange.max]}
              onChange={handlePriceRangeChange}
              allowCross={false}
            />
            <div className="range-inputs">
              <input type="number" value={priceRange.min} onChange={handleMinInputChange} />
              <span>-</span>
              <input type="number" value={priceRange.max} onChange={handleMaxInputChange} />
            </div>
          </div>

          <div className="filter-section">
            <label>Property Type:</label>
            <div className="icon-box">
              {propertyTypeOptions.map((options) => (
                <div
                  key={options.value}
                  className={`selectable-box ${propertyType === options.value ? "selected" : ""}`}
                  onClick={() => handlePropertyTypeChange(options.value)}
                >
                  <span className="material-icons">{options.icon}</span>
                  <span>{options.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Room Type:</label>
            <div className="icon-box">
              {roomTypeOptions.map((options) => (
                <div
                  key={options.value}
                  className={`selectable-box ${roomType === options.value ? "selected" : ""}`}
                  onClick={() => handleRoomTypeChange(options.value)}
                >
                  <span className="material-icons">{options.icon}</span>
                  <span>{options.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Amenities</label>
            <div className="amenities-checkboxes">
              {amenitiesOptions.map((option) => (
                <div key={option.value} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={amenities.includes(option.value)}
                    onChange={() => handleAmenitiesChange(option.value)}
                  />
                  <span className="material-icons amenitieslabel">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClearFilters}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FilterModal.propTypes = {
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterModal;
