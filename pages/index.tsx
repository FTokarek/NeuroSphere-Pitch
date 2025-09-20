import { useEffect, useRef, useState } from 'react'
import Logo from '@/components/Logo'
import FooterLogo from '@/components/FooterLogo'
import BrainLogo from '@/components/BrainLogo'

// Project data with minimalist titles
const projects = [
  {
    id: 1,
    title: "Silence",
    year: "2021",
    image: "https://cdn.cosmos.so/7d47d4e2-0eff-4e2f-9734-9d24a8ba067e?format=jpeg"
  },
  {
    id: 2,
    title: "Resonance",
    year: "2022",
    image: "https://cdn.cosmos.so/5eee2d2d-3d4d-4ae5-96d4-cdbae70a2387?format=jpeg"
  },
  {
    id: 3,
    title: "Essence",
    year: "2022",
    image: "https://cdn.cosmos.so/def30e8a-34b2-48b1-86e1-07ec5c28f225?format=jpeg"
  },
  {
    id: 4,
    title: "Void",
    year: "2023",
    image: "https://cdn.cosmos.so/44d7cb23-6759-49e4-9dc1-acf771b3a0d1?format=jpeg"
  },
  {
    id: 5,
    title: "Presence",
    year: "2023",
    image: "https://cdn.cosmos.so/7712fe42-42ca-4fc5-9590-c89f2db99978?format=jpeg"
  },
  {
    id: 6,
    title: "Flow",
    year: "2024",
    image: "https://cdn.cosmos.so/cbee1ec5-01b6-4ffe-9f34-7da7980454cf?format=jpeg"
  },
  {
    id: 7,
    title: "Clarity",
    year: "2024",
    image: "https://cdn.cosmos.so/2e91a9d1-db85-4499-ad37-6222a6fea23b?format=jpeg"
  },
  {
    id: 8,
    title: "Breath",
    year: "2024",
    image: "https://cdn.cosmos.so/ff2ac3d3-fa94-4811-89f6-0d008b27e439?format=jpeg"
  },
  {
    id: 9,
    title: "Stillness",
    year: "2025",
    image: "https://cdn.cosmos.so/c39a4043-f489-4406-8018-a103a3f89802?format=jpeg"
  },
  {
    id: 10,
    title: "Surrender",
    year: "2025",
    image: "https://cdn.cosmos.so/e5e399f2-4050-463b-a781-4f5a1615f28e?format=jpeg"
  }
];

