import { useEffect, useRef, useState } from "react";
import c from "./SelectTypeSearch.module.scss";

export default ({ options, curValue, handleChange, theme }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootEl = useRef(null);

  const closeSelect = (e: any) => {
    // @ts-ignore
    if (rootEl.current && !rootEl.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  }

  useEffect(() => {
    document.addEventListener('click', closeSelect);

    return () => {
      document.removeEventListener('click', closeSelect);
    }
  }, [])

  const handleClickItem = (idx: any) => {
    setIsOpen(false);
    handleChange(idx);
  }

  const selectClasses = [c['select']];
  if (theme === 'dark') selectClasses.push(c['dark'])
  if (isOpen) selectClasses.push(c['open']);

  return (
    <div className={selectClasses.join(' ')} onClick={e => e.stopPropagation()}>
      <div className={c['select-toggle']} onClick={handleToggle} />
      {
        isOpen &&
        <ul className={c['select-items']} ref={rootEl}>
          {
            options.map(({label}: any, i: any) => {
              return (
                <li
                  key={i}
                  onClick={() => handleClickItem(i)}
                  className={(curValue === i) ? c['active'] : ''}>{label}</li>
              )
            })
          }
        </ul>
      }
    </div>
  );
}
