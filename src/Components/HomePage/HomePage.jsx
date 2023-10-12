import "./HomePage.css";
import { useState, useEffect } from "react";
import { WORK_DATA, CATEGORIES, SUB_CATEGORIES } from "../../utils/data";

const Homepage = () => {
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES[0]);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [currentData, setCurrentData] = useState(WORK_DATA);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (currentCategory === CATEGORIES[0]) setCurrentData(WORK_DATA);
    else {
      const data = WORK_DATA.filter((item) => {
        if (currentSubCategory) {
          return (
            item.category === currentCategory.value &&
            item.type === currentSubCategory.toLowerCase()
          );
        } else {
          return item.category === currentCategory.value;
        }
      });
      setCurrentData(data);
    }
  }, [currentCategory, currentSubCategory]);

  return (
    <div className="container">
      <div className="upper-div">
        {CATEGORIES.map((item, id) => {
          return (
            <div
              className={`upper-div-item ${
                item === currentCategory ? "current-item" : ""
              }`}
              key={id}
              onClick={() => {
                setCurrentCategory(CATEGORIES[id]);
                setCurrentSubCategory(null);
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      {currentCategory && currentCategory !== CATEGORIES[0] && (
        <ul className="middle-div">
          {SUB_CATEGORIES?.map((item, id) => (
            <li
              className={`middle-div-item ${
                item === currentSubCategory ? "current-sub-item" : ""
              }`}
              key={id}
              onClick={() => {
                setCurrentSubCategory(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="display-div">
        <div className="display-right-div">
          <div
            className={toggle ? "current-toggle" : "disable-toggle"}
            onClick={() => setToggle(true)}
          >
            List
          </div>
          <div
            className={toggle ? "disable-toggle" : "current-toggle"}
            onClick={() => setToggle(false)}
          >
            Grid
          </div>
        </div>
      </div>
      <div className={toggle ? "lower-div" : "grid-container"}>
        {currentData.map((item, id) => {
          return (
            <>
              {toggle ? (
                <div className="lower-div-item">
                  <div>{item.year}</div>
                  <div>{item.name}</div>
                  <img
                    src="/media/work-img-2.jpg"
                    alt={item.name}
                    className="image-reveal"
                  />
                </div>
              ) : (
                <div className="grid-item">
                  <img
                    src="/media/work-img-2.jpg"
                    alt={item.name}
                    className="image-div"
                  />

                  <div className="lower-img-text">
                    <div>{item.name}</div>
                    <div>{item.year}</div>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
