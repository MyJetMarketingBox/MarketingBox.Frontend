import { useEffect, useState } from "react";
import c from "./SelectTypeSearch.module.css";

export default ({ options, curValue, handleChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSelect = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  }

  useEffect(() => {
    document.body.addEventListener('click', closeSelect);

    return () => {
      document.body.removeEventListener('click', closeSelect);
    }
  }, [])

  const handleClickItem = (idx: any) => {
    closeSelect();
    handleChange(idx);
  }

  return (
    <div className={c['select']} onClick={e => e.stopPropagation()}>
      <div className={c['select-toggle']} onClick={handleToggle}>V</div>
      {
        isOpen &&
        <ul className={c['select-items']}>
          {
            options.map(({label}: any, i: any) => {
              return (
                <li
                  key={i}
                  onClick={() => handleClickItem(i)}
                  className={(curValue === i) ? 'active' : ''}>{label}</li>
              )
            })
          }
        </ul>
      }
    </div>
  );
}
