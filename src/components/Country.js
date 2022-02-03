import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";
import styles from "./Country.module.css";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaHome } from "react-icons/fa";

const Country = (props) => {
  const navigate = useNavigate();

  const [country, setCountry] = useState(props.country);

  const { name } = useParams();
  console.log(name);

  const backButton = () => {
    navigate(-1);
  };

  const homeButton = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = await response.json();

      const borders = data[0].borders;
      let bordersArray = [];

      if (borders) {
        for (let border of borders) {
          const responseBorders = await fetch(
            `https://restcountries.com/v3.1/alpha/${border}`
          );

          const dataBorders = await responseBorders.json();

          bordersArray.push(dataBorders);
        }
      }

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
        languages: `${Object.values(data[0].languages)}`,
        borderCountries: bordersArray,
      };
      setCountry(countryData);
    };

    fetchCountries();
  }, [name]);

  console.log(country);

  const backHomeStyles = props.isClicked
    ? `${styles.light_back} ${styles.back}`
    : `${styles.back}`;

  const infoStyles = props.isClicked
    ? `${styles.light_info}`
    : `${styles.info_container}`;

  const bordersStyles = props.isClicked
    ? `${styles.light_border} ${styles.borders}`
    : `${styles.borders}`;

  return (
    <Layout>
      <div className={styles.buttons}>
        <button className={backHomeStyles} onClick={backButton}>
          <HiArrowNarrowLeft />
          Back
        </button>
        <button className={backHomeStyles} onClick={homeButton}>
          <FaHome />
          Home
        </button>
      </div>
      <div className={styles.country_info}>
        <div className={styles.flag}>
          <img src={country.flag} alt="" />
        </div>
        <div className={infoStyles}>
          <h3>{country.name}</h3>
          <div className={styles.info}>
            <div className={styles.column1}>
              <p>
                <strong>Population: </strong>
                {country.population}
              </p>
              <p>
                <strong>Nativ Name: </strong>
                {country.native}
              </p>
              <p>
                <strong>Region: </strong>
                {country.region}
              </p>
              <p>
                <strong>Sub Region: </strong>
                {country.subRegion}
              </p>
              <p>
                <strong>Capital: </strong>
                {country.capital}
              </p>
            </div>
            <div className={styles.column2}>
              <p>
                <strong>Top Level Domain: </strong>
                {country.topLevelDomain}
              </p>
              <p>
                <strong>Currencies: </strong>
                {country.currencies}
              </p>
              <p>
                <strong>Languages: </strong>
                {country.languages}
              </p>
            </div>
          </div>
          <div className={styles.borders_container}>
            <h4>Border Countries:</h4>
            <div className={bordersStyles}>
              {country.borderCountries && country.borderCountries.length !== 0
                ? country.borderCountries.map((border) => {
                    return (
                      <Link
                        key={border[0].name.common}
                        to={`/country/${border[0].name.common}`}
                      >
                        <div
                          style={{
                            color: `${props.isClicked ? "#000" : "#fff"}`,
                          }}
                          className={styles.border}
                        >
                          {border[0].name.common}
                        </div>
                      </Link>
                    );
                  })
                : "No borders found!"}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;
