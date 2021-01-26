import { useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { GridList, GridListTile, ListSubheader } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";

import {
  CORE_COUNTRY_QUERY,
  CountryResponse,
  useStyles,
} from "./components/constants";
import CountryTileBar from "./components/country-tile-bar";

const App = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` }); // could add more breakpoints if required
  const [isBottom, setIsBottom] = useState(false);

  const { loading, error, data, fetchMore } = useQuery<CountryResponse>(
    CORE_COUNTRY_QUERY,
    { variables: { offset: 0 } }
  );

  const classes = useStyles();
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document?.scrollingElement?.scrollHeight
    ) {
      setIsBottom(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    return () => {
      window.removeEventListener("scroll", loadMore);
    };
  }, [data]);

  useEffect(() => {
    if (isBottom && data) {
      setIsBottom(false);
      fetchMore({ variables: { offset: data.Country.length ?? 0 } });
    }
  }, [data, isBottom, fetchMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={180}
        className={classes.gridList}
        cols={isMobile ? 1 : 3}
      >
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
      {/* {data?.Country && (
        <Button onClick={() => setIsBottom(true)}>Load More</Button> //alternate option (would make function a const)
      )} */}
      {/* Could also add a fetch more loading state here with more time */}
    </div>
  );
};

export default App;
