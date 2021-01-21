import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import {
  GridList,
  GridListTile,
  ListSubheader,
  GridListTileBar,
  IconButton,
  withStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

import { CountryResponse, useStyles } from "./components/constants";

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

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

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
            <GridListTileBar
              title={tile.name}
              subtitle={
                <>
                  <div>Capital: {tile.capital}</div>
                  <div>Population: {tile.population}</div>
                </>
              }
              actionIcon={
                <HtmlTooltip
                  title={
                    <>
                      <Typography color="inherit">Languages</Typography>
                      {tile.officialLanguages.map((language, index) => {
                        if (index > 4) return null;
                        return <div>{language.name}</div>;
                      })}
                    </>
                  }
                >
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                </HtmlTooltip>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default App;
