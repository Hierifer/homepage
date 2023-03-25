import React, { useState }  from 'react'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import logo from '../static/picture/logo.png'
import './Header.css'

import { Select,  Drawer, Message, Button, Space, Radio} from '@arco-design/web-react';
import { IconMenu } from '@arco-design/web-react/icon';


interface Props {
  dark: boolean,
  lang: string,
  setLang: Function,
  activeTab: string,
  setActiveTab: Function
}

const RadioGroup = Radio.Group;
const Option = Select.Option;
const options = [
  {text: '中文',  value: 'cn'}, 
  {text: 'English', value: 'en'}
];


const Header: React.FC<Props> = ({ dark, lang, setLang, activeTab, setActiveTab }) => {
  const l :{[key: string]: {[key:string]: string}} = {
    'title' : {'cn': '克莱克特', 'en': 'Collect'},
    'product' : {'cn': '产品', 'en': 'Product'},
    'about' : {'cn': '关于我们', 'en': 'About'},
    'career' : {'cn': '加入我们', 'en': 'Career'},
  }
  const [visible, setVisible] = useState(false);
  const theme = () => {
    return dark? 'header-text' : 'header-text-dark'
  }
  const theme_bg = () => {
    return dark? 'header-bg' : 'header-bg-dark'
  }
  const theme_tab = (cur: string) => {
    return cur === activeTab? 'tab-active' : ''
  }
  const smallScreen = () => {
    return window.innerWidth < 800
  }
  return (
    <header className={`flex items-center w-full justify-center text-xl z-50 ${theme_bg()}`} style={{mixBlendMode: 'revert'}}>
      <div className="max-w-6xl w-full flex justify-between p-6">
        <div className="flex items-center text-white">
          <img src={logo} className="object-cover z-20 w-6 mr-4" alt="logo" />
          <span style={{fontSize: '1rem', fontWeight: 500}} className={theme()}>{l.title[lang]}</span>
        </div>

        <div style={{display: (smallScreen()? 'none' : 'display')}}>
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

        <div style={{display: (smallScreen()? 'display' : 'none')}}>
          <Button 
            type='text' 
            onClick={() => {
              setVisible(true);
            }} 
            icon={<IconMenu/>}
            style={{color: dark? 'rgb(var(--gray-2))' : 'rgb(var(--gray-7))'}}
          />
          <Drawer
            placement="bottom"
            visible={visible}
            footer={null}
            onCancel={() => {setVisible(false)}}
            headerStyle={{display: 'none'}}
            bodyStyle={{background: 'rgb(--blue-8)'}}
            height={500}
          >
            <div className="flex flex-col">
              <Link activeClass="active" to="product" spy={true} smooth={true} duration={250}>
                <a className='relative' href="#product"><div className={`item-normal ${theme_tab('product')}`}>{l.product[lang]}</div></a>
              </Link>
              
              <Link activeClass="active" to="about" spy={true} smooth={true} duration={250}>
                <a className='relative' href='#about'><div className={`item-normal ${theme_tab('about')}`}>{l.about[lang]}</div></a>
              </Link>
              
              <Link activeClass="active" to="join" spy={true} smooth={true} duration={250}>
                <a className='relative' href='#join'><div className={`item-normal ${theme_tab('join')}`}>{l.career[lang]}</div></a>
              </Link>

              <RadioGroup defaultValue='cn' onChange={(value) => setLang(value)} style={{ marginTop: 20 }}>
                <Button type="outline"><Radio value='cn'><span style={{color:'rgb(var(--gray-2))'}}>中文</span></Radio></Button>
                <Button type="outline" className="ml-2"><Radio value='en'><span style={{color:'rgb(var(--gray-2))'}}>English</span></Radio></Button>
              </RadioGroup>
            </div>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header
