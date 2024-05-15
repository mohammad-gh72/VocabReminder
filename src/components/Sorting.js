import sortingStyle from "../styles-modules/SortingStyle.module.css";

export default function Sorting({ sorted, setSorted }) {
  return (
    <div className={sortingStyle.selectorList__container}>
      <select
        value={sorted}
        onChange={(e) => {
          setSorted(e.target.value); // we did controled element technique here
          //for updating the value of (sorted) state that has been located
          //in App component so then base on it changes we can do some fuctionalitys
          //to sort the list of our cards
          //(we change the sorted value between value="normal" and  value="checked" )
          //so basicly between 'normal' and 'checked'
        }}
      >
        <option value="normal">All</option>
        <option value="pinned">Pinned</option>
      </select>
    </div>
  );
}
