import React from 'react'


const Footer = () => {
  return (
    <footer className="flex items-center w-full justify-center">
        <div className="max-w-6xl w-full flex justify-center p-6">
            © 2019-2022 克莱克特 
            <p className="pl-4">备案号 <a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">沪ICP备2021030818号-1</a> </p>
            <p className="pl-4">增值电信业务许可证号 <a target="_blank" href="https://tsm.miit.gov.cn/dxxzsp/xkz/xkzgl/resource/qiyesearch.jsp?num=%E6%B2%AAB2-20230242&type=xuke">沪B2-20230242</a></p>
        </div>
    </footer>
  );
};

export default Footer
