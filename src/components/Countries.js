import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import styles from "./Countries.module.css";

const Countries = (props) => {
  const classes = props.isClicked
    ? `${styles.card} ${styles.light_card}`
    : `${styles.card}`;

  return (
    <Layout className={styles.countries}>
      {props.countries.map((countrie) => {
        return (
          <Link to={`/country/${countrie.name}`} key={countrie.id}>
            <div className={classes}>
              <img src={countrie.flag} alt="" />
              <div className={styles.info}>
                <h4>{countrie.name}</h4>
                <p>
                  <strong>Population:</strong> {countrie.population}
                </p>
                <p>
                  <strong>Region:</strong> {countrie.region}
                </p>
                <p>
                  <strong>Capital:</strong> {countrie.capital}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </Layout>
  );
};

export default Countries;
