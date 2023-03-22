import TopTitle from "./organisms/TopTitle";
import VietNamMap from "./organisms/VietNamMap"; // components

// others
import classes from "./Home.module.scss";

/**
 * HomePage
 */
export default function HomePage() {
  return (
    <div className={classes.root}>
      <TopTitle />
      <VietNamMap />
    </div>
  );
}
