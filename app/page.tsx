"use client";


import Image from "next/image";

import TypeWriterText from "@/components/TypeWriterText";
import { useState } from "react";
import Carousel3D from "@/components/Carousel3D";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import techStackData from "@/components/carousel-data";
import OdometerText from "@/components/OdometerText";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";

const roles = [" Data Scientist", " Business Partner", " Full Stack Developer", ' "Numbers Guy"'];
const products = ['Pricing Models', 'Data Pipelines', 'Feedback Studies', 'Behaviour Models', 'Demand Forecasts']

const renderStrategy = (strategy: string) => {
  switch (strategy) {
    case "Revenue Growth":
      return <p className="text-body lg:w-1/2">
        Increase <strong>average order value</strong> and <strong>customer lifetime value</strong> through data-driven insights. Improve <strong>conversion rates</strong> and customer acquisition efficiency.
      </p>
    case "Pricing & Promotions":
      return <p className="text-body lg:w-1/2">
        Make data-backed <strong>pricing and promotion decisions</strong>. Optimize strategies based on demand patterns and customer behavior.
      </p>
    case "Forecasting & Planning":
      return <p className="text-body lg:w-1/2">
        More accurate <strong>demand and revenue forecasts</strong>. Plan inventory, staffing, and budgets with confidence.
      </p>
    case "Efficiency & Visibility":
      return <p className="text-body lg:w-1/2">
        Reduce running costs, operational and marketing waste. Gain clear, ongoing visibility into performance through <strong>dashboards and reports</strong>.
      </p>
    case "Customer Intelligence":
      return <p className="text-body lg:w-1/2">
        Clear identification of <strong>high-value vs low-value customers</strong>. Segment and target effectively to maximize return on marketing spend.
      </p>
  }
};

export default function Home() {

  const [selectedStrategy, setSelectedStrategy] = useState<string>("Revenue Growth");
  const [activeTechIndex, setActiveTechIndex] = useState<number>(0);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleStrategyHover = (mouseEvent: React.MouseEvent<HTMLLIElement>) => {
    setSelectedStrategy(mouseEvent.currentTarget.id);
  };

  return (
    <main className="mx-auto lg:max-w-[80vw] w-[90vw]  text-black">
      <section id="about" className="border-l border-r border-black ">
        <div className="lg:grid lg:grid-cols-5 lg:grid-rows-2 grid-cols-1 grid-rows-2 text-white bg-slate-600-transparent">
          <h2 className="text-h2 bg-background text-black min-h-20 font-semibold tracking-tight text-accent-blue col-span-4 row-span-1 border-b px-2">
            Hi, I'm Jordan Thijssen, your <TypeWriterText texts={roles} />
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
          <h3 className="text-h3 font-semibold font-kode-mono italic text-center pt-4 grid-cols-2">
            With me you will:
          </h3>
        </div>
      </section>

      <section id="mission" className="border-x border-black bg-background">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="border-2 w-2/3 border-black inset-border lg:p-8 p-2 duration-200 ease-in-out hover:bg-orange-500">
              <h2 className="text-h2 font-semibold font-kode-mono italic">Make Money</h2>
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
            <div className="text-right border-x-2 border-black inset-border lg:p-8 duration-200 ease-in-out hover:bg-blue-500 w-3/4">
              <h2 className="text-h2 font-semibold font-kode-mono italic">Save Money</h2>
              <p className="text-body wrap-reverse">
                Find inefficiencies in operations, reduce waste, and cut unnecessary costs. Make informed decisions about where to invest.
              </p>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="border-2 w-4/5 border-black inset-border lg:p-8 p-2 duration-200 ease-in-out hover:bg-green-500">
              <h2 className="text-h2 font-semibold font-kode-mono italic">Understand Customers</h2>
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

      <section id="strategy" className="border-x border-black bg-background cursor-default">
        <div className="flex flex-col">
          <h2 className="text-h2 font-semibold font-kode-mono italic">A Clear Strategy: Data Driven Outcomes</h2>
          <div className="flex flex-row">
            <ol className="w-1/3">
              <li id="Revenue Growth" onMouseEnter={handleStrategyHover}><h3 className={`text-h3 border-t duration-200 ease-in-out ${selectedStrategy === "Revenue Growth" ? "bg-blue-500 text-white" : ""}`}>Revenue Growth</h3></li>
              <li id="Customer Intelligence" onMouseEnter={handleStrategyHover}><h3 className={`text-h3 duration-200 ease-in-out ${selectedStrategy === "Customer Intelligence" ? "bg-blue-500 text-white" : ""}`}>Customer Intelligence</h3></li>
              <li id="Pricing & Promotions" onMouseEnter={handleStrategyHover}><h3 className={`text-h3 duration-200 ease-in-out ${selectedStrategy === "Pricing & Promotions" ? "bg-blue-500 text-white" : ""}`}>Pricing & Promotions</h3></li>
              <li id="Forecasting & Planning" onMouseEnter={handleStrategyHover}><h3 className={`text-h3 duration-200 ease-in-out ${selectedStrategy === "Forecasting & Planning" ? "bg-blue-500 text-white" : ""}`}>Forecasting & Planning</h3></li>
              <li id="Efficiency & Visibility" onMouseEnter={handleStrategyHover}><h3 className={`text-h3 duration-200 ease-in-out ${selectedStrategy === "Efficiency & Visibility" ? "bg-blue-500 text-white" : ""}`}>Efficiency & Visibility</h3></li>
            </ol>
            <div id={selectedStrategy} className="w-2/3 border p-2 border-black inset-border">
              {renderStrategy(selectedStrategy)}
            </div>
          </div>
        </div>
      </section>

      <section id="tech-stack" className="border-x border-black text-white bg-slate-600-transparent">
        <div className="flex flex-col">
          <h2 className="text-h2 font-semibold font-kode-mono italic px-2 border-b">My Arsenal</h2>
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
          <h2 className="text-h2 font-semibold font-kode-mono italic px-2 border-b">
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
          <h2 className="text-h2 font-semibold font-kode-mono italic px-2 border-b">
            Get in touch
          </h2>
          <div className="p-6">
            <p className="text-body mb-6">
              Interested in exploring how data analytics can help your business? Let's discuss your specific situation and see if there's a fit.
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
