import React from 'react'
import { IconPhone } from '@arco-design/web-react/icon';


const smallScreen = () => {
    return window.innerWidth < 800
}

const Footer = () => {
  return (
    <footer className={`flex flex-col items-center w-full justify-center my-3`}>
        <div className={`max-w-6xl w-full flex justify-center px-6 ${smallScreen()? 'flex-col' : ''} mb-3`}>
            <p className="pr-4">商务沟通：bd@collectring.com | <IconPhone /> 86+18519805021</p>
            <p>|</p>
            <p className="px-4">加入我们：hr@collectring.com</p>
        </div>
        <div className={`max-w-6xl w-full flex justify-center px-6 ${smallScreen()? 'flex-col' : ''}`}>
            <p className="pr-4">© 上海克莱克特网络科技有限公司 2021-2023 </p>
            <p>|</p>
            <p className="px-4">备案号 <a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index" style={{color: 'rgb(var(--blue-7))'}}>沪ICP备2021030818号-1</a> </p>
            <p>|</p>
            <p className="pl-4">增值电信业务许可证号 <a target="_blank" href="https://tsm.miit.gov.cn/dxxzsp/xkz/xkzgl/resource/qiyesearch.jsp?num=%E6%B2%AAB2-20230242&type=xuke" style={{color: 'rgb(var(--blue-7))'}}>沪B2-20230242</a></p>
        </div>
    </footer>
  );
};

export default Footer
