import React, { useState } from "react";
import axios from "axios";
import {
  withStyles,
  MuiExpansionPanel,
  MuiExpansionPanelSummary,
  MuiExpansionPanelDetails,
  Typography
} from "@material-ui/core";

import "./App.css";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

const App = () => {
  /**
   * state
   */
  const [searchValue, setSearchValue] = useState("");
  const [pcIssiueList, setPcIssiueList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = React.useState(id);

  /**
   * Actions
   */

  const getPcIssiues = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(`/pc_issues?description=${searchValue}`);

      setPcIssiueList(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    setSearchValue("");
    getPcIssiues();
  };

  const hanldePanelChange = panel => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Search for problem</h2>
        <TextField
          id="search"
          value={searchValue}
          label="search"
          name="search"
          onChange={value => setSearchValue(value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      {isLoading
        ? "Loading..."
        : pcIssiueList.map(issue => (
            <ExpansionPanel
              key={issue.id}
              square
              expanded={expanded === "panel1"}
              onChange={hanldePanelChange(issue.id)}
            >
              <ExpansionPanelSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>{issue.symptom}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {issue.solutions.map(solution => (
                  <Typography key={solution}>{solution}</Typography>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
    </div>
  );
};

export default withStyles(App);
