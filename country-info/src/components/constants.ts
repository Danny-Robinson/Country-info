import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {},
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export interface CountryDatum {
  name: string;
  population: number;
  capital: string;
  flag: {
    svgFile: string;
  };
  officialLanguages: ReadonlyArray<{
    name: string;
  }>;
}

export interface CountryResponse {
  Country: ReadonlyArray<CountryDatum>;
}
