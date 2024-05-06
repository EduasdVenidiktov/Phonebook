import css from "./Loader.module.css";
const Loader = () => (
  <div className={css.containerLoader}>
    <div className={css.loader}>
      <div className={css.loaderBefore}></div>
      <div className={css.loaderAfter}></div>
    </div>
  </div>
);

export default Loader;
