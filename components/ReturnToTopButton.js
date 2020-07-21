import { Button, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.common.black,
    fontWeight: 1000,
    borderRadius: 0,
  },
}));

// button that returns users to the top of the page when clicked, for mobile UX
const ReturnToTopButton = () => {
  const theme = useTheme();
  const { button } = useStyles();
  const isBelowXsBreakpoint = useMediaQuery(theme.breakpoints.down("xs"));

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isBelowXsBreakpoint && (
        <Button
          className={button}
          fullWidth
          variant="contained"
          color="secondary"
          onClick={scrollToTop}
        >
          Return To Top
        </Button>
      )}
    </>
  );
};

export default ReturnToTopButton;
