import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { injectIntl, intlShape } from 'react-intl';

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from '@material-ui/core/IconButton';
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import grey from "@material-ui/core/colors/grey";

import { ArrowLeft } from 'react-feather';


const styles = {
  list: {
    width: "150px",
  },
  drawer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    color: grey[800],
  },
};

// inject history because for some reason react-router <Link> component does
// not work in MenuItems
const listItems = [
  { route: "/", label: "global.home" },
  { route: "/map", label: "global.map" },
  { route: "/about", label: "global.about" },  
];

const SideList = withRouter(({ history, classes, toggleDrawer, intl }) =>
  <div className={classes.list}>
    {listItems.map((item, index) => 
      <div key={index}>
      <MenuItem
        onClick={() => {
          history.push(item.route);
          toggleDrawer(false);
        }}
      >
        {intl.formatMessage({"id": item.label})}
      </MenuItem>
      <Divider />
      </div>
    )}
    </div>
);


class SideDrawer extends Component {
  render() {
    const { classes, open, toggleDrawer, intl } = this.props;

    const handleClose = event => {toggleDrawer(false)};

    return (
      <div>
        <Drawer className={classes.drawer} open={open} onClose={handleClose}>
          <IconButton
            className={classes.backButton}
            aria-label="Back"
            onClick={handleClose}
          >
            <ArrowLeft />
          </IconButton>
          <Divider />
          <SideList toggleDrawer={toggleDrawer} classes={classes} intl={intl} />
        </Drawer>
      </div>
    );
  }
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.any,
  intl: intlShape,
};

export default withStyles(styles)(injectIntl(SideDrawer));
