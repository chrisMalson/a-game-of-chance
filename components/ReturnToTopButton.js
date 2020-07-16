import { Button } from "@material-ui/core";

const ReturnToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button fullWidth variant="contained" onClick={scrollToTop}>
      Return To Top
    </Button>
  );
};

export default ReturnToTopButton;
