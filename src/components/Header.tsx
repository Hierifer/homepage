import React from 'react'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import logo from '../static/picture/logo.png'
import './Header.css'

import { Select, Message, Button, Space } from '@arco-design/web-react';


interface Props {
  dark: boolean,
  lang: string,
  setLang: Function,
  activeTab: string,
  setActiveTab: Function
}

const Option = Select.Option;
const options = [
  {text: '中文',  value: 'cn'}, 
  {text: 'English', value: 'en'}
];


const Header: React.FC<Props> = ({ dark, lang, setLang, activeTab, setActiveTab }) => {
  const l :{[key: string]: {[key:string]: string}} = {
    'title' : {'cn': '克莱克特', 'en': 'Connect'},
    'product' : {'cn': '产品', 'en': 'Product'},
    'about' : {'cn': '关于我们', 'en': 'About'},
    'career' : {'cn': '加入我们', 'en': 'Career'},
  }

  const theme = () => {
    return dark? 'header-text' : 'header-text-dark'
  }
  const theme_bg = () => {
    return dark? 'header-bg' : 'header-bg-dark'
  }
  const theme_tab = (cur: string) => {
    return cur === activeTab? 'tab-active' : ''
  }
  return (
    <header className={`flex items-center w-full justify-center text-xl z-50 ${theme_bg()}`} style={{mixBlendMode: 'revert'}}>
      <div className="max-w-6xl w-full flex justify-between p-6">
        <div className="flex items-center" style={{color: 'white'}}>
          <img src={logo} className="object-cover z-20 w-6 mr-4" alt="logo" />
          <span style={{fontSize: '1rem', fontWeight: 500}} className={theme()}>{l.title[lang]}</span>
        </div>

        <div>
          <Link activeClass="active" to="product" spy={true} smooth={true} duration={250}>
            <a className={`anchor-normal ${theme()} ${theme_tab('product')}`} href="#product">{l.product[lang]}</a>
          </Link>
          
          <Link activeClass="active" to="about" spy={true} smooth={true} duration={250}>
            <a className={`anchor-normal ${theme()} ${theme_tab('about')}`} href='#about'>{l.about[lang]}</a>
          </Link>
          
          <Link activeClass="active" to="join" spy={true} smooth={true} duration={250}>
            <a className={`anchor-normal ${theme()} ${theme_tab('join')}`} href='#join'>{l.career[lang]}</a>
          </Link>
          
          <Select
            placeholder='语言/lang'
            defaultValue='中文'
            style={{ width: 100 }}
            className={theme()}
            onChange={(value) =>
              setLang(value)
            }
          >
            {options.map((option, index) => (
              <Option key={option.text} disabled={index === 3} value={option.value}>
                {option.text}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </header>
  );
};

export default Header
