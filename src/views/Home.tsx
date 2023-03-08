import React, {useEffect, useRef} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import skyland from '../static/picture/skyland.svg'
import sky from '../static/picture/sky.jpg'
import s1 from '../static/picture/s1.svg'
import s2 from '../static/picture/s2.svg'
import letjoy from '../static/picture/letjoy-logo.svg'
import scrollDown from '../static/animation/scroll-down-w.gif'



const Home = () => {
  let init = false
  const foreRef = useRef();
  const backRef = useRef();
  const wholeRef = useRef();
  const holdRef = useRef();
  const t1Ref = useRef();
  const t2Ref = useRef();
  const t3Ref = useRef();

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
      foreRef.current.style.transform = `translate(-50%, calc(100% - ${value}px ))`
      wholeRef.current.style.position = 'fixed'
      t1Ref.current.style.opacity = 1 - step
      t2Ref.current.style.opacity = step
      t3Ref.current.style.opacity = 0
      //holdRef.current.style.display="block"
    } else if(value < ah2) {
      wholeRef.current.style.position = 'fixed'
      t1Ref.current.style.opacity = 0
      t2Ref.current.style.opacity = 1 - (value - ah1) / ah1
      t3Ref.current.style.opacity = (value - ah1) / ah1
    } else if(value < ah3) {
      t1Ref.current.style.opacity = 0
      t2Ref.current.style.opacity = 0
      wholeRef.current.style.position = 'fixed'
    } else {
      wholeRef.current.style.position = 'absolute'
      //holdRef.current.style.display="hidden"
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
      <Header title="Home" />
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
          <div style={{width: '50%'}} className="h-full flex items-center justify-center">
            <div style={{width: '100%'}}  className="relative flex-col justify-center">
              <p className="text-5xl pb-5" >来聚组局</p>
              <p className="text-xl">通过算法组局，精准匹配你的线下剧本杀玩伴</p>
              <a href="/letjoy">了解更多</a>
            </div>
          </div>
        </div>

        <div className="w-screen h-screen flex justify-center">
          关于我们
        </div>
        <div className="w-screen h-screen flex justify-center">
          加入我们
        </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home
