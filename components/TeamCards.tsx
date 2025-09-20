import React from 'react';

const TeamCards: React.FC = () => {
  return (
    <div className="team-cards-container">
      <svg className="svg-container">
        <defs>
          <filter id="🌀↖️" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
          
          <filter id="🌀🎨" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="7" />
            <feColorMatrix type="hueRotate" result="pt1" >
              <animate attributeName="values" values="0;360;" dur=".6s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feComposite />
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="7" seed="5" />
            <feColorMatrix type="hueRotate" result="pt2">
              <animate attributeName="values" values="0; 333; 199; 286; 64; 168; 256; 157; 360;" dur="5s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>

          <filter id="🌀💡" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="8" />
            <feColorMatrix type="hueRotate" result="pt1" >
              <animate attributeName="values" values="360;0;" dur="1.2s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feComposite />
            <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="6" seed="3" />
            <feColorMatrix type="hueRotate" result="pt2">
              <animate attributeName="values" values="360; 27; 161; 74; 296; 192; 104; 203; 0;" dur="4s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" scale="25" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <main className="main-container">
        {/* Filip Malejki */}
        <div className="card-container" data-variant="malejki">
          <div className="inner-container">
            <div className="border-outer">
              <div className="main-card"></div>
            </div>
            <div className="glow-layer-1"></div>
            <div className="glow-layer-2"></div>
          </div>

          <div className="overlay-1"></div>
          <div className="overlay-2"></div>
          <div className="background-glow"></div>

          <div className="content-container">
            <div className="content-top">
              <div className="scrollbar-glass">
                Founder & Backend Developer
              </div>
              <p className="title">Filip Malejki</p>
            </div>

            <hr className="divider" />

            <div className="content-bottom">
              <div className="social-card">
                <a className="social-link-linkedin">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
                <a className="social-link-github">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="1em" viewBox="0 0 496 512">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                </a>
                <a className="social-link-telegram">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512" fill="#fff">
                    <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.8 .3-3.7-1.2-5.2s-4.6-1.6-6.9-.9c-3.3 .9-55.7 35.4-157.3 104.8-14.9 10.2-28.4 15.2-40.4 15.1-13.3-.1-38.9-7.5-57.9-13.7-23.3-7.6-41.8-11.6-40.2-24.5 .8-6.7 10.2-13.5 28.2-20.4 110.4-48.1 184-79.8 220.8-95.1 105.1-43.7 126.9-51.3 141.2-51.5 3.1 0 10.1 .7 14.6 4.4 3.8 3.1 4.8 7.3 5.3 10.3 .4 2.9 .9 9.6 .5 14.8z"></path>
                  </svg>
                </a>
                <a className="social-link-x">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Franciszek Tokarek */}
        <div className="card-container" data-variant="tokarek">
          <div className="inner-container">
            <div className="border-outer">
              <div className="main-card"></div>
            </div>
            <div className="glow-layer-1"></div>
            <div className="glow-layer-2"></div>
          </div>

          <div className="overlay-1"></div>
          <div className="overlay-2"></div>
          <div className="background-glow"></div>

          <div className="content-container">
            <div className="content-top">
              <div className="scrollbar-glass">
                Co-Founder & Frontend Developer
              </div>
              <p className="title">Franciszek Tokarek</p>
            </div>

            <hr className="divider" />

            <div className="content-bottom">
              <div className="social-card">
                <a className="social-link-linkedin">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
                <a className="social-link-github">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="1em" viewBox="0 0 496 512">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                </a>
                <a className="social-link-telegram">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512" fill="#fff">
                    <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.8 .3-3.7-1.2-5.2s-4.6-1.6-6.9-.9c-3.3 .9-55.7 35.4-157.3 104.8-14.9 10.2-28.4 15.2-40.4 15.1-13.3-.1-38.9-7.5-57.9-13.7-23.3-7.6-41.8-11.6-40.2-24.5 .8-6.7 10.2-13.5 28.2-20.4 110.4-48.1 184-79.8 220.8-95.1 105.1-43.7 126.9-51.3 141.2-51.5 3.1 0 10.1 .7 14.6 4.4 3.8 3.1 4.8 7.3 5.3 10.3 .4 2.9 .9 9.6 .5 14.8z"></path>
                  </svg>
                </a>
                <a className="social-link-x">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Filip Sokołowski */}
        <div className="card-container" data-variant="sokolowski">
          <div className="inner-container">
            <div className="border-outer">
              <div className="main-card"></div>
            </div>
            <div className="glow-layer-1"></div>
            <div className="glow-layer-2"></div>
          </div>

          <div className="overlay-1"></div>
          <div className="overlay-2"></div>
          <div className="background-glow"></div>

          <div className="content-container">
            <div className="content-top">
              <div className="scrollbar-glass">
                Backend Developer
              </div>
              <p className="title">Filip Sokołowski</p>
            </div>

            <hr className="divider" />

            <div className="content-bottom">
              <div className="social-card">
                <a className="social-link-linkedin">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
                <a className="social-link-github">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="1em" viewBox="0 0 496 512">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                </a>
                <a className="social-link-telegram">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512" fill="#fff">
                    <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.8 .3-3.7-1.2-5.2s-4.6-1.6-6.9-.9c-3.3 .9-55.7 35.4-157.3 104.8-14.9 10.2-28.4 15.2-40.4 15.1-13.3-.1-38.9-7.5-57.9-13.7-23.3-7.6-41.8-11.6-40.2-24.5 .8-6.7 10.2-13.5 28.2-20.4 110.4-48.1 184-79.8 220.8-95.1 105.1-43.7 126.9-51.3 141.2-51.5 3.1 0 10.1 .7 14.6 4.4 3.8 3.1 4.8 7.3 5.3 10.3 .4 2.9 .9 9.6 .5 14.8z"></path>
                  </svg>
                </a>
                <a className="social-link-x">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        /* CSS Variables */
        :root {
          --color-neutral-900: oklch(0.185 0 0);
        }

        /* Main container */
        .team-cards-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }

        .main-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100%;
          gap: 2em;
          flex-wrap: wrap;
          overflow: hidden;
          padding: 2em;
        }

        /* SVG positioning */
        .svg-container {
          position: absolute;
        }

        /* Card container with NeuroSphere colors */
        .card-container {
          padding: 2px;
          border-radius: 1.5em;
          position: relative;
          background: linear-gradient(
              -30deg,
              var(--gradient-color),
              transparent,
              var(--gradient-color)
            ),
            linear-gradient(
              to bottom,
              var(--color-neutral-900),
              var(--color-neutral-900)
            );
        }

        /* NeuroSphere color variants */
        .card-container[data-variant="malejki"] {
          --f: url(#🌀↖️);
          --electric-border-color: #a855f7; /* Purple */
          --electric-light-color: oklch(from var(--electric-border-color) l c h);
          --gradient-color: oklch(
            from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4
          );
        }

        .card-container[data-variant="tokarek"] {
          --f: url(#🌀🎨);
          --electric-border-color: #3b82f6; /* Blue */
          --electric-light-color: oklch(from var(--electric-border-color) l c h);
          --gradient-color: oklch(
            from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4
          );
        }

        .card-container[data-variant="sokolowski"] {
          --f: url(#🌀💡);
          --electric-border-color: #06b6d4; /* Cyan */
          --electric-light-color: oklch(from var(--electric-border-color) l c h);
          --gradient-color: oklch(
            from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4
          );
        }

        /* Inner container */
        .inner-container {
          position: relative;
        }

        /* Border layers */
        .border-outer {
          border: 2px solid oklch(from var(--electric-border-color) l c h / 0.5);
          border-radius: 1.5em;
          padding-right: .15em;
          padding-bottom: .15em;
        }

        .main-card {
          width: 18rem;
          aspect-ratio: 7 / 10;
          border-radius: 1.5em;
          border: 2px solid var(--electric-border-color);
          margin-top: -4px;
          margin-left: -4px;
          filter: var(--f);
        }

        /* Glow effects */
        .glow-layer-1 {
          border: 2px solid oklch(from var(--electric-border-color) l c h / 0.6);
          border-radius: 24px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          filter: blur(1px);
        }

        .glow-layer-2 {
          border: 2px solid var(--electric-light-color);
          border-radius: 24px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          filter: blur(4px);
        }

        /* Overlay effects */
        .overlay-1 {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          opacity: 1;
          mix-blend-mode: overlay;
          transform: scale(1.1);
          filter: blur(16px);
          background: linear-gradient(
            -30deg,
            white,
            transparent 30%,
            transparent 70%,
            white
          );
        }

        .overlay-2 {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          opacity: 0.5;
          mix-blend-mode: overlay;
          transform: scale(1.1);
          filter: blur(16px);
          background: linear-gradient(
            -30deg,
            white,
            transparent 30%,
            transparent 70%,
            white
          );
        }

        /* Background glow */
        .background-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          filter: blur(32px);
          transform: scale(1.1);
          opacity: 0.3;
          z-index: -1;
          background: linear-gradient(
            -30deg,
            var(--electric-light-color),
            transparent,
            var(--electric-border-color)
          );
        }

        /* Content container */
        .content-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Content sections */
        .content-top {
          display: flex;
          flex-direction: column;
          padding: 40px;
          padding-bottom: 16px;
          height: 100%;
        }

        .content-bottom {
          display: flex;
          flex-direction: column;
          padding: 40px;
          padding-top: 16px;
        }

        /* Scrollbar glass component */
        .scrollbar-glass {
          background: radial-gradient(
              47.2% 50% at 50.39% 88.37%,
              rgba(255, 255, 255, 0.12) 0%,
              rgba(255, 255, 255, 0) 100%
            ),
            rgba(255, 255, 255, 0.04);
          position: relative;
          transition: background 0.3s ease;
          border-radius: 14px;
          width: fit-content;
          height: fit-content;
          padding: .5em 1em;
          text-transform: uppercase;
          font-weight: bold;
          font-size: .75em;
          color: rgba(255, 255, 255, 0.8);
        }

        .scrollbar-glass:hover {
          background: radial-gradient(
              47.2% 50% at 50.39% 88.37%,
              rgba(255, 255, 255, 0.12) 0%,
              rgba(255, 255, 255, 0) 100%
            ),
            rgba(255, 255, 255, 0.08);
        }

        .scrollbar-glass::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 1px;
          background: linear-gradient(
            150deg,
            rgba(255, 255, 255, 0.48) 16.73%,
            rgba(255, 255, 255, 0.08) 30.2%,
            rgba(255, 255, 255, 0.08) 68.2%,
            rgba(255, 255, 255, 0.6) 81.89%
          );
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
          pointer-events: none;
        }

        /* Typography */
        .title {
          font-size: 1.75em;
          font-weight: 500;
          margin-top: auto;
          color: white;
        }

        /* Social Card */
        .social-card {
          display: flex;
          height: 50px;
          width: 100%;
          justify-content: center;
          gap: 6px;
        }

        .social-card svg {
          position: absolute;
          display: flex;
          width: 55%;
          height: 55%;
          font-size: 16px;
          font-weight: 700;
          opacity: 1;
          transition: opacity 0.25s;
          z-index: 2;
          cursor: pointer;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .social-link-linkedin, .social-link-github, .social-link-telegram, .social-link-x {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          color: whitesmoke;
          font-size: 16px;
          text-decoration: none;
          transition: 0.25s;
          border-radius: 50%;
          cursor: pointer;
        }

        .social-card svg {
          transform: scale(1);
        }

        .social-link-linkedin:hover {
          background-color: #0a66c2;
          animation: bounce_social 0.4s linear;
        }

        .social-link-github:hover {
          background-color: #1a1e22;
          animation: bounce_social 0.4s linear;
        }

        .social-link-telegram:hover {
          background-color: #0088cc;
          animation: bounce_social 0.4s linear;
        }

        .social-link-x:hover {
          background-color: #000000;
          animation: bounce_social 0.4s linear;
        }

        @keyframes bounce_social {
          40% {
            transform: scale(1.4);
          }
          60% {
            transform: scale(0.8);
          }
          80% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Divider */
        .divider {
          margin-top: auto;
          border: none;
          height: 1px;
          background-color: currentColor;
          opacity: 0.2;
          mask-image: linear-gradient(to right, transparent, white, transparent);
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            white,
            transparent
          );
        }

        /* Responsive design */
        @media (max-width: 1200px) {
          .main-container {
            gap: 1.5em;
          }
          
          .main-card {
            width: 16rem;
          }
          
          .content-top,
          .content-bottom {
            padding: 32px;
          }
          
          .title {
            font-size: 1.5em;
          }
        }

        @media (max-width: 768px) {
          .main-container {
            flex-direction: column;
            gap: 1em;
            padding: 1em;
          }
          
          .main-card {
            width: 14rem;
          }
          
          .content-top,
          .content-bottom {
            padding: 24px;
          }
          
          .title {
            font-size: 1.25em;
          }
          
          .social-card {
            height: 40px;
            gap: 4px;
          }
          
          .social-link-linkedin, .social-link-github, .social-link-telegram, .social-link-x {
            width: 35px;
            height: 35px;
          }

          .social-card svg {
            width: 50%;
            height: 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamCards;
