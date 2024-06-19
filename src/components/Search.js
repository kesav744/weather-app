import { useState } from "react";
import "./Search.css";
import Button from "../re-use/Button";
import { Autocomplete, TextField } from "@mui/material";
import { styled } from "@mui/system";

const CustomAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-endAdornment": {
    display: "none",
    borderColor: "#ffff",
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
 "& .MuiInputLabel-root": {
      color: "#fff", // Label color
    },
  "& .MuiInputBase-root": {
    borderColor: "#ffff",

    "& fieldset": {
      borderColor: "#fff", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "#fff", // Default border color
      // Hover border color
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff", // Default border color
      // Focused border color
    },
    
  },
});

const Search = ({ fetchWeather }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city !== "" && city.trim() !== "") {
      fetchWeather(city);
      localStorage.setItem("lastCity", city);
    } else {
      alert("Please enter a correct city name...");
    }
    setCity("");
  };
  const recent = localStorage.getItem("lastCity");
  return (
    <div className="search">
      <div>
        {/* <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        /> */}

        <CustomAutocomplete
          id="combo-box-demo"
          freeSolo
          value={city}
          options={recent === null ? [] : [recent]}
          sx={{ width: 300 }}
          onInputChange={(e, value) => {
            if (e === null) {
              value = "";
            }
            setCity(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search City" />
          )}
        />
        {/* {localStorage.getItem("lastCity") && (
          <span
            className="suggest"
            onClick={() => {
              setCity(localStorage.getItem("lastCity"));
            }}
          >
            {localStorage.getItem("lastCity")}
          </span>
        )} */}
      </div>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default Search;
