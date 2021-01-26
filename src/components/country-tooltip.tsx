import React from "react";
import { withStyles, Tooltip, Typography } from "@material-ui/core";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

interface CountryTooltipProps {
  languages: ReadonlyArray<{ name: string }>;
  children: React.ReactElement;
}

const CountryTooltip = ({ languages, children }: CountryTooltipProps) => (
  <HtmlTooltip
    title={
      <>
        <Typography color="inherit">Languages</Typography>
        {languages.map((language, index) => {
          if (index > 4) return null;
          return <div key={index}>{language.name}</div>;
        })}
      </>
    }
  >
    {children}
  </HtmlTooltip>
);

export default CountryTooltip;
