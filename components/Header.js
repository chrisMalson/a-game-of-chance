import Link from "next/link";
import { Typography } from "@material-ui/core";

const Header = () => {
  return (
    <Link href="/">
      <a>
        <Typography variant="h2" align="center" gutterBottom>
          A Game of Chance
        </Typography>
      </a>
    </Link>
  );
};

export default Header;
