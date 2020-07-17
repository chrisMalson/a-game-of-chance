import { Button, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const ReturnToTopButton = () => {
  const theme = useTheme();
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
        <Button fullWidth variant="contained" onClick={scrollToTop}>
          Return To Top
        </Button>
      )}
    </>
  );
};

export default ReturnToTopButton;
