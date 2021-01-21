import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { GridList, GridListTile, ListSubheader } from "@material-ui/core";

import { CountryResponse, useStyles } from "./components/constants";
import CountryTileBar from "./components/country-tile-bar";

const CORE_COUNTRY_QUERY = gql`
  {
    Country {
      name
      population
      capital
      flag {
        svgFile
      }
      officialLanguages {
        name
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery<CountryResponse>(
    CORE_COUNTRY_QUERY
  );
  const classes = useStyles();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={3}>
        <GridListTile key="Subheader" cols={3}>
          <ListSubheader component="div">Country Info</ListSubheader>
        </GridListTile>
        {data?.Country.map((tile) => (
          <GridListTile key={tile.flag.svgFile}>
            <img src={tile.flag.svgFile} alt={tile.name} />

            <CountryTileBar country={tile} classes={classes} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default App;
