import Image from "next/image";

export interface CarouselItem {
  id: number;
  bgColor: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}
import { FaChartLine, FaDatabase } from "react-icons/fa";
import { RiDashboard2Line } from "react-icons/ri";
import { PiCursorClick } from "react-icons/pi";
import { ImPriceTags } from "react-icons/im";
import { VscFeedback, VscPerson } from "react-icons/vsc";

export const techStackData: CarouselItem[] = [
  {
    id: 1,
    bgColor: "#3776AB",
    icon: <Image src="/images/python.png" alt="Python" width={80} height={80} className="object-contain" />,
    title: "Python",
    desc: "I'd be shocked if a data scientist didn't have python in their toolbelt. It's a general purpose programming language but it's great at automating data collection, exploratory data analysis, web scraping, ETL, and building machine learning models"
  },
  {
    id: 2,
    bgColor: "#11557C",
    icon: <Image src="/images/matplotlib.png" alt="MatPlotLib" width={80} height={80} className="object-contain" />,
    title: "MatPlotLib",
    desc: "Python's go-to library for data visualization. Primarily used during exploratory data analysis for quick insights and relationshps between metrics"
  },
  {
    id: 3,
    bgColor: "#EE4C2C",
    icon: <Image src="/images/pytorch.svg" alt="PyTorch" width={80} height={80} className="object-contain" />,
    title: "PyTorch",
    desc: "Builds machine learning models for predictive analytics. Powers forecasting, customer segmentation, and pattern recognition."
  },
  {
    id: 4,
    bgColor: "#009688",
    icon: <Image src="/images/fastapi.svg" alt="FastAPI" width={80} height={80} className="object-contain" />,
    title: "FastAPI",
    desc: "As the name suggests, FastAPI provides speedy API development and documentation. Stores, loads and validates data for dashboards and processing."
  },
  {
    id: 5,
    bgColor: "#4479A1",
    icon: <Image src="/images/mysql.svg" alt="MySQL" width={80} height={80} className="object-contain" />,
    title: "MySQL",
    desc: "The final step of the ETL process. works with FastAPI to store and query data for dashboards and processing."
  },
  {
    id: 6,
    bgColor: "#000000",
    icon: <Image src="/images/nextjs.svg" alt="Next.js" width={80} height={80} className="object-contain" />,
    title: "Next.js",
    desc: "Powers web applications and interactive dashboards. Delivers fast, responsive interfaces for viewing and exploring data."
  },
  {
    id: 7,
    bgColor: "#06B6D4",
    icon: <Image src="/images/tailwind.svg" alt="Tailwind CSS" width={80} height={80} className="object-contain" />,
    title: "Tailwind",
    desc: "Enables modern, responsive design for dashboards and web interfaces. Ensures data visualizations look great on any device."
  },
  {
    id: 8,
    bgColor: "#3178C6",
    icon: <Image src="/images/typescript.svg" alt="TypeScript" width={80} height={80} className="object-contain" />,
    title: "TypeScript",
    desc: "Ensures reliable, maintainable code for web applications. Reduces errors and makes systems more robust."
  },
  {
    id: 9,
    bgColor: "#217346",
    icon: <Image src="/images/excel.svg" alt="Excel" width={80} height={80} className="object-contain" />,
    title: "Excel",
    desc: "Great All-Rounder. While it lacks the flexibility of SQL and Python, it's easy to use and good for exporting reports quickly"
  },
  {
    id: 10,
    bgColor: "#FF6384",
    icon: <Image src="/images/chartjs.svg" alt="Chart.js" width={80} height={80} className="object-contain" />,
    title: "Chart.js",
    desc: "Creates interactive charts and visualizations for dashboards. Makes data exploration intuitive and engaging."
  }
];

export const servicesData: CarouselItem[] = [
  {
    id: 1,
    bgColor: "#9333EA",
    icon: <FaDatabase  size={40} className="object-contain" />,
    title: "ETL Pipeline",
    desc: "Automated collection of data from multiple sources into a single, secure database for quick analysis and reporting."
  },
  {
    id: 2,
    bgColor: "#2563EB",
    icon: <RiDashboard2Line size={40} className="object-contain" />,
    title: "Real-Time Dashboard",
    desc: "All your latest business status and health checks in one place. Customized to your needs to track the KPIs that matter the most."
  },
  {
    id: 3,
    bgColor: "#16A34A",
    icon: <FaChartLine size={40} className="object-contain" />,
    title: "Demand Forecasting",
    desc: "Historic data is plugged into custom models to predict upcoming demand, predictions can be for the entire business model and tailored to specific products."
  },
  {
    id: 4,
    bgColor: "#EAB308",
    icon: <PiCursorClick size={40} className="object-contain" />,
    title: "Website Tracker",
    desc: "Tracks website traffic and engagement to understand customer behavior. Track where and when they click, discover which paths lead to either sales or abandonment."
  },  
  {
    id: 5,
    bgColor: "#EA580C",
    icon: <ImPriceTags size={40} className="object-contain" />,
    title: "Pricing Models",
    desc: "For complex products and services, profit margins aren't always well defined. A pricing model can accurately calculate revenue vs. expenses allowing you to remain competitive."
  },  
  {  
    id: 6,
    bgColor: "#DC2626",
    icon: <VscFeedback size={40} className="object-contain" />,
    title: "Feedback Insights",
    desc: "For businesses with many reviews where customer satisfaction is everything. Natural Language Processing (NLP) applied to reviews and feedback from all available sources to identify customer gains, pains and sentiment over time."
  },  
  {  
    id: 7,
    bgColor: "#4F46E5",
    icon: <VscPerson size={40} className="object-contain" />,
    title: "Customer Segmentation",
    desc: "Segments customers into groups based on their behavior and preferences to tailor marketing and sales strategies. Discover which groups of customers influence revenue and popularity the most."
  },


];
