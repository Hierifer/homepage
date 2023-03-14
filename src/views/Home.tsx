import React, {useState, useEffect, useRef} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import s1 from '../static/picture/s1.svg'
import s2 from '../static/picture/s2.svg'
import letjoy from '../static/picture/letjoy-logo.svg'
import scrollDown from '../static/animation/scroll-down-w.gif'
import hiring from '../static/picture/hiring.png'
import qr from '../static/picture/letjoy-qr.jpg'
import './Home.css'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const langPack:{[key: string]: {[key:string]: string}} = {
  'st1' : {'cn': '人生如同繁星，精彩却又孤独', 'en': 'Life is great but transient'},
  'st2' : {'cn': '我们，观星者们', 'en': 'We, Soical Astronomer'},
  'st3' : {'cn': '发现你与他人更多的连接', 'en': 'find more connect between you and others'},
  'letjoy' : {'cn': '来聚组局', 'en': 'Letjoy'},
  'ljdesc' : {'cn': '通过算法组局，精准匹配你的线下剧本杀玩伴', 'en': 'Match your boardgame player effectively with big-data'},
  'about' : {'cn': '关于我们', 'en': 'About us'},
  'about1' : {'cn': '克莱克特是一家具有算法基因的互联网公司，我们致力于应用数据和算法去发掘用户们潜在的社交需求，催化人与人之间化学键并释放其中的能量与价值。2023 年，我们上线第一款社交型产品「来聚组局」，其以前置需求匹配的交互模式给用户提供了全新的社交体验。', 
              'en': 'Connect is an \'Algorithm-based\' tech corp, which concentrates on exploring and mining the social relationship and communication with big-data and algorithm. In 2023, the first product, aka \'Letjoy\' is launched at WeChat miniprogram, that brings a new experience to the customers.'},
  'about2' : {'cn': '观星者（克莱克特人）的预言是「人的未来不应该是孤独的，任何人都有社交的需求。他们只需要更多的相遇」。而我们的魔法（算法）可以他们建立更多精准的连接，制造更多妙不可言的相遇。', 
              'en': 'Astronomers\' (Connecters) vision is \'Everyone\'s future is not alone as everyone needs social in other life. And, they need more chance to meet others\'. And our magic is to create the great chance for them'},             
  'career' : {'cn': '加入我们', 'en': 'Career'},
  'careerdesc' : {'cn': '星辰正在启示新的可能，你愿意加入我们吗？新的观星者', 'en': 'Stars reveal the new future. Will you join us? The new Astronomer'},
  'position' : {'cn': '工作岗位', 'en': 'Position'},
  'devPositionTitle' : {'cn': '研发观星师', 'en': 'Engineer Aston'},
  'devPositionDesc' : {'cn': '描述描述', 'en': 'Desc Desc'},
}

