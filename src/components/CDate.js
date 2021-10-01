import classes from "./CDate.module.css";

const CDate = (props) => {
  const date = new Date();
  const month = date.toLocaleString("en-US", { month: "long" });
  const days = date.toLocaleString("en-US", { day: "2-digit" });


  return (
    <div>
      <div className={classes.day}>
        <div className={classes.city}>{props.location}</div>
        {days} {month}
      </div>
    </div>
  );
};

export default CDate;