export default function Home() {
  const [currentView, setCurrentView] = useState('list')
  const [isAnimating, setIsAnimating] = useState(false)
  const popupOverlayRef = useRef<HTMLDivElement>(null)
  const popupImageRef = useRef<HTMLImageElement>(null)
  const projectsContainerRef = useRef<HTMLDivElement>(null)
  
  // State for popup functionality
  const popupHideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const popupShowTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentHoveredItemRef = useRef<HTMLElement | null>(null)
  const isPopupVisibleRef = useRef(false)
  const lastMouseMoveTimeRef = useRef(0)
  const lastInteractionTimeRef = useRef(0)
  const mouseOverImageContainerRef = useRef(false)
  const isMouseDownRef = useRef(false)

  useEffect(() => {
    // Initialize everything after component mounts
    initializeGSAP()
    initLenis()
    forceImageLoad()
    initialAnimation()
    setupGlobalEvents()
    setupLogoAnimations()
    setupFooterAnimation()
    attachHoverEvents()

    return () => {
      // Cleanup
      if (popupHideTimeoutRef.current) clearTimeout(popupHideTimeoutRef.current)
      if (popupShowTimeoutRef.current) clearTimeout(popupShowTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    // Re-attach hover events when view changes
    if (!isAnimating) {
      attachHoverEvents()
    }
  }, [currentView, isAnimating])

  const initializeGSAP = () => {
    const { gsap } = window as any;
    if (gsap && gsap.registerPlugin) {
      if ((window as any).Flip) gsap.registerPlugin((window as any).Flip);
      if ((window as any).ScrollTrigger) gsap.registerPlugin((window as any).ScrollTrigger);
      if ((window as any).CustomEase) {
        gsap.registerPlugin((window as any).CustomEase);
        (window as any).CustomEase.create("customEase", "0.6, 0.01, 0.05, 1");
      }
    }
  }

  const initLenis = () => {
    const Lenis = (window as any).Lenis;
    const { gsap } = window as any;
    const ScrollTrigger = (window as any).ScrollTrigger;
    
    if (!Lenis || !gsap) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false
    });

    if (ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  const setupLogoAnimations = () => {
    const { gsap } = window as any;
    if (!gsap) return;

    const headerLogoText = document.querySelector(".header-logo .logo-text");

    gsap.to(".header-logo", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });

    if (headerLogoText) {
      gsap.set(headerLogoText, {
        clipPath: "inset(100% 0 0 0)",
        opacity: 1
      });

      gsap.to(headerLogoText, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "power2.out",
        delay: 0.3
      });
    }
  }

  const setupFooterAnimation = () => {
    const { gsap } = window as any;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.set(".footer-logo", { opacity: 1 });

    const footerLogoText = document.querySelector(".footer-logo .logo-text");

    if (footerLogoText) {
      gsap.set(footerLogoText, {
        clipPath: "inset(100% 0 0 0)",
        opacity: 1
      });

      ScrollTrigger.create({
        trigger: ".footer-logo",
        start: "top 80%",
        onEnter: () => {
          gsap.to(footerLogoText, {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power2.out"
          });
        },
        once: true
      });
    }

    ScrollTrigger.batch(".footer-section", {
      start: "top 90%",
      onEnter: (batch: any) => {
        gsap.from(batch, {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      once: true
    });

    ScrollTrigger.create({
      trigger: ".footer-header",
      start: "top 85%",
      onEnter: () => {
        gsap.from(".light-text", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out"
        });

        gsap.from(".bold-text", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out"
        });
      },
      once: true
    });
  }

  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const setupGlobalEvents = () => {
    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("scroll", debounce(handleScroll, 50), { passive: true });
    
    document.addEventListener("mousedown", () => {
      isMouseDownRef.current = true;
    });
    
    document.addEventListener("mouseup", () => {
      isMouseDownRef.current = false;
    });

    document.addEventListener("mouseout", (e) => {
      if (e.relatedTarget === null || (e.relatedTarget as any)?.nodeName === "HTML") {
        hidePopup();
        mouseOverImageContainerRef.current = false;
        currentHoveredItemRef.current = null;
      }
    });
  }

  const handleGlobalMouseMove = (e: MouseEvent) => {
    lastMouseMoveTimeRef.current = Date.now();
    lastInteractionTimeRef.current = Date.now();

    if (currentView === "grid") {
      handleGridViewMouseMove(e);
    } else if (currentView === "list") {
      handleListViewMouseMove(e);
    }
  }

  const handleGridViewMouseMove = (e: MouseEvent) => {
    const imageContainers = document.querySelectorAll(".grid-view .project-image-container");
    let foundContainer: Element | null = null;

    imageContainers.forEach((container) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        foundContainer = container;
      }
    });

    if (foundContainer) {
      mouseOverImageContainerRef.current = true;
      if (popupHideTimeoutRef.current) {
        clearTimeout(popupHideTimeoutRef.current);
        popupHideTimeoutRef.current = null;
      }

      const projectItem = foundContainer.closest(".project-item") as HTMLElement;
      if (projectItem !== currentHoveredItemRef.current) {
        currentHoveredItemRef.current = projectItem;
        updatePopupFromItem(projectItem);
      }
    } else {
      mouseOverImageContainerRef.current = false;

      if (isPopupVisibleRef.current) {
        if (popupHideTimeoutRef.current) clearTimeout(popupHideTimeoutRef.current);
        popupHideTimeoutRef.current = setTimeout(() => {
          if (!mouseOverImageContainerRef.current) {
            hidePopup();
            currentHoveredItemRef.current = null;
          }
        }, 150);
      }
    }
  }

  const handleListViewMouseMove = (e: MouseEvent) => {
    const projectItems = document.querySelectorAll(".list-view .project-item");
    let foundItem: Element | null = null;

    projectItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (
        e.clientX >= rect.left - 2 &&
        e.clientX <= rect.right + 2 &&
        e.clientY >= rect.top - 2 &&
        e.clientY <= rect.bottom + 2
      ) {
        foundItem = item;
      }
    });

    if (foundItem) {
      if (foundItem !== currentHoveredItemRef.current) {
        currentHoveredItemRef.current = foundItem as HTMLElement;

        if (popupHideTimeoutRef.current) {
          clearTimeout(popupHideTimeoutRef.current);
          popupHideTimeoutRef.current = null;
        }

        if (popupShowTimeoutRef.current) clearTimeout(popupShowTimeoutRef.current);
        popupShowTimeoutRef.current = setTimeout(() => {
          updatePopupFromItem(foundItem as HTMLElement);
        }, 10);
      }
    } else {
      if (popupHideTimeoutRef.current) clearTimeout(popupHideTimeoutRef.current);
      popupHideTimeoutRef.current = setTimeout(() => {
        hidePopup();
        currentHoveredItemRef.current = null;
      }, 150);
    }
  }

  const handleScroll = () => {
    if (!isPopupVisibleRef.current) return;

    const containers = currentView === "grid"
      ? document.querySelectorAll(".project-image-container")
      : document.querySelectorAll(".project-item");

    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    let closestContainer: Element | null = null;
    let closestDistance = Infinity;

    containers.forEach((container) => {
      const rect = container.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(itemCenter - viewportCenter);

      if (
        distance < closestDistance &&
        rect.top < viewportHeight &&
        rect.bottom > 0
      ) {
        closestDistance = distance;
        closestContainer = container;
      }
    });

    if (closestContainer) {
      const projectItem = closestContainer.closest(".project-item") as HTMLElement;
      if (projectItem !== currentHoveredItemRef.current) {
        currentHoveredItemRef.current = projectItem;
        updatePopupFromItem(projectItem);
      }
    }
  }

  const updatePopupFromItem = (item: HTMLElement) => {
    if (!item) return;

    const projectId = item.dataset.id;
    const project = projects.find((p) => p.id == Number(projectId));

    if (project) {
      showPopup(project.image);
    }
  }

  const forceImageLoad = () => {
    projects.forEach((project) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        const domImg = document.querySelector(
          `.project-item[data-id="${project.id}"] .project-image`
        ) as HTMLImageElement;
        if (domImg) domImg.src = this.src;
      };
      img.src = project.image;
    });
  }

  const initialAnimation = () => {
    const { gsap } = window as any;
    if (!gsap) return;

    gsap.set(".project-item", { opacity: 0, y: 30 });
    gsap.to(".project-item", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: { each: 0.08, from: "start" }
    });
  }

  const attachHoverEvents = () => {
    removeAllHoverEvents();

    if (currentView === "list") {
      const projectItems = document.querySelectorAll(".list-view .project-item");
      projectItems.forEach((item) => {
        (item as HTMLElement).dataset.hovered = "false";
        item.addEventListener("mouseenter", listItemMouseEnter);
        item.addEventListener("mouseleave", listItemMouseLeave);
      });
    }

    if (currentView === "grid") {
      const imageContainers = document.querySelectorAll(".grid-view .project-image-container");
      imageContainers.forEach((container) => {
        (container as HTMLElement).dataset.hovered = "false";
        container.addEventListener("mouseenter", gridContainerMouseEnter);
        container.addEventListener("mouseleave", gridContainerMouseLeave);
      });
    }
  }

  const removeAllHoverEvents = () => {
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach((item) => {
      item.removeEventListener("mouseenter", listItemMouseEnter);
      item.removeEventListener("mouseleave", listItemMouseLeave);
    });

    const imageContainers = document.querySelectorAll(".project-image-container");
    imageContainers.forEach((container) => {
      container.removeEventListener("mouseenter", gridContainerMouseEnter);
      container.removeEventListener("mouseleave", gridContainerMouseLeave);
    });
  }

  const listItemMouseEnter = function (this: HTMLElement) {
    if (currentView !== "list") return;

    this.dataset.hovered = "true";
    if (popupHideTimeoutRef.current) {
      clearTimeout(popupHideTimeoutRef.current);
      popupHideTimeoutRef.current = null;
    }
    currentHoveredItemRef.current = this;

    setTimeout(() => {
      if (this.dataset.hovered === "true") {
        const projectId = this.dataset.id;
        const project = projects.find((p) => p.id == Number(projectId));
        if (project) {
          showPopup(project.image);
        }
      }
    }, 10);
  }

  const listItemMouseLeave = function (this: HTMLElement) {
    if (currentView !== "list") return;

    this.dataset.hovered = "false";

    if (popupHideTimeoutRef.current) clearTimeout(popupHideTimeoutRef.current);
    popupHideTimeoutRef.current = setTimeout(() => {
      const anyHovered = Array.from(
        document.querySelectorAll(".list-view .project-item")
      ).some((p) => (p as HTMLElement).dataset.hovered === "true");
      if (!anyHovered) {
        hidePopup();
        currentHoveredItemRef.current = null;
      }
    }, 150);
  }

  const gridContainerMouseEnter = function (this: HTMLElement) {
    if (currentView !== "grid") return;

    this.dataset.hovered = "true";
    mouseOverImageContainerRef.current = true;
    if (popupHideTimeoutRef.current) {
      clearTimeout(popupHideTimeoutRef.current);
      popupHideTimeoutRef.current = null;
    }

    const projectItem = this.closest(".project-item") as HTMLElement;
    currentHoveredItemRef.current = projectItem;

    setTimeout(() => {
      if (this.dataset.hovered === "true") {
        const img = this.querySelector(".project-image") as HTMLImageElement;
        if (img && img.src) {
          showPopup(img.src);
        }
      }
    }, 10);
  }

  const gridContainerMouseLeave = function (this: HTMLElement) {
    if (currentView !== "grid") return;

    this.dataset.hovered = "false";
    mouseOverImageContainerRef.current = false;

    if (popupHideTimeoutRef.current) clearTimeout(popupHideTimeoutRef.current);
    popupHideTimeoutRef.current = setTimeout(() => {
      const anyHovered = Array.from(
        document.querySelectorAll(".grid-view .project-image-container")
      ).some((c) => (c as HTMLElement).dataset.hovered === "true");
      if (!anyHovered) {
        hidePopup();
        currentHoveredItemRef.current = null;
      }
    }, 150);
  }

  const showPopup = (src: string) => {
    if (!src || !popupOverlayRef.current || !popupImageRef.current) return;

    const { gsap } = window as any;
    if (!gsap) return;

    if (popupOverlayRef.current.style.display !== "flex") {
      isPopupVisibleRef.current = true;
      popupImageRef.current.src = src;
      popupOverlayRef.current.style.display = "flex";
      gsap.fromTo(
        popupOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else if (popupImageRef.current.src !== src) {
      gsap.to(popupImageRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          if (popupImageRef.current) {
            popupImageRef.current.src = src;
            gsap.to(popupImageRef.current, {
              opacity: 1,
              duration: 0.1,
              ease: "power2.out"
            });
          }
        }
      });
    }
  }

  const hidePopup = () => {
    if (Date.now() - lastInteractionTimeRef.current < 100) return;

    const { gsap } = window as any;
    if (!gsap || !popupOverlayRef.current) return;

    isPopupVisibleRef.current = false;

    gsap.to(popupOverlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        if (popupOverlayRef.current) {
          popupOverlayRef.current.style.display = "none";
        }
      }
    });
  }

  const toggleView = (viewType: string) => {
    if (currentView === viewType || isAnimating) return;
    setIsAnimating(true);

    hidePopup();
    currentHoveredItemRef.current = null;
    mouseOverImageContainerRef.current = false;

    if (popupHideTimeoutRef.current) {
      clearTimeout(popupHideTimeoutRef.current);
      popupHideTimeoutRef.current = null;
    }

    if (popupShowTimeoutRef.current) {
      clearTimeout(popupShowTimeoutRef.current);
      popupShowTimeoutRef.current = null;
    }

    const { gsap } = window as any;
    const Flip = (window as any).Flip;

    if (!gsap || !Flip) {
      if (projectsContainerRef.current) {
        projectsContainerRef.current.classList.remove(`${currentView}-view`);
        projectsContainerRef.current.classList.add(`${viewType}-view`);
      }
      setCurrentView(viewType);
      setIsAnimating(false);
      setTimeout(attachHoverEvents, 100);
      return;
    }

    const projectItems = document.querySelectorAll(".project-item");
    const titleElements = document.querySelectorAll(".project-title");
    const yearElements = document.querySelectorAll(".project-year");
    const imageContainers = document.querySelectorAll(".project-image-container");
    const imageElements = document.querySelectorAll(".project-image");

    if (viewType === "list") {
      imageContainers.forEach((container) =>
        (container as HTMLElement).classList.add("transitioning-to-list")
      );
    }

    const state = Flip.getState([
      projectItems,
      titleElements,
      yearElements,
      imageContainers
    ]);
    
    if (projectsContainerRef.current) {
      projectsContainerRef.current.classList.remove(`${currentView}-view`);
      projectsContainerRef.current.classList.add(`${viewType}-view`);
    }
    
    setCurrentView(viewType);

    if (viewType === "grid") {
      gsap.set(imageContainers, {
        display: "block",
        visibility: "visible",
        opacity: 1
      });
      gsap.set(imageElements, { clipPath: "inset(100% 0% 0% 0%)" });
    }

    Flip.from(state, {
      duration: 1,
      ease: "power2.out",
      absolute: true,
      nested: true,
      onEnter: (elements: any) =>
        gsap.fromTo(
          elements,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" }
        ),
      onLeave: (elements: any) =>
        gsap.to(elements, { opacity: 0, duration: 0.5, ease: "power2.out" }),
      onComplete: () => {
        viewType === "grid" ? animateImagesIn() : animateImagesOut();
        setTimeout(attachHoverEvents, 100);
      }
    });
  }

  const animateImagesIn = () => {
    const { gsap } = window as any;
    if (!gsap) {
      setIsAnimating(false);
      return;
    }

    const imageElements = document.querySelectorAll(".project-image");
    gsap.to(imageElements, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.06,
      onComplete: () => {
        setIsAnimating(false);
        setTimeout(attachHoverEvents, 100);
      }
    });
  }

  const animateImagesOut = () => {
    const { gsap } = window as any;
    if (!gsap) {
      setIsAnimating(false);
      return;
    }

    const imageElements = document.querySelectorAll(".project-image");
    const imageContainers = document.querySelectorAll(".project-image-container");
    gsap.to(imageElements, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.06,
      onComplete: () => {
        imageContainers.forEach((container) =>
          (container as HTMLElement).classList.remove("transitioning-to-list")
        );
        gsap.set(imageContainers, { display: "none", visibility: "hidden" });
        setIsAnimating(false);
        setTimeout(attachHoverEvents, 100);
      }
    });
  }

  return (
    <>
      {/* Header and Navigation */}
      <header className="site-header">
        <div className="grid-container">
          {/* Logo with brain */}
          <div className="logo-container">
            <BrainLogo />
          </div>

          <nav className="main-nav">
            <ul>
              <li><a href="#" className="active">SELECTED WORKS<sup>10</sup></a></li>
              <li><a href="#">ABOUT</a></li>
              <li><a href="#">JOURNAL</a></li>
            </ul>
          </nav>

          <div className="contact-link">
            <a href="mailto:hi@filip.fyi">+GET IN TOUCH</a>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="grid-container">
          {/* Header Logo */}
          <div className="header-logo">
            <Logo />
          </div>

          <div className="header">
            <div className="header-title">
              <h1>SELECTED WORKS<sup>10</sup></h1>
            </div>
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${currentView === 'list' ? 'active' : ''}`}
                onClick={() => toggleView('list')}
              >
                List
              </button>
              <button 
                className={`toggle-btn ${currentView === 'grid' ? 'active' : ''}`}
                onClick={() => toggleView('grid')}
              >
                Grid
              </button>
            </div>
          </div>

          <div 
            ref={projectsContainerRef}
            id="projects-container" 
            className={`projects-container ${currentView}-view`}
          >
            {projects.map((project) => (
              <div key={project.id} className="project-item" data-id={project.id}>
                <div className="project-image-container">
                  <img 
                    className="project-image" 
                    src={project.image} 
                    alt={project.title} 
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="project-title">{project.title}</div>
                <div className="project-year">{project.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Overlay for Image Preview */}
      <div ref={popupOverlayRef} id="popup-overlay">
        <div className="popup-content">
          <img 
            ref={popupImageRef}
            className="popup-image" 
            src="/placeholder.svg" 
            alt="Popup Image"
          />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-header">
            <h2>
              <span className="light-text">Find the essence in simplicity,</span>
              <span className="bold-text">Create without boundaries.</span>
            </h2>
          </div>

          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-section">
                <h3>Contact</h3>
                <p><a href="mailto:hi@filip.fyi">hi@filip.fyi</a></p>
                <p><a href="tel:+381631943959">+381.63.TARA.959</a></p>
              </div>

              <div className="footer-section">
                <h3>&nbsp;</h3>
                <p>&nbsp;</p>
              </div>
            </div>

            <div className="footer-column">
              <div className="footer-section">
                <p><a href="#">Sound</a></p>
                <p><a href="#">Vision</a></p>
                <p><a href="#">Feeling</a></p>
              </div>

              <div className="footer-section">
                <h3>Fragments</h3>
                <p>Receive Signals</p>
              </div>
            </div>

            <div className="footer-column">
              <div className="footer-section">
                <p><a href="#">Works<sup>(10)</sup></a></p>
                <p><a href="#">About</a></p>
                <p><a href="#">Journal</a></p>
              </div>

              <div className="footer-section">
                <h3>Location</h3>
                <p>43.9359° N, 19.4959° E</p>
              </div>
            </div>
          </div>

          {/* Footer Logo */}
          <div className="footer-logo">
            <FooterLogo />
          </div>
        </div>
      </footer>
    </>
  )
}
