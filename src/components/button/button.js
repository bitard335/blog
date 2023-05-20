import classNames from 'classnames';

import cl from './button.module.scss';

const Button = (props) => {
  const { children, small, red, green, blue, bordered, onClick, style } = props;
  const buttonClass = classNames(cl.button, {
    [cl.button__green]: green,
    [cl.button__blue]: blue,
    [cl.button__red]: red,
    [cl.button__small]: small,
    [cl.button__bordered]: bordered,
  });

  return (
    <button className={buttonClass} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
