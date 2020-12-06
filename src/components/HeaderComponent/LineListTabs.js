import React, { useEffect } from 'react';
import sizeMe from 'react-sizeme';

import Tab from './Tab';

import s from './HeaderComponent.module.scss';

// class LineListTabs extends React.Component {
//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.width !== this.props.size.width)
//       this.props.getComponentWidth(this.props.size.width);
//   }

//   render() {
//     const { tabsList, stylePosition } = this.props;
//     return (
//       <ul className={s.lineListTabs} style={{ left: stylePosition }}>
//         {tabsList.map(({ name, path }, idx) => {
//           return <Tab key={name} name={name} path={path} idx={idx} />;
//         })}
//       </ul>
//     );
//   }
// }

function LineListTabs({ tabsList, stylePosition, size, getComponentWidth }) {
  useEffect(() => {
    getComponentWidth(size.width);
  }, [getComponentWidth, size]);

  return (
    <ul className={s.lineListTabs} style={{ left: stylePosition }}>
      {tabsList.map(({ name, path }, idx) => {
        return <Tab key={name} name={name} path={path} idx={idx} />;
      })}
    </ul>
  );
}

export default sizeMe({ monitorHeight: true })(LineListTabs);
