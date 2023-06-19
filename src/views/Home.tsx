import React, {useState, useEffect, useRef} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import s1 from '../static/picture/s1.svg'
import s2 from '../static/picture/s2.svg'
import letjoy from '../static/picture/letjoy-logo.svg'
import mida from '../static/picture/mida-logo.svg'
import scrollDown from '../static/animation/scroll-down-w.gif'
import hiring from '../static/picture/hiring.png'
import qr from '../static/picture/letjoy-qr.jpg'
import mqr from '../static/picture/mida-qr.jpg'
import './Home.css'
import { Tabs, Timeline } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;
const TimelineItem = Timeline.Item;

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const langPack:{[key: string]: {[key:string]: string}} = {
  'st1' : {'cn': '人生如同繁星，精彩却又孤独', 'en': 'Life is great but transient'},
  'st2' : {'cn': '克莱克特', 'en': 'Collect'},
  'st3' : {'cn': '发现你与他人更多的连接', 'en': 'find more connect between you and others'},
  'letjoy' : {'cn': '来聚组局', 'en': 'Letjoy'},
  'ljdesc' : {'cn': '通过算法组局，精准匹配你的线下剧本杀玩伴', 'en': 'Match your boardgame player effectively with big-data'},
  'mida' : {'cn': '觅搭', 'en': 'Mida'},
  'midadesc' : { 'cn': '#随时随地，精准找搭子', 'en': '#Finding the best partner anywhere'},
  'about' : {'cn': '关于我们', 'en': 'About us'},
  'about1' : {'cn': '克莱克特是一家具有算法基因的互联网公司。我们致力于应用数据和算法去发掘用户们潜在的社交需求，催化人与人之间化学键并释放其中的能量与价值。2023 年，我们上线第一款社交型产品「来聚组局」，其以前置需求匹配的交互模式给用户提供了全新的社交体验。', 
              'en': 'Connect is an \'Algorithm-based\' tech corp, which concentrates on exploring and mining the social relationship and communication with big-data and algorithm. In 2023, the first product, aka \'Letjoy\' is launched at WeChat miniprogram, that brings a new experience to the customers.'},
  'about2' : {'cn': '克莱克特认为「任何人都有社交的需求，但这大多数人都生活在中心化，严重熵增的信息茧房里。失去了社交的信息基础」。而我们的愿景是帮组所有人建立更多的连接，去认识更多的人，看到更多不一样的个体。', 
              'en': 'Collect\'s vision is \'Everyone\'s future is not alone as everyone needs social in other life. And, they need more chance to meet others\'. And our app is to create the great chance for them'},             
  'career' : {'cn': '加入我们', 'en': 'Career'},
  'perspective': {'cn': '愿景和使命', 'en': 'Perspectives'},
  'values': {'cn': '价值观', 'en': 'Values'},
  'value1': {'cn': '专注目标：专业的人做专业的事情，重视目标而非途径', 'en': 'Being professnial and Focus the goal: Doing and done with the professional attitude and skills. Focus on the goal instead of approaches'},
  'value2': {'cn': '平等坦诚：大家都有合理建议和批评的权利与义务', 'en': 'Be candid and keep critical: Everyone has rights to suggest and crticize in reason'},
  'value3': {'cn': '创新敢为：如果有想法，请立刻喊出出来', 'en': 'Creativity and brave to do: Yarn out once has an genius idea'},
  'value4': {'cn': '耐心聆听：把身段放低，以学生和朋友的身份去聆听和学习', 'en': 'Listen and be patient: Listen and learn from the other in the role of students and friends'},
  'stories': {'cn': '我们的故事', 'en': 'Stories'},
  'story1': {'cn': '上海克莱克特创立','en': 'Collect is registered'},
  'story2': {'cn': '核心团队招募完毕', 'en': 'The core team is collected'},
  'story3': {'cn': '来聚组局上线微信小程序', 'en': 'Letjoy is debut on WeChat Miniprogram'},
  'story4': {'cn': '觅搭 MVP 上线', 'en': 'Mida MVP launched WeChat Miniprogram'},
  'position' : {'cn': '工作岗位', 'en': 'Position'},
  'devPositionTitle' : {'cn': '内容运营', 'en': 'Content operation'},
  'devPositionDesc' : {'cn': '描述描述', 'en': 'Desc Desc'},
}

