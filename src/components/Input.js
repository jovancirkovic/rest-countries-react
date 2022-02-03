import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Countries from "./Countries";
import styles from "./Input.module.css";
import { FaSearch } from "react-icons/fa";

const Input = (props) => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});

  const navigate = useNavigate();

  const regionHandler = useCallback(async (region = "europe") => {
    if (region.length === 0) {
      return;
    }
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const countriesData = data.map((countrie) => {
        return {
          id: countrie.name.common.toLowerCase(),
          flag: countrie.flags.svg,
          name: countrie.name.common,
          population: countrie.population.toLocaleString("en-US"),
          region: countrie.region,
          capital: countrie.capital,
        };
      });
      setCountries(countriesData);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    regionHandler();
  }, [regionHandler]);

  setTimeout(() => {}, 1000);

  const nameHandler = async (name) => {
    if (name.trim().length === 0 || name.trim().length <= 3) {
      return;
    }

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      if (!response.ok) {
        throw new Error("No country with that name! Please search another");
      }

      const data = await response.json();
      console.log(data);

      const countryData = {
        id: data[0].name.common.toLowerCase(),
        flag: data[0].flags.svg,
        name: data[0].name.common,
        population: data[0].population.toLocaleString("en-US"),
        native: Object.values(data[0].name.nativeName)[0].common,
        region: data[0].region,
        subRegion: data[0].subregion,
        capital: data[0].capital,
        topLevelDomain: data[0].tld,
        currencies: Object.values(data[0].currencies)[0].name,
        languages: Object.values(data[0].languages),
      };
      setCountry(countryData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (country.name === undefined) {
      return;
    }

    navigate(`/country/${country.name}`);
  };

  useEffect(() => {
    props.onNameHandler(country);
  }, [country, props]);

  const classesInput = props.isClicked
    ? `${styles.light_input} ${styles.input}`
    : `${styles.input}`;

  const classesSelect = props.isClicked
    ? `${styles.light_select}`
    : `${styles.select_dropdwn}`;

  return (
    <Layout>
      <form onSubmit={submitHandler}>
        <div className={styles.container}>
          <div className={classesInput}>
            <FaSearch />
            <input
              style={props.isClicked ? { color: "#000" } : { color: "#fff" }}
              type="text"
              placeholder="Search for a country..."
              onChange={(e) => nameHandler(e.target.value)}
            />
          </div>
          <div className={styles.select}>
            <select
              className={classesSelect}
              name="select"
              id="select"
              onChange={(e) => regionHandler(e.target.value)}
            >
              <option value="">Filter By Region</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Americas">Americas</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
        <Countries countries={countries} isClicked={props.isClicked} />
      </form>
    </Layout>
  );
};

export default Input;
