"use client";


import Image from "next/image";

import TypeWriterText from "@/components/TypeWriterText";
import { useState, useRef, useEffect } from "react";
import Carousel3D from "@/components/Carousel3D";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import techStackData from "@/components/carousel-data";
import { TbSTurnDown } from "react-icons/tb";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";

const roles = [" Data Scientist", " Business Partner", " Full Stack Developer", ' "Numbers Guy"'];
const products = ['Pricing Models', 'Data Pipelines', 'Feedback Studies', 'Behaviour Models', 'Demand Forecasts']


export default function Home() {

  const [activeTechIndex, setActiveTechIndex] = useState<number>(0);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.75 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);


  return (
    <main className="mx-auto lg:max-w-[80vw] w-[90vw]  text-black">
      <section id="about" className="border-l border-r border-black ">
        <div className="lg:grid lg:grid-cols-5 lg:grid-rows-2 grid-cols-1 grid-rows-2 text-white bg-slate-600-transparent">
          <h2 className="text-h2 bg-background text-black min-h-20 font-semibold tracking-tight text-accent-blue col-span-4 row-span-1 border-b px-2">
            Hi, I'm Jordan Thijssen, your <br/> <TypeWriterText texts={roles} />
          </h2>

          <div className="col-span-1 row-span-2 flex flex-col text-right border-l bg-background text-black">
            <h3 className="text-right text-h4 font-semibold">
              Let's Build
            </h3>
            <h3 className="text-h4 font-semibold text-right">
              <TypeWriterText texts={products} pauseDuration={2500} typingSpeed={80} deletingSpeed={40} />
            </h3>
            <h3 className="text-right text-h3 font-semibold">
              Together
            </h3>
          </div>
          <span className="text-small mx-auto text-gray-100 italic"> Get the most out of your data</span>
          <h3 className="text-h3 font-semibold font-space-mono text-center pt-4 grid-cols-2">
            With me you will:
          </h3>
        </div>
      </section>

      <section id="mission" className="border-x border-black bg-background">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="border-2 w-2/3 border-black bg-linear-to-br from-orange-500 to-white inset-border lg:p-8 p-2 duration-200 ease-in-out hover:from-white hover:to-orange-500">
              <h2 className="text-h2 font-semibold font-space-mono">Make Money</h2>
              <p className="text-body lg:w-1/2">
                Identify your most profitable products, services, and customers. Optimize pricing strategies based on real demand patterns.
              </p>
            </div>
            <div className="w-1/3">
              <Image src="/images/gold.jpg" alt="Gold" width={500} height={500} />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/3">
              <Image src="/images/savings.jpg" alt="Savings" width={500} height={500} />
            </div>
            <div className="text-right border-x-2 border-black bg-linear-to-tl from-blue-500 to-white inset-border lg:p-8 duration-200 ease-in-out hover:bg-linear-to-br w-3/4">
              <h2 className="text-h2 font-semibold font-space-mono">Save Money</h2>
              <p className="text-body wrap-reverse">
                Find inefficiencies in operations, reduce waste, and cut unnecessary costs. Make informed decisions about where to invest.
              </p>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="border-2 w-4/5 border-black bg-linear-to-bl from-green-500 to-white inset-border lg:p-8 p-2 duration-200 ease-in-out hover:from-white hover:to-green-500">
              <h2 className="text-h2 font-semibold font-space-mono">Understand Customers</h2>
              <p className="text-body lg:w-1/2">
                Segment your customer base. Predict churn. Understand what drives satisfaction and loyalty.
              </p>
            </div>
            <div className="border-y-2 border-black inset-border">
              <Image src="/images/chat.jpg" alt="Customers" width={300} height={200} />
            </div>
          </div>
        </div>
      </section>

      <section id="strategy" className="border-x border-black bg-background">
        <div className="flex flex-col">
          <h2 className="text-h2 font-semibold font-space-mono px-2 border-b">A Clear Strategy: Data Driven Outcomes in 4 Steps</h2>
          <div className="flex flex-col p-6 gap-6">
            <div 
              ref={(el) => { stepRefs.current[0] = el; }}
              className={`border-2 border-black inset-border p-6 transition-opacity duration-700 ease-in-out ${visibleSteps.has(0) ? 'opacity-100' : 'opacity-0'}`}
            >
              <h3 className="text-h3 font-semibold font-space-mono mb-2">Step 1: Setup Data Collection, Pipelines and Tracking</h3>
              <p className="text-body">
                Extract, Transform and Load (ETL) is the first and most important step. I'll collect and store your order history, track clicks on your website and sales funnels, and scrape the web for customer feedback.
              </p>
            </div>
            <div className="flex justify-center my-2">
              <TbSTurnDown className="text-4xl text-black" />
            </div>
            <div 
              ref={(el) => { stepRefs.current[1] = el; }}
              className={`border-2 border-black inset-border p-6 transition-opacity duration-700 ease-in-out ${visibleSteps.has(1) ? 'opacity-100' : 'opacity-0'}`}
            >
              <h3 className="text-h3 font-semibold font-space-mono mb-2">Step 2: Data Exploration, Determine KPIs, Metrics, Actions, Deliverables and Outcomes</h3>
              <p className="text-body">
                We sit down and have a chat about what success means for you. Be prepared, I will have lots of questions. 
              </p>
            </div>
            <div className="flex justify-center my-2">
              <TbSTurnDown className="text-4xl text-black" />
            </div>
            <div 
              ref={(el) => { stepRefs.current[2] = el; }}
              className={`border-2 border-black inset-border p-6 transition-opacity duration-700 ease-in-out ${visibleSteps.has(2) ? 'opacity-100' : 'opacity-0'}`}
            >
              <h3 className="text-h3 font-semibold font-space-mono mb-2">Step 3: Implementation, Improvements, Tracking</h3>
              <p className="text-body">
                I build the Systems, Models, Dashboards and Reports you need. Let the data tell us where you're at, where you want to be, and how to get there. 
              </p>
            </div>
            <div className="flex justify-center my-2">
              <TbSTurnDown className="text-4xl text-black" />
            </div>
            <div 
              ref={(el) => { stepRefs.current[3] = el; }}
              className={`border-2 border-black inset-border p-6 transition-opacity duration-700 ease-in-out ${visibleSteps.has(3) ? 'opacity-100' : 'opacity-0'}`}
            >
              <h3 className="text-h3 font-semibold font-space-mono mb-2">Step 4: Feedback Results to Determine Success</h3>
              <p className="text-body">
                Regular check-ins using the systems I've built to see the progress towards KPIs and if the desired outcomes are being achieved.
              </p>
            </div>
            <div className="flex justify-center my-2">
              <TbSTurnDown className="text-4xl text-black" />
            </div>
            <div 
              ref={(el) => { stepRefs.current[4] = el; }}
              className={`border-2 border-black inset-border bg-gray-300 p-6 transition-opacity duration-700 ease-in-out ${visibleSteps.has(4) ? 'opacity-100' : 'opacity-0'}`}
            >
              <h3 className="text-h3 font-semibold font-space-mono mb-2">(Bonus) Step 5: Repeat</h3>
              <p className="text-body">
                Iterate over steps 3 and 4 to keep improving, Double Down on Big Wins. If anything isn't working, I'll find out why. Occasionally, we may add more KPIs and data collection as your business evolves.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="tech-stack" className="border-x border-black text-white bg-slate-600-transparent">
        <div className="flex flex-col">
          <h2 className="text-h2 font-semibold font-space-mono px-2 border-b">My Arsenal</h2>
          <div className="flex flex-col lg:flex-row min-h-[40vh] px-4">
            <div className="flex-1 flex justify-center items-center">
              <Carousel3D onActiveIndexChange={setActiveTechIndex} />
            </div>
            <div className="flex-1 flex flex-col inset-border">
              {techStackData[activeTechIndex] && (
                <>
                  <h3 className="text-h2 font-semibold mb-4">{techStackData[activeTechIndex].title}</h3>
                  <p className="text-body">{techStackData[activeTechIndex].desc}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* <section id="testimonials" className="py-20 border-t border-l border-r border-black  bg-background">
        
      </section> */}

      <section id="projects" className="border-x border-black bg-background">
        <div className="flex flex-col">
          <h2 className="text-h2 font-semibold font-space-mono px-2 border-b">
            My Projects
          </h2>
          <div className="grid gap-8 p-6 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="MarketMinder"
              description="30 second evaluations for local businesses for buyers, owners and prospectors using location data and demographics"
              imageSrc="/images/mmlogo.png"
              imageAlt="MarketMinder"
              link="https://www.marketminder.co.uk"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="border-x border-black bg-background">
        <div className="flex flex-col">
          <h2 className="text-h2 font-semibold font-space-mono px-2 border-b">
            Get in touch
          </h2>
          <div className="p-6">
            <p className="text-body mb-6">
              Interested in exploring how data analytics can help your business? Whether you're a <strong className="font-semibold">Sole Trader</strong>, <strong className="font-semibold">Local Business</strong>, or planning to <strong className="font-semibold">Scale Up</strong>, I'm excited to see what we can build together.
            </p>
            <div className="border border-black p-8 bg-slate-600-transparent">
              <ContactForm />
            </div>
            <div className="border border-black p-6 mt-6">
              <p className="text-body">
                <strong>Email:</strong> jordanthij@gmail.com
              </p>
              <p className="text-body">
                <strong>Initial consultation:</strong> Free, no obligation
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