const Home = () => {
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
  const [init, setInit] = useState(false)
  const [activeTab, setActiveTab] = useState('');
  const [lang, setLang] = useState('cn');
  const [cardMove, setCardMove] = useState(false);
  const [pMove, setPMove] = useState(false);
  const [aMove, setAMove] = useState(false);

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
          t1Ref.current!.style.opacity = `${1 - step}`
          t2Ref.current!.style.opacity = '0'
          t3Ref.current!.style.opacity = '0'
          foreRef.current!.style.transform = `translate(-50%, 100%)`
        } else if(value < 2 * ah1 && value >= ah1) {
          let step = (value - ah1) / ah1
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = `${step}`
          t3Ref.current!.style.opacity = '0'
          foreRef.current!.style.transform = `translate(-50%, calc(100% - ${value - ah1}px ))`
        } else if(value < 3 * ah1 && value >= 2 * ah1) {
          let step = (value - ah1 * 2) / ah1
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = `${1 - step}`
          t3Ref.current!.style.opacity = '0'
          foreRef.current!.style.transform = `translate(-50%,  0)`
        } else if(value < 4 * ah1 && value >= 3 * ah1) {
          let step = (value - ah1 * 3) / ah1
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = '0'
          t3Ref.current!.style.opacity = `${step}`
          foreRef.current!.style.transform = `translate(-50%,  0)`
        } else if(value < 5 * ah1 && value >= 4 * ah1){
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = '0'
          t3Ref.current!.style.opacity = `1`
          foreRef.current!.style.transform = `translate(-50%,  0)`
        } else if(value < 7 * ah1 && value >= 5 * ah1){
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = '0'
          t3Ref.current!.style.opacity = `1`
          foreRef.current!.style.transform = `translate(-50%,  0)`
        } else {
          t1Ref.current!.style.opacity = '0'
          t2Ref.current!.style.opacity = '0'
          t3Ref.current!.style.opacity = `1`
          foreRef.current!.style.transform = `translate(-50%,  0)`
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

        // 控制出现动画
        setCardMove(value >= (joinRef.current!.offsetTop - 400))
        setPMove(value >= (productRef.current!.offsetTop - 0.3 * h))
        setAMove(value >= (aboutRef.current!.offsetTop - 0.3 * h))
      
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
      setInit(true)
    }
  });



  return (
    <React.Fragment>
        <div ref={holdRef} className="relative overflow-hideen" style={{width: '100%', height: '350vh'}}>
          <Header dark={scrollAnimating} lang={lang} setLang={setLang} activeTab={activeTab} setActiveTab={setActiveTab}/>
          <div ref={wholeRef} className="w-screen h-screen flex justify-center overflow-hidden bottom-0 top-0 sticky whole">
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
          <div ref={productRef} className={`w-screen h-screen flex justify-center moveable ${pMove? 'translate-y-0':'translate-y-1/4'}`}>
            <div className={`max-w-6xl w-full flex ${smallScreen()? 'flex-col': ''}`}>
              <div style={{width: `${smallScreen()? '100%' : '50%'}`}} className="h-full flex items-center justify-center">
                <div style={{width: '100%'}}  className="relative flex justify-center">
                  <div className="3back absolute"></div>
                  <div className="deco-swing absolute" style={{width:'30%', aspectRatio: '1', background: "#4141c9", borderRadius: "10%"}}></div>
                  <img src={mida} style={{width:'50%'}} className="object-cover z-20 logo-swing" alt="logo" />
                </div>
              </div>
              
              <div style={{width: `${smallScreen()? '100%' : '50%'}`, padding: '25px'}} className="h-full flex items-center justify-center">
                <div style={{width: '100%'}}  className="relative flex-col justify-center">
                  <p className="text-5xl pb-5 cursor-pointer" ><span className="letjoy">{langPack.mida[lang]}</span></p>
                  <p className="text-xl" style={{color: '#17a9b2'}}>{langPack.midadesc[lang]}</p>
                  <p className="my-2 flex-col items-center">
                    <img src={mqr} className="w-36 mt-12 letjoy-qr" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div ref={productRef} className={`w-screen h-screen flex justify-center moveable ${pMove? 'translate-y-0':'translate-y-1/4'}`}>
            <div className={`max-w-6xl w-full flex ${smallScreen()? 'flex-col': ''}`}>
              <div style={{width: `${smallScreen()? '100%' : '50%'}`}} className="h-full flex items-center justify-center">
                <div style={{width: '100%'}}  className="relative flex justify-center">
                  <div className="3back absolute"></div>
                  <div className="deco-swing absolute" style={{width:'30%', aspectRatio: '1', background: "#4141c9", borderRadius: "10%"}}></div>
                  <img src={letjoy} style={{width:'50%'}} className="object-cover z-20 logo-swing" alt="logo" />
                </div>
              </div>
              
              <div style={{width: `${smallScreen()? '100%' : '50%'}`, padding: '25px'}} className="h-full flex items-center justify-center">
                <div style={{width: '100%'}}  className="relative flex-col justify-center">
                  <p className="text-5xl pb-5 cursor-pointer" ><span className="letjoy">{langPack.letjoy[lang]}</span></p>
                  <p className="text-xl">{langPack.ljdesc[lang]}</p>
                  <p className="my-2 flex-col items-center">
                    <img src={qr} className="w-36 mt-12 letjoy-qr" />
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </Element>

        <Element name="about">
          <div ref={aboutRef} className={`w-screen h-screen flex justify-center moveable ${aMove? 'translate-y-0':'translate-y-1/4'}`}>
            <div className="max-w-6xl w-full flex flex-col justify-center items-center p-5">
              <div className="pb-10">
                <p className="text-3xl my-10">{langPack.about[lang]}</p>
                <Tabs tabPosition='left' scrollPosition="center" type="rounded" size="large" style={{'height': '60%', 'minHeight': '400px'}}>
                  <TabPane key='tab1' title={langPack.perspective[lang]}>
                    <p className="text-2xl mb-5">{langPack.perspective[lang]}</p>
                    <p className="text-xl pb-5" style={{lineHeight: '2.5rem', color: 'rgb(var(--gray-7))'}}>
                      {langPack.about1[lang]}
                    </p>
                    <p className="text-xl" style={{lineHeight: '2.5rem', color: 'rgb(var(--gray-7))'}}>
                      {langPack.about2[lang]}
                    </p>
                  </TabPane>
                  <TabPane key='tab2' title={langPack.values[lang]}>
                    <p className="text-2xl mb-5">{langPack.values[lang]}</p>
                    <p className="text-xl pb-5" style={{lineHeight: '2.5rem', color: 'rgb(var(--gray-7))'}}>
                      {langPack.value1[lang]}
                    </p>
                    <p className="text-xl pb-5" style={{lineHeight: '2.5rem', color: 'rgb(var(--gray-7))'}}>
                      {langPack.value2[lang]}
                    </p>
                    <p className="text-xl pb-5" style={{lineHeight: '2.5rem', color: 'rgb(var(--gray-7))'}}>
                      {langPack.value3[lang]}
                    </p>
                    <p className="text-xl pb-5" style={{lineHeight: '2.5rem', color: 'rgb(var(--gray-7))'}}>
                      {langPack.value4[lang]}
                    </p>
                  </TabPane>
                  <TabPane key='tab3' title={langPack.stories[lang]}>
                    <Timeline reverse={true}>
                      <TimelineItem label='2022-10-10'><p className="text-xl">{langPack.story1[lang]}</p></TimelineItem>
                      <TimelineItem label='2022-11-30'><p className="text-xl">{langPack.story2[lang]}</p></TimelineItem>
                      <TimelineItem label='2023-01-01'><p className="text-xl">{langPack.story3[lang]}</p></TimelineItem>
                      <TimelineItem label='2023-06-01'><p className="text-xl">{langPack.story4[lang]}</p></TimelineItem>
                    </Timeline>
                  </TabPane>
                </Tabs>
              </div>
            </div>

          </div>
        </Element>

        <Element name="join">
          <div ref={joinRef} className="w-screen h-screen flex justify-center">
            <div className="max-w-6xl w-full flex flex-col justify-center items-center p-5">
              <div className="w-full relative mb-10">
                <p className="text-3xl my-5">{langPack.career[lang]}</p>
              </div>
      
              <div className="w-full">
                <p className="text-2xl">
                  {langPack.position[lang]}
                </p>
                <div className="flex py-5 gap-3 overflow-auto">
                  {
                    [1,2].map((tmp) => {
                      return (
                          <div >
                            <div className={`flex flex-col items-center relative overflow-hidden p-2 shadow cursor-pointer card ${cardMove? 'card-moved' : ''}`} style={{border: '1px solid lightgray', width: '25%', minWidth: '200px', borderRadius: '20px', height: '70vh', maxHeight: '800px', transition:`transform .5s ease-in-out ${.2 *tmp}s, opacity .5s ease-in-out ${.2 *tmp}s`}}>
                              <p className="text-xl py-4">{langPack.devPositionTitle[lang]}</p>
          
                              <p className="py-4">{langPack.devPositionDesc[lang]}</p>
                              <img src={hiring} className="absolute bottom-0" style={{width: '120%'}}/>
                            </div>
                          </div>
                        )
                    })
                  }
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
