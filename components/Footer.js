import { Box, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ReturnToTopButton from "./ReturnToTopButton";

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",
    padding: "1rem",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  footerWrapper: {
    marginTop: "30px",
  },
}));

const Footer = () => {
  const { footer, footerWrapper } = useStyles();

  return (
    <Box className={footerWrapper}>
      <ReturnToTopButton />
      <Box className={footer}>
        <Typography variant="body1">
          This site was created by{" "}
          <Link
            color="inherit"
            href="https://github.com/chrisMalson"
            target="_blank"
          >
            Chris Malson
          </Link>
          .
        </Typography>
        <Typography variant="body1">
          Video game data provided by{" "}
          <Link color="inherit" href="https://rawg.io/" target="_blank">
            RAWG
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
