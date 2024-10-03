import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { nanoid } from "nanoid";
import { TbCurrentLocation } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { LuLoader2 } from "react-icons/lu";

import PhotographerList from "./PhotographerList";
import { GLOBAL_CATEGORIES } from "../../apis/apiUrls";
import { getApiWithAuth } from "../../apis/index";
import { formatCategoryName } from "../../helper/helper";
import "leaflet/dist/leaflet.css";
import "./Location.css";

export default function Location() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.get("searchType");

  const [coordinates, setCoordinates] = useState([47.6062, -122.3321]);
  const [locationName, setLocationName] = useState("");
  const [photographerName, setPhotographerName] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [photographers, setPhotographers] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formattedCategories, setFormattedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const SetViewOnChange = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 13);
    return null;
  };

  const fetchCoordinates = async (locationName) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setCoordinates([lat, lon]);
      return { lat, lon };
    } else {
      console.log("Location not found");
      return null;
    }
  };

  const handleSearchByLocation = async () => {
    setLoading(true);
    const coords = await fetchCoordinates(locationName);
    if (coords) {
      const { lat, lon } = coords;
      const url = `customers/search_photographer?start_date=${encodeURIComponent(
        startDate
      )}&end_date=${encodeURIComponent(
        endDate
      )}&latitude=${lat}&longitude=${lon}`;
      const res = await getApiWithAuth(url);
      if (res.success) {
        console.log(res);
        setIsSearched(true); setPhotographers(res.data);
        setCoordinates([lat, lon]);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Error fetching photographers: ", res.data);
      }
    }
  };

  const handleSearchByCategory = async (unformattedCategory) => {
    setLoading(true);
    const url = `/customers/photographer_by_category?search[]=${unformattedCategory}`;
    const res = await getApiWithAuth(url);
    if (res.success) {
      setPhotographers(res.data.data);
    } else {
      console.error("Error fetching photographers: ", res.data);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await getApiWithAuth(GLOBAL_CATEGORIES);
    if (res.success) {
      const formattedCategories = res.data.data.map((cat) => ({
        formatted: formatCategoryName(cat),
        unformatted: cat,
      }));
      setCategories(formattedCategories);
      setFormattedCategories(
        res.data.data.map((cat) => formatCategoryName(cat))
      );
    } else {
      console.error("Error fetching categories: ", res.data);
    }
  };

  const handleSearchByName = async (e) => {
    const nameToSearch = e.target.value;
    setPhotographerName(nameToSearch);
    setLoading(true);
    try {
      const url = `/customers/photographer_by_name?search=${photographerName}`;
      const res = await getApiWithAuth(url);
      if (res.success) {
        setPhotographers(res.data.data);
        setIsSearched(true);
        console.log('photographers', photographers);
      } else {
        console.error("Error fetching photographers: ", res.data);
      }
    } catch (error) {
      console.error("API request failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchType === "category" || searchType === "location") {
      fetchCategories();
    }
  }, [searchType]);

  return (
    <div className="location-page">
      <div
        className="search-container flex"
        style={
          isSearched || searchType === "name" || searchType === "category"
            ? { backgroundColor: "white" }
            : null
        }
      >
        {searchType === "location" && !isSearched && (
          <>
            <div className="search flex">
              <div className="input--group flex">
                <IoIosArrowBack />
                <input
                  type="text"
                  placeholder="Find for Photographers"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                />
              </div>
              <div
                className="loc-div"
                onClick={loading ? null : handleSearchByLocation}
                style={loading ? { cursor: "not-allowed" } : null}
              >
                {loading ? (
                  <LuLoader2 className="loader" />
                ) : (
                  <TbCurrentLocation />
                )}
              </div>
            </div>
            <div className="date-container flex">
              <input
                className="date-group"
                type="date"
                placeholder="From"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                className="date-group"
                type="date"
                placeholder="To"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </>
        )}

        {searchType === 'name' &&
          <>
            <div className='search flex name'>
              <input
                type="text"
                placeholder='Search Photographer By Name'
                value={photographerName}
                onChange={handleSearchByName}
              />
              <IoSearchOutline onClick={handleSearchByName} style={{ cursor: 'pointer' }} />
            </div>
            <div className='msg' style={isSearched ? { margin: '0', display: 'none' } : { margin: '70% auto' }}>
              {loading ? <LuLoader2 className="loader" /> :
                <>
                  {isSearched ? null : <h3>Enter name of photographer to list photographers</h3>}
                </>
              }
            </div>
          </>
        }

        {searchType === "category" && (
          <div className="search-by-category flex">
            <select
              value={category}
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (cat) => cat.formatted === e.target.value
                );
                setCategory(
                  selectedCategory ? selectedCategory.unformatted : ""
                );
                handleSearchByCategory(selectedCategory.unformatted);
              }}
            >
              <option value="">Select Category</option>
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <option key={index} value={cat.formatted}>
                    {cat.formatted}
                  </option>
                ))
              ) : (
                <option value="">No categories available</option>
              )}
            </select>
          </div>
        )}

        <>
          {isSearched &&
            <PhotographerList
              location={locationName}
              photographers={photographers}
              searchType={searchType}
              category={category}
              isSearched={isSearched}
              setCategory={setCategory}
              categories={formattedCategories}
            />
          }
        </>

      </div>

      <MapContainer
        center={coordinates}
        zoom={13}
        style={{
          minHeight: "125vh",
          width: "100%",
          borderRadius: "15px",
          border: "none",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {searchType === "location" && (
          <>
            {photographers.map((photographer) => (
              <Marker
                key={nanoid()}
                position={[photographer.latitude, photographer.longitude]}
              />
            ))}
          </>
        )}
        <SetViewOnChange coords={coordinates} />
      </MapContainer>
    </div>
  );
}