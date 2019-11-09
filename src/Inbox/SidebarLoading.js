import React from 'react';

import { CircularProgress, Grid } from "@material-ui/core";

export default function SidebarLoading() {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "100%" }}
    >
      <CircularProgress/>
    </Grid>
  )
}