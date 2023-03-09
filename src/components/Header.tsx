import React from 'react'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import logo from '../static/picture/logo.png'
import './Header.css'

import { Select, Message, Button, Space } from '@arco-design/web-react';


interface Props {
  dark: boolean
}


const Option = Select.Option;
const options = ['中文', 'English'];


const Header: React.FC<Props> = ({ dark }) => {
  const theme = () => {
    return dark? 'header-text' : 'header-text-dark'
  }
  return (
    <header className="flex items-center w-full justify-center fixed text-xl z-50">
      <div className="max-w-6xl w-full flex justify-between p-6">
        <div className="flex items-center" style={{color: 'white'}}>
          <img src={logo} className="object-cover z-20 w-6 mr-4" alt="logo" />
          <span style={{fontSize: '1rem'}} className={theme()}>克莱克特</span>
        </div>

        <div>
          <Link activeClass="active" to="product" spy={true} smooth={true} duration={250}>
            <a className={`anchor-normal ${theme()}`} href="#product">产品</a>
          </Link>
          
          <Link activeClass="active" to="about" spy={true} smooth={true} duration={250}>
            <a className={`anchor-normal ${theme()}`} href='#about'>关于我们</a>
          </Link>
          
          <Link activeClass="active" to="join" spy={true} smooth={true} duration={250}>
          <a className={`anchor-normal ${theme()}`} href='#join'>加入我们</a>
          </Link>
          
          <Select
            placeholder='语言/lang'
            defaultValue='中文'
            style={{ width: 100 }}
            className={theme()}
            onChange={(value) =>
              Message.info({
                content: `You select ${value}.`,
                showIcon: true,
              })
            }
          >
            {options.map((option, index) => (
              <Option key={option} disabled={index === 3} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </header>
  );
};

export default Header
