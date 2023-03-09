import React, {useState, useEffect, useRef} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import s1 from '../static/picture/s1.svg'
import s2 from '../static/picture/s2.svg'
import letjoy from '../static/picture/letjoy-logo.svg'
import scrollDown from '../static/animation/scroll-down-w.gif'
import hiring from '../static/picture/hiring.png'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



const Home = () => {
  let init = false
  const foreRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const wholeRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef<HTMLDivElement>(null);
  const t1Ref = useRef<HTMLDivElement>(null);
  const t2Ref = useRef<HTMLDivElement>(null);
  const t3Ref = useRef<HTMLDivElement>(null);

  const [scrollAnimating, setScrollAnimating] = useState(false);

  let foreHeight = 50;


  const storybook = () => {
    let value = window.scrollY;
    let h = window.innerHeight;
    let ah1 = 0
    let ah2 = 0
    let ah3 = 0
    ah1 = (h * foreHeight / 100) !== 0? h * foreHeight / 100 : 100 // stop animate
    ah2 = 2 * ah1
    ah3 = 3* ah1
    console.log(value)

    if(value < ah1) {
      let step = value / ah1
      foreRef.current!.style.transform = `translate(-50%, calc(100% - ${value}px ))`
      wholeRef.current!.style.position = 'fixed'
      t1Ref.current!.style.opacity = `${1 - step}`
      t2Ref.current!.style.opacity = `${step}`
      t3Ref.current!.style.opacity = '0'
      //holdRef.current.style.display="block"
      setScrollAnimating(true);
    } else if(value < ah2 && value >= ah1) {
      wholeRef.current!.style.position = 'fixed'
      t1Ref.current!.style.opacity = '0'
      t2Ref.current!.style.opacity = `${1 - (value - ah1) / ah1}`
      t3Ref.current!.style.opacity = `${(value - ah1) / ah1}`
      setScrollAnimating(true);
    } else if(value < ah3 && value >= ah2) {
      t1Ref.current!.style.opacity = '0'
      t2Ref.current!.style.opacity = '0'
      wholeRef.current!.style.position = 'fixed'
      setScrollAnimating(true);
    } else if(value < 2.5 * h && value >= ah3) {
      wholeRef.current!.style.position = 'absolute'
      setScrollAnimating(true);
      //holdRef.current.style.display="hidden"
    } else {
      setScrollAnimating(false);
    }
  }

  useEffect(() => {
    if(!init){
      window.addEventListener('scroll', function(){
        storybook()
      })
      init = true
    }
  });

  return (
    <React.Fragment>
      <Header dark={scrollAnimating} />
        <div ref={holdRef} className="relative" style={{width: '100%', height: '250vh'}}>
          <div ref={wholeRef} className="w-screen h-screen flex justify-center overflow-hidden bottom-0">
            <div className="absolute inset-1/2 w-full text-white" style={{zIndex: 20, transform: 'translate(-50%, -40%)', textAlign: 'center'}}>
              <p ref={t1Ref} className="text-5xl opacity-100">人生如繁星，精彩却孤独</p>
              <p ref={t2Ref} className="text-5xl opacity-0">我们，观星者们</p>
              <p ref={t3Ref} className="text-5xl opacity-0">将发现他人与你的连接</p>
            </div>
            <img src={s1} ref={backRef} style={{width:'100%', height: '100%',transform: 'translateY(0%)'}} className="object-cover absolute" alt="logo" />
            <img src={s2} ref={foreRef} style={{height: `${foreHeight}%`, left: '50%', transform: 'translate(-50%, 100%)'}} className="z-30 object-cover absolute bottom-0" alt="logo" />
            <img src={scrollDown} className="absolute bottom-3 left-1/2 w-8 z-40" style={{transform: 'translate(-50%, -50%)'}} />
          </div>
        </div>
        <div className="w-screen h-screen flex justify-between">
          <div style={{width: '50%'}} className="h-full flex items-center justify-center">
            <div style={{width: '100%'}}  className="relative flex justify-center">
              <div style={{width:'45%', transform: 'translate(-20%, 20%)', aspectRatio: '1', background: "#4141c9", borderRadius: "10%"}} className="absolute"></div>
              <img src={letjoy} style={{width:'50%'}} className="object-cover z-20" alt="logo" />
            </div>
          </div>
          <Element name="product">
            <div style={{width: '50%'}} className="h-full flex items-center justify-center">
              <div style={{width: '100%'}}  className="relative flex-col justify-center">
                <p className="text-5xl pb-5" >来聚组局</p>
                <p className="text-xl">通过算法组局，精准匹配你的线下剧本杀玩伴</p>
                <p><a href="/letjoy" className="text-xl" style={{color: 'rgb(var(--blue-7))'}}>了解更多</a></p>
              </div>
            </div>
          </Element>

        </div>

        <Element name="about">
          <div className="w-screen h-screen flex justify-center">
            <div className="max-w-6xl w-full flex flex-col justify-center items-center p-5">
              <div>
                <h1>关于我们</h1>
                <p>
                  克莱克特是一家具有算法基因的互联网公司，我们致力于应用数据和算法去发掘用户们潜在的社交需求，催化人与人之间化学键并释放其中的能量与价值。2023 年，我们上线第一款社交型产品「来聚组局」，其以前置需求匹配的交互模式给用户提供了全新的社交体验。
                </p>
                <p>
                  观星者（克莱克特人）的预言是「人的未来不应该是孤独的，任何人都有社交的需求。他们只需要更多的相遇」。而我们的魔法（算法）可以他们建立更多精准的连接，制造更多妙不可言的相遇。
                </p>
              </div>
            </div>
          </div>
        </Element>

        <Element name="join">
          <div className="w-screen h-screen flex justify-center">
            <div className="max-w-6xl w-full flex flex-col justify-center items-center p-5">
              <div className="w-full relative mb-10">
                <h1>加入我们</h1>
                <p>
                  星辰正在启示新的可能，你愿意加入我们吗？新的观星者
                </p>
              </div>

              <div className="w-full">
                <p className="text-xl">
                  工作岗位
                </p>

                <div className="flex py-5">
                  <div className="flex flex-col items-center relative overflow-hidden p-2 shadow" style={{border: '1px solid lightgray', width: '25%', minWidth: '200px', borderRadius: '20px', height: '70vh', maxHeight: '800px'}}>
                    <p className="text-xl py-4">研发观星师</p>

                    <p className="py-4">描述描述</p>
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
