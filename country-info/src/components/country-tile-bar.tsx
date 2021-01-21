import React from "react";
import { CountryDatum } from "./constants";
import { GridListTileBar, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import CountryTooltip from "./country-tooltip";

interface CountryTileProps {
  country: CountryDatum;
  classes: Record<"root" | "icon" | "gridList", string>;
}

const CountryTileBar = ({ country, classes }: CountryTileProps) => (
  <GridListTileBar
    title={country.name}
    subtitle={
      <>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
      </>
    }
    actionIcon={
      <CountryTooltip languages={country.officialLanguages}>
        <IconButton className={classes.icon}>
          <InfoIcon />
        </IconButton>
      </CountryTooltip>
    }
  />
);

export default CountryTileBar;
