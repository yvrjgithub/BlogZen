import '../App.css'
import React from 'react';
import axios from 'axios';
import { URL,IF } from '../url';
import { useLocation } from 'react-router-dom';


const HomePost2 = ({post}) => {

  return (
    <div >
      <div class="p-4 sm:h-1/2">
        <div class="h-full border-2 border-gray-800 rounded-lg overflow-hidden sm:h-1/2">
          <img class="lg:h-48 md:h-34  w-full object-cover object-center " src="https://awoiaf.westeros.org/images/thumb/2/2f/TV_Caraxes.jpeg/400px-TV_Caraxes.jpeg" alt="blog"/>
          <div class="p-6" className='blogcard'>
            <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">@yuvraj</h2>
            <h1 class="title-font text-lg font-medium text-white mb-3">caraxes</h1>
            <p class="leading-relaxed mb-3 text-white">ter Prince Daemon is banished from King's Landing by Viserys, he leaves on Caraxes with Mysaria. During a confrontation between Daemon and Otto Hightower at Dragonstone, Caraxes shrieks and crawls f..</p>
            <div class="flex items-center flex-wrap ">
              <a class="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
              <span class="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800"> 
              Aug 01 2024
              </span>
              <span class="text-gray-500 inline-flex items-center leading-none text-sm">
              15:45
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePost2;