const Home = () => {
  let init = false
  const foreRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const wholeRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef<HTMLDivElement>(null);
  const t1Ref = useRef<HTMLDivElement>(null);
  const t2Ref = useRef<HTMLDivElement>(null);
  const t3Ref = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLDivElement>(null);

  // 视差动画存在视野
  const [scrollAnimating, setScrollAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [lang, setLang] = useState('cn');

  const smallScreen = () => {
    return window.innerWidth < 800
  }

  let foreHeight = 50;
  let ticking = false;

  const storybook = () => {
    let value = window.scrollY;
    let h = window.innerHeight;
    let ah1 = 0
    let ah2 = 0
    let ah3 = 0
    ah1 = (h * foreHeight / 100) !== 0? h * foreHeight / 100 : 100 // stop animate

    if (!ticking) {
      window.requestAnimationFrame(() => {
        // 控制视差动画
        if(value < ah1) {
          let step = value / ah1
          wholeRef.current!.style.position = 'fixed'
          t1Ref.current!.style.opacity = `${1 - step}`
          t2Ref.current!.style.opacity = '0'
          t3Ref.current!.style.opacity = '0'
          foreRef.current!.style.transform = `translate(-50%, 100%)`
          wholeRef.current!.style.transform = `translate(0, 0)`
        } else if(value < 2 * ah1 && value >= ah1) {
          let step = (value - ah1) / ah1
          wholeRef.current!.style.position = 'fixed'
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = `${step}`
          t3Ref.current!.style.opacity = '0'
          foreRef.current!.style.transform = `translate(-50%, calc(100% - ${value - ah1}px ))`
          wholeRef.current!.style.transform = `translate(0, 0)`
        } else if(value < 3 * ah1 && value >= 2 * ah1) {
          let step = (value - ah1 * 2) / ah1
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = `${1 - step}`
          t3Ref.current!.style.opacity = '0'
          wholeRef.current!.style.position = 'fixed'
          foreRef.current!.style.transform = `translate(-50%,  0)`
          wholeRef.current!.style.transform = `translate(0, 0)`
        } else if(value < 4 * ah1 && value >= 3 * ah1) {
          let step = (value - ah1 * 3) / ah1
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = '0'
          t3Ref.current!.style.opacity = `${step}`
          wholeRef.current!.style.position = 'fixed'
          foreRef.current!.style.transform = `translate(-50%,  0)`
          wholeRef.current!.style.transform = `translate(0, 0)`
        } else if(value < 5 * ah1 && value >= 4 * ah1){
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = '0'
          t3Ref.current!.style.opacity = `1`
          wholeRef.current!.style.position = 'fixed'
          t3Ref.current!.style.transform = `translate(-50%, -50%)`
          wholeRef.current!.style.transform = `translate(0, 0)`
          foreRef.current!.style.transform = `translate(-50%,  0)`
        } else if(value < 7 * ah1 && value >= 5 * ah1){
          let step = (value - ah1 * 5) / ah1
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = '0'
          t3Ref.current!.style.opacity = `${1 - step}`
          foreRef.current!.style.transform = `translate(-50%,  0)`
          wholeRef.current!.style.transform = `translateY(${ah1*5-value}px)`
        } else {
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = '0'
          t3Ref.current!.style.opacity = `1`
          t3Ref.current!.style.transform = `translate(-50%, -50%)`
          foreRef.current!.style.transform = `translate(-50%,  calc(-50% + ${ah1 *5}))`
          wholeRef.current!.style.transform = `translateY(-100%)`
        }

        // 控制 Header 展示
        if(value < 3.5 * h){
          // Header 使用浅色
          document.getElementsByTagName('body')[0].style.setProperty('--gray-10', '229,230,235')
          document.getElementsByTagName('body')[0].style.setProperty('--color-bg-popup', '39,46,59')
          document.getElementsByTagName('body')[0].style.setProperty('--color-fill-2', 'var(--color-neutral-8)')
          setScrollAnimating(true);
        } else {
          // Header 使用深色
          document.getElementsByTagName('body')[0].style.setProperty('--gray-10', '39,46,59')
          document.getElementsByTagName('body')[0].style.setProperty('--color-bg-popup', '229,230,235')
          document.getElementsByTagName('body')[0].style.setProperty('--color-fill-2', 'var(--color-neutral-2)')
          setScrollAnimating(false);
        }

        // 控制出现动画
        if(value >= (productRef.current!.offsetTop - 0.3 * h) && value < (productRef.current!.offsetTop + productRef.current!.offsetHeight)){
          productRef.current!.style.transition = 'transform .5s'
          productRef.current!.style.transform = 'translateY(0)'
        } else if(value >= (aboutRef.current!.offsetTop - 0.3 * h) && value < (aboutRef.current!.offsetTop + aboutRef.current!.offsetHeight)){
          aboutRef.current!.style.transition = 'transform .5s'
          aboutRef.current!.style.transform = 'translateY(0)'
        }

        // 控制 Header Active Tab
        if(value >= (productRef.current!.offsetTop) && value < (productRef.current!.offsetTop + productRef.current!.offsetHeight)){
          setActiveTab('product')
        } else if(value >= (aboutRef.current!.offsetTop) && value < (aboutRef.current!.offsetTop + aboutRef.current!.offsetHeight)){
          setActiveTab('about')
        } else if(value >= (joinRef.current!.offsetTop) && value < (joinRef.current!.offsetTop + joinRef.current!.offsetHeight)){
          setActiveTab('join')
        } else {
          setActiveTab('')
        }
      
        ticking = false;
      });
  
      ticking = true;
    }
  }


  useEffect(() => {
    if(!init){
      storybook()
      window.addEventListener('scroll', function(){
        storybook()
      })
      init = true
    }
  });



  return (
    <React.Fragment>
        <div ref={holdRef} className="relative overflow-hideen" style={{width: '100%', height: '350vh'}}>
          <Header dark={scrollAnimating} lang={lang} setLang={setLang} activeTab={activeTab} setActiveTab={setActiveTab}/>
          <div ref={wholeRef} className="w-screen h-screen flex justify-center overflow-hidden bottom-0">
            <div className="absolute w-full text-white" style={{zIndex: 20, top: '40%', left: '50%', transform: 'translate(-50%, -40%)', textAlign: 'center'}}>
              <p ref={t1Ref} className="absolute left-1/2 text-5xl opacity-100" style={{transform: 'translate(-50%, -50%)'}}>{langPack.st1[lang]}</p>
              <p ref={t2Ref} className="absolute left-1/2 text-5xl opacity-0" style={{transform: 'translate(-50%, -50%)'}}>{langPack.st2[lang]}</p>
              <p ref={t3Ref} className="absolute left-1/2 text-5xl opacity-0" style={{transform: 'translate(-50%, -50%)'}}>{langPack.st3[lang]}</p>
            </div>
            <img src={s1} ref={backRef} style={{width:'100%', height: '100%',transform: 'translateY(0%)'}} className="object-cover absolute" alt="logo" />
            <img src={s2} ref={foreRef} style={{height: `${foreHeight}%`, left: '50%', transform: 'translate(-50%, 100%)'}} className="z-30 object-cover absolute bottom-0" alt="logo" />
            <img src={scrollDown} className="absolute bottom-3 left-1/2 w-8 z-40" style={{transform: 'translate(-50%, -50%)'}} />
          </div>
        </div>
        <Element name="product">
          <div ref={productRef} className="w-screen h-screen flex justify-center" style={{transform: 'translateY(30%)'}}>
            <div className={`max-w-6xl w-full flex ${smallScreen()? 'flex-col': ''}`}>
              <div style={{width: `${smallScreen()? '100%' : '50%'}`}} className="h-full flex items-center justify-center">
                <div style={{width: '100%'}}  className="relative flex justify-center">
                  <div className="deco-swing absolute" style={{width:'30%', aspectRatio: '1', background: "#4141c9", borderRadius: "10%"}}></div>
                  <img src={letjoy} style={{width:'50%'}} className="object-cover z-20 logo-swing" alt="logo" />
                </div>
              </div>
              
              <div style={{width: `${smallScreen()? '100%' : '50%'}`, padding: '25px'}} className="h-full flex items-center justify-center">
                <div style={{width: '100%'}}  className="relative flex-col justify-center">
                  <p className="text-5xl pb-5" >{langPack.letjoy[lang]}</p>
                  <p className="text-xl">{langPack.ljdesc[lang]}</p>
                  <p className="my-2 flex-col items-center">
                    <img src={qr} className="w-36 mt-12 letjoy-qr" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Element>

        <Element name="about">
          <div ref={aboutRef} className="w-screen h-screen flex justify-center" style={{transform: 'translateY(30%)'}}>
            <div className="max-w-6xl w-full flex flex-col justify-center items-center p-5">
              <div>
                <p className="text-3xl my-5">{langPack.about[lang]}</p>
                <p className="text-xl pb-5" style={{lineHeight: '2.5rem', color: 'rgb(var(--gray-7))'}}>
                  {langPack.about1[lang]}
                </p>
                <p className="text-xl" style={{lineHeight: '2.5rem', color: 'rgb(var(--gray-7))'}}>
                  {langPack.about2[lang]}
                </p>
              </div>
            </div>
          </div>
        </Element>

        <Element name="join">
          <div ref={joinRef} className="w-screen h-screen flex justify-center">
            <div className="max-w-6xl w-full flex flex-col justify-center items-center p-5">
              <div className="w-full relative mb-10">
                <p className="text-3xl my-5">{langPack.career[lang]}</p>
                <p className="text-xl" style={{color: 'rgb(var(--gray-7))'}}>
                  {langPack.careerdesc[lang]}
                </p>
              </div>

              <div className="w-full">
                <p className="text-2xl">
                  {langPack.position[lang]}
                </p>

                <div className="flex py-5">
                  <div className="flex flex-col items-center relative overflow-hidden p-2 shadow" style={{border: '1px solid lightgray', width: '25%', minWidth: '200px', borderRadius: '20px', height: '70vh', maxHeight: '800px'}}>
                    <p className="text-xl py-4">{langPack.devPositionTitle[lang]}</p>

                    <p className="py-4">{langPack.devPositionDesc[lang]}</p>
                    <img src={hiring} className="absolute bottom-0" style={{width: '120%'}}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Element>
      <Footer />
    </React.Fragment>
  );
};

export default Home
