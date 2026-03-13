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
        <div className="lg:grid lg:grid-cols-5 lg:grid-rows-2 grid-cols-1 grid-rows-2 text-white bg-radial from-slate-600-transparent to-slate-950">
          <h2 className="text-h2 bg-background text-black min-h-20 font-semibold tracking-tight text-accent-blue col-span-4 row-span-1 border-b px-2">
            Hi, I'm Jordan Thijssen, your <br /> <TypeWriterText texts={roles} />
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
              <h3 className="text-h3 font-semibold font-space-mono mb-2">1. Data Discovery - Tying Questions and Strategy to Data</h3>
              <p className="text-body">
                A consultation for me to align with you on what measurable success means for your business. What questions can we ask the data to gain insights into customer spending, cost saving and more?
                From there we can decide which data sources I need to answer the questions, and set desired KPIs, Actions, Deliverables and Outcomes.
              </p>
            </div>
            <div className="flex justify-center my-2">
              <TbSTurnDown className="text-4xl text-black" />
            </div>
            <div
              ref={(el) => { stepRefs.current[1] = el; }}
              className={`border-2 border-black inset-border p-6 transition-opacity duration-700 ease-in-out ${visibleSteps.has(1) ? 'opacity-100' : 'opacity-0'}`}
            >
              <h3 className="text-h3 font-semibold font-space-mono mb-2">2. Data Collection - Building the ETL Pipeline</h3>
              <p className="text-body">
                I will build the systems, models, dashboards and reports you need, outlining any domain specific questions and access requests to avoid delays. With exploratory data analysis and hypothesis testing, we can build the best set of solutions for your business.
              </p>
            </div>
            <div className="flex justify-center my-2">
              <TbSTurnDown className="text-4xl text-black" />
            </div>
            <div
              ref={(el) => { stepRefs.current[2] = el; }}
              className={`border-2 border-black inset-border p-6 transition-opacity duration-700 ease-in-out ${visibleSteps.has(2) ? 'opacity-100' : 'opacity-0'}`}
            >
              <h3 className="text-h3 font-semibold font-space-mono mb-2">3. Field Testing - Questions <span className="font-titillium-web">{'=>'}</span> Answers and Actions <span className="font-titillium-web">{'=>'}</span> Outcomes</h3>
              <p className="text-body">
                You implement operational changes based on the answers, and we use the data to track success. Regular check-ins and a live dashboard will keep you fully up to date with progress and KPIs.
              </p>
            </div>
            <div className="flex justify-center my-2">
              <TbSTurnDown className="text-4xl text-black" />
            </div>
            <div
              ref={(el) => { stepRefs.current[3] = el; }}
              className={`border-2 border-black inset-border p-6 transition-opacity duration-700 ease-in-out ${visibleSteps.has(3) ? 'opacity-100' : 'opacity-0'}`}
            >
              <h3 className="text-h3 font-semibold font-space-mono mb-2">4. Iterate and Improve - Developing Deeper Understanding</h3>
              <p className="text-body">
                As your business and its needs evolve, and as we gain more insights from your data, we can target and track more specific niches to new levels of success and customer satisfaction.
              </p>
            </div>
            {/* <div className="flex justify-center my-2">
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
            </div> */}
          </div>
        </div>
      </section>

      <section id="tech-stack" className="border-x border-black text-white bg-radial from-slate-600-transparent to-slate-950">
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

      <section id="about" className="border-x bg-background">
        <div className="flex flex-col">
          <h2 className="text-h2 font-semibold font-space-mono px-2 border-b">
            My Story
          </h2>
          <div className="p-6 bg-background">
            <p className="text-h3 border-b mb-4">
              Emerging Data Scientist with a background in Energy Software Development and BSc Physics from the University of Kent.
            </p>
            <p className="text-body">
              I believe in the power of data to empower even the smallest businesses to build success in our communities from the ground up.
              Physical Science tells us the laws of the universe, Data Science tells us the laws of business.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="border-x border-black bg-background">
        <h2 className="text-h2 font-semibold font-space-mono px-2 border-b">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          <div className="p-4 h-full flex">
            <ProjectCard
              title="Ecommerce Data Exploration"
              description="Explore how a single CSV of invoices for an online retailer fountains into endless valuable insights with a few simple data analysis tools in Python"
              imageSrc="/images/ecommerce.png"
              imageAlt="Ecommerce Data Exploration"
              imageSize={512}
              link="https://ecommerce-eda.streamlit.app/"
            />
          </div>
          <div className="p-4 h-full flex">
            <ProjectCard
              title="Geothermal & Volcano Dashboard"
              description="Geothermal Activity and Volcano Dashboard for identifying new renewable opportunities"
              imageSrc="/images/geothermal.jpg"
              imageAlt="Geothermal & Volcano Dashboard"
              imageSize={512}
              link="/geothermal"
            />
          </div>
          <div className="p-4 h-full flex">
            <ProjectCard
              title="MarketMinder"
              description="30 second evaluations for local businesses for buyers, owners and prospectors using location data and demographics"
              imageSrc="/images/mmlogo.png"
              imageAlt="MarketMinder"
              imageSize={225}
              link="https://www.marketminder.co.uk"
            />
          </div>

        </div>
      </section>

      <section id="contact" className="border-x border-black">
        <div className="flex flex-col">
          <h2 className="text-h2 font-semibold font-space-mono px-2 border-y bg-background">
            Get in touch
          </h2>
          <div className="p-6 ">
            <p className="text-body mb-6">
              Interested in exploring how data analytics can help your business? Whether you're a <strong className="font-semibold">Sole Trader</strong>, <strong className="font-semibold">Local Business</strong>, or planning to <strong className="font-semibold">Scale Up</strong>, I'm excited to see what we can build together.
            </p>
            <div className="border border-black p-8 bg-slate-600-transparent">
              <ContactForm />
            </div>
            <div className="border border-black p-6 mt-6 bg-background">
              <p className="text-body">
                <strong>Email:</strong> live@datadrivenscience.co.uk
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
