import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { categories } from "../data/videos";
import { selectCategory } from "../utils/appSlice";
export default function ButtonList() {
  const category = useSelector((state) => state.app.category);
  const dispatch = useDispatch();
  return (
    <div className="categories" aria-label="Video categories">
      {categories.map((name) => (
        <Button
          key={name}
          name={name}
          selected={category === name}
          onClick={() => dispatch(selectCategory(name))}
        />
      ))}
    </div>
  );
}
