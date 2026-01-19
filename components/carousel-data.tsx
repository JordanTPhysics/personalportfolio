import Image from "next/image";

interface CarouselItem {
  id: number;
  bgColor: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const techStackData: CarouselItem[] = [
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

export default techStackData;
