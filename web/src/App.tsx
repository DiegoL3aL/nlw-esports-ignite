import { useState, useEffect} from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';

import { CaretLeft, CaretRight } from "phosphor-react";


import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"

import './styles/main.css';

import "keen-slider/keen-slider.min.css"
import "./styles.css"

import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

import KeenSlider from 'keen-slider'
import React from 'react';

interface Game {
    id: string, 
    title: string,
    bannerURl: string,
    _count:{
      ads:number;
    }
}



function App() {
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
      axios('http://localhost:3333/games').then(response => { 
        setGames(response.data)
      })
    }, []) 

  
    
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
      initial: 0,
      mode: 'free',
      loop: false,
      slides: { perView: 5},
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
      
    })

    function Arrow(props: {
      disabled: boolean
      left?: boolean
      onClick: (e: any) => void
    }) {
      const disabeld = props.disabled ? " arrow--disabled" : ""
      
      // return (
      //   <svg
      //     onClick={props.onClick}
         
      //     className={`arrow ${
      //       props.left ? "arrow--left" : "arrow--right"
      //     } ${disabeld}`}
      //     xmlns="http://www.w3.org/2000/svg"
      //     viewBox="0 0 24 24"
      //   >
      //     {props.left && (
      //       <CaretLeft 
      //       size={48}
      //       color="#ffe5e5"
      //       />
      //     )}
      //     {!props.left && (
      //      <CaretRight
      //      size={48} 
      //      color="#ffe5e5" />

      //     )}
      //   </svg>
      // )
    }

    


 return (
  <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20" >
    <img src={logoImg} alt="" />

    <h1 className="text-6xl text-white font-black mt-20 ">
      Seu <span className="text-transparent bg-nlw-gradient bg-clip-text ">duo</span> está aqui.
    </h1>

    

    <div ref={sliderRef} className="keen-slider mt-8">
                {
                  games.map((game) => {
                    return (
                      <div key={game.id} className="keen-slider__slide mr-3 rounded-xl">
                        <GameBanner 
                            key={game.id}
                            title={game.title} 
                            bannerURl={game.bannerURl} 
                            adsCount={game._count.ads}
                          />
                      </div>
                    )
                  })
                }
    </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
 )
}

export default App
